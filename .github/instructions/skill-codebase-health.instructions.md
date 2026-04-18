---
description: "Trigger the codebase-health-audit skill after bulk changes to TypeScript components or documentation."
applyTo: "src/**/*.{ts,tsx}"
---

# Skill Trigger: Codebase Health Audit

When this instruction is loaded, it means TypeScript or React component files are being edited.

## Action Required

After completing bulk changes (3+ files), invoke the **codebase-health-audit** skill to verify consistency:

- Import ordering and unused imports
- Prop type conventions (`type` not `interface`)
- Single default export per component file
- Performance patterns (lazy loading, `@theme/IdealImage`)
- CSS Module co-location

## When to Invoke

| Scenario                          | Invoke? |
| --------------------------------- | ------- |
| Editing 3 or more component files | ✅ Yes  |
| Adding a new component            | ✅ Yes  |
| Refactoring imports or exports    | ✅ Yes  |
| Changing a single string literal  | ❌ No   |
| Updating a comment                | ❌ No   |

## Invocation

Use the `codebase-health-audit` skill with `changed` or the specific directory as argument.
