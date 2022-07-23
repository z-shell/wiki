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

<!-- @format -->

## <i class="fas fa-spinner fa-spin"></i> Installation Rapide {#quick-setup}

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

Le chargeur peut être récupéré manuellement à partir des liens disponibles [](#loader) à n'importe quel emplacement sur le système, et extrait de `.zshrc` ou comme indiqué dans l'[installation rapide](#quick-setup).

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

Définir l'utilisateur actuel comme propriétaire des répertoires, puis supprimer les droits d'écriture des groupes/autres :

```shell
compaudit | xargs chown -R "$(whoami)" "$ZI[HOME_DIR]"
compaudit | xargs chmod -R go-w "$ZI[HOME_DIR]"
command git clone https://github.com/z-shell/zi.git "$ZI[BIN_DIR]"
```

### <i class="fa-solid fa-circle-nodes"></i> Activer ZI

Sourcez `zi.zsh` dans votre `.zshrc` à partir du répertoire créé précédemment :

```shell showLineNumbers
typeset -A ZI
ZI[BIN_DIR]="${HOME}/.zi/bin"
source "${ZI[BIN_DIR]}/zi.zsh"
```

### <i class="fa-solid fa-circle-nodes"></i> Activer la complétion {#enable-completions}

:::info

Les deux lignes suivantes doivent être en dessous des deux précédentes :

:::

```shell showLineNumbers
autoload -Uz _zi
(( ${+_comps} )) && _comps[zi]=_zi
```

## <i class="fas fa-spinner fa-spin"></i> Post-installation

Après une nouvelle installation, il est recommandé de recharger le shell avec `exec zsh` et de compiler ZI avec `zi self-update`. Exécutez `zi -h` pour voir toutes les commandes disponibles. Augmentez les fonctionnalités et les performances de ZI ou commencez par explorer le wiki.

Si vous avez un problème ou avez besoin d'aide 🤦‍♂️, [discuter ][7] ou ouvrez un [problème][6] dans n'importe quelle langue.

Cela nous aide à améliorer et à améliorer ZI. N'oubliez pas d'aider le projet : partagez, contribuez, ou [traduisez][8] 🌐 🥰 🤓.

Collons tout ensemble pour créer une chaîne d'outils qui fonctionne pour NOUS 🚀.

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

Si vous créez une image Docker qui utilise ZI, installez les plugins Turbo-loaded avant que le shell ne démarre de manière interactive, avec la fonction `@zi-scheduler` de telle manière, qu'il :

- installe les plugins sans attendre l'invite (c'est-à-dire qu'il est compatible avec les scripts),
- installe tous les plugins instantanément, sans respecter l'argument ''attendre''.

Pour ce faire, utilisez l'argument burst et appelez la fonction `@zi-scheduler` :

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

ZI doit être installé pour construire le module. Dépôt de modules : [z-shell/zpmod][9]

:::

```shell
zi module build
```

Pour activer les messages de débogage de l'ensemble de modules :

```shell
typeset -g ZI_MOD_DEBUG=1
```

## <i class="fas fa-sync-alt fa-spin"></i> Liens disponibles

[Page de statut : :heavy_check_mark:][10]

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
