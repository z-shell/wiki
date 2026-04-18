---
description: "Trigger the ui-design skill when creating or modifying visual components or styles."
applyTo: "src/**/*.{css,module.css}"
---

# Skill Trigger: UI Design

When this instruction is loaded, it means CSS or style files are being edited.

## Action Required

Before making visual changes, invoke the **ui-design** skill to ensure consistency with the project's design system:

- Design tokens (spacing, shadows, radii, colors)
- Glass-morphism card patterns (`backdrop-filter: blur(12px)`)
- Light/dark mode support via `[data-theme]` selectors
- Responsive breakpoints and interactive states
- `prefers-reduced-motion` compliance for animations

## When to Invoke

| Scenario                              | Invoke? |
| ------------------------------------- | ------- |
| Adding or modifying component styles  | ✅ Yes  |
| Changing hover/focus/active states    | ✅ Yes  |
| Adjusting spacing, colors, or shadows | ✅ Yes  |
| Fixing a typo in a CSS comment        | ❌ No   |
| Deleting unused styles                | ❌ No   |

## Invocation

Use the `ui-design` skill with the component name or file path as argument.
