#!/usr/bin/env node

import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Define the root directory for documentation
const rootDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
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

// Function to generate a description based on file path and content
function generateDescription(filePath, content) {
  // Extract the first heading from content to use as fallback
  const headingMatch = content.match(/^#\s+(.*)/m);
  const firstHeading = headingMatch ? headingMatch[1] : "";

  // Extract file name without extension and numbers
  const fileName = path.basename(filePath, ".mdx").replace(/^\d+_/, "").replace(/_/g, " ").replace(/-/g, " ");

  // Get directory name for context
  const dirName = path.dirname(filePath).split("/").pop().replace(/_/g, " ").replace(/-/g, " ");

  // Generate description based on available info
  if (firstHeading) {
    return `Comprehensive guide to ${firstHeading.replace(/[^\w\s]/g, "")}`;
  } else if (fileName) {
    return `Documentation for ${fileName.charAt(0).toUpperCase() + fileName.slice(1)} in the ${dirName} section`;
  } else {
    return `Z-Shell documentation for ${dirName}`;
  }
}

// Function to fix front matter with missing descriptions
function fixEmptyDescriptions(filePath) {
  try {
    // Read the file
    const content = fs.readFileSync(filePath, "utf8");
    const {data: frontMatter, content: mdxContent} = matter(content);

    // Skip if description is not empty or is a multi-line format
    if (
      frontMatter.description &&
      frontMatter.description !== "" &&
      !frontMatter.description.toString().startsWith(">-")
    ) {
      return null;
    }

    // For multi-line descriptions that might be empty after the >- syntax
    if (
      frontMatter.description &&
      frontMatter.description.toString().startsWith(">-") &&
      frontMatter.description.toString().trim() !== ">-"
    ) {
      return null;
    }

    // Generate a suitable description
    const newDescription = generateDescription(filePath, mdxContent);

    // Update front matter
    const newFrontMatter = {
      ...frontMatter,
      description: newDescription,
    };

    // Write updated content back to file
    const yamlFrontMatter = matter.stringify(mdxContent, newFrontMatter);
    fs.writeFileSync(filePath, yamlFrontMatter);

    return {
      file: filePath,
      oldDescription: frontMatter.description || "",
      newDescription,
    };
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return null;
  }
}

// Process all MDX files in the specified sections
function fixAllDescriptions() {
  const changes = [];

  for (const section of sections) {
    const sectionPath = path.join(rootDir, section);
    if (fs.existsSync(sectionPath)) {
      const files = getFiles(sectionPath);

      files.forEach((file) => {
        const change = fixEmptyDescriptions(file);
        if (change) {
          changes.push(change);
          console.log(`✅ Updated: ${file}`);
          console.log(`   New description: "${change.newDescription}"`);
        }
      });
    }
  }

  console.log(`\nTotal files updated: ${changes.length}`);
}

// Run the fix
fixAllDescriptions();
