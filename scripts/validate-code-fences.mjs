import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPOSITORY_ROOT = path.resolve(SCRIPT_DIR, "..");
const CONTENT_ROOTS = ["docs", "community", "ecosystem", "src/components/Markdown"];

export const SUPPORTED_LANGUAGES = new Set([
  "bash",
  "diff",
  "docker",
  "go",
  "ini",
  "json",
  "jsx",
  "mdx",
  "sh",
  "shell-session",
  "text",
  "vim",
  "yaml",
  "zi",
  "zsh",
  "zunit",
]);

function listMarkdownFiles(root) {
  const files = [];
  const pending = CONTENT_ROOTS.map((contentRoot) => path.join(root, contentRoot));

  while (pending.length > 0) {
    const entry = pending.pop();
    if (!entry || !fs.existsSync(entry)) continue;

    const stat = fs.statSync(entry);
    if (stat.isDirectory()) {
      for (const child of fs.readdirSync(entry)) pending.push(path.join(entry, child));
    } else if (/\.mdx?$/.test(entry)) {
      files.push(entry);
    }
  }

  return files.sort();
}

export function parseCodeFences(source) {
  const lines = source.split("\n");
  const fences = [];

  for (let index = 0; index < lines.length; index += 1) {
    const opening = lines[index].match(/^\s*(?<fence>`{3,}|~{3,})(?<info>.*)$/);
    if (!opening) continue;

    const {fence, info: rawInfo} = opening.groups;
    const [marker] = fence;
    const width = fence.length;
    const info = rawInfo.trim();
    const language = info.split(/\s+/)[0] ?? "";
    const body = [];
    const line = index + 1;
    const closingPattern = new RegExp(`^\\s*${marker}{${width},}\\s*$`);

    index += 1;
    while (index < lines.length && !closingPattern.test(lines[index])) {
      body.push(lines[index]);
      index += 1;
    }

    fences.push({body: body.join("\n"), info, language, line, unclosed: index >= lines.length});
  }

  return fences;
}

export function validateCodeFences(source, file = "document.mdx") {
  const errors = [];

  for (const fence of parseCodeFences(source)) {
    const location = `${file}:${fence.line}`;

    if (fence.unclosed) {
      errors.push(`${location}: code fence is not closed`);
      continue;
    }

    if (!fence.language) {
      errors.push(`${location}: code fence must declare a language`);
      continue;
    }

    if (fence.language === "mdx-code-block") continue;

    if (fence.language === "shell") {
      errors.push(`${location}: replace generic shell with zi, zsh, zunit, bash, sh, or another exact language`);
      continue;
    }

    if (!SUPPORTED_LANGUAGES.has(fence.language)) {
      errors.push(`${location}: unsupported code-fence language ${JSON.stringify(fence.language)}`);
      continue;
    }

    if (fence.language === "zsh" && /^\s*(?:zi|zinit)\s/m.test(fence.body)) {
      errors.push(`${location}: Zi commands must use the zi language`);
    }

    if (fence.language === "sh" && /^\s*zunit(?:\s|$)/m.test(fence.body)) {
      errors.push(`${location}: ZUnit CLI examples must use the zunit language`);
    }
  }

  return errors;
}

export function validateRepository(root = REPOSITORY_ROOT) {
  const errors = [];

  for (const file of listMarkdownFiles(root)) {
    const relativeFile = path.relative(root, file);
    errors.push(...validateCodeFences(fs.readFileSync(file, "utf8"), relativeFile));
  }

  return errors;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const errors = validateRepository();
  if (errors.length > 0) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
  } else {
    console.log("Code-fence validation passed.");
  }
}
