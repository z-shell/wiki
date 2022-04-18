---
title: '⚡️ Installation'
sidebar_position: 1
image: img/logo/320x320.png
description: Installation Guide
keywords:
  - installation
  - setup
---

## ☑️ <i class="fas fa-spinner fa-spin"></i> Quick setup

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

Then reload shell with: `exec zsh`, verify it: `zi -h`. All done!

## 🏗️  <i class="fas fa-cog fa-pulse"></i> Build module

Without ZI:

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a zpmod
```

With ZI:

:::info

ZI has to be installed to build the module.
Module repository: [z-shell/zpmod][8]

:::

```shell
zi module build
```

To enable debug messages from the module set:

```shell
typeset -g ZI_MOD_DEBUG=1
```

## 😎 <i class="fas fa-spinner fa-spin"></i> Manual installation

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

## 🔛 <i class="fas fa-spinner fa-spin"></i> Post-install

After fresh install it is recommended to reload the shell with `exec zsh` and compile ZI with `zi self-update`.
Run `zi -h` before start using ZI, it will show you all available commands. To increase functionality or performance explore the wiki.

If you have any issue or need help 🤦‍♂️, lets [discuss][9] it or open an [issue][7] in any language. It help us to improve and make ZI better.
Don't forget to help the project: share,contribute or [translate][10] 🌐 🥰 🤓.

Let's glue everything together to create a toolchain that works for us and not against us 🚀.

## 💡 <i class="fas fa-sync-alt fa-spin"></i> Have ideas?

Suggest your .zshrc configuration to: <https://github.com/z-shell/playground> 🏅

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a ???
```

## 💫 <i class="fas fa-sync-alt fa-spin"></i> Need warm-up?

Minimal ZI - 🐋 Docker Alpine: <https://github.com/z-shell/zd/pkgs/container/zd>

```shell
docker run --rm -it ghcr.io/z-shell/zd:latest
```

## 🌍 <i class="fas fa-sync-alt fa-spin"></i> Available installer links

[⚙️ Install Library: :heavy_check_mark:][2] | [Status page: :heavy_check_mark:](https://status.zshell.dev/)

| Service             | URL                                                                       |
| :------------------ | ------------------------------------------------------------------------- |
| [IPFS][11]          | <https://src.zshell.dev/sh/install.sh>                                    |
| [Git.io][3]:        | <https://git.io/get-zi>                                                   |
| [Gitee][1]:         | <https://z.digitalclouds.dev/i-tee>                                       |
| [GitHub][4]:        | <https://z.digitalclouds.dev/i-hub>                                       |
| [GitLab Mirror][5]: | <https://z.digitalclouds.dev/i-lab>                                       |
| [Direct][6]:        | <https://raw.githubusercontent.com/z-shell/zi-src/main/lib/sh/install.sh> |

[1]: https://z.digitalclouds.dev/i-tee
[2]: https://github.com/z-shell/zi-src/actions/workflows/check-sh.yml
[3]: https://git.io/get-zi
[4]: https://z.digitalclouds.dev/i-hub
[5]: https://z.digitalclouds.dev/i-lab
[6]: https://raw.githubusercontent.com/z-shell/zi-src/main/lib/sh/install.sh
[7]: https://github.com/z-shell/zi/issues/new/choose
[8]: https://github.com/z-shell/zpmod
[9]: https://github.com/orgs/z-shell/discussions/new
[10]: https://digitalclouds.crowdin.com/z-shell
[11]: https://ipfs.io
