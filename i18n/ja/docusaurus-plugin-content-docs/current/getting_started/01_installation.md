---
id: installation
title: "⚡️ Installation"
sidebar_position: 1
image: /img/logo/320x320.png
description: Installation Guide
keywords:
  - setup
  - quick-start
  - installation
---

<!-- @format -->

## <i class="fas fa-spinner fa-spin"></i> Quick setup {#quick-setup}

```shell title="~/.zshrc"
source <(curl -sL https://git.io/zi-loader); zzinit
```

Alternatively - update and verify `sha256` [checksum][checksum] for a file: `lib/zsh/init.zsh`:

```shell showLineNumbers title="~/.zshrc"
local chsm_ok='7fab1ecb8d2ffbdb4aa98dd1e51cebaeaa4d8137e1de11938f3e0df24af262bb'
local chsm="$(command curl -fsL 'https://git.io/zi-loader' | sha256sum | awk '{print $1}')"
if [[ ${chsm_ok} == ${chsm} ]]; then
  source <(curl -sL https://git.io/zi-loader); zzinit
else
  print "Houston, we have a problem"; exit 1
fi
```

Reload shell with `exec zsh` and run `zi -h` for usage information.

## <i class="fas fa-spinner fa-spin"></i> Automated setup

:::tip

- Verify `sha256` [checksum][checksum] for file: `lib/sh/install.sh`
- If required append `-b <tag>` or `-b <branch>` e.g:

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -i skip -b main
```

:::

### <i class="fa-solid fa-code"></i> Minimal configuration

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" --
```

### <i class="fa-solid fa-code-compare"></i> Only update / install repository

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -i skip
```

### <i class="fa-solid fa-code-branch"></i> Minimal configuration + <a href="/ecosystem/annexes">annexes</a>

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a annex
```

### <i class="fa-solid fa-code-fork"></i> Minimal configuration + <a href="/ecosystem/annexes">annexes</a> + <a href="https://github.com/zdharma/zunit">zdharma/zunit</a>

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a zunit
```

### <i class="fa-solid fa-gears"></i> Minimal configuration with loader

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a loader
```

The installer will download the loader and add the snippet below to the `.zshrc` file.

```shell showLineNumbers
if [[ -r "${XDG_CONFIG_HOME:-${HOME}/.config}/zi/init.zsh" ]]; then
  source "${XDG_CONFIG_HOME:-${HOME}/.config}/zi/init.zsh" && zzinit
fi
```

:::tip

The loader can be manually fetched from available [links](#loader) to any location on the system, and sourced from `.zshrc` or as shown in the [quick-setup](#quick-setup).

:::

Then reload shell with: `exec zsh`. All done!

## <i class="fas fa-spinner fa-spin"></i> Manual Setup

### <i class="fa-solid fa-code-branch"></i> Setup directory

:::tip Related

- [🏗 Preferences & Configuration][13]

:::

```shell showLineNumbers
typeset -Ag ZI
export ZI[HOME_DIR]="${HOME}/.zi"
export ZI[BIN_DIR]="${ZI[HOME_DIR]}/bin"
command mkdir -p "$ZI[BIN_DIR]"
```

### <i class="fa-brands fa-git-alt"></i> Clone repository

Setting the current user as the owner of directories, then removing group/others write permissions:

```shell
compaudit | xargs chown -R "$(whoami)" "$ZI[HOME_DIR]"
compaudit | xargs chmod -R go-w "$ZI[HOME_DIR]"
command git clone https://github.com/z-shell/zi.git "$ZI[BIN_DIR]"
```

### <i class="fa-solid fa-circle-nodes"></i> Enable Zi

Source `zi.zsh` in your `.zshrc` from the previously created directory:

```shell showLineNumbers
typeset -A ZI
ZI[BIN_DIR]="${HOME}/.zi/bin"
source "${ZI[BIN_DIR]}/zi.zsh"
```

### <i class="fa-solid fa-circle-nodes"></i> Enable completions {#enable-completions}

:::info

The next two lines must be below the above two:

:::

```shell showLineNumbers
autoload -Uz _zi
(( ${+_comps} )) && _comps[zi]=_zi
```

## <i class="fas fa-spinner fa-spin"></i> Post-install

After a fresh install, recommended to reload the shell with `exec zsh` and compile Zi with `zi self-update`. Run `zi -h` to see all available commands. Increase Zi functionality, and performance, or get started by exploring the wiki.

If you have any issue or need help 🤦‍♂️, lets [discuss][7] it or open an [issue][6] in any language.

It helps us to improve and make Zi better. Don't forget to help the project: share, contribute, or [translate][8] 🌐 🥰 🤓.

Let's glue everything together to create a toolchain that works for us 🚀.

## <i class="fas fa-sync-alt fa-spin"></i> Have ideas?

### <i class="fa-solid fa-list-check"></i> Suggest your configuration: <a href="https://github.com/z-shell/playground">z-shell/playground</a>

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a ???
```

## <i class="fas fa-sync-alt fa-spin"></i> Need warm-up?

### <i class="fa-brands fa-docker"></i> <a href="https://github.com/z-shell/zd/pkgs/container/zd">Docker Alpine</a>

```shell
docker run --rm -it ghcr.io/z-shell/zd:latest
```

### <i class="fa-brands fa-docker"></i> Turbo Zi in Docker

If you create a Docker image that uses Zi, install Turbo-loaded plugins before the shell starts interactively, with the `@zi-scheduler` function in such a way, that it:

- installs plugins without waiting for the prompt (i.e. it's script friendly),
- installs all plugins instantly, without respecting the wait'' argument.

To accomplish this, use burst argument and call the `@zi-scheduler` function:

```docker
RUN zsh -i -c -- '@zi-scheduler burst || true'
```

> - An example: [Dockerfile][11]
> - In action: [Dockerfile][12]

## <i class="fas fa-cog fa-pulse"></i> Build Zi Module

### <i class="fa-solid fa-compass-drafting"></i> Without Zi

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a zpmod
```

### <i class="fa-solid fa-screwdriver-wrench"></i> With Zi

:::info

Zi has to be installed to build the module. Module repository: [z-shell/zpmod][9]

:::

```shell
zi module build
```

To enable debug messages from the module set:

```shell
typeset -g ZI_MOD_DEBUG=1
```

## <i class="fas fa-sync-alt fa-spin"></i> Available links

[Status page: :heavy_check_mark:][10]

### Installer

| サービス                       | URL                                                                       |
|:-------------------------- | ------------------------------------------------------------------------- |
| [Redirect][get.zshell.dev] | <https://get.zshell.dev>                                                  |
| [IPFS][ipfs.io]            | <https://ipfs.zshell.dev/sh/install.sh>                                   |
| [Direct][direct-install]   | <https://raw.githubusercontent.com/z-shell/zi-src/main/lib/sh/install.sh> |

### Loader

| サービス                        | URL                                                                      |
|:--------------------------- | ------------------------------------------------------------------------ |
| [Redirect][init.zshell.dev] | <https://init.zshell.dev>                                                |
| [IPFS][ipfs.io]             | <https://ipfs.zshell.dev/zsh/init.zsh>                                   |
| [Direct][direct-init]       | <https://raw.githubusercontent.com/z-shell/zi-src/main/lib/zsh/init.zsh> |

<!-- end-of-file -->
<!-- links -->

[get.zshell.dev]: https://get.zshell.dev
[ipfs.io]: https://ipfs.io
[init.zshell.dev]: https://init.zshell.dev
[direct-init]: https://raw.githubusercontent.com/z-shell/zi-src/main/lib/zsh/init.zsh
[direct-install]: https://raw.githubusercontent.com/z-shell/zi-src/main/lib/sh/install.sh
[checksum]: https://raw.githubusercontent.com/z-shell/zi-src/main/lib/checksum.txt
[6]: https://github.com/z-shell/zi/issues/new/choose
[7]: https://github.com/orgs/z-shell/discussions/new
[8]: https://digitalclouds.crowdin.com/z-shell
[9]: https://github.com/z-shell/zpmod
[10]: https://status.zshell.dev
[11]: https://github.com/robobenklein/configs/blob/master/Dockerfile
[12]: https://github.com/z-shell/playground
[13]: /docs/guides/customization
