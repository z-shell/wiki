---
title: '⚡️ Installation'
sidebar_position: 1
image: zw/logo/320x320.png
description: Installation Guide
keywords:
  - installation
  - setup
---

## Available installer links

[![⚙️ Install Library][1]][2] | [Status page: :heavy_check_mark:](https://https://status.zshell.dev/)

| サービス                | URL                                                                       |
|:------------------- | ------------------------------------------------------------------------- |
| [Git.io][3]:        | <https://git.io/get-zi>                                                   |
| [GitHub][4]:        | <https://z.digitalclouds.dev/i-hub>                                       |
| [GitLab Mirror][5]: | <https://z.digitalclouds.dev/i-lab>                                       |
| [Direct][6]:        | <https://raw.githubusercontent.com/z-shell/zi-src/main/lib/sh/install.sh> |

- インストール時に問題が発生した場合には、こちらに [issue][7] を立てていただけると幸いです。
- [Translate](https://digitalclouds.crowdin.com/z-shell).

## Quick installation

最低限の設定:

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" --
```

Skip configuration. リポジトリのクローンとアップデートのみ:

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -i skip
```

最低限の設定 + annexes:

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a annex
```

最低限の設定 + annexes + zunit:

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a zunit
```

'loader'を使った最低限の設定:

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a loader
```

Suggest your .zshrc configuration to: <https://github.com/z-shell/playground>

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a ???
```

:::tip

If required append `-b <tag>` or `-b <branch>` e.g:

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -i skip -b main
```

:::

## Manual installation

Clone repository:

```shell
zi_home="${HOME}/.zi" && mkdir -p $zi_home
git clone https://github.com/z-shell/zi.git "${zi_home}/bin"
```

Source `zi.zsh` from your `.zshrc`:

```shell
zi_home="${HOME}/.zi"
source "${zi_home}/bin/zi.zsh"
```

Next two lines must be below the above two:

```shell
autoload -Uz _zi
(( ${+_comps} )) && _comps[zi]=_zi
```

## Post-installation

Reload the shell with `exec zsh` and compile ZI with `zi self-update`.

> - Support required: [Gitee.com/z-shell](https://gitee.com/z-shell).
> - Join [/r/gitee](https://www.reddit.com/r/gitee/) or start a [discussion](https://github.com/orgs/z-shell/discussions/new) on GitHub.

[1]: https://github.com/z-shell/zi-src/actions/workflows/check-sh.yml/badge.svg?branch=main
[2]: https://github.com/z-shell/zi-src/actions/workflows/check-sh.yml
[3]: https://git.io/get-zi
[4]: https://z.digitalclouds.dev/i-hub
[5]: https://z.digitalclouds.dev/i-lab
[6]: https://raw.githubusercontent.com/z-shell/zi-src/main/lib/sh/install.sh
[7]: https://github.com/z-shell/zi/issues/new/choose
