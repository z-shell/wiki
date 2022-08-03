---
id: for
title: '✨ La syntaxe "For"'
sidebar_position: 2
image: /img/logo/320x320.png
description: La documentation sur la syntaxe "For"
keywords:
  - for
  - syntax
  - how-to-use
  - the-for-syntax
---

<!-- @format -->

La syntaxe `for` est la plus populaire, plus concise, et plus optimisée. La commande unique fonctionnera de la même manière que l'invocation en syntaxe classique.

It allows providing common/default ices for a <b> set of plugins </b> or to source <b> multiple files </b> with the ices: [src, pick, multisrc][ice#src-pick-multisrc].

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

It is best presented by real-world examples:

```shell showLineNumbers
zi wait"3" lucid for as"null" \
  sbin Fakerr/git-recall \
  sbin paulirish/git-open \
  sbin paulirish/git-recent \
  sbin davidosomething/git-my \
  make"PREFIX=$ZPFX install" iwata/git-now \
  make"PREFIX=$ZPFX" tj/git-extras
```

Above single command installs 6 plugins ([git extension][2] packages), with the base ices `as"null" wait"3" lucid` that are common to all of the plugins and 6 plugin-specific add-on ices.

Load a few useful binary packages from the [GitHub releases][1], utils:

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

[Turbo][6] load some plugins, without any plugin-specific ices:

```shell showLineNumbers
zi wait lucid for \
  hlissner/zsh-autopair \
  urbainvaes/fzf-marks
```

Load two [Oh-My-Zsh][7] files as [snippets][8], in turbo mode:

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

<div className="apitable">

| Syntax       | Description                                                                                  |
| ------------ | :------------------------------------------------------------------------------------------- |
| `wait`       | Load 0 seconds (about 5 ms exactly) after prompt ([turbo mode][6]).                          |
| `lucid`      | Silence the under-prompt messages ("`Loaded {name of the plugin}`").                         |
| `light-mode` | Load the plugin in `light` mode. [^1].                                                       |
| `atpull'…'`  | Execute after updating the plugin – the command in the ice will install any new completions. |
| `atinit'…'`  | Execute code before loading plugin.                                                          |
| `atload'…'`  | Execute code after loading the plugin.                                                       |
| `zicompinit` | Equals to `autoload compinit; compinit`.                                                     |
| `zicdreplay` | Execute `compdef …` calls by plugins. More below [^2].                                       |

</div>

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

### <i class="fa-solid fa-forward-fast"></i> Avec [mode turbo][6] et [for][10]

```shell showLineNumbers
# A.
setopt promptsubst

# B, C.
zi wait lucid for \
  OMZL::git.zsh \
  atload"unalias grv" \
  OMZP::git

# Provide a simple prompt till the theme loads to visualize the effect.
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

**A** - La plupart des thèmes utilisent cette option.

**B, C** - OMZ themes use this library and some others use also the plugin. It provides many aliases – `atload'…'` showing how to disable some of them (e.g.: to use the program `rgburke/grv`).

**D** - Définissez le thème OMZ. Chargé séparément car le thème a besoin que le `!` soit passé au `wait` glace pour réinitialiser l'invite après le chargement du snippet en mode turbo.

**E, F, G** - Some plugins:

1. syntax-highlighting, chargée éventuellement en avance pour une meilleure expérience utilisateur).
2. exemple de plugin fonctionnel.
3. complétion de docker.

:::

Above setup loads everything after prompt, because of preceding `wait` ice. Cela s'appelle le **mode turbo mode**, il raccourcit le temps de démarrage de Zsh par <u>50%-80%</u>, par exemple au lieu de 200 ms, il vous fera démarrer après **40 ms**.

Essayez les deux configurations au quotidien pour constater la différence. The features of Zi can do much more than this simple example.

## <i class="fa-solid fa-book-bookmark"></i> Récapitulatif

En général, le [ mode turbo][6] ne peut être activé que pour un sous-ensemble de plugins ou pour tous les plugins.

Les plug-ins de mise en évidence de syntaxe, tels que [F-Sy-H][11] ou [zsh-syntax-highlighting][12], s'attendent théoriquement à être chargés en dernier, même après l'initialisation de l'achèvement en tant que fonction `compinit`.

However, in practice, you just have to ensure that such plugin is loaded after plugins that are issuing `compdef` – which basically means completions that aren't using the underscore-starting function file; the completion initialization still has to be performed before syntax-highlighting plugin, hence the `atinit'…'` ice, which will load `compinit` right before loading the plugin, the syntax-highlighting and suggestions plugins are loaded early for a better user experience.

<!-- end-of-file -->
<!-- footnotes -->



<!-- links -->

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
