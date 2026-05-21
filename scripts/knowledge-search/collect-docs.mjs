import {readdir, readFile} from "node:fs/promises";
import path from "node:path";

const DOC_ROOTS = ["docs", "community", "ecosystem"];
const MAX_CHARS = 2200;
const MIN_CHARS = 80;

export async function collectDocs(root = process.cwd()) {
  const nested = await Promise.all(DOC_ROOTS.map((docRoot) => listMarkdown(path.join(root, docRoot), docRoot)));
  const files = nested.flat();
  files.sort();
  return Promise.all(files.map((relativePath) => readDocument(root, relativePath)));
}

export function stripFrontmatter(raw) {
  return raw.replace(/^---\n[\s\S]*?\n---\n/, "");
}

export function extractTitle(content, relativePath) {
  const heading = content.match(/^#\s+(?<title>.+)$/m);
  if (heading?.groups?.title) return heading.groups.title.trim();
  return path.basename(relativePath, path.extname(relativePath)).replaceAll("-", " ");
}

export function chunkMarkdown(content, fallbackHeading) {
  const lines = content.split(/\r?\n/);
  const chunks = [];
  let heading = fallbackHeading;
  let buffer = [];

  for (const line of lines) {
    const nextHeading = line.match(/^(?:#{1,3})\s+(?<title>.+)$/);
    if (nextHeading && buffer.join("\n").trim().length > 0) {
      pushChunks(chunks, heading, buffer.join("\n"));
      heading = nextHeading.groups.title.trim();
      buffer = [line];
    } else {
      if (nextHeading) heading = nextHeading.groups.title.trim();
      buffer.push(line);
    }
  }

  pushChunks(chunks, heading, buffer.join("\n"));
  return chunks.map((chunk, index) => ({...chunk, chunkIndex: index}));
}

async function listMarkdown(absoluteDir, relativeDir) {
  const entries = await readdir(absoluteDir, {withFileTypes: true}).catch((error) => {
    if (error.code === "ENOENT") return [];
    throw error;
  });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(absoluteDir, entry.name);
    const relativePath = path.join(relativeDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listMarkdown(absolutePath, relativePath)));
    } else if (entry.isFile() && /\.(?:md|mdx)$/u.test(entry.name)) {
      files.push(relativePath);
    }
  }

  return files;
}

async function readDocument(root, relativePath) {
  const raw = await readFile(path.join(root, relativePath), "utf8");
  const content = stripFrontmatter(raw);
  const title = extractTitle(content, relativePath);

  return {
    repo: "z-shell/wiki",
    path: relativePath,
    sourceKey: `z-shell/wiki:${relativePath}`,
    url: toWikiUrl(relativePath),
    title,
    visibility: "public",
    chunks: chunkMarkdown(content, title),
  };
}

function pushChunks(chunks, heading, text) {
  const cleaned = text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (cleaned.length < MIN_CHARS) return;

  for (let start = 0; start < cleaned.length; start += MAX_CHARS) {
    const content = cleaned.slice(start, start + MAX_CHARS).trim();
    if (content.length >= MIN_CHARS) {
      chunks.push({
        heading,
        content,
        tokenEstimate: Math.ceil(content.length / 4),
      });
    }
  }
}

function toWikiUrl(relativePath) {
  const withoutExt = relativePath.replace(/\.(?:md|mdx)$/u, "");
  return `https://wiki.zshell.dev/${withoutExt}`;
}
