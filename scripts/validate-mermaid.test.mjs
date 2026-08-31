import assert from "node:assert/strict";
import test from "node:test";

import {validateMermaid} from "./validate-mermaid.mjs";

test("accepts a valid accessible Mermaid diagram", async () => {
  const source = [
    "```mermaid",
    "flowchart LR",
    "  accTitle: Documentation workflow",
    "  accDescr: Source content passes checks before review.",
    "  Source --> Check --> Review",
    "```",
  ].join("\n");

  assert.deepEqual(await validateMermaid(source), []);
});

test("rejects malformed Mermaid syntax with the fence location", async () => {
  const source = [
    "# Guide",
    "",
    "```mermaid",
    "flowchart LR",
    "  accTitle: Broken workflow",
    "  accDescr: This diagram is intentionally malformed.",
    "  Source -> Review",
    "```",
  ].join("\n");

  assert.deepEqual(await validateMermaid(source, "guide.mdx"), ["guide.mdx:3: invalid Mermaid diagram"]);
});

test("requires accessible titles and descriptions", async () => {
  const source = ["```mermaid", "flowchart LR", "  Source --> Review", "```"].join("\n");

  assert.deepEqual(await validateMermaid(source, "guide.mdx"), [
    "guide.mdx:1: Mermaid diagram must define accTitle",
    "guide.mdx:1: Mermaid diagram must define accDescr",
  ]);
});

test("accepts a multiline accessible description", async () => {
  const source = [
    "```mermaid",
    "flowchart LR",
    "  accTitle: Documentation workflow",
    "  accDescr {",
    "    Source content passes checks before review.",
    "  }",
    "  Source --> Review",
    "```",
  ].join("\n");

  assert.deepEqual(await validateMermaid(source), []);
});

test("rejects an empty multiline accessible description", async () => {
  const source = [
    "```mermaid",
    "flowchart LR",
    "  accTitle: Documentation workflow",
    "  accDescr {",
    "  }",
    "  Source --> Review",
    "```",
  ].join("\n");

  assert.deepEqual(await validateMermaid(source, "guide.mdx"), ["guide.mdx:1: Mermaid diagram must define accDescr"]);
});

test("ignores non-Mermaid code fences", async () => {
  const source = ["```text", "flowchart LR", "  Source -> Review", "```"].join("\n");

  assert.deepEqual(await validateMermaid(source), []);
});
