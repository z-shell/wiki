#!/usr/bin/env node

import {validateCorpus} from "./corpus.mjs";

try {
  const result = await validateCorpus();
  console.log(
    `Validated ${result.artifacts} artifacts, ${result.documents} canonical documents, and ${result.auditedLinkFiles} link-bearing files across ${result.locales.join(", ")}.`,
  );
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
