---
id: standard
title: "🔀 Standard Syntax"
sidebar_position: 1
image: /img/png/theme/z/320x320.png
description: The fundamental syntax documentation.
keywords:
  - syntax
  - standard
  - how-to-use
  - fundamental
---

<!-- @format -->

import APITable from '@site/src/components/APITable';

Zi provides two syntax types for structured statements or expressions:

- Standard syntax
- The ["For"][for-syntax] syntax

It is up to the user which syntax to use, but it is highly recommended to familiarize yourself with both of them. In this example, we will use an empty repository [z-shell/0](https://github.com/z-shell/0) to practice the basics of the standard syntax.

- Execute the following command in your terminal:

```shell
zi load z-shell/0
```

Successfully installed the Zsh plugin which usually contains all the setup instructions as described in the [Zsh plugin standard](https://wiki.zshell.dev/community/zsh_plugin_standard).

A snippet is a single file with a portion of reusable source code, machine code, or text and requires a full path or URL to the file.

> - Execute the following command in your terminal:

```shell
zi snippet https://raw.githubusercontent.com/z-shell/zi-src/main/lib/zsh/snippets/welcome.zsh
```

Success! But not always everything is so easy and simple, also sometimes we want certain things to happen at certain times or conditions. This can be achieved using [ice-modifiers][ice-mods], so-called [ice][ice-syntax].

The top line contains ice-modifiers, and the bottom line is the plugin.

> - Execute the following commands in your terminal:

```shell showLineNumbers
zi ice id-as'zsh/plugin' atinit'print "Hello World!"'
zi load z-shell/0
```

This registered the plugin under the [plugin ID][plugin-id] `zsh/plugin` instead of `z-shell/0`. This will work as expected e.g. `zi update zsh/plugin`, `zi remove zsh/plugin`, etc. The "Hello World!" printed before loading the plugin

Let's install again with more ice-modifiers.

> - Execute the following commands in your terminal:

```shell showLineNumbers
zi ice id-as'final/countdown' \
  atinit'+zi-message "{bapo}Cloned!"' \
  atclone'+zi-message "{quos}Boom!"' \
  atload'+zi-message "{apo}Loaded!"' countdown
zi load z-shell/0
```

### Syntax alternatives {#syntax-alternatives}

Zi supports alternatives such as the equal (`=`) syntax:

```shell showLineNumbers
zi ice id-as=equal atload="print Hello World"
zi load z-shell/0
```

The colon (`:`) syntax:

```shell showLineNumbers
zi ice id-as:colon atload:"print Hello World"
zi load z-shell/0
```

And also – in conjunction with all of the above – the GNU syntax:

```shell showLineNumbers
zi ice id-as=GNU --atload="print Hello World"
zi load z-shell/0
```

The syntax alternatives can utilize the highlighting of editors like Vim – and have the strings and ice expressions colorized with a distinct color. However, with [zi-vim-syntax][] the syntax definition can be superseded with the highlighting specifically for Zi. syntax definition can be superseded with the highlighting specifically for Zi.

## <i class="fa-solid fa-circle-nodes"></i> Utilizing "make" {#utilizing-make}

Vim repository on GitHub – a typical source code that needs compilation, Zi can manage the run of `./configure` and other `make` stuff. Ice-modifier `pick` adds the binary program to `$PATH`. You could also install the package under the path $ZPFX.

```shell title="~/.zshrc" showLineNumbers
zi ice as"program" atclone"rm -f src/auto/config.cache; ./configure" \
  atpull"%atclone" make pick"src/vim"
zi light vim/vim
```

The `make'…'` ice could also be: `make"install PREFIX=$ZPFX"`, if "install" wouldn't be the only, default target.

:::info

[$ZPFX][zpfx] is provided by Zi, it is set to `~/.zi/polaris` by default. However, it can be changed by specifying the `$ZPFX=` target.

:::

```shell title="~/.zshrc" showLineNumbers
zi ice as"program" pick"$ZPFX/bin/git-*" make"PREFIX=$ZPFX"
zi light tj/git-extras
```

The `Makefile` of the project above has only 2 tasks:

1. Install the target.
2. Build scripts that are required for installation.

The `Makefile` with 2 tasks, can use:

1. `make"all install PREFIX=…"`,
2. `pick'…'` will `chmod +x` all matching files and add `$ZPFX/bin/` to `$PATH`.

## <i class="fa-solid fa-arrows-to-dot"></i> Compiling programs {#compiling-programs}

```shell showLineNumbers
zi ice as"program" atclone"rm -f src/auto/config.cache; ./configure" \
  atpull"%atclone" make pick"src/vim"
zi light vim/vim
```

```mdx-code-block
<APITable>
```

| Syntax             | 説明                                                                                        |
| ------------------ |:----------------------------------------------------------------------------------------- |
| `as'program'`      | Add file selected by `pick'…'` to `$PATH`, and do not source it.                          |
| `atclone'…'`       | Execute code after downloading.                                                           |
| `atpull'%atclone'` | Execute the same code `atclone'…'` is given, but after successful update.                 |
| `make`             | Run `make` after `atclone'…'` and `atpull'…'` (note: `make'!'` will execute before them). |
| `pick'src/vim'`    | Set the executable flag on `src/vim`, hint that `src/` should be added to `$PATH`.        |

```mdx-code-block
</APITable>
```

The same but with **installation** (`make install`) under [$ZPFX][zpfx] by default:

```shell showLineNumbers
zi ice as'program' atclone'rm -f src/auto/config.cache; \
  ./configure --prefix=$ZPFX' atpull'%atclone' make'all install' pick'$ZPFX/bin/vim'
zi light vim/vim
```

```mdx-code-block
<APITable>
```

| Syntax             | 説明                                                                                           |
| ------------------ |:-------------------------------------------------------------------------------------------- |
| `as'program'`      | As above.                                                                                    |
| `atclone'…'`       | As above **plus** pass `--prefix=$ZPFX` to `./configure`, to set the installation directory. |
| `atpull'%atclone'` | As above.                                                                                    |
| `make`             | As above, but also run the `install` target.                                                 |
| `pick'src/vim'`    | as above, but for a different path `$ZPFX/bin/vim`.                                          |

```mdx-code-block
</APITable>
```

## <i class="fa-solid fa-palette"></i> LS_COLORS {#ls_colors}

A repository [trapd00r/LS_COLORS][1] provides a file with color definitions for GNU `ls` command, and also for [ogham/exa][2]. Typically one does `eval $( dircolors -b $HOME/LS_COLORS)` to process this file and set the environment for `ls`. This means `dircolors` is run by every shell startup. It costs much time to create a fork and program, i.e., the `dircolors` binary needs to be loaded to obtain and process the color definitions. The following invocation solves this problem:

```shell showLineNumbers
zi ice atclone'dircolors -b LS_COLORS > clrs.zsh' \
  atpull'%atclone' pick"clrs.zsh" nocompile'!' \
  atload'zstyle ":completion:*" list-colors “${(s.:.)LS_COLORS}”'
zi light trapd00r/LS_COLORS
```

```mdx-code-block
<APITable>
```

| Syntax             | 説明                                                                                          |
| ------------------ |:------------------------------------------------------------------------------------------- |
| `atclone'…'`       | Generate shell script, passing it to `eval`. More: [^1]                                     |
| `atpull'%atclone'` | Do the same at any update of the plugin. More: [^2]                                         |
| `pick"clrs.zsh"`   | Source the previously generated file `clrs.zsh`.                                            |
| `nocompile'!'`     | Invokes compilation **after** the `atclone'…'` and the [exclamation][] mark causes this.    |
| `atload'…'`        | Additionally sets up the Zsh completion to use the colors provided by the trapd00r package. |

```mdx-code-block
</APITable>
```

This way, except for the plugin installation and update, `dircolors` isn't run, just normal sourcing is done. The everyday sourced file, i.e. `clrs.zsh`, is being compiled to speed up the loading.

## <i class="fa-solid fa-folder-tree"></i> Direnv {#direnv}

The project [direnv/direnv][5] registers itself in the Z shell to modify the environment on directory change. This registration is most often done by `eval "$(direnv hook zsh)"` added to `.zshrc`.

```shell showLineNumbers
zi ice as"program" make'!' atclone'./direnv hook zsh > zhook.zsh' \
  atpull'%atclone' src"zhook.zsh"
zi light direnv/direnv
```

- `make'!'` – execute `make` before `atclone'…'` and before `atpull'…'` (see `make` above),
- `src'zhook.zsh'` – source file `zhook.zsh`.

In general, `direnv` works by hooking up to Zsh. The code that does this is provided by the program `direnv` (built by `make'…'`).

Above `atclone'…'` puts this code into file `zhook.zsh`, `src''` sources it. This way `direnv hook zsh` is executed only on clone and update, and Zsh starts faster.

### <i class="fa-solid fa-wand-magic-sparkles"></i> Glance at the 'for' syntax {#glance-at-the-for-syntax}

The drawback of this standard procedure is that the `direnv` binary is run on every shell startup and significantly slows it down. Zi allows to solve this in the following way:

```shell showLineNumbers
zi as"program" make'!' atclone'./direnv hook zsh > zhook.zsh' \
  atpull'%atclone' pick"direnv" src"zhook.zsh" for \
    direnv/direnv
```

```mdx-code-block
<APITable>
```

| Syntax             | 説明                                                                                                                             |
| ------------------ |:------------------------------------------------------------------------------------------------------------------------------ |
| `make'!'`          | Compile `direnv`, the exclamation mark means: run the `make` first, before `atclone'…'` and `atpull'…'` hooks.                 |
| `atclone'…'`       | As soon as the plugin is installed generate the registration code and save it to `zhook.zsh`, instead of passing it to `eval`. |
| `atpull'%atclone'` | The `atclone'…'` runs on **installation** while `atpull'…'` runs on **update** of the plugin.                                  |
| `src'zhook.zsh'`   | Load generated registration code                                                                                               |
| `pick'direnv'`     | Ensure `+x` permission on the binary                                                                                           |
| `as'program'`      | The plugin is a program, there's no main file to the source.                                                                   |

```mdx-code-block
</APITable>
```

In this method, the registered code is generated once on every installation or update, then sourced without running `direnv` itself. The project is also available as a binary [GitHub releases][gh-releases]. This distribution can be installed by:

```shell showLineNumbers
zi from"gh-r" as"program" mv"direnv* -> direnv" \
  atclone'./direnv hook zsh > zhook.zsh' atpull'%atclone' \
  pick"direnv" src="zhook.zsh" for \
    direnv/direnv
```

```mdx-code-block
<APITable>
```

| Syntax                     | 説明                                                                         |
| -------------------------- |:-------------------------------------------------------------------------- |
| `from'gh-r'`               | Install from `direnv` from GitHub Github releases.                         |
| `mv'direnv* -> direnv'` | After installation, rename `direnv.linux-386` or similar file to `direnv`. |
| `atclone'…'`, `atpull'…'`  | Same above example.                                                        |
| `pick'direnv'`             | Same above example.                                                        |
| `as'program'`              | Same above example.                                                        |

```mdx-code-block
</APITable>
```

<!-- end-of-file -->
<!-- footnotes -->



<!-- links -->



<!-- external -->

[^1]: Save it to a file. The `atclone'…'` is being run on the **installation** while the `atpull'…'` hook is being run on an **update** of the [**trapd00r/LS_COLORS**][1] plugin.
[^2]: The `%atclone` is just a special string that denotes the `atclone'…'` hook and is copied onto the `atpull'…'` hook.

[ice-syntax]: /docs/guides/syntax/ice
[for-syntax]: /docs/guides/syntax/for
[ice-mods]: /docs/guides/syntax/ice-modifiers
[exclamation]: /search?q=exclamation+mark
[zpfx]: /docs/guides/customization#$ZPFX
[plugin-id]: /docs/guides/syntax/ice#id-as

[1]: https://github.com/trapd00r/LS_COLORS

[1]: https://github.com/trapd00r/LS_COLORS
[2]: https://github.com/ogham/exa
[5]: https://github.com/direnv/direnv
[gh-releases]: https://github.com/direnv/direnv/releases/
[zi-vim-syntax]: https://github.com/z-shell/zi-vim-syntax
