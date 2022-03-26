---
id: common
title: 🔀 Common Syntax
sidebar_position: 1
image: zw/logo/320x320.png
description: The Fundamental ZI syntax
keywords: [syntax, how-to-use]
---

import APITable from '@site/src/components/APITable';

:::tip

It is recommended to familiarize with [getting_started/oveview][9] before this.

:::

## Standart syntax

```shell
zi …
zi ice …
zi load …
zi light …
zi unload …
zi snippet …
```

The normal way of specifying ices and their values:

```shell
zi wait"1" from"gh-r" atload"print Hello World"
zi load …
```

:::note

There's no `ice` subcommand - that is currently being fully allowed.

:::

## The alternative syntaxes

However, ZI supports also other syntaxes: the equal (`=`) syntax:

```shell
zi wait=1 from=gh-r atload="print Hello World"
zi load …
```

The colon (`:`) syntax:

```shell
zi wait:1 from:gh-r atload:"print Hello World"
zi load …
```

And also – in conjunction with all of the above – the GNU syntax:

```shell
zi --wait=1 --from=gh-r --atload="print Hello World"
zi load …
```

### Summary

It's up to the user which syntax to choose.

The original motivation behind the standard syntax was: to utilize the syntax highlighting of editors like Vim – and
have the strings following ice names colorized with a distinct color and this way separated from them. However, with the
[zi/zi-vim-syntax][11] syntax definition this motivation can be superseded with the ZI-specific highlighting, at least
for Vim.

### The make syntax

```shell
zi ice as"program" pick"$ZPFX/bin/git-*" make"PREFIX=$ZPFX"
zi light tj/git-extras
```

The `Makefile` of the project above has only 2 tasks:

1. Install the target.
2. Build scripts that are required for installation.

The `Makefile` with 2 tasks, can use:

1. `make"all install PREFIX=…"`,
2. `pick'…'` will `chmod +x` all matching files and add `$ZPFX/bin/` to `$PATH`.

:::info

[$ZPFX][8] is provided by ZI, it is set to `~/.zi/polaris` by default.

However, it can be changed by specifying the custom `$ZPFX=` target if required.

:::

### Compiling programs

```shell
zi ice as"program" atclone"rm -f src/auto/config.cache; ./configure" \
  atpull"%atclone" make pick"src/vim"
zi light vim/vim
```

<APITable>

| Syntax             | Description                                                                               |
| ------------------ | :---------------------------------------------------------------------------------------- |
| `as'program'`      | Add file selected by `pick'…'` to `$PATH`, and do not source it.                          |
| `atclone'…'`       | Execute code after downloading.                                                           |
| `atpull'%atclone'` | Execute the same code `atclone'…'` is given, but after successful update.                 |
| `make`             | Run `make` after `atclone'…'` and `atpull'…'` (note: `make'!'` will execute before them). |
| `pick'src/vim'`    | Set executable flag on `src/vim`, hint that `src/` should be added to `$PATH`.            |

</APITable>

The same but with **installation** (`make install`) under [$ZPFX][8] by default:

```shell
zi ice as'program' atclone'rm -f src/auto/config.cache; \
  ./configure --prefix=$ZPFX' atpull'%atclone' make'all install' pick'$ZPFX/bin/vim'
zi light vim/vim
```

| Syntax             | Description                                                                                  |
| ------------------ | :------------------------------------------------------------------------------------------- |
| `as'program'`      | As above.                                                                                    |
| `atclone'…'`       | As above **plus** pass `--prefix=$ZPFX` to `./configure`, to set the installation directory. |
| `atpull'%atclone'` | As above.                                                                                    |
| `make`             | As above, but also run the `install` target.                                                 |
| `pick'src/vim'`    | as above, but for different path `$ZPFX/bin/vim`.                                            |

### LS_COLORS

A repository [trapd00r/LS_COLORS][1] provides a file with color definitions for GNU `ls` command, and also for
[ogham/exa][2].

Typically one does `eval $( dircolors -b $HOME/LS_COLORS)` to process this file and set the environment for `ls`. This
means `dircolors` is run every shell startup.

This costs much time because a fork has to be done and the program, i.e. `dircolors`, binary needs to be loaded and
executed, and because `dircolors` loads the colors' definitions and processes them. Following ZI invocation solves this
problem:

```shell
zi ice atclone'dircolors -b LS_COLORS > clrs.zsh' \
  atpull'%atclone' pick"clrs.zsh" nocompile'!' \
  atload'zstyle ":completion:*" list-colors “${(s.:.)LS_COLORS}”'
zi light trapd00r/LS_COLORS
```

<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->


<APITable>

| Syntax             | Description                                                                                                 |
|--------------------|:------------------------------------------------------------------------------------------------------------|
| `atclone'…'`       | Generate shell script, but instead of passing it to `eval`. More below: (1)                                 |
| `atpull'%atclone'` | Do the same at any update of the plugin. More below: (2)                                                    |
| `pick"clrs.zsh"`   | Source the previously generated file `clrs zsh`.                                                            |
| `nocompile'!'`     | Invokes compilation **after** the `atclone'…'` [ice-modifier][3] and the [exclamation mark][4] causes this. |
| `atload'…'`        | Additionally sets up the Zsh completion to use the colors provided by the trapd00r package.                 |


<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

</APITable>

- (1) Save it to file. The `atclone'…'` is being ran on the **installation** while the `atpull'…'` hook is being run on
  an **update** of the [**trapd00r/LS_COLORS**][1] plugin.
- (2) The `%atclone` is just a special string that denotes the `atclone'…'` hook and is copied onto the `atpull'…'`
  hook.

This way, except for the plugin installation and update, `dircolors` isn't ran, just normal sourcing is done.

The everyday sourced file, i.e. `clrs.zsh`, is being compiled to speed up the loading.

### Direnv

The project [**direnv/direnv**][5] registers itself in Z shell to modify the environment on directory change. This
registration is most often done by `eval "$(direnv hook zsh)"` added to `.zshrc`.

```shell
zi ice as"program" make'!' atclone'./direnv hook zsh > zhook.zsh' \
  atpull'%atclone' src"zhook.zsh"
zi light direnv/direnv
```

- `make'!'` – execute `make` before `atclone'…'` and before `atpull'…'` (see `make` above),
- `src'zhook.zsh'` – source file `zhook.zsh`.

In general, direnv works by hooking up to Zsh.

The code that does this is provided by program `direnv` (built by `make'…'`).

Above `atclone'…'` puts this code into file `zhook.zsh`, `src''` sources it.

This way `direnv hook zsh` is executed only on clone and update, and Zsh starts faster.

#### Glance at the 'for' syntax

The drawback of this standard procedure is that the `direnv` binary is run on every shell startup and significantly
slows it down. ZI allows to solve this in the following way:

```shell
zi as"program" make'!' atclone'./direnv hook zsh > zhook.zsh' \
  atpull'%atclone' pick"direnv" src"zhook.zsh" for \
    direnv/direnv
```

<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<APITable>

| Syntax             | Description                                                                                                          |
|--------------------|:---------------------------------------------------------------------------------------------------------------------|
| `make'!'`          | Compile `direnv`, the exclamation mark means: run the `make` first, before `atclone'…'` and `atpull'…'` hooks.       |
| `atclone'…'`       | As soon as plugin installed generate the registration code and save it to `zhook.zsh`, instead of passing to `eval`. |
| `atpull'%atclone'` | The `atclone'…'` runs on **installation** while `atpull'…'` runs on **update** of the plugin.                        |
| `src'zhook.zsh'`   | Load generated registration code                                                                                     |
| `pick'direnv'`     | Ensure `+x` permission on the binary                                                                                 |
| `as'program'`      | The plugin is a program, there's no main file to the source.                                                         |

</APITable>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

This way registration code is generated once every installation and update, to then be simply sourced without running
`direnv`.

The project is also available as a binary [Github releases][6]. This distribution can be installed by:

```shell
zi from"gh-r" as"program" mv"direnv* -> direnv" \
  atclone'./direnv hook zsh > zhook.zsh' atpull'%atclone' \
  pick"direnv" src="zhook.zsh" for \
    direnv/direnv
```

<APITable>

| Syntax                    | Description                                                                |
| ------------------------- | :------------------------------------------------------------------------- |
| `from'gh-r'`              | Install from `direnv` from [GitHub releases][6].                           |
| `mv'direnv* -> direnv'`   | After installation, rename `direnv.linux-386` or similar file to `direnv`. |
| `atclone'…'`, `atpull'…'` | As in previous example                                                     |
| `pick'direnv'`            | As in previous example.                                                    |
| `as'program'`             | As in previous example                                                     |

</APITable>

[1]: https://github.com/trapd00r/LS_COLORS
[2]: https://github.com/ogham/exa
[3]: /docs/guides/syntax/ice-modifiers
[4]: /search?q=exclamation+mark
[5]: https://github.com/direnv/direnv
[6]: https://github.com/direnv/direnv/releases/
[7]: /docs/guides/customization
[8]: /docs/guides/customization#$ZPFX
[9]: /docs/getting_started/overview
