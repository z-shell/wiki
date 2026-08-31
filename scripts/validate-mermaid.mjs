#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

import {JSDOM} from "jsdom";

import {listMarkdownFiles, parseCodeFences} from "./validate-code-fences.mjs";

const REPOSITORY_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dom = new JSDOM("");
globalThis.window = dom.window;
globalThis.document = dom.window.document;
const {default: mermaid} = await import("mermaid");

function hasAccessibleDescription(lines) {
  for (let index = 0; index < lines.length; index += 1) {
    if (/^\s*accDescr:\s*\S/.test(lines[index])) return true;
    if (!/^\s*accDescr\s*\{\s*$/.test(lines[index])) continue;

    for (index += 1; index < lines.length && !/^\s*}\s*$/.test(lines[index]); index += 1) {
      if (lines[index].trim()) return true;
    }
    return false;
  }
  return false;
}

export async function validateMermaid(source, file = "document.mdx") {
  const errors = [];

  for (const fence of parseCodeFences(source)) {
    if (fence.language !== "mermaid" || fence.unclosed) continue;

    const lines = fence.body.split("\n");
    const hasAccTitle = lines.some((line) => /^\s*accTitle:\s*\S/.test(line));
    const hasAccDescr = hasAccessibleDescription(lines);
    if (!hasAccTitle) errors.push(`${file}:${fence.line}: Mermaid diagram must define accTitle`);
    if (!hasAccDescr) errors.push(`${file}:${fence.line}: Mermaid diagram must define accDescr`);

    try {
      const parsed = await mermaid.parse(fence.body, {suppressErrors: true});
      if (!parsed) {
        errors.push(`${file}:${fence.line}: invalid Mermaid diagram`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message.split("\n")[0] : String(error);
      errors.push(`${file}:${fence.line}: invalid Mermaid diagram: ${message}`);
    }
  }

  return errors;
}

async function main() {
  const errors = [];

  for (const file of listMarkdownFiles(REPOSITORY_ROOT)) {
    const relative = path.relative(REPOSITORY_ROOT, file);
    errors.push(...(await validateMermaid(fs.readFileSync(file, "utf8"), relative)));
  }

  if (errors.length > 0) {
    for (const error of errors) console.error(error);
    process.exitCode = 1;
    return;
  }

  console.log("Mermaid validation passed.");
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
