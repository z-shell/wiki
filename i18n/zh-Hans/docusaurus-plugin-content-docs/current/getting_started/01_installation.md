---
title: '⚡️ 安装'
sidebar_position: 1
image: zw/logo/320x320.png
description: 安装指南
keywords:
  - installation
  - setup
---

## 可用的安装源

[![⚙️ 安装库][1]][2] | [Status page: :heavy_check_mark:](https://digitalclouds.dev/status)

| 域名                  | URL                                                                       |
|:------------------- | ------------------------------------------------------------------------- |
| [Git.io][3]:        | <https://git.io/get-zi>                                                   |
| [GitHub][4]:        | <https://z-shell.pages.dev/i-hub>                                         |
| [GitLab Mirror][5]: | <https://z-shell.pages.dev/i-lab>                                         |
| [Direct][6]:        | <https://raw.githubusercontent.com/z-shell/zi-src/main/lib/sh/install.sh> |

- 如果你遇到了任何问题，请发起 [issue][7]。
- 协助我们[翻译](https://digitalclouds.crowdin.com/z-shell).

## 快速安装

Add minimal configuration:

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" --
```

跳过配置。 只克隆或更新仓库。

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -i skip
```

最小化配置 + annexes。

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a annex
```

最小化配置 + annexes + zunit。

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a zunit
```

最小化配置以及 loader。

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a loader
```

推荐将你的 .zshrc 配置保存至：<https://github.com/z-shell/playground>

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a ???
```

:::tip

如果需要，可以添加 `-b <tag>` 或 `-b <branch>`，例如:

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -i skip -b main
```

:::

## 手动安装

克隆仓库

```shell
zi_home="${HOME}/.zi" && mkdir -p $zi_home
git clone https://github.com/z-shell/zi.git "${zi_home}/bin"
```

在 `.zshrc` 中 source `zi.zsh`。

```shell
zi_home="${HOME}/.zi"
source "${zi_home}/bin/zi.zsh"
```

以下代码需要紧跟上方代码。

```shell
autoload -Uz _zi
(( ${+_comps} )) && _comps[zi]=_zi
```

## 安装完毕

通过 `exec zsh` 重载 shell，通过 `zi self-update` 编译 ZI。

> - 需要贡献者：[Gitee.com/z-shell](https://gitee.com/z-shell)。
> - 加入 [/r/gitee](https://www.reddit.com/r/gitee/) 或者在 GitHub 上[发起讨论](https://github.com/z-shell/zi/discussions/new)。

[1]: https://github.com/z-shell/zi-src/actions/workflows/check-sh.yml/badge.svg?branch=main
[2]: https://github.com/z-shell/zi-src/actions/workflows/check-sh.yml
[3]: https://git.io/get-zi
[4]: https://z.digitalclouds.dev/i-hub
[5]: https://z.digitalclouds.dev/i-lab
[6]: https://raw.githubusercontent.com/z-shell/zi-src/main/lib/sh/install.sh
[7]: https://github.com/z-shell/zi/issues/new/choose
