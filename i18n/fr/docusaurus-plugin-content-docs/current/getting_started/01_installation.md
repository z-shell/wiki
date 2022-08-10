---
id: installation
title: "⚡️ Installation"
sidebar_position: 1
image: /img/logo/320x320.png
description: Installation Guide
keywords:
  - configuration
  - quick-start
  - installation
---

<!-- @format -->

## <i class="fas fa-spinner fa-spin"></i> Installation Rapide {#quick-setup}

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

## <i class="fas fa-spinner fa-spin"></i> Installation automatique

:::tip

- Verify `sha256` [checksum][checksum] for file: `lib/sh/install.sh`
- If required append `-b <tag>` or `-b <branch>` e.g:

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

### <i class="fa-solid fa-code-branch"></i> Minimal configuration + <a href="/ecosystem/annexes/overview">annexes</a>

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a annex
```

### <i class="fa-solid fa-code-fork"></i> Minimal configuration + <a href="/ecosystem/annexes/overview">annexes</a> + <a href="https://github.com/zdharma/zunit">zdharma/zunit</a>

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a zunit
```

### <i class="fa-solid fa-gears"></i> Configuration minimale avec le chargeur

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

Le chargeur peut être récupéré manuellement à partir des liens disponibles [](#loader) à n'importe quel emplacement sur le système, et extrait de `.zshrc` ou comme indiqué dans l'[installation rapide](#quick-setup).

:::

Then reload shell with: `exec zsh`. All done!

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

Définition de l'utilisateur actuel en tant que propriétaire des répertoires, puis suppression des autorisations d'écriture du groupe/d'autres:

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

### <i class="fa-solid fa-circle-nodes"></i> Activer la complétion {#enable-completions}

:::info

The next two lines must be below the above two:

:::

```shell showLineNumbers
autoload -Uz _zi
(( ${+_comps} )) && _comps[zi]=_zi
```

## <i class="fas fa-spinner fa-spin"></i> Post-installation

After a fresh install, recommended to reload the shell with `exec zsh` and compile Zi with `zi self-update`. Exécutez `zi -h` pour voir toutes les commandes disponibles. Increase Zi functionality, and performance, or get started by exploring the wiki.

If you have any issue or need help 🤦‍♂️, lets [discuss][7] it or open an [issue][6] in any language.

Cela nous aide à améliorer et à améliorer Zi. Don't forget to help the project: share, contribute, or [translate][8] 🌐 🥰 🤓.

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

### <i class="fa-brands fa-docker"></i> Turbo Zi dans Docker

Si vous créez une image Docker qui utilise Zi, installez les plug-ins chargés par Turbo avant que le shell ne démarre de manière interactive, avec la fonction `@zi-scheduler` de telle manière qu'elle:

- installs plugins without waiting for the prompt (i.e. it's script friendly),
- installs all plugins instantly, without respecting the wait'' argument.

To accomplish this, use burst argument and call the `@zi-scheduler` function:

```docker
RUN zsh -i -c -- '@zi-scheduler burst || true'
```

> - An example: [Dockerfile][11]
> - In action: [Dockerfile][12]

## <i class="fas fa-cog fa-pulse"></i> Construire un module Zi

### <i class="fa-solid fa-compass-drafting"></i> Sans Zi

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a zpmod
```

### <i class="fa-solid fa-screwdriver-wrench"></i> Avec Zi

:::info

Zi doit être installé pour construire le module. Module repository: [z-shell/zpmod][9]

:::

```shell
zi module build
```

Pour activer les messages de débogage à partir de l'ensemble de modules:

```shell
typeset -g ZI_MOD_DEBUG=1
```

## <i class="fas fa-sync-alt fa-spin"></i> Liens disponibles

[Page d'état: :heavy_check_mark:][10]

### Installateur

| Service                       | URL                                                                       |
|:----------------------------- | ------------------------------------------------------------------------- |
| [Redirection][get.zshell.dev] | <https://get.zshell.dev>                                                  |
| [IPFS][ipfs.io]               | <https://ipfs.zshell.dev/sh/install.sh>                                   |
| [Direct][direct-install]      | <https://raw.githubusercontent.com/z-shell/zi-src/main/lib/sh/install.sh> |

### Chargeur

| Service                        | URL                                                                      |
|:------------------------------ | ------------------------------------------------------------------------ |
| [Redirection][init.zshell.dev] | <https://init.zshell.dev>                                                |
| [IPFS][ipfs.io]                | <https://ipfs.zshell.dev/zsh/init.zsh>                                   |
| [Direct][direct-init]          | <https://raw.githubusercontent.com/z-shell/zi-src/main/lib/zsh/init.zsh> |

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
