---
id: installation
title: ⚡️ Installation
sidebar_position: 1
image: /img/png/theme/z/320x320.png
description: Installation Guide
keywords:
  - install
---

<!-- @format -->

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import Link from '@docusaurus/Link'; import Emoji from '@site/src/components/Emoji';

## <i class="fas fa-spinner fa-spin"></i> Quick setup {#quick-setup}

Add the following snippet in the `.zshrc` file:

<Tabs>
  <TabItem value="instant-source" label="Instant" default>

```shell title="~/.zshrc"
source <(curl -sL init.zshell.dev); zzinit
```

  </TabItem>
  <TabItem value="verified-source" label="Verified">

:::caution

This setup method requires manually verifying the sha256 [checksum][checksum-txt] for a file `lib/zsh/init.zsh` every time the content is changed in the repository.

:::

```shell showLineNumbers title="~/.zshrc"
local cs_ok='7fab1ecb8d2ffbdb4aa98dd1e51cebaeaa4d8137e1de11938f3e0df24af262bb'
local cs_get=$(sha256sum <(curl -sL init.zshell.dev) | awk '{print $1}')
[[ $cs_ok == $cs_get ]] && { source <(curl -sL init.zshell.dev); zzinit; } || {
  print -P "%F{160}▓▒░ Houston, we have a problem, the %F{226}$cs_get%F{160} do not match\!%f%b"; return 1
}
unset cs_ok cs_get
```

  </TabItem>
</Tabs>

Reload the shell with `exec zsh -il` and run `zi -h` for usage information.

## <i class="fas fa-spinner fa-spin"></i> Automated setup {#automated-setup}

:::tip

- Verify the sha256 [checksum][checksum-txt] for file: `lib/sh/install.sh`
- If required append `-b <tag>` or `-b <branch>` e.g:

```shell
sh -c "$(curl -fsSL get.zshell.dev)" -- -i skip -b main
```

:::

<Tabs>
  <TabItem value="minimal" label="Minimal" default>

Install and include minimal configuration to the `.zshrc`:

```shell
sh -c "$(curl -fsSL get.zshell.dev)" --
```

  </TabItem>
  <TabItem value="minimal-loader" label="Loader">

Install and include minimal configuration with [loader](#loader):

```shell
sh -c "$(curl -fsSL get.zshell.dev)" -- -a loader
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

Then reload the shell with: `exec zsh`. All done!

  </TabItem>
  <TabItem value="repository" label="Repository">

Clone repository using default or if set <Link to="/docs/guides/customization#customizing-paths">custom</Link> values:

```shell
sh -c "$(curl -fsSL get.zshell.dev)" -- -i skip
```

  </TabItem>
  <TabItem value="minimal-annexes" label="Annex">

Install and include minimal configuration with recommended <Link to="/ecosystem/annexes/overview">annexes</Link>:

```shell
sh -c "$(curl -fsSL get.zshell.dev)" -- -a annex
```

  </TabItem>
  <TabItem value="minimal-zunit" label="ZUnit">

Install and include minimal configuration with recommended <Link to="/ecosystem/annexes/overview">annexes</Link> and setup <Link href="https://github.com/zdharma/zunit">zdharma/zunit</Link>:

```shell
sh -c "$(curl -fsSL get.zshell.dev)" -- -a zunit
```

  </TabItem>
  </Tabs>

## <i class="fas fa-spinner fa-spin"></i> Manual Setup {#manual-setup}

:::tip Related

- [🏗 Configuration management](/docs/guides/customization#customizing-paths)

:::

Set up the install location and create a directory:

```shell showLineNumbers
typeset -Ag ZI
typeset -gx ZI[HOME_DIR]="${HOME}/.zi" ZI[BIN_DIR]="${ZI[HOME_DIR]}/bin"
command mkdir -p "$ZI[BIN_DIR]"
```

For security reasons run function `compaudit` to check if the [completion system][completion-system] would use files owned by `root` or by the current `user`, or files in directories that are `world` or `group-writable`.

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

After a fresh install, it is recommended to reload the shell with `exec zsh -il` and compile Zi with `zi self-update`. Run `zi -h` to see all available commands. Increase Zi functionality, and performance, or get started by exploring the wiki.

If you have any issue or need help <Emoji symbol="🤦‍♂️" label="man-facepalming"/>, lets [discuss][discuss] it or open an [issue][issue] in any language.

It helps us to improve and make Zi better. Don't forget to help the project: share, contribute, or [translate][translate] <Emoji symbol="🌐" label="globe-with-meridians"/> <Emoji symbol="🥰" label="smiling-face-with-hearts"/> <Emoji symbol="🤓" label="nerd-face"/>.

Let's glue everything together to create a toolchain that works for us <Emoji symbol="🚀" label="rocket"/>.

## <i class="fas fa-sync-alt fa-spin"></i> Have ideas?

### <i class="fa-solid fa-list-check"></i>&nbsp;Suggest or request at&nbsp;<Link href="https://github.com/z-shell/playground">playground</Link>

```shell
sh -c "$(curl -fsSL get.zshell.dev)" -- -a ???
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

> - An example: [Dockerfile][dockerfile]
> - In action: [Playground][playground]

## <i class="fas fa-cog fa-pulse"></i> Zi Module: zpmod {#zi-module}

The module transparently and automatically compiles sourced scripts and lists of all sourced files with the time the sourcing took in milliseconds on the left.

- [⚙️ Plugins: zsh-modules/zpmod][zpmod-page]
- [📦 Repository][z-shell/zpmod]

## <i class="fas fa-sync-alt fa-spin"></i> Available links {#available-links}

[Status page][status] <Emoji symbol="✅" label="check-mark-button"/>

### <i class="fa-solid fa-gear"></i> Installer {#installer}

| Service    | URL                                                                       |
| :--------- | ------------------------------------------------------------------------- |
| Redirect   | <https://get.zshell.dev>                                                  |
| R2         | <https://r2.zshell.dev/src/sh/install.sh>                                 |
| Cloudflare | <https://src.zshell.dev/sh/install.sh>                                    |
| IPFS       | <https://ipfs.zshell.dev/sh/install.sh>                                   |
| Git.io     | <https://git.io/get-zi>                                                   |
| GitHub RAW | <https://raw.githubusercontent.com/z-shell/zi-src/main/lib/sh/install.sh> |

### <i class="fa-brands fa-superpowers"></i> Loader {#loader}

| Service    | URL                                                                      |
| :--------- | ------------------------------------------------------------------------ |
| Redirect   | <https://init.zshell.dev>                                                |
| R2         | <https://r2.zshell.dev/src/zsh/init.zsh>                                 |
| Cloudflare | <https://src.zshell.dev/zsh/init.zsh>                                    |
| IPFS       | <https://ipfs.zshell.dev/zsh/init.zsh>                                   |
| Git.io     | <https://git.io/zi-loader>                                               |
| GitHub RAW | <https://raw.githubusercontent.com/z-shell/zi-src/main/lib/zsh/init.zsh> |

<!-- end-of-file -->
<!-- links -->

[zpmod-page]: /ecosystem/plugins/zsh-modules#-z-shellzpmod

<!-- external -->

[checksum-txt]: https://raw.githubusercontent.com/z-shell/zi-src/main/lib/checksum.txt
[completion-system]: https://zsh.sourceforge.io/Doc/Release/Completion-System.html#Use-of-compinit
[discuss]: https://github.com/orgs/z-shell/discussions/new
[dockerfile]: https://github.com/robobenklein/configs/blob/master/Dockerfile
[issue]: https://github.com/z-shell/zi/issues/new/choose
[playground]: https://github.com/z-shell/playground
[status]: https://status.zshell.dev
[translate]: https://digitalclouds.crowdin.com/z-shell
[z-shell/zpmod]: https://github.com/z-shell/zpmod
