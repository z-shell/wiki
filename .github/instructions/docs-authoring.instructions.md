---
description: "Use when creating, editing, or reorganizing MDX documentation pages in docs/, community/, or ecosystem/. Covers frontmatter shape, file naming, category metadata, and import conventions."
applyTo: "{docs,community,ecosystem}/**/*.mdx"
---

# Docs Authoring

## Content Root Selection

Choose the content root before writing. The roots are not interchangeable:

| Content type                                                                            | Root                                           |
| --------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Zi plugin-manager install / commands / usage                                            | `docs/`                                        |
| Contributing, Zsh handbook, plugin standard, community tools such as ZUnit and Zsh Lint | `community/`                                   |
| Maintainer / operational / infrastructure runbooks                                      | **not the wiki** — `z-shell/.github/runbooks/` |
| Third-party annexes, packages, plugins                                                  | `ecosystem/`                                   |

**Prohibition:** Never place maintainer, operational, or infrastructure
documentation anywhere in the wiki (neither `docs/` nor `community/`). It leaks
ops surface and belongs in `z-shell/.github/runbooks/`. See ADR
`decisions/0006-wiki-content-root-boundaries.md` in `z-shell/.github`.

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

**Required fields** (build and commit validation will fail without these):

- `id` — unique within its content root; used by Docusaurus for cross-linking
- `title` — displayed in sidebar and browser tab
- `sidebar_position` — controls order inside the parent category

**Recommended fields** (reported as warnings by `pnpm validate:frontmatter`):

- `description` — one-line summary; used by Algolia search and social previews
- `keywords` — array of terms for Algolia and SEO

**Exempt files**: any `.mdx` file whose name starts with `_` (e.g. MDX partials used as imports) does not need frontmatter and is skipped by validation.

Run `pnpm validate:frontmatter` before pushing to catch any missing fields.

When editing `community/03_zsh_plugin_standard.mdx`, also run
`pnpm validate:plugin-standard`. This checks the portable-core/profile boundary,
legacy route anchors, safety guidance, and the semiannual review workflow
contract.

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

## GFM and Docusaurus Affordances

Use the simplest format that makes the information easier to scan or understand.
Prefer Markdown and GitHub Flavored Markdown (GFM) over JSX; introduce an MDX
component only when Markdown cannot express the interaction.

| Reader need                    | Preferred form                                    | Use it for                                                                | Do not use it for                                        |
| ------------------------------ | ------------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------- |
| Comparison or reference matrix | GFM table                                         | Two to four short, consistently shaped columns                            | Long prose, multi-step procedures, or large code samples |
| Ordered procedure              | Numbered list                                     | Actions that must happen in sequence                                      | Unordered collections or conceptual overviews            |
| Completion checklist           | GFM task list (`- [ ]`)                           | Work readers can actually complete or verify                              | Decorative feature lists                                 |
| Context, advice, or risk       | `:::tip`, `:::info`, `:::warning`, or `:::danger` | Information whose callout level changes how readers act                   | Repeating ordinary body text or decorating every section |
| Optional or advanced detail    | `<details>` with a one-line `<summary>`           | Long output, troubleshooting detail, or secondary explanation             | Required steps or information every reader needs         |
| Equivalent alternatives        | `<Tabs>` and `<TabItem>`                          | Operating systems, package managers, or genuinely interchangeable methods | Sequential steps or unrelated topics                     |

| Literal quotation | Markdown blockquote (`>`) | Attributed quotations | Callouts; use an admonition instead |
| Navigation choices | `<CardGrid>` and `<Card>` | Landing-page links to peer sections | Ordinary paragraphs or isolated links |

### Presentation rules

- Start each page and major section with the outcome or purpose before details.
- Use sentence-case headings and descriptive link text. Do not use bold text as a
  substitute for a heading and do not use bare URLs when a meaningful label is
  available.
- Keep paragraphs focused; split a paragraph when it changes subject or grows
  beyond roughly five sentences.
- Keep tables compact and scannable. If a cell needs paragraphs, nested lists,
  or substantial code, use headings or definition-style prose instead.
- Keep `<summary>` on one line and leave blank lines around Markdown nested in
  `<details>`, `<Tabs>`, `<TabItem>`, or other JSX containers so MDX parses it as
  Markdown rather than text.
- Give related tab groups a stable `groupId`. Do not use `lazy` when hidden tab
  content must remain searchable or indexable.

- Use code-block `title="..."` when a filename or role matters, highlight only
  the lines under discussion, and reserve `showLineNumbers` for longer blocks
  that the prose references by line.
- Use raw HTML only for semantic elements that Markdown does not provide. Do not
  use raw HTML or inline styles to create layout.

Prettier owns MDX layout, including table alignment, list spacing, and JSX
wrapping. Run `pnpm lint` after authoring and `pnpm lint:fix` to apply safe
formatting fixes. A production build remains required because formatting cannot
prove that an MDX component renders correctly.

## Code Blocks

Always choose the most specific accurate fence language so examples receive the
right highlighting:

- `zsh` — generic Zsh syntax and shell snippets
- `zi` — Zi commands, ice modifiers, and Zi-oriented examples
- `zunit` — ZUnit test files and ZUnit CLI examples
- `sh` — portable POSIX shell
- `bash` — Bash-specific syntax
- `yaml`, `json`, `diff`, etc. — non-shell formats

Every rendered code fence must declare a language. Do not use the generic
`shell` label. Use `text` for output with no language syntax and `shell-session`
for a transcript containing prompts and commands. Structural `mdx-code-block`
wrappers are exempt.

Run `pnpm validate:code-fences` before pushing. The validator also rejects Zi
commands labeled as generic Zsh so the custom Zi grammar is applied consistently.

## Localization Awareness

- Edit only English source files in `docs/`, `community/`, `ecosystem/`.
- Do not manually edit files under `i18n/`.
- Some paths are excluded from translation (see `crowdin.yml`): `ecosystem/plugins/**`, `community/05_gallery/**`, `community/01_zsh_guide/**`.
