---
id: common
title: "🔀 Syntaxe commune"
sidebar_position: 1
image: /img/logo/320x320.png
description: La syntaxe fondamentale de ZI.
keywords:
  - common
  - syntax
  - how-to-use
---

<!-- @format -->

:::tip

Il est recommandé de vous familiariser avec [getting_started/oveview][9] avant cela.

:::

## <i class="fa-solid fa-circle-nodes"></i> La syntaxe make {#the-make-syntax}

```shell showLineNumbers
zi ice as"program" pick"$ZPFX/bin/git-*" make"PREFIX=$ZPFX"
zi light tj/git-extras
```

Le fichier `Makefile` du projet ci-dessus ne comporte que 2 tâches:

1. Installez la cible.
2. Les scripts de construction qui sont nécessaires à l'installation.

The `Makefile` with 2 tasks, can use:

1. `make"all install PREFIX=…"`,
2. `pick'…'` va `chmod +x` tous les fichiers correspondants et ajouter `$ZPFX/bin/` à `$PATH`.

:::info

[$ZPFX][zpfx] is provided by Zi, it is set to `~/.zi/polaris` by default. Cependant, cela peut être modifié en spécifiant la cible: `$ZPFX=`.

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

La même chose mais avec **installation** (`make install`) sous [$ZPFX][zpfx] par défaut:

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
| `pick'src/vim'`    | as above, but for a different path `$ZPFX/bin/vim`.                                          |

</div>

## <i class="fa-solid fa-palette"></i> LS_COLORS {#ls_colors}

Le dépôt [trapd00r/LS_COLORS][1] fournit un fichier avec les définitions de couleurs pour la commande GNU `ls` , et aussi pour [ogham/exa][2]. Typiquement, on fait `eval $( dircolors -b $HOME/LS_COLORS)` pour traiter ce fichier et définir l'environnement pour `ls`. Cela signifie que `dircolors` est exécuté par chaque démarrage du shell. Il faut beaucoup de temps pour créer un fork et un programme, c'est-à-dire que le binaire `dircolors` doit être chargé pour obtenir et traiter les définitions de couleurs. L'invocation suivante résout ce problème:

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
| `pick"clrs.zsh"`   | Source the previously generated file `clrs.zsh`.                                                            |
| `nocompile'!'`     | Invokes compilation **after** the `atclone'…'` [ice-modifier][3] and the [exclamation mark][4] causes this. |
| `atload'…'`        | Additionally sets up the Zsh completion to use the colors provided by the trapd00r package.                 |

</div>

De cette façon, à l'exception de l'installation et de la mise à jour du plugin, `dircolors` n'est pas exécuté, juste un approvisionnement normal est fait. Le fichier sourcé de tous les jours, c'est-à-dire `clrs.zsh`, est compilé pour accélérer le chargement.

## <i class="fa-solid fa-folder-tree"></i> Direnv {#direnv}

Le projet [**direnv/direnv**][5] s'enregistre dans Z shell pour modifier l'environnement lors d'un changement de répertoire. Cet enregistrement se fait le plus souvent par `eval "$(direnv hook zsh)"` ajouté à `.zshrc`.

```shell showLineNumbers
zi ice as"program" make'!' atclone'./direnv hook zsh > zhook.zsh' \
  atpull'%atclone' src"zhook.zsh"
zi light direnv/direnv
```

- `make'!'` – execute `make` before `atclone'…'` and before `atpull'…'` (see `make` above),
- `src'zhook.zsh'` – fichier source `zhook.zsh`.

En général, direnv fonctionne en se connectant à Zsh. Le code qui fait cela est fourni par le programme `direnv` (construit par `make'…'`).

Ci-dessus `atclone'…'` met ce code dans le fichier `zhook.zsh`, et `src''` le source. De cette façon, `direnv hook zsh` est exécuté uniquement lors du clonage et de la mise à jour, et Zsh démarre plus rapidement.

## <i class="fa-solid fa-wand-magic-sparkles"></i> Coup d'œil sur la syntaxe 'for' {#glance-at-the-for-syntax}

L'inconvénient de cette procédure standard est que le binaire `direnv` est exécuté à chaque démarrage du shell et le ralentit considérablement. Zi permet de résoudre cela de la manière suivante:

```shell showLineNumbers
zi as"program" make'!' atclone'./direnv hook zsh > zhook.zsh' \
  atpull'%atclone' pick"direnv" src"zhook.zsh" for \
    direnv/direnv
```

<div className="apitable">

| Syntax             | Description                                                                                                                    |
| ------------------ | :----------------------------------------------------------------------------------------------------------------------------- |
| `make'!'`          | Compile `direnv`, the exclamation mark means: run the `make` first, before `atclone'…'` and `atpull'…'` hooks.                 |
| `atclone'…'`       | As soon as the plugin is installed generate the registration code and save it to `zhook.zsh`, instead of passing it to `eval`. |
| `atpull'%atclone'` | The `atclone'…'` runs on **installation** while `atpull'…'` runs on **update** of the plugin.                                  |
| `src'zhook.zsh'`   | Load generated registration code                                                                                               |
| `pick'direnv'`     | Ensure `+x` permission on the binary                                                                                           |
| `as'program'`      | The plugin is a program, there's no main file to the source.                                                                   |

</div>

Dans cette méthode, le code enregistré est généré une fois à chaque installation ou mise à jour, puis sourcé sans exécuter `direnv` lui-même. The project is also available as a binary [GitHub releases][6]. This distribution can be installed by:

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
| `atclone'…'`, `atpull'…'` | As in the above example.                                                   |
| `pick'direnv'`            | As in the above example.                                                   |
| `as'program'`             | As in the above example.                                                   |

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

There's no `ice` that can be used as a subcommand.

:::

## <i class="fa-solid fa-file-pen"></i> The alternative syntaxes {#the-alternative-syntaxes}

However, Zi also supports syntaxes such as the equal (`=`) syntax:

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
