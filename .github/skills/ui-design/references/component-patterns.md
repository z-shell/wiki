# Component Patterns

Canonical UI patterns derived from the wiki's homepage components. When building new
components or reviewing existing ones, match these patterns for visual consistency.

## Section Container

Every homepage section follows this structure:

```tsx
// TSX pattern
<section className={styles.section}>
  <div className="container">
    <h2 className={styles.heading}>Section Title</h2>
    <p className={styles.subheading}>Optional subtitle</p>
    {/* Section content */}
  </div>
</section>
```

```css
/* CSS Module pattern */
.section {
  padding: 5rem 0; /* --space-5xl */
  text-align: center;
}

.heading {
  margin-bottom: 3rem; /* --space-4xl */
  font-size: 2.2rem; /* h1 scale */
  text-shadow: 0 1px 3px hsl(0 0% 0% / 12%);
  text-wrap: balance;
}

.subheading {
  max-width: 600px;
  margin: 0 auto 3rem; /* --space-4xl bottom */
  font-size: 1.05rem; /* subtitle scale */
  opacity: 0.85;
}

/* Responsive */
@media (max-width: 768px) {
  .section {
    padding: 3rem 0; /* --space-4xl */
  }
}
```

**Reference components**: HomeBanner, HomeWhyZi, HomeEcosystem, HomeCommunity,
HomeInstallCta, HomeShowcase — all use `5rem 0` → `3rem 0` responsive pattern.

## Card Grid

> ⚠️ **Duplication alert**: This pattern is repeated in HomeWhyZi, HomeEcosystem, and
> HomeCommunity with slight variations. New card grids should follow the canonical pattern
> below rather than copying from any single component.

### Structure

```tsx
<div className={styles.grid}>
  {items.map((item) => (
    <div key={item.id} className={styles.card}>
      <div className={styles.cardIcon}>{item.icon}</div>
      <h3 className={styles.cardTitle}>{item.title}</h3>
      <p className={styles.cardDescription}>{item.description}</p>
    </div>
  ))}
</div>
```

### Canonical CSS

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem; /* --space-xl */
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem;
}

.card {
  padding: 2rem 1.5rem; /* --space-3xl / --space-2xl */
  background: hsl(0 0% 100% / 4%);
  border: 1px solid hsl(0 0% 100% / 8%);
  border-radius: 16px; /* --radius-xl */
  backdrop-filter: blur(12px);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  text-align: center;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px hsl(168 70% 30% / 15%);
}

/* Light mode */
[data-theme="light"] .card {
  background: hsl(0 0% 100% / 70%);
  border-color: hsl(0 0% 0% / 6%);
  box-shadow: 0 2px 12px hsl(0 0% 0% / 4%);
}

/* Responsive collapse: 3 → 2 → 1 */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

### Current Inconsistencies

| Property    | HomeWhyZi  | HomeEcosystem | HomeCommunity |
| ----------- | ---------- | ------------- | ------------- |
| Grid gap    | `1.5rem`   | `1.25rem`     | `1.25rem`     |
| Card radius | `16px`     | `16px`        | `16px`        |
| Card hover  | identical  | identical     | identical     |
| 480px break | ❌ missing | ✅ present    | ✅ present    |

## Card Variants

### Icon Card (HomeCommunity)

```css
.cardIcon {
  margin-bottom: 1rem; /* --space-lg */
  font-size: 2.5rem;
}
```

### Emoji Card (HomeEcosystem)

```css
.cardEmoji {
  margin-bottom: 1rem; /* --space-lg */
  font-size: 2.5rem;
}
```

### Text Card (HomeWhyZi)

Same anatomy but icon is an emoji rendered at `2.5rem`. Structure is identical across
all three variants — only the icon rendering method differs.

### Card Title

Consistent across all variants:

```css
.cardTitle {
  margin-bottom: 0.75rem; /* --space-md */
  font-size: 1.25rem; /* card scale */
  font-weight: 600;
  text-shadow: 0 1px 2px hsl(168 70% 30% / 15%);
}
```

## Buttons

### Primary Button (Gradient)

```tsx
<a className={styles.primaryButton} href="/docs">
  Get Started
</a>
```

```css
.primaryButton {
  padding: 0.75rem 2rem; /* --space-md / --space-3xl */
  color: white;
  font-weight: 600;
  font-size: 1rem;
  background: white; /* Note: text color comes from parent gradient context */
  border: none;
  border-radius: 8px; /* --radius-md */
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.primaryButton:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px hsl(0 0% 0% / 20%);
}
```

### Secondary Button (Outline)

```css
.secondaryButton {
  padding: 0.75rem 2rem; /* --space-md / --space-3xl */
  color: white;
  font-weight: 600;
  font-size: 1rem;
  background: transparent;
  border: 2px solid hsl(0 0% 100% / 50%);
  border-radius: 8px; /* --radius-md */
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;
}
```

### Button Group

```css
.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem; /* --space-lg */
}
```

**Reference**: HomeInstallCta

## Terminal UI

Window chrome pattern with colored dots:

```tsx
<div className={styles.terminal}>
  <div className={styles.terminalHeader}>
    <span className={styles.dot} style={{background: "#ff5f56"}} />
    <span className={styles.dot} style={{background: "#ffbd2e"}} />
    <span className={styles.dot} style={{background: "#27c93f"}} />
  </div>
  <div className={styles.terminalBody}>
    <pre>
      <code>{content}</code>
    </pre>
  </div>
</div>
```

```css
.terminal {
  border: 1px solid hsl(0 0% 100% / 10%);
  border-radius: 12px; /* --radius-lg */
  overflow: hidden;
  box-shadow: 0 20px 60px hsl(0 0% 0% / 30%); /* --shadow-xl */
}

[data-theme="light"] .terminal {
  border-color: hsl(0 0% 0% / 10%);
  box-shadow: 0 20px 60px hsl(0 0% 0% / 8%);
}

.terminalHeader {
  display: flex;
  gap: 6px;
  padding: 12px 16px;
  background: hsl(220 13% 14%);
}

[data-theme="light"] .terminalHeader {
  background: hsl(220 10% 92%);
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%; /* --radius-full */
}
```

**Reference**: HomeShowcase

## CTA Section

Gradient background section with centered content:

```css
.section {
  padding: 5rem 0; /* --space-5xl */
  text-align: center;
  background: linear-gradient(135deg, hsl(168 70% 22%) 0%, hsl(168 55% 32%) 100%);
  color: white;
}

.heading {
  margin-bottom: 1.5rem; /* --space-2xl */
  font-size: 2.2rem;
  text-shadow:
    0 0 30px hsl(168 70% 60% / 30%),
    0 2px 4px hsl(0 0% 0% / 30%);
}

.description {
  max-width: 600px;
  margin: 0 auto 2rem; /* --space-3xl bottom */
  font-size: 1.1rem;
  opacity: 0.9;
}
```

**Reference**: HomeInstallCta

## Interactive States

### Hover (Cards)

```css
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px hsl(168 70% 30% / 15%); /* --shadow-lg */
}
```

### Hover (Buttons)

```css
.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px hsl(0 0% 0% / 20%); /* --shadow-md */
}
```

### Focus-Visible

Always provide visible focus indicators for keyboard users:

```css
.interactive:focus-visible {
  outline: 2px solid var(--ifm-color-primary);
  outline-offset: 2px;
}
```

### Table Row Focus

```css
/* Reference: APITable / custom.css */
tbody tr:focus,
tbody tr:hover {
  box-shadow: 0 0 8px 0 inset var(--ifm-color-primary);
  cursor: pointer;
  transition: box-shadow 0.6s;
}
```

## Responsive Patterns

### Standard Breakpoint Behavior

| Breakpoint | Columns | Section Padding | Font Scaling     |
| ---------- | ------- | --------------- | ---------------- |
| > 1024px   | 3       | `5rem 0`        | Full size        |
| 481–1024px | 2       | `3rem 0`        | Headings reduced |
| ≤ 480px    | 1       | `3rem 0`        | Further reduced  |

### Font Size Responsive Scaling (Hero)

```css
/* Default */
font-size: 2.8rem;
/* ≤ 700px */
font-size: 2rem;
/* ≤ 500px */
font-size: 1.8rem;
```

## Image Patterns

### Optimized Images

Use `@theme/IdealImage` for images that benefit from srcset and lazy loading:

```tsx
import Image from "@theme/IdealImage";

<Image img={require("/img/example.png")} />;
```

### Lazy-Loaded Images with Spinner

Use the `ImgShow` component for images with a loading spinner:

```tsx
import ImgShow from "@site/src/components/ImgShow";

<ImgShow img="/img/example.png" alt="Description" />;
```

### Themed Images (Light/Dark Variants)

```tsx
import ThemedImage from "@theme/ThemedImage";

<ThemedImage
  alt="Description"
  sources={{
    light: "/img/example-light.png",
    dark: "/img/example-dark.png",
  }}
/>;
```

### Image Styling

```css
/* Standard image rounding */
.ImageView {
  border-radius: 0.5em; /* --radius-sm */
}
```
