#!/usr/bin/env bash
#
# Type System Checker
# This script helps maintain the type system by checking for common issues
#
# Usage:
#   ./scripts/check-types.sh
#

set -e

# Change to project root
cd "$(dirname "$0")/.."

echo "🔍 Checking for type issues..."

# Check for TypeScript errors
echo "Running TypeScript compiler..."
npx tsc --noEmit

# Check for duplicate type definitions
echo "Checking for duplicate type definitions..."
grep -r "export.*interface" --include="*.ts" src/types/ | sort | uniq -c | sort -nr | grep -v "^ *1 " || echo "No duplicates found"

# Check for relative path imports to old types file
echo "Checking for imports from old types location..."
grep -r "from.*components/types" --include="*.tsx" --include="*.ts" src/ || echo "No imports from old location found"

# Check that all components use types
echo "Checking that components use types..."
for file in $(find src/components -name "index.tsx" -o -name "*.tsx" | grep -v "index.tsx$"); do
  if ! grep -q "import.*from.*types" "$file"; then
    echo "⚠️ Component may be missing type import: $file"
  fi
done

echo "✅ Type system check complete!"
