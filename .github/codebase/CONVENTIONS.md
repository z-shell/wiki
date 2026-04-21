# Coding Conventions

## Core Sections (Required)

### 1) Naming Rules

| Item               | Rule                                                                                                                                                     | Example                                                                                                           | Evidence                                                                                                                             |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Files              | Mixed-by-domain: ordered docs use numeric prefixes; component directories use PascalCase with `index.tsx`; Pages Functions use bracketed route filenames | `docs/getting_started/01_installation.mdx`, `src/components/HomeCommunity/index.tsx`, `functions/cdn/[[path]].ts` | `docs/getting_started/01_installation.mdx`, `src/components/HomeCommunity/index.tsx`, `functions/cdn/[[path]].ts`                    |
| Functions/methods  | camelCase helpers; React components use PascalCase default function exports                                                                              | `createAnnouncementIcon`, `HomeCommunity`, `createR2Handler`                                                      | `docusaurus.config.ts`, `src/components/HomeCommunity/index.tsx`, `functions/_r2.ts`                                                 |
| Types/interfaces   | PascalCase type aliases/interfaces are preferred in TS code                                                                                              | `CommunityLink`, `CommunityGlyph`, `SvgIconProps`                                                                 | `src/components/HomeCommunity/index.tsx`, `src/components/Svg/index.tsx`, `.github/instructions/frontend-components.instructions.md` |
| Constants/env vars | UPPER_SNAKE_CASE for constants and env names                                                                                                             | `COMMUNITY_GLYPHS`, `ASSETS_BUCKET`, `CROWDIN_TOKEN`                                                              | `src/components/HomeCommunity/index.tsx`, `functions/_r2.ts`, `crowdin.yml`                                                          |

### 2) Formatting and Linting

- Formatter: Prettier via `.prettierrc.json`
- Linter: ESLint flat config in `eslint.config.ts`; Stylelint in `.stylelintrc.yml`
- Most relevant enforced rules:
  - semicolons required
  - import ordering enforced through `eslint-plugin-import-x`
  - CSS colors must be HSL
- Run commands: `pnpm lint`, `pnpm lint:css`, `pnpm lint:fix`, `pnpm lint:css:fix`

### 3) Import and Module Conventions

- Import grouping/order: builtins -> external -> internal aliases -> parent/sibling/index -> type imports, with stylesheet imports grouped after other imports
- Alias vs relative import policy: Docusaurus aliases (`@site`, `@theme`, `@theme-original`, `@docusaurus`, `@generated`) are used for framework/module boundaries; relative imports are used for nearby files like `./styles.module.css`
- Public exports/barrel policy: no repo-wide barrel-export policy was found; `[TODO]` only local registries such as `src/theme/MDXComponents.tsx` are explicitly aggregated

### 4) Error and Logging Conventions

- Error strategy by layer:
  - Docusaurus/React config and components generally let framework errors surface
  - Pages Functions return `404` for invalid/bare keys, `304` for conditional matches, and generic `500` on caught runtime errors
- Logging style and required context fields: `[TODO]` no application logging library or message format was found in the repo
- Sensitive-data redaction rules: `[TODO]` no explicit redaction policy was found; secrets are injected through GitHub Actions/workflow env rather than committed templates

### 5) Testing Conventions

- Test file naming/location rule: `[TODO]` no local `*.test.*` or `*.spec.*` files were found
- Mocking strategy norm: `[TODO]` no local test suite was found to infer a mocking convention
- Coverage expectation: `[TODO]` no coverage threshold or local coverage tool was found

### 6) Evidence

- `eslint.config.ts`
- `.prettierrc.json`
- `.stylelintrc.yml`
- `.editorconfig`
- `.github/instructions/frontend-components.instructions.md`
- `.github/instructions/docs-authoring.instructions.md`
- `src/components/HomeCommunity/index.tsx`
- `src/components/Svg/index.tsx`

## Extended Sections (Optional)

### Branching and Release Conventions

- Evergreen branches: `main` and `stable`
- Working branches:
  - `feature-<id>` branch from and merge back to `main`
  - `bug-<id>` branch from and merge back to `main`
  - `hotfix-<id>` branch from `stable`, merge to both `stable` and `main`

Evidence: `.github/contributing/github_branching.md`
