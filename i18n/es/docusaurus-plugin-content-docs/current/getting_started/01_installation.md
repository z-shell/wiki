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

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@docusaurus/Link';

## <i class="fas fa-spinner fa-spin"></i> Quick setup {#quick-setup}

Add the following snippet in the `.zshrc` file:

<Tabs>
  <TabItem value="instant-source" label="Instant" default>

```shell title="~/.zshrc"
source <(curl -sL https://git.io/zi-loader); zzinit
```

  </TabItem>
  <TabItem value="verified-source" label="Verified">

Verify the sha256 [checksum][] for a file: `lib/zsh/init.zsh`:

```shell showLineNumbers title="~/.zshrc"
local cs_ok='7fab1ecb8d2ffbdb4aa98dd1e51cebaeaa4d8137e1de11938f3e0df24af262bb'
local cs=$(sha256sum <(curl -sL 'https://git.io/zi-loader') | awk '{print $1}')
[[ $cs_ok == $cs ]] && { source <(curl -sL 'https://git.io/zi-loader'); zzinit; } || {
  print -P "%F{160}▓▒░ Houston, we have a problem, the %F{226}$cs%F{160} do not match\!%f%b"; exit 1
}
```

  </TabItem>
</Tabs>

Reload shell with `exec zsh` and run `zi -h` for usage information.

## <i class="fas fa-spinner fa-spin"></i> Automated setup {#automated-setup}

:::tip

- Verify the sha256 [checksum][] for file: `lib/sh/install.sh`
- If required append `-b <tag>` or `-b <branch>` e.g:

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -i skip -b main
```

:::

<Tabs>
  <TabItem value="minimal" label="Minimal" default>

Install and include minimal configuration to the `.zshrc`:

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" --
```

  </TabItem>
  <TabItem value="repository" label="Repository">

Install repository or update if already exists, if [custom path][customizing-paths] is not set, then will try to install it in the following order:

1. `$HOME/.zi`
2. `$ZDOTDIR/.zi`
3. `$XDG_DATA_HOME/.zi`

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -i skip
```

  </TabItem>
  <TabItem value="minimal-annexes" label="Annex">

Install and include minimal configuration with recommended [annexes][]:

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a annex
```

  </TabItem>
  <TabItem value="minimal-zunit" label="ZUnit">

Install and include minimal configuration with recommended [annexes][] and setup [zdharma/zunit][]:

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a zunit
```

  </TabItem>
  <TabItem value="minimal-loader" label="Loader">

Install and include minimal configuration with [loader](#loader):

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

  </TabItem>
</Tabs>

## <i class="fas fa-spinner fa-spin"></i> Manual Setup {#manual-setup}

:::tip Related

- [🏗 Preferences & Configuration][customization]

:::

Set up install location and create a directory:

```shell showLineNumbers
typeset -Ag ZI
export ZI[HOME_DIR]="${HOME}/.zi"
export ZI[BIN_DIR]="${ZI[HOME_DIR]}/bin"
command mkdir -p "$ZI[BIN_DIR]"
```

For security reasons run function `compaudit` to check if the [completion system][completion-system] would use files not owned by `root` or by the current `user`, or files in directories that are `world` or `group-writable`.

If failed, then set the current user as the owner of directories, then remove group/others write permissions, and clone the repository:

```shell showLineNumbers
compaudit | xargs chown -R "$(whoami)" "$ZI[HOME_DIR]"
compaudit | xargs chmod -R go-w "$ZI[HOME_DIR]"
command git clone https://github.com/z-shell/zi.git "$ZI[BIN_DIR]"
```

To enable Zi, source the `zi.zsh` from the previously set up directory placing the following snippet in the `.zshrc` file:

```shell title="~/.zshrc" showLineNumbers
typeset -A ZI
ZI[BIN_DIR]="${HOME}/.zi/bin"
source "${ZI[BIN_DIR]}/zi.zsh"
```

:::caution

The two lines below must be placed after the lines above, i.e. after enabling Zi.

:::

Enable Zi completions:

```shell title="~/.zshrc" showLineNumbers
autoload -Uz _zi
(( ${+_comps} )) && _comps[zi]=_zi
```

## <i class="fas fa-spinner fa-spin"></i> Post-install {#post-install}

After a fresh install, recommended to reload the shell with `exec zsh` and compile Zi with `zi self-update`. Run `zi -h` to see all available commands. Increase Zi functionality, and performance, or get started by exploring the wiki.

If you have any issue or need help 🤦‍♂️, lets [discuss][] it or open an [issue][] in any language.

It helps us to improve and make Zi better. Don't forget to help the project: share, contribute, or [translate][] 🌐 🥰 🤓.

Let's glue everything together to create a toolchain that works for us 🚀.

## <i class="fas fa-sync-alt fa-spin"></i> Have ideas?

### <i class="fa-solid fa-list-check"></i>&nbsp;Suggest or request at&nbsp;<Link href="https://github.com/z-shell/playground">playground</Link>

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a ???
```

## <i class="fas fa-sync-alt fa-spin"></i>&nbsp;Need warm-up?

### <i class="fa-brands fa-docker"></i>&nbsp;<Link href="https://github.com/z-shell/zd/pkgs/container/zd">Docker Alpine</Link>

```shell
docker run --rm -it ghcr.io/z-shell/zd:latest
```

### <i class="fa-brands fa-docker"></i> Turbo Zi in Docker

If you create a Docker image that uses Zi, install Turbo-loaded plugins before the shell starts interactively, with the `@zi-scheduler` function in such a way, that it:

- Install plugins without waiting for the prompt (i.e. it's script friendly).
- Install all plugins instantly, without respecting the `wait` argument.

To accomplish this, use burst argument and call the `@zi-scheduler` function:

```docker
RUN zsh -i -c -- '@zi-scheduler burst || true'
```

> - An example: [Dockerfile][]
> - In action: [Playground][]

## <i class="fas fa-cog fa-pulse"></i> Zi Module: [zpmod][z-shell/zpmod] {#zi-module}

:::info

- Required Zsh version: >= v5.8.0
- <i className="fa-brands fa-github"></i>&nbsp;<Link href="https://github.com/z-shell/zpmod">z-shell/zpmod</Link>

:::

<Tabs>
  <TabItem value="with-zi" label="With Zi" default>

Usage:

```shell showLineNumbers
zi module {build|info|help} [options]
zi module build [--clean]
zi module info [--link]
```

- To start using the Zi Zsh module run: `zi module build`. Append `--clean` to run `make distclean`.
- To display the instructions on loading the module, run: `zi module info`.

To enable debug messages from the module set:

```shell
typeset -g ZI_MOD_DEBUG=1
```

</TabItem>
  <TabItem value="standalone" label="Standalone">

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a zpmod
```

  </TabItem>
</Tabs>

## <i class="fas fa-sync-alt fa-spin"></i> Available links {#available-links}

[Status page: ☑️][status]

### <i class="fa-solid fa-gear"></i> Installer {#installer}

<div className="apitable">

| Service                    | URL                                                                       |
| :------------------------- | ------------------------------------------------------------------------- |
| [Redirect][get.zshell.dev] | <https:>                                                  |
| [IPFS][ipfs.io]            | <https:>                                   |
| [Direct][direct-install]   | <https:> |

</div>

### <i class="fa-brands fa-superpowers"></i> Loader {#loader}

<div className="apitable">

| Service                     | URL                                                                      |
| :-------------------------- | ------------------------------------------------------------------------ |
| [Redirect][init.zshell.dev] | <https:>                                                |
| [IPFS][ipfs.io]             | <https:>                                   |
| [Direct][direct-init]       | <https:> |

</div>

<!-- end-of-file -->
<!-- links -->



<!-- external -->

[customization]: /docs/guides/customization

[checksum]: https://raw.githubusercontent.com/z-shell/zi-src/main/lib/checksum.txt
[completion-system]: https://zsh.sourceforge.io/Doc/Release/Completion-System.html#Use-of-compinit
[discuss]: https://github.com/orgs/z-shell/discussions/new
[Dockerfile]: https://github.com/robobenklein/configs/blob/master/Dockerfile
[issue]: https://github.com/z-shell/zi/issues/new/choose
[Playground]: https://github.com/z-shell/playground
[status]: https://status.zshell.dev
[translate]: https://digitalclouds.crowdin.com/z-shell
[z-shell/zpmod]: https://github.com/z-shell/zpmod
