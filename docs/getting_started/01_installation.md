---
title: '⚡️ Installation'
sidebar_position: 1
image: img/logo/320x320.png
description: Installation Guide
keywords:
  - installation
  - setup
---

## <i class="fas fa-spinner fa-spin"></i> Quick setup

:::tip

If required append `-b <tag>` or `-b <branch>` e.g:

```shell
sh -c "$(curl -fsSL https://zsh.pages.dev/i)" -- -i skip -b main
```

:::

Add minimal configuration:

```shell
sh -c "$(curl -fsSL https://zsh.pages.dev/i)" --
```

Skip configuration. Just clone or update repository:

```shell
sh -c "$(curl -fsSL https://zsh.pages.dev/i)" -- -i skip
```

Minimal configuration + annexes:

```shell
sh -c "$(curl -fsSL https://zsh.pages.dev/i)" -- -a annex
```

Minimal configuration + annexes + zunit:

```shell
sh -c "$(curl -fsSL https://zsh.pages.dev/i)" -- -a zunit
```

Minimal configuration with loader:

```shell
sh -c "$(curl -fsSL https://zsh.pages.dev/i)" -- -a loader
```

The default location for loader: `$HOME/.config/zi`.
The loader is automatically added by the installer unless conflicting commands are detected in the `.zshrc` file, the installer will skip it and the snippet have to be added manually.

```shell
if [[ -r "${XDG_CONFIG_HOME:-$HOME/.config}/zi/init.zsh" ]]; then
  source "${XDG_CONFIG_HOME:-$HOME/.config}/zi/init.zsh" && zzinit
fi
```

:::tip

The loader can be manually fetched from `https://github.com/z-shell/zi-src/blob/main/lib/zsh/init.zsh` to any location on the system, and sourced from `.zshrc`.

:::

Then reload shell with: `exec zsh`. All done!

## <i class="fas fa-cog fa-pulse"></i> Build module

Without ZI:

```shell
sh -c "$(curl -fsSL https://zsh.pages.dev/i)" -- -a zpmod
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

## <i class="fas fa-spinner fa-spin"></i> Manual install

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

The next two lines must be below the above two:

:::

```shell
autoload -Uz _zi
(( ${+_comps} )) && _comps[zi]=_zi
```

## <i class="fas fa-spinner fa-spin"></i> Post-install

After a fresh install, recommended to reload the shell with `exec zsh` and compile ZI with `zi self-update`.
Run `zi -h` to see all available commands. Increase ZI functionality, performance or get started by exploring the wiki.

If you have any issue or need help 🤦‍♂️, lets [discuss][9] it or open an [issue][7] in any language. It helps us to improve and make ZI better.
Don't forget to help the project: share, contribute, or [translate][10] 🌐 🥰 🤓.

Let's glue everything together to create a toolchain that works for us and not against us 🚀.

## <i class="fas fa-sync-alt fa-spin"></i> Have ideas?

Suggest your .zshrc configuration to: <https://github.com/z-shell/playground> 🏅

```shell
sh -c "$(curl -fsSL https://zsh.pages.dev/i)" -- -a ???
```

## <i class="fas fa-sync-alt fa-spin"></i> Need warm-up?

Minimal ZI - 🐋 Docker Alpine: <https://github.com/z-shell/zd/pkgs/container/zd>

```shell
docker run --rm -it ghcr.io/z-shell/zd:latest
```

## <i class="fas fa-sync-alt fa-spin"></i> Turbo ZI in Docker

If you create a Docker image that uses ZI, install Turbo-loaded plugins before the shell starts interactively, with the `@zi-scheduler` function in such a way, that it:

- installs plugins without waiting for the prompt (i.e. it's script friendly),
- installs all plugins instantly, without respecting the wait'' argument.

To accomplish this, use burst argument and call `@zi-scheduler` function:

```sh
RUN zsh -i -c -- '@zi-scheduler burst || true'
```

> - An example: [Dockerfile](https://github.com/robobenklein/configs/blob/master/Dockerfile)
> - In action: [Dockerfile](https://github.com/z-shell/playground)

## <i class="fas fa-sync-alt fa-spin"></i> Available installer links

[⚙️ Install Library: :heavy_check_mark:][2] | [Status page: :heavy_check_mark:](https://status.zshell.dev/)

| Service           | URL                                                                       |
| :---------------- | ------------------------------------------------------------------------- |
| [Source][3]:      | <https://src.zshell.dev/i>                                                |
| [Source RAW][12]: | <https://raw.zshell.dev/lib/sh/install.sh>                                |
| [IPFS][11]        | <https://ipfs.zshell.dev/lib/sh/install.sh>                               |
| [Gitee][1]:       | <https://z.digitalclouds.dev/i-tee>                                       |
| [GitHub][4]:      | <https://z.digitalclouds.dev/i-hub>                                       |
| [GitLab][5]:      | <https://z.digitalclouds.dev/i-lab>                                       |
| [Direct][6]:      | <https://raw.githubusercontent.com/z-shell/zi-src/main/lib/sh/install.sh> |

[1]: https://z.digitalclouds.dev/i-tee
[2]: https://github.com/z-shell/zi-src/actions/workflows/check-sh.yml
[3]: https://src.zshell.dev/i
[4]: https://z.digitalclouds.dev/i-hub
[5]: https://z.digitalclouds.dev/i-lab
[6]: https://raw.githubusercontent.com/z-shell/zi-src/main/lib/sh/install.sh
[7]: https://github.com/z-shell/zi/issues/new/choose
[8]: https://github.com/z-shell/zpmod
[9]: https://github.com/orgs/z-shell/discussions/new
[10]: https://digitalclouds.crowdin.com/z-shell
[11]: https://ipfs.io
[12]: https://raw.zshell.dev/lib/sh/install.sh
