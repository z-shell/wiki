---
id: bindkey
title: "🗒 Carte de Bindkeys"
sidebar_position: 5
image: img/logo/320x320.png
description: La syntaxe ZI de Bindmap & Bindkey
keywords:
  - syntax
  - binkey
  - bindmap
  - how-to-use
---

<!-- @format -->

## <i class="fa-solid fa-keyboard"></i> Bindkey

Les mappages de clés `bindkey` peuvent être très confus à déchiffrer. Il peut utiliser plusieurs notations différentes, mais il est judicieux d'utiliser la même notation de clé dans toute votre configuration.

Vous pouvez imprimer toutes vos liaisons de touches actuelles dans la carte des touches en cours avec `bindkey`. Pour imprimer la commande complète `bindkey` à ajouter à votre fichier `.zshrc` , utilisez `bindkey -L`.

En général, vous liez un widget à une séquence de touches ou à une touche avec modificateur. Ceci peut être déclaré dans la notation [caret][5] en utilisant `^`, à l'aide de [séquences d'échappement][6] à l'aide de `\`, en octal (`\NNN`), hexadécimal (`\xNN`), ou unicode (`\uNNN`). Aucune d'entre elles n'est particulièrement intéressante à lire pour les gens.

C'est également délicat car cela dépend de votre clavier, de votre système d'exploitation et de votre shell. Voici quelques principes de base

- `\e`, `\E`, = Échap
- `^[` = touche Alt (sur certains claviers, c'est la même chose que Echap)
- `^ ?` = Supprimer
- `^X`, `^` = Contrôle

Les touches qui viennent après le modificateur peuvent ajouter encore plus de confusion.

## <i class="fa-solid fa-delete-left"></i> Supprimer la liaison

Pour supprimer une liaison de touches, vous pouvez utiliser `bindkey -d $KEYS`. Veillez à ne pas supprimer les caractères dont vous avez besoin pour taper.

## <i class="fa-solid fa-sliders"></i> Les raccourcis clavier `bindmap'…'` {#bindmap}

Parfois, les plugins appellent [bindkey][1] pour attribuer des raccourcis clavier. Cela peut poser des problèmes car plusieurs plugins peuvent lier les mêmes clés.

De plus, l'utilisateur peut vouloir une ou plusieurs liaisons différentes, ce qui nécessitera des commandes supplémentaires compliquées `bindkey` dans `.zshrc`.

ZI fournit une solution à ce problème - la possibilité de remapper les bindkeys avec un court [ice-modifier][2] spécification avec le `bindmap'…'` [ice][3].

### <i class="fa-solid fa-circle-check"></i> Exemples pour `bindmap'…'`

Mappez Ctrl-G au lieu de Ctrl-R pour la recherche d'historique.

```shell
zi bindmap'^R -> ^G' for z-shell/history-search-multi-word
```

Mapper Ctrl-Shift-Gauche et …-Droit utilisés par URxvt à la place de ceux de Xterms. Chargez avec le bindkey-tracking ↔ avec le light-loading pour tout le reste.

On pourrait également séparer les bindmaps par un point-virgule, par exemple .:

```shell
bindmap'"\\e[1\;6D" -> \\e[1\;5D ; "\\e[1\;6C" -> ^[[1\;5C' \
```

```shell showLineNumbers
zi wait light-mode trackbinds bindmap'"\\e[1\;6D" -> \\e[1\;5D"' \
  bindmap'"\\e[1\;6C" -> ^[[1\;5C' pick'dircycle.zsh' for \
  michaelxmcbride/zsh-dircycle
```

Mettez en correspondance l'espace avec l'espace normal et Ctrl-Espace avec le widget `globalias', qui développe l'alias saisi à gauche, fourni par le plugin OMZ globalias.

```shell showLineNumbers
zi bindmap='!" " -> magic-space; !"^ " -> globalias' nocompletions \
  depth=1 pick=plugins/globalias/globalias.plugin.zsh for \
  ohmyzsh/ohmyzsh
```

### <i class="fa-solid fa-circle-check"></i> Explications

La glace `bindmap'…'` a deux modes de fonctionnement : normal et point d'exclamation (`bindmap' !…'`). Dans le premier mode, le remappage se fait de clé à clé, c'est-à-dire : `bindmap 'fromkey -> to-key'`.

La clé donnée est remplacée par la deuxième clé donnée dans la commande `bindkey` qui est lancée lors du chargement du plugin. Dans le second mode, le remappage se fait de la clé vers le widget, par exemple : `bindmap'!from-key -> to-widget'`.

Dans ce mode, la touche donnée est mappée sur le widget donné au lieu du widget spécifié dans la commande `bindkey` ; par exemple .:

Au lieu de:

```shell showLineNumbers
bindkey "^ " magic-space
bindkey " " globalias
```

L'appel réel qui sera fait sera :

```shell showLineNumbers
bindkey "^ " globalias
bindkey " " magic-space
```

Pour le `bindmap=' !" " -> magic-space ; !"^ " -> globalias'` ice.

### <i class="fa-solid fa-circle-check"></i> Utilisation de la bindmap `'…'` en mode léger {#trackbinds}

Quand le mode d'investigation est activé, c'est à dire .:

- lorsque le mode de chargement complet est utilisé, par défaut dans la syntaxe `for` et lorsque `zi load …` est utilisé, alors le `bindmap'…'` ice fonctionne normalement.

Dans le cadre de la non-enquête:

- le [light mode](/search/?q=light+mode) - activé lorsque `zi light …` ou le `light-mode` est utilisé-le `bindmap'…'` n'est pas disponible, sauf si la la glace `trackbinds` est spécifié:

Avec l'utilisation de la glace en mode lumière et de la syntaxe for:

```shell showLineNumbers
zi light-mode for trackbinds bindmap'^R -> ^G' \
  z-shell/history-search-multi-word
```

Avec l'utilisation de la syntaxe traditionnelle:

```shell showLineNumbers
zi ice trackbinds bindmap'^R -> ^G'
zi light z-shell/history-search-multi-word
```

### <i class="fa-solid fa-circle-check"></i> Utilisation des raccourcis de <kbd>UPAR</kbd>

Il y a quatre valeurs spéciales qui peuvent être utilisées sur le côté gauche du bind-map: <kbd>UPAR</kbd>, <kbd>DOWNAR</kbd>, <kbd>LEFTAR</kbd>, <kbd>RIGHTAR</kbd>. Elles correspondent à la flèche vers le haut, la flèche vers le bas, etc. Il est donc possible de faire:

```shell
zi bindmap='LEFTAR -> ^F; RIGHTAR -> ^G' …
```

L'avantage d'utiliser les raccourcis <kbd>UPAR</kbd>, … est qu'ils couvrent plusieurs codes de touche de curseur possibles pour chacune des touches de curseur afin qu'ils fonctionnent quel que soit le terminal utilisé.

[1]: /search/?q=binkey
[2]: /search/?q=ice+modifier
[3]: /docs/guides/syntax/ice
[5]: https://en.wikipedia.org/wiki/Caret_notation
[6]: https://en.wikipedia.org/wiki/Escape_sequence
