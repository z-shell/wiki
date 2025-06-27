#!/usr/bin/env node

/**
 * Component Export Validator
 *
 * This script validates that all components are properly exported from the barrel file
 * and registered in MDXComponents.tsx when appropriate.
 *
 * Usage:
 *   node scripts/validate-components.js
 */

/* trunk-ignore(eslint/@typescript-eslint/no-require-imports) */
const fs = require("fs");
/* trunk-ignore(eslint/@typescript-eslint/no-require-imports) */
const path = require("path");

// Paths
const COMPONENTS_DIR = path.join(__dirname, "..", "src", "components");
const BARREL_FILE = path.join(COMPONENTS_DIR, "index.ts");
const MDX_COMPONENTS_FILE = path.join(__dirname, "..", "src", "theme", "MDXComponents.tsx");

// Read the files
const barrelContent = fs.readFileSync(BARREL_FILE, "utf8");
const mdxComponentsContent = fs.readFileSync(MDX_COMPONENTS_FILE, "utf8");

// Get all component directories
const componentDirs = fs
  .readdirSync(COMPONENTS_DIR, {withFileTypes: true})
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

console.log(`Found ${componentDirs.length} component directories`);

// Define special cases for non-standard exports
const specialCases = {
  Callouts: {
    inBarrel: barrelContent.includes("export { Note, Tip, Warning } from './Callouts'"),
    inMDX:
      mdxComponentsContent.includes("Note,") &&
      mdxComponentsContent.includes("Tip,") &&
      mdxComponentsContent.includes("Warning,"),
  },
  CodeTabs: {
    inBarrel: barrelContent.includes("export { default as CodeTabs, TabItem } from './CodeTabs'"),
    inMDX: mdxComponentsContent.includes("CodeTabs,") && mdxComponentsContent.includes("TabItem,"),
  },
  HomeBanner: {
    inBarrel: barrelContent.includes("export { default as HeroBanner } from './HomeBanner'"),
    inMDX: mdxComponentsContent.includes("HeroBanner,"),
  },
  // Skip directories that don't contain components
  types: {skip: true},
  "LinkRef/linkRegistry": {skip: true},
  Markdown: {skip: true},
};

// Check each component
let barrelMissingCount = 0;
let mdxMissingCount = 0;

componentDirs.forEach((dir) => {
  // Skip non-component directories
  if (dir.startsWith(".") || dir === "node_modules") {
    return;
  }

  // Handle special cases
  if (specialCases[dir] && specialCases[dir].skip) {
    console.log(`Skipping ${dir} (not a component directory)`);
    return;
  }

  // Check if component has an index.tsx file
  const indexPath = path.join(COMPONENTS_DIR, dir, "index.tsx");
  if (!fs.existsSync(indexPath)) {
    console.warn(`⚠️ ${dir} has no index.tsx file`);
    return;
  }

  // Check barrel file export
  let inBarrel = false;

  if (specialCases[dir] && specialCases[dir].inBarrel !== undefined) {
    inBarrel = specialCases[dir].inBarrel;
  } else {
    const exportPattern = new RegExp(
      `export\\s+{\\s*default\\s+as\\s+\\w+\\s*}\\s+from\\s+['"]\\.\\/${dir}['"]|export\\s*{[^}]*}\\s+from\\s+['"]\\.\\/${dir}['"]`,
      "i",
    );
    inBarrel = exportPattern.test(barrelContent);
  }

  if (!inBarrel) {
    console.error(`❌ ${dir} is not exported from the barrel file`);
    barrelMissingCount++;
  }

  // Check MDXComponents registration
  let inMDX = false;

  if (specialCases[dir] && specialCases[dir].inMDX !== undefined) {
    inMDX = specialCases[dir].inMDX;
  } else {
    // Check direct imports and barrel imports
    const importPattern = new RegExp(
      `import\\s+\\w+\\s+from\\s+['"]\\.\\.\\/components\\/${dir}['"]|import\\s*{[^}]*${dir}[^}]*}\\s+from`,
      "i",
    );
    const registrationPattern = new RegExp(`${dir}[,}]`, "i");

    inMDX = importPattern.test(mdxComponentsContent) || registrationPattern.test(mdxComponentsContent);
  }

  if (!inMDX) {
    console.warn(`⚠️ ${dir} might not be registered in MDXComponents.tsx`);
    mdxMissingCount++;
  }
});

// Summary
console.log("\n--- Summary ---");
if (barrelMissingCount === 0 && mdxMissingCount === 0) {
  console.log("✅ All components are properly exported and registered!");
} else {
  if (barrelMissingCount > 0) {
    console.log(`❌ ${barrelMissingCount} components missing from barrel file`);
  }
  if (mdxMissingCount > 0) {
    console.log(`⚠️ ${mdxMissingCount} components possibly missing from MDXComponents.tsx`);
  }
  console.log("\nPlease check and fix the issues above to ensure all components are properly integrated.");
}
