---
name: ui-design
description: "Apply consistent visual design when creating or reviewing UI components. Covers design tokens, component patterns, glass-morphism cards, responsive grids, and accessibility. Use when building new homepage sections, auditing visual consistency, or reviewing CSS changes."
argument-hint: "Component name, file path, or 'audit' for full visual scan"
---

# UI Design

## When to Use

- Creating a new React component with visual output (homepage section, card, button, CTA)
- Reviewing CSS changes for consistency with the existing design language
- Auditing visual inconsistencies across components
- Implementing responsive layouts or interactive states (hover, focus, active)
- Adding or modifying animations and transitions
- Checking accessibility of UI patterns (contrast, keyboard, ARIA)

## Procedure

### Phase 1 — Scope

Determine what to work on:

| Input                      | Action                                                                     |
| -------------------------- | -------------------------------------------------------------------------- |
| Component name             | Review/create that single component against design references              |
| File path (`src/**/*.css`) | Audit that CSS file against [design tokens](./references/design-tokens.md) |
| `audit`                    | Scan all `src/components/Home*` and `src/css/custom.css`                   |
| `new <name>`               | Scaffold a new component using canonical patterns                          |

### Phase 2 — Apply

For each file in scope, apply the relevant reference:

| Task                     | Reference                                                |
| ------------------------ | -------------------------------------------------------- |
| Spacing, shadows, radii  | [Design Tokens](./references/design-tokens.md)           |
| Cards, grids, sections   | [Component Patterns](./references/component-patterns.md) |
| Contrast, keyboard, ARIA | [Accessibility](./references/accessibility.md)           |

When creating new components:

1. Start from the closest existing pattern in [Component Patterns](./references/component-patterns.md)
2. Use only values from the [Design Tokens](./references/design-tokens.md) reference — never hardcode spacing, shadows, radii, or breakpoints
3. Implement both light and dark mode from the start
4. Add hover, focus-visible, and active states for interactive elements
5. Test responsiveness at all standard breakpoints

When auditing existing components:

1. List every hardcoded value that should be a token
2. Flag duplicated CSS that matches a shared pattern
3. Check each interactive element against the accessibility checklist

### Phase 3 — Validate

After changes:

1. Visual check in both light and dark mode
2. Resize browser through all breakpoints (mobile → desktop)
3. Keyboard-navigate all interactive elements
4. Run linters:

   ```sh
   pnpm lint:css --quiet
   pnpm lint --quiet
   ```

5. Build:

   ```sh
   pnpm build:en
   ```

## Decision Points

- **New component vs. extend existing**: If the visual pattern matches an existing component (card grid, section container, CTA), extend or reuse it. Only create new patterns when the design genuinely differs.
- **Shared CSS vs. CSS Modules**: Token-level variables belong in `custom.css`. Component-specific styles use CSS Modules (`.module.css`). If three or more components share identical CSS, extract to a shared module.
- **Card grid duplication**: HomeWhyZi, HomeEcosystem, and HomeCommunity share nearly identical grid + card CSS. New card grids should not duplicate this pattern again — reference the canonical pattern and plan to consolidate.
- **Glass-morphism**: Cards use `backdrop-filter: blur(12px)` with semi-transparent backgrounds and borders. This is the established card design language — maintain it for visual consistency.
- **Monospace typography**: The all-monospace font stack (`JetBrains Mono` / `Hack`) is a deliberate brand decision for the developer-tool aesthetic. Do not introduce sans-serif fonts.
- **Animation budget**: Every animation must respect `prefers-reduced-motion`. Keep transitions under 300ms for interactive feedback; reserve longer durations for entrance animations only.

## Related Customizations

- Skill: [codebase-health-audit](../codebase-health-audit/SKILL.md) — includes CSS structure checks
- Reference: [css-styling](../codebase-health-audit/references/css-styling.md) — CSS Modules and `--ifm-*` variable conventions
- Instructions: [frontend-components](../../instructions/frontend-components.instructions.md) — TypeScript/React component conventions
