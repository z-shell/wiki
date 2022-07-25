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

<!-- @format -->

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

| Syntaxe      | Description                                                                                                        |
| ------------ |:------------------------------------------------------------------------------------------------------------------ |
| `wait`       | Chargement 0 seconde (environ 5 ms exactement) après l'invite ([turbo mode][6]).                                   |
| `lucid`      | Faites taire les messages sous l'invite ("`Loaded {name of the plugin}`").                                         |
| `light-mode` | Chargez le plugin en mode `light`. [^1].                                                                           |
| `atpull'…'`  | Exécutez après avoir mis à jour le plugin - la commande dans la glace installera toutes les nouvelles complétions. |
| `atinit'…'`  | Exécutez le code avant chargement du plug-in.                                                                      |
| `atload'…'`  | Exécutez le code après le chargement du plugin.                                                                    |
| `zicompinit` | Equivaut à`autoload compinit; compinit`.                                                                           |
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

### <i class="fa-solid fa-forward-fast"></i> Avec [mode turbo][6] et [for][10]

```shell showLineNumbers
# A.
setopt promptsubst

# B, C.
zi wait lucid pour \
  OMZL::git.zsh \
  atload "unalias grv" \
  OMZP::git

# Fournir une simple invite jusqu'à ce que le thème se charge pour visualiser l'effet.
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

**B, C** - Les thèmes OMZ utilisent cette bibliothèque et certains autres utilisent également le plugin. Il fournit de nombreux alias - `atload'…'` montre comment désactiver certains d'entre eux (par exemple : pour utiliser le programme `rgburke/grv`).

**D** - Définissez le thème OMZ. Chargé séparément car le thème a besoin que le `!` soit passé au `wait` glace pour réinitialiser l'invite après le chargement du snippet en mode turbo.

**E, F, G** - Certains plugins :

1. syntax-highlighting, chargée éventuellement en avance pour une meilleure expérience utilisateur).
2. exemple de plugin fonctionnel.
3. complétion de docker.

:::

La configuration ci-dessus charge tout après l'invite, à cause de la glace précédente `wait` . Cela s'appelle le **mode turbo mode**, il raccourcit le temps de démarrage de Zsh par <u>50%-80%</u>, par exemple au lieu de 200 ms, il vous fera démarrer après **40 ms**.

Essayez les deux configurations au quotidien pour constater la différence. Les fonctionnalités de ZI peuvent faire beaucoup plus que ce simple exemple.

## <i class="fa-solid fa-book-bookmark"></i> Récapitulatif

En général, le [ mode turbo][6] ne peut être activé que pour un sous-ensemble de plugins ou pour tous les plugins.

Les plug-ins de mise en évidence de syntaxe, tels que [F-Sy-H][11] ou [zsh-syntax-highlighting][12], s'attendent théoriquement à être chargés en dernier, même après l'initialisation de l'achèvement en tant que fonction `compinit`.

Cependant, en pratique, il suffit de s'assurer qu'un tel plugin est chargé après les plugins qui émettent `compdef` - ce qui signifie essentiellement les complétions qui n'utilisent pas le fichier de fonction de début de soulignement ; l'initialisation de la complétion doit toujours être effectuée avant le plugin de mise en évidence syntaxique , d'où la glace `atinit'…'` , qui chargera `compinit` juste avant de charger le plugin, les plugins de mise en évidence syntaxique et de suggestions sont chargés tôt pour une meilleure expérience utilisateur.

[^1]: Ensuite, le suivi du plugin, la collecte des rapports d'activité, accessible via la sous-commande `zi report {plugin-name}` ) est désactivé. Notez que pour le mode turbo, les gains de performance sont presque `0`, donc dans ce mode, vous pouvez charger tous les plugins avec le suivi et la glace `light-mode` peut être supprimé de la commande.
[^2]: Ils ont été enregistrés et `compinit` peut être appelé plus tard. `compinit` fournit la fonction `compdef` , elle doit donc être exécutée avant d'émettre la reprise `compdef`s avec `zicdreplay`.

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
[6]: /search/?q=turbo+mode
[7]: /search/?q=oh+my+zsh
[8]: /search/?q=snippets
[10]: /docs/guides/syntax/for
[11]: https://github.com/z-shell/F-Sy-H
[12]: https://github.com/zsh-users/zsh-syntax-highlighting
[ice#src-pick-multisrc]: /docs/guides/syntax/ice#src-pick-multisrc
