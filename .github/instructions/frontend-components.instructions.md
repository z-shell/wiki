---
description: "Use when creating or editing React components, custom pages, or theme overrides in src/. Covers TypeScript patterns, import conventions, and styling."
applyTo: "src/**/*.{ts,tsx}"
---

# Frontend Components

## Directory Layout

| Path                       | Purpose                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------- |
| `src/components/`          | Reusable React components (Emoji, Highlight, ImgShow, Player, etc.)                     |
| `src/components/shared/`   | Shared CSS modules (e.g. `CardGrid.module.css`) composed by sibling components — no TSX |
| `src/components/Markdown/` | MDX partial snippets (underscore-prefixed) imported by docs pages                       |
| `src/pages/`               | Custom pages routed automatically by Docusaurus                                         |
| `src/theme/`               | Swizzled Docusaurus theme overrides                                                     |
| `src/css/`                 | Global styles (`custom.css`)                                                            |
| `src/data/`                | Static data files consumed by config or components (e.g. `announcement-icons.ts`)       |

## TypeScript Conventions

- Use explicit prop types with `type` declarations (not `interface`), matching existing components.
- Export a single default function component per file.
- Destructure props in the function signature.
- Use `React.JSX.Element` as the return type.

Example pattern (from `Emoji/index.tsx`):

```tsx
import React, {type HTMLAttributes} from "react";

export type MyProps = HTMLAttributes<HTMLElement> & {
  required: string;
  optional?: string;
};

export default function MyComponent(props: MyProps): React.JSX.Element {
  const {required, optional, ...rest} = props;
  return <div {...rest}>{required}</div>;
}
```

## Imports

- Theme components: `@theme/Tabs`, `@theme/TabItem`, `@theme/IdealImage`, `@theme/ThemedImage`, `@theme/CodeBlock`, `@theme/Layout`, `@theme/Heading`
- Docusaurus components: `@docusaurus/Link`, `@docusaurus/Translate`, `@docusaurus/Head`, `@docusaurus/BrowserOnly`, `@docusaurus/Interpolate`, `@docusaurus/ErrorBoundary`
- Docusaurus hooks: `@docusaurus/useDocusaurusContext`, `@docusaurus/useBaseUrl`, `@docusaurus/useIsBrowser`, `@docusaurus/useGlobalData`, `@docusaurus/usePluginData`
- Generated data: `@generated/*`
- Use `clsx` for conditional class names.
- See `.github/instructions/docusaurus-api.instructions.md` for detailed usage guidance and anti-patterns.

## Images in Components

Use `ImgShow` (`src/components/ImgShow/`) for PNG/JPG images in TSX components. It wraps `@theme/IdealImage` with centered layout styling and accepts all IdealImage props:

```tsx
import ImgShow from "@site/src/components/ImgShow";

<ImgShow img="/img/example.png" alt="Example" />
<ImgShow img={require("./screenshot.png")} alt="Screenshot" />
```

For SVGs or tiny icons (≤80px), plain `<img>` with `useBaseUrl()` and explicit `width`/`height` is correct.

## Styling

- Prefer CSS Modules (`.module.css`) co-located with the component.
- Global overrides go in `src/css/custom.css`.
- Stylelint is enabled; run it before committing CSS changes.

## Linting

ESLint with TypeScript parser, Prettier, and Docusaurus plugin rules are configured in `eslint.config.ts` (flat config). The project enforces 2-space indentation (`.editorconfig`).
