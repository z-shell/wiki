import assert from "node:assert/strict";
import {mkdir, mkdtemp, writeFile} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {chunkMarkdown, collectDocs, extractTitle, stripFrontmatter} from "./collect-docs.mjs";

test("stripFrontmatter removes leading YAML metadata", () => {
  const raw = "---\ntitle: Example\n---\n# Example\n\nBody text.";

  assert.equal(stripFrontmatter(raw), "# Example\n\nBody text.");
});

test("extractTitle uses first level-one heading", () => {
  assert.equal(extractTitle("# Install Zi\n\nContent", "docs/getting_started/01_installation.mdx"), "Install Zi");
});

test("chunkMarkdown creates heading-aware searchable chunks", () => {
  const chunks = chunkMarkdown(
    "# Install\n\nThis is a long enough paragraph for indexing Z-Shell documentation search results.\n\n## Next\n\nThis second section is also long enough to become a chunk for semantic lookup.",
    "Fallback",
  );

  assert.equal(chunks.length, 2);
  assert.deepEqual(
    chunks.map((chunk) => chunk.heading),
    ["Install", "Next"],
  );
  assert.deepEqual(
    chunks.map((chunk) => chunk.chunkIndex),
    [0, 1],
  );
});

test("collectDocs returns public wiki source metadata and chunks", async () => {
  const root = await makeFixture({
    "docs/index.mdx":
      "---\ntitle: Intro\n---\n# Intro\n\nThis document has enough text to be collected as a searchable public wiki chunk.",
    "community/plugin.mdx":
      "# Plugin\n\nThis community document has enough text to be collected as a searchable chunk.",
    "blog/ignored.mdx": "# Ignored\n\nThis should not be indexed.",
  });

  const docs = await collectDocs(root);

  assert.deepEqual(
    docs.map((doc) => doc.path),
    ["community/plugin.mdx", "docs/index.mdx"],
  );
  assert.equal(docs[0].repo, "z-shell/wiki");
  assert.equal(docs[0].visibility, "public");
  assert.equal(docs[0].sourceKey, "z-shell/wiki:community/plugin.mdx");
  assert.equal(docs[0].url, "https://wiki.zshell.dev/community/plugin");
  assert.equal(docs[0].chunks.length, 1);
});

async function makeFixture(files) {
  const root = await mkdtemp(path.join(os.tmpdir(), `knowledge-search-${process.pid}-`));
  await Promise.all(
    Object.entries(files).map(async ([relativePath, content]) => {
      const target = path.join(root, relativePath);
      await mkdir(path.dirname(target), {recursive: true});
      await writeFile(target, content);
    }),
  );
  return root;
}
