# TypeScript & React Checklist

## Component Structure

- [ ] One default function export per file
- [ ] Return type is `React.JSX.Element`
- [ ] Props destructured in function signature
- [ ] Prop types use `type` (not `interface`), extending the appropriate HTML element type

Example:

```tsx
import React, {type HTMLAttributes} from "react";

export type MyProps = HTMLAttributes<HTMLElement> & {
  required: string;
  optional?: string;
};

export default function MyComponent({required, optional, ...rest}: MyProps): React.JSX.Element {
  return <div {...rest}>{required}</div>;
}
```

## Import Ordering

Enforce this order, separated by blank lines:

1. Node builtins (`node:path`, `node:fs`)
2. External packages — `react`, `react-dom`, `clsx` first, then others alphabetically
3. Internal aliases — `@theme/*`, `@docusaurus/*`, `@site/*`, `@generated/*`
4. Relative imports (`./`, `../`)
5. Style imports (`.css`, `.module.css`)
6. Type-only imports (`import type ...`) at the end of each group

Remove any unused imports.

## Conditional Class Names

Use `clsx` for conditional class names:

```tsx
import clsx from "clsx";
// ✅
className={clsx(styles.base, active && styles.active)}
// ❌
className={`${styles.base} ${active ? styles.active : ""}`}
```

## Lazy Loading

Heavy or optional components should use `@loadable/component`:

```tsx
import Loadable from "@loadable/component";
const HeavyComponent = Loadable(() => import("./HeavyComponent"));
```

Apply when:
- The component imports a large library (charts, editors, players)
- The component is below the fold or conditionally rendered
- The component is only used on specific pages
