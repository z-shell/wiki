# Architecture

## Core Sections (Required)

### 1) Architectural Style

- Primary style: content-centric static site with layered configuration, React presentation, and edge asset adapters
- Why this classification: content lives in three independent docs roots plus blog/pages, UI lives under `src/`, and Cloudflare Pages Functions only handle selected asset paths rather than full app rendering
- Primary constraints:
  - Three docs roots (`docs`, `community`, `ecosystem`) share one sidebar config and one Docusaurus site config
  - Deployment targets Cloudflare Pages with `build/` output and an R2 bucket binding for selected asset paths
  - Localization is workflow-driven through Crowdin, while source content remains English-only in the repo

### 2) System Flow

```text
[browser request] -> [Cloudflare Pages serves Docusaurus build output] -> [React/MDX page hydrates via src/pages and src/theme]
-> [theme wrappers inject route-specific assets for MDX pages] -> [/img/* or /cdn/* misses fall through to Pages Functions]
-> [R2 object returned or request falls back to next handler]
```

Runtime flow, using file-backed evidence:

1. `package.json` scripts run Docusaurus build/start/serve commands.
2. `docusaurus.config.ts` registers the docs/blog/pages plugins, theme config, and homepage/page routing sources.
3. `src/pages/index.tsx` composes the homepage from React components under `src/components/`.
4. `src/theme/MDXComponents.tsx` and `src/theme/MDXContent.tsx` wrap MDX rendering with shared components and route-scoped head assets.
5. `wrangler.jsonc` tells Cloudflare Pages to publish `build/` and bind `ASSETS_BUCKET`.
6. `functions/cdn/[[path]].ts` and `functions/img/[[path]].ts` delegate to `createR2Handler()` so requests for `/cdn/*` and `/img/*` can be served from R2 when not present in the build output.

### 3) Layer/Module Responsibilities

| Layer or module                                              | Owns                                                                                         | Must not own                                    | Evidence                                                                     |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------- |
| `docusaurus.config.ts`                                       | Site-wide routing, docs instances, theme/plugin wiring, head tags, public integration config | Request-time asset serving or long-form content | `docusaurus.config.ts`                                                       |
| Content roots (`docs/`, `community/`, `ecosystem/`, `blog/`) | User-facing documentation and blog content                                                   | Deployment logic or edge routing                | `docusaurus.config.ts`, `docs/getting_started/01_installation.mdx`           |
| `src/pages/` and `src/components/`                           | Homepage/page composition and reusable UI                                                    | R2 access or GitHub Actions logic               | `src/pages/index.tsx`, `src/components/HomeBanner/index.tsx`                 |
| `src/data/`                                                  | Pure TypeScript constants and helpers shared between `docusaurus.config.ts` and components   | React/JSX or Cloudflare runtime imports         | `src/data/announcement-icons.ts`                                             |
| `src/theme/`                                                 | Docusaurus theme overrides and shared MDX plumbing                                           | Cloudflare deployment config                    | `src/theme/MDXContent.tsx`, `src/theme/MDXComponents.tsx`                    |
| `functions/`                                                 | Edge fallback for large/static assets stored in R2                                           | Primary app/page rendering                      | `functions/_r2.ts`, `functions/cdn/[[path]].ts`, `functions/img/[[path]].ts` |
| `static/`                                                    | Static assets, routing metadata, response headers                                            | Dynamic request logic                           | `static/_routes.json`, `static/_headers`                                     |

### 4) Reused Patterns

| Pattern                           | Where found                                                                            | Why it exists                                                                                         |
| --------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Adapter/factory for edge handlers | `functions/_r2.ts` used by `functions/cdn/[[path]].ts` and `functions/img/[[path]].ts` | Reuses shared conditional-get, content-type, cache, and fallback logic across multiple asset prefixes |
| Config-driven multi-doc instances | `docusaurus.config.ts` `classic.docs` plus two `content-docs` plugins                  | Keeps three doc roots in one site with shared theme and sidebar behavior                              |
| Theme override registry           | `src/theme/MDXComponents.tsx`                                                          | Makes custom MDX components globally available without per-page imports                               |
| Autogenerated sidebar pattern     | `sidebars.ts`                                                                          | Keeps navigation derived from directory structure instead of hand-maintained trees                    |

### 5) Known Architectural Risks

- Asset delivery depends on synchronized Cloudflare Pages config, `_routes.json`, R2 bucket binding, and the R2 sync workflow; drift across those pieces can break `/img/*` or `/cdn/*` paths.
- Some page behavior still depends on external services (`cdn.jsdelivr.net` for MDX Font Awesome, `ghbtns.com` iframes on the homepage, Algolia search config), so not every user-visible surface is fully self-contained.

### 6) Evidence

- `package.json`
- `docusaurus.config.ts`
- `src/pages/index.tsx`
- `src/theme/MDXContent.tsx`
- `src/theme/MDXComponents.tsx`
- `functions/_r2.ts`
- `functions/cdn/[[path]].ts`
- `functions/img/[[path]].ts`
- `src/data/announcement-icons.ts`
- `wrangler.jsonc`
- `static/_routes.json`

## UI Components (TODO: Icon Migration)

- **Decision:** The project is leaning towards replacing the CDN-hosted FontAwesome kit with a custom, internal SVG `<Icon />` component (Option 2).
- **Goals:**
  - Eliminate render-blocking 3rd-party CDN requests.
  - Achieve perfect subsetting and zero layout shift.
  - Enforce design system consistency and type safety in MDX files.
- **Future Action Items:**
  1.  Build the `<Icon />` React component.
  2.  Gather and define the allowed SVG paths/types for the project's specific needs.
  3.  Write a migration script to systematically replace existing `<i class="...">` tags in all MDX files.
