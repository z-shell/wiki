---
description: "Trigger the docs-release-readiness skill when documentation pages are added or substantially changed."
applyTo: "{docs,community,ecosystem}/**/*.mdx"
---

# Skill Trigger: Docs Release Readiness

When this instruction is loaded, it means MDX documentation files are being edited.

## Action Required

After completing documentation changes, invoke the **docs-release-readiness** skill to run the pre-merge QA checklist:

- Frontmatter validation (`id`, `title`, `sidebar_position`, `description`, `keywords`)
- Category metadata (`_category_.json`) for new directories
- Heading ID consistency (`pnpm write-heading-ids`)
- Cross-link integrity (no broken internal links)
- Static asset references exist under `static/`
- Translation readiness for non-excluded paths

## When to Invoke

| Scenario                             | Invoke? |
| ------------------------------------ | ------- |
| Adding a new documentation page      | ✅ Yes  |
| Restructuring sections or categories | ✅ Yes  |
| Changing multiple frontmatter fields | ✅ Yes  |
| Fixing a single typo                 | ❌ No   |
| Updating a code example inline       | ❌ No   |

## Invocation

Use the `docs-release-readiness` skill with the changed file paths or directory as argument.
