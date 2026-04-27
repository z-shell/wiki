#!/bin/bash
# postToolUse hook: run pnpm lint only after file edit or create tools.
# Copilot passes the tool invocation as JSON on stdin.
set -eo pipefail

INPUT=$(cat)
TOOL=$(echo "$INPUT" | jq -r '.toolName' 2>/dev/null)

if [ "$TOOL" = "edit" ] || [ "$TOOL" = "create" ]; then
  pnpm lint --quiet 2>&1 | tail -40
fi
