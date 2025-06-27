import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import eslintDocusaurus from "@docusaurus/eslint-plugin";
import {defineConfig} from "eslint/config";

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: {
      "@docusaurus": eslintDocusaurus,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/jsx-uses-react": "off", // Not needed with React 17+
      "react/react-in-jsx-scope": "off", // Not needed with React 17+
      "react/jsx-uses-vars": "error",
      "react/no-deprecated": "warn",
      "react/prop-types": "off", // Using TypeScript
      "react/jsx-key": "error",
      "prefer-const": "error",
      "no-unused-vars": "off", // Use @typescript-eslint/no-unused-vars instead
      "@typescript-eslint/no-unused-vars": ["warn", {argsIgnorePattern: "^_"}],
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off",
      "no-debugger": "warn",
      eqeqeq: ["error", "smart"],
      "@typescript-eslint/explicit-module-boundary-types": "off", // For better DX
    },
  },
]);
