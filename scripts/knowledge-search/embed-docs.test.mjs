import assert from "node:assert/strict";
import test from "node:test";

import {hash, validateRequiredEnv} from "./embed-docs.mjs";

test("validateRequiredEnv reports the first missing variable", () => {
  assert.throws(
    () => validateRequiredEnv({OPENAI_API_KEY: "sk-test"}, ["SUPABASE_DB_URL", "OPENAI_API_KEY"]),
    /SUPABASE_DB_URL is required/u,
  );
});

test("hash returns a stable sha256 digest", () => {
  assert.equal(hash("z-shell"), "68a0faecb2d8131317ebb90f69a5b99761c9c418b438c3558699c4408095dcb8");
});
