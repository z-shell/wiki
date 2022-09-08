---
id: bindkey
title: "🗒 Carte de Bindkeys"
sidebar_position: 5
image: /img/logo/320x320.png
description: Usage bindmap & bindkey.
keywords:
  - syntax
  - bindkey
  - bindmap
  - how-to-use
---

<!-- @format -->

## <i class="fa-solid fa-keyboard"></i> Bindkey

Les mappages de clés `bindkey` peuvent être très confus à déchiffrer. Il peut utiliser plusieurs notations différentes, mais il est judicieux d'utiliser la même notation de clé dans toute votre configuration. You can print all of your current key bindings in the current keymap with `bindkey`. To print the full `bindkey` command to add to your `.zshrc` file use `bindkey -L`.

In general, you'll bind a widget so a key sequence or a key with a modifier. This can be declared in [caret notation][5] using `^`, using [escape sequences][6] using `\`, in octal (`\NNN`), hex (`\xNN`), or Unicode (`\uNNNN`). None of these are particularly great for people to read. This is also tricky because it depends on your keyboard, operating system, and shell.

Here are some basics:

- `\e`, `\E`, = Échap
- `^[` = touche Alt (sur certains claviers, c'est la même chose que Echap)
- `^ ?` = Supprimer
- `^X`, `^` = Contrôle

The keys that come after the modifier can add more confusion.

## <i class="fa-solid fa-delete-left"></i> Supprimer la liaison

To delete a key binding you can use `bindkey -d $KEYS`. Make sure you don't delete the characters you need for typing.

## <i class="fa-solid fa-sliders"></i> Les raccourcis clavier `bindmap'…'` {#bindmap}

Sometimes plugins call [bindkey][1] to assign keyboard shortcuts. This can cause problems because multiple plugins can bind the same keys.

Also, the user might want a different binding(s), which will require complicated, additional `bindkey` commands in `.zshrc`.

Zi provides a solution to this problem – the ability to remap the bindkeys with a short [ice-modifier][2] specification with the `bindmap'…'` [ice][3].

### <i class="fa-solid fa-circle-check"></i> Exemples pour `bindmap'…'`

Map <kbd>Ctrl-G</kbd> instead of <kbd>Ctrl-R</kbd> for the history searcher.

```shell
zi bindmap'^R -> ^G' for z-shell/history-search-multi-word
```

Map <kbd>Ctrl-Shift-Left</kbd> and <kbd>Ctrl-Shift-Right</kbd> used by URxvt instead of the Xterms' ones. Load with the bindkey-tracking ↔ with light-loading for anything else.

Could also separate the bindmaps with a semicolon, i.e.:

```shell
bindmap'"\\e[1\;6D" -> \\e[1\;5D ; "\\e[1\;6C" -> ^[[1\;5C' \
```

```shell showLineNumbers
zi wait light-mode trackbinds bindmap'"\\e[1\;6D" -> \\e[1\;5D"' \
  bindmap'"\\e[1\;6C" -> ^[[1\;5C' pick'dircycle.zsh' for \
  michaelxmcbride/zsh-dircycle
```

Map space to regular space and <kbd>Ctrl-Space</kbd> to the `globalias` widget, which expands the alias entered on the left, provided by OMZ globalias plugin.

```shell showLineNumbers
zi bindmap='!" " -> magic-space; !"^ " -> globalias' nocompletions \
  depth=1 pick=plugins/globalias/globalias.plugin.zsh for \
  ohmyzsh/ohmyzsh
```

### <i class="fa-solid fa-circle-check"></i> Explications

The `bindmap'…'` ice has two modes of operation: normal and exclamation-mark (`bindmap'!…'`). In the first mode, the remapping is being done from-key to-key, i.e.: `bindmap'fromkey -> to-key'`.

The given key is changed to the second given key in the `bindkey` command while loading the plugin. In the second mode, the remapping is being done from-key to-widget, e.g: `bindmap'!from-key -> to-widget'`.

In this mode, the given key is being mapped to the given widget instead of the widget specified in the `bindkey` command e.g.:

Au lieu de:

```shell showLineNumbers
bindkey "^ " magic-space
bindkey " " globalias
```

The actual call that'll be done will be:

```shell showLineNumbers
bindkey "^ " globalias
bindkey " " magic-space
```

For the `bindmap='!" " -> magic-space; !"^ " -> globalias'` ice.

### <i class="fa-solid fa-circle-check"></i> Utilisation de la bindmap `'…'` en mode léger {#trackbinds}

When the investigation mode is on i.e.:

- lorsque le mode de chargement complet est utilisé, par défaut dans la syntaxe `for`, et lorsque `zi load …` est utilisé, alors la glace `bindmap'…'` fonctionne normalement.

In the non-investigation:

- le [light mode](/search/?q=light+mode) - activé lorsque `zi light …` ou le `light-mode` est utilisé-le `bindmap'…'` n'est pas disponible, sauf si la la glace `trackbinds` est spécifié:

With the use of the light-mode ice and the for-syntax:

```shell showLineNumbers
zi light-mode for trackbinds bindmap'^R -> ^G' \
  z-shell/history-search-multi-word
```

With the use of the traditional syntax:

```shell showLineNumbers
zi ice trackbinds bindmap'^R -> ^G'
zi light z-shell/history-search-multi-word
```

### <i class="fa-solid fa-circle-check"></i> Utilisation des raccourcis de <kbd>UPAR</kbd>

There are four special values that can be used on the left side of the bind-map: <kbd>UPAR</kbd>, <kbd>DOWNAR</kbd>, <kbd>LEFTAR</kbd>, <kbd>RIGHTAR</kbd>. They'll match up arrow, down arrow, etc. So that it's possible to do:

```shell
zi bindmap='LEFTAR -> ^F; RIGHTAR -> ^G' …
```

The benefit of using the <kbd>UPAR</kbd>, … shorthands is that they cover multiple possible cursor-key codes for each of the cursor keys so that they'll work regardless of the terminal is used.

<!-- end-of-file -->
<!-- links -->

[1]: /search/?q=bindkey
[2]: /search/?q=ice+modifier
[3]: /docs/guides/syntax/ice
[5]: https://en.wikipedia.org/wiki/Caret_notation
[6]: https://en.wikipedia.org/wiki/Escape_sequence
