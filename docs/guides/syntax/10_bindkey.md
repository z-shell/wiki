---
id: bindkey
title: 🗒 Bindkeys Map
image: zw/logo/320x320.png
description: The Bindmap & Bindkey ZI syntax
keywords: [syntax, how-to-use]
---

## The `bindmap'…'` keybindings

Sometimes plugins call [bindkey][1] to assign keyboard shortcuts. This can cause problems because multiple plugins can
bind the same keys.

Also, the user might want a different binding(s), which will require complicated, additional `bindkey` commands in
`.zshrc`.

ZI provides a solution to this problem – the ability to remap the bindkeys with a short [ice-modifier][2] specification
with the `bindmap'…'` [ice][3].

### Examples for `bindmap'…'`

Map Ctrl-G instead of Ctrl-R for the history searcher.

```shell
zi bindmap'^R -> ^G' for z-shell/history-search-multi-word
```

Map Ctrl-Shift-Left and …-Right used by URxvt instead of the Xterms' ones. Load with the bindkey-tracking ↔ with
light-loading for anything else.

Could also separate the bindmaps with a semicolon, i.e.:

```shell
bindmap'"\\e[1\;6D" -> \\e[1\;5D ; "\\e[1\;6C" -> ^[[1\;5C' \
```

```shell
zi wait light-mode trackbinds bindmap'"\\e[1\;6D" -> \\e[1\;5D"' \
  bindmap'"\\e[1\;6C" -> ^[[1\;5C' pick'dircycle.zsh' for \
  michaelxmcbride/zsh-dircycle
```

Map space to regular space and Ctrl-Space to the `globalias' widget, which expands the alias entered on the left,
provided by OMZ globalias plugin.

```shell
zi bindmap='!" " -> magic-space; !"^ " -> globalias' nocompletions \
  depth=1 pick=plugins/globalias/globalias.plugin.zsh for \
  ohmyzsh/ohmyzsh
```

### Explanation

The `bindmap'…'` ice has two modes of operation: normal and exclamation-mark (`bindmap'!…'`).

In the first mode, the remapping is being done from-key to-key, i.e.: `bindmap'fromkey -> to-key'`.

The given key is being changed to the second given key in the `bindkey` command that's being issued when loading the
plugin.

In the second mode, the remapping is being done from-key to-widget, e.g: `bindmap'!from-key -> to-widget'`.

In this mode, the given key is being mapped to the given widget instead of the widget specified in the `bindkey` command
e.g.:

Instead of:

```shell
bindkey "^ " magic-space
bindkey " " globalias
```

The actual call that'll be done will be:

```shell
bindkey "^ " globalias
bindkey " " magic-space
```

For the `bindmap='!" " -> magic-space; !"^ " -> globalias'` ice.

### Using `bindmap'…'` in light mode

When the investigation mode is on i.e.:

- when the full loading mode is being used, default in the `for` syntax and when `zi load …` is used, then the
  `bindmap'…'` ice works normally.

In the non-investigation:

- the [light mode][4] – activated when `zi light …` or the `light-mode` ice is being used – the `bindmap'…'` is
  unavailable, unless the `trackbinds` ice is specified:

```shell
# With use of the light-mode ice and the for-syntax:
zi light-mode trackbinds bindmap'^R -> ^G' for z-shell/history-search-multi-word

# With use of the classic syntax:
zi trackbinds bindmap'^R -> ^G' for z-shell/history-search-multi-word
zi light z-shell/history-search-multi-word
```

### Using the <kbd>UPAR</kbd> shorthands

There are four special values that can be used on the left side of the bind-map: <kbd>UPAR</kbd>, <kbd>DOWNAR</kbd>,
<kbd>LEFTAR</kbd>, <kbd>RIGHTAR</kbd>. They'll match up arrow, down arrow, etc. So that it's possible to do:

```shell
zi bindmap='LEFTAR -> ^F; RIGHTAR -> ^G' …
```

The benefits of using the <kbd>UPAR</kbd>, … shorthands is that they cover multiple possible cursor-key codes for each
of the cursor key, so that they'll work regardless of the terminal being used.

[1]: /search/?q=binkey
[2]: /search/?q=ice+modifier
[3]: /docs/guides/syntax/ice
[4]: /search/?q=light+mode
