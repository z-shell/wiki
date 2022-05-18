---
title: '☑️ General Overview'
image: img/logo/320x320.png
description: Overview of use cases with ZI
keywords:
  - overview
---

此概览包括：

1. [Oh-My-Zsh & Prezto](/search?q=Oh+My+Zsh+%26+Prezto)
2. [命令补全](/search?q=completions)
3. [Turbo 模式](/search?q=turbo+mode)
4. [Ice 修饰符](/search?q=ice+modifiers)

## Plugin loading basics

```shell showLineNumbers
zi load z-shell/H-S-MW
zi light zsh-users/zsh-syntax-highlighting
```

以上命令展示了两种基本插件加载方式。

使用 `load` 会启用报告——可以跟踪插件的功能，使用 `zi report {plugin-name}` 查看信息，使用 `zi unload {plugin-name}` 卸载插件。

使用 `light` 从而关闭追踪和报告会显著提高性能，但同时用户失去了查看报告和卸载插件的能力。

:::note

在 Turbo 模式下，由于跟踪引起的减速可以忽略不计。

:::

## Oh-My-Zsh, Prezto

To load Oh-My-Zsh and Prezto plugins, use the `snippet` feature. Snippet 是通过 `curl`、`wget` 等单独下载的文件。ZI 能够通过 URL 检测下载工具。 例如：

```shell showLineNumbers
zi snippet 'https://github.com/robbyrussell/oh-my-zsh/raw/master/plugins/git/git.plugin.zsh'
zi snippet 'https://github.com/sorin-ionescu/prezto/blob/master/modules/helper/init.zsh'
```

Also, for Oh-My-Zsh and Prezto, you can use `OMZ::` and `PZT::` shorthands:

```shell showLineNumbers
zi snippet OMZ::plugins/git/git.plugin.zsh
zi snippet PZT::modules/helper/init.zsh
```

此外，snippet 支持 Subversion 协议，Github 也支持该协议。 这允许加载多文件的 snippet（例如，Prezto 模块可以包含两个或多个文件，例如 `init.zsh` 和 `alias.zsh`）。

默认会 source 以下文件：`*.plugin.zsh`, `init.zsh`, `*.zsh-theme`：

指向文件夹的 URL：

```shell {3} showLineNumbers
zi ice svn
zi snippet PZT::modules/docker
```

## Snippet 和性能

Using `curl`, `wget`, etc. along with Subversion allows to almost completely avoid code dedicated to Oh-My-Zsh and Prezto, and also to other frameworks.

这有利于提高 `ZI` 性能，Snippet 非常快而且紧凑（让内存占用变低、加载时间加快）。

## Ice 修饰符

`zi ice` 命令可以对下个命令添加 [ice 修饰符][1].

逻辑是「冰」是添加到饮料或咖啡中的东西，对于 ZI，这意味着冰是添加到下一个 ZI 命令的修饰符，也是融化的东西，所以它不会持续很长时间——在 ZI 中使用表示修饰符仅持续到下一个 ZI 命令。

使用 "**pick**" 修饰符，用户可以**显式 source 文件**:

```shell {1} showLineNumbers
zi ice svn pick"init.zsh"
zi snippet PZT::modules/git
```

ice 修饰符的参数可用以下方式添加：`"…"`, `'…'`, or `$'…'`。 在 ice-mod 名称之后不需要 `":"` （虽然不会报错，所以等号 `=`，例如 `pick="init.zsh"` 或 `pick=init.zsh` 会被正确识别）。

这样，像 `vim` 和 `emacs` 以及 `zsh-users/zsh-syntax-highlighting` 和 `z-shell/F-Sy-H` 这样的编辑器将突出显示 ice 修饰符的内容。

## 关于 as"program"

也许有的插件不作为 source 但作为添加到 `$PATH` 的命令。 要获得此效果，请使用 ice 修饰符 `as` 和参数 `program`（或别名 `command`）。

```shell showLineNumbers
zi ice as"program" cp"httpstat.sh -> httpstat" pick"httpstat"
zi light b4b4r07/httpstat
```

上述命令会将插件目录添加到 `$PATH`，将文件 `httpstat.sh` 复制到 `httpstat` 并添加执行权限 (`+x`) 到使用 `pick` 选择的文件，即到 `httpstat`。 另一个 ice 修饰符是 `mv`，它的工作方式类似于 `cp` 但**移动**文件而不是**复制**文件。 `mv` 在 `cp` 之前运行。

:::tip

当插件或 snippet 正在安装 __.s 时，会运行 `cp` 和 `mv` 修饰符（以及其他一些 ice，如 `atclone`）

要再次测试它们，请首先通过 `zi delete PZT::modules/osx` 删除（此处用 osx 插件举例）。

:::

## 关于 atpull"…"

复制文件对于以后的更新是安全的——存储库的原始文件未被修改，`Git` 不会报告冲突。

当然，也可以使用 `mv` 搭配 `atpull`，该 ice 修饰符在**更新时**运行，例如：

```shell showLineNumbers
zi ice as"program" mv"httpstat.sh -> httpstat" \
  pick"httpstat" atpull'!git reset --hard'
zi light b4b4r07/httpstat
```

如果 `atpull` 有感叹号前缀，那么它会在 `git pull` 之前执行，同时也在 `mv` 之前。 同时，`atpull`、`mv`、`cp` **只会在获取了新提交时运行**。

所以综上所述，当用户运行 `zi update b4b4r07/httpstat` 来更新这个插件，并且有新的提交时，首先运行的是 `git reset --hard`——它 **恢复了**原始的 `httpstat.sh`，**之后**运行 `git pull` 。并下载新提交（fast-forward），**再之后** `mv` 再次运行，因此命令是 `httpstat` 而不是 `httpstat.sh`。

这样， `mv` ice 可用于对插件的内容进行永久更改，而不会阻止使用 `git` （或在对于 snippet，使用 `subversion` 进行更新）的能力，更多内容见下文）。

:::info

为了使感叹号不被 Zsh 在会话中展开。使用 `'…'` 不是 `"…"` 来包裹 `atpull` 的内容 [ice 操作符](/search?q=ice-modifier)。

:::

## Snippet as'…' 命令

修饰符 `load` 和 `unload` 允许定义你希望插件何时激活或不激活。 例如：

```shell {2,4} showLineNumbers
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

指定 `as''` ice 修饰符的值为 `completion` ，可以将 `snippet` 子命令直接指向补全文件：

```shell {2} showLineNumbers
zi ice as"completion"
zi snippet https://github.com/docker/cli/blob/master/contrib/completion/zsh/_docker
```

## 补全管理

ZI 允许关闭或打开每一个插件的补全。 试试安装提供补全的热门插件：

```shell {1} showLineNumbers
zi ice blockf
zi light zsh-users/zsh-completions
```

第一个命令，`blockf` ice 修饰符，将会阻止添加补全的传统方式。 ZI 使用自身的方法，基于软链接而不是将多个目录添加到 `$fpath`。

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

```shell showLineNumbers
…
…
…
atach, bitcoin-cli, bower zsh-users/zsh-completions
bundle, caffeinate, cap zsh-users/zsh-completions
cask, cf, chattr zsh-users/zsh-completions
…
```

你可以通过提供一个**参数**让 `clist` 在每行显示更多补全，例如：`zi clist 6`，将显示：

```shell showLineNumbers
…
…
…
bundle, caffeinate, cap, cask, cf, chattr zsh-users/zsh-completions
cheat, choc, cmake, coffee, column, composer zsh-users/zsh-completions
console, dad, debuild, dget, dhcpcd, diana zsh-users/zsh-completions
…
```

### 启用/禁用 - 补全

可以禁用补全功能，这样就可以使用原始的 Zsh 补全功能。

这些命令非常基本，它们只有**名称**的补全。

```shell {1,3} showLineNumbers
$ zi cdisable cmake
Disabled cmake completion belonging to zsh-users/zsh-completions
$ zi cenable cmake
Enabled cmake completion belonging to zsh-users/zsh-completions
```

关于补全的信息就到这里。 还有一个命令 `zi csearch`，它将 **搜索** 所有插件目录中的可用补全，并显示它们是否已安装：

至此，你已经了解了补全控制的一切。

## 对子目录的 subversion

一般来说，要使用 **Github项目的子目录** 作为 snippet，在URL中添加 `/trunk/{path-to-dir}` ，比如说：

```shell showLineNumbers
zi ice svn
zi snippet https://github.com/zsh-users/zsh-completions/trunk/src
```

:::tip

For Oh-My-Zsh and Prezto, the OMZ:: and PZT:: prefixes work without the need to add the `/trunk/` infix, however, the path should point to a directory, not to a file.

:::

```shell showLineNumbers
zi ice svn
zi snippet PZT::modules/docker
```

插件也有默认安装的补全，像插件一样。

## Turbo 模式（Zsh >= 5.3）

The ice-modifier `wait` allows the user to postpone the loading of a plugin to the moment when the processing of `.zshrc` is finished and the first prompt is being shown.

它就像 Windows 一样——在启动过程中，它显示桌面，尽管它仍然在后台加载数据。

这有缺点，但肯定比 10 分钟的空白屏幕要好。 更何况，在 ZI 中，这种方法没有任何缺点——没有滞后、卡顿——无论加载多少插件，加载时命令行都完全可用。

:::info

Turbo 模式会加速 Zsh 启动速度 **50%–80%**。 比如，将从 200 ms 提速到 40 ms。

:::

:::note

需要 Zsh 5.3 或更高版本。

:::

要使用 Turbo 模式，向目标插件添加 `wait` ice 修饰符是一种方式。

```shell showLineNumbers
PS1="READY > "
zi ice wait'!0'
zi load halfo/lambda-mod-zsh-theme
```

这设置了插件 `halfo/lambda-mod-zsh-theme` 在加载 `zshrc` 加载完毕 `0` 秒后再加载。

它将在不久之后启动 它在大约 1 ms 后启动 在大约 1 ms 后显示基本提示：`READY >`.

你可能不会以这种方式加载提示符，但是，这是使用 Turbo 模式的极佳示例。

感叹号让 ZI 加载完毕插件时重置提示符——主题需要该功能。 与 Prezto 提示相同，但延迟更长：

```shell showLineNumbers
zi ice svn silent wait'!1' atload'prompt smiley'
zi snippet PZT::modules/prompt
```

使用 `zsh-users/zsh-autosuggestions` 避免任何缺点:

```shell showLineNumbers
zi ice wait lucid atload'_zsh_autosuggest_start'
zi light zsh-users/zsh-autosuggestions
```

### Turbo wait - the key to performance

It can be loaded asynchronously, which makes a huge difference when the amount of plugins increases. Usually used as `zi ice wait"<SECONDS>"`.

:::note

The `wait` and `wait"0"` is the same

:::

```shell title="~/.zshrc showLineNumbers"
zi ice wait
zi load z-shell/history-search-multi-word
```

Load after 2 seconds:

```shell showLineNumbers
zi ice wait"2"
zi load z-shell/history-search-multi-word
```

Also can be used in `light` and `snippet`:

```shell showLineNumbers
zi ice wait
zi snippet https://gist.githubusercontent.com/hightemp/5071909/raw/
```

### Turbo & lucid

Turbo and lucid are the most used options, because turbo mode is verbose, may require and option for quiet and this can be achieved with the `lucid`.

```shell showLineNumbers
zi ice wait lucid
zi load z-shell/history-search-multi-word
```

## Turbo with sophisticated prompts

For some, mostly advanced themes the initialization of the prompt is being done in a `precmd`-hook, i.e.; in a function that's gets called before each prompt.

The hook is installed by the [add-zsh-hook][12] Zsh function by adding its name to the `$precmd_functions` array.

To make the prompt fully initialized after Turbo loading in the middle of the prompt the same situation as with the `zsh-autosuggestions` plugin, the hook should be called from `atload''` ice`.

First, find the name of the hook function by examining the `$precmd_functions` array.

For example, for the `robobenklein/zinc` theme, they'll be two functions: `prompt_zinc_setup` and `prompt_zinc_precmd`:

```shell showLineNumbers
root@sg > ~ > print $precmd_functions < ✔ < 22:21:33
_zsh_autosuggest_start prompt_zinc_setup prompt_zinc_precmd
```

Then, add them to the ice-list in the `atload''` ice:

```shell {2} showLineNumbers
zi ice wait'!' lucid nocd \
  atload'!prompt_zinc_setup; prompt_zinc_precmd'
zi load robobenklein/zinc
```

The exclamation mark in `atload'!…'` is to track the functions allowing the plugin to be unloaded, as described [here][11]. It might be useful for the multi-prompt setup described next.

### Summary of turbo mode

Autosuggestions use the `precmd` hook, which is being called right after processing `zshrc` – `precmd` hooks are being called **right before displaying each prompt**.

Turbo with the empty `wait` ice will postpone the loading `1` ms after that, so `precmd` will not be called at that first prompt. This makes autosuggestions inactive at the first prompt.

**However** the given `atload` ice-modifier fixes this, it calls the same function that `precmd` would, right after loading autosuggestions, resulting in the same behavior of the plugin.

The ice `lucid` causes the under-prompt message saying `Loaded zsh-users/zsh-autosuggestions` that normally appears for every Turbo-loaded plugin to not show.

## Automatic condition based - load & unload

Ices `load` and `unload` allow defining when you want plugins active or inactive. 例如：

Load when in ~/tmp

```shell {1} showLineNumbers
zi ice load'![[ $PWD = */tmp* ]]' unload'![[ $PWD != */tmp* ]]' \
  atload"!promptinit; prompt sprint3"
zi load psprint/zprompts
```

Load when NOT in ~/tmp

```shell {1} showLineNumbers
zi ice load'![[ $PWD != */tmp* ]]' unload'![[ $PWD = */tmp* ]]'
zi load russjohnson/angry-fly-zsh
```

Two prompts, each active in different directories. This technique can be used to have plugin-sets, e.g. by defining parameter `$PLUGINS` with possible values like `cpp`, `web`, `admin` and by setting `load` / `unload` conditions to activate different plugins on `cpp`, on `web`, etc.

:::note

- 与 `wait` 不同的是， `load` / `unload` 是持续可用的，而不是只到第一次激活。

- 请注意，要卸载插件工作，插件需要加载跟踪，所以 `zi load …` 而不是 `zi light …`。

Tracking causes a slight slowdown, however, this doesn’t influence Zsh startup time when using Turbo mode.

:::

:::tip

See: [multiple prompts][15] for more information. It contains more real-world examples of a multi-prompt setup, which is being close to what the author uses in his setup.

:::

## Plugins and snippets

Plugins can be loaded using `load` or `light`.

```shell showLineNumbers
zi load  <repo/plugin> # Load with reporting/investigating.
zi light <repo/plugin> # Load without reporting/investigating.
```

If you want to source local or remote files (using direct URL), you can do so with `snippet`.

```shell
zi snippet <URL>
```

Such lines should be added to `.zshrc`.

Snippets are cached locally, use the `-f` option to download a fresh version of a snippet, or `zi update {URL}`.

Can also use `zi update --all` to update all snippets (and plugins).

### The fundamental difference between `load` and `light`

Plugin history-search-multi-word loaded with investigating:

```shell
zi load z-shell/H-S-MW
```

Two regular plugins loaded without investigating:

```shell showLineNumbers
zi light zsh-users/zsh-autosuggestions
zi light z-shell/F-Sy-H
```

Snippet:

```shell
zi snippet https://gist.githubusercontent.com/hightemp/5071909/raw/
```

### A Glance at the prompts

This is [powerlevel10k][18], [pure][17], [starship][16] sample:

Load powerlevel10k theme.

```shell title="~/.zshrc" showLineNumbers
zi ice depth"1"
zi light romkatv/powerlevel10k
```

Load pure theme

- 这将选择 `async.zsh` 库，并被 source。

```shell title="~/.zshrc" showLineNumbers
zi ice pick"async.zsh" src"pure.zsh"
zi light sindresorhus/pure
```

Load starship theme:

- 将选择 `starship` 二进制作为命令，来源为 GitHub Release
- `starship` 配置：`atclone` 创建 `init.zsh` 和 `completion`
- `atpull` 行为与 `atclone` 相同，并将在运行 `zi update` 时使用。
- `src` 将会 source init.zsh

```shell title="~/.zshrc" showLineNumbers
zi ice as"command" from"gh-r" \
  atclone"./starship init zsh > init.zsh; ./starship completions zsh > _starship" \
  atpull"%atclone" src"init.zsh"
zi light starship/starship
```

## Updates & Upgrades

Self update & compile

```shell
zi self-update
```

Update all plugins

```shell
zi update
```

Update specific plugin. Default is GitHub but can specify any with ice [from'…'][2]

```shell
zi update <user>/<repo>
```

Plugin parallel update plugins

```shell
zi update --parallel
```

Increase the number of jobs in a concurrent set to 40

```shell
zi update --parallel 40
```

### More examples on common use cases

Load the pure theme, with the zsh-async library that's bundled with it.

```shell title="~/.zshrc" showLineNumbers
zi ice pick"async.zsh" src"pure.zsh"
zi light sindresorhus/pure
```

Binary release in the archive, from GitHub-releases page. After automatic unpacking, it provides the program "fzf".

```shell title="~/.zshrc" showLineNumbers
zi ice from"gh-r" as"program"
zi light junegunn/fzf
```

One other binary release needs renaming from `docker-compose-Linux-x86_64`.

This is done by [ice modifier][1]: `mv'{from} -> {to}'`.

There are multiple packages per single version, for OS X, Linux, and Windows – so ice modifier `bpick` is used to select Linux package – in this case, this is not needed, ZI will grep operating system name and architecture automatically when there's no `bpick`.

```shell title="~/.zshrc" showLineNumbers
zi ice from"gh-r" as"program" mv"docker* -> docker-compose" bpick"*linux*"
zi load docker/compose
```

Vim repository on GitHub – a typical source code that needs compilation, ZI can manage it for you if you like, run `./configure` and other `make` stuff.

Ice-modifier `pick` selects a binary program to add to $PATH. You could also install the package under the path $ZPFX.

```shell title="~/.zshrc" showLineNumbers
zi ice as"program" atclone"rm -f src/auto/config.cache; ./configure" \
  atpull"%atclone" make pick"src/vim"
zi light vim/vim
```

Scripts that are built at install

> 有一个默认的 make 目标，「install」，它可以构建脚本。

The `make''` ice could also be: `make"install PREFIX=$ZPFX"`, if "install" wouldn't be the only, default target.

```shell title="~/.zshrc" showLineNumbers
zi ice as"program" pick"$ZPFX/bin/git-*" make"PREFIX=$ZPFX"
zi light tj/git-extras
```

Handle completions without loading any plugin, see `clist` command.

This one is to be run just once, in an interactive session.

```shell title="~/.zshrc"
zi creinstall %HOME/my_completions
```

For GNU ls the binaries can be gls, gdircolors, but not on OS X when installing the coreutils package from Homebrew.

```shell title="~/.zshrc" showLineNumbers
zi ice atclone"dircolors -b LS_COLORS > c.zsh" atpull'%atclone' pick"c.zsh" nocompile'!'
zi light trapd00r/LS_COLORS
```

`make'!'` -> run make before `atclone` & `atpull`.

```shell showLineNumbers
zi ice as"program" make'!' atclone'./direnv hook zsh > zhook.zsh' atpull'%atclone' src"zhook.zsh"
zi light direnv/direnv
```

If you are interested to try out more then check out the [playground repository][19] where users have uploaded the `~/.zshrc` and other ZI configurations.

Feel free to [submit][20] your `~/.zshrc` there if it contains ZI commands.

For some additional examples you can also check out the [collection][10].

[1]: /search?q=ice+modifiers

[1]: /search?q=ice+modifiers
[2]: /search?q=from
[10]: /docs/gallery/collection
[11]: /docs/guides/syntax/ice#atclone-atpull-atinit-atload
[12]: /community/zsh_plugin_standard#use-of-add-zsh-hook-to-install-hooks
[15]: /docs/guides/customization#multiple-prompts
[16]: https://github.com/starship/starship
[17]: https://github.com/sindresorhus/pure
[18]: https://github.com/romkatv/powerlevel10k
[19]: https://github.com/z-shell/playground
[20]: https://github.com/z-shell/playground/issues/new?template=request-to-add-zshrc-to-the-zi-configs-repo.md
