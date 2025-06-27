---
applyTo: "**"
---

# Z-Shell Wiki Contribution Guidelines

## 1. General Principles

- **Proactive Maintenance**: Actively identify, report, and fix issues such as broken links, typos, inconsistencies, and outdated information across the entire repository.
- **Guideline Adherence**: Strictly follow all guidelines outlined in `.github/COPILOT.md` and the documentation within `src/pages/contributing`.
- **Guideline Evolution**: If a guideline for a specific scenario is missing, propose and implement a new one to ensure the repository remains consistent and up-to-date.
- **Transparency**: Clearly explain the reasoning and steps taken for any changes made.

## 2. Version Control

- **Commit Messages**: Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. Commits must be prefixed with a type, such as `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, or `chore:`.

## 3. Code and Component Development

### Component Structure & Standardization

- **Directory Structure**: Each component must reside in its own directory (e.g., `src/components/ComponentName/`). Complex components should be broken down into smaller sub-components in separate files (e.g., `APITableRow.tsx`).
- **File Naming**: The main component file must be named `index.tsx`.
- **Props and Types**:
  - All component prop types must be defined in the central type definitions file at `src/types/components/ui.ts`.
  - Use `interface` over `type` aliases for object-based props.
- **Exports**: All components must be exported from the barrel file at `src/components/index.ts` for consistent imports.
- **MDX Registration**: Components intended for direct use in MDX files must be registered in `src/theme/MDXComponents.tsx`.

### Code Style & Quality

- **Linting**: Adhere to the ESLint rules defined in the project's configuration. Run `pnpm lint:fix` before committing.
- **TypeScript Style**: Follow the [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html) with these specifics:
  - **Indentation**: 2 spaces.
  - **Quotes**: Single quotes (`'`).
  - **Semicolons**: Use semicolons.
  - **Typing**: Use explicit types for all function parameters and return values.
  - **Naming**: Use `PascalCase` for components, interfaces, and types. Use `camelCase` for variables and functions.
- **Code Hygiene**: Remove all unused imports, variables, and redundant or deprecated code.
- **Performance**: Wrap components in `React.memo` where appropriate to prevent unnecessary re-renders.
- **Accessibility**: Ensure interactive components are fully accessible. Use `aria-*` attributes, `role`, and manage focus correctly. All interactive elements must be keyboard-navigable.

## 4. Styling (CSS)

- **CSS Modules**: All component-specific styles must be placed in a `styles.module.css` file within the component's directory.
- **Theme Variables**: To ensure visual consistency, always use Docusaurus theme variables (e.g., `--ifm-color-primary`, `--ifm-font-size-base`, `--ifm-spacing-horizontal`) instead of hard-coded values.
- **Conditional Classes**: Use the `clsx` utility for applying conditional classes.

## 5. Documentation and Content (MDX)

### Frontmatter

- Ensure every page has the required frontmatter fields (`id`, `title`, `description`, `sidebar_position`, `keywords`, etc.) as specified in `src/pages/contributing/frontmatter.mdx`.

### Markdown & Writing Style

- **Linting**: Adhere to all markdownlint rules (e.g., no bare URLs, no blank lines in blockquotes).
- **Links**: Use descriptive link text. Do not use bare URLs; wrap them in `<...>` or convert them to proper Markdown links `[text](url)`.
- **Headings**: Use sentence case. Do not skip heading levels (e.g., `##` followed by `####`).
- **Custom Components**: Utilize the project's custom components like `<Icon>`, `<APITable>`, `<CommandBlock>`, and `<Svg>` where appropriate.
- **Accessibility**: Ensure all images (`<img>`, `<ImgShow>`, `<Svg>`) have descriptive `alt` text.
- **Clarity**: Write in a clear, conversational tone using the active voice.
