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

This applies to files under a source that `crowdin.yml` maps and does not exclude, and to category labels in any content root (from a `_category_` file, or the directory name when there is none). The Crowdin Upload workflow extracts those labels into `i18n/en/` and uploads them on push to `main`. To check the keys a change adds, run:

```sh
pnpm write-translations --locale en
pnpm crowdin:check
```

Report any new untranslated keys, then discard the regenerated `i18n/en/` files (`git checkout -- i18n/en`); the workflow sends its own regenerated copy.

### 8. Lint

Ensure no ESLint or Stylelint errors in changed source files:

- TypeScript/JSX: checked by ESLint (`eslint.config.ts`)
- CSS: checked by Stylelint

## Output

Summarize pass/fail for each checklist item and list any issues found with file paths.
