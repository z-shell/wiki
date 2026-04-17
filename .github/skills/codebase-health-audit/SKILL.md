---
name: codebase-health-audit
description: "Audit and auto-fix consistency, performance, and style issues across the wiki codebase. Use when reviewing code quality, preparing releases, onboarding contributors, or after bulk changes to TypeScript components, MDX docs, CSS, or imports."
argument-hint: "File path, directory glob, or 'all' for full scan"
---

# Codebase Health Audit

## When to Use

- After bulk changes to components, docs, or styles
- Before releases or significant merges
- During contributor onboarding to align with project conventions
- When ESLint or Stylelint report issues and you want a guided fix pass
- Periodic codebase hygiene checks

## Procedure

### Phase 1 — Scope

Determine what to scan based on the user's input:

| Input                              | Action                                               |
| ---------------------------------- | ---------------------------------------------------- |
| File path                          | Audit that single file                               |
| Directory glob (`src/components/`) | Scan all matching files                              |
| `all` or omitted                   | Scan `src/`, `docs/`, `community/`, `ecosystem/`     |
| `changed`                          | Use `get_changed_files` to scope to git changes only |

### Phase 2 — Classify & Audit

Route each file to the appropriate checklist:

| File pattern                          | Checklist                                              |
| ------------------------------------- | ------------------------------------------------------ |
| `src/**/*.{ts,tsx}`                   | [TypeScript & React](./references/typescript-react.md) |
| `{docs,community,ecosystem}/**/*.mdx` | [MDX Docs](./references/mdx-docs.md)                   |
| `src/**/*.css`                        | [CSS & Styling](./references/css-styling.md)           |
| Other                                 | Skip with note                                         |

Cross-cutting checks applied to all file types:

- **Imports**: correct order, no unused imports (see [import ordering](./references/typescript-react.md#import-ordering))
- **Performance**: lazy loading for heavy components, `@theme/IdealImage` for images

### Phase 3 — Fix

For each issue found:

1. State the file path and a one-line summary
2. Apply the fix directly to the file
3. Move to the next issue

Do not batch — fix one file at a time so each change is reviewable.

### Phase 4 — Validate

After all fixes:

```sh
pnpm lint --quiet
pnpm lint:css --quiet
```

If either command reports remaining issues, fix those too, then re-run.

### Phase 5 — Report

Summarize results:

```text
## Audit Summary
- Files scanned: N
- Issues found: N
- Issues fixed: N
- Lint status: ✅ clean / ❌ N remaining

### Changes by category
- TypeScript/React: N files
- MDX docs: N files
- CSS: N files
```

## Decision Points

- **Flat vs. subdirectory component**: Keep flat (`Component.tsx`) unless co-located assets (`.module.css`, tests) exist. Convert to `Component/index.tsx` only when adding co-located files.
- **Missing frontmatter fields**: Add with sensible defaults, flag for user review.
- **Ambiguous import order**: Follow the canonical order in [typescript-react.md](./references/typescript-react.md#import-ordering).

## Related Customizations

- Prompt: [audit-consistency](../../prompts/audit-consistency.prompt.md) — single-task version
- Prompt: [review-pr](../../prompts/review-pr.prompt.md) — scoped to changed files
- Skill: [docs-release-readiness](../docs-release-readiness/SKILL.md) — docs-specific QA
- Hook: [lint-on-edit](../../hooks/lint-on-edit.json) — automatic lint after edits
