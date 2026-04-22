---
description: "Audit and auto-fix consistency, performance, and style issues across TypeScript components, MDX docs, CSS, and imports."
agent: "agent"
argument-hint: "File path, directory glob, or 'all' to scan the full project"
---

Audit the specified files for consistency, performance, and style issues, then apply fixes directly.
If no target is given, scan `src/`, `docs/`, `community/`, and `ecosystem/`.

Follow the project's established conventions from [frontend-components](../instructions/frontend-components.instructions.md) and [docs-authoring](../instructions/docs-authoring.instructions.md).

## TypeScript & React Components (`src/**/*.{ts,tsx}`)

- Prop types must use `type` (not `interface`), extending the appropriate HTML element type.
- One default function export per file with explicit `React.JSX.Element` return type.
- Destructure props in the function signature.
- Flat component files (`Component.tsx`) should be converted to subdirectory form (`Component/index.tsx`) only when co-located assets exist; otherwise keep flat.
- Use `clsx` for conditional class names.

## Import Ordering

Enforce this order, separated by blank lines:

1. Node builtins
2. External packages (`react`, `react-dom`, `clsx` first, then others alphabetically)
3. Internal aliases (`@theme/*`, `@docusaurus/*`, `@site/*`, `@generated/*`)
4. Relative imports
5. Style imports (`.css`, `.module.css`)
6. Type-only imports (`import type ...`) at the end of each group

Remove unused imports.

## MDX Docs (`{docs,community,ecosystem}/**/*.mdx`)

- Frontmatter must include: `id`, `title`, `sidebar_position`, `image`, `description`, `keywords`.
- Imports go immediately after frontmatter, before content.
- Only import what is actually used on the page.
- Use `:::tip`, `:::info`, `:::warning` admonitions — not raw HTML callouts.
- Images must use site-root paths (`/img/...`).
- File naming follows numeric prefix pattern (`01_`, `02_`, …).

## CSS & Styling

- Components must use CSS Modules (`.module.css`) co-located with the component.
- Global overrides belong only in `src/css/custom.css`.
- Do not mix component-scoped rules into global CSS.
- Use CSS custom properties (`--ifm-*`) for theme values instead of hard-coded colors.

## Performance

- Heavy or optional components should be lazy-loaded with `React.lazy` and `Suspense`.
- Images should use `@theme/IdealImage` instead of bare `<img>` tags.
- Avoid importing large libraries at the top level when they are only needed in one branch.

## Output

For each file with issues:

1. State the file path and a one-line summary.
2. Apply the fix directly.
3. After all fixes, run `pnpm lint` to validate.
