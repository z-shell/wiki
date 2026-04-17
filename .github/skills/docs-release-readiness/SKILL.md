---
name: docs-release-readiness
description: "Pre-merge QA checklist for documentation changes. Use when reviewing a PR, preparing a release, or validating docs quality. Checks links, headings, category metadata, build output, and translation readiness."
argument-hint: "Optional: specific files or directories to check"
---

# Docs Release Readiness

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

For each new or changed `.mdx` file, verify:

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

Run heading ID generation after heading changes:

```sh
pnpm write-heading-ids
```

Review the diff for unexpected ID changes that could break existing links.

### 5. Cross-Links

- Verify internal links use relative paths or Docusaurus route paths (`/docs/...`, `/ecosystem/...`, `/community/...`).
- Confirm no links point to `i18n/` files directly.

### 6. Static Assets

- Images referenced in new docs exist under `static/`.
- Paths use site-root format: `/img/...`.

### 7. Translation Readiness

For files in translated paths (not excluded by `crowdin.yml`):

```sh
pnpm write-translations
pnpm crowdin:check
```

Report any new untranslated keys.

### 8. Lint

Ensure no ESLint or Stylelint errors in changed source files:

- TypeScript/JSX: checked by ESLint (`.eslintrc.yml`)
- CSS: checked by Stylelint

## Output

Summarize pass/fail for each checklist item and list any issues found with file paths.
