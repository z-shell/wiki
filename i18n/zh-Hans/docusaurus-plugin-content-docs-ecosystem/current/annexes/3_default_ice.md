---
id: default-ice
title: '🌀 Default Ice'
image: img/logo/320x320.png
description: Annex - Default Ice documentation
keywords:
  - ice
  - annex
  - zannex
  - default-ice
---

<!-- @format -->

## <i class="fa-brands fa-github"></i> [z-shell/z-a-default-ice][]

An annex delivers the capability to set **default ices** for the next `zi` command. It adds subcommand: **default-ice** which has the following synopsis:

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

## Install Default Ice

Simply load like a regular plugin, i.e.:

```shell
zi light z-shell/z-a-default-ice
```

## Usage with [ZI][z-shell/zi]

```shell showLineNumbers
zi default-ice lucid from"gh-r"

# Will download from gh-r and also use the lucid ice by default.
zi wait for \
  sbin        junegunn/fzf-bin \
  sbin"**/pk" peco/peco
```

:::caution

The `wait''` ice cannot be made default by using this subcommand.

:::

[z-shell/z-a-default-ice]: https://github.com/z-shell/z-a-default-ice
[z-shell/zi]: https://github.com/z-shell/zi
