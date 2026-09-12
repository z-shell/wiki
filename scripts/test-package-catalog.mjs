// Run after a production build and local Cloudflare preview (redirects included):
// pnpm exec wrangler pages dev build --port 3000
// node scripts/test-package-catalog.mjs http://127.0.0.1:3000
// Requires the personal playwright-cli tool; adds no site dependency.
import assert from "node:assert/strict";
import {execFileSync} from "node:child_process";
import {mkdtempSync, rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";

const origin = new URL(process.argv[2] ?? "http://127.0.0.1:3000");
assert(["localhost", "127.0.0.1", "[::1]"].includes(origin.hostname), "Use a local preview");
for (const [oldPath, destination] of [
  ["/ecosystem/packages/usage", "/ecosystem/packages"],
  ["/ecosystem/packages/synopsis", "/ecosystem/packages/guide"],
  ["/ecosystem/category/-packages", "/ecosystem/packages"],
]) {
  for (const suffix of ["", "/"]) {
    const response = await fetch(new URL(oldPath + suffix, origin), {redirect: "manual"});
    assert.equal(response.status, 301, oldPath + suffix);
    assert.equal(new URL(response.headers.get("location"), origin).pathname, destination);
    await response.body?.cancel();
  }
}
const cwd = mkdtempSync(join(tmpdir(), "package-catalog-"));
const session = `package-catalog-${process.pid}`;
const cli = (...args) =>
  execFileSync("playwright-cli", [`-s=${session}`, ...args], {cwd, encoding: "utf8", timeout: 60000});

try {
  cli("open", new URL("/ecosystem/packages", origin).href);
  const result = cli(
    "--raw",
    "run-code",
    String(async (page) => {
      const [origin] = page.url().split("/ecosystem/");
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.reload();
      const ids = await page.locator("[id]").evaluateAll((elements) => elements.map((element) => element.id));
      if (new Set(ids).size !== ids.length) throw new Error("Duplicate page anchors");
      const cards = page.locator("article details");
      if ((await cards.count()) !== 21) throw new Error("Expected all 21 packages");
      await page.locator("#fzf summary").focus();
      await page.keyboard.press("Enter");
      const fzf = page.locator("#fzf");
      if (!(await fzf.evaluate((el) => el.open))) throw new Error("Keyboard expansion failed");
      await fzf.getByRole("tab", {name: "Binary", exact: true}).click();
      const binary = fzf.getByRole("tabpanel").filter({visible: true});
      if (!(await binary.innerText()).includes('zi pack"binary" for fzf')) throw new Error("Wrong binary command");
      await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
      await binary.getByRole("button", {name: /copy/i}).click();
      const copied = await page.evaluate(() => navigator.clipboard.readText());
      if (copied.trim() !== 'zi pack"binary" for fzf') throw new Error("Copy returned the wrong command");
      await page.locator("#pyenv summary").click();
      if ((await fzf.getByRole("tab", {selected: true}).innerText()) !== "Binary") {
        throw new Error("Another package changed the selected profile");
      }
      await page.setViewportSize({width: 390, height: 844});
      if (await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)) {
        throw new Error("Mobile page overflows horizontally");
      }
      await page.goto(`${origin}/ecosystem/packages/usage#fzf-command-line-fuzzy-finder`);
      if (!page.url().endsWith("/ecosystem/packages#fzf-command-line-fuzzy-finder")) {
        throw new Error("Redirect lost the package bookmark");
      }
      await page.reload();
      await page.waitForFunction(() => document.querySelector("#fzf")?.open);
      await page.locator("#fzf summary").click();
      if (await page.locator("#fzf").evaluate((el) => el.open)) throw new Error("Collapse failed");
      await page.goto(`${page.url().split("#")[0]}#any-node`);
      await page.waitForFunction(() => document.querySelector("#any-node")?.open);
      await page.goto(`${origin}/ecosystem/packages/synopsis#introductory-example`);
      if (!page.url().endsWith("/ecosystem/packages/guide#introductory-example")) {
        throw new Error("Redirect lost the guide bookmark");
      }
      await page.locator("#introductory-example").waitFor({state: "visible"});
      if (errors.length) throw new Error(errors.join("\n"));
      return {packages: 21, keyboard: true, tabs: true, clipboard: true, mobile: true, deepLinks: true};
    }),
  );
  assert.deepEqual(JSON.parse(result), {
    packages: 21,
    keyboard: true,
    tabs: true,
    clipboard: true,
    mobile: true,
    deepLinks: true,
  });
  console.log("Package catalog browser checks passed.");
} finally {
  cli("close");
  rmSync(cwd, {recursive: true, force: true});
}
