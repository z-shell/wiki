import assert from "node:assert/strict";
import test from "node:test";

import {parseCodeFences, validateCodeFences} from "./validate-code-fences.mjs";

test("parses backtick and tilde fences with metadata", () => {
  const fences = parseCodeFences(
    ['```zi title="~/.zshrc"', "zi light example/plugin", "```", "~~~text", "output", "~~~"].join("\n"),
  );

  assert.deepEqual(
    fences.map(({language, line, unclosed}) => ({language, line, unclosed})),
    [
      {language: "zi", line: 1, unclosed: false},
      {language: "text", line: 4, unclosed: false},
    ],
  );
});

test("accepts exact supported languages and structural MDX fences", () => {
  const source = ["```zsh", "print -r -- hello", "```", "```mdx-code-block", "<Component>", "```"].join("\n");

  assert.deepEqual(validateCodeFences(source), []);
});

test("rejects missing, generic, and unsupported languages", () => {
  const source = ["```", "output", "```", "```shell", "echo hi", "```", "```made-up", "value", "```"].join("\n");

  assert.deepEqual(validateCodeFences(source, "guide.mdx"), [
    "guide.mdx:1: code fence must declare a language",
    "guide.mdx:4: replace generic shell with zi, zsh, zunit, bash, sh, or another exact language",
    'guide.mdx:7: unsupported code-fence language "made-up"',
  ]);
});

test("requires the Zi grammar for direct Zi commands", () => {
  const source = ["```zsh", "if true; then", "  zi light example/plugin", "fi", "```"].join("\n");

  assert.deepEqual(validateCodeFences(source, "zi-example.mdx"), [
    "zi-example.mdx:1: Zi commands must use the zi language",
  ]);
});

test("requires the ZUnit grammar for ZUnit CLI examples", () => {
  const source = ["```sh", "zunit --tap tests", "```"].join("\n");

  assert.deepEqual(validateCodeFences(source, "zunit-example.mdx"), [
    "zunit-example.mdx:1: ZUnit CLI examples must use the zunit language",
  ]);
});

test("reports an unclosed fence", () => {
  assert.deepEqual(validateCodeFences("```zsh\nprint ok", "broken.mdx"), ["broken.mdx:1: code fence is not closed"]);
});
