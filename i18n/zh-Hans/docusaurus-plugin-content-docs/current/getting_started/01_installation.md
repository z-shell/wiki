---
id: installation
title: "⚡️ 安装"
sidebar_position: 1
image: /img/logo/320x320.png
description: 安装指南
keywords:
  - setup
  - quick-start
  - installation
---

<!-- @format -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@docusaurus/Link';
import Emoji from '@site/src/components/Emoji';

## <i class="fas fa-spinner fa-spin"></i> 快速开始 {#quick-setup}

将以下内容添加到 `.zshrc` 文件中：

<Tabs>
  <TabItem value="instant-source" label="Instant" default>

```shell title="~/.zshrc"
source <(curl -sL git.io/zi-loader); zzinit
```

  </TabItem>
  <TabItem value="verified-source" label="Verified">

验证文件的 sha256 [checksum][checksum]：`lib/zsh/init.zsh`:

```shell showLineNumbers title="~/.zshrc"
local cs_ok='7fab1ecb8d2ffbdb4aa98dd1e51cebaeaa4d8137e1de11938f3e0df24af262bb'
local cs=$(sha256sum <(curl -sL git.io/zi-loader) | awk '{print $1}')
[[ $cs_ok == $cs ]] && { source <(curl -sL git.io/zi-loader); zzinit; } || {
  print -P "%F{160}▓▒░ Houston, we have a problem, the %F{226}$cs%F{160} do not match\!%f%b"; exit 1
}
```

  </TabItem>
</Tabs>

使用 `exec zsh` 重新加载 shell 并运行 `zi -h` 以获取使用信息。

## <i class="fas fa-spinner fa-spin"></i> 自动设置 {#automated-setup}

:::tip

- 验证文件： `lib/sh/install.sh` 的 sha256 [校验和][checksum]
- 如果需要，请添加 `-b <tag>` 或 `-b <branch>` ，例如：

```shell
sh -c "$(curl -fsSL git.io/get-zi)" -- -i skip -b main
```

:::

<Tabs>
  <TabItem value="minimal" label="Minimal" default>

安装并向 `.zshrc` 添加最小配置：

```shell
sh -c "$(curl -fsSL git.io/get-zi)" --
```

  </TabItem>
  <TabItem value="minimal-loader" label="Loader">

使用 [loader](#loader) 安装并包含最小配置：

```shell
sh -c "$(curl -fsSL git.io/get-zi)" -- -a loader
```

安装程序将下载加载器并将下面的代码段添加到 `.zshrc` 文件中。

```shell showLineNumbers
if [[ -r "${XDG_CONFIG_HOME:-${HOME}/.config}/zi/init.zsh" ]]; then
  source "${XDG_CONFIG_HOME:-${HOME}/.config}/zi/init.zsh" && zzinit
fi
```

:::tip

The loader can be manually fetched from available [links](#loader) to any location on the system, and sourced from `.zshrc` or as shown in the [quick-setup](#quick-setup).

:::

然后用 `exec zsh` 重新加载 shell。 全部完成了！

  </TabItem>
  <TabItem value="repository" label="Repository">

Clone repository using default or if set <Link to="/docs/guides/customization#customizing-paths">custom</Link> values:

```shell
sh -c "$(curl -fsSL git.io/get-zi)" -- -i skip
```

  </TabItem>
  <TabItem value="minimal-annexes" label="Annex">

Install and include minimal configuration with recommended <Link to="/ecosystem/annexes/overview">annexes</Link>:

```shell
sh -c "$(curl -fsSL git.io/get-zi)" -- -a annex
```

  </TabItem>
  <TabItem value="minimal-zunit" label="ZUnit">

Install and include minimal configuration with recommended <Link to="/ecosystem/annexes/overview">annexes</Link> and setup <Link href="https://github.com/zdharma/zunit">zdharma/zunit</Link>:

```shell
sh -c "$(curl -fsSL git.io/get-zi)" -- -a zunit
```

  </TabItem>
  </Tabs>

## <i class="fas fa-spinner fa-spin"></i> 手动设置 {#manual-setup}

:::tip 相关内容

- [🏗 Configuration management](/docs/guides/customization#customizing-paths)

:::

设置安装位置并创建目录：

```shell showLineNumbers
typeset -Ag ZI
export ZI[HOME_DIR]="${HOME}/.zi"
export ZI[BIN_DIR]="${ZI[HOME_DIR]}/bin"
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

全新安装后，建议使用 `exec zsh` 重新加载 shell 并使用 `zi self-update` 编译 Zi。 运行 `zi -h` 以查看所有可用命令。 了解 Zi 功能和性能，或通过浏览 wiki 开始。

如果您有任何问题或需要帮助 <Emoji symbol="🤦‍♂️" label="man-facepalming"/>，让我们在 [此处讨论][discuss] 或以任何语言打开一个 [问题][issue]。

它帮助我们改进并让 Zi 变得更好。 不要忘记帮助项目：分享、贡献或 [翻译][translate] <Emoji symbol="🌐" label="globe-with-meridians"/> <Emoji symbol="🥰" label="smiling-face-with-hearts"/> <Emoji symbol="🤓" label="nerd-face"/>。

让我们一起抓住一切，创建一个为我们服务的工具链 <Emoji symbol="🚀" label="rocket"/>。

## <i class="fas fa-sync-alt fa-spin"></i> 有想法？

### <i class="fa-solid fa-list-check"></i>&nbsp;在&nbsp;<Link href="https://github.com/z-shell/playground"> playground 建议或请求</Link>

```shell
sh -c "$(curl -fsSL git.io/get-zi)" -- -a ???
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

> - 一个例子： [Dockerfile][dockerfile]
> - 实际例子： [Playground][playground]

## <i class="fas fa-cog fa-pulse"></i> Zi 模块： [zpmod][z-shell/zpmod] {#zi-module}

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
sh -c "$(curl -fsSL git.io/get-zi)" -- -a zpmod
```

  </TabItem>
</Tabs>

## <i class="fas fa-sync-alt fa-spin"></i> 可用的链接 {#available-links}

[状态页][status] <Emoji symbol="✅" label="check-mark-button"/>

### <i class="fa-solid fa-gear"></i> 安装器 {#installer}

| 服务                           | URL                                                                       |
|:---------------------------- | ------------------------------------------------------------------------- |
| [带重定向][get.zshell.dev]       | <https://get.zshell.dev>                                                  |
| [IPFS][ipfs.io]              | <https://ipfs.zshell.dev/sh/install.sh>                                   |
| [不带重定向 （直链）][direct-install] | <https://raw.githubusercontent.com/z-shell/zi-src/main/lib/sh/install.sh> |

### <i class="fa-brands fa-superpowers"></i> 加载器 {#loader}

| 服务                        | URL                                                                      |
|:------------------------- | ------------------------------------------------------------------------ |
| [带重定向][init.zshell.dev]   | <https://init.zshell.dev>                                                |
| [IPFS][ipfs.io]           | <https://ipfs.zshell.dev/zsh/init.zsh>                                   |
| [不带重定向 （直链）][direct-init] | <https://raw.githubusercontent.com/z-shell/zi-src/main/lib/zsh/init.zsh> |

<!-- end-of-file -->
<!-- links -->
<!-- external -->

[checksum]: https://raw.githubusercontent.com/z-shell/zi-src/main/lib/checksum.txt
[completion-system]: https://zsh.sourceforge.io/Doc/Release/Completion-System.html#Use-of-compinit
[direct-init]: https://raw.githubusercontent.com/z-shell/zi-src/main/lib/zsh/init.zsh
[direct-install]: https://raw.githubusercontent.com/z-shell/zi-src/main/lib/sh/install.sh
[discuss]: https://github.com/orgs/z-shell/discussions/new
[dockerfile]: https://github.com/robobenklein/configs/blob/master/Dockerfile
[get.zshell.dev]: https://get.zshell.dev
[init.zshell.dev]: https://init.zshell.dev
[ipfs.io]: https://ipfs.io
[issue]: https://github.com/z-shell/zi/issues/new/choose
[playground]: https://github.com/z-shell/playground
[status]: https://status.zshell.dev
[translate]: https://digitalclouds.crowdin.com/z-shell
[z-shell/zpmod]: https://github.com/z-shell/zpmod
