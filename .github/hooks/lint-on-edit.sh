#!/usr/bin/env bash
# PostToolUse hook: run pnpm lint only after file mutation tools.
set -eo pipefail

# Ensure jq is available; this hook requires it to parse the tool payload
if ! command -v jq &>/dev/null; then
  echo "Error: jq is required for lint-on-edit hook but not found. Install jq to enable automatic linting on file changes." >&2
  exit 1
fi

input=$(cat)
tool_name=$(echo "$input" | jq -r '.tool_name // empty')

case "$tool_name" in
apply_patch | create_file | edit | editFiles | insert_edit_into_file | multi_replace_string_in_file | replace_string_in_file)
  file_path=$(echo "$input" | jq -r '.tool_input.path // empty')
  if [[ -n $file_path && -f $file_path ]]; then
    trunk check "$file_path" 2>&1 | tail -40
  else
    pnpm lint 2>&1 | tail -40
  fi
  ;;
esac
