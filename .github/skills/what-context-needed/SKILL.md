---
name: what-context-needed
description: "Identify and inspect missing context for a z-shell wiki question, asking the user only for information unavailable from the repository."
---

# What Context Do You Need?

Use the question in the current conversation. Search and read available repository sources before asking the user to supply context.

## Instructions

1. Based on the question, locate and inspect relevant files
2. Explain why each file is relevant
3. Note any files you've already seen in this conversation
4. Identify what you're uncertain about

## Output Format

```markdown
## Files I Need

### Must See (required for accurate answer)

- `path/to/file.ts` — [why needed]

### Should See (helpful for complete answer)

- `path/to/file.ts` — [why helpful]

### Already Have

- `path/to/file.ts` — [from earlier in conversation]

### Uncertainties

- [What I'm not sure about without seeing the code]
```

Answer the question using verified context. If essential information is unavailable, ask one concise question explaining the gap and continue independent investigation. Do not require the user to repeat the question or paste files you can read.
