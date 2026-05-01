# External Integrations

## Core Sections (Required)

### 1) Integration Inventory

| System                              | Type (API/DB/Queue/etc)          | Purpose                                                           | Auth model                                                           | Criticality | Evidence                                                                                        |
| ----------------------------------- | -------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------- |
| Cloudflare Pages                    | Hosting/deploy platform          | Serves the built Docusaurus site from `build/`                    | GitHub Actions secrets (`CF_PAGES_API_TOKEN`, `CF_ACCOUNT_ID`)       | High        | `wrangler.jsonc`, `.github/workflows/pages-deployment.yaml`                                     |
| Cloudflare R2                       | Object storage                   | Stores large assets served under `/cdn/*` and `/img/*`            | Pages Function binding `ASSETS_BUCKET`; CI secrets for sync workflow | High        | `wrangler.jsonc`, `functions/_r2.ts`, `.github/workflows/r2-sync.yml`                           |
| Crowdin                             | Translation platform             | Upload/download localization content                              | GitHub Actions secrets (`CROWDIN_PROJECT`, `CROWDIN_TOKEN`)          | Medium      | `crowdin.yml`, `.github/workflows/crowdin-upload.yml`, `.github/workflows/crowdin-download.yml` |
| Algolia DocSearch                   | Search service                   | Client-side docs search                                           | Public search-only config embedded in theme config                   | Medium      | `docusaurus.config.ts`                                                                          |
| jsDelivr                            | CDN                              | Loads Font Awesome script on MDX-rendered pages via theme wrapper | No repo auth; URL supplied by `STYLES` or default CDN URL            | Medium      | `docusaurus.config.ts`, `src/theme/MDXContent.tsx`, `.github/workflows/pages-deployment.yaml`   |
| GitHub Buttons (`ghbtns.com`)       | External embed                   | Homepage star/follow badge iframes                                | No repo auth                                                         | Low         | `src/components/HomeBanner/index.tsx`                                                           |
| GitHub repository/discussions links | External links/community surface | Sends users to source repo, discussions, badges                   | No app auth in repo code                                             | Low         | `src/components/HomeCommunity/index.tsx`, `src/components/GhRepoBadge/index.tsx`                |

### 2) Data Stores

| Store                               | Role                                                                       | Access layer                                   | Key risk                                                                     | Evidence                                                              |
| ----------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Cloudflare R2 bucket `r2-store`     | Long-lived object storage for static assets served through Pages Functions | `functions/_r2.ts` via `ASSETS_BUCKET` binding | Routing/binding drift can break assets even if site HTML builds successfully | `wrangler.jsonc`, `functions/_r2.ts`, `.github/workflows/r2-sync.yml` |
| Browser `localStorage` (namespaced) | Stores client-side Docusaurus site state/preferences                       | Docusaurus storage config                      | Browser-local only; not shared across devices/sessions                       | `docusaurus.config.ts`                                                |

### 3) Secrets and Credentials Handling

- Credential sources: GitHub Actions secrets, workflow env vars, Cloudflare Pages/R2 bindings, runtime environment variables in `docusaurus.config.ts`
- Hardcoding checks: no private tokens were found in tracked source; Algolia public search config is embedded client-side; homepage/doc integrations also include unauthenticated public URLs
- Rotation or lifecycle notes: `[TODO]` no documented secret rotation policy was found in the repo

### 4) Reliability and Failure Behavior

- Retry/backoff behavior:
  - Runtime R2 handler: none found
  - R2 sync workflow: up to 3 upload attempts with incremental sleep
- Timeout policy:
  - GitHub Actions jobs specify `timeout-minutes`
  - `[TODO]` no request timeout policy was found for runtime third-party HTTP integrations
- Circuit-breaker or fallback behavior:
  - R2 asset misses call `context.next()` to fall back to normal Pages asset handling
  - ETag requests return `304` when the client already has the current object

### 5) Observability for Integrations

- Logging around external calls: partial; GitHub Actions log and summarize workflow steps, but runtime Pages Functions do not emit structured logs in the repo
- Metrics/tracing coverage: no app-runtime metrics or tracing configuration was found; CI has build-size/build-time reporting and link checks instead
- Missing visibility gaps:
  - no runtime tracing for R2 asset failures
  - no explicit monitoring config for Algolia, jsDelivr, or GitHub button availability

### 6) Evidence

- `docusaurus.config.ts`
- `wrangler.jsonc`
- `functions/_r2.ts`
- `.github/workflows/pages-deployment.yaml`
- `.github/workflows/r2-sync.yml`
- `.github/workflows/crowdin-upload.yml`
- `.github/workflows/crowdin-download.yml`
- `crowdin.yml`
- `src/theme/MDXContent.tsx`
- `src/components/HomeBanner/index.tsx`
