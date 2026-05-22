---
description: "Use the docusaurus-writer agent when creating new MDX documentation pages or substantially restructuring existing ones."
applyTo: "{docs,community,ecosystem}/**/*.mdx"
---

# Agent Trigger: Docusaurus Writer

When this instruction is loaded, MDX documentation files are being edited or created.

## Action Required

When **creating a new documentation page or category**, invoke the **docusaurus-writer** agent to ensure
the full authoring workflow is followed: codebase context discovery, Docusaurus-compliant MDX authoring,
release-readiness QA, and localization sync.

> **Note**: For post-edit QA on _existing_ pages, use the **docs-release-readiness** skill instead
> (see `skill-docs-readiness.instructions.md`).

## When to Invoke

| Scenario                                      | Invoke?                                     |
| --------------------------------------------- | ------------------------------------------- |
| Creating a new `.mdx` page from scratch       | ✅ docusaurus-writer agent                  |
| Adding a new directory with `_category_.json` | ✅ docusaurus-writer agent                  |
| Substantially rewriting an existing page      | ✅ docusaurus-writer agent                  |
| Minor edits (typos, code example updates)     | ❌ No — edit directly                       |
| Post-edit validation of existing pages        | ❌ Use docs-release-readiness skill instead |

## Invocation

Invoke the `docusaurus-writer` agent and provide:

1. The target content root and directory (`docs/`, `community/`, `ecosystem/`)
2. The page or section title
3. Any existing pages to cross-link

### Choosing the content root

Before creating a page, select the root:

- Admin / tooling / operational / infrastructure → `community/`.
- Zi plugin-manager user docs → `docs/`.
- Third-party ecosystem (annexes, packages, plugins) → `ecosystem/`.

`docs/` is Zi user docs only — never put maintainer tooling there.
