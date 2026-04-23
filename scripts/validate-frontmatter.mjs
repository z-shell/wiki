#!/usr/bin/env node
/**
 * Validate MDX frontmatter across docs/, community/, and ecosystem/.
 *
 * Required fields (hard-fail): id, title, sidebar_position
 * Recommended fields (warn): description, keywords
 * Exempt: any file whose basename starts with _
 *
 * Usage:
 *   node scripts/validate-frontmatter.mjs [file]  # check a file or all roots
 *   pnpm validate:frontmatter --warn-only        # report but do not exit non-zero
 */

import {readFileSync, readdirSync} from "fs";
import {join, basename} from "path";

const WARN_ONLY = process.argv.includes("--warn-only");
const TARGET_FILE = process.argv.find((arg) => arg.endsWith(".mdx") && !arg.startsWith("-"));
const ROOTS = ["docs", "community", "ecosystem"];
const REQUIRED = ["id", "title", "sidebar_position"];
const RECOMMENDED = ["description", "keywords"];

/**
 * Collect all .mdx files under a directory recursively,
 * skipping files whose basename starts with _.
 */
function collectMdx(dir) {
  const results = [];
  try {
    for (const entry of readdirSync(dir, {withFileTypes: true})) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...collectMdx(full));
      } else if (entry.isFile() && entry.name.endsWith(".mdx") && !entry.name.startsWith("_")) {
        results.push(full);
      }
    }
  } catch {
    // Directory may not exist
  }
  return results;
}

/**
 * Extract the raw YAML frontmatter string from MDX content.
 * Returns null if no frontmatter block found.
 */
function extractFrontmatter(content) {
  const match = content.match(/^---\r?\n(?:[\s\S]*?)\r?\n---/);
  return match ? match[0].replace(/^---\r?\n/, "").replace(/\r?\n---$/, "") : null;
}

/**
 * Check whether a YAML key is present in the frontmatter string.
 */
function hasKey(yaml, key) {
  return new RegExp(`^${key}\\s*:`, "m").test(yaml);
}

const files = TARGET_FILE ? [TARGET_FILE] : ROOTS.flatMap((root) => collectMdx(root));

let errors = 0;
let warnings = 0;

for (const file of files) {
  if (basename(file).startsWith("_")) {
    continue;
  }
  let content;
  try {
    content = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  const fm = extractFrontmatter(content);

  if (!fm) {
    console.log(`${file}:1:1: error: missing frontmatter block entirely`);
    errors++;
    continue;
  }

  const missingRequired = REQUIRED.filter((k) => !hasKey(fm, k));
  const missingRecommended = RECOMMENDED.filter((k) => !hasKey(fm, k));

  if (missingRequired.length > 0) {
    console.log(`${file}:1:1: error: missing required field(s): ${missingRequired.join(", ")}`);
    errors++;
  }

  if (missingRecommended.length > 0) {
    console.log(`${file}:1:1: warning: missing recommended field(s): ${missingRecommended.join(", ")}`);
    warnings++;
  }
}

if (!TARGET_FILE) {
  if (errors === 0 && warnings === 0) {
    console.log("✅ All MDX frontmatter is valid.");
  } else {
    console.log(`\nFound ${errors} errors and ${warnings} warnings.`);
  }
}

if (errors > 0 && !WARN_ONLY) {
  process.exit(1);
}
