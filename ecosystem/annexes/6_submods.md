---
id: submods
title: 🌀 Submods
image: img/logo/320x320.png
description: Annex - Submods documentation.
keywords:
  - annex
  - zannex
  - submods
---

## <i class="fa-brands fa-github"></i> [z-shell/z-a-submods][]

An annex delivers the capability to clone additional submodules while installing a plugin or snippet. The submodules are then automatically updated on the `zi update …` command.

This annex adds `submods''` ice to ZI which has the following syntax:

```shell
submods'{user}/{plugin} -> {output directory}; …'
```

An example command utilizing the annex and its ice:

> Load zsh-autosuggestions plugin via Prezto module: autosuggestions

```shell showLineNumbers
zi ice svn submods'zsh-users/zsh-autosuggestions -> external'
zi snippet PZT::modules/autosuggestions
```

## Install Submods

Simply load as a plugin. The following command will install the annex within ZI:

```shell
zi light z-shell/z-a-submods
```

After executing this command you can then use the `submods''` ice. The command should be placed in `~/.zshrc`.

[z-shell/z-a-submods]: https://github.com/z-shell/z-a-submods
