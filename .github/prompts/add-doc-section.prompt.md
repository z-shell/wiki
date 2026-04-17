---
description: "Add a new documentation section (page or category) to docs/, community/, or ecosystem/ following project conventions."
agent: "agent"
argument-hint: "Section title, target path, and related docs to link"
---

Add a new documentation section to this Docusaurus wiki.

## Inputs

1. **Section title** — the human-readable name for the page or category.
2. **Target path** — which content root and directory (e.g. `docs/guides/`, `ecosystem/annexes/`).
3. **Related docs** — existing pages to cross-link.

## Steps

1. Determine the next numeric prefix by examining siblings in the target directory.
2. Create the `.mdx` file with frontmatter matching the project pattern:
   - `id`, `title`, `sidebar_position`, `image`, `description`, `keywords`
3. If adding a new directory, also create `_category_.json` with `label`, `position`, and `link`.
4. Add only necessary imports (`Tabs`, `TabItem`, `Link`, `Image`) after the frontmatter.
5. Write initial content with proper admonitions and heading style.
6. Cross-link to related docs provided by the user.
7. Verify the result with `pnpm build:en`.
