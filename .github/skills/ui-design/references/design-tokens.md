# Design Tokens

Canonical reference for all visual values used across the wiki UI. Values are derived from
auditing `src/css/custom.css` and all component CSS modules.

> **Convention**: Use design tokens from this reference instead of hardcoded values.
> When a value isn't covered here, propose a new token following the naming pattern.

## Color System

### Brand Colors (HSL-based)

The primary palette uses HSL with a shared hue-saturation variable, varying only lightness:

```css
/* Source: custom.css :root */
--site-primary-hue-saturation: 168 70%; /* teal — dark mode base */
--site-primary-hue-saturation-light: 167 60%; /* slightly desaturated for light mode */
```

| Token                          | Light Mode       | Dark Mode        |
| ------------------------------ | ---------------- | ---------------- |
| `--ifm-color-primary`          | hsl(168 70% 30%) | hsl(168 70% 45%) |
| `--ifm-color-primary-dark`     | hsl(168 70% 26%) | hsl(168 70% 41%) |
| `--ifm-color-primary-darker`   | hsl(168 70% 23%) | hsl(168 70% 38%) |
| `--ifm-color-primary-darkest`  | hsl(168 70% 17%) | hsl(168 70% 32%) |
| `--ifm-color-primary-light`    | hsl(167 60% 39%) | hsl(167 60% 54%) |
| `--ifm-color-primary-lighter`  | hsl(167 60% 47%) | hsl(167 60% 62%) |
| `--ifm-color-primary-lightest` | hsl(167 60% 58%) | hsl(167 60% 73%) |

### Surface Colors

| Token                            | Value                                   | Usage                        |
| -------------------------------- | --------------------------------------- | ---------------------------- |
| `--ifm-background-color`         | `hsl(0 0% 100%)` / `hsl(216 28% 7%)`    | Page background              |
| `--ifm-background-surface-color` | `hsl(210 29% 97%)` / `hsl(210 12% 16%)` | Navbar, footer surface       |
| `--site-color-surface-dark`      | `hsl(210 12% 16%)`                      | Dark elevated surfaces       |
| `--site-color-surface-elevated`  | `hsl(210 12% 19%)`                      | Hero section, elevated cards |
| `--site-color-navbar-dark`       | `hsl(215 21% 11%)`                      | Dark navbar, footer          |

### Overlay & Transparency

| Token                        | Value                   | Usage                    |
| ---------------------------- | ----------------------- | ------------------------ |
| `--site-color-overlay-light` | `rgb(94 100 112 / 70%)` | Light mode modal overlay |
| `--site-color-overlay-dark`  | `rgb(47 55 69 / 70%)`   | Dark mode modal overlay  |
| `--site-color-subtle-hover`  | `rgb(255 255 255 / 5%)` | Subtle hover state       |

### Card Surface Colors

Cards use a glass-morphism pattern with semi-transparent backgrounds:

| Context    | Dark Mode             | Light Mode             |
| ---------- | --------------------- | ---------------------- |
| Background | `hsl(0 0% 100% / 4%)` | `hsl(0 0% 100% / 70%)` |
| Border     | `hsl(0 0% 100% / 8%)` | `hsl(0 0% 0% / 6%)`    |

## Typography

### Font Stack (Deliberate Monospace)

The all-monospace design is an intentional brand decision for the developer-tool aesthetic:

```css
--ifm-font-family: "JetBrains Mono", "Hack", monospace;
--ifm-font-family-base: "JetBrains Mono", monospace; /* Body text */
--ifm-font-family-monospace: "Hack", monospace; /* Code blocks */
```

### Font Size Scale

| Name       | Value     | Usage                                |
| ---------- | --------- | ------------------------------------ |
| `hero`     | `2.8rem`  | Hero tagline                         |
| `h1`       | `2.2rem`  | Section headings                     |
| `h2`       | `2rem`    | Showcase heading, secondary headings |
| `subtitle` | `1.05rem` | Subheadings, descriptions            |
| `card`     | `1.25rem` | Card titles                          |
| `body`     | `1rem`    | Buttons, body text                   |
| `small`    | `0.85rem` | Badges, metadata                     |

## Spacing Scale

Target 8-point scale. Maps current hardcoded values to semantic tokens:

| Token         | Value     | Current Usage                                                       |
| ------------- | --------- | ------------------------------------------------------------------- |
| `--space-xs`  | `0.25rem` | Kbd padding, footer item padding                                    |
| `--space-sm`  | `0.5rem`  | Small gaps                                                          |
| `--space-md`  | `0.75rem` | Card title margin-bottom, button vertical padding                   |
| `--space-lg`  | `1rem`    | Card icon/emoji margin, button gap, heading margin                  |
| `--space-xl`  | `1.25rem` | Grid gap (Ecosystem, Community)                                     |
| `--space-2xl` | `1.5rem`  | Card inner padding (horizontal), grid gap (WhyZi), heading gap      |
| `--space-3xl` | `2rem`    | Card inner padding (vertical), CTA description margin, hero padding |
| `--space-4xl` | `3rem`    | Section heading margin-bottom, showcase grid gap                    |
| `--space-5xl` | `5rem`    | Section vertical padding                                            |

### Usage Examples

```css
/* ✅ Correct — use token */
.section {
  padding: var(--space-5xl) 0;
}
.card {
  padding: var(--space-3xl) var(--space-2xl);
}
.grid {
  gap: var(--space-xl);
}

/* ❌ Incorrect — hardcoded */
.section {
  padding: 5rem 0;
}
.card {
  padding: 2rem 1.5rem;
}
.grid {
  gap: 1.25rem;
}
```

## Breakpoints

Standardize to 4 named breakpoints. Current usage is inconsistent (5 different values):

| Token     | Value    | Usage                   | Replaces           |
| --------- | -------- | ----------------------- | ------------------ |
| `--bp-sm` | `480px`  | Mobile — single column  | `480px`, `500px`   |
| `--bp-md` | `768px`  | Tablet — 2-column grids | `700px`, `768px`   |
| `--bp-lg` | `1024px` | Laptop — full layout    | `900px`            |
| `--bp-xl` | `1280px` | Large screens           | `1200px`, `1201px` |

> **Note**: CSS custom properties cannot be used in `@media` queries directly.
> These tokens serve as documented reference values. Use the literal pixel value
> in media queries but always match one of these 4 breakpoints.

### Responsive Collapse Pattern

```
Desktop (>1024px):   3 columns, full padding
Tablet (481–1024px): 2 columns, reduced padding
Mobile (≤480px):     1 column, compact padding
```

## Shadows

Standardize to 4-level semantic scale:

| Token         | Value                                | Usage                      |
| ------------- | ------------------------------------ | -------------------------- |
| `--shadow-sm` | `0 2px 12px hsl(0 0% 0% / 4%)`       | Card resting state (light) |
| `--shadow-md` | `0 8px 24px hsl(0 0% 0% / 20%)`      | Button hover               |
| `--shadow-lg` | `0 12px 40px hsl(168 70% 30% / 15%)` | Card hover state           |
| `--shadow-xl` | `0 20px 60px hsl(0 0% 0% / 30%)`     | Terminal window (dark)     |

### Text Shadows

| Context         | Value                                                           |
| --------------- | --------------------------------------------------------------- |
| Section heading | `0 1px 3px hsl(0 0% 0% / 12%)`                                  |
| Card title      | `0 1px 2px hsl(168 70% 30% / 15%)`                              |
| Hero tagline    | `0 0 40px hsl(168 70% 45% / 35%), 0 2px 4px hsl(0 0% 0% / 40%)` |
| CTA heading     | `0 0 30px hsl(168 70% 60% / 30%), 0 2px 4px hsl(0 0% 0% / 30%)` |

## Border Radius

| Token           | Value      | Usage                           |
| --------------- | ---------- | ------------------------------- |
| `--radius-xs`   | `0.375rem` | Badges (GhRepoBadge)            |
| `--radius-sm`   | `0.5em`    | Images (ImageView)              |
| `--radius-md`   | `8px`      | Buttons                         |
| `--radius-lg`   | `12px`     | Terminal window                 |
| `--radius-xl`   | `16px`     | Cards                           |
| `--radius-full` | `50%`      | Dots, spinners, circular shapes |

## Transitions

| Token               | Duration | Easing | Usage                           |
| ------------------- | -------- | ------ | ------------------------------- |
| `--duration-fast`   | `150ms`  | `ease` | Badge hover, micro-interactions |
| `--duration-normal` | `200ms`  | `ease` | Button hover/press              |
| `--duration-slow`   | `300ms`  | `ease` | Card hover transform + shadow   |
| `--duration-slower` | `600ms`  | `ease` | Table row focus transition      |

### Usage Examples

```css
/* ✅ Cards — slow for smooth hover lift */
.card {
  transition:
    transform var(--duration-slow) ease,
    box-shadow var(--duration-slow) ease;
}

/* ✅ Buttons — normal for snappy feedback */
.button {
  transition:
    transform var(--duration-normal) ease,
    box-shadow var(--duration-normal) ease;
}

/* ❌ Inconsistent durations */
.card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
```

## Surfaces & Glass-morphism

The card design language uses glass-morphism (frosted glass effect):

```css
/* Canonical glass card surface */
.card {
  /* Dark mode */
  background: hsl(0 0% 100% / 4%);
  border: 1px solid hsl(0 0% 100% / 8%);
  backdrop-filter: blur(12px);
  border-radius: var(--radius-xl); /* 16px */

  /* Light mode override */
  [data-theme="light"] & {
    background: hsl(0 0% 100% / 70%);
    border-color: hsl(0 0% 0% / 6%);
    box-shadow: var(--shadow-sm);
  }
}
```

### CTA Gradient

```css
/* HomeInstallCta section background */
background: linear-gradient(135deg, hsl(168 70% 22%) 0%, hsl(168 55% 32%) 100%);
```

## Animations

| Name              | Duration | Easing            | Usage           | Reduced Motion      |
| ----------------- | -------- | ----------------- | --------------- | ------------------- |
| `jack-in-the-box` | `4s`     | (default)         | Hero logo entry | Disable entirely    |
| `spin`            | `1.875s` | `linear infinite` | Loading spinner | Reduce to `opacity` |

All animations must respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  .animated {
    animation: none;
    transition: none;
  }
}
```
