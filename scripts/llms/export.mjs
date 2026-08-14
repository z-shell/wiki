#!/usr/bin/env node

import {exportCorpus} from "./corpus.mjs";

try {
  const result = await exportCorpus();
  console.log(
    `Generated ${result.artifacts} artifacts for ${result.documents} documents across ${result.locales.join(", ")}; excluded ${result.generatedRoutes} generated routes and ${result.unlistedRoutes} unlisted routes.`,
  );
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
