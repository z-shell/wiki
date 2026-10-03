---
name: docs-release-readiness
description: "Pre-merge QA checklist for documentation changes. Use when reviewing a PR, preparing a release, or validating docs quality. Checks links, headings, category metadata, build output, and translation readiness."
argument-hint: "Optional: specific files or directories to check"
---

# Docs Release Readiness

Review is read-only with respect to source files. Inspect the checkout status and command side effects first. Builds may create ignored artifacts; generators, dependency installation, source repairs and external actions need the corresponding scope. Preserve pre-existing changes. Report a check as unavailable when its prerequisites are absent.

## When to Use

- Before merging a docs PR
- After bulk documentation updates
- Before a release that includes documentation changes
- When validating docs quality across content roots

## Checklist

### 1. Build Verification

Run the English-only build to catch broken links and config errors:

```sh
pnpm build:en
```

If the full multi-locale build is needed:

```sh
pnpm build
```

If either fails, check the error output for broken links (`onBrokenLinks: "throw"` is configured) or missing imports.

### 2. Frontmatter Validation

Run the automated validator to check all MDX files across content roots:

```sh
pnpm validate:frontmatter
```

This exits non-zero if any file is missing a **required** field (`id`, `title`, `sidebar_position`). Warnings are printed for **recommended** fields (`description`, `keywords`) but do not block.

For each new or changed `.mdx` file also manually verify:

- [ ] `id` is present and unique within its content root
- [ ] `title` is set
- [ ] `sidebar_position` matches the numeric file prefix
- [ ] `description` is a concise summary
- [ ] `keywords` array is present

### 3. Category Metadata

For any new directories, confirm `_category_.json` exists with:

- [ ] `label` (with emoji if siblings use emoji)
- [ ] `position` consistent with sibling categories
- [ ] `link.type` set (usually `"generated-index"`)

### 4. Heading IDs

Inspect changed headings and existing anchors for broken links. To compare generated IDs, run `pnpm write-heading-ids` only in a disposable export of the reviewed revision, including the intended uncommitted changes when those are the review target. Compare its output with that exact input. Do not generate into the user's checkout during review. Applying generated changes is a separate, authorized repair.

### 5. Cross-Links

- Verify internal links use relative paths or Docusaurus route paths (`/docs/...`, `/ecosystem/...`, `/community/...`).
- Confirm no links point to `i18n/` files directly.

### 6. Static Assets

- Images referenced in new docs exist under `static/`.
- Paths use site-root format: `/img/...`.

### 7. Translation Readiness

Inspect the current `crowdin.yml` mappings and exclusions, category-label sources, and Crowdin workflow triggers. Report which changed content reaches translation and whether the configured upload workflow is enabled. Workflow inspection does not authorize dispatch or upload.

For a generated-key comparison, use a disposable export of the exact review target. Omit `i18n/en/` while creating that export, then run `pnpm write-translations --locale en` there and compare the generated files with the reviewed originals. A plain run over existing translations only appends and can hide removed keys. Keep generated output in scratch; never remove or restore the user's `i18n/en/` to make a review fixture. If dependencies or safe isolation are unavailable, report generation as unverified.

`pnpm crowdin:check` contacts the live project and does not validate the local generated files. Report locally verified keys separately from live-service results. Uploads and workflow dispatch follow the localization-maintainer procedure only when explicitly authorized.

### 8. Lint

Ensure no ESLint or Stylelint errors in changed source files:

- TypeScript/JSX: checked by ESLint (`eslint.config.ts`)
- CSS: checked by Stylelint

## Output

Summarize pass/fail for each checklist item and list any issues found with file paths.
