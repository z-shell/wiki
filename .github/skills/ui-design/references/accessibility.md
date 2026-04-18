# Accessibility

Practical accessibility checklist for the wiki's UI components. Each section includes
actionable items and references to existing patterns in the codebase.

## Color Contrast

WCAG 2.1 AA minimum requirements:

- [ ] **Normal text**: 4.5:1 contrast ratio against background
- [ ] **Large text** (≥ 18pt or ≥ 14pt bold): 3:1 contrast ratio
- [ ] **UI components** (borders, icons, focus rings): 3:1 contrast ratio
- [ ] **Both themes tested**: Check contrast in both light and dark mode

### Known Concerns

| Element                 | Issue                                                   | Severity |
| ----------------------- | ------------------------------------------------------- | -------- |
| Card text on glass bg   | Semi-transparent card backgrounds may reduce contrast   | Check    |
| Light mode card borders | `hsl(0 0% 0% / 6%)` may be too subtle                   | Low      |
| CTA section text        | White text on gradient needs sufficient lightness diff  | Check    |
| Text shadows            | Decorative only — do not rely on shadow for readability | Info     |

### Testing

```sh
# Use browser DevTools Accessibility panel or Lighthouse
# Check contrast for:
# 1. Card description text → glass card background
# 2. Subheading text (opacity: 0.85) → section background
# 3. Badge text → badge background
```

## Keyboard Navigation

- [ ] **Tab order**: All interactive elements reachable via Tab key in logical order
- [ ] **Focus visible**: Every focusable element has a visible focus indicator
- [ ] **Enter/Space**: Buttons and links activate on Enter; checkboxes toggle on Space
- [ ] **Escape**: Dismisses modals, dropdowns, tooltips
- [ ] **Skip link**: Page has "Skip to content" link (provided by Docusaurus)
- [ ] **No keyboard traps**: Focus can always move away from any element

### Good Pattern: APITable

The `APITable` component implements keyboard navigation correctly:

```tsx
// src/components/APITable/index.tsx
<tr
  tabIndex={0}
  onKeyDown={(e: KeyboardEvent<HTMLTableRowElement>) => {
    if (e.key === "Enter") {
      // Navigate to linked page
    }
  }}
>
```

### Focus Style Standard

```css
/* Apply to all interactive custom elements */
.interactive:focus-visible {
  outline: 2px solid var(--ifm-color-primary);
  outline-offset: 2px;
}

/* Remove default outline only when providing custom focus */
.interactive:focus:not(:focus-visible) {
  outline: none;
}
```

## ARIA Patterns

- [ ] **Interactive non-semantic elements**: Add `role` and keyboard handlers
- [ ] **Icon-only buttons**: Include `aria-label` describing the action
- [ ] **Decorative elements**: Use `aria-hidden="true"` or empty `alt=""`
- [ ] **Status messages**: Use `role="status"` or `aria-live="polite"`
- [ ] **Navigation landmarks**: Use `<nav aria-label="...">`

### Good Pattern: Emoji Component

The `Emoji` component correctly provides accessible labeling:

```tsx
// src/components/Emoji/index.tsx
<span className={className} role="img" aria-label={label ?? ""} aria-hidden={label ? undefined : true} {...rest}>
  {symbol}
</span>
```

Key points:

- Uses `role="img"` for emoji characters
- `aria-label` provides text description when `label` prop is given
- `aria-hidden="true"` when no label (decorative emoji)

### Common ARIA Patterns for This Site

| Pattern            | ARIA                                  | Example             |
| ------------------ | ------------------------------------- | ------------------- |
| Emoji with meaning | `role="img" aria-label="description"` | Emoji component     |
| Decorative emoji   | `aria-hidden="true"`                  | Emoji without label |
| Card as link       | `<a>` wrapping card content           | HomeCommunity cards |
| Tab interface      | Docusaurus `<Tabs>` handles this      | Code examples       |
| Loading spinner    | `role="status" aria-label="Loading"`  | Spinner component   |
| Data table         | `<table>` with `<thead>` / `<tbody>`  | APITable            |

## Semantic HTML

- [ ] **Heading hierarchy**: `h1` → `h2` → `h3` without skipping levels
- [ ] **One `<h1>` per page**: Docusaurus generates this from frontmatter `title`
- [ ] **Landmarks**: Use `<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`
- [ ] **Lists**: Use `<ul>`/`<ol>` for groups of related items, not `<div>` chains
- [ ] **Buttons vs. links**: `<button>` for actions, `<a>` for navigation

### Heading Structure Pattern

```tsx
// Homepage section pattern
<section>
  {" "}
  {/* landmark */}
  <h2>Section Title</h2> {/* section heading — h2 since h1 is page title */}
  <p>Subtitle text</p>
  <div className={styles.grid}>
    <div className={styles.card}>
      <h3>Card Title</h3> {/* sub-heading under section */}
      <p>Card description</p>
    </div>
  </div>
</section>
```

## Motion & Animation

- [ ] **`prefers-reduced-motion`**: All animations respect the media query
- [ ] **No auto-playing motion**: Avoid animations that start without user action (except subtle entrance animations)
- [ ] **Short durations**: Interactive feedback ≤ 300ms; entrance animations ≤ 1s
- [ ] **No essential animation**: Information is never conveyed only through motion

### Existing Support

The site already has a global reduced-motion rule in `custom.css`:

```css
/* src/css/custom.css:316 */
@media (prefers-reduced-motion: reduce) {
  :root {
    transition-duration: 0s;
  }
}
```

### Elements That Need Reduced Motion Handling

| Element                | Animation            | Reduced Motion Action      |
| ---------------------- | -------------------- | -------------------------- |
| Hero logo (HomeBanner) | `jack-in-the-box` 4s | Disable — show static      |
| Card hover             | `translateY(-4px)`   | Global rule handles this   |
| Button hover           | `translateY(-2px)`   | Global rule handles this   |
| Spinner                | `spin` infinite      | Replace with opacity pulse |
| Logo filter            | `drop-shadow` glow   | Show without glow          |

## Image Accessibility

- [ ] **Alt text**: Every informative image has descriptive `alt` text
- [ ] **Decorative images**: Use `alt=""` (empty string, not omitted)
- [ ] **Complex images**: Use `aria-describedby` linking to a text description
- [ ] **SVG icons**: Use `aria-hidden="true"` when decorative; `role="img"` + `aria-label` when meaningful

### Image Component Usage

```tsx
/* Informative image — describe the content */
<ImgShow img="/img/install.png" alt="Terminal showing zi installation output" />

/* Decorative image — empty alt */
<img src="/img/decoration.svg" alt="" aria-hidden="true" />

/* Themed image with alt */
<ThemedImage
  alt="Architecture diagram showing plugin loading flow"
  sources={{
    light: "/img/arch-light.png",
    dark: "/img/arch-dark.png",
  }}
/>
```

## Interactive Elements

- [ ] **Touch target size**: Minimum 44×44px for touch devices
- [ ] **Button semantics**: Clickable non-link elements use `<button>`, not `<div onClick>`
- [ ] **Link purpose**: Link text describes the destination (not "click here")
- [ ] **Disabled state**: Use `disabled` attribute + `aria-disabled="true"` for clarity
- [ ] **Loading state**: Show `aria-busy="true"` during async operations

### Minimum Touch Target

```css
/* Ensure buttons/links meet 44px minimum */
.touchTarget {
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

## Checklist Summary

Quick-reference checklist when creating or reviewing any UI component:

```
□ Color contrast ≥ 4.5:1 (text) / 3:1 (UI) in both themes
□ All interactive elements keyboard-reachable with visible focus
□ Proper ARIA labels on icon-only buttons and meaningful emojis
□ Heading levels follow hierarchy (no skipping)
□ Animations respect prefers-reduced-motion
□ Images have appropriate alt text
□ Touch targets ≥ 44×44px
□ Semantic HTML elements used (button, a, nav, section)
```
