#!/usr/bin/env node

import {readFile} from "node:fs/promises";

import {DEFAULT_LOCALE, EVALUATION_CASES} from "./config.mjs";
import {artifactPathToDisk, readManifest} from "./corpus.mjs";

try {
  const rootDir = process.cwd();
  const buildDir = `${rootDir}/build`;
  const manifest = await readManifest({rootDir, buildDir});
  const defaultLocale = manifest.locales.find(({id}) => id === DEFAULT_LOCALE);
  if (!defaultLocale) {
    throw new Error(`Manifest is missing the ${DEFAULT_LOCALE} locale`);
  }

  const rootIndex = await readFile(artifactPathToDisk(buildDir, new URL(defaultLocale.llms_url).pathname), "utf8");

  for (const {id, requiredText, translationKey} of EVALUATION_CASES) {
    const matches = manifest.documents.filter(
      ({locale, translation_key: documentKey}) => locale === DEFAULT_LOCALE && documentKey === translationKey,
    );
    if (matches.length !== 1) {
      throw new Error(`Evaluation ${id} expected one ${translationKey} document, found ${matches.length}`);
    }

    const [document] = matches;
    if (!rootIndex.includes(document.markdown_url)) {
      throw new Error(`Evaluation ${id} cannot discover ${document.markdown_url} from the root index`);
    }

    const sectionIndex = manifest.artifacts.find(
      ({kind, locale, path}) =>
        kind === "index" && locale === DEFAULT_LOCALE && path === `/${document.section}/llms.txt`,
    );
    if (!sectionIndex) {
      throw new Error(`Evaluation ${id} cannot find the ${document.section} section index`);
    }

    const sectionContent = await readFile(artifactPathToDisk(buildDir, sectionIndex.path), "utf8");
    if (!sectionContent.includes(document.markdown_url)) {
      throw new Error(`Evaluation ${id} cannot discover ${document.markdown_url} from ${sectionIndex.path}`);
    }

    const pageContent = (
      await readFile(artifactPathToDisk(buildDir, new URL(document.markdown_url).pathname), "utf8")
    ).toLowerCase();
    for (const expectedText of requiredText) {
      if (!pageContent.includes(expectedText.toLowerCase())) {
        throw new Error(`Evaluation ${id} did not find "${expectedText}" in ${document.markdown_url}`);
      }
    }
  }

  console.log(`Passed ${EVALUATION_CASES.length} deterministic corpus evaluation cases.`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
