import assert from "node:assert/strict";
import test from "node:test";

import {createJiti} from "jiti";
import Prism from "prismjs";
import "prismjs/components/prism-bash.js";

const jiti = createJiti(import.meta.url);
const {registerZShellLanguages} = await jiti.import("../src/prism/z-shell-languages.ts");
// prismjs is CommonJS at runtime, so these cannot be ESM named imports.
// eslint-disable-next-line import-x/no-named-as-default-member
const {highlight, languages} = Prism;
registerZShellLanguages(Prism);

test("Zi commands use the manager and command tokens", () => {
  const html = highlight("zi creinstall -q .", languages.zi, "zi");

  assert.match(html, /token keyword">zi/);
  assert.match(html, /token function">creinstall/);
});

test("core and annex ice modifiers receive Zi highlighting", () => {
  const html = highlight("zi wait lucid nocompletions bindmap'^R -> ^G' for sbin example/plugin", languages.zi, "zi");

  for (const ice of ["wait", "lucid", "nocompletions", "bindmap", "sbin"]) {
    assert.match(html, new RegExp(`token zi-ice builtin">${ice}`));
  }
});

test("Zsh expansion flags retain their custom token", () => {
  const source = ["print -r -- $", "{(M)path:#/usr/*}"].join("");
  const html = highlight(source, languages.zsh, "zsh");

  assert.match(html, /token zsh-expansion-flag attr-value/);
});
