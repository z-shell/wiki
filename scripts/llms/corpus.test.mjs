import assert from "node:assert/strict";
import test from "node:test";

import {
  CONTENT_ROOTS,
  CONTENT_SIGNAL,
  CRAWLER_POLICY,
  MACHINE_HEADER_RULES,
  MANIFEST_VERSION,
  MARKDOWN_PROFILE_VERSION,
} from "./config.mjs";
import {
  artifactPathToDisk,
  extractDocumentLinks,
  injectDiscoveryLinks,
  markdownPathForRoute,
  renderPageMarkdown,
  renderRobots,
  rewriteHref,
  validateHeadersText,
  validateManifestObject,
} from "./corpus.mjs";

function validHeaders() {
  const globalRule = `/*\n  Content-Signal: ${CONTENT_SIGNAL}\n`;
  const machineRules = [...MACHINE_HEADER_RULES]
    .map(
      ([path, mediaType]) =>
        `${path}\n  Content-Type: ${mediaType}\n  Cache-Control: public, max-age=300, must-revalidate\n  Access-Control-Allow-Origin: *\n  X-Content-Type-Options: nosniff\n`,
    )
    .join("\n");
  return `${globalRule}\n${machineRules}`;
}

function validManifest() {
  const canonicalUrl = "https://wiki.zshell.dev/docs";
  const markdownUrl = "https://wiki.zshell.dev/docs/index.md";
  const digest = "a".repeat(64);
  return {
    schema_version: MANIFEST_VERSION,
    markdown_profile_version: MARKDOWN_PROFILE_VERSION,
    name: "Fixture corpus",
    description: "A manifest validation fixture.",
    canonical_url: "https://wiki.zshell.dev/",
    manifest_url: "https://wiki.zshell.dev/ai/v1/manifest.json",
    source_repository: "https://github.com/z-shell/wiki",
    source_authority: "human-facing wiki",
    release: {
      owner: "ss-o",
      evidence_url: "https://github.com/z-shell/wiki/issues/795",
      completed_phases: ["1A", "1B"],
    },
    capabilities: {
      static_discovery: true,
      retrieval_api: false,
      mcp: false,
    },
    content_signal: CONTENT_SIGNAL,
    default_locale: "en",
    locales: [
      {
        id: "en",
        default: true,
        path_prefix: "",
        canonical_base_url: "https://wiki.zshell.dev/",
        llms_url: "https://wiki.zshell.dev/llms.txt",
        llms_full_url: "https://wiki.zshell.dev/llms-full.txt",
        manifest_url: "https://wiki.zshell.dev/ai/v1/manifest.json",
      },
    ],
    sections: CONTENT_ROOTS.map(({description, id, title}) => ({id, title, description})),
    documents: [
      {
        id: "en:/docs",
        translation_key: "/docs",
        section: "docs",
        locale: "en",
        title: "Docs",
        description: "Fixture documentation.",
        source_path: "docs/index.mdx",
        canonical_url: canonicalUrl,
        markdown_url: markdownUrl,
        alternates: [{locale: "en", canonical_url: canonicalUrl, markdown_url: markdownUrl}],
        bytes: 10,
        sha256: digest,
      },
    ],
    artifacts: [
      {
        path: "/docs/index.md",
        url: markdownUrl,
        kind: "document",
        locale: "en",
        media_type: "text/markdown; charset=utf-8",
        bytes: 10,
        sha256: digest,
      },
    ],
  };
}

test("canonical routes map to explicit index.md artifacts", () => {
  assert.equal(markdownPathForRoute("/docs"), "/docs/index.md");
  assert.equal(markdownPathForRoute("/docs/guides/commands/"), "/docs/guides/commands/index.md");
  assert.equal(artifactPathToDisk("/tmp/build", "/fr/docs/caf%C3%A9/index.md"), "/tmp/build/fr/docs/café/index.md");
});

test("same-corpus links are rewritten while external links remain canonical", () => {
  const page = {canonicalUrl: "https://wiki.zshell.dev/docs"};
  const routeMap = new Map([["/community/zunit", {markdownUrl: "https://wiki.zshell.dev/community/zunit/index.md"}]]);

  assert.equal(
    rewriteHref("/community/zunit#documentation", page, routeMap, "https://wiki.zshell.dev"),
    "https://wiki.zshell.dev/community/zunit/index.md#documentation",
  );
  assert.equal(
    rewriteHref("https://github.com/z-shell/wiki", page, routeMap, "https://wiki.zshell.dev"),
    "https://github.com/z-shell/wiki",
  );
});

test("rendered Prism code blocks preserve line boundaries", () => {
  const page = {
    canonicalUrl: "https://wiki.zshell.dev/docs/example",
    description: "Fixture page.",
    locale: "en",
    markdownUrl: "https://wiki.zshell.dev/docs/example/index.md",
    route: "/docs/example",
    sourcePath: "docs/example.mdx",
    title: "Example",
  };
  const html =
    '<div class="theme-doc-markdown"><h1>Example</h1><pre class="language-zsh"><code><span class="token-line">first line</span><span class="token-line">second line</span></code></pre></div>';
  const markdown = renderPageMarkdown(page, new Map(), "https://wiki.zshell.dev", html);

  assert.match(markdown, /```zsh\nfirst line\nsecond line\n```/);
});

test("HTML discovery links are deterministic and idempotent", () => {
  const page = {
    locale: "en",
    markdownUrl: "https://wiki.zshell.dev/docs/example/index.md",
    pathPrefix: "",
    route: "/docs/example",
    section: "docs",
  };
  const html =
    '<html><head><link rel="canonical" href="https://wiki.zshell.dev/docs/example"></head><body></body></html>';
  const once = injectDiscoveryLinks(html, page, "https://wiki.zshell.dev");
  const twice = injectDiscoveryLinks(once, page, "https://wiki.zshell.dev");

  assert.equal(once, twice);
  assert.match(once, /rel="alternate" type="text\/markdown"/);
  assert.match(once, /rel="describedby" type="text\/plain"/);
});

test("link extraction covers preserved HTML but ignores fenced examples", () => {
  const source = [
    "[Markdown](https://wiki.zshell.dev/docs/index.md)",
    "[ZI\\[PKG_OWNER\\]](https://wiki.zshell.dev/docs/owner/index.md)",
    "[func Run(names \\[\\]string)](https://wiki.zshell.dev/docs/run/index.md)",
    "[outer [inner]](https://wiki.zshell.dev/docs/nested/index.md)",
    '<table><tr><td><a href="#raw-anchor">Raw link</a></td></tr></table>',
    "`[Inline code](https://wiki.zshell.dev/ignored-inline)`",
    "```html",
    '<a href="https://wiki.zshell.dev/ignored">Example only</a>',
    "```",
  ].join("\n");

  assert.deepEqual(extractDocumentLinks(source), [
    "https://wiki.zshell.dev/docs/index.md",
    "https://wiki.zshell.dev/docs/owner/index.md",
    "https://wiki.zshell.dev/docs/run/index.md",
    "https://wiki.zshell.dev/docs/nested/index.md",
    "#raw-anchor",
  ]);
});

test("robots policy emits one explicit group per crawler", () => {
  const robots = renderRobots("https://wiki.zshell.dev");
  for (const {directive, path, userAgent} of CRAWLER_POLICY) {
    assert.equal(robots.match(new RegExp(`User-agent: ${userAgent.replace("*", "\\*")}`, "g"))?.length, 1);
    assert.match(robots, new RegExp(`User-agent: ${userAgent.replace("*", "\\*")}\\n${directive}: ${path}`));
  }
  assert.match(robots, /User-agent: GPTBot\nDisallow: \//);
  assert.match(robots, /User-agent: OAI-SearchBot\nAllow: \//);
});

test("delivery headers require one exact global content policy", () => {
  const headers = validHeaders();
  assert.equal(validateHeadersText(headers), true);
  assert.throws(() => validateHeadersText(headers.replace(`  Content-Signal: ${CONTENT_SIGNAL}\n`, "")), /exactly one/);
  assert.throws(() => validateHeadersText(`${headers}\n/extra\n  Content-Signal: ${CONTENT_SIGNAL}\n`), /exactly one/);
});

test("delivery headers fail closed on an ambiguous media type", () => {
  const headers = validHeaders().replace(
    "Content-Type: application/json; charset=utf-8",
    "Content-Type: text/plain; charset=utf-8",
  );
  assert.throws(() => validateHeadersText(headers), /application\/json/);
  assert.throws(
    () => validateHeadersText(`${validHeaders()}\n/*\n  Content-Type: text/html; charset=utf-8\n`),
    /resolves content-type/,
  );
});

test("manifest schema and semantic uniqueness are enforced", () => {
  const manifest = validManifest();
  assert.equal(validateManifestObject(manifest), true);

  const duplicate = structuredClone(manifest);
  duplicate.artifacts.push({...duplicate.artifacts[0], bytes: 11});
  assert.throws(() => validateManifestObject(duplicate), /duplicate path values/);

  const wrongDefault = structuredClone(manifest);
  wrongDefault.default_locale = "fr";
  assert.throws(() => validateManifestObject(wrongDefault), /schema validation failed/);
});
