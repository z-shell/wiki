import {dirname} from "node:path";
import {fileURLToPath} from "node:url";

import {fixupPluginRules} from "@eslint/compat";
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import * as importPlugin from "eslint-plugin-import-x";
// @ts-expect-error: no type declarations available
import jsxA11y from "eslint-plugin-jsx-a11y";
import * as mdx from "eslint-plugin-mdx";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

import docusaurus from "@docusaurus/eslint-plugin";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
  // Global ignores
  {
    ignores: [
      "build/",
      ".docusaurus/",
      ".github/",
      ".trunk/",
      ".wrangler/",
      "node_modules/",
      "i18n/",
      "static/",
      "blog/",
      "*.config.ts",
      "docs/**/*.md",
      "docs/**/*.mdx",
      "community/**/*.md",
      "community/**/*.mdx",
      "ecosystem/**/*.md",
      "ecosystem/**/*.mdx",
      "blog/**/*.md",
    ],
  },

  // Base JS recommended rules
  eslint.configs.recommended,

  // TypeScript recommended
  ...tseslint.configs.recommended,

  // Import plugin (flat config)
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,

  // React Hooks (flat config)
  reactHooks.configs.flat["recommended-latest"],

  // JSX Accessibility
  jsxA11y.flatConfigs.recommended,

  // MDX support (scoped to src/ — doc content uses Docusaurus-specific MDX
  // extensions like {#heading-id} that the eslint-mdx parser cannot handle)
  {
    ...mdx.flat,
    files: ["src/**/*.{md,mdx}"],
  },
  {
    ...mdx.flatCodeBlocks,
    // The /** suffix matches virtual files (fenced code blocks) created by eslint-plugin-mdx
    files: ["src/**/*.{md,mdx}/**"],
  },

  // Docusaurus
  {
    plugins: {"@docusaurus": fixupPluginRules(docusaurus as any)},
    rules: {
      "@docusaurus/no-untranslated-text": "off",
      "@docusaurus/string-literal-i18n-messages": "error",
      "@docusaurus/no-html-links": "warn",
      "@docusaurus/prefer-docusaurus-heading": "warn",
    },
  },

  // Prettier (must be last config-level entry to disable conflicting rules)
  eslintConfigPrettier,

  // Project-specific rules and settings
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.node,
        JSX: "readonly",
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
        ecmaFeatures: {jsx: true},
      },
    },
    settings: {
      "import-x/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: __dirname,
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
      "import-x/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
    },
    rules: {
      // Stylistic
      semi: ["error", "always"],
      "prefer-const": "error",

      // Possible errors
      "no-undef": "off",
      "no-constant-binary-expression": "error",

      // Suggestions
      "no-case-declarations": "warn",
      "no-console": "off",
      "no-control-regex": "warn",
      "no-else-return": ["warn", {allowElseIf: true}],
      "no-empty": ["warn", {allowEmptyCatch: true}],
      "no-lonely-if": "warn",
      "no-nested-ternary": "warn",
      "no-param-reassign": ["warn", {props: false}],
      "no-prototype-builtins": "warn",
      "no-template-curly-in-string": "warn",
      "no-unused-expressions": ["warn", {allowTaggedTemplates: true}],
      "no-useless-escape": "warn",
      "no-void": ["error", {allowAsStatement: true}],
      "prefer-destructuring": "warn",
      "prefer-named-capture-group": "warn",
      "prefer-template": "warn",

      // Import ordering and resolution
      "import-x/extensions": "off",
      "import-x/no-unresolved": [
        "error",
        {ignore: ["^@theme", "^@docusaurus", "^@generated", "^@site", "^@testing-utils"]},
      ],
      "import-x/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling", "index"], "type"],
          pathGroups: [
            {
              pattern: "*.+(css|sass|less|scss|pcss|styl)",
              group: "unknown",
              patternOptions: {matchBase: true},
              position: "after",
            },
            {pattern: "react", group: "builtin", position: "before"},
            {pattern: "react-dom", group: "builtin", position: "before"},
            {pattern: "react-dom/**", group: "builtin", position: "before"},
            {pattern: "clsx", group: "external", position: "before"},
            {pattern: "@theme/**", group: "internal"},
            {pattern: "@site/**", group: "internal"},
            {pattern: "@theme-init/**", group: "internal"},
            {pattern: "@theme-original/**", group: "internal"},
          ],
          pathGroupsExcludedImportTypes: [],
          warnOnUnassignedImports: true,
        },
      ],
      "import-x/no-named-as-default": "off",
      "import-x/prefer-default-export": "off",

      // TypeScript overrides
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": ["warn", {argsIgnorePattern: "^_", varsIgnorePattern: "^_"}],
    },
  },

  // MDX overrides (must come after project rules to take precedence)
  {
    files: ["**/*.{md,mdx}", "**/*.{md,mdx}/**"],
    rules: {
      semi: "off",
      "no-irregular-whitespace": "off",
      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
);
