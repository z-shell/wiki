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

这种设置方法需要在版本库中每次改变内容时，手动验证文件 `lib/zsh/init.zsh` 的sha256 [checksum][checksum-txt]。

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

使用 `exec zsh -il` 重新加载 shell 并运行 `zi -h` 以获取使用信息。

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

安装并向 `.zshrc` 添加最小配置：

```shell
sh -c "$(curl -fsSL get.zshell.dev)" --
```

  </TabItem>
  <TabItem value="minimal-loader" label="Loader">

使用 [loader](#loader) 安装并包含最小配置：

```shell
sh -c "$(curl -fsSL get.zshell.dev)" -- -a loader
```

安装程序将下载加载器并将下面的代码段添加到 `.zshrc` 文件中。

```shell showLineNumbers
if [[ -r "${XDG_CONFIG_HOME:-${HOME}/.config}/zi/init.zsh" ]]; then
  source "${XDG_CONFIG_HOME:-${HOME}/.config}/zi/init.zsh" && zzinit
fi
```

:::tip

装载器可以从可用的 [links](#loader) 手动获取到系统的任何位置，并从 `.zshrc` 或如 [quick-setup](#quick-setup)中获取来源。

:::

然后用 `exec zsh` 重新加载 shell 。 全部完成了！

  </TabItem>
  <TabItem value="repository" label="Repository">

使用默认的或 <Link to="/docs/guides/customization#customizing-paths">自定义的</Link> 值克隆版本库。

```shell
sh -c "$(curl -fsSL get.zshell.dev)" -- -i skip
```

  </TabItem>
  <TabItem value="minimal-annexes" label="Annex">

使用最小化配置和推荐的 <Link to="/ecosystem/annexes/overview">annexes</Link> 安装:

```shell
sh -c "$(curl -fsSL get.zshell.dev)" -- -a annex
```

  </TabItem>
  <TabItem value="minimal-zunit" label="ZUnit">

使用最小化配置，安装推荐的 <Link to="/ecosystem/annexes/overview">annexes</Link> ，并配置 <Link href="https://github.com/zdharma/zunit">zdharma/zunit</Link>:

```shell
sh -c "$(curl -fsSL get.zshell.dev)" -- -a zunit
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
typeset -gx ZI[HOME_DIR]="${HOME}/.zi" ZI[BIN_DIR]="${ZI[HOME_DIR]}/bin"
command mkdir -p "$ZI[BIN_DIR]"
```

For security reasons run function `compaudit` to check if the [completion system][completion-system] would use files owned by `root` or by the current `user`, or files in directories that are `world` or `group-writable`.

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

## <i class="fas fa-cog fa-pulse"></i> Zi Module: zpmod {#zi-module}

The module transparently and automatically compiles sourced scripts and lists of all sourced files with the time the sourcing took in milliseconds on the left.

- [⚙️ Plugins: zsh-modules/zpmod][zpmod-page]
- [📦 Repository][z-shell/zpmod]

## <i class="fas fa-sync-alt fa-spin"></i> 可用的链接 {#available-links}

[Status page][status] <Emoji symbol="✅" label="check-mark-button"/>

### <i class="fa-solid fa-gear"></i> 安装器 {#installer}

| 服务         | URL                                                                       |
|:---------- | ------------------------------------------------------------------------- |
| 带重定向       | <https://get.zshell.dev>                                                  |
| R2         | <https://r2.zshell.dev/src/sh/install.sh>                                 |
| Cloudflare | <https://src.zshell.dev/sh/install.sh>                                    |
| IPFS       | <https://ipfs.zshell.dev/sh/install.sh>                                   |
| Git.io     | <https://git.io/get-zi>                                                   |
| GitHub RAW | <https://raw.githubusercontent.com/z-shell/zi-src/main/lib/sh/install.sh> |

### <i class="fa-brands fa-superpowers"></i> 加载器 {#loader}

| 服务         | URL                                                                      |
|:---------- | ------------------------------------------------------------------------ |
| 带重定向       | <https://init.zshell.dev>                                                |
| R2         | <https://r2.zshell.dev/src/zsh/init.zsh>                                 |
| Cloudflare | <https://src.zshell.dev/zsh/init.zsh>                                    |
| IPFS       | <https://ipfs.zshell.dev/zsh/init.zsh>                                   |
| Git.io     | <https://git.io/zi-loader>                                               |
| GitHub RAW | <https://raw.githubusercontent.com/z-shell/zi-src/main/lib/zsh/init.zsh> |

<!-- end-of-file -->
<!-- links -->



<!-- external -->

[zpmod-page]: /ecosystem/plugins/zsh-modules#-z-shellzpmod

[checksum-txt]: https://raw.githubusercontent.com/z-shell/zi-src/main/lib/checksum.txt
[completion-system]: https://zsh.sourceforge.io/Doc/Release/Completion-System.html#Use-of-compinit
[discuss]: https://github.com/orgs/z-shell/discussions/new
[dockerfile]: https://github.com/robobenklein/configs/blob/master/Dockerfile
[issue]: https://github.com/z-shell/zi/issues/new/choose
[playground]: https://github.com/z-shell/playground
[status]: https://status.zshell.dev
[translate]: https://digitalclouds.crowdin.com/z-shell
[z-shell/zpmod]: https://github.com/z-shell/zpmod
