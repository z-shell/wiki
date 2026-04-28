#!/usr/bin/env bash
# PostToolUse hook: run pnpm lint only after file mutation tools.
set -eo pipefail

input=$(cat)
tool_name=$(echo "$input" | jq -r '.tool_name // empty' 2>/dev/null)

case "$tool_name" in
apply_patch | create_file | editFiles | insert_edit_into_file | replace_string_in_file)
  pnpm lint 2>&1 | tail -40
  ;;
esac
