#!/usr/bin/env node
/**
 * Validate MDX frontmatter across docs/, community/, and ecosystem/.
 *
 * Required fields (hard-fail): id, title, sidebar_position
 * Recommended fields (warn): description, keywords
 * Exempt: any file whose basename starts with _
 *
 * Usage:
 *   pnpm validate:frontmatter              # check all three roots
 *   pnpm validate:frontmatter --warn-only  # report but do not exit non-zero
 */

import {readFileSync, readdirSync, statSync} from "fs";
import {join, basename} from "path";

const WARN_ONLY = process.argv.includes("--warn-only");
const ROOTS = ["docs", "community", "ecosystem"];
const REQUIRED = ["id", "title", "sidebar_position"];
const RECOMMENDED = ["description", "keywords"];

/**
 * Collect all .mdx files under a directory recursively,
 * skipping files whose basename starts with _.
 */
function collectMdx(dir) {
  const results = [];
  for (const entry of readdirSync(dir, {withFileTypes: true})) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectMdx(full));
    } else if (entry.isFile() && entry.name.endsWith(".mdx") && !entry.name.startsWith("_")) {
      results.push(full);
    }
  }
  return results;
}

/**
 * Extract the raw YAML frontmatter string from MDX content.
 * Returns null if no frontmatter block found.
 */
function extractFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? match[1] : null;
}

/**
 * Check whether a YAML key is present in the frontmatter string.
 * Matches "key:" at the start of a line (handles indented nested keys too,
 * but we only care about top-level keys here).
 */
function hasKey(yaml, key) {
  return new RegExp(`^${key}\\s*:`, "m").test(yaml);
}

let errors = 0;
let warnings = 0;
const errorLines = [];
const warnLines = [];

for (const root of ROOTS) {
  let files;
  try {
    files = collectMdx(root);
  } catch {
    // Root may not exist in all environments — skip gracefully
    continue;
  }

  for (const file of files) {
    const content = readFileSync(file, "utf8");
    const fm = extractFrontmatter(content);

    if (!fm) {
      errorLines.push(`  ${file}: missing frontmatter block entirely`);
      errors++;
      continue;
    }

    const missingRequired = REQUIRED.filter((k) => !hasKey(fm, k));
    const missingRecommended = RECOMMENDED.filter((k) => !hasKey(fm, k));

    if (missingRequired.length > 0) {
      errorLines.push(`  ${file}: missing required field(s): ${missingRequired.join(", ")}`);
      errors++;
    }

    if (missingRecommended.length > 0) {
      warnLines.push(`  ${file}: missing recommended field(s): ${missingRecommended.join(", ")}`);
      warnings++;
    }
  }
}

if (warnLines.length > 0) {
  console.warn("⚠️  Frontmatter warnings (recommended fields missing):");
  warnLines.forEach((l) => console.warn(l));
}

if (errorLines.length > 0) {
  console.error("\n❌ Frontmatter errors (required fields missing):");
  errorLines.forEach((l) => console.error(l));
}

if (errors === 0 && warnings === 0) {
  console.log("✅ All MDX frontmatter is valid.");
}

if (errors > 0 && !WARN_ONLY) {
  process.exit(1);
}
