---
id: submods
title: "🌀 Submods"
image: img/logo/320x320.png
description: Annexe-Documentation des sous-modules.
keywords:
  - annex
  - zannex
  - submods
---

<!-- @format -->

## <i class="fa-brands fa-github"></i> [z-shell/z-a-submods][]

Une annexe offre la possibilité de cloner des sous-modules supplémentaires tout en installant un plugin ou un snippet. Les sous-modules sont alors automatiquement mis à jour sur la commande `zi update …` .

This annex adds `submods'…'` ice to Zi which has the following syntax:

```shell
submods'{user}/{plugin} -> {output directory}; …'
```

An example command utilizing the annex and its ice:

> Load zsh-autosuggestions plugin via Prezto module: autosuggestions

```shell showLineNumbers
zi ice svn submods'zsh-users/zsh-autosuggestions -> external'
zi snippet PZT::modules/autosuggestions
```

## Installer les Submods

Il suffit de le charger comme un plugin. The following command will install the annex within Zi:

```shell
zi light z-shell/z-a-submods
```

Après avoir exécuté cette commande, vous pouvez alors utiliser la glace `submods''` . La commande doit être placée dans `~/.zshrc`.

[z-shell/z-a-submods]: https://github.com/z-shell/z-a-submods
