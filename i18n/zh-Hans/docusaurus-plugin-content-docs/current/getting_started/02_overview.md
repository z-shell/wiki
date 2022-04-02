---
title: '☑️ 概览'
image: zw/logo/320x320.png
description: 对 Z-Shell ZI 的用例概览。
keywords:
  - overview
---

此概览包括：

1. [Oh My Zsh & Prezto](/search?q=Oh+My+Zsh+%26+Prezto)
2. [Completions](/search?q=completions)
3. [Turbo 模式](/search?q=turbo+mode)
4. [Ice 修饰符](/search?q=ice+modifiers)

## 装载插件的基本用法

```shell
zi load z-shell/H-S-MW
zi light zsh-users/zsh-syntax-highlighting
```

以上命令展示了两种基本插件加载方式。

使用 `load` 会启用报告——可以跟踪插件的功能，使用 `zi report {plugin-name}` 查看信息，使用 `zi unload {plugin-name}` 卸载插件。

使用 `light` 从而关闭追踪和报告会显著提高性能，但同时用户失去了查看报告和卸载插件的能力。

:::note

在 Turbo 模式下，由于跟踪引起的减速可以忽略不计。

:::

## Oh My Zsh, Prezto

要加载 Oh My Zsh 和 Prezto 插件，请使用 `snippet` 功能。 Snippet 是通过 `curl`、`wget` 等单独下载的文件。ZI 能够通过 URL 检测下载工具。 For example:

```shell
zi snippet 'https://github.com/robbyrussell/oh-my-zsh/raw/master/plugins/git/git.plugin.zsh'
zi snippet 'https://github.com/sorin-ionescu/prezto/blob/master/modules/helper/init.zsh'
```

对于 Oh My Zsh 和 Prezto 你可以使用 `OMZ::` 或 `PZT::` 缩写：

```shell
zi snippet OMZ::plugins/git/git.plugin.zsh
zi snippet PZT::modules/helper/init.zsh
```

此外，snippet 支持 Subversion 协议，Github 也支持该协议。 这允许加载多文件的 snippet（例如，Prezto 模块可以包含两个或多个文件，例如 `init.zsh` 和 `alias.zsh`）。

默认会 source 以下文件：`*.plugin.zsh`, `init.zsh`, `*.zsh-theme`：

指向文件夹的 URL：

```shell {3}
zi ice svn
zi snippet PZT::modules/docker
```

## Snippet 和性能

使用 `curl`、 `wget` 以及 Subversion 等工具，可以避免 Oh My Zsh 和 Prezto 等框架特定的代码。

这有利于提高 `ZI` 性能，Snippet 非常快而且紧凑（让内存占用变低、加载时间加快）。

## Ice 修饰符

`zi ice` 命令可以对下个命令添加 [ice 修饰符][1].

逻辑是「冰」是添加到饮料或咖啡中的东西，对于 ZI，这意味着冰是添加到下一个 ZI 命令的修饰符，也是融化的东西，所以它不会持续很长时间——在 ZI 中使用表示修饰符仅持续到下一个 ZI 命令。

使用 "**pick**" 修饰符，用户可以**显式 source 文件**:

```shell {1}
zi ice svn pick"init.zsh"
zi snippet PZT::modules/git
```

ice 修饰符的参数可用以下方式添加：`"…"`, `'…'`, or `$'…'`。 在 ice-mod 名称之后不需要 `":"` （虽然不会报错，所以等号 `=`，例如 `pick="init.zsh"` 或 `pick=init.zsh` 会被正确识别）。

This way editors like `vim` and `emacs` and also `zsh-users/zsh-syntax-highlighting` and `z-shell/F-Sy-H` will highlight contents of ice-modifiers.

## About as"program"

也许有的插件不作为 source 但作为添加到 `$PATH` 的命令。 To obtain this effect, use ice-modifier `as` with value `program` (or an alias value `command`).

```shell
zi ice as"program" cp"httpstat.sh -> httpstat" pick"httpstat"
zi light b4b4r07/httpstat
```

The above command will add plugin directory to `$PATH`, copy file `httpstat.sh` into `httpstat` and add execution rights (`+x`) to the file selected with `pick`, i.e. to `httpstat`. Another ice-mod exists, `mv`, which works like `cp` but **moves** a file instead of **copying** it. `mv` is ran before `cp`.

:::tip

The `cp` and `mv` ices (and also as some other ones, like `atclone`) are being run when the plugin or snippet is being _installed_.s

要再次测试它们，请首先通过 `zi delete PZT::modules/osx` 删除（此处用 osx 插件举例）。

:::

## About - atpull"…"

Copying file is safe for doing later updates – original files of the repository are unmodified and `Git` will report no conflicts.

当然，也可以使用 `mv` 搭配 `atpull`，该 ice 修饰符在**更新时**运行，例如：

```shell
zi ice as"program" mv"httpstat.sh -> httpstat" \
  pick"httpstat" atpull'!git reset --hard'
zi light b4b4r07/httpstat
```

如果 `atpull` 有感叹号前缀，那么它会在 `git pull` 之前执行，同时也在 `mv` 之前。 Nevertheless, `atpull`, `mv`, `cp` are run **only if new commits are to be fetched**.

So in summary, when the user runs `zi update b4b4r07/httpstat` to update this plugin, and there are new commits, what happens first is that `git reset --hard` is run – and it **restores** original `httpstat.sh`, **then** `git pull` is ran and it downloads new commits (doing fast-forward), **then** `mv` is running again so that the command is `httpstat` not `httpstat.sh`.

This way the `mv` ice can be used to induce permanent changes into the plugin's contents without blocking the ability to update it with `git` (or with `subversion` in case of snippets, more on this below).

:::info

For exclamation marks to not be expanded by Zsh an interactive session, use `'…'` not `"…"` to enclose contents of `atpull` [ice-modifier](/search?q=ice-modifier).

:::

## Snippet as'…' 命令

修饰符 `load` 和 `unload` 允许定义你希望插件何时激活或不激活。 For example:

```shell {2,4}
zi ice mv"httpstat.sh -> httpstat" \
  pick"httpstat" as"program"
zi snippet \
  https://github.com/b4b4r07/httpstat/blob/master/httpstat.sh
```

:::tip

Snippets 也支持 `atpull`，所以可以做到例如 `atpull'!svn revert'`。

还有一个 `atinit` ice 修飾符，在每次加载插件或片段之前执行。

:::

## Snippet as'…' 补全

By using the `as''` ice modifier with value `completion` you can point the `snippet` subcommand directly to a completion file:

```shell {2}
zi ice as"completion"
zi snippet https://github.com/docker/cli/blob/master/contrib/completion/zsh/_docker
```

## 补全管理

ZI 允许关闭或打开每一个插件的补全。 试试安装提供补全的热门插件： Try installing a popular plugin that provides completions:

```shell {1}
zi ice blockf
zi light zsh-users/zsh-completions
```

第一个命令，`blockf` ice 修饰符，将会阻止添加补全的传统方式。 ZI uses its method, based on symlinks instead of adding several directories to `$fpath`.

ZI 将自动**安装**新下载插件的补全。

要想卸载补全并重新安装，你可以使用：

卸载： `zi cuninstall zsh-users/zsh-completions`

安装： `zi creinstall zsh-users/zsh-completions`

### 列出可用补全

:::note

`zini` 是一个别名，可以在交互会话中使用。

:::

要查看**所有**插件提供了哪些补全，以表格样式显示名称和属性，使用：

```shell
zini clist
```

该命令特别适用于像 `zsh-users/zsh-completions`这样的插件，它提供了许多补全——列表每行将有 `3` 个补全，因此将占用较少数量的终端页面，如下所示：

```shell
…
atach, bitcoin-cli, bower zsh-users/zsh-completions
bundle, caffeinate, cap zsh-users/zsh-completions
cask, cf, chattr zsh-users/zsh-completions
…
```

You can show more completions per line by providing an **argument** to `clist`, e.g. `zi clist 6`, will show:

```shell
…
bundle, caffeinate, cap, cask, cf, chattr zsh-users/zsh-completions
cheat, choc, cmake, coffee, column, composer zsh-users/zsh-completions
console, dad, debuild, dget, dhcpcd, diana zsh-users/zsh-completions
…
```

### Enabling / disabling - completions

Completions can be disabled so that e.g. original Zsh completion will be used.

The commands are very basic, they only need completion **name**:

```shell {1,3}
$ zi cdisable cmake
Disabled cmake completion belonging to zsh-users/zsh-completions
$ zi cenable cmake
Enabled cmake completion belonging to zsh-users/zsh-completions
```

That’s all on completions. There’s one more command, `zi csearch`, that will **search** all plugin directories for available completions, and show if they are installed:

This sums up complete control over completions.

## The subversion for subdirectories

In general, to use **subdirectories** of Github projects as snippets add `/trunk/{path-to-dir}` to URL, for example:

```shell
zi ice svn
zi snippet https://github.com/zsh-users/zsh-completions/trunk/src
```

:::tip

For Oh My Zsh and Prezto, the OMZ:: and PZT:: prefixes work without the need to add the `/trunk/` infix, however, the path should point to a directory, not to a file.

:::

```shell
zi ice svn
zi snippet PZT::modules/docker
```

Snippets too have completions installed by default, like plugins.

## Turbo 模式（Zsh >= 5.3）

The ice-mod `wait` allows the user to postpone the loading of a plugin to the moment when the processing of `.zshrc` is finished and the first prompt is being shown.

It is like Windows – during startup, it shows desktop even though it still loads data in the background.

This has drawbacks but is for sure better than a blank screen for 10 minutes. And here, in ZI, there are no drawbacks of this approach – no lags, freezes, etc. – the command line is fully usable while the plugins are being loaded, for any number of plugins.

:::info

Turbo will speed up Zsh startup by **50%–80%**. For example, instead of 200 ms, it'll be 40 ms.

:::

:::note

Zsh 5.3 or greater is required.

:::

To use this Turbo mode add `wait` ice to the target plugin in one of the following ways:

```shell
PS1="READY > "
zi ice wait'!0'
zi load halfo/lambda-mod-zsh-theme
```

This sets plugin `halfo/lambda-mod-zsh-theme` to be loaded `0` seconds after `zshrc`.

It will fire up after c.a. 1 ms of showing the basic prompt `READY >`.

You probably won't load the prompt in such a way, however, it is a good example in which Turbo can be directly observed.

The exclamation mark causes ZI to reset the prompt after loading the plugin – it is needed for themes. The same with Prezto prompts, with a longer delay:

```shell
zi ice svn silent wait'!1' atload'prompt smiley'
zi snippet PZT::modules/prompt
```

Using `zsh-users/zsh-autosuggestions` without any drawbacks:

```shell
zi ice wait lucid atload'_zsh_autosuggest_start'
zi light zsh-users/zsh-autosuggestions
```

Explanation:

Autosuggestions use the `precmd` hook, which is being called right after processing `zshrc` – `precmd` hooks are being called **right before displaying each prompt**.

Turbo with the empty `wait` ice will postpone the loading `1` ms after that, so `precmd` will not be called at that first prompt. This makes autosuggestions inactive at the first prompt.

**However** the given `atload` ice-mod fixes this, it calls the same function that `precmd` would, right after loading autosuggestions, resulting in the same behavior of the plugin.

The ice `lucid` causes the under-prompt message saying `Loaded zsh-users/zsh-autosuggestions` that normally appears for every Turbo-loaded plugin to not show.

## A Quick Glance At [`for`][14] syntax

This introduction is based on the classic, two-command syntax (`zi ice …; zi load/light/snippet …`) of ZI. However, there's also available a recently added so-called _for-syntax_.

It is the right moment to take a glance at it, by rewriting the above autosuggestions invocation using it:

```shell
zi wait lucid atload'_zsh_autosuggest_start' light-mode for zsh-users/zsh-autosuggestions
```

The syntax is a more concise one. The single command will work the same as the previous classic-syntax invocation. It also allows solving some typical problems when using ZI, like providing common/default ices for a set of plugins or sourcing multiple files with [`src''` ice][13]. 更多信息请参考专门介绍 for 语法的页面（[这里][14]）。

## 具有复杂提示的 Turbo 启动

For some, mostly advanced themes the initialization of the prompt is being done in a `precmd`-hook, i.e.; in a function that's gets called before each prompt.

钩子是由 [add-zsh-hook][12] Zsh 函数安装的，将其名称添加到 `$precmd_functions` 数组中。

To make the prompt fully initialized after Turbo loading in the middle of the prompt the same situation as with the `zsh-autosuggestions` plugin, the hook should be called from `atload''` ice`.

首先，通过检查 `$precmd_functions` 数组找到钩子函数的名称。

For example, for the `robobenklein/zinc` theme, they'll be two functions: `prompt_zinc_setup` and `prompt_zinc_precmd`:

```shell
root@sg > ~ > print $precmd_functions < ✔ < 22:21:33
_zsh_autosuggest_start prompt_zinc_setup prompt_zinc_precmd
```

然后，将它们添加到 `atload''` ice 修饰符列表中。

```shell {2}
zi ice wait'!' lucid nocd \
  atload'!prompt_zinc_setup; prompt_zinc_precmd'
zi load robobenklein/zinc
```

The exclamation mark in `atload'!…'` is to track the functions allowing the plugin to be unloaded, as described [here][11]. It might be useful for the multi-prompt setup described next.

## 基于条件的自动加载/卸载 {#automatic-loadunload-based-on-condition}

修饰符 `load` 和 `unload` 允许定义你希望插件何时激活或不激活。 For example:

Load when in ~/tmp

```shell {1}
zi ice load'![[ $PWD = */tmp* ]]' unload'![[ $PWD != */tmp* ]]' \
  atload"!promptinit; prompt sprint3"
zi load psprint/zprompts
```

不在 ~/tmp 中时加载时

```shell {1}
zi ice load'![[ $PWD != */tmp* ]]' unload'![[ $PWD = */tmp* ]]'
zi load russjohnson/angry-fly-zsh
```

两个提示符，它们在不同的文件夹下被激活。 This technique can be used to have plugin-sets, e.g. by defining parameter `$PLUGINS` with possible values like `cpp`, `web`, `admin` and by setting `load` / `unload` conditions to activate different plugins on `cpp`, on `web`, etc.

:::note

- 与 `wait` 不同的是， `load` / `unload` 是持续可用的，而不是只到第一次激活。

- Note that for the unloading of a plugin to work the plugin needs to be loaded with tracking, so `zi load …` and not `zi light …`.

追踪会导致轻微的减速，然而，这并不影响使用 Turbo 模式时 Zsh 的启动时间。

:::

:::tip

See: [multiple prompts][15] for more information. It contains more real-world examples of a multi-prompt setup, which is being close to what the author uses in his setup.

:::

## 插件和 snippet

插件可以使用 `load` 或 `light` 加载。

```shell
zi load  <repo/plugin> # Load with reporting/investigating.
zi light <repo/plugin> # Load without reporting/investigating.
```

如果你想为本地或远程文件提供来源（使用直接的URL），你可以用 `snippet`来实现。

```shell
zi snippet <URL>
```

这样的行应该被添加到 `.zshrc`。

Snippet 缓存在本地，使用 `-f` 选项下载 snippet 的新版本，或 `zi update {URL}`。

也可以使用 `zi update --all` 来更新所有 snippet（和插件）。

### `load` 和 `light` 的本质区别

带有调查的 history-search-multi-word 插件加载

```shell
zi load z-shell/H-S-MW
```

不带有调查的常规插件加载：

```shell
zi light zsh-users/zsh-autosuggestions
zi light z-shell/F-Sy-H
```

Snippet:

```shell
zi snippet https://gist.githubusercontent.com/hightemp/5071909/raw/
```

### 提示符一瞥

这是 [powerlevel10k][18]、[pure][17]、[starship][16] 的实例。

加载 powerlevel10k 主题。

```shell title="~/.zshrc"
zi ice depth"1"
zi light romkatv/powerlevel10k
```

加载 pure 主题

- 这将选择 `async.zsh` 库，并被 source。

```shell title="~/.zshrc"
zi ice pick"async.zsh" src"pure.zsh"
zi light sindresorhus/pure
```

加载 starship 主题：

- 将选择 `starship` 二进制作为命令，来源为 GitHub Release
- `starship` 配置：`atclone` 创建 `init.zsh` 和 `completion`
- `atpull` 行为与 `atclone` 相同，并将在运行 `zi update` 时使用。
- `src` 将会 source init.zsh

```shell title="~/.zshrc"
zi ice as"command" from"gh-r" \
  atclone"./starship init zsh > init.zsh; ./starship completions zsh > _starship" \
  atpull"%atclone" src"init.zsh"
zi light starship/starship
```

## ZI 升级

ZI 可以用 `self-update` 更新，插件可以用 `update` 更新。

自更新

```shell
zi self-update
```

更新所有插件

```shell
zi update
```

Update specific plugin. 默认为 GitHub，但也可以通过 ice 修饰符 [from''][2] 指定。

```shell
zi update <user>/<repo>
```

并行更新插件

```shell
zi update --parallel
```

并行更新插件，并将并发量设为 40

```shell
zi update --parallel 40
```

## Turbo 和 Lucid

Turbo 和 Lucid 是最常使用的选项。

### Turbo

Turbo 模式是提升性能的关键。

它可以异步加载，这在插件数量增加时会产生巨变。

通常用作 `zi ice wait"<SECONDS>"`，让我们用前面的例子。

:::note

The `wait` and `wait"0"` is the same

:::

```shell title="~/.zshrc"
zi ice wait
zi load z-shell/history-search-multi-word
```

Load after 2 seconds:

```shell
zi ice wait"2"
zi load z-shell/history-search-multi-word
```

Also can be used in `light` and `snippet`:

```shell
zi ice wait
zi snippet https://gist.githubusercontent.com/hightemp/5071909/raw/
```

### Lucid

Turbo mode is verbose, so you need an option for quiet. To achieve this the `lucid` can be used.s

```shell
zi ice wait lucid
zi load z-shell/history-search-multi-word
```

### Some examples with ZI

安装 ZI 后，你可以开始向底部的 `~/.zshrc` 添加一些动作（加载一些插件）。

Some examples: Load the pure theme, with the zsh-async library that's bundled with it.

```shell title="~/.zshrc"
zi ice pick"async.zsh" src"pure.zsh"
zi light sindresorhus/pure
```

### As glance at the <code>for</code> syntax

用一个命令加载上述所有的插件。

:::tip

要查找任何信息，请使用[搜索][3]或者直接使用 <kbd>CTRL+K</kbd>。

:::

```shell title="~/.zshrc"
zi light-mode for \
    zsh-users/zsh-autosuggestions \
    z-shell/F-Sy-H \
    z-shell/H-S-MW \
  pick"async.zsh" src"pure.zsh" \
    sindresorhus/pure
```

Binary release in the archive, from GitHub-releases page. 在自动解压之后，提供 「fzf」程序。

```shell title="~/.zshrc"
zi ice from"gh-r" as"program"
zi light junegunn/fzf
```

另一个二进制发行 需要从 `docker-compos-Linux-x86_64` 重命名。

这通过 [ice 修饰符][1]: `mv'{from} -> {to}'`。

There are multiple packages per single version, for OS X, Linux, and Windows – so ice modifier `bpick` is used to select Linux package – in this case, this is not needed, ZI will grep operating system name and architecture automatically when there's no `bpick`.

```shell title="~/.zshrc"
zi ice from"gh-r" as"program" mv"docker* -> docker-compose" bpick"*linux*"
zi load docker/compose
```

Vim repository on GitHub – a typical source code that needs compilation, ZI can manage it for you if you like, run `./configure` and other `make` stuff.

Ice modifier `pick` selects a binary program to add to $PATH. 你也能在 $ZPFX 下安装包。

```shell title="~/.zshrc"
zi ice as"program" atclone"rm -f src/auto/config.cache; ./configure" \
  atpull"%atclone" make pick"src/vim"
zi light vim/vim
```

安装时构建的脚本

> 有一个默认的 make 目标，「install」，它可以构建脚本。

The `make''` ice could also be: `make"install PREFIX=$ZPFX"`, if "install" wouldn't be the only, default target.

```shell title="~/.zshrc"
zi ice as"program" pick"$ZPFX/bin/git-*" make"PREFIX=$ZPFX"
zi light tj/git-extras
```

在不加载任何插件的情况下处理补全，见 `clist` 命令。

这只会在一个会话中运行一次。

```shell title="~/.zshrc"
zi creinstall %HOME/my_completions
```

对于 GNU ls 来说，二进制文件可以名为 gls、gdircolors，但在 OS X 上从 Homebrew 安装 coreutils 包时就不可以。

```shell title="~/.zshrc"
zi ice atclone"dircolors -b LS_COLORS > c.zsh" atpull'%atclone' pick"c.zsh" nocompile'!'
zi light trapd00r/LS_COLORS
```

`make'!'` -> run make before `atclone` & `atpull`.

```shell
zi ice as"program" make'!' atclone'./direnv hook zsh > zhook.zsh' atpull'%atclone' src"zhook.zsh"
zi light direnv/direnv
```

If you're interested to try out more then check out the [playground repository][19] where users have uploaded the `~/.zshrc` and other ZI configurations.

如果你的`~/.zshrc` 包含 ZI 命令，请随意[提交][20]。

你也可以查看一些额外的示例：

- [收集][10]，
- [Oh-My-Zsh][9].

[1]: /search?q=ice+modifiers
[2]: /search?q=from
[3]: /search?q=for+syntax
[9]: /docs/gallery/collection#oh-my-zsh
[10]: /docs/gallery/collection
[11]: /docs/guides/syntax/ice#atclone-atpull-atinit-atload
[12]: /community/intro#use-of-add-zsh-hook-to-install-hooks
[13]: /docs/guides/syntax/ice#src-pick-multisrc
[14]: /docs/guides/syntax/for
[14]: /docs/guides/syntax/for
[15]: /docs/guides/customization#multiple-prompts
[16]: https://github.com/starship/starship
[17]: https://github.com/sindresorhus/pure
[18]: https://github.com/romkatv/powerlevel10k
[19]: https://github.com/z-shell/playground
[20]: https://github.com/z-shell/playground/issues/new?template=request-to-add-zshrc-to-the-zi-configs-repo.md
