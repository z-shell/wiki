---
id: eval
title: 🌀 Eval
image: img/logo/320x320.png
description: Annex - Eval documentation.
keywords:
  - zannex
  - annex
  - eval
  - zsh
---

<!-- @format -->

## <i class="fa-brands fa-github"></i> [z-shell/z-a-eval][]

The output of a slow initialization command is redirected to a file located within the plugin/snippets directory and sourced while loading. The next time the plugin/snippet is loaded, this file will be sourced skipping the need to run the initialization command.

The ice-modifier `eval''` provided and handled by this annex creates a `cache` in the plugin/snippets root directory which stores the commands output.

This cache is regenerated when:

- The plugin/snippet is updated.
- The cache file is removed.
- With the new ZI subcommand `recache`.

> The optional preceding `!` flag means to store command output regardless of exit code. Otherwise `eval''` will avoid caching ouput of code which returns a non-zero exit code.

## Synopsis

```shell
zi recache <plugin/snippet>
```

In order to enable tab completion for the new subcommand set the value `Z_A_USECOMP=1` somewhere **before** loading this plugin.

```shell
zi atinit'Z_A_USECOMP=1' light-mode for z-shell/z-a-eval
```

## Example Invocations

### Without z-a-eval

```shell
zi ice as"command" from"gh-r" mv"zoxide* -> zoxide"  \
  atclone"./zoxide init zsh > init.zsh"  atpull"%atclone" src"init.zsh" nocompile'!'
zi light ajeetdsouza/zoxide
```

```shell
zi ice atclone"dircolors -b LS_COLORS > init.zsh" \
  atpull"%atclone" pick"init.zsh" nocompile'!' \
  atload'zstyle ":completion:*" list-colors “${(s.:.)LS_COLORS}”'
zi light trapd00r/LS_COLORS
```

### With z-a-eval

```shell
zi ice as"command" from"gh-r" mv"zoxide* -> zoxide" \
  eval"./zoxide init zsh"
zi light ajeetdsouza/zoxide
```

```shell
zi ice eval"dircolors -b LS_COLORS" \
  atload'zstyle ":completion:*" list-colors “${(s.:.)LS_COLORS}”'
zi light trapd00r/LS_COLORS
```

## Without ZI

```shell
if [[ "${+commands[kubectl]}" == 1 ]]; then
  eval $(kubectl completion zsh)
fi
```

## With ZI and z-a-eval

```shell
## Updated during `zi update`
zi ice id-as"kubectl_completion" has"kubectl" \
  eval"kubectl completion zsh" run-atpull
zi light z-shell/null
```

[z-shell/z-a-eval]: https://github.com/z-shell/z-a-eval
