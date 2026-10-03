---
name: context-map
description: "Map z-shell wiki files, dependencies and tests for a requested investigation or a change whose scope needs clarification."
---

# Context Map

Use the user's current task. Inspect relevant repository files and map dependencies when this helps establish scope; a routine focused edit does not require a separate map or approval stage.

## Instructions

1. Search the codebase for files related to this task
2. Identify direct dependencies (imports/exports)
3. Find related tests
4. Look for similar patterns in existing code

## Output Format

```markdown
## Context Map

### Files to Modify

| File         | Purpose     | Changes Needed |
| ------------ | ----------- | -------------- |
| path/to/file | description | what changes   |

### Dependencies (may need updates)

| File        | Relationship                 |
| ----------- | ---------------------------- |
| path/to/dep | imports X from modified file |

### Test Files

| Test         | Coverage                     |
| ------------ | ---------------------------- |
| path/to/test | tests affected functionality |

### Reference Patterns

| File            | Pattern           |
| --------------- | ----------------- |
| path/to/similar | example to follow |

### Risk Assessment

- [ ] Breaking changes to public API
- [ ] Database migrations needed
- [ ] Configuration changes required
```

If the request is only for a map, report it without implementation. Otherwise continue within the existing authorized scope; ask only when the map reveals a material decision or expansion needing approval.
