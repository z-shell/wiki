---
id: default-ice
title: "🌀 Glace par défaut"
image: img/logo/320x320.png
description: Annexe - Documentation sur la glace par défaut
keywords:
  - ice
  - annex
  - zannex
  - default-ice
---

<!-- @format -->

## <i class="fa-brands fa-github"></i> [z-shell/z-a-default-ice][]

Une annexe offre la possibilité de définir **des glaces par défaut** pour la prochaine commande `zi` . Il ajoute la sous-commande: **default-ice** qui a le synopsis suivant:

```shell showLineNumbers
—— default-ice --help/-h --clear/-c --show/-s --get/-g --quiet/-q --stats/-t
—— default-ice ice1'value1' ice2'value2' ⋯

 Description:
 --help/-h  →      this message
 --show/-s  →      show the currently set default ices
 --clear/-c →      reset the default ices
 --get/-g   →      return the current ices in Reply hash
 --quiet/-q →      hide all messages
 --stats/-t →      show some statistics
```

## Installation de la glace par défaut

Simply load like a regular plugin, i.e.:

```shell
zi light z-shell/z-a-default-ice
```

## Utilisation avec [ZI][z-shell/zi]

```shell showLineNumbers
zi default-ice lucid from "gh-r"

# Téléchargera depuis gh-r et utilisera également la glace lucid par défaut.
zi wait for \
  sbin        junegunn/fzf-bin \
  sbin"**/pk" peco/peco
```

:::caution

La glace `wait''` ne peut pas être rendue par défaut en utilisant cette sous-commande.

:::

[z-shell/z-a-default-ice]: https://github.com/z-shell/z-a-default-ice
[z-shell/zi]: https://github.com/z-shell/zi
