---
id: common
title: "🔀 Syntaxe commune"
sidebar_position: 1
image: img/logo/320x320.png
description: La syntaxe fondamentale de ZI.
keywords:
  - common
  - syntax
  - how-to-use
---

<!-- @format -->

:::tip

Il est recommandé de se familiariser avec [getting_started/oveview][9] avant cela.

:::

## <i class="fa-solid fa-circle-nodes"></i> La syntaxe make {#the-make-syntax}

```shell showLineNumbers
zi ice as"program" pick"$ZPFX/bin/git-*" make"PREFIX=$ZPFX"
zi light tj/git-extras
```

Le fichier `Makefile` du projet ci-dessus ne comporte que 2 tâches:

1. Installez la cible.
2. Les scripts de construction qui sont nécessaires à l'installation.

Le `Makefile` avec 2 tâches, peut utiliser :

1. `make"all install PREFIX=…"`,
2. `pick'…'` va `chmod +x` tous les fichiers correspondants et ajouter `$ZPFX/bin/` à `$PATH`.

:::info

[$ZPFX][zpfx] est fournie par ZI, elle est définie par défaut sur `~/.zi/polaris` . However, it can be changed by specifying: `$ZPFX=` target.

:::

## <i class="fa-solid fa-arrows-to-dot"></i> Compilation de programmes {#compiling-programs}

```shell showLineNumbers
zi ice as"program" atclone"rm -f src/auto/config.cache; ./configure" \
  atpull"%atclone" make pick"src/vim"
zi light vim/vim
```

<div className="apitable">

| Syntax             | Description                                                                               |
| ------------------ | :---------------------------------------------------------------------------------------- |
| `as'program'`      | Add file selected by `pick'…'` to `$PATH`, and do not source it.                          |
| `atclone'…'`       | Execute code after downloading.                                                           |
| `atpull'%atclone'` | Execute the same code `atclone'…'` is given, but after successful update.                 |
| `make`             | Run `make` after `atclone'…'` and `atpull'…'` (note: `make'!'` will execute before them). |
| `pick'src/vim'`    | Set executable flag on `src/vim`, hint that `src/` should be added to `$PATH`.            |

</div>

The same but with **installation** (`make install`) under [$ZPFX][zpfx] by default:

```shell showLineNumbers
zi ice as'program' atclone'rm -f src/auto/config.cache; \
  ./configure --prefix=$ZPFX' atpull'%atclone' make'all install' pick'$ZPFX/bin/vim'
zi light vim/vim
```

<div className="apitable">

| Syntax             | Description                                                                                  |
| ------------------ | :------------------------------------------------------------------------------------------- |
| `as'program'`      | As above.                                                                                    |
| `atclone'…'`       | As above **plus** pass `--prefix=$ZPFX` to `./configure`, to set the installation directory. |
| `atpull'%atclone'` | As above.                                                                                    |
| `make`             | As above, but also run the `install` target.                                                 |
| `pick'src/vim'`    | as above, but for different path `$ZPFX/bin/vim`.                                            |

</div>

## <i class="fa-solid fa-palette"></i> LS_COLORS {#ls_colors}

A repository [trapd00r/LS_COLORS][1] provides a file with color definitions for GNU `ls` command, and also for [ogham/exa][2]. Typically one does `eval $( dircolors -b $HOME/LS_COLORS)` to process this file and set the environment for `ls`. This means `dircolors` is run every shell startup. It costs much time to create a fork and program, i.e., `dircolors` binary needs to be loaded to obtain and process the colors definitions. Following invocation solves this problem:

```shell showLineNumbers
zi ice atclone'dircolors -b LS_COLORS > clrs.zsh' \
  atpull'%atclone' pick"clrs.zsh" nocompile'!' \
  atload'zstyle ":completion:*" list-colors “${(s.:.)LS_COLORS}”'
zi light trapd00r/LS_COLORS
```

<div className="apitable">

| Syntax             | Description                                                                                                 |
| ------------------ | :---------------------------------------------------------------------------------------------------------- |
| `atclone'…'`       | Generate shell script, passing it to `eval`. More: [^1]                                                     |
| `atpull'%atclone'` | Do the same at any update of the plugin. More: [^2]                                                         |
| `pick"clrs.zsh"`   | Source the previously generated file `clrs zsh`.                                                            |
| `nocompile'!'`     | Invokes compilation **after** the `atclone'…'` [ice-modifier][3] and the [exclamation mark][4] causes this. |
| `atload'…'`        | Additionally sets up the Zsh completion to use the colors provided by the trapd00r package.                 |

</div>

This way, except for the plugin installation and update, `dircolors` isn't ran, just normal sourcing is done. The everyday sourced file, i.e. `clrs.zsh`, is being compiled to speed up the loading.

## <i class="fa-solid fa-folder-tree"></i> Direnv {#direnv}

The project [**direnv/direnv**][5] registers itself in Z shell to modify the environment on directory change. This registration is most often done by `eval "$(direnv hook zsh)"` added to `.zshrc`.

```shell showLineNumbers
zi ice as"program" make'!' atclone'./direnv hook zsh > zhook.zsh' \
  atpull'%atclone' src"zhook.zsh"
zi light direnv/direnv
```

- `make'!'` – execute `make` before `atclone'…'` and before `atpull'…'` (see `make` above),
- `src'zhook.zsh'` – source file `zhook.zsh`.

In general, direnv works by hooking up to Zsh. The code that does this is provided by program `direnv` (built by `make'…'`).

Above `atclone'…'` puts this code into file `zhook.zsh`, `src''` sources it. This way `direnv hook zsh` is executed only on clone and update, and Zsh starts faster.

## <i class="fa-solid fa-wand-magic-sparkles"></i> Coup d'œil sur la syntaxe 'for' {#glance-at-the-for-syntax}

L'inconvénient de cette procédure standard est que le binaire `direnv` est exécuté à chaque démarrage du shell et le ralentit considérablement. Zi allows to solve this in the following way:

```shell showLineNumbers
zi as"program" make'!' atclone'./direnv hook zsh > zhook.zsh' \
  atpull'%atclone' pick"direnv" src"zhook.zsh" for \
    direnv/direnv
```

<div className="apitable">

| Syntax             | Description                                                                                                          |
| ------------------ | :------------------------------------------------------------------------------------------------------------------- |
| `make'!'`          | Compile `direnv`, the exclamation mark means: run the `make` first, before `atclone'…'` and `atpull'…'` hooks.       |
| `atclone'…'`       | As soon as plugin installed generate the registration code and save it to `zhook.zsh`, instead of passing to `eval`. |
| `atpull'%atclone'` | The `atclone'…'` runs on **installation** while `atpull'…'` runs on **update** of the plugin.                        |
| `src'zhook.zsh'`   | Load generated registration code                                                                                     |
| `pick'direnv'`     | Ensure `+x` permission on the binary                                                                                 |
| `as'program'`      | The plugin is a program, there's no main file to the source.                                                         |

</div>

In this method, the registered code is generated once on every installation or update, then sourced without running `direnv` itself. The project is also available as a binary [GitHub releases][6]. This distribution can be installed by:

```shell showLineNumbers
zi from"gh-r" as"program" mv"direnv* -> direnv" \
  atclone'./direnv hook zsh > zhook.zsh' atpull'%atclone' \
  pick"direnv" src="zhook.zsh" for \
    direnv/direnv
```

<div className="apitable">

| Syntax                    | Description                                                                |
| ------------------------- | :------------------------------------------------------------------------- |
| `from'gh-r'`              | Install from `direnv` from [GitHub releases][6].                           |
| `mv'direnv* -> direnv'`   | After installation, rename `direnv.linux-386` or similar file to `direnv`. |
| `atclone'…'`, `atpull'…'` | As in above example.                                                       |
| `pick'direnv'`            | As in above example.                                                       |
| `as'program'`             | As in above example.                                                       |

</div>

## <i class="fa-solid fa-pen-to-square"></i> Standart syntax {#standart-syntax}

```shell showLineNumbers
zi …
zi ice …
zi load …
zi light …
zi unload …
zi snippet …
```

The standard method of specifying ices and their values:

```shell showLineNumbers
zi wait"1" from"gh-r" atload"print Hello World"
zi load …
```

:::note

There's no `ice` that can be used as subcommand.

:::

## <i class="fa-solid fa-file-pen"></i> The alternative syntaxes {#the-alternative-syntaxes}

However, Zi also supports syntaxes such as: the equal (`=`) syntax:

```shell
zi wait=1 from=gh-r atload="print Hello World"
zi load …
```

The colon (`:`) syntax:

```shell showLineNumbers
zi wait:1 from:gh-r atload:"print Hello World"
zi load …
```

And also – in conjunction with all of the above – the GNU syntax:

```shell showLineNumbers
zi --wait=1 --from=gh-r --atload="print Hello World"
zi load …
```

## <i class="fa-solid fa-book-bookmark"></i> Récapitulatif {#summary}

It's up to the user which syntax to use.

The motivation behind the syntaxes is to utilize the syntax highlighting of editors like Vim – and have the strings and ice expressions colorized with a distinct color. However, with the [zi/zi-vim-syntax][11] syntax definition this motivation can be superseded with the highlighting specificaly for Zi.

<!-- end-of-file -->
<!-- footnotes -->



<!-- links -->

[1]: https://github.com/trapd00r/LS_COLORS
[2]: https://github.com/ogham/exa
[5]: https://github.com/direnv/direnv
[6]: https://github.com/direnv/direnv/releases/
[zpfx]: /docs/guides/customization#$ZPFX
[9]: /docs/getting_started/overview
[11]: https://github.com/z-shell/zi-vim-syntax
