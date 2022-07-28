---
id: common
title: '🔀 Syntaxe commune'
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

[$ZPFX][zpfx] est fournie par ZI, elle est définie par défaut sur `~/.zi/polaris` . Cependant, il peut être modifié en spécifiant : `$ZPFX=` cible.

:::

## <i class="fa-solid fa-arrows-to-dot"></i> Compilation de programmes {#compiling-programs}

```shell showLineNumbers
zi ice as"program" atclone"rm -f src/auto/config.cache; ./configure" \
  atpull"%atclone" make pick"src/vim"
zi light vim/vim
```

| Syntaxe            | Description                                                                                     |
| ------------------ |:----------------------------------------------------------------------------------------------- |
| `as'program'`      | Ajouter le fichier sélectionné par `pick'…'` à `$PATH`, et ne pas le sourcer.                   |
| `atclone'…'`       | Exécuter le code après le téléchargement.                                                       |
| `atpull'%atclone'` | Exécutez le même code `atclone'…'` est donné, mais après une mise à jour réussie.               |
| `make`             | Exécutez `make` après `atclone'…'` et `atpull'…'` (remarque : `make'!'` s'exécutera avant eux). |
| `pick'src/vim'`    | Activez le drapeau exécutable sur `src/vim`, et indiquez que `src/` doit être ajouté à `$PATH`. |

La même chose mais avec **installation** (`make install`) sous [$ZPFX][zpfx] par défaut :

```shell showLineNumbers
zi ice as'program' atclone'rm -f src/auto/config.cache; \
  ./configure --prefix=$ZPFX' atpull'%atclone' make'all install' pick'$ZPFX/bin/vim'
zi light vim/vim
```

| Syntaxe            | Description                                                                                                  |
| ------------------ |:------------------------------------------------------------------------------------------------------------ |
| `as'program'`      | Comme ci-dessus.                                                                                             |
| `atclone'…'`       | Comme ci-dessus **plus** passer `--prefix=$ZPFX` à `./configure`, pour définir le répertoire d'installation. |
| `atpull'%atclone'` | Comme ci-dessus.                                                                                             |
| `make`             | Comme ci-dessus, mais exécutez également la cible `install` .                                                |
| `pick'src/vim'`    | as above, but for different path `$ZPFX/bin/vim`.                                                            |

## <i class="fa-solid fa-palette"></i> LS_COLORS {#ls_colors}

A repository [trapd00r/LS_COLORS][1] provides a file with color definitions for GNU `ls` command, and also for [ogham/exa][2]. Typically one does `eval $( dircolors -b $HOME/LS_COLORS)` to process this file and set the environment for `ls`. This means `dircolors` is run every shell startup. This costs much time because a fork has to be done and the program, i.e. `dircolors`, binary needs to be loaded and executed, and because `dircolors` loads the colors' definitions and processes them. Following ZI invocation solves this problem:

```shell showLineNumbers
zi ice atclone'dircolors -b LS_COLORS > clrs.zsh' \
  atpull'%atclone' pick"clrs.zsh" nocompile'!' \
  atload'zstyle ":completion:*" list-colors “${(s.:.)LS_COLORS}”'
zi light trapd00r/LS_COLORS
```

| Syntaxe            | Description                                                                                                 |
| ------------------ |:----------------------------------------------------------------------------------------------------------- |
| `atclone'…'`       | Generate shell script, but instead of passing it to `eval`. More: [^1]                                      |
| `atpull'%atclone'` | Do the same at any update of the plugin. More: [^2]                                                         |
| `pick"clrs.zsh"`   | Source the previously generated file `clrs zsh`.                                                            |
| `nocompile'!'`     | Invokes compilation **after** the `atclone'…'` [ice-modifier][3] and the [exclamation mark][4] causes this. |
| `atload'…'`        | Additionally sets up the Zsh completion to use the colors provided by the trapd00r package.                 |

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

L'inconvénient de cette procédure standard est que le binaire `direnv` est exécuté à chaque démarrage du shell et le ralentit considérablement. ZI permet de résoudre ce problème de la manière suivante :

```shell showLineNumbers
zi as"program" make'!' atclone'./direnv hook zsh > zhook.zsh' \
  atpull'%atclone' pick"direnv" src"zhook.zsh" for \
    direnv/direnv
```

| Syntaxe            | Description                                                                                                                              |
| ------------------ |:---------------------------------------------------------------------------------------------------------------------------------------- |
| `make'!'`          | Compilez `direnv`, le point d'exclamation signifie : exécutez d'abord le `make `, avant les hooks `atclone'…'` et `atpull'…'` .          |
| `atclone'…'`       | Dès que le plugin est installé, générez le code d'enregistrement et sauvegardez-le dans `zhook.zsh`, au lieu de le transmettre à `eval`. |
| `atpull'%atclone'` | Le `atclone'…'` s'exécute sur **installation** et `atpull'…'` s'exécute à la **mise à jour** du plugin.                                  |
| `src'zhook.zsh'`   | Charger le code d'enregistrement généré                                                                                                  |
| `pick'direnv'`     | Assurez-vous que la permission `+x` est autorisée sur le binaire                                                                         |
| `as'program'`      | The plugin is a program, there's no main file to the source.                                                                             |

This way registration code is generated once every installation and update, to then be simply sourced without running `direnv`. The project is also available as a binary [GitHub releases][6]. This distribution can be installed by:

```shell showLineNumbers
zi from"gh-r" as"program" mv"direnv* -> direnv" \
  atclone'./direnv hook zsh > zhook.zsh' atpull'%atclone' \
  pick"direnv" src="zhook.zsh" for \
    direnv/direnv
```

| Syntaxe                    | Description                                                                |
| -------------------------- |:-------------------------------------------------------------------------- |
| `from'gh-r'`               | Install from `direnv` from [GitHub releases][6].                           |
| `mv'direnv* -> direnv'` | After installation, rename `direnv.linux-386` or similar file to `direnv`. |
| `atclone'…'`, `atpull'…'`  | As in above example.                                                       |
| `pick'direnv'`             | As in above example.                                                       |
| `as'program'`              | As in above example.                                                       |

## <i class="fa-solid fa-pen-to-square"></i> Standart syntax {#standart-syntax}

```shell showLineNumbers
zi …
zi ice …
zi load …
zi light …
zi unload …
zi snippet …
```

The normal way of specifying ices and their values:

```shell showLineNumbers
zi wait"1" from"gh-r" atload"print Hello World"
zi load …
```

:::note

There's no `ice` subcommand - that is currently being fully allowed.

:::

## <i class="fa-solid fa-file-pen"></i> The alternative syntaxes {#the-alternative-syntaxes}

However, ZI supports also other syntaxes: the equal (`=`) syntax:

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

## <i class="fa-solid fa-book-bookmark"></i> Summary {#summary}

It's up to the user which syntax to choose.

The original motivation behind the standard syntax was: to utilize the syntax highlighting of editors like Vim – and have the strings following ice names colorized with a distinct color and this way separated from them. However, with the [zi/zi-vim-syntax][11] syntax definition this motivation can be superseded with the ZI-specific highlighting, at least for Vim.

[^1]: Save it to file. The `atclone'…'` is being ran on the **installation** while the `atpull'…'` hook is being run on an **update** of the [**trapd00r/LS_COLORS**][1] plugin.
[^2]: The `%atclone` is just a special string that denotes the `atclone'…'` hook and is copied onto the `atpull'…'` hook.

[1]: https://github.com/trapd00r/LS_COLORS

[1]: https://github.com/trapd00r/LS_COLORS
[2]: https://github.com/ogham/exa
[3]: /docs/guides/syntax/ice-modifiers
[4]: /search?q=exclamation+mark
[5]: https://github.com/direnv/direnv
[6]: https://github.com/direnv/direnv/releases/
[zpfx]: /docs/guides/customization#$ZPFX
[9]: /docs/getting_started/overview
[11]: https://github.com/z-shell/zi-vim-syntax
