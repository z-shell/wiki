---
id: installation
title: '⚡️ 安装'
sidebar_position: 1
image: /img/png/theme/z/320x320.png
description: 安装指南
keywords:
  - 安装
---

<!-- @format -->

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import Link from '@docusaurus/Link'; import Emoji from '@site/src/components/Emoji';

## <i class="fas fa-spinner fa-spin"></i> 快速开始 {#quick-setup}

将以下内容添加到 `.zshrc` 文件中：

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

## <i class="fas fa-spinner fa-spin"></i> 自动设置 {#automated-setup}

:::tip

- Verify the sha256 [checksum][checksum-txt] for file: `lib/sh/install.sh`
- 如果需要，请添加 `-b <tag>` 或 `-b <branch>` ，例如：

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

Then reload the shell with: `exec zsh`. 全部完成了！

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

## <i class="fas fa-spinner fa-spin"></i> 手动设置 {#manual-setup}

:::tip 相关内容

- [🏗 Configuration management](/docs/guides/customization#customizing-paths)

:::

Set up the install location and create a directory:

```shell showLineNumbers
typeset -Ag ZI
typeset -gx ZI[HOME_DIR]="${HOME}/.zi" ZI[BIN_DIR]="${ZI[HOME_DIR]}/bin"
command mkdir -p "$ZI[BIN_DIR]"
```

出于安全原因，运行函数 `compaudit` 来检查 [完成系统][completion-system] 是否会使用不属于 `root` 或 `当前用户`的文件，抑或是位于可以被 `所有用户` 或 `组可写`目录中的文件。

如果失败，则将当前用户设置为目录的所有者，然后删除 group/others 的写入权限，并克隆存储库：

```shell showLineNumbers
compaudit | xargs chown -R "$(whoami)" "$ZI[HOME_DIR]"
compaudit | xargs chmod -R go-w "$ZI[HOME_DIR]"
command git clone https://github.com/z-shell/zi.git "$ZI[BIN_DIR]"
```

要启用 Zi，请从先前设置的目录中 source `zi.zsh` ，将以下代码段放入 `.zshrc` 文件中：

```shell title="~/.zshrc" showLineNumbers
typeset -A ZI
ZI[BIN_DIR]="${HOME}/.zi/bin"
source "${ZI[BIN_DIR]}/zi.zsh"
```

:::caution

下面的两行必须放在上面的行之后，即在启用 Zi 之后。

:::

启用 Zi 补全：

```shell title="~/.zshrc" showLineNumbers
autoload -Uz _zi
(( ${+_comps} )) && _comps[zi]=_zi
```

## <i class="fas fa-spinner fa-spin"></i> 安装后操作 {#post-install}

After a fresh install, it is recommended to reload the shell with `exec zsh -il` and compile Zi with `zi self-update`. 运行 `zi -h` 以查看所有可用命令。 了解 Zi 功能和性能，或通过浏览 wiki 开始。

If you have any issue or need help <Emoji symbol="🤦‍♂️" label="man-facepalming"/>, lets [discuss][discuss] it or open an [issue][issue] in any language.

它帮助我们改进并让 Zi 变得更好。 Don't forget to help the project: share, contribute, or [translate][translate] <Emoji symbol="🌐" label="globe-with-meridians"/> <Emoji symbol="🥰" label="smiling-face-with-hearts"/> <Emoji symbol="🤓" label="nerd-face"/>.

让我们一起抓住一切，创建一个为我们服务的工具链 <Emoji symbol="🚀" label="rocket"/>。

## <i class="fas fa-sync-alt fa-spin"></i> 有想法？

### <i class="fa-solid fa-list-check"></i>&nbsp;在&nbsp;<Link href="https://github.com/z-shell/playground"> playground 建议或请求</Link>

```shell
sh -c "$(curl -fsSL get.zshell.dev)" -- -a ???
```

## <i class="fas fa-sync-alt fa-spin"></i>&nbsp;需要热身？

### <i class="fa-brands fa-docker"></i>&nbsp;<Link href="https://github.com/z-shell/zd/pkgs/container/zd">Alpine Docker</Link>

```shell
docker run --rm -it ghcr.io/z-shell/zd:latest
```

### <i class="fa-brands fa-docker"></i> Docker 中的 Turbo Zi

如果您创建使用 Zi 的 Docker 映像，请在 shell 开始交互之前安装 Turbo-loaded 插件，以这样的方式使用 `@zi-scheduler` 函数：

- 无需等待提示即可安装插件（即，对脚本友好）。
- 立即安装所有插件，无需考虑 `wait` 参数。

为此，请使用 burst 参数并调用 `@zi-scheduler` 函数：

```docker
RUN zsh -i -c -- '@zi-scheduler burst || true'
```

> - An example: [Dockerfile][dockerfile]
> - In action: [Playground][playground]

## <i class="fas fa-cog fa-pulse"></i> Zi Module: [zpmod][z-shell/zpmod] {#zi-module}

:::info

- 所需的 Zsh 版本： >= v5.8.0
- <i className="fa-brands fa-github"></i>&nbsp;<Link href="https://github.com/z-shell/zpmod">z-shell/zpmod</Link>

:::

<Tabs>
  <TabItem value="with-zi" label="With Zi" default>

用法：

```shell showLineNumbers
zi module {build|info|help} [options]
zi module build [--clean]
zi module info [--link]
```

- 要开始使用 Zi Zsh 模块，请运行：`zi module build`。 附加 `--clean` 以运行 `make distclean`。
- 要加载模块的时候显示模块说明，请运行：`zi module info`。
- 要启用来自模块集的调试消息：

```shell
typeset -g ZI_MOD_DEBUG=1
```

</TabItem>
  <TabItem value="standalone" label="Standalone">

```shell
sh <(curl -sL src.zshell.dev/sh/install_zpmod.sh)
```

  </TabItem>
</Tabs>

## <i class="fas fa-sync-alt fa-spin"></i> 可用的链接 {#available-links}

[Status page][status] <Emoji symbol="✅" label="check-mark-button"/>

### <i class="fa-solid fa-gear"></i> 安装器 {#installer}

| 服务         | URL                                                                       |
|:---------- | ------------------------------------------------------------------------- |
| Redirect   | <https://get.zshell.dev>                                                  |
| R2         | <https://r2.zshell.dev/src/sh/install.sh>                                 |
| Cloudflare | <https://src.zshell.dev/sh/install.sh>                                    |
| IPFS       | <https://ipfs.zshell.dev/sh/install.sh>                                   |
| GitHub RAW | <https://raw.githubusercontent.com/z-shell/zi-src/main/lib/sh/install.sh> |

### <i class="fa-brands fa-superpowers"></i> 加载器 {#loader}

| 服务         | URL                                                                      |
|:---------- | ------------------------------------------------------------------------ |
| Redirect   | <https://init.zshell.dev>                                                |
| R2         | <https://r2.zshell.dev/src/zsh/init.zsh>                                 |
| Cloudflare | <https://src.zshell.dev/zsh/init.zsh>                                    |
| IPFS       | <https://ipfs.zshell.dev/zsh/init.zsh>                                   |
| GitHub RAW | <https://raw.githubusercontent.com/z-shell/zi-src/main/lib/zsh/init.zsh> |

<!-- end-of-file -->
<!-- links -->
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
