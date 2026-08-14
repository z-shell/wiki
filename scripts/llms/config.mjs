import {readFileSync} from "node:fs";

const contentPolicy = JSON.parse(readFileSync(new URL("../../content-policy.json", import.meta.url), "utf8"));

export const DEFAULT_LOCALE = "en";
export const MANIFEST_VERSION = "1.0.0";
export const MARKDOWN_PROFILE_VERSION = "1.0.0";
export const RELEASE_OWNER = "ss-o";
export const RELEASE_EVIDENCE_URL = "https://github.com/z-shell/wiki/issues/795";
export const CONTENT_SIGNAL = contentPolicy.contentSignal;

export const CONTENT_ROOTS = [
  {
    id: "docs",
    title: "Zi documentation",
    description: "Installation, commands, configuration, syntax, and usage guides for the Zi plugin manager.",
  },
  {
    id: "community",
    title: "Community",
    description: "Z-Shell contribution guidance, Zsh standards and handbooks, ZUnit, and Zsh Lint.",
  },
  {
    id: "ecosystem",
    title: "Ecosystem",
    description: "Third-party annexes, packages, and plugins in the Z-Shell ecosystem.",
  },
];

export const PRIORITY_TRANSLATION_KEYS = [
  "/docs/getting_started/installation",
  "/docs/getting_started/overview",
  "/docs/guides/commands",
  "/docs/guides/syntax/standard",
  "/ecosystem/annexes/overview",
  "/community/zunit",
  "/community/zsh_lint",
];

export const ARTIFACT_PATHS = {
  manifest: "/ai/v1/manifest.json",
  markdownProfile: "/ai/v1/markdown-profile.md",
  robots: "/robots.txt",
};

export const CRAWLER_POLICY = [
  {userAgent: "OAI-SearchBot", directive: "Allow", path: "/"},
  {userAgent: "GPTBot", directive: "Disallow", path: "/"},
  {userAgent: "ChatGPT-User", directive: "Allow", path: "/"},
  {userAgent: "Claude-SearchBot", directive: "Allow", path: "/"},
  {userAgent: "Claude-User", directive: "Allow", path: "/"},
  {userAgent: "ClaudeBot", directive: "Disallow", path: "/"},
  {userAgent: "PerplexityBot", directive: "Allow", path: "/"},
  {userAgent: "Perplexity-User", directive: "Allow", path: "/"},
  {userAgent: "Google-Extended", directive: "Disallow", path: "/"},
  {userAgent: "*", directive: "Allow", path: "/"},
];

export const MACHINE_HEADER_RULES = new Map([
  ["/llms.txt", "text/plain; charset=utf-8"],
  ["/*/llms.txt", "text/plain; charset=utf-8"],
  ["/llms-full.txt", "text/plain; charset=utf-8"],
  ["/*/llms-full.txt", "text/plain; charset=utf-8"],
  ["/*.md", "text/markdown; charset=utf-8"],
  [ARTIFACT_PATHS.manifest, "application/json; charset=utf-8"],
  [ARTIFACT_PATHS.robots, "text/plain; charset=utf-8"],
]);

export const EVALUATION_CASES = [
  {
    id: "installation",
    translationKey: "/docs/getting_started/installation",
    requiredText: ["automated setup", "get.zshell.dev"],
  },
  {
    id: "commands",
    translationKey: "/docs/guides/commands",
    requiredText: ["commands", "zi"],
  },
  {
    id: "standard-syntax",
    translationKey: "/docs/guides/syntax/standard",
    requiredText: ["ice", "load"],
  },
  {
    id: "annexes",
    translationKey: "/ecosystem/annexes/overview",
    requiredText: ["annex", "z-shell"],
  },
  {
    id: "zunit",
    translationKey: "/community/zunit",
    requiredText: ["@test", "zunit init"],
  },
  {
    id: "zsh-lint",
    translationKey: "/community/zsh_lint",
    requiredText: ["semantic analyzer", "zsh-lint-survey"],
  },
];
