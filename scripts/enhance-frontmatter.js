#!/usr/bin/env node

/* trunk-ignore(eslint/@typescript-eslint/no-require-imports) */
const fs = require("fs");
/* trunk-ignore(eslint/@typescript-eslint/no-require-imports) */
const path = require("path");
/* trunk-ignore(eslint/@typescript-eslint/no-require-imports) */
const matter = require("gray-matter");

// Define the root directory for documentation
const rootDir = path.resolve(__dirname, "..");
const sections = ["docs", "community", "ecosystem"];

// Function to get all .mdx files in a directory recursively
function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getFiles(filePath, fileList);
    } else if (file.endsWith(".mdx")) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Function to enhance front matter
function enhanceFrontMatter(filePath) {
  // Read the file
  const content = fs.readFileSync(filePath, "utf8");
  const {data: frontMatter, content: mdxContent} = matter(content);

  // Get file name without extension for default id
  const fileName = path.basename(filePath, ".mdx");
  // Get directory name for category
  const dirName = path.dirname(filePath).split("/").pop();

  // Extract the first heading from content to use as fallback title
  const headingMatch = mdxContent.match(/^#\s+(.*)/m);
  const firstHeading = headingMatch ? headingMatch[1] : "";

  // Default image for documents
  const defaultImage = "/img/png/theme/z/320x320.png";

  // Determine document type based on path
  const docType = filePath.includes("/docs/") ? "docs" : filePath.includes("/community/") ? "community" : "ecosystem";

  // Set default tags based on document type and directory
  const defaultTags = [docType];
  if (dirName && dirName !== docType) {
    defaultTags.push(dirName);
  }

  // Generate a better description if none exists
  let description = frontMatter.description || "";
  if (!description && firstHeading) {
    description = `Documentation about ${firstHeading.replace(/[^\w\s]/g, "")}`;
  }

  // Combine existing front matter with new fields
  const newFrontMatter = {
    // Preserve existing id or generate from filename
    id: frontMatter.id || fileName.replace(/^\d+_/, ""),

    // Preserve existing title or use first heading
    title: frontMatter.title || firstHeading || fileName.replace(/^\d+_/, "").replace(/-/g, " "),

    // Add or preserve description
    description: description,

    // Add or preserve image
    image: frontMatter.image || defaultImage,

    // Add or preserve sidebar position (important for ordering)
    sidebar_position:
      frontMatter.sidebar_position || parseInt(fileName.match(/^(\d+)_/) ? fileName.match(/^(\d+)_/)[1] : 999),

    // Add keywords if they don't exist
    keywords: frontMatter.keywords || defaultTags,

    // Table of contents configuration
    toc_min_heading_level: frontMatter.toc_min_heading_level || 2,
    toc_max_heading_level: frontMatter.toc_max_heading_level || 3,

    // Preserve slug if it exists
    ...(frontMatter.slug && {slug: frontMatter.slug}),

    // Preserve hide_title if it exists
    ...(frontMatter.hide_title && {hide_title: frontMatter.hide_title}),

    // Add pagination settings if they don't exist
    ...(!frontMatter.pagination_next &&
      !frontMatter.pagination_prev && {
        // Default to true unless explicitly set
        hide_table_of_contents: frontMatter.hide_table_of_contents || false,
      }),

    // Preserve any other existing front matter
    ...Object.keys(frontMatter)
      .filter(
        (key) =>
          ![
            "id",
            "title",
            "description",
            "image",
            "sidebar_position",
            "keywords",
            "toc_min_heading_level",
            "toc_max_heading_level",
            "slug",
            "hide_title",
            "hide_table_of_contents",
          ].includes(key),
      )
      .reduce((obj, key) => {
        obj[key] = frontMatter[key];
        return obj;
      }, {}),
  };

  // Convert to YAML-compatible format and write back to the file
  const yamlFrontMatter = matter.stringify(mdxContent, newFrontMatter);
  fs.writeFileSync(filePath, yamlFrontMatter);

  return {
    file: filePath,
    before: frontMatter,
    after: newFrontMatter,
  };
}

// Process all MDX files in the specified sections
function updateAllMdx() {
  const changes = [];

  for (const section of sections) {
    const sectionPath = path.join(rootDir, section);
    if (fs.existsSync(sectionPath)) {
      const files = getFiles(sectionPath);

      files.forEach((file) => {
        try {
          const change = enhanceFrontMatter(file);
          changes.push(change);
          console.log(`✅ Updated: ${file}`);
        } catch (error) {
          console.error(`❌ Error updating ${file}:`, error);
        }
      });
    }
  }

  console.log(`\nTotal files processed: ${changes.length}`);
}

// Run the update
updateAllMdx();
