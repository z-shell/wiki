# Project Guidelines

## Build And Test

- Use Node >= 20 and pnpm >= 10 (see `engines` in `package.json`).
- Install dependencies with `pnpm install`.
- Use `pnpm start` for local development.
- Run `pnpm build` before finishing substantial changes.
- For docs-only checks in English, prefer `pnpm build:en` for faster validation.
- If the site behaves inconsistently after config or theme changes, run `pnpm clear` and rebuild.

## Architecture

- This repository is a Docusaurus site with three docs content roots:
  - `docs/` mapped to `/docs`
  - `community/` mapped to `/community`
  - `ecosystem/` mapped to `/ecosystem`
- Site behavior, plugins, locales, and routing are defined in `docusaurus.config.ts`.
- Sidebar structure and ordering come from `sidebars.ts` and local `_category_.json` files.
- UI components live in `src/components/`, custom pages in `src/pages/`, and theme overrides in `src/theme/`.
- Static assets are under `static/` and should be referenced with site-root paths such as `/img/...`.

## Conventions

- Follow existing file naming patterns for docs ordering (`01_*`, `02_*`, etc.).
- Keep doc/category metadata consistent by updating `_category_.json` when adding new sections.
- Prefer editing source English docs in `docs/`, `community/`, and `ecosystem/`.
- Use Crowdin workflows for localization updates (`pnpm crowdin:sync`, `pnpm crowdin:upload`) instead of manually rewriting translated trees unless the task is explicitly translation-targeted.
- Keep MDX pages aligned with existing style in nearby files (frontmatter-first, then imports, then content).

## Documentation Links

- Repository overview and context: `.github/README.md`
- Branching strategy: `.github/contributing/github_branching.md`
- Markdown and HTML authoring patterns: `.github/contributing/github_flavored_markdown.md`
- Installation and onboarding content: `docs/getting_started/01_installation.mdx`
- Command usage reference: `docs/guides/01_commands.mdx`
- Customization reference: `docs/guides/02_customization.mdx`
- Translation mapping and exclusions: `crowdin.yml`

## Agent Notes

- Prefer small, scoped edits that match surrounding MDX and TypeScript style.
- Link to existing docs rather than duplicating long guidance in generated responses or new instruction files.
- Do not introduce new global instruction files (for example `AGENTS.md`) unless explicitly requested.
