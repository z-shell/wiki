# Codebase Concerns

## Core Sections (Required)

### 1) Top Risks (Prioritized)

| Severity | Concern                                                                                                                  | Evidence                                                                                                                            | Impact                                                                                                  | Suggested action                                                                                                |
| -------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| high     | Asset delivery depends on coordinated Cloudflare Pages config, `_routes.json`, Pages Functions, and the R2 sync workflow | `wrangler.jsonc`, `functions/_r2.ts`, `static/_routes.json`, `.github/workflows/r2-sync.yml`, `.github/codebase/.codebase-scan.txt` | Small config drift can break `/img/*` or `/cdn/*` assets without changing page code                     | Keep build/deploy/R2 changes tightly scoped and validate asset URLs after infra edits                           |
| medium   | The repo has no first-class local automated test suite                                                                   | `package.json`, `.github/codebase/.codebase-scan.txt`, `.github/workflows/link-checker.yml`, `.github/workflows/ci-perf.yml`        | Regressions are more likely to be caught late by build/link/perf workflows rather than fast local tests | Add a declared test runner or explicitly document that lint/build/workflow checks are the intended quality gate |
| medium   | Runtime behavior still depends on third-party client services (`jsDelivr`, `ghbtns.com`, Algolia)                        | `src/theme/MDXContent.tsx`, `src/components/HomeBanner/index.tsx`, `docusaurus.config.ts`                                           | Third-party outages can degrade icons, search, or homepage badge UX                                     | Self-host or provide graceful fallbacks where practical                                                         |
| medium   | Pages Functions return generic `500` responses without in-repo logging or tracing                                        | `functions/_r2.ts`                                                                                                                  | Incidents involving asset fetch failures are harder to diagnose                                         | Add structured logging or Cloudflare observability guidance for Functions                                       |

### 2) Technical Debt

List the most important debt items only.

| Debt item                                                                   | Why it exists                                                                                               | Where                                                                                                                                                | Risk if ignored                                                                          | Suggested fix                                                      |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Hybrid asset model adds operational complexity                              | Static assets are split between checked-in files, R2-backed paths, and aggressive caching headers           | `static/_headers`, `static/_routes.json`, `.github/workflows/r2-sync.yml`, `functions/_r2.ts`                                                        | Contributors can break production asset delivery while making seemingly small file moves | Document and test the asset-routing contract whenever paths change |
| Conventions live partly in repo instructions instead of enforceable tooling | Some TS/MDX conventions are documented in `.github/instructions/*`, but only part is enforced by lint/build | `.github/instructions/frontend-components.instructions.md`, `.github/instructions/docs-authoring.instructions.md`, `.trunk/configs/eslint.config.ts` | Drift between stated standards and actual code can accumulate                            | Promote critical conventions into lint/build checks where feasible |

### 3) Security Concerns

| Risk                                                                     | OWASP category (if applicable)            | Evidence                                                                      | Current mitigation                                                                                | Gap                                                                 |
| ------------------------------------------------------------------------ | ----------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Third-party script/embed supply-chain surface (`jsDelivr`, `ghbtns.com`) | A08: Software and Data Integrity Failures | `src/theme/MDXContent.tsx`, `src/components/HomeBanner/index.tsx`             | Font Awesome is scoped to MDX routes; scripts use `crossOrigin="anonymous"`                       | No SRI or self-hosted fallback was found                            |
| No in-repo security automation/policy files were detected by the scan    | N/A                                       | `.github/codebase/.codebase-scan.txt`, `.github/README.md`, `static/_headers` | Response headers are configured in `static/_headers`; README links to an external security policy | No `SECURITY.md`, Dependabot, or Snyk config was found in this repo |

### 4) Performance and Scaling Concerns

| Concern                                                       | Evidence                                                               | Current symptom                                                                  | Scaling risk                                                                    | Suggested improvement                                                    |
| ------------------------------------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Homepage still embeds GitHub badge iframes                    | `src/components/HomeBanner/index.tsx`                                  | Adds third-party requests to the homepage                                        | External embed latency can affect first-view UX                                 | Replace with an equal-design local alternative if product intent changes |
| MDX pages load Font Awesome from `jsDelivr`                   | `src/theme/MDXContent.tsx`, `docusaurus.config.ts`                     | Adds extra network dependency on MDX routes                                      | External CDN availability affects docs pages                                    | Self-host or inline remaining glyph needs over time                      |
| Very large static media remains part of the operational model | `.github/codebase/.codebase-scan.txt`, `.github/workflows/r2-sync.yml` | Asset management complexity is already high enough to need R2 offload automation | Large media growth can slow reviews, builds, and deploys if offload rules drift | Keep large-media offload policy explicit and monitored                   |

### 5) Fragile/High-Churn Areas

| Area                                                | Why fragile                                                           | Churn signal                                                                               | Safe change strategy                                                                         |
| --------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| `.github/workflows/r2-sync.yml`                     | Couples git diffs, R2 upload behavior, and repo offload automation    | Top churn file in scan output and current 90-day git log                                   | Test in a branch, inspect uploaded key paths, and verify no unintended `git rm` side effects |
| `wrangler.jsonc`                                    | Small config edits affect Pages deployment compatibility and bindings | High churn in scan output and current git log                                              | Validate `pnpm build:en` plus deployment assumptions after every edit                        |
| `src/css/custom.css`                                | Global CSS changes affect shared theme and homepage visuals           | High churn in scan output and current git log                                              | Scope edits narrowly and verify both light/dark themes                                       |
| Homepage showcase/banner/install CSS and components | UI/perf work has touched these files repeatedly                       | High churn in scan output/current git log (`HomeShowcase`, `HomeBanner`, `HomeInstallCta`) | Re-check layout/perf after edits and avoid broad design rewrites without clear intent        |

### 6) `[ASK USER]` Questions

None currently.

### 7) Evidence

- `.github/codebase/.codebase-scan.txt`
- `package.json`
- `wrangler.jsonc`
- `functions/_r2.ts`
- `static/_routes.json`
- `static/_headers`
- `.github/workflows/r2-sync.yml`
- `.github/workflows/ci-perf.yml`
- `.github/workflows/link-checker.yml`
- `src/theme/MDXContent.tsx`
- `src/components/HomeBanner/index.tsx`
