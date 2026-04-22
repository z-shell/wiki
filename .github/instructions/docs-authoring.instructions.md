---
description: "Use when creating, editing, or reorganizing MDX documentation pages in docs/, community/, or ecosystem/. Covers frontmatter shape, file naming, category metadata, and import conventions."
applyTo: "{docs,community,ecosystem}/**/*.mdx"
---

# Docs Authoring

## Frontmatter

Every MDX page starts with YAML frontmatter, then imports, then content:

```yaml
---
id: short_id
title: "Page Title"
sidebar_position: 1
image: /img/png/theme/z/320x320.png
description: One-line summary
keywords:
  - keyword1
  - keyword2
---
```

- `id` is required and must be unique within its content root.
- `sidebar_position` controls order inside the parent category.
- `image` should use a site-root path from `static/`.

## File Naming

Use numeric prefixes to control sidebar order: `01_first.mdx`, `02_second.mdx`.
Match the pattern of sibling files in the same directory.

## Category Metadata

When adding a new directory, create `_category_.json`:

```json
{
  "label": "Section Name",
  "position": 3,
  "link": {
    "type": "generated-index"
  }
}
```

Emoji in labels is used throughout the project (e.g. `"🚀 Getting Started"`).

## Imports

Place imports immediately after frontmatter, before any content:

```tsx
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import Link from "@docusaurus/Link";
import Image from "@theme/IdealImage";
```

Only import what is used on the page.

**Important rules:**

- Use `<Link to="...">` — never `<Link href="...">` (the `to` prop handles both internal and external URLs).
- Never use `<Link>` inside markdown headings — headings already wrap content in `<a>` for TOC anchors. Use `[text](url)` markdown syntax instead.
- Globally available components (`<Highlight>`, `<Emoji>`, `<GhRepoBadge>`, `<ShellCodeCopy>`) do not need imports — they are registered in `src/theme/MDXComponents.tsx`.
- See `.github/instructions/docusaurus-api.instructions.md` for the full Docusaurus API surface and anti-patterns.

## Content Style

- Use `:::tip`, `:::info`, `:::warning` admonitions for callouts.
- Reference images with site-root paths: `/img/...`.
- **Always use `<Image>` from `@theme/IdealImage` for PNG/JPG images** — never raw `<img>` or `![](...)` markdown syntax for content images (see `docusaurus-api.instructions.md` for full guidance).
- Use `<kbd>` for keyboard/command sequences.
- Heading IDs are managed by `pnpm write-heading-ids`; add explicit `{#custom-id}` only when needed.
- For HTML elements in MDX (`<kbd>`, `<details>`, `<samp>`, `<dl>`, etc.), refer to the [GitHub Flavored Markdown spec](https://github.github.com/gfm/#raw-html) for supported tags.

## Localization Awareness

- Edit only English source files in `docs/`, `community/`, `ecosystem/`.
- Do not manually edit files under `i18n/`.
- Some paths are excluded from translation (see `crowdin.yml`): `ecosystem/plugins/**`, `community/gallery/**`, `community/01_zsh_guide/**`.
