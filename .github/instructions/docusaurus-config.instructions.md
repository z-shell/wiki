---
description: "Docusaurus site configuration reference — structure, settings, feature flags, plugins, and theme config. Use when editing docusaurus.config.ts to ensure consistency and avoid regressions."
applyTo: "docusaurus.config.ts"
---

# Docusaurus Config API

Full reference: <https://docusaurus.io/docs/api/docusaurus-config>

## File Structure

- TypeScript file exporting an **async config factory**: `export default async function createConfigAsync()`
- Uses `satisfies Config` (from `@docusaurus/types`) for top-level type safety
- Plugin/preset options use `satisfies DocsOptions`, `satisfies BlogOptions`, `satisfies PageOptions`, `satisfies IdealImageOptions`, `satisfies Preset.Options`, `satisfies Preset.ThemeConfig`
- Environment variables for deployment-flexible values:
  - `URL` → site origin (default: `https://wiki.zshell.dev`)
  - `BASE_URL` → base path (default: `/`)
  - `STYLES` → external stylesheet/script URL

## Core Settings

These are established values — do not change without explicit justification:

| Setting              | Value                | Why                                                    |
| -------------------- | -------------------- | ------------------------------------------------------ |
| `trailingSlash`      | `false`              | Consistent URL format across all routes                |
| `onBrokenLinks`      | `"throw"`            | Catches broken links at build time — never weaken this |
| `baseUrlIssueBanner` | `true`               | Helps diagnose deployment misconfiguration             |
| `staticDirectories`  | `["static"]`         | Single static directory                                |
| `favicon`            | `"/img/favicon.ico"` | Site-root path from `static/`                          |

### i18n

Currently English-only (`locales: ["en"]`). Locale management is handled via Crowdin — do not add locales directly in config. Use `pnpm crowdin:sync` for localization workflows.

### Markdown

```ts
markdown: {
  mermaid: true,        // Mermaid diagram support
  emoji: true,          // Emoji shortcode rendering
  format: "detect",     // Auto-detect .md vs .mdx
  hooks: {
    onBrokenMarkdownLinks: "warn",  // Use hooks, not deprecated top-level
  },
},
```

- Use `markdown.hooks.onBrokenMarkdownLinks` — the top-level `onBrokenMarkdownLinks` is deprecated and removed in v4.

### Storage

```ts
storage: {
  type: "localStorage",
  namespace: true,  // Avoids key conflicts with other sites on same domain
},
```

## Feature Flags

All v4 and faster flags are **intentionally enabled**. Do not disable without explicit justification.

### `future.v4` — v4 Migration Readiness

| Flag                                 | Purpose                                        |
| ------------------------------------ | ---------------------------------------------- |
| `removeLegacyPostBuildHeadAttribute` | Enables SSG optimizations                      |
| `useCssCascadeLayers`                | CSS cascade layers for predictable specificity |
| `siteStorageNamespacing`             | Auto-namespace browser storage keys            |
| `fasterByDefault`                    | Default all `faster` flags to true             |
| `mdx1CompatDisabledByDefault`        | Disable MDX v1 compat (prepares for v4)        |

### `future.faster` — Build Performance

All flags enabled — the site uses Rspack + SWC for maximum build speed:

| Flag                    | Replaces                                          |
| ----------------------- | ------------------------------------------------- |
| `swcJsLoader`           | Babel                                             |
| `swcJsMinimizer`        | Terser                                            |
| `swcHtmlMinimizer`      | html-minifier-terser                              |
| `lightningCssMinimizer` | cssnano + clean-css                               |
| `rspackBundler`         | webpack                                           |
| `rspackPersistentCache` | — (requires persisting `node_modules/.cache`)     |
| `ssgWorkerThreads`      | — (requires `removeLegacyPostBuildHeadAttribute`) |
| `mdxCrossCompilerCache` | — (compiles MDX once instead of twice)            |

### `future.experimental_vcs`

Set to `true` — uses the default VCS preset (git-eager in prod, hardcoded in dev).

## Content Roots

Three independent docs instances sharing common patterns:

| Root         | Config Location                         | Route        |
| ------------ | --------------------------------------- | ------------ |
| `docs/`      | Preset `classic` → `docs`               | `/docs`      |
| `community/` | Plugin `content-docs` (id: `community`) | `/community` |
| `ecosystem/` | Plugin `content-docs` (id: `ecosystem`) | `/ecosystem` |

Shared settings across all instances:

- `sidebarPath: "sidebars.ts"` — shared sidebar config
- `breadcrumbs: true`
- `showLastUpdateAuthor: true`, `showLastUpdateTime: true`
- `editUrl` — routes to Crowdin for non-English locales, GitHub for English

## Plugins

| Plugin            | Key Settings                                                                                                                                                            |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `content-docs` ×2 | Community + Ecosystem roots with `satisfies DocsOptions`                                                                                                                |
| `ideal-image`     | quality: 70, max: 1030, min: 630, `disableInDev: false`. Generates responsive PNG/JPG variants; see `docusaurus-api.instructions.md` § Theme Components for usage rules |
| `pwa`             | Offline support with full `pwaHead` manifest (icons, theme colors, app metadata)                                                                                        |

## Preset (classic)

- **svgr**: Enabled via `svgr: {}` — configuration externalized to `svgr.config.js` at the project root. See [SVGR options](https://react-svgr.com/docs/options/).
- **docs**: Primary docs root at `docs/`, collapsible sidebar
- **blog**: Edit URLs with Crowdin routing, all posts per page, RSS feed
- **pages**: Source from `src/pages/`
- **theme**: Custom CSS at `./src/css/custom.css`

## Theme Config

| Section           | Key Details                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| `colorMode`       | Default: dark, respects system preference, switch enabled                                                    |
| `algolia`         | Public search-only keys (appId: `FMPN8VE51Y`, index: `zshell`)                                               |
| `prism`           | GitHub (light) + Dracula (dark) themes, default language: `shell`, additional: ini, vim, verilog, diff, bash |
| `navbar`          | Hide on scroll, logo 32×32, items: Docs, Ecosystem, Community + GitHub link                                  |
| `footer`          | Dark style, Knowledge Base / More / Legal sections                                                           |
| `tableOfContents` | Heading levels 2–5                                                                                           |
| `docs.sidebar`    | Hideable, auto-collapse categories                                                                           |
| `announcementBar` | Closeable banner with GitHub star + Hacker News share links                                                  |

## Anti-patterns

| ❌ Don't                                            | ✅ Do                                       | Why                                               |
| --------------------------------------------------- | ------------------------------------------- | ------------------------------------------------- |
| Weaken `onBrokenLinks` to `"warn"` or `"log"`       | Keep `onBrokenLinks: "throw"`               | Catches broken links at build time                |
| Disable `future.v4` or `future.faster` flags        | Keep all flags enabled                      | Site is v4-ready and optimized for build speed    |
| Hardcode `https://wiki.zshell.dev` in config values | Use `process.env.URL ?? "..."`              | Enables deployment to other environments          |
| Use top-level `onBrokenMarkdownLinks`               | Use `markdown.hooks.onBrokenMarkdownLinks`  | Top-level is deprecated, removed in v4            |
| Add plugin options without `satisfies` type         | Use `satisfies DocsOptions` etc.            | Type safety catches config errors at compile time |
| Add locales to `i18n.locales` directly              | Use Crowdin workflow (`pnpm crowdin:sync`)  | Localization is managed externally                |
| Add unknown fields at top level                     | Use `customFields` and document usage       | Docusaurus throws on unknown top-level fields     |
| Remove `rspackPersistentCache`                      | Keep enabled, persist `node_modules/.cache` | Critical for fast rebuilds in CI                  |
