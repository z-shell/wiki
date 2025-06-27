/**
 * Centralized registry of commonly used links across the documentation
 */

import type {LinkInfo} from "../../types";

/**
 * Registry of common links used throughout the documentation
 * This allows centralized management and consistent usage
 */
export const COMMON_LINKS: Record<string, LinkInfo> = {
  // Core documentation links
  commands: {
    url: "/docs/guides/commands",
    external: false,
    description: "Zi commands documentation",
  },
  "completions-management": {
    url: "/docs/guides/commands#completions-management",
    external: false,
    description: "Completions management documentation",
  },
  "customizing-paths": {
    url: "/docs/guides/customization#customizing-paths",
    external: false,
    description: "Customizing paths documentation",
  },
  "loading-and-unloading": {
    url: "/docs/guides/commands#loading-and-unloading",
    external: false,
    description: "Loading and unloading documentation",
  },
  "meta-plugins": {
    url: "/search?q=meta+plugins",
    external: false,
    description: "Meta plugins search",
  },
  "help-migrate": {
    url: "/docs/getting_started/migration",
    external: false,
    description: "Migration guide",
  },
  "multiple-prompts": {
    url: "/docs/guides/customization#multiple-prompts",
    external: false,
    description: "Multiple prompts documentation",
  },
  "non-github-local-plugins": {
    url: "/docs/guides/customization#non-github-local-plugins",
    external: false,
    description: "Non-GitHub local plugins documentation",
  },
  "oh-my-zsh-prezto": {
    url: "/docs/getting_started/overview#oh-my-zsh-prezto",
    external: false,
    description: "Oh My Zsh and Prezto documentation",
  },
  "reports-and-statistics": {
    url: "/docs/guides/commands#reports-and-statistics",
    external: false,
    description: "Reports and statistics documentation",
  },
  "turbo-mode-zsh--53": {
    url: "/docs/getting_started/overview#turbo-mode-zsh--53",
    external: false,
    description: "Turbo mode documentation",
  },

  // External links
  "configs-playground": {
    url: "https://github.com/z-shell/playground",
    external: true,
    description: "Docker playground for testing configurations",
  },
  "z-shell-org": {
    url: "https://github.com/orgs/z-shell",
    external: true,
    description: "Z-Shell GitHub organization",
  },

  // Ecosystem links
  annexes: {
    url: "/ecosystem/category/-annexes",
    external: false,
    description: "Annexes documentation",
  },
  packages: {
    url: "/ecosystem/category/-packages",
    external: false,
    description: "Packages documentation",
  },
  gallery: {
    url: "/community/gallery/collection",
    external: false,
    description: "Gallery of Invocations",
  },
  "bin-gem-node": {
    url: "/ecosystem/annexes/bin-gem-node",
    external: false,
    description: "bin-gem-node annex documentation",
  },
  "rust-annex": {
    url: "/ecosystem/annexes/rust",
    external: false,
    description: "Rust annex documentation",
  },

  // External services
  rubygems: {
    url: "https://rubygems.org",
    external: true,
    description: "RubyGems website",
  },
  npm: {
    url: "https://www.npmjs.com",
    external: true,
    description: "npm website",
  },
  python: {
    url: "https://python.org",
    external: true,
    description: "Python website",
  },
  "crates-io": {
    url: "https://crates.io",
    external: true,
    description: "Rust crates registry",
  },
};
