---
description: "Docusaurus client API reference — components, hooks, and theme imports. Use when adding or editing TSX components or MDX documentation pages to ensure native Docusaurus patterns are followed."
applyTo: "src/**/*.{ts,tsx},{docs,community,ecosystem}/**/*.mdx"
---

# Docusaurus Client API

Use native Docusaurus components and hooks instead of raw HTML equivalents.
Full reference: <https://docusaurus.io/docs/docusaurus-core>

## Components

### `<Link>` — `@docusaurus/Link`

Client-side navigation with prefetching. Works for internal routes and external URLs.

```tsx
import Link from "@docusaurus/Link";
<Link to="/docs/getting_started/installation">Install</Link>;
```

- **Always use `to` prop**, never `href`.
- Never use raw `<a>` for internal links — it causes full page reloads.
- Never nest `<Link>` inside markdown headings — headings already wrap content in `<a>` for TOC anchors, creating invalid nested `<a>` tags. Use `[text](url)` markdown syntax instead.

### `<Translate>` / `translate()` — `@docusaurus/Translate`

Wrap user-visible strings for i18n via Crowdin.

```tsx
import Translate, {translate} from "@docusaurus/Translate";

// JSX content
<Translate id="home.tagline" description="Site tagline">
  Fast Zsh framework
</Translate>

// Attributes (title, placeholder, aria-label)
<img alt={translate({id: "logo.alt", message: "Logo"})} />
```

### `<Head>` — `@docusaurus/Head`

Add custom `<meta>`, `<link>`, or `<title>` tags to the document head.

```tsx
import Head from "@docusaurus/Head";
<Head>
  <meta property="og:description" content="Custom description" />
</Head>;
```

### `<BrowserOnly>` — `@docusaurus/BrowserOnly`

Render components that depend on browser APIs. Prevents SSR failures.

```tsx
import BrowserOnly from "@docusaurus/BrowserOnly";
<BrowserOnly fallback={<div>Loading...</div>}>{() => <span>Window width: {window.innerWidth}</span>}</BrowserOnly>;
```

### `<Interpolate>` / `interpolate()` — `@docusaurus/Interpolate`

Dynamic placeholders in translatable text.

```tsx
import Interpolate from "@docusaurus/Interpolate";
<Interpolate values={{name: "Z-Shell"}}>{"Welcome to {name}"}</Interpolate>;
```

### `<ErrorBoundary>` — `@docusaurus/ErrorBoundary`

Catch rendering errors in a subtree to prevent full-page crashes.

```tsx
import ErrorBoundary from "@docusaurus/ErrorBoundary";
<ErrorBoundary fallback={({error}) => <p>Error: {error.message}</p>}>
  <RiskyComponent />
</ErrorBoundary>;
```

## Hooks

| Hook                   | Import                             | Purpose                                      |
| ---------------------- | ---------------------------------- | -------------------------------------------- |
| `useDocusaurusContext` | `@docusaurus/useDocusaurusContext` | Access `siteConfig`, `i18n`, global metadata |
| `useBaseUrl`           | `@docusaurus/useBaseUrl`           | Prepend `baseUrl` to asset paths             |
| `useIsBrowser`         | `@docusaurus/useIsBrowser`         | SSR-safe browser detection                   |
| `useGlobalData`        | `@docusaurus/useGlobalData`        | Read plugin-provided global data             |
| `usePluginData`        | `@docusaurus/usePluginData`        | Read data from a specific plugin             |
| `useBrokenLinks`       | `@docusaurus/useBrokenLinks`       | For custom Link/Heading implementations only |

## Theme Components

Import from `@theme/*`. Prefer these over raw HTML equivalents.

| Component          | Import                          | When to use                                                                            |
| ------------------ | ------------------------------- | -------------------------------------------------------------------------------------- |
| `Tabs` + `TabItem` | `@theme/Tabs`, `@theme/TabItem` | Tabbed content in MDX and TSX                                                          |
| `IdealImage`       | `@theme/IdealImage`             | **Default for all PNG/JPG images** — responsive, lazy-loaded, low-quality placeholders |
| `ThemedImage`      | `@theme/ThemedImage`            | Light/dark image variants                                                              |
| `CodeBlock`        | `@theme/CodeBlock`              | Syntax-highlighted code in JSX (MDX uses fenced blocks instead)                        |
| `Layout`           | `@theme/Layout`                 | Full page layout wrapper for custom pages                                              |
| `Heading`          | `@theme/Heading`                | Semantic headings with auto-generated anchors                                          |

### `@theme/IdealImage` — Image Best Practices

The `ideal-image` plugin generates responsive variants (630–1030px), lazy-loads with LQIP placeholders, and is the **required** way to display PNG/JPG images in this project.

**In MDX pages** — import and use directly:

```tsx
import Image from "@theme/IdealImage";

// Static asset from static/ (site-root path string)
<Image img="/img/png/theme/z/320x320.png" alt="Z-Shell logo" />

// Co-located asset via require (enables build-time resizing)
<Image img={require("./screenshot.png")} alt="Feature screenshot" />
```

**In TSX components** — use the `ImgShow` wrapper (`src/components/ImgShow/`), which adds centered layout styling:

```tsx
import ImgShow from "@site/src/components/ImgShow";

<ImgShow img="/img/example.png" alt="Example" />;
```

`ImgShow` accepts all `@theme/IdealImage` props (it re-exports the same type). It adds a `styles.image` class for centered block layout and consistent `border-radius`.

**When to use what:**

| Scenario                  | Use                                    | Why                                 |
| ------------------------- | -------------------------------------- | ----------------------------------- |
| PNG/JPG in docs pages     | `<Image>` from `@theme/IdealImage`     | Responsive, lazy, LQIP              |
| PNG/JPG in TSX components | `<ImgShow>` wrapper                    | Adds Suspense boundary + spinner    |
| SVG images                | `<img>` with `useBaseUrl()`            | IdealImage only supports PNG/JPG    |
| Tiny icons (≤80px)        | `<img>` with explicit `width`/`height` | No benefit from responsive resizing |
| Light/dark variants       | `<ThemedImage>`                        | Switches `src` per color mode       |

**Plugin configuration** (in `docusaurus.config.ts`):

- `quality: 70` — JPEG compression quality
- `min: 630, max: 1030` — responsive size range
- `disableInDev: false` — preview behavior locally

**Anti-patterns:**

| ❌ Don't                          | ✅ Do                                       | Why                                        |
| --------------------------------- | ------------------------------------------- | ------------------------------------------ |
| `<img src="/img/screenshot.png">` | `<Image img="/img/screenshot.png" />`       | Misses lazy loading and responsive sizing  |
| `![alt](/img/photo.png)` in MDX   | `<Image img="/img/photo.png" alt="..." />`  | Markdown images bypass the plugin entirely |
| `<Image>` for SVGs                | `<img src={useBaseUrl("/img/icon.svg")} />` | Plugin only handles PNG/JPG                |
| Missing `alt` on `<Image>`        | Always provide descriptive `alt` text       | Accessibility requirement                  |

## Globally Available MDX Components

Registered in `src/theme/MDXComponents.tsx` — no import needed in `.mdx` files:

- `<Highlight color="var(--ifm-color-primary)">text</Highlight>` — colored text spans
- `<Emoji symbol="🔥" label="fire" />` — accessible emoji
- `<GhRepoBadge user="z-shell" repo="zi" />` — GitHub repository badges
- `<ShellCodeCopy>command</ShellCodeCopy>` — copyable shell command blocks

## Anti-patterns

| ❌ Don't                           | ✅ Do                                         | Why                                                      |
| ---------------------------------- | --------------------------------------------- | -------------------------------------------------------- |
| `<a href="/docs/...">`             | `<Link to="/docs/...">`                       | Raw `<a>` causes full page reload                        |
| `<Link href="...">`                | `<Link to="...">`                             | `href` is not a valid `Link` prop                        |
| `<Link>` inside headings           | `[text](url)` markdown                        | Headings already wrap in `<a>` — nesting is invalid HTML |
| `typeof window !== 'undefined'`    | `useIsBrowser()` or `<BrowserOnly>`           | Cleaner SSR handling                                     |
| Hardcoded `/wiki/img/...` paths    | `useBaseUrl('/img/...')`                      | Adapts to `baseUrl` config changes                       |
| `<img>` for PNG/JPG content images | `<Image img="..." />` via `@theme/IdealImage` | Lazy loading, responsive sizing, LQIP                    |
| `![alt](path.png)` markdown images | `<Image img="..." alt="..." />`               | Markdown images bypass the IdealImage plugin             |
| Bare strings on homepage           | `<Translate>` or `translate()`                | Required for Crowdin localization                        |
