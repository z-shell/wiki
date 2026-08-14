import assert from "node:assert/strict";
import {spawnSync} from "node:child_process";
import {mkdtempSync, rmSync, symlinkSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import test from "node:test";
import {fileURLToPath} from "node:url";

import {formatLycheeIssues} from "./trunk-lychee.mjs";

test("formats Lychee JSON failures as Trunk issues", () => {
  const report = {
    error_map: {
      "/repo/docs/install.mdx": [
        {
          url: "https://example.com/missing",
          status: {code: 404, text: "Rejected status code: 404 Not Found"},
        },
      ],
    },
  };

  assert.deepEqual(formatLycheeIssues(report, "/repo"), [
    "docs/install.mdx:1:1: error: [404] https://example.com/missing | Rejected status code: 404 Not Found",
  ]);
});

test("returns no issues for a clean Lychee report", () => {
  assert.deepEqual(formatLycheeIssues({error_map: {}}, "/repo"), []);
});

test("executes the CLI when invoked through a sandbox symlink", () => {
  const directory = mkdtempSync(join(tmpdir(), "trunk-lychee-"));
  try {
    const symlink = join(directory, "trunk-lychee.mjs");
    symlinkSync(fileURLToPath(new URL("./trunk-lychee.mjs", import.meta.url)), symlink);
    const result = spawnSync(process.execPath, [symlink], {encoding: "utf8"});

    assert.equal(result.status, 2);
    assert.match(result.stderr, /expected at least one target/);
  } finally {
    rmSync(directory, {recursive: true, force: true});
  }
});
