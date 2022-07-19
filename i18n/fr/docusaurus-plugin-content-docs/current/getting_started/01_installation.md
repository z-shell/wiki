---
title: "⚡️ Installation"
sidebar_position: 1
image: img/logo/320x320.png
description: Guide d'installation
keywords:
  - configuration
  - quick-start
  - installation
---

## <i class="fas fa-spinner fa-spin"></i> Quick setup {#quick-setup}

```shell title="~/.zshrc"
source <(curl -sL https://git.io/zi-loader); zzinit
```

Rechargez le shell avec `exec zsh` et exécutez `zi -h` pour obtenir des informations sur l'utilisation.

## <i class="fas fa-spinner fa-spin"></i> Installation automatique

:::tip

Si nécessaire, ajoutez `-b <tag>` ou `-b <branch>` par ex :

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -i skip -b main
```

:::

### <i class="fa-solid fa-code"></i> Configuration minimale

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" --
```

### <i class="fa-solid fa-code-compare"></i> Mise à jour / installation du référentiel uniquement

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -i skip
```

### <i class="fa-solid fa-code-branch"></i> Configuration minimale + <a href="/ecosystem/annexes">annexes</a>

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a annex
```

### <i class="fa-solid fa-code-fork"></i> Configuration minimale + <a href="/ecosystem/annexes">annexes</a> + <a href="https://github.com/zdharma/zunit">zdharma/zunit</a>

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a zunit
```

### <i class="fa-solid fa-gears"></i> Configuration minimale avec le chargeur

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a loader
```

Le programme d'installation téléchargera le chargeur et ajoutera le snippet ci-dessous au fichier `.zshrc`.

```shell showLineNumbers
if [[ -r "${XDG_CONFIG_HOME:-${HOME}/.config}/zi/init.zsh" ]]; then
  source "${XDG_CONFIG_HOME:-${HOME}/.config}/zi/init.zsh" && zzinit
fi
```

:::tip

The loader can be manually fetched from available [links](#loader) to any location on the system, and sourced from `.zshrc` or as shown in the [quick-setup](#quick-setup).

:::

Ensuite, rechargez le shell avec : `exec zsh`. Terminé !

## <i class="fas fa-spinner fa-spin"></i> Configuration manuelle

### <i class="fa-solid fa-code-branch"></i> Configuration

:::tip Voir aussi

- [🏗 Preferences & Configuration][13]

:::

```shell showLineNumbers
typeset -Ag ZI
export ZI[HOME_DIR]="${HOME}/.zi"
export ZI[BIN_DIR]="${ZI[HOME_DIR]}/bin"
command mkdir -p "$ZI[BIN_DIR]"
```

### <i class="fa-brands fa-git-alt"></i> Cloner le dépôt

Setting the current user as the owner of directories, then removing group/others write permissions:

```shell
compaudit | xargs chown -R "$(whoami)" "$ZI[HOME_DIR]"
compaudit | xargs chmod -R go-w "$ZI[HOME_DIR]"
command git clone https://github.com/z-shell/zi.git "$ZI[BIN_DIR]"
```

### <i class="fa-solid fa-circle-nodes"></i> Activer ZI

Source `zi.zsh` in your `.zshrc` from previously created directory:

```shell showLineNumbers
typeset -A ZI
ZI[BIN_DIR]="${HOME}/.zi/bin"
source "${ZI[BIN_DIR]}/zi.zsh"
```

### <i class="fa-solid fa-circle-nodes"></i> Activer la complétion {#enable-completions}

:::info

The next two lines must be below the above two:

:::

```shell showLineNumbers
autoload -Uz _zi
(( ${+_comps} )) && _comps[zi]=_zi
```

## <i class="fas fa-spinner fa-spin"></i> Post-installation

After a fresh install, recommended to reload the shell with `exec zsh` and compile ZI with `zi self-update`. Run `zi -h` to see all available commands. Increase ZI functionality, performance or get started by exploring the wiki.

If you have any issue or need help 🤦‍♂️, lets [discuss][7] it or open an [issue][6] in any language.

It helps us to improve and make ZI better. Don't forget to help the project: share, contribute, or [translate][8] 🌐 🥰 🤓.

Let's glue everything together to create a toolchain that works for US 🚀.

## <i class="fas fa-sync-alt fa-spin"></i> Vous avez des idées ?

### <i class="fa-solid fa-list-check"></i> Proposez votre configuration : <a href="https://github.com/z-shell/playground">z-shell/playground</a>

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a ???
```

## <i class="fas fa-sync-alt fa-spin"></i> Besoin d'un échauffement ?

### <i class="fa-brands fa-docker"></i> <a href="https://github.com/z-shell/zd/pkgs/container/zd">Docker Alpine</a>

```shell
docker run --rm -it ghcr.io/z-shell/zd:latest
```

### <i class="fa-brands fa-docker"></i> Turbo ZI dans Docker

If you create a Docker image that uses ZI, install Turbo-loaded plugins before the shell starts interactively, with the `@zi-scheduler` function in such a way, that it:

- installe les plugins sans attendre l'invite (c'est-à-dire qu'il est compatible avec les scripts),
- installe tous les plugins instantanément, sans respecter l'argument ''attendre''.

To accomplish this, use burst argument and call `@zi-scheduler` function:

```docker
RUN zsh -i -c -- '@zi-scheduler burst || true'
```

> - Un exemple : [Dockerfile][11]
> - En action : [Dockerfile][12]

## <i class="fas fa-cog fa-pulse"></i> Construire un module ZI

### <i class="fa-solid fa-compass-drafting"></i> Sans ZI

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a zpmod
```

### <i class="fa-solid fa-screwdriver-wrench"></i> Avec ZI

:::info

ZI has to be installed to build the module. Module repository: [z-shell/zpmod][9]

:::

```shell
zi module build
```

To enable debug messages from the module set:

```shell
typeset -g ZI_MOD_DEBUG=1
```

## <i class="fas fa-sync-alt fa-spin"></i> Liens disponibles

[Status page: :heavy_check_mark:][10]

### Installateur

| Service                    | URL                                                                       |
|:-------------------------- | ------------------------------------------------------------------------- |
| [Redirect][get.zshell.dev] | <https://get.zshell.dev>                                                  |
| [IPFS][ipfs.io]            | <https://ipfs.zshell.dev/sh/install.sh>                                   |
| [Direct][direct-install]   | <https://raw.githubusercontent.com/z-shell/zi-src/main/lib/sh/install.sh> |

### Chargeur

| Service                     | URL                                                                      |
|:--------------------------- | ------------------------------------------------------------------------ |
| [Redirect][init.zshell.dev] | <https://init.zshell.dev>                                                |
| [IPFS][ipfs.io]             | <https://ipfs.zshell.dev/zsh/init.zsh>                                   |
| [Direct][direct-init]       | <https://raw.githubusercontent.com/z-shell/zi-src/main/lib/zsh/init.zsh> |

[get.zshell.dev]: https://get.zshell.dev
[ipfs.io]: https://ipfs.io
[init.zshell.dev]: https://init.zshell.dev
[direct-init]: https://raw.githubusercontent.com/z-shell/zi-src/main/lib/zsh/init.zsh
[direct-install]: https://raw.githubusercontent.com/z-shell/zi-src/main/lib/sh/install.sh
[6]: https://github.com/z-shell/zi/issues/new/choose
[7]: https://github.com/orgs/z-shell/discussions/new
[8]: https://digitalclouds.crowdin.com/z-shell
[9]: https://github.com/z-shell/zpmod
[10]: https://status.zshell.dev
[11]: https://github.com/robobenklein/configs/blob/master/Dockerfile
[12]: https://github.com/z-shell/playground
[13]: /docs/guides/customization
