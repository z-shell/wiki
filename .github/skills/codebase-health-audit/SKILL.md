---
name: codebase-health-audit
description: "Audit consistency, performance, and style issues across the wiki codebase; apply fixes only when the user explicitly authorizes remediation. Use when reviewing code quality, preparing releases, onboarding contributors, or after bulk changes to TypeScript components, MDX docs, CSS, or imports."
argument-hint: "File path, directory glob, or 'all' for full scan"
---

# Codebase Health Audit

## When to Use

- After bulk changes to components, docs, or styles
- Before releases or significant merges
- During contributor onboarding to align with project conventions
- When ESLint or Stylelint report issues and you want a guided fix pass
- Periodic codebase hygiene checks

## Authorization

Health evaluations and review requests are read-only. Report findings and
recommended remedies; edit files only when the user explicitly requests fixes
within a defined scope. This boundary also applies to linked checklists, prompts,
and skills: mutation wording there does not authorize changes. Do not run
formatters in write mode or content generators during a read-only review.

Read `AGENTS.md` and applicable scoped instructions first. Their current rules
and repository validators take precedence over checklist examples.

## Procedure

### Phase 1: Scope

Determine what to scan based on the user's input:

| Input                              | Action                                               |
| ---------------------------------- | ---------------------------------------------------- |
| File path                          | Audit that single file                               |
| Directory glob (`src/components/`) | Scan all matching files                              |
| `all` or omitted                   | Scan `src/`, `docs/`, `community/`, `ecosystem/`     |
| `changed`                          | Use `get_changed_files` to scope to git changes only |

### Phase 2: Classify & Audit

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

### Phase 3: Findings and authorized remediation

For each issue found, report its severity, file path, concrete consequence, and
recommended remedy. With explicit remediation authority, apply only in-scope
fixes, keeping each change reviewable. Otherwise continue to validation and
reporting without editing files.

### Phase 4: Validate

Run relevant non-destructive checks to substantiate findings and, when authorized,
verify fixes:

```sh
pnpm lint --quiet
```

Report remaining issues and distinguish failures from unavailable or skipped
checks. Fix remaining issues and rerun validation only within the authorized
remediation scope.

### Phase 5: Report

Summarize results:

```text
## Audit Summary
- Files scanned: N
- Issues found: N
- Issues fixed: N
- Lint status: ✅ clean / ❌ N remaining

### Findings by category
- TypeScript/React: N files
- MDX docs: N files
- CSS: N files
```

## Decision Points

- **Flat vs. subdirectory component**: Keep flat (`Component.tsx`) unless co-located assets (`.module.css`, tests) exist. Convert to `Component/index.tsx` only when adding co-located files.
- **Missing frontmatter fields**: Report missing required fields using the canonical
  docs-authoring rules. Add defaults only during authorized remediation, and flag
  inferred values for user review.
- **Ambiguous import order**: Follow the canonical order in [typescript-react.md](./references/typescript-react.md#import-ordering).

## Related Customizations

- Prompt: [audit-consistency](../../prompts/audit-consistency.prompt.md): single-task version
- Prompt: [review-pr](../../prompts/review-pr.prompt.md): scoped to changed files
- Skill: [docs-release-readiness](../docs-release-readiness/SKILL.md): docs-specific QA
- Hook: [lint-on-edit](../../hooks/lint-on-edit.json): workspace hook that runs lint after file-mutation tool calls in VS Code agent sessions
