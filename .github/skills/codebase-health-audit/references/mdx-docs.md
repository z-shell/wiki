# MDX Docs Checklist

## Frontmatter

Every `.mdx` page must include these fields:

```yaml
---
id: short_unique_id
title: "Page Title"
sidebar_position: 1
image: /img/png/theme/z/320x320.png
description: One-line summary of the page
keywords:
  - keyword1
  - keyword2
---
```

- [ ] `id` is present and unique within its content root (`docs/`, `community/`, `ecosystem/`)
- [ ] `title` is set (emoji in titles is acceptable per project convention)
- [ ] `sidebar_position` matches the numeric file prefix (`01_` → 1)
- [ ] `image` uses a site-root path from `static/`
- [ ] `description` is a concise summary
- [ ] `keywords` array is present

## File Naming

- Numeric prefixes control sidebar order: `01_first.mdx`, `02_second.mdx`
- Match the pattern of sibling files in the same directory
- Check for gaps or collisions in numbering

## Category Metadata

When a directory exists, it must have `_category_.json`:

```json
{
  "label": "🚀 Section Name",
  "position": 3,
  "link": {
    "type": "generated-index"
  }
}
```

- [ ] `label` present (with emoji if siblings use emoji)
- [ ] `position` consistent with sibling categories
- [ ] `link.type` set

## Imports

- [ ] Imports placed immediately after frontmatter, before any content
- [ ] Only used imports are present (no dead imports)
- [ ] Theme components use `@theme/*` aliases
- [ ] Site components use `@site/src/components/*` paths

## Content

- [ ] Admonitions use `:::tip`, `:::info`, `:::warning` — not raw HTML callouts
- [ ] Images reference site-root paths (`/img/...`)
- [ ] Keyboard sequences use `<kbd>` tags
- [ ] No manual edits to files under `i18n/` — English source only
