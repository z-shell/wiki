---
description: "Verify project consistency, find issues, and propose improvements across dependencies, config, build, docs, and tooling. Run monthly, before releases, or after major upgrades."
agent: "agent"
argument-hint: "'full' for all checks, or a category: deps, config, build, docs, tooling"
tools:
  - search
  - terminalLastCommand
---

Run a comprehensive project health check. If the user specifies a category, run only that section. Otherwise run all sections in order.

## 1. Dependencies (`deps`)

Check dependency freshness, security, and engine compatibility:

```sh
pnpm outdated
```

For each outdated package:

- **Docusaurus ecosystem** (`@docusaurus/*`): flag if more than one minor behind. Check the [Docusaurus changelog](https://docusaurus.io/changelog) for breaking changes.
- **React**: confirm the version aligns with what the current Docusaurus release supports.
- **Dev tooling** (`eslint`, `typescript`, `stylelint`, etc.): flag if a major version behind.
- **Engine constraints**: verify `engines.node` and `engines.pnpm` in `package.json` match the CI environment and are not unnecessarily restrictive.

Report findings as a table: `| Package | Current | Latest | Risk |`.

Auto-fix: update `package.json` ranges for safe minor/patch bumps. Flag major bumps for user review.

## 2. Docusaurus Configuration (`config`)

Read `docusaurus.config.ts` and verify:

- **`future.v4` flags**: all known v4 readiness flags should be enabled. List any that are missing or set to `false`.
- **`future.faster` flags**: all performance flags should be enabled. Flag any set to `false` for user review — including `swcHtmlMinimizer` which may have been disabled due to upstream issues but should be re-evaluated periodically.
- **`onBrokenLinks`**: must be `"throw"`.
- **`i18n.locales`**: cross-check against `crowdin.yml` to ensure locale lists match.
- **Deprecated options**: flag any config keys that are deprecated in the current Docusaurus version.
- **Plugin versions**: ensure all `@docusaurus/*` plugins come from the same version.

Auto-fix: enable missing `future` flags. Flag config key renames for user review.

## 3. Build & Lint Health (`build`)

Run validation commands and report outcomes:

```sh
pnpm lint --quiet
pnpm lint:css --quiet
pnpm build:en
```

For each failure:

- Categorize as **error** (blocks build) or **warning** (quality issue).
- For lint errors: auto-fix with `pnpm lint:fix` and `pnpm lint:css:fix`, then re-run to confirm.
- For build errors: diagnose root cause (broken link, missing import, config issue) and fix directly.

Report: `| Category | Count | Auto-fixed | Remaining |`.

## 4. Docs Completeness (`docs`)

Scan `docs/`, `community/`, and `ecosystem/` for quality issues:

- **Frontmatter gaps**: every `.mdx` file must have `id`, `title`, `sidebar_position`, `description`, `keywords`, and `image`. List files missing any field.
- **Category metadata**: every directory must have `_category_.json` with `label`, `position`, and `link`. List missing files.
- **Orphaned files**: `.mdx` files not referenced in `sidebars.ts` or `_category_.json` ordering.
- **Numeric prefix alignment**: verify `sidebar_position` in frontmatter matches the file's numeric prefix (e.g. `01_` → `sidebar_position: 1`).
- **Broken internal links**: catch during the build step. Cross-reference with `pnpm build:en` output.
- **Heading IDs**: run `pnpm write-heading-ids` and report if any headings changed.

Auto-fix: add missing frontmatter fields with sensible defaults. Create missing `_category_.json`. Flag content gaps for user review.

## 5. Tooling Configuration (`tooling`)

Review configuration freshness and best practices:

- **ESLint** (`eslint.config.ts`): verify flat config format is used (not legacy `.eslintrc`). Check that `@docusaurus/eslint-plugin` is included. Flag unused or redundant rule overrides.
- **TypeScript** (`tsconfig.json`): verify it extends `@docusaurus/tsconfig`. Flag `ignoreDeprecations` if the referenced deprecation cycle has passed.
- **Stylelint**: confirm `stylelint-config-standard` and `stylelint-config-css-modules` are both active.
- **EditorConfig**: verify `.editorconfig` exists and matches project conventions (2-space indent, LF line endings).
- **Package manager**: confirm `packageManager` field in `package.json` points to a current pnpm version. Flag if the pinned version is more than two minors behind latest.

Auto-fix: remove deprecated config keys. Flag major tooling upgrades for user review.

## Output

After all checks, produce a summary:

```text
## Project Health Report

### Status
- Dependencies: ✅ / ⚠️ N issues
- Configuration: ✅ / ⚠️ N issues
- Build & Lint: ✅ / ⚠️ N issues
- Docs: ✅ / ⚠️ N issues
- Tooling: ✅ / ⚠️ N issues

### Auto-fixed
- <list of changes applied>

### Needs Review
- <list of issues requiring user decision>

### Recommendations
- <prioritized improvements for maintainability>
```

Prioritize recommendations by impact: security > build-breaking > consistency > nice-to-have.
