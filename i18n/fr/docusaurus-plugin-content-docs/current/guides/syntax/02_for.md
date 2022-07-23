---
id: for
title: '✨ La syntaxe "For"'
sidebar_position: 2
image: img/logo/320x320.png
description: La documentation sur la syntaxe "For"
keywords:
  - for
  - syntax
  - how-to-use
  - the-for-syntax
---

La syntaxe `for` est la plus populaire, plus concise, et plus optimisée. La commande unique fonctionnera de la même manière que l'invocation en syntaxe classique.

Il permet de fournir des ices communs/par défaut pour un <b> ensemble de plugins </b> ou de sourcer <b> plusieurs fichiers </b> avec des ices : [src, pick, multisrc][ice#src-pick-multisrc].

:::tip

Pour trouver plus d'informations sur quoi que ce soit, utilisez [search][3] ou simplement <kbd>CTRL+K</kbd>.

:::

```shell showLineNumbers
zi light-mode for \
  zsh-users/zsh-autosuggestions \
  z-shell/F-Sy-H \
  z-shell/H-S-MW \
    pick"async.zsh" src"pure.zsh" \
      sindresorhus/pure
```

Elle est mieux présentée par un exemple concret :

```shell showLineNumbers
zi wait"3" lucid for as"null" \
  sbin Fakerr/git-recall \
  sbin paulirish/git-open \
  sbin paulirish/git-recent \
  sbin davidosomething/git-my \
  make"PREFIX=$ZPFX install" iwata/git-now \
  make"PREFIX=$ZPFX" tj/git-extras
```

La commande unique ci-dessus installe 6 plugins ([git extension][2] packages), avec les ices de base `as "null" wait "3" lucid` qui sont communs à tous les plugins et 6 ices complémentaires spécifiques aux plugins.

Chargez quelques paquets binaires utiles à partir des versions GitHub de [][1], et utilitaires :

```shell showLineNumbers
zi for as"null" wait"2" lucid from"gh-r" \
  mv"exa* -> exa" sbin ogham/exa \
  mv"fd* -> fd" sbin"fd/fd" @sharkdp/fd \
  sbin"fzf" junegunn/fzf
```

:::note

- `sbin'…'` est une [ice][3] ajouté par [bin-gem-node][4] [annexe][5], il fournit la commande à la ligne de commande sans modification de `$PATH`.
- Si le nom de la commande est le même que le nom du plugin, le contenu de l'ice peut être ignoré.

:::

[Turbo][6] charge certains plugins, sans les glaces spécifiques aux plugins :

```shell showLineNumbers
zi wait lucid for \
  hlissner/zsh-autopair \
  urbainvaes/fzf-marks
```

Chargez deux fichiers [Oh-My-Zsh][7] comme [snippets][8], en mode turbo :

```shell showLineNumbers
zi wait lucid for \
    OMZ::lib/git.zsh \
  atload"unalias grv" \
    OMZ::plugins/git/git.plugin.zsh
```

Ensemble de plugins populaires avec [turbo][6] et [for][10]:

```shell {1} showLineNumbers
zi wait lucid light-mode for \
  atinit"zicompinit; zicdreplay" \
    z-shell/F-Sy-H \
  atload"_zsh_autosuggest_start" \
    zsh-users/zsh-autosuggestions \
  blockf atpull'zi creinstall -q .' \
    zsh-users/zsh-completions
```

| Syntax       | Description                                                                                                        |
| ------------ |:------------------------------------------------------------------------------------------------------------------ |
| `wait`       | Chargement 0 seconde (environ 5 ms exactement) après l'invite ([turbo mode][6]).                                   |
| `lucid`      | Faites taire les messages sous l'invite ("`Loaded {name of the plugin}`").                                         |
| `light-mode` | Chargez le plugin en mode `light`. [^1].                                                                           |
| `atpull'…'`  | Exécutez après avoir mis à jour le plugin - la commande dans la glace installera toutes les nouvelles complétions. |
| `atinit'…'`  | Exécutez le code avant chargement du plug-in.                                                                      |
| `atload'…'`  | Exécutez le code après le chargement du plugin.                                                                    |
| `zicompinit` | Equals to `autoload compinit; compinit`.                                                                           |
| `zicdreplay` | Exécuter les appels de `compdef …` que les plugins ont fait. Plus ci-dessous [^2].                                 |

## <i class="fa-solid fa-list"></i> Oh-My-Zsh, [turbo][6] Oh-My-Zsh et la syntaxe [for][10]

### <i class="fa-solid fa-forward-step"></i> Sans [mode turbo][6] et [for][10]

```shell showLineNumbers
# A.
setopt promptsubst

# B.
zi snippet OMZL::git.zsh

# C.
zi ice atload"unalias grv"
zi snippet OMZP::git

# D.
zi for OMZL::prompt_info_functions.zsh OMZT::gnzh

# E.
zi snippet OMZP::colored-man-pages

# F.
zi ice as"completion"
zi snippet OMZP::docker/_docker

# G.
zi ice atinit"zicompinit; zicdreplay"
zi light z-shell/F-Sy-H
```

### <i class="fa-solid fa-forward-fast"></i> With [turbo mode][6] and [for][10]

```shell showLineNumbers
# A.
setopt promptsubst

# B, C.
zi wait lucid for \
  OMZL::git.zsh \
  atload"unalias grv" \
  OMZP::git

# Provide a simple prompt till the theme loads to visualise the effect.
PS1="READY >"

# D.
zi wait'!' lucid for \
  OMZL::prompt_info_functions.zsh \
  OMZT::gnzh

# E, F, G.
zi wait lucid for \
    atinit"zicompinit; zicdreplay" \
    z-shell/fast-syntax-highlighting \
  OMZP::colored-man-pages \
    as"completion" \
  OMZP::docker/_docker
```

:::info

**A** - Most themes use this option.

**B, C** - OMZ themes use this library and some other use also the plugin. It provides many aliases – `atload'…'` shows how to disable some of them (e.g.: to use program `rgburke/grv`).

**D** - Set OMZ theme. Loaded separately because the theme needs the `!` passed to the `wait` ice to reset the prompt after loading the snippet in turbo mode.

**E, F, G** - Some plugins:

1. syntax-highlighting, loaded possibly early for a better user experience).
2. example functional plugin.
3. docker completion.

:::

Above setup loads everything after prompt, because of preceding `wait` ice. That is called **turbo mode**, it shortens Zsh startup time by <u>50%-80%</u>, e.g. instead of 200 ms, it'll be getting your shell started up after **40 ms**.

Try both setups on the daily basis to notice the difference. The features of ZI can do much more than this simple example.

## <i class="fa-solid fa-book-bookmark"></i> Récapitulatif

In general, [turbo mode][6] can be optionally enabled only for a subset of plugins or for all plugins.

Syntax-highlighting plugins, like [F-Sy-H][11] or [zsh-syntax-highlighting][12], theoretically expect to be loaded last, even after the completion initialization as `compinit` function.

However in practice, you just have to ensure that such plugin is loaded after plugins that are issuing `compdef` – which basically means completions that aren't using the underscore-starting function file; the completion initialization still has to be performed before syntax-highlighting plugin, hence the `atinit'…'` ice, which will load `compinit` right before loading the plugin, the syntax-highlighting and suggestions plugins are loaded early for a better user experience.

[^1]: Then the tracking of plugin, activity report gathering, accessible via the `zi report {plugin-name}` subcommand) is being disabled. Note that for turbo mode, the performance gains are almost `0`, so in this mode, you can load all plugins with the tracking and the `light-mode` ice can be removed from the command.
[^2]: They were recorded and `compinit` can be called later. `compinit` fournit la fonction `compdef` , elle doit donc être exécutée avant d'émettre la reprise `compdef`s avec `zicdreplay`.

[1]: /search/?q=GH-R

[1]: /search/?q=GH-R
[2]: /search/?q=git+ext
[3]: /search/?q=ice
[3]: /search/?q=ice
[4]: /search/?q=bin+gem+node
[5]: /search/?q=annex
[6]: /search/?q=turbo+mode
[6]: /search/?q=turbo+mode
[6]: /search/?q=turbo+mode
[6]: /search/?q=turbo+mode
[7]: /search/?q=oh+my+zsh
[8]: /search/?q=snippets
[10]: /docs/guides/syntax/for
[11]: https://github.com/z-shell/F-Sy-H
[12]: https://github.com/zsh-users/zsh-syntax-highlighting
[ice#src-pick-multisrc]: /docs/guides/syntax/ice#src-pick-multisrc
