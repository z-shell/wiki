---
description: "HTML element patterns supported in MDX content. Use when adding keyboard sequences, collapsible sections, definition lists, subscript/superscript, inline quotes, or change annotations to docs pages."
applyTo: "{docs,community,ecosystem}/**/*.mdx"
---

# GFM HTML Element Patterns

MDX supports raw HTML. The elements below are safe to use in `.mdx` files and are rendered by Docusaurus without stripping.

## Keyboard Input — `<kbd>`

Use `<kbd>` for any user input: keystrokes, commands, button labels, or menu items.

- Single key: `<kbd>Enter</kbd>`
- Key combination: `<kbd><kbd>Ctrl</kbd>+<kbd>C</kbd></kbd>` — each key gets its own `<kbd>`; the `+` separator stays outside
- Menu navigation: `<kbd><kbd><samp>File</samp></kbd>⇒<kbd><samp>New</samp></kbd></kbd>` — wrap UI labels in `<samp>` inside the leaf `<kbd>`

## Program Output — `<samp>`

Use `<samp>` for sample output from a command or program.

- Inline output: `<samp>Permission denied</samp>`
- Terminal session block: wrap a `<pre>` in `<samp>`, then wrap user-entered parts inside `<kbd>`:

```html
<pre><samp>$ <kbd>git status</kbd>
On branch main</samp></pre>
```

## Collapsible Sections — `<details>` / `<summary>`

Use `<details>` + `<summary>` for content the reader can expand on demand (long outputs, optional context, verbose examples).

```html
<details>
  <summary>Expand for full output</summary>
  <p>…content…</p>
</details>
```

Add `open` attribute to `<details>` to render expanded by default.

## Subscript and Superscript

- Subscript: `<sub>2</sub>` — e.g. H<sub>2</sub>O
- Superscript: `<sup>2</sup>` — e.g. x<sup>2</sup>

Use `<sup>` with an anchor `<a>` for manual footnote references when native MDX footnote syntax (`[^1]`) is insufficient.

## Change Annotations

- Inserted text: `<ins>added text</ins>`
- Deleted text: `<del>removed text</del>`

Both accept a `cite` attribute for attribution.

## Inline Quotes — `<q>`

Use `<q>` for short inline quotations: `<q>inline quote</q>`. Accepts a `cite` attribute. For longer quotes, use the Markdown `>` blockquote syntax instead.

## Variable Names — `<var>`

Use `<var>myVariable</var>` when referring to a placeholder or variable name in prose. Prefer backtick code spans for actual code identifiers.

## Definition Lists

Use `<dl>`, `<dt>`, `<dd>` for term–definition pairs when a table would be overkill:

```html
<dl>
  <dt>Term</dt>
  <dd>Definition</dd>
</dl>
```

## Emoji

Use the globally available `<Emoji symbol="🔥" label="fire" />` component — do not use `:shortcode:` syntax, which is not supported by the Docusaurus MDX renderer.

## HTML Entities

Escape `&` as `&amp;` and `<` as `&lt;` when they appear as literal characters in prose. Named entities (`&copy;`, `&rarr;`, `&para;`) work directly. Prefer Unicode characters or the `<Emoji>` component over named entities for symbols.

## Anti-patterns

| ❌ Don't | ✅ Do | Why |
| --- | --- | --- |
| `Ctrl+C` (plain text) | `<kbd><kbd>Ctrl</kbd>+<kbd>C</kbd></kbd>` | Semantic keyboard input, styled by theme |
| `<kbd>Ctrl+C</kbd>` (single kbd) | Nest each key in its own `<kbd>` | Correct multi-key pattern |
| `:fire:` emoji shortcode | `<Emoji symbol="🔥" label="fire" />` | Shortcodes not processed by MDX renderer |
| `![alt](path.png)` for content images | `<Image img="..." alt="..." />` via `@theme/IdealImage` | Bypasses the image optimisation plugin |
| `<a href="...">` for internal links | `<Link to="...">` from `@docusaurus/Link` | Prevents full page reloads |
