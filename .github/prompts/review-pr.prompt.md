---
description: "Review changed files for consistency, performance, and style issues before merging. Scoped to staged and unstaged git changes."
agent: "agent"
argument-hint: "'staged' for pre-commit review, or omit for all changes"
tools:
  - get_changed_files
---

Review only the files changed in the current working tree for consistency, performance, and style issues, then apply fixes.

## Workflow

1. Use `get_changed_files` to get the diff of changed files.
   - If the user says "staged", filter to staged changes only.
   - Otherwise include both staged and unstaged changes.
2. For each changed file, apply the rules below based on file type.
3. After all fixes, run `pnpm lint --quiet` and `pnpm lint:css --quiet` to validate.
4. Summarize what was fixed, grouped by file.

## Rules by File Type

### TypeScript & React (`src/**/*.{ts,tsx}`)

Follow [frontend-components](.github/instructions/frontend-components.instructions.md):

- Prop types use `type` (not `interface`), extending the appropriate HTML element type.
- One default function export per file with `React.JSX.Element` return type.
- Destructure props in function signature.
- Use `clsx` for conditional class names.
- Import order: node builtins → external packages (`react` first) → internal aliases (`@theme/*`, `@site/*`) → relative → styles → type-only imports. Separate groups with blank lines.
- Remove unused imports.

### MDX Docs (`{docs,community,ecosystem}/**/*.mdx`)

Follow [docs-authoring](.github/instructions/docs-authoring.instructions.md):

- Frontmatter must include: `id`, `title`, `sidebar_position`, `image`, `description`, `keywords`.
- Imports immediately after frontmatter, only what is used.
- Admonitions use `:::tip`, `:::info`, `:::warning` — not raw HTML.
- Images use site-root paths (`/img/...`).
- File naming follows numeric prefix pattern.

### CSS (`src/**/*.css`)

- Components use CSS Modules (`.module.css`).
- No component-scoped rules in `src/css/custom.css`.
- Theme values via CSS custom properties (`--ifm-*`), not hard-coded colors.

### Performance

- Heavy components lazy-loaded with `@loadable/component`.
- Images use `@theme/IdealImage` instead of bare `<img>`.

## Output Format

For each file:
```
**path/to/file.ext** — <one-line summary of issues>
```
Then apply the fix. At the end, report lint results.
