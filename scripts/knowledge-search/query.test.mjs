import assert from "node:assert/strict";
import test from "node:test";

import {formatResult, validateQueryEnv} from "./query.mjs";

test("validateQueryEnv requires the public URL and server key", () => {
  assert.throws(() => validateQueryEnv({SUPABASE_URL: "https://example.supabase.co"}), /SUPABASE_SERVICE_ROLE_KEY/u);
});

test("formatResult prints score, title, URL, and excerpt", () => {
  assert.equal(
    formatResult({
      similarity: 0.876,
      title: "Release",
      heading: "Tag-driven releases",
      url: "https://wiki.zshell.dev/docs/release",
      content: "Publish user-facing releases from semantic tags. Keep main as continuous validation.",
    }),
    "88% Release > Tag-driven releases\nhttps://wiki.zshell.dev/docs/release\nPublish user-facing releases from semantic tags. Keep main as continuous validation.",
  );
});
