#!/usr/bin/env node
/**
 * Validate MDX frontmatter and sidebar metadata across docs/, community/, and ecosystem/.
 *
 * Frontmatter (per file):
 *   Required fields (hard-fail): id, title, sidebar_position
 *   Recommended fields (warn): description, keywords
 *   Exempt: any file whose basename starts with _
 *
 * Structure (per directory / root):
 *   - sibling sidebar_position / _category_.json position collisions (hard-fail)
 *   - _category_.json at a content-root top level, which never renders (hard-fail)
 *   - percent-encoded /category/ links, which are emoji-derived and fragile (hard-fail)
 *   - documented Node version disagreeing with engines.node (hard-fail)
 *   - landing page that does not sort first in its root (warn)
 *
 * Usage:
 *   node scripts/validate-frontmatter.mjs [file]  # check a file or all roots
 *   pnpm validate:frontmatter --warn-only        # report but do not exit non-zero
 */

import {readFileSync, readdirSync, existsSync} from "fs";
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
 * Collect all directories under a root, including the root itself.
 */
function collectDirs(dir) {
  const results = [dir];
  try {
    for (const entry of readdirSync(dir, {withFileTypes: true})) {
      if (entry.isDirectory()) {
        results.push(...collectDirs(join(dir, entry.name)));
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

/**
 * Read a scalar frontmatter value, or null when absent.
 */
function readValue(yaml, key) {
  const match = yaml.match(new RegExp(`^${key}\\s*:\\s*(.+?)\\s*$`, "m"));
  return match ? match[1].replace(/^["']|["']$/g, "") : null;
}

/**
 * Read frontmatter for an .mdx file, or null when unreadable.
 */
function frontmatterOf(file) {
  try {
    return extractFrontmatter(readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}

/**
 * Parse a _category_.json, or null when absent or malformed.
 */
function readCategory(dir) {
  const path = join(dir, "_category_.json");
  if (!existsSync(path)) {
    return null;
  }
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
}

const files = TARGET_FILE ? [TARGET_FILE] : ROOTS.flatMap((root) => collectMdx(root));

let errors = 0;
let warnings = 0;

const error = (location, message) => {
  console.log(`${location}: error: ${message}`);
  errors++;
};
const warn = (location, message) => {
  console.log(`${location}: warning: ${message}`);
  warnings++;
};

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
    error(`${file}:1:1`, "missing frontmatter block entirely");
    continue;
  }

  const missingRequired = REQUIRED.filter((k) => !hasKey(fm, k));
  const missingRecommended = RECOMMENDED.filter((k) => !hasKey(fm, k));

  if (missingRequired.length > 0) {
    error(`${file}:1:1`, `missing required field(s): ${missingRequired.join(", ")}`);
  }

  if (missingRecommended.length > 0) {
    warn(`${file}:1:1`, `missing recommended field(s): ${missingRecommended.join(", ")}`);
  }
}

/**
 * Structural checks run over whole roots, so they are skipped
 * when validating a single file.
 */
if (!TARGET_FILE) {
  for (const root of ROOTS) {
    // A content root's own directory is the sidebar root, so a _category_.json
    // placed there configures a category that is never created.
    if (existsSync(join(root, "_category_.json"))) {
      error(
        `${root}/_category_.json:1:1`,
        "content-root _category_.json never renders; the root directory is the sidebar root",
      );
    }

    for (const dir of collectDirs(root)) {
      const category = readCategory(dir);
      // A category whose link is a doc hoists that doc onto the category itself,
      // so it is not an ordered sibling and cannot collide.
      const linkDocId = category?.link?.type === "doc" ? category.link.id : null;
      const siblings = new Map();

      for (const entry of readdirSync(dir, {withFileTypes: true})) {
        const full = join(dir, entry.name);

        if (entry.isFile() && entry.name.endsWith(".mdx") && !entry.name.startsWith("_")) {
          const fm = frontmatterOf(full);
          if (!fm) {
            continue;
          }
          if (linkDocId && readValue(fm, "id") === linkDocId) {
            continue;
          }
          const position = readValue(fm, "sidebar_position");
          if (position !== null) {
            siblings.set(entry.name, Number(position));
          }
        }

        if (entry.isDirectory()) {
          const childCategory = readCategory(full);
          if (childCategory && typeof childCategory.position === "number") {
            siblings.set(`${entry.name}/`, childCategory.position);
          }
        }
      }

      const byPosition = new Map();
      for (const [name, position] of siblings) {
        byPosition.set(position, [...(byPosition.get(position) ?? []), name]);
      }
      for (const [position, names] of [...byPosition].sort((a, b) => a[0] - b[0])) {
        if (names.length > 1) {
          error(
            `${dir}:1:1`,
            `sidebar position ${position} is shared by ${names.join(", ")}; sibling order is then incidental`,
          );
        }
      }

      // The landing page should sort first in its own root.
      if (dir === root && siblings.size > 0) {
        const lowest = Math.min(...siblings.values());
        const landing = [...siblings].find(([name]) => name === "index.mdx");
        if (landing && landing[1] !== lowest) {
          warn(
            `${join(root, "index.mdx")}:1:1`,
            `landing page sidebar_position ${landing[1]} is not the lowest in ${root}/ (${lowest}); it will not render first`,
          );
        }
      }
    }
  }

  // Generated-index category URLs are derived from emoji labels. Percent-encoded
  // links are unreadable and break silently whenever a label is edited.
  for (const file of ROOTS.flatMap((root) => collectMdx(root))) {
    const content = readFileSync(file, "utf8");
    const lines = content.split(/\r?\n/);
    lines.forEach((line, index) => {
      const match = line.match(/\/category\/\S*%[0-9A-Fa-f]{2}\S*/);
      if (match) {
        error(
          `${file}:${index + 1}:1`,
          `percent-encoded category link ${match[0]}; give the category an explicit slug instead`,
        );
      }
    });
  }

  // A documented Node floor below engines.node sends contributors into an
  // install failure that the prerequisite list told them to expect to work.
  try {
    const engines = JSON.parse(readFileSync("package.json", "utf8")).engines ?? {};
    const required = engines.node ? Number(engines.node.replace(/[^\d.]/g, "").split(".")[0]) : null;
    if (required) {
      for (const file of ROOTS.flatMap((root) => collectMdx(root))) {
        const lines = readFileSync(file, "utf8").split(/\r?\n/);
        lines.forEach((line, index) => {
          // Match a documented Node version floor, e.g. "Node.js ≥ 20" or
          // "Node >= 20". Any markdown link between the word and the operator is
          // skipped, since the URL itself carries no version.
          const match = line.match(/Node(?:\.js)?\b[^\n]{0,40}?(?:≥|>=|&gt;=)\s*v?(?<version>\d+)/i);
          if (match?.groups && Number(match.groups.version) < required) {
            error(
              `${file}:${index + 1}:1`,
              `documented Node ${match.groups.version} is below engines.node (${required})`,
            );
          }
        });
      }
    }
  } catch {
    // package.json unreadable; engine drift cannot be checked
  }
}

if (!TARGET_FILE) {
  if (errors === 0 && warnings === 0) {
    console.log("✅ All MDX frontmatter and sidebar metadata is valid.");
  } else {
    console.log(`\nFound ${errors} errors and ${warnings} warnings.`);
  }
}

if (errors > 0 && !WARN_ONLY) {
  process.exit(1);
}
