---
description: "Use when creating or editing React components, custom pages, or theme overrides in src/. Covers TypeScript patterns, import conventions, and styling."
applyTo: "src/**/*.{ts,tsx}"
---

# Frontend Components

## Directory Layout

| Path              | Purpose                                                             |
| ----------------- | ------------------------------------------------------------------- |
| `src/components/` | Reusable React components (Emoji, Highlight, ImgShow, Player, etc.) |
| `src/pages/`      | Custom pages routed automatically by Docusaurus                     |
| `src/theme/`      | Swizzled Docusaurus theme overrides                                 |
| `src/css/`        | Global styles (`custom.css`)                                        |
| `src/data/`       | Static data files consumed by components                            |

## TypeScript Conventions

- Use explicit prop types with `type` declarations (not `interface`), matching existing components.
- Export a single default function component per file.
- Destructure props in the function signature.
- Use `React.JSX.Element` as the return type.

Example pattern (from `Emoji.tsx`):

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

- Theme components: `@theme/Tabs`, `@theme/TabItem`, `@theme/IdealImage`
- Docusaurus utilities: `@docusaurus/Link`, `@docusaurus/useDocusaurusContext`
- Generated data: `@generated/*`
- Use `clsx` for conditional class names.

## Styling

- Prefer CSS Modules (`.module.css`) co-located with the component.
- Global overrides go in `src/css/custom.css`.
- Stylelint is enabled; run it before committing CSS changes.

## Linting

ESLint with TypeScript parser, Prettier, and Docusaurus plugin rules are configured in `eslint.config.ts` (flat config). The project enforces 2-space indentation (`.editorconfig`).
