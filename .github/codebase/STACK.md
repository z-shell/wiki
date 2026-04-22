# Technology Stack

## Core Sections (Required)

### 1) Runtime Summary

| Area                | Value                                                                                 | Evidence                                                                    |
| ------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Primary language    | TypeScript for site code, plus MDX for documentation content                          | `package.json`, `tsconfig.json`, `docs/getting_started/01_installation.mdx` |
| Runtime + version   | Node.js `>=20`; React `19.2.5`; Docusaurus `3.10.0`                                   | `package.json`, `.github/README.md`                                         |
| Package manager     | pnpm `>=10`                                                                           | `package.json`, `.github/README.md`                                         |
| Module/build system | Docusaurus classic preset with Rspack/SWC faster flags, output deployed from `build/` | `docusaurus.config.ts`, `wrangler.jsonc`                                    |

### 2) Production Frameworks and Dependencies

List only high-impact production dependencies (frameworks, data, transport, auth).

| Dependency                       | Version  | Role in system                                          | Evidence                                      |
| -------------------------------- | -------- | ------------------------------------------------------- | --------------------------------------------- |
| `@docusaurus/core`               | `3.10.0` | Core static-site/documentation runtime and build engine | `package.json`                                |
| `@docusaurus/preset-classic`     | `3.10.0` | Primary docs/blog/pages preset                          | `package.json`, `docusaurus.config.ts`        |
| `@docusaurus/plugin-pwa`         | `3.10.0` | Progressive web app manifest and install metadata       | `package.json`, `docusaurus.config.ts`        |
| `@docusaurus/plugin-ideal-image` | `3.10.0` | Responsive image processing for PNG/JPG assets          | `package.json`, `docusaurus.config.ts`        |
| `react` / `react-dom`            | `19.2.5` | Client-side rendering for homepage and theme overrides  | `package.json`, `src/pages/index.tsx`         |
| `@mdx-js/react`                  | `3.1.1`  | MDX content rendering                                   | `package.json`, `src/theme/MDXComponents.tsx` |
| `asciinema-player`               | `3.15.1` | Terminal recording playback for docs content            | `package.json`                                |
| `prism-react-renderer`           | `2.4.1`  | Syntax highlighting for code blocks                     | `package.json`, `docusaurus.config.ts`        |

### 3) Development Toolchain

| Tool                     | Purpose                                        | Evidence                                                                                     |
| ------------------------ | ---------------------------------------------- | -------------------------------------------------------------------------------------------- |
| TypeScript `6.0.3`       | Type-checking and TS config base               | `package.json`, `tsconfig.json`                                                              |
| ESLint `10.2.x`          | JS/TS/MDX linting with flat config             | `package.json`, `.trunk/configs/eslint.config.ts`                                            |
| Stylelint `17.8.0`       | CSS linting with HSL color enforcement         | `package.json`, `.trunk/configs/.stylelintrc.yml`                                            |
| Prettier                 | Formatting                                     | `.trunk/configs/.prettierrc.json`                                                            |
| Crowdin CLI `4.14.1`     | Translation upload/download workflow support   | `package.json`, `crowdin.yml`                                                                |
| Wrangler config + action | Cloudflare Pages deployment and R2 integration | `wrangler.jsonc`, `.github/workflows/pages-deployment.yaml`, `.github/workflows/r2-sync.yml` |
| `jiti` `^2.6.1`          | ESLint TypeScript config loading               | `package.json`, `pnpm-lock.yaml`                                                             |

### 4) Key Commands

```bash
pnpm install
pnpm build
pnpm build:en
pnpm start
pnpm serve
pnpm lint
pnpm lint:css
pnpm write-heading-ids
pnpm crowdin:sync
```

### 5) Environment and Config

- Config sources: `docusaurus.config.ts`, `wrangler.jsonc`, `crowdin.yml`, `.trunk/configs/.prettierrc.json`, `.trunk/configs/.stylelintrc.yml`, `.trunk/configs/eslint.config.ts`, `tsconfig.json`, `.editorconfig`
- Required env vars: `URL`, `BASE_URL`, `STYLES`, `CROWDIN_PROJECT`, `CROWDIN_TOKEN`, `CF_PAGES_API_TOKEN`, `CF_ACCOUNT_ID`, `CF_API_TOKEN`, `ORG_TOKEN`, `[TODO]` local-development env documentation
- Deployment/runtime constraints:
  - Build output must land in `build/` for Cloudflare Pages deployment
  - Pages Functions require an `ASSETS_BUCKET` R2 binding
  - Localization is driven through Crowdin workflows, not direct `i18n/` editing

### 6) Evidence

- `package.json`
- `pnpm-lock.yaml`
- `docusaurus.config.ts`
- `wrangler.jsonc`
- `crowdin.yml`
- `.github/README.md`
