# CSS & Styling Checklist

## CSS Modules

- [ ] Component styles use CSS Modules (`.module.css`) co-located with the component
- [ ] No component-scoped rules in `src/css/custom.css`
- [ ] Class names are camelCase in TypeScript, kebab-case in CSS

```tsx
// ✅ CSS Module import
import styles from "./styles.module.css";

// Component usage
<div className={styles.container}>
```

## Theme Variables

- [ ] Use CSS custom properties (`--ifm-*`) for theme-aware values
- [ ] No hard-coded colors that should respond to light/dark mode
- [ ] Custom properties defined at `:root` or `[data-theme='dark']` level when needed

```css
/* ✅ */
.container {
  color: var(--ifm-color-primary);
  background: var(--ifm-background-color);
}

/* ❌ */
.container {
  color: #25c2a0;
  background: #ffffff;
}
```

## Global vs. Scoped

| Location | Purpose |
|----------|---------|
| `src/css/custom.css` | Theme variable overrides, global resets, Docusaurus framework overrides |
| `src/components/*/styles.module.css` | Component-specific styles |

- [ ] Global CSS only contains theme variables, font imports, and framework overrides
- [ ] Component styles are self-contained in their module files

## Stylelint

After CSS changes, validate:

```sh
pnpm lint:css --quiet
```
