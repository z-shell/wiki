---
title: '⚡️ 安装'
sidebar_position: 1
image: img/logo/320x320.png
description: 安装指南
keywords:
  - installation
  - setup
---

## Quick setup

:::tip

If required append `-b <tag>` or `-b <branch>` e.g:

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -i skip -b main
```

:::

Add minimal configuration:

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" --
```

Skip configuration. Just clone or update repository:

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -i skip
```

Minimal configuration + annexes:

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a annex
```

Minimal configuration + annexes + zunit:

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a zunit
```

Minimal configuration with loader:

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a loader
```

## Build module

Without ZI:

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a zpmod
```

With ZI:

:::info

ZI has to be installed to build the module. Module repository: [z-shell/zpmod][8]

:::

```shell
zi module build
```

To enable debug messages from the module set:

```shell
typeset -g ZI_MOD_DEBUG=1
```

## 手动安装

Setup ZI directory:

```shell
zi_home="${HOME}/.zi" && mkdir -p $zi_home
```

Clone repository:

```shell
git clone https://github.com/z-shell/zi.git "${zi_home}/bin"
```

Source `zi.zsh` in your `.zshrc` from previously created directory:

```shell
zi_home="${HOME}/.zi"
source "${zi_home}/bin/zi.zsh"
```

Enable ZI completions:

:::info

Next two lines must be below the above two:

:::

```shell
autoload -Uz _zi
(( ${+_comps} )) && _comps[zi]=_zi
```

## 安装完毕

After fresh install it is recommended to reload the shell with `exec zsh` and compile ZI with `zi self-update`. Run `zi -h` before start using ZI, it will show you all available commands. To increase functionality or performance explore the wiki.

If you have any issue or need help, lets [discuss][9] it or open an [issue][7] in any language. It help us to improve and make ZI better. Also don't forget to contribute or help us [translate][10] 🥰 🤓.

## Have ideas?

Suggest your .zshrc configuration to: <https://github.com/z-shell/playground>

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a ???
```

## Available installer links

[![⚙️ Install Library][5]][2] | [Status page: :heavy_check_mark:](https://status.zshell.dev/)

| 域名              | URL                                                                       |
|:--------------- | ------------------------------------------------------------------------- |
| [Git.io][3]:    | <https://git.io/get-zi>                                                   |
| [GitHub][4]:    | <https://z.digitalclouds.dev/i-hub>                                       |
| [GitLab 镜像][5]: | <https://z.digitalclouds.dev/i-lab>                                       |
| [直链下载][6]:      | <https://raw.githubusercontent.com/z-shell/zi-src/main/lib/sh/install.sh> |

[5]: https://github.com/z-shell/zi-src/actions/workflows/check-sh.yml/badge.svg?branch=main
[2]: https://github.com/z-shell/zi-src/actions/workflows/check-sh.yml
[3]: https://git.io/get-zi
[4]: https://z.digitalclouds.dev/i-hub
[5]: https://z.digitalclouds.dev/i-lab
[6]: https://raw.githubusercontent.com/z-shell/zi-src/main/lib/sh/install.sh
[7]: https://github.com/z-shell/zi/issues/new/choose
[8]: https://github.com/z-shell/zpmod
[9]: https://github.com/orgs/z-shell/discussions/new
[10]: https://digitalclouds.crowdin.com/z-shell
