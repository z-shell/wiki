import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {mkdir, readFile, readdir, rm, writeFile} from "node:fs/promises";
import {basename, dirname, join, relative, resolve, sep} from "node:path";
import {fileURLToPath} from "node:url";

import Ajv2020 from "ajv/dist/2020.js";
import {load} from "cheerio";
import TurndownService from "turndown";
import {parse as parseYaml, stringify as stringifyYaml} from "yaml";

import {
  ARTIFACT_PATHS,
  CONTENT_ROOTS,
  CONTENT_SIGNAL,
  CRAWLER_POLICY,
  DEFAULT_LOCALE,
  MACHINE_HEADER_RULES,
  MANIFEST_VERSION,
  MARKDOWN_PROFILE_VERSION,
  PRIORITY_TRANSLATION_KEYS,
  RELEASE_EVIDENCE_URL,
  RELEASE_OWNER,
} from "./config.mjs";

const MANIFEST_SCHEMA_PATH = fileURLToPath(new URL("./manifest.schema.json", import.meta.url));
const MACHINE_CACHE_CONTROL = "public, max-age=300, must-revalidate";
const SOURCE_REPOSITORY = "https://github.com/z-shell/wiki";
const GENERATED_NOTICE =
  "Generated from the canonical Z-Shell Wiki build. The linked human-facing page remains the editorial source of truth.";

function invariant(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function compareStrings(left, right) {
  return left.localeCompare(right, "en");
}

function normalizeText(value) {
  return value.replace(/\s+/g, " ").trim();
}

function normalizeRoute(pathname) {
  const normalized = pathname.replace(/\/+/g, "/").replace(/\/$/, "");
  return normalized || "/";
}

function toSiteUrl(origin, pathname) {
  return new URL(pathname, `${origin}/`).href;
}

function localeArtifactPath(pathPrefix, filename) {
  return normalizeRoute(`${pathPrefix}/${filename}`);
}

function sectionIndexPath(pathPrefix, section) {
  return normalizeRoute(`${pathPrefix}/${section}/llms.txt`);
}

export function markdownPathForRoute(route) {
  return normalizeRoute(`${normalizeRoute(route)}/index.md`);
}

function artifactDiskPath(buildDir, artifactPath) {
  const segments = artifactPath
    .split("/")
    .filter(Boolean)
    .map((segment) => decodeURIComponent(segment));
  invariant(
    !segments.some(
      (segment) =>
        segment === "." ||
        segment === ".." ||
        segment.includes("/") ||
        segment.includes("\\") ||
        segment.includes("\0"),
    ),
    `Unsafe artifact path: ${artifactPath}`,
  );

  const buildRoot = resolve(buildDir);
  const diskPath = resolve(buildRoot, ...segments);
  invariant(
    diskPath === buildRoot || diskPath.startsWith(`${buildRoot}${sep}`),
    `Artifact escapes the build directory: ${artifactPath}`,
  );
  return diskPath;
}

function parseContentPath(pathname) {
  const route = normalizeRoute(pathname);
  const segments = route.split("/").filter(Boolean);
  const rootIds = new Set(CONTENT_ROOTS.map(({id}) => id));

  let rootIndex;
  if (rootIds.has(segments[0])) {
    rootIndex = 0;
  } else if (rootIds.has(segments[1])) {
    rootIndex = 1;
  } else {
    return null;
  }

  return {
    route,
    section: segments[rootIndex],
    pathPrefix: rootIndex === 0 ? "" : `/${segments[0]}`,
    translationKey: `/${segments.slice(rootIndex).join("/")}`,
  };
}

async function walkFiles(directory, predicate) {
  const entries = await readdir(directory, {withFileTypes: true});
  const files = [];

  for (const entry of entries.sort((left, right) => compareStrings(left.name, right.name))) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkFiles(path, predicate)));
    } else if (entry.isFile() && predicate(path)) {
      files.push(path);
    }
  }

  return files;
}

function parseFrontmatter(source, sourcePath) {
  const match = source.match(/^---\r?\n(?<frontmatter>[\s\S]*?)\r?\n---(?:\r?\n|$)/);
  invariant(match, `${sourcePath} is missing YAML frontmatter`);

  const frontmatter = parseYaml(match.groups.frontmatter);
  invariant(
    frontmatter && typeof frontmatter === "object" && !Array.isArray(frontmatter),
    `${sourcePath} has invalid frontmatter`,
  );
  return frontmatter;
}

async function collectEligibleSources(rootDir) {
  const sources = new Map();

  for (const {id: root} of CONTENT_ROOTS) {
    const rootPath = join(rootDir, root);
    const files = await walkFiles(rootPath, (path) => path.endsWith(".mdx") && !basename(path).startsWith("_"));

    for (const file of files) {
      const sourcePath = relative(rootDir, file).split(sep).join("/");
      const frontmatter = parseFrontmatter(await readFile(file, "utf8"), sourcePath);
      if (frontmatter.draft === true || frontmatter.unlisted === true) {
        continue;
      }
      sources.set(sourcePath, frontmatter);
    }
  }

  return sources;
}

async function readSitemap(buildDir) {
  const sitemapPaths = await walkFiles(buildDir, (path) => basename(path) === "sitemap.xml");
  invariant(sitemapPaths.length > 0, "The Docusaurus build contains no sitemap.xml files");
  const urls = [];

  for (const sitemapPath of sitemapPaths) {
    const $ = load(await readFile(sitemapPath, "utf8"), {xmlMode: true});
    urls.push(
      ...$("loc")
        .map((_, element) => normalizeText($(element).text()))
        .get()
        .map((value) => new URL(value)),
    );
  }

  invariant(urls.length > 0, "The generated sitemaps contain no URLs");
  return urls;
}

function extractSourcePath(editUrl) {
  if (!editUrl) {
    return null;
  }

  const prefix = `${SOURCE_REPOSITORY}/tree/main/`;
  if (!editUrl.startsWith(prefix)) {
    return null;
  }

  const sourcePath = decodeURIComponent(editUrl.slice(prefix.length));
  invariant(
    CONTENT_ROOTS.some(({id}) => sourcePath.startsWith(`${id}/`)) && sourcePath.endsWith(".mdx"),
    `Unexpected edit source path: ${sourcePath}`,
  );
  return sourcePath;
}

function setDifference(left, right) {
  return [...left].filter((item) => !right.has(item)).sort(compareStrings);
}

function assertSetEquality(actual, expected, label) {
  const missing = setDifference(expected, actual);
  const extra = setDifference(actual, expected);
  invariant(
    missing.length === 0 && extra.length === 0,
    `${label} mismatch; missing: ${missing.join(", ") || "none"}; extra: ${extra.join(", ") || "none"}`,
  );
}

async function buildInventory(rootDir, buildDir) {
  const htmlFiles = await walkFiles(buildDir, (path) => path.endsWith(".html"));
  const pages = [];
  const generatedRoutes = new Set();
  const unlistedRoutes = new Set();
  const seenRoutes = new Set();

  for (const file of htmlFiles) {
    const html = await readFile(file, "utf8");
    const $ = load(html);
    const canonicalHref = $('link[rel="canonical"]').attr("href");
    if (!canonicalHref) {
      continue;
    }

    const canonicalUrl = new URL(canonicalHref);
    const contentPath = parseContentPath(canonicalUrl.pathname);
    if (!contentPath) {
      continue;
    }

    invariant(!seenRoutes.has(contentPath.route), `Duplicate built canonical route: ${contentPath.route}`);
    seenRoutes.add(contentPath.route);

    const article = $(".theme-doc-markdown");
    if (article.length === 0) {
      generatedRoutes.add(contentPath.route);
      continue;
    }
    invariant(
      article.length === 1,
      `Expected one documentation article at ${contentPath.route}, found ${article.length}`,
    );

    const robots = ($('meta[name="robots"]').attr("content") ?? "").toLowerCase();
    if (robots.split(",").some((directive) => directive.trim() === "noindex")) {
      unlistedRoutes.add(contentPath.route);
      continue;
    }

    const locale = $("html").attr("lang");
    const title = normalizeText(article.find("h1").first().text());
    const description = normalizeText($('meta[name="description"]').attr("content") ?? "");
    const sourcePath = extractSourcePath($("a.theme-edit-this-page").attr("href"));

    invariant(locale, `Missing document locale at ${contentPath.route}`);
    invariant(title, `Missing document title at ${contentPath.route}`);
    invariant(description, `Missing document description at ${contentPath.route}`);

    pages.push({
      ...contentPath,
      canonicalUrl: canonicalUrl.href,
      description,
      file,
      locale,
      sourcePath,
      title,
    });
  }

  invariant(pages.length > 0, "The Docusaurus build contains no eligible documentation pages");

  const pageOrigins = new Set(pages.map(({canonicalUrl}) => new URL(canonicalUrl).origin));
  invariant(
    pageOrigins.size === 1,
    `Documentation pages use multiple canonical origins: ${[...pageOrigins].join(", ")}`,
  );
  const [origin] = pageOrigins;

  const sitemapUrls = await readSitemap(buildDir);
  const publicRoutes = new Set(
    sitemapUrls.filter((url) => url.origin === origin).map((url) => normalizeRoute(url.pathname)),
  );
  const sitemapRoutes = new Set(
    sitemapUrls
      .filter((url) => url.origin === origin)
      .map((url) => parseContentPath(url.pathname))
      .filter(Boolean)
      .map(({route}) => route),
  );
  const pageRoutes = new Set(pages.map(({route}) => route));

  for (const route of pageRoutes) {
    invariant(sitemapRoutes.has(route), `Canonical document is missing from the sitemap: ${route}`);
  }
  for (const route of sitemapRoutes) {
    invariant(
      pageRoutes.has(route) || generatedRoutes.has(route),
      `Sitemap route is neither a canonical document nor a generated index: ${route}`,
    );
  }
  for (const route of unlistedRoutes) {
    invariant(!sitemapRoutes.has(route), `Unlisted document leaked into the sitemap: ${route}`);
  }

  const defaultPages = pages.filter(({pathPrefix}) => pathPrefix === "");
  invariant(defaultPages.length > 0, "No default-locale documentation pages were found");
  invariant(
    defaultPages.every(({locale}) => locale === DEFAULT_LOCALE),
    `Unprefixed documentation routes must use the ${DEFAULT_LOCALE} locale`,
  );

  const eligibleSources = await collectEligibleSources(rootDir);
  const actualSources = new Set();
  for (const page of defaultPages) {
    invariant(page.sourcePath, `Default-locale document lacks a GitHub edit source: ${page.route}`);
    invariant(
      eligibleSources.has(page.sourcePath),
      `Built document points to an ineligible or missing source: ${page.sourcePath}`,
    );
    actualSources.add(page.sourcePath);
    page.frontmatter = eligibleSources.get(page.sourcePath);
  }
  assertSetEquality(actualSources, new Set(eligibleSources.keys()), "Default-locale source-to-route parity");

  for (const page of pages.filter(({pathPrefix}) => pathPrefix !== "")) {
    page.frontmatter = null;
  }

  const localePrefixes = new Map();
  for (const page of pages) {
    const existingPrefix = localePrefixes.get(page.locale);
    invariant(
      existingPrefix === undefined || existingPrefix === page.pathPrefix,
      `Locale ${page.locale} is published under multiple prefixes`,
    );
    localePrefixes.set(page.locale, page.pathPrefix);
  }

  invariant(
    localePrefixes.get(DEFAULT_LOCALE) === "",
    `Default locale ${DEFAULT_LOCALE} must be published without a path prefix`,
  );

  pages.sort((left, right) => {
    if (left.locale === right.locale) {
      return compareStrings(left.route, right.route);
    }
    if (left.locale === DEFAULT_LOCALE) {
      return -1;
    }
    if (right.locale === DEFAULT_LOCALE) {
      return 1;
    }
    return compareStrings(left.locale, right.locale);
  });

  return {
    generatedRoutes,
    localePrefixes,
    origin,
    pages,
    publicRoutes,
    sitemapRoutes,
    unlistedRoutes,
  };
}

function escapeHtmlAttribute(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function longestBacktickRun(value) {
  return Math.max(0, ...[...value.matchAll(/`+/g)].map((match) => match[0].length));
}

export function rewriteHref(href, page, routeMap, origin) {
  if (!href || /^(?:mailto:|tel:|data:|javascript:)/i.test(href) || href.startsWith("#")) {
    return href;
  }

  let resolved;
  try {
    resolved = new URL(href, page.canonicalUrl);
  } catch {
    return href;
  }

  if (resolved.origin !== origin) {
    return resolved.href;
  }

  const target = routeMap.get(normalizeRoute(resolved.pathname));
  if (target) {
    return `${target.markdownUrl}${resolved.search}${resolved.hash}`;
  }

  return resolved.href;
}

function createTurndownService() {
  const turndown = new TurndownService({
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
    emDelimiter: "*",
    fence: "```",
    headingStyle: "atx",
    strongDelimiter: "**",
  });

  turndown.addRule("docusaurus-code-block", {
    filter: (node) => node.nodeName === "PRE",
    replacement: (_content, node) => {
      const code = (node.textContent ?? "").replace(/\n$/, "");
      const language = node.getAttribute("data-llms-language") ?? "";
      const fence = "`".repeat(Math.max(3, longestBacktickRun(code) + 1));
      return `\n\n${fence}${language}\n${code}\n${fence}\n\n`;
    },
  });

  turndown.addRule("explicit-heading-anchors", {
    filter: (node) => /^H[1-6]$/.test(node.nodeName),
    replacement: (content, node) => {
      const level = Number(node.nodeName.slice(1));
      const id = node.getAttribute("id");
      const anchor = id ? `<a id="${escapeHtmlAttribute(id)}"></a>\n\n` : "";
      return `\n\n${anchor}${"#".repeat(level)} ${content.trim()}\n\n`;
    },
  });

  turndown.addRule("explicit-inline-anchors", {
    filter: (node) => node.nodeName === "A" && Boolean(node.getAttribute("id")),
    replacement: (content, node) => {
      const anchor = `<a id="${escapeHtmlAttribute(node.getAttribute("id"))}"></a>`;
      const href = node.getAttribute("href");
      return href ? `${anchor}[${content}](${href})` : `\n${anchor}\n`;
    },
  });

  turndown.addRule("html-tables", {
    filter: "table",
    replacement: (_content, node) => `\n\n${node.outerHTML}\n\n`,
  });

  turndown.keep(["details", "summary", "kbd", "sub", "sup"]);
  return turndown;
}

export function renderPageMarkdown(page, routeMap, origin, html) {
  const $ = load(html);
  const article = $(".theme-doc-markdown").first();

  article.find("pre").each((_, element) => {
    const classes = [$(element).attr("class"), $(element).find("code").first().attr("class")].filter(Boolean).join(" ");
    const language = classes.match(/(?:^|\s)language-(?<language>[A-Za-z0-9_+-]+)/)?.groups?.language;
    if (language) {
      $(element).attr("data-llms-language", language);
    }

    const tokenLines = $(element).find(".token-line");
    if (tokenLines.length > 0) {
      const code = tokenLines
        .map((_, line) => $(line).text())
        .get()
        .join("\n");
      $(element).empty().text(code);
    }
  });

  article.find(".hash-link, .theme-code-block button, script, style").remove();

  article.find("[id]").each((_, element) => {
    if (/^h[1-6]$/i.test(element.name) || element.name === "a") {
      return;
    }
    const id = $(element).attr("id");
    if (id) {
      $(element).prepend(`<a id="${escapeHtmlAttribute(id)}"></a>`);
    }
  });

  article.find("a[href]").each((_, element) => {
    const href = $(element).attr("href");
    $(element).attr("href", rewriteHref(href, page, routeMap, origin));
  });

  article.find("img[src]").each((_, element) => {
    const source = $(element).attr("src");
    if (!source) {
      return;
    }
    try {
      $(element).attr("src", new URL(source, page.canonicalUrl).href);
    } catch {
      // Turndown will preserve the original source so validation can report it.
    }
  });

  article.find("*").each((_, element) => {
    for (const attribute of [...element.attributes]) {
      if (
        attribute.name === "class" ||
        attribute.name === "style" ||
        attribute.name === "tabindex" ||
        attribute.name === "role" ||
        attribute.name.startsWith("aria-") ||
        (attribute.name.startsWith("data-") && attribute.name !== "data-llms-language")
      ) {
        $(element).removeAttr(attribute.name);
      }
    }
    $(element).removeAttr("target").removeAttr("rel");
  });

  const body = createTurndownService()
    .turndown(article.html() ?? "")
    .trim();
  invariant(body, `Markdown conversion produced an empty document for ${page.route}`);

  const frontmatter = stringifyYaml(
    {
      title: page.title,
      description: page.description,
      canonical_url: page.canonicalUrl,
      markdown_url: page.markdownUrl,
      locale: page.locale,
      source_path: page.sourcePath,
    },
    {lineWidth: 0},
  ).trimEnd();

  return `---\n${frontmatter}\n---\n\n<!-- ${GENERATED_NOTICE} -->\n\n${body}\n`;
}

function markdownLink(title, url, description) {
  const safeTitle = title.replaceAll("[", "\\[").replaceAll("]", "\\]");
  return `- [${safeTitle}](${url}): ${description}`;
}

function renderSectionIndex(locale, section, pages) {
  const sectionConfig = CONTENT_ROOTS.find(({id}) => id === section);
  invariant(sectionConfig, `Unknown content section: ${section}`);
  const lines = [
    `# Z-Shell Wiki — ${sectionConfig.title}`,
    "",
    `> ${sectionConfig.description}`,
    "",
    `Locale: ${locale.id}`,
    "",
    "## Documents",
    "",
    ...pages.map(({description, markdownUrl, title}) => markdownLink(title, markdownUrl, description)),
    "",
  ];
  return lines.join("\n");
}

function renderRootIndex(locale, pages, origin) {
  const byTranslationKey = new Map(pages.map((page) => [page.translationKey, page]));
  const priorityPages = PRIORITY_TRANSLATION_KEYS.map((translationKey) => {
    const page = byTranslationKey.get(translationKey);
    invariant(page, `Priority document is missing for locale ${locale.id}: ${translationKey}`);
    return page;
  });

  const lines = [
    "# Z-Shell Wiki",
    "",
    "> Official documentation and knowledge base for Zi, the Z-Shell ecosystem, and community tooling.",
    "",
    GENERATED_NOTICE,
    "",
    `Locale: ${locale.id}`,
    "",
    "## Priority documentation",
    "",
    ...priorityPages.map(({description, markdownUrl, title}) => markdownLink(title, markdownUrl, description)),
    "",
    "## Corpus indexes",
    "",
    ...CONTENT_ROOTS.map(({description, id, title}) =>
      markdownLink(`${title} index`, toSiteUrl(origin, sectionIndexPath(locale.pathPrefix, id)), description),
    ),
    "",
    "## Complete corpus",
    "",
    markdownLink(
      "Full concatenated corpus",
      toSiteUrl(origin, localeArtifactPath(locale.pathPrefix, "llms-full.txt")),
      "All canonical Markdown documents for this locale in deterministic route order.",
    ),
    "",
    "## Contract metadata",
    "",
    markdownLink(
      "Corpus manifest",
      toSiteUrl(origin, ARTIFACT_PATHS.manifest),
      "Versioned inventory, locale relationships, media types, byte lengths, and SHA-256 digests.",
    ),
    markdownLink(
      "Markdown profile",
      toSiteUrl(origin, ARTIFACT_PATHS.markdownProfile),
      "Artifact conventions, canonical relationships, and link semantics.",
    ),
    "",
  ];
  return lines.join("\n");
}

function renderMarkdownProfile(origin, locales) {
  const frontmatter = stringifyYaml(
    {
      profile_version: MARKDOWN_PROFILE_VERSION,
      canonical_url: toSiteUrl(origin, ARTIFACT_PATHS.markdownProfile),
      manifest_url: toSiteUrl(origin, ARTIFACT_PATHS.manifest),
    },
    {lineWidth: 0},
  ).trimEnd();

  const localeLines = locales.map(({id, llmsUrl}) => `- \`${id}\`: [discovery index](${llmsUrl})`);
  return `---\n${frontmatter}\n---\n\n# Z-Shell Wiki Markdown profile\n\n${GENERATED_NOTICE}\n\n## Contract\n\n- Every manifest document has exactly one canonical human URL and one generated Markdown URL per locale.\n- Page artifacts use YAML frontmatter followed by rendered documentation content.\n- Same-corpus links resolve to generated \`index.md\` artifacts and preserve explicit HTML anchors.\n- Section indexes and \`llms-full.txt\` are generated from the same sorted manifest inventory.\n- Draft, unlisted, and generated category routes are excluded.\n- Artifact bytes and SHA-256 values are authoritative only when they match the manifest.\n\n## Locales\n\n${localeLines.join("\n")}\n\n## Authority\n\nThe [human-facing wiki](${origin}/) remains the editorial source of truth. Static discovery is available; no retrieval API or MCP service is published by this contract.\n`;
}

function renderFullCorpus(locale, pages, pageContents) {
  const documents = pages.map((page) => {
    const content = pageContents.get(page.markdownPath);
    invariant(content, `Missing generated page content for ${page.markdownPath}`);
    return `<!-- BEGIN DOCUMENT ${page.canonicalUrl} -->\n\n${content.trimEnd()}\n\n<!-- END DOCUMENT ${page.canonicalUrl} -->`;
  });

  return `# Z-Shell Wiki full corpus\n\n> Locale: ${locale.id}. ${GENERATED_NOTICE}\n\n${documents.join("\n\n---\n\n")}\n`;
}

export function renderRobots(origin) {
  const groups = CRAWLER_POLICY.flatMap(({directive, path, userAgent}) => [
    `User-agent: ${userAgent}`,
    `${directive}: ${path}`,
    "",
  ]);
  return `# Repository-owned crawler policy for the public Z-Shell Wiki.\n# Search and user-directed retrieval are allowed; foundation-model training is disallowed where separately controllable.\n# Google-Extended couples Gemini training and grounding, so its disallow rule opts out of both uses.\n\n${groups.join("\n")}Sitemap: ${toSiteUrl(origin, "/sitemap.xml")}\n`;
}

export function injectDiscoveryLinks(html, page, origin) {
  const withoutGeneratedLinks = html.replace(/<link\b[^>]*\bdata-llms-corpus="[^"]+"[^>]*>/g, "");
  invariant(withoutGeneratedLinks.includes("</head>"), `Built page is missing </head>: ${page.route}`);

  const describedByUrl = toSiteUrl(origin, sectionIndexPath(page.pathPrefix, page.section));
  const links = [
    `<link rel="alternate" type="text/markdown" hreflang="${escapeHtmlAttribute(page.locale)}" href="${escapeHtmlAttribute(page.markdownUrl)}" data-llms-corpus="alternate">`,
    `<link rel="describedby" type="text/plain" href="${escapeHtmlAttribute(describedByUrl)}" data-llms-corpus="describedby">`,
  ].join("");

  return withoutGeneratedLinks.replace("</head>", `${links}</head>`);
}

function sha256(content) {
  return createHash("sha256").update(content).digest("hex");
}

async function writeArtifact(buildDir, origin, path, content, kind, locale, mediaType) {
  const normalizedContent = content.endsWith("\n") ? content : `${content}\n`;
  const diskPath = artifactDiskPath(buildDir, path);
  await mkdir(dirname(diskPath), {recursive: true});
  await writeFile(diskPath, normalizedContent, "utf8");

  return {
    path,
    url: toSiteUrl(origin, path),
    kind,
    locale,
    media_type: mediaType,
    bytes: Buffer.byteLength(normalizedContent),
    sha256: sha256(normalizedContent),
  };
}

async function removeArtifact(buildDir, path) {
  await rm(artifactDiskPath(buildDir, path), {force: true});
}

function buildLocales(inventory, origin) {
  const locales = [...inventory.localePrefixes]
    .map(([id, pathPrefix]) => ({
      id,
      default: id === DEFAULT_LOCALE,
      pathPrefix,
      canonicalBaseUrl: toSiteUrl(origin, `${pathPrefix}/`),
      llmsUrl: toSiteUrl(origin, localeArtifactPath(pathPrefix, "llms.txt")),
      llmsFullUrl: toSiteUrl(origin, localeArtifactPath(pathPrefix, "llms-full.txt")),
    }))
    .sort((left, right) => {
      if (left.default) {
        return -1;
      }
      if (right.default) {
        return 1;
      }
      return compareStrings(left.id, right.id);
    });

  invariant(locales.filter(({default: isDefault}) => isDefault).length === 1, "Exactly one default locale is required");
  return locales;
}

function buildAlternates(pages) {
  const groups = Map.groupBy(pages, ({translationKey}) => translationKey);
  for (const page of pages) {
    page.alternates = groups
      .get(page.translationKey)
      .map(({canonicalUrl, locale, markdownUrl}) => ({
        locale,
        canonical_url: canonicalUrl,
        markdown_url: markdownUrl,
      }))
      .sort((left, right) => compareStrings(left.locale, right.locale));
  }
}

export async function exportCorpus({rootDir = process.cwd(), buildDir = join(rootDir, "build")} = {}) {
  const inventory = await buildInventory(rootDir, buildDir);
  const locales = buildLocales(inventory, inventory.origin);
  const routeMap = new Map();

  for (const page of inventory.pages) {
    page.markdownPath = markdownPathForRoute(page.route);
    page.markdownUrl = toSiteUrl(inventory.origin, page.markdownPath);
    routeMap.set(page.route, page);
  }
  buildAlternates(inventory.pages);

  for (const page of inventory.pages) {
    await removeArtifact(buildDir, page.markdownPath);
  }
  for (const locale of locales) {
    await removeArtifact(buildDir, localeArtifactPath(locale.pathPrefix, "llms.txt"));
    await removeArtifact(buildDir, localeArtifactPath(locale.pathPrefix, "llms-full.txt"));
    for (const {id} of CONTENT_ROOTS) {
      await removeArtifact(buildDir, sectionIndexPath(locale.pathPrefix, id));
    }
  }
  for (const path of [ARTIFACT_PATHS.manifest, ARTIFACT_PATHS.markdownProfile, ARTIFACT_PATHS.robots]) {
    await removeArtifact(buildDir, path);
  }

  const artifacts = [];
  const pageContents = new Map();
  for (const page of inventory.pages) {
    const html = await readFile(page.file, "utf8");
    const content = renderPageMarkdown(page, routeMap, inventory.origin, html);
    pageContents.set(page.markdownPath, content);
    page.artifact = await writeArtifact(
      buildDir,
      inventory.origin,
      page.markdownPath,
      content,
      "document",
      page.locale,
      "text/markdown; charset=utf-8",
    );
    artifacts.push(page.artifact);
    await writeFile(page.file, injectDiscoveryLinks(html, page, inventory.origin), "utf8");
  }

  for (const locale of locales) {
    const localePages = inventory.pages.filter(({locale: pageLocale}) => pageLocale === locale.id);
    for (const {id} of CONTENT_ROOTS) {
      const sectionPages = localePages.filter(({section}) => section === id);
      invariant(sectionPages.length > 0, `Locale ${locale.id} has no ${id} documents`);
      artifacts.push(
        await writeArtifact(
          buildDir,
          inventory.origin,
          sectionIndexPath(locale.pathPrefix, id),
          renderSectionIndex(locale, id, sectionPages),
          "index",
          locale.id,
          "text/plain; charset=utf-8",
        ),
      );
    }

    artifacts.push(
      await writeArtifact(
        buildDir,
        inventory.origin,
        localeArtifactPath(locale.pathPrefix, "llms.txt"),
        renderRootIndex(locale, localePages, inventory.origin),
        "index",
        locale.id,
        "text/plain; charset=utf-8",
      ),
    );
    artifacts.push(
      await writeArtifact(
        buildDir,
        inventory.origin,
        localeArtifactPath(locale.pathPrefix, "llms-full.txt"),
        renderFullCorpus(locale, localePages, pageContents),
        "full-corpus",
        locale.id,
        "text/plain; charset=utf-8",
      ),
    );
  }

  artifacts.push(
    await writeArtifact(
      buildDir,
      inventory.origin,
      ARTIFACT_PATHS.markdownProfile,
      renderMarkdownProfile(inventory.origin, locales),
      "markdown-profile",
      null,
      "text/markdown; charset=utf-8",
    ),
  );

  const manifest = {
    schema_version: MANIFEST_VERSION,
    markdown_profile_version: MARKDOWN_PROFILE_VERSION,
    name: "Z-Shell Wiki machine-readable corpus",
    description: "Deterministic Markdown artifacts generated from the canonical public documentation build.",
    canonical_url: `${inventory.origin}/`,
    manifest_url: toSiteUrl(inventory.origin, ARTIFACT_PATHS.manifest),
    source_repository: SOURCE_REPOSITORY,
    source_authority: "human-facing wiki",
    release: {
      owner: RELEASE_OWNER,
      evidence_url: RELEASE_EVIDENCE_URL,
      completed_phases: ["1A", "1B"],
    },
    capabilities: {
      static_discovery: true,
      retrieval_api: false,
      mcp: false,
    },
    content_signal: CONTENT_SIGNAL,
    default_locale: DEFAULT_LOCALE,
    locales: locales.map(({canonicalBaseUrl, default: isDefault, id, llmsFullUrl, llmsUrl, pathPrefix}) => ({
      id,
      default: isDefault,
      path_prefix: pathPrefix,
      canonical_base_url: canonicalBaseUrl,
      llms_url: llmsUrl,
      llms_full_url: llmsFullUrl,
      manifest_url: toSiteUrl(inventory.origin, ARTIFACT_PATHS.manifest),
    })),
    sections: CONTENT_ROOTS.map(({description, id, title}) => ({id, title, description})),
    documents: inventory.pages.map((page) => ({
      id: `${page.locale}:${page.translationKey}`,
      translation_key: page.translationKey,
      section: page.section,
      locale: page.locale,
      title: page.title,
      description: page.description,
      source_path: page.sourcePath,
      canonical_url: page.canonicalUrl,
      markdown_url: page.markdownUrl,
      alternates: page.alternates,
      bytes: page.artifact.bytes,
      sha256: page.artifact.sha256,
    })),
    artifacts: artifacts.sort((left, right) => compareStrings(left.path, right.path)),
  };

  await mkdir(dirname(artifactDiskPath(buildDir, ARTIFACT_PATHS.manifest)), {recursive: true});
  await writeFile(
    artifactDiskPath(buildDir, ARTIFACT_PATHS.manifest),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );
  await writeFile(artifactDiskPath(buildDir, ARTIFACT_PATHS.robots), renderRobots(inventory.origin), "utf8");

  return {
    artifacts: manifest.artifacts.length,
    documents: manifest.documents.length,
    generatedRoutes: inventory.generatedRoutes.size,
    locales: manifest.locales.map(({id}) => id),
    unlistedRoutes: inventory.unlistedRoutes.size,
  };
}

function createManifestValidator() {
  const schema = JSON.parse(readFileSync(MANIFEST_SCHEMA_PATH, "utf8"));
  const ajv = new Ajv2020({allErrors: true, strict: true});
  ajv.addFormat("uri", {
    type: "string",
    validate: (value) => {
      try {
        const url = new URL(value);
        return url.protocol === "https:" || url.protocol === "http:";
      } catch {
        return false;
      }
    },
  });
  return ajv.compile(schema);
}

const validateManifestSchema = createManifestValidator();

function assertUnique(items, field, label) {
  const values = items.map((item) => item[field]);
  invariant(new Set(values).size === values.length, `${label} contains duplicate ${field} values`);
}

export function validateManifestObject(manifest) {
  const valid = validateManifestSchema(manifest);
  if (!valid) {
    const details = validateManifestSchema.errors
      .map(({instancePath, message}) => `${instancePath || "/"} ${message}`)
      .join("; ");
    throw new Error(`Corpus manifest schema validation failed: ${details}`);
  }

  assertUnique(manifest.locales, "id", "Manifest locales");
  assertUnique(manifest.locales, "path_prefix", "Manifest locales");
  assertUnique(manifest.locales, "llms_url", "Manifest locales");
  assertUnique(manifest.sections, "id", "Manifest sections");
  assertUnique(manifest.documents, "id", "Manifest documents");
  assertUnique(manifest.documents, "canonical_url", "Manifest documents");
  assertUnique(manifest.documents, "markdown_url", "Manifest documents");
  assertUnique(manifest.artifacts, "path", "Manifest artifacts");
  assertUnique(manifest.artifacts, "url", "Manifest artifacts");
  invariant(
    manifest.locales.filter(({default: isDefault}) => isDefault).length === 1,
    "Manifest must contain one default locale",
  );
  invariant(
    manifest.locales.find(({default: isDefault}) => isDefault).id === manifest.default_locale,
    "Manifest default_locale does not match its default locale entry",
  );
  invariant(manifest.default_locale === DEFAULT_LOCALE, `Manifest default locale must be ${DEFAULT_LOCALE}`);
  for (const locale of manifest.locales) {
    invariant(
      locale.default === (locale.id === DEFAULT_LOCALE),
      `Locale ${locale.id} has an inconsistent default flag`,
    );
    invariant(
      (locale.id === DEFAULT_LOCALE && locale.path_prefix === "") ||
        (locale.id !== DEFAULT_LOCALE && locale.path_prefix !== ""),
      `Locale ${locale.id} has an invalid path prefix for its default status`,
    );
  }
  return true;
}

export function parseHeaders(source) {
  const rules = [];
  let currentRule;

  for (const [index, line] of source.split(/\r?\n/).entries()) {
    if (!line.trim() || line.trimStart().startsWith("#")) {
      continue;
    }

    if (!/^\s/.test(line)) {
      currentRule = {path: line.trim(), headers: new Map()};
      rules.push(currentRule);
      continue;
    }

    invariant(currentRule, `Header declared before a route on line ${index + 1}`);
    const separator = line.indexOf(":");
    invariant(separator > 0, `Invalid header declaration on line ${index + 1}: ${line.trim()}`);
    const name = line.slice(0, separator).trim().toLowerCase();
    const value = line.slice(separator + 1).trim();
    const values = currentRule.headers.get(name) ?? [];
    values.push(value);
    currentRule.headers.set(name, values);
  }

  return rules;
}

function headerPatternMatches(pattern, pathname, origin) {
  let pathPattern = pattern;
  if (pathPattern.startsWith("https://")) {
    if (!pathPattern.startsWith(origin)) {
      return false;
    }
    pathPattern = pathPattern.slice(origin.length) || "/";
  }

  let expression = "^";
  for (let index = 0; index < pathPattern.length; index++) {
    const character = pathPattern[index];
    if (character === "*") {
      expression += ".*";
      continue;
    }
    if (character === ":" && /[A-Za-z]/.test(pathPattern[index + 1] ?? "")) {
      while (/[A-Za-z0-9_]/.test(pathPattern[index + 1] ?? "")) {
        index++;
      }
      expression += "[^/]+";
      continue;
    }
    expression += /[\\^$.*+?()[\]{}|]/.test(character) ? `\\${character}` : character;
  }
  return new RegExp(`${expression}$`).test(pathname);
}

function validateResolvedMachineHeaders(rules, responseTypes, origin) {
  const expectedHeaders = new Map([
    ["content-signal", CONTENT_SIGNAL],
    ["cache-control", MACHINE_CACHE_CONTROL],
    ["access-control-allow-origin", "*"],
    ["x-content-type-options", "nosniff"],
  ]);

  for (const [pathname, mediaType] of responseTypes) {
    const matchingRules = rules.filter(({path}) => headerPatternMatches(path, pathname, origin));
    for (const [name, expectedValue] of [...expectedHeaders, ["content-type", mediaType]]) {
      const values = matchingRules.flatMap(({headers}) => headers.get(name) ?? []);
      invariant(
        values.length === 1 && values[0] === expectedValue,
        `${pathname} resolves ${name} to ${values.join(", ") || "no value"}; expected one ${expectedValue}`,
      );
    }
  }
}

function representativeMachineResponses() {
  return new Map([
    ["/llms.txt", "text/plain; charset=utf-8"],
    ["/docs/llms.txt", "text/plain; charset=utf-8"],
    ["/fr/docs/llms.txt", "text/plain; charset=utf-8"],
    ["/llms-full.txt", "text/plain; charset=utf-8"],
    ["/fr/llms-full.txt", "text/plain; charset=utf-8"],
    ["/docs/example/index.md", "text/markdown; charset=utf-8"],
    [ARTIFACT_PATHS.manifest, "application/json; charset=utf-8"],
    [ARTIFACT_PATHS.robots, "text/plain; charset=utf-8"],
  ]);
}

export function validateHeadersText(
  source,
  responseTypes = representativeMachineResponses(),
  origin = "https://wiki.zshell.dev",
) {
  const rules = parseHeaders(source);
  const contentSignals = rules.flatMap(({headers, path}) =>
    (headers.get("content-signal") ?? []).map((value) => ({path, value})),
  );
  invariant(
    contentSignals.length === 1,
    `Expected exactly one Content-Signal declaration, found ${contentSignals.length}`,
  );
  invariant(contentSignals[0].path === "/*", "Content-Signal must be declared on the global /* route");
  invariant(contentSignals[0].value === CONTENT_SIGNAL, `Unexpected Content-Signal value: ${contentSignals[0].value}`);

  for (const [path, mediaType] of MACHINE_HEADER_RULES) {
    const matchingRules = rules.filter((rule) => rule.path === path);
    invariant(matchingRules.length === 1, `Expected exactly one _headers rule for ${path}`);
    const [{headers}] = matchingRules;
    invariant(
      headers.get("content-type")?.length === 1 && headers.get("content-type")[0] === mediaType,
      `${path} must declare ${mediaType}`,
    );
    invariant(
      headers.get("cache-control")?.length === 1 && headers.get("cache-control")[0] === MACHINE_CACHE_CONTROL,
      `${path} must declare the machine-artifact cache policy`,
    );
    invariant(
      headers.get("access-control-allow-origin")?.length === 1 && headers.get("access-control-allow-origin")[0] === "*",
      `${path} must allow cross-origin reads`,
    );
    invariant(
      headers.get("x-content-type-options")?.length === 1 && headers.get("x-content-type-options")[0] === "nosniff",
      `${path} must disable MIME sniffing`,
    );
  }

  validateResolvedMachineHeaders(rules, responseTypes, origin);
  return true;
}

function stripFencedCodeBlocks(source) {
  let fence;
  return source
    .split("\n")
    .map((line) => {
      const marker = line.match(/^\s*(?<fence>`{3,}|~{3,})/)?.groups?.fence;
      if (!fence && marker) {
        fence = {character: marker[0], length: marker.length};
        return "";
      }
      if (fence && marker?.[0] === fence.character && marker.length >= fence.length) {
        fence = undefined;
        return "";
      }
      return fence ? "" : line;
    })
    .join("\n");
}

function isEscaped(source, index) {
  let backslashes = 0;
  for (let cursor = index - 1; cursor >= 0 && source[cursor] === "\\"; cursor--) {
    backslashes++;
  }
  return backslashes % 2 === 1;
}

function extractMarkdownLinks(source) {
  const links = [];

  for (let index = 0; index < source.length; index++) {
    if (source[index] === "`") {
      let markerLength = 1;
      while (source[index + markerLength] === "`") {
        markerLength++;
      }
      const closingIndex = source.indexOf("`".repeat(markerLength), index + markerLength);
      if (closingIndex !== -1) {
        index = closingIndex + markerLength - 1;
        continue;
      }
    }

    if (source[index] !== "[" || isEscaped(source, index)) {
      continue;
    }

    let labelDepth = 1;
    let cursor = index + 1;
    for (; cursor < source.length && labelDepth > 0; cursor++) {
      if (source[cursor] === "\\") {
        cursor++;
      } else if (source[cursor] === "[") {
        labelDepth++;
      } else if (source[cursor] === "]") {
        labelDepth--;
      }
    }
    if (labelDepth !== 0) {
      continue;
    }

    while (/\s/.test(source[cursor] ?? "")) {
      cursor++;
    }
    if (source[cursor] !== "(") {
      index = cursor - 1;
      continue;
    }
    cursor++;
    while (/\s/.test(source[cursor] ?? "")) {
      cursor++;
    }

    let destination = "";
    if (source[cursor] === "<") {
      cursor++;
      while (cursor < source.length && source[cursor] !== ">") {
        if (source[cursor] === "\\" && cursor + 1 < source.length) {
          cursor++;
        }
        destination += source[cursor];
        cursor++;
      }
    } else {
      let parenthesisDepth = 0;
      while (cursor < source.length) {
        const character = source[cursor];
        if (character === "\\" && cursor + 1 < source.length) {
          cursor++;
          destination += source[cursor];
        } else if (character === "(") {
          parenthesisDepth++;
          destination += character;
        } else if (character === ")") {
          if (parenthesisDepth === 0) {
            break;
          }
          parenthesisDepth--;
          destination += character;
        } else if (/\s/.test(character) && parenthesisDepth === 0) {
          break;
        } else {
          destination += character;
        }
        cursor++;
      }
    }

    if (destination) {
      links.push(destination);
    }
    index = cursor;
  }

  return links;
}

export function extractDocumentLinks(source) {
  const withoutCode = stripFencedCodeBlocks(source).replace(/<code\b[^>]*>[\s\S]*?<\/code>/gi, "");
  const markdownLinks = extractMarkdownLinks(withoutCode);
  const autoLinks = [...withoutCode.matchAll(/<(?<url>https?:\/\/[^ >]+)>/g)].map((match) => match.groups.url);
  const htmlLinks = [
    ...withoutCode.matchAll(
      /<a\b[^>]*\bhref=(?:"(?<doubleQuoted>[^"]*)"|'(?<singleQuoted>[^']*)'|(?<unquoted>[^\s>]+))/gi,
    ),
  ].map((match) => load(match.groups.doubleQuoted ?? match.groups.singleQuoted ?? match.groups.unquoted).text());
  return [...markdownLinks, ...autoLinks, ...htmlLinks];
}

function extractAnchors(source) {
  return new Set([...source.matchAll(/\sid="(?<id>[^"]+)"/g)].map((match) => match.groups.id));
}

async function collectPublishedPaths(buildDir, inventory) {
  const paths = new Set(inventory.publicRoutes);
  const redirectPatterns = [];

  for (const file of await walkFiles(buildDir, () => true)) {
    const relativePath = relative(buildDir, file).split(sep).join("/");
    paths.add(normalizeRoute(`/${relativePath}`));
    if (relativePath.endsWith(".html")) {
      if (relativePath === "index.html") {
        paths.add("/");
      } else if (relativePath.endsWith("/index.html")) {
        paths.add(normalizeRoute(`/${relativePath.slice(0, -"/index.html".length)}`));
      } else {
        paths.add(normalizeRoute(`/${relativePath.slice(0, -".html".length)}`));
      }
    }
  }

  const redirectsPath = join(buildDir, "_redirects");
  const redirects = await readFile(redirectsPath, "utf8");
  for (const line of redirects.split(/\r?\n/)) {
    const [source] = line.trim().split(/\s+/);
    if (source && !source.startsWith("#")) {
      redirectPatterns.push(source);
    }
  }

  return {paths, redirectPatterns};
}

async function auditGeneratedLinks(buildDir, manifest, inventory) {
  const artifactPaths = new Set(manifest.artifacts.map(({path}) => path));
  const routeToMarkdown = new Map(
    manifest.documents.map(({canonical_url: canonicalUrl, markdown_url: markdownUrl}) => [
      normalizeRoute(new URL(canonicalUrl).pathname),
      new URL(markdownUrl).pathname,
    ]),
  );
  const filesToAudit = manifest.artifacts.filter(
    ({kind}) => kind === "document" || kind === "index" || kind === "markdown-profile",
  );
  const published = await collectPublishedPaths(buildDir, inventory);
  const anchorCache = new Map();

  async function anchorsFor(path) {
    if (!anchorCache.has(path)) {
      anchorCache.set(path, extractAnchors(await readFile(artifactDiskPath(buildDir, path), "utf8")));
    }
    return anchorCache.get(path);
  }

  for (const artifact of filesToAudit) {
    const source = await readFile(artifactDiskPath(buildDir, artifact.path), "utf8");
    for (const href of extractDocumentLinks(source)) {
      if (href.startsWith("#")) {
        const anchor = decodeURIComponent(href.slice(1));
        invariant(
          (await anchorsFor(artifact.path)).has(anchor),
          `${artifact.path} links to missing local anchor #${anchor}`,
        );
        continue;
      }

      let url;
      try {
        url = new URL(href, manifest.canonical_url);
      } catch {
        throw new Error(`${artifact.path} contains an invalid link: ${href}`);
      }
      if (url.origin !== new URL(manifest.canonical_url).origin) {
        continue;
      }

      const linkedArtifact = normalizeRoute(url.pathname);
      if (linkedArtifact.endsWith(".md") || linkedArtifact.endsWith(".txt") || linkedArtifact.endsWith(".json")) {
        invariant(
          artifactPaths.has(linkedArtifact) || linkedArtifact === ARTIFACT_PATHS.manifest,
          `${artifact.path} links to missing artifact ${linkedArtifact}`,
        );
        if (url.hash && linkedArtifact.endsWith(".md")) {
          const anchor = decodeURIComponent(url.hash.slice(1));
          invariant(
            (await anchorsFor(linkedArtifact)).has(anchor),
            `${artifact.path} links to missing anchor ${linkedArtifact}#${anchor}`,
          );
        }
        continue;
      }

      invariant(
        !routeToMarkdown.has(normalizeRoute(url.pathname)),
        `${artifact.path} retained a human-route link to ${url.pathname}`,
      );
      invariant(
        published.paths.has(normalizeRoute(url.pathname)) ||
          published.redirectPatterns.some((pattern) =>
            headerPatternMatches(pattern, normalizeRoute(url.pathname), new URL(manifest.canonical_url).origin),
          ),
        `${artifact.path} links to unpublished same-origin path ${url.pathname}`,
      );
    }
  }

  return filesToAudit.length;
}

async function validateArtifactIntegrity(buildDir, manifest) {
  const expectedArtifactPaths = new Set([
    ARTIFACT_PATHS.markdownProfile,
    ...manifest.documents.map(({markdown_url: markdownUrl}) => new URL(markdownUrl).pathname),
  ]);
  for (const locale of manifest.locales) {
    const expectedRootIndex = localeArtifactPath(locale.path_prefix, "llms.txt");
    const expectedFullCorpus = localeArtifactPath(locale.path_prefix, "llms-full.txt");
    invariant(new URL(locale.llms_url).pathname === expectedRootIndex, `Locale ${locale.id} has an invalid llms_url`);
    invariant(
      new URL(locale.llms_full_url).pathname === expectedFullCorpus,
      `Locale ${locale.id} has an invalid llms_full_url`,
    );
    expectedArtifactPaths.add(expectedRootIndex);
    expectedArtifactPaths.add(expectedFullCorpus);
    for (const {id} of CONTENT_ROOTS) {
      expectedArtifactPaths.add(sectionIndexPath(locale.path_prefix, id));
    }
  }
  assertSetEquality(
    new Set(manifest.artifacts.map(({path}) => path)),
    expectedArtifactPaths,
    "Manifest artifact inventory",
  );

  for (const artifact of manifest.artifacts) {
    invariant(
      artifact.url === toSiteUrl(new URL(manifest.canonical_url).origin, artifact.path),
      `${artifact.path} has an inconsistent artifact URL`,
    );
    const content = await readFile(artifactDiskPath(buildDir, artifact.path));
    invariant(content.byteLength === artifact.bytes, `${artifact.path} byte length does not match the manifest`);
    invariant(sha256(content) === artifact.sha256, `${artifact.path} SHA-256 does not match the manifest`);
  }

  const pageArtifacts = new Set(manifest.artifacts.filter(({kind}) => kind === "document").map(({path}) => path));
  assertSetEquality(
    pageArtifacts,
    new Set(manifest.documents.map(({markdown_url: markdownUrl}) => new URL(markdownUrl).pathname)),
    "Manifest document artifacts",
  );
  const artifactsByPath = new Map(manifest.artifacts.map((artifact) => [artifact.path, artifact]));
  for (const document of manifest.documents) {
    const artifact = artifactsByPath.get(new URL(document.markdown_url).pathname);
    invariant(artifact.kind === "document", `${document.id} does not reference a document artifact`);
    invariant(artifact.locale === document.locale, `${document.id} has inconsistent artifact locale metadata`);
    invariant(artifact.bytes === document.bytes, `${document.id} has inconsistent byte metadata`);
    invariant(artifact.sha256 === document.sha256, `${document.id} has inconsistent SHA-256 metadata`);
  }

  const actualMarkdown = (await walkFiles(buildDir, (path) => path.endsWith(".md"))).filter(
    (path) => `/${relative(buildDir, path).split(sep).join("/")}` !== ARTIFACT_PATHS.markdownProfile,
  );
  const actualMarkdownPaths = new Set(actualMarkdown.map((path) => resolve(path)));
  const expectedMarkdownPaths = new Set([...pageArtifacts].map((path) => artifactDiskPath(buildDir, path)));
  assertSetEquality(actualMarkdownPaths, expectedMarkdownPaths, "Generated per-page Markdown files");
}

function validateAlternates(manifest) {
  const groups = Map.groupBy(manifest.documents, ({translation_key: translationKey}) => translationKey);
  for (const document of manifest.documents) {
    const expected = groups
      .get(document.translation_key)
      .map(({canonical_url: canonicalUrl, locale, markdown_url: markdownUrl}) => ({
        locale,
        canonical_url: canonicalUrl,
        markdown_url: markdownUrl,
      }))
      .sort((left, right) => compareStrings(left.locale, right.locale));
    invariant(
      JSON.stringify(document.alternates) === JSON.stringify(expected),
      `Locale alternates are invalid for ${document.id}`,
    );
  }
}

function validateManifestInventory(manifest, inventory) {
  const pagesByCanonicalUrl = new Map(inventory.pages.map((page) => [page.canonicalUrl, page]));
  const localeIds = new Set(manifest.locales.map(({id}) => id));
  const sectionIds = new Set(manifest.sections.map(({id}) => id));

  invariant(
    manifest.canonical_url === `${inventory.origin}/`,
    "Manifest canonical_url does not match the build origin",
  );
  invariant(
    manifest.manifest_url === toSiteUrl(inventory.origin, ARTIFACT_PATHS.manifest),
    "Manifest manifest_url does not match the build origin",
  );
  invariant(manifest.source_repository === SOURCE_REPOSITORY, "Manifest source_repository is incorrect");
  invariant(manifest.release.owner === RELEASE_OWNER, "Manifest release owner is incorrect");
  invariant(manifest.release.evidence_url === RELEASE_EVIDENCE_URL, "Manifest release evidence URL is incorrect");

  const expectedSections = new Map(CONTENT_ROOTS.map((section) => [section.id, section]));
  assertSetEquality(sectionIds, new Set(expectedSections.keys()), "Manifest section parity");
  for (const section of manifest.sections) {
    const expected = expectedSections.get(section.id);
    invariant(
      section.title === expected.title && section.description === expected.description,
      `Manifest section metadata is incorrect for ${section.id}`,
    );
  }

  for (const document of manifest.documents) {
    const page = pagesByCanonicalUrl.get(document.canonical_url);
    invariant(page, `Manifest document is not present in the build: ${document.canonical_url}`);
    invariant(localeIds.has(document.locale), `${document.id} references an unknown locale`);
    invariant(sectionIds.has(document.section), `${document.id} references an unknown section`);
    invariant(document.translation_key === page.translationKey, `${document.id} has an incorrect translation key`);
    invariant(document.section === page.section, `${document.id} has an incorrect section`);
    invariant(document.locale === page.locale, `${document.id} has an incorrect locale`);
    invariant(document.title === page.title, `${document.id} has an incorrect title`);
    invariant(document.description === page.description, `${document.id} has an incorrect description`);
    invariant(document.source_path === page.sourcePath, `${document.id} has an incorrect source path`);
    invariant(
      document.markdown_url === toSiteUrl(inventory.origin, markdownPathForRoute(page.route)),
      `${document.id} has an incorrect Markdown URL`,
    );
  }

  const expectedLocales = new Map(inventory.localePrefixes);
  assertSetEquality(localeIds, new Set(expectedLocales.keys()), "Manifest-to-build locale parity");
  for (const locale of manifest.locales) {
    invariant(
      locale.path_prefix === expectedLocales.get(locale.id),
      `Locale ${locale.id} has an incorrect path prefix`,
    );
    invariant(
      locale.canonical_base_url === toSiteUrl(inventory.origin, `${locale.path_prefix}/`),
      `Locale ${locale.id} has an incorrect canonical base URL`,
    );
    invariant(
      locale.llms_url === toSiteUrl(inventory.origin, localeArtifactPath(locale.path_prefix, "llms.txt")),
      `Locale ${locale.id} has an incorrect llms_url origin`,
    );
    invariant(
      locale.llms_full_url === toSiteUrl(inventory.origin, localeArtifactPath(locale.path_prefix, "llms-full.txt")),
      `Locale ${locale.id} has an incorrect llms_full_url origin`,
    );
    invariant(
      locale.manifest_url === toSiteUrl(inventory.origin, ARTIFACT_PATHS.manifest),
      `Locale ${locale.id} has an incorrect manifest_url`,
    );
  }
}

async function validateGeneratedContent(buildDir, manifest, inventory) {
  const documentsByCanonicalUrl = new Map(manifest.documents.map((document) => [document.canonical_url, document]));
  const routeMap = new Map();
  const pageContents = new Map();

  for (const page of inventory.pages) {
    const document = documentsByCanonicalUrl.get(page.canonicalUrl);
    page.markdownPath = new URL(document.markdown_url).pathname;
    page.markdownUrl = document.markdown_url;
    routeMap.set(page.route, page);
  }

  for (const page of inventory.pages) {
    const expected = renderPageMarkdown(page, routeMap, inventory.origin, await readFile(page.file, "utf8"));
    const actual = await readFile(artifactDiskPath(buildDir, page.markdownPath), "utf8");
    invariant(actual === expected, `${page.markdownPath} does not match its canonical rendered page`);
    pageContents.set(page.markdownPath, actual);
  }

  for (const manifestLocale of manifest.locales) {
    const locale = {
      id: manifestLocale.id,
      pathPrefix: manifestLocale.path_prefix,
      llmsUrl: manifestLocale.llms_url,
    };
    const localePages = inventory.pages.filter(({locale: pageLocale}) => pageLocale === locale.id);

    for (const {id} of CONTENT_ROOTS) {
      const sectionPages = localePages.filter(({section}) => section === id);
      const path = sectionIndexPath(locale.pathPrefix, id);
      const actual = await readFile(artifactDiskPath(buildDir, path), "utf8");
      invariant(
        actual === renderSectionIndex(locale, id, sectionPages),
        `${path} does not exactly cover its manifest section`,
      );
    }

    const rootIndexPath = localeArtifactPath(locale.pathPrefix, "llms.txt");
    const rootIndex = await readFile(artifactDiskPath(buildDir, rootIndexPath), "utf8");
    invariant(
      rootIndex === renderRootIndex(locale, localePages, inventory.origin),
      `${rootIndexPath} does not match its locale inventory`,
    );

    const fullCorpusPath = localeArtifactPath(locale.pathPrefix, "llms-full.txt");
    const fullCorpus = await readFile(artifactDiskPath(buildDir, fullCorpusPath), "utf8");
    invariant(
      fullCorpus === renderFullCorpus(locale, localePages, pageContents),
      `${fullCorpusPath} does not exactly contain its locale documents`,
    );
  }

  const profile = await readFile(artifactDiskPath(buildDir, ARTIFACT_PATHS.markdownProfile), "utf8");
  const profileLocales = manifest.locales.map(({id, llms_url: llmsUrl}) => ({id, llmsUrl}));
  invariant(
    profile === renderMarkdownProfile(inventory.origin, profileLocales),
    `${ARTIFACT_PATHS.markdownProfile} does not match the locale inventory`,
  );
}

async function validateHtmlDiscoveryLinks(inventory, manifest) {
  const documents = new Map(manifest.documents.map((document) => [document.canonical_url, document]));

  for (const page of inventory.pages) {
    const document = documents.get(page.canonicalUrl);
    invariant(document, `Manifest lacks discovery metadata for ${page.canonicalUrl}`);
    const $ = load(await readFile(page.file, "utf8"));
    const canonicalLinks = $(`link[rel="canonical"][href="${page.canonicalUrl}"]`);
    invariant(canonicalLinks.length === 1, `${page.route} must contain exactly one canonical link`);

    const markdownLinks = $('link[data-llms-corpus="alternate"][rel="alternate"][type="text/markdown"]');
    invariant(markdownLinks.length === 1, `${page.route} must contain exactly one generated Markdown alternate link`);
    invariant(
      markdownLinks.attr("href") === document.markdown_url,
      `${page.route} has an incorrect Markdown alternate`,
    );
    invariant(markdownLinks.attr("hreflang") === page.locale, `${page.route} has an incorrect Markdown hreflang`);

    const describedByLinks = $('link[data-llms-corpus="describedby"][rel="describedby"][type="text/plain"]');
    invariant(describedByLinks.length === 1, `${page.route} must contain exactly one generated describedby link`);
    invariant(
      describedByLinks.attr("href") === toSiteUrl(inventory.origin, sectionIndexPath(page.pathPrefix, page.section)),
      `${page.route} has an incorrect describedby link`,
    );
  }
}

export async function validateCorpus({rootDir = process.cwd(), buildDir = join(rootDir, "build")} = {}) {
  const manifest = JSON.parse(await readFile(artifactDiskPath(buildDir, ARTIFACT_PATHS.manifest), "utf8"));
  validateManifestObject(manifest);
  validateAlternates(manifest);

  const inventory = await buildInventory(rootDir, buildDir);
  assertSetEquality(
    new Set(manifest.documents.map(({canonical_url: canonicalUrl}) => normalizeRoute(new URL(canonicalUrl).pathname))),
    new Set(inventory.pages.map(({route}) => route)),
    "Manifest-to-build route parity",
  );
  validateManifestInventory(manifest, inventory);
  await validateHtmlDiscoveryLinks(inventory, manifest);
  await validateGeneratedContent(buildDir, manifest, inventory);

  invariant(
    manifest.documents.every(
      ({locale}, index, documents) =>
        index === 0 ||
        documents[index - 1].locale !== locale ||
        compareStrings(documents[index - 1].canonical_url, documents[index].canonical_url) <= 0,
    ),
    "Manifest documents are not in deterministic route order",
  );

  await validateArtifactIntegrity(buildDir, manifest);

  const sourceHeaders = await readFile(join(rootDir, "static", "_headers"), "utf8");
  const builtHeaders = await readFile(join(buildDir, "_headers"), "utf8");
  invariant(sourceHeaders === builtHeaders, "build/_headers differs from static/_headers");
  const machineResponses = new Map([
    ...manifest.artifacts.map(({media_type: mediaType, path}) => [path, mediaType]),
    [ARTIFACT_PATHS.manifest, "application/json; charset=utf-8"],
    [ARTIFACT_PATHS.robots, "text/plain; charset=utf-8"],
  ]);
  validateHeadersText(sourceHeaders, machineResponses, inventory.origin);

  const robots = await readFile(artifactDiskPath(buildDir, ARTIFACT_PATHS.robots), "utf8");
  invariant(robots === renderRobots(inventory.origin), "robots.txt does not match the repository crawler policy");
  invariant(
    !(await walkFiles(join(rootDir, "static"), (path) => basename(path) === "llms.txt")).length,
    "static/llms.txt must not coexist with the generated discovery index",
  );

  const auditedLinkFiles = await auditGeneratedLinks(buildDir, manifest, inventory);
  return {
    artifacts: manifest.artifacts.length,
    auditedLinkFiles,
    documents: manifest.documents.length,
    generatedRoutes: inventory.generatedRoutes.size,
    locales: manifest.locales.map(({id}) => id),
    unlistedRoutes: inventory.unlistedRoutes.size,
  };
}

export async function readManifest({rootDir = process.cwd(), buildDir = join(rootDir, "build")} = {}) {
  return JSON.parse(await readFile(artifactDiskPath(buildDir, ARTIFACT_PATHS.manifest), "utf8"));
}

export function artifactPathToDisk(buildDir, path) {
  return artifactDiskPath(buildDir, path);
}
