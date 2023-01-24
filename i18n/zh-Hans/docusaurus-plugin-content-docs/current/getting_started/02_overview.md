---
id: overview
title: '☑️ 一般概述'
image: /img/logo/320x320.png
description: Zi 使用概述
---

import ImgShow from '@site/src/components/ImgShow'; import Link from '@docusaurus/Link';

此概览包括以下内容：

1. [Oh-My-Zsh & Prezto](/search?q=Oh+My+Zsh+%26+Prezto)
2. [命令补全](/search?q=completions)
3. [Turbo 模式](/search?q=turbo+mode)
4. [Ice 修饰符](/search?q=ice+modifiers)

## 加载插件和片段

```shell showLineNumbers
zi load z-shell/H-S-MW
zi light zsh-users/zsh-syntax-highlighting
```

上面的命令显示了两种加载基本插件的方式。 如果你想加载本地或远程 (使用直链) 文件, 你可以使用 `snippet` 来实现。

```shell
zi snippet <URL>
```

应将此类行添加到 `.zshrc`。 片段在本地缓存，使用 `-f` 选项下载片段的新版本，或 `zi update {URL}`。 使用 `zi update --all` 更新所有片段和插件。

使用 `load` 可以启用报告 -- 这样你可以跟踪插件的工作，用 `zi report {plugin-name}`查看信息，然后用 `zi unload {plugin-name}`卸载插件。

使用 `light` ，可以在不跟踪和报告有关插件的情况下加速插件加载，但也牺牲了了卸载插件的能力。

使用 `load` 或 `light`。

```shell showLineNumbers
zi load  <repo/plugin> # Load with reporting/investigating.
zi light <repo/plugin> # Load without reporting/investigating.
```

带着跟踪报告加载 history-search-multi-word 插件：

```shell
zi load z-shell/H-S-MW
```

不带跟踪报告加载两个普通插件：

```shell showLineNumbers
zi light zsh-users/zsh-autosuggestions
zi light z-shell/F-Sy-H
```

片段:

```shell
zi snippet https://gist.githubusercontent.com/hightemp/5071909/raw/
```

:::note

在 Turbo 加载模式中，由插件跟踪带来的速度减慢是在后台完成的，并且不会影响用户体验。 例如,，使用`zi light` 和 `zi load` 具有相同的效果。

:::

## Oh-My-Zsh, Prezto

要加载Oh-My-Zsh和Prezto插件，请使用 `snippet` 功能。 片断是 **单个文件** ，通过 `curl`， `wget` 等工具从 URL 直接下载。下载工具会自动检测：

```shell showLineNumbers
zi snippet 'https://github.com/robbyrussell/oh-my-zsh/raw/master/plugins/git/git.plugin.zsh'
zi snippet 'https://github.com/sorin-ionescu/prezto/blob/master/modules/helper/init.zsh'
```

另外，对于 Oh-My-Zsh 和 Prezto ，你可以使用 `OMZ::` 和 `PZT::` 的缩写：

```shell showLineNumbers
zi snippet OMZ::plugins/git/git.plugin.zsh
zi snippet PZT::modules/helper/init.zsh
```

此外，GitHub 支持通过 Subversion 协议加载片段。 这允许加载多文件的片段（例如，一个 Prezto 模块可以由两个或多个文件组成，例如 `init.zsh` 和 `alias.zsh`）。

默认加载的文件是： `*.plugin.zsh`, `init.zsh`, `*.zsh-theme`。

指向目录的URL：

```shell {2} showLineNumbers
zi ice svn
zi snippet PZT::modules/docker
```

## Snippet 和性能

使用 `curl`， `wget` 等，加上Subversion，使我们几乎完全避免了专门用于 Oh-My-Zsh 和 Prezto 的代码，也避免了其他框架。 它提供了更好的性能，因为它对内存的占用很低，加载时间更短。

## Ice 修饰符

命令 `zi ice` 将为其紧随的下一条命令提供 [冰修饰符][1]。例：`zi ice <some-ice-modifier> zi load some/plugin`，在执行完下一条命令后，冰修饰符将会失效。

“冰”是一种添加物，例如添加到饮料或咖啡中 —— 在 Zi 里，冰修饰符将是下一条 Zi 命令的添加物。 “冰”也是会融化的东西，所以它不会留存很久 —— 在 Zi 里，这意味着它的效果只能作用于一条命令。

使用另一个冰修饰符 **pick** 用户可以明确地 **指定加载的文件**：

```shell {1} showLineNumbers
zi ice svn pick"init.zsh"
zi snippet PZT::modules/git
```

冰修饰符的内容只需要简单地置于 `"…"`、`'…'` 或 `$'…'` 之中。 不需要再在冰修饰符名称后加上 `":"`（当然这是合规的：它与 `=` 等效，例如 `pick="init.zsh"` 或 `pick=init.zsh`）。

以这样的写法，`vim`、`emacs` 等编辑器与 `zsh-users/zsh-syntax-highlighting`、`z-shell/F-Sy-H` 等插件可以高亮冰修饰符的内容。

## 关于 as"program"

一个插件可能不是一个用于 source 的文件，而是要添加到 `$PATH` 的命令 为了达到这种效果，使用 ice 修饰符 `as` 配合值 `program` (或者使用其别名 `command`).

```shell {1} showLineNumbers
zi ice as"program" cp"httpstat.sh -> httpstat" pick"httpstat"
zi light b4b4r07/httpstat
```

上述命令会把插件目录添加到 `$PATH`，拷贝文件 `httpstat.sh` 到 `httpstat` 并将可执行权限 (`+x`) 添加到通过 `pick` 所选的文件上.。即 `httpstat`。 另一个 ice 修饰符。`mv`。其工作原理类似于 `cp` 但 **移动**，而不是 **复制** 文件。 `mv` 在 `cp` 之前运行。

:::tip

`cp` 和 `mv` 这些 ice ( 还有一些其他的，如 `atclone`) 在插件或片段被 _安装_ 时运行. 要再次测试它们，请首先删除该插件或片段 ( 例如: `zi delete PZT::modules/osx`)。

:::

## Ice 修饰符: atpull'…'

复制文件对日后的更新是安全的 - 仓库的原始文件没有被修改， `Git` 会报告没有冲突。 然而, 如果在插件 **更新** 过程中使用了 `atpull` Ice 修饰符，那么 `mv` 也是可以使用的。

```shell showLineNumbers
zi ice as"program" mv"httpstat.sh -> httpstat" \
  pick"httpstat" atpull'!git reset --hard'
zi light b4b4r07/httpstat
```

如果 `atpull` 以感叹号 (!) 开头，那么它将在 `git pull`，以及 `mv`之前运行。 尽管如此， `atpull`, `mv`, 和 `cp` **只有在需要获取新的提交时才会运行**。

简言之，当用户运行 `zi update b4b4r07/httpstat` 以更新此插件，并且有新的提交时， 首先发生的是 `git reset --hard` 并且它 **还原** 了原始 `httpstat.sh`。 **然后运行** `git pull` ，它下载新的提交(快速前进), **接着** `mv` 重新运行，所以命令是 `httpstat` 而不是 `httpstat.sh`。

这样， `mv` Ice 修饰符可以用来对插件的内容进行永久性的修改，而不妨碍用 `git` ，或者用 `subversion` 在使用片段的情况下来更新它。

:::info

要想让Zsh在交互式会话中不展开感叹号，请使用 `'…'` ，而不是 `"…"` ，以包围 `atpull` [冰点修改器](/search?q=ice-modifier)的内容。

:::

## Ice 修饰符: subscribe'…'

Ice修饰符延迟加载加载一个插件，同时检查给定文件的修改时间。当给定文件发生变化时，它就会触发插件或片段的加载。

复制并粘贴下面的例子到终端，或将其添加到 `.zshrc` 文件中，然后用 `exec zsh`重新加载shell。

```shell {1} showLineNumbers
zi ice subscribe'{~/files-*,/tmp/files-*}' id-as'z-sub' lucid \
  atload'+zi-message "{profile}I have been loaded{nl}\
  {auto}\`Zi Rocks ♥\`"' notify"Yes that is cool ♥ "
zi load z-shell/0
```

按照上面订阅的内容更新文件，测试 Ice 修饰符：

```shell
touch ~/files-1
```

该插件或片段将随着文件的更新而被 source 。

## 片段 as'…' program

还可以使用**片段**将命令添加到 `$PATH`：

```shell {2} showLineNumbers
zi ice mv"httpstat.sh -> httpstat" \
  pick"httpstat" as"program"
zi snippet https://github.com/b4b4r07/httpstat/blob/master/httpstat.sh
```

:::tip

片断也支持 `atpull`，例如 `atpull'!svn revert'`。 还有一个 `atinit` ice 修饰符，在每次加载插件或片段之前执行。

:::

## 片段 as'…' completion

通过使用 `as'…'` ice 修饰符，其值为 `completion` ，你可以将 `snippet` 子命令直接指向一个代码补全文件：

```shell {1} showLineNumbers
zi ice as"completion"
zi snippet https://github.com/docker/cli/blob/master/contrib/completion/zsh/_docker
```

## 补全管理

Zi允许在每个插件中禁用和启用每个补全。 尝试安装一个提供补全的热门插件：

```shell {1} showLineNumbers
zi ice blockf
zi light zsh-users/zsh-completions
```

第一个命令， `blockf` ice 修饰符，将阻塞添加补全的传统方法。 Zi将使用基于符号链接的方法，而不是将几个目录添加到 `$fpath`。 Zi会自动**安装**，完成新下载的插件。

要卸载或安装补全：

卸载：

```shell
zi cuninstall zsh-users/zsh-completions
```

安装：

```shell
zi creinstall zsh-users/zsh-completions
```

### 列出可用补全

要查看**所有的**插件都提供哪些补全，下面的命令将以表格的形式展示并附上每个插件的名称：

```shell
zi clist
```

此命令适用于 `zsh-users/zsh-completions` 之类的插件，这些插件提供许多补全列表，每行有 `3` 个补全，这样做可以占用更少的终端页面，像这样：

<ImgShow height="455.91" width="1660" img="/img/cast/svg/zi_clist.svg" alt="Zi completion list" />

若要每行显示更多的补全，请向 `clist` 提供一个**参数**。比如 `zi clist 6`，将显示：

<ImgShow height="455.91" width="1660" img="/img/cast/svg/zi_clist_6.svg" alt="Zi completion list 6" />

### 启用/禁用 - 补全

可以禁用补全功能，并使用其他补全功能，例如 Zsh 的内置补全。 命令非常基本，只需要补全的**名字**：

禁用 `cmake` 补全

```shell
zi cdisable cmake
```

启用 `cmake` 补全

```shell
zi cenable cmake
```

命令 `zi csearch` 将**搜索**所有的插件目录，寻找可用的补全：

<ImgShow height="455.91" width="1180" img="/img/cast/svg/zi_csearch.svg" alt="Zi completion search" />

## 对子目录的 subversion

一般来说，要使用 Github 项目的**子目录**作为片段，可以在 URL 中添加 `/trunk/{path-to-dir}`：

```shell showLineNumbers
zi ice svn
zi snippet https://github.com/zsh-users/zsh-completions/trunk/src
```

:::tip

对于 Oh-My-Zsh 和 Prezto，还可以使用 `OMZ::` 和 `PZT::` 前缀，不需要添加 `/trunk/` 的后缀。如果这么做，路径应该指向一个目录，而不是一个文件。

:::

```shell showLineNumbers
zi ice svn
zi snippet PZT::modules/docker
```

## Turbo 模式（Zsh >= 5.3） {#turbo-mode-zsh--53}

冰修饰符 `wait` 允许用户将插件的加载时机推迟到 `.zshrc` 处理完毕、第一行命令行提示符出现之后。

它就像 Windows 的逻辑 —— 启动过程中，它首先显示一个桌面，然后在后台继续加载数据。 这种做法有缺点，但肯定比 10 分钟的空白屏幕要好。 但在 Zi 中，这种方法没有任何缺点 —— 没有延迟、冻结等问题。—— 在加载插件的过程中，命令行仍然完全可用，无论以这种方法加载了多少插件。

:::info

Turbo 模式将加速 Zsh 启动速度 **50%-80%**。 例如，从 200 ms 加速到 40 ms。

:::

:::note

需要 Zsh 5.3 及以上的版本。

:::

为了使用 Turbo 模式，以下列方式之一对目标插件使用冰修饰符 `wait`：

```shell {2} showLineNumbers
PS1="READY > "
zi ice wait'!0'
zi load halfo/lambda-mod-zsh-theme
```

这设置了插件 `halfo/lambda-mod-zsh-theme` ，在 `.zshrc` 后推迟 `0` 秒加载 。 It will fire up after c.a. 1 ms of showing the basic prompt `READY >`.

You probably won't load the prompt in such a way, however, it is a good example in which turbo mode can be observed. The exclamation mark causes Zi to reset the prompt after loading the plugin – commonly needed for themes. The same with Prezto prompts, with a longer delay:

```shell showLineNumbers
zi ice svn silent wait'!1' atload'prompt smiley'
zi snippet PZT::modules/prompt
```

Using `zsh-users/zsh-autosuggestions` without any drawbacks:

```shell showLineNumbers
zi ice wait lucid atload'_zsh_autosuggest_start'
zi light zsh-users/zsh-autosuggestions
```

### Turbo mode is the key to the performance

Turbo 模式可以异步地加载，这在插件数量增加时作用重大。 一般用法为 `zi ice wait'<SECONDS>'`。

:::note

单独使用 `wait` 等效于 `wait'0'`。

:::

```shell showLineNumbers
zi ice wait
zi load z-shell/history-search-multi-word
```

2秒后加载：

```shell showLineNumbers
zi ice wait'2'
zi load z-shell/history-search-multi-word
```

异步加载同样可用于 `light` 与 `snippet`：

```shell showLineNumbers
zi ice wait
zi snippet https://gist.githubusercontent.com/hightemp/5071909/raw/
```

### Turbo 模式和 lucid

Turbo 模式与 lucid 是最常用的组合，因为 Turbo 模式会打印加载日志 —— 可以通过添加 `lucid` 静默加载。

```shell showLineNumbers
zi ice wait lucid
zi load z-shell/history-search-multi-word
```

## 带有复杂命令行提示符的 Turbo 模式

对于一些，主要是高级主题，命令行提示符的初始化是在 `precmd` 钩子中完成的：`precmd` 钩子会在每行提示符出现之前执行一次。 钩子是由 Zsh [add-zsh-hook][12] 函数安装的，将其名称添加到 `$precmd_functions` 数组中。

使用 Turbo 模式异步加载主题可能导致钩子未执行，主题未能立即初始化。为了确保其能加载后能立即初始化，应使用 `atload'…'` 冰修饰符。

首先检查 `$precmd_functions` 找到主题安装的钩子。 在这里以主题 `robobenklein/zinc` 为例，它安装了两个钩子：`prompt_zinc_setup` 与 `prompt_zinc_precmd`：

```shell title="print $precmd_functions"
_zsh_autosuggest_start prompt_zinc_setup prompt_zinc_precmd
```

将其加入 `atload'…'`，确保主题加载后立即执行一遍钩子，完成初始化。

```shell {2} showLineNumbers
zi ice wait'!' lucid nocd \
  atload'!prompt_zinc_setup; prompt_zinc_precmd'
zi load robobenklein/zinc
```

`atload'!…'` 中的感叹号用于跟踪允许插件被卸载的方法，详见[此处](/docs/guides/syntax/standard#atclone-atpull-atinit-atload)。 它可能对接下来描述的命令行多重提示符设置很有用。

### Turbo 方式的总结

自动提示（auto-suggestion）功能使用了 `precmd` 钩子，它会在 `.zshrc` 处理过程结束后立即执行一次 —— 即所谓的**在每行提示符出现之前执行一次**。

Turbo 模式中，被单独的 `wait` 修饰的命令，其将在 `precmd` 钩子执行完毕的 `1` ms 后才执行。 这将使自动提示在第一行提示符无法支持这些命令。

**然而** `atload'…'` ice 修饰符解决了这个问题，它调用了与 `precmd` 相同的函数，在加载自动建议之后执行，和插件有着相同的行为。

The ice called `lucid` causes the under-prompt message saying `Loaded zsh-users/zsh-autosuggestions` that normally appears for every Turbo-loaded plugin to not show.

## 基于条件的自动化 - 加载和卸载

Ice 修饰符 `load` 和 `unload` 允许定义你想要的插件何时激活或不激活：

在 `~/tmp` 时加载：

```shell {1} showLineNumbers
zi ice load'![[ $PWD = */tmp* ]]' unload'![[ $PWD != */tmp* ]]' \
  atload'!promptinit; prompt sprint3'
zi load z-shell/zprompts
```

<ImgShow width="1100" height="325.65" img="/img/cast/svg/zi_load_at_tmp.svg" alt="Zi load at /tmp" />

在 `~/tmp` 时不加载：

```shell {1} showLineNumbers
zi ice load'![[ $PWD != */tmp* ]]' unload'![[ $PWD = */tmp* ]]'
zi load russjohnson/angry-fly-zsh
```

<ImgShow width="1100" height="325.65" img="/img/cast/svg/zi_load_not_tmp.svg" alt="Zi load not at /tmp" />

Two prompts, each active in different directories. This technique can be used to have plugin-sets, e.g. by defining parameter `$PLUGINS` with possible values like `cpp`, `web`, `admin` and by setting `load` / `unload` conditions to activate different plugins on `cpp`, on `web`, etc.

:::note

- The difference with `wait` is that `load` / `unload` are constantly active, not only till the first activation. Note that for the unloading of a plugin to work the plugin needs to be loaded with tracking, so `zi load …` and not `zi light …`.

Tracking causes a slight slowdown, however, this doesn’t influence Zsh startup time when using turbo mode.

:::

### A Glance at the prompts

:::tip

See: <Link to="/docs/guides/customization#multiple-prompts">multiple prompts</Link> or more information. It contains more real-world examples of a multi-prompt setup, which is close to what the author uses in his setup.

:::

This is [powerlevel10k](https://github.com/romkatv/powerlevel10k), [pure](https://github.com/sindresorhus/pure), [starship](https://github.com/starship/starship) sample:

Load powerlevel10k theme:

```shell title="~/.zshrc" showLineNumbers
zi ice depth"1"
zi light romkatv/powerlevel10k
```

Load pure theme:

> will pick the `async.zsh` library and will source it.

```shell {1} title="~/.zshrc" showLineNumbers
zi ice pick"async.zsh" src"pure.zsh"
zi light sindresorhus/pure
```

Load starship theme:

> - pick `starship` binary as a command, from the GitHub release.
> - setup `starship` using `atclone` and create `init.zsh` and `completion`.
> - the `atpull'…'` behavior same as `atclone'…'` and but is used when running `zi update`.
> - `src` will source `init.zsh`.

```shell {2} {3} title="~/.zshrc" showLineNumbers
zi ice as"command" from"gh-r" \
  atclone"./starship init zsh > init.zsh; ./starship completions zsh > _starship" \
  atpull"%atclone" src"init.zsh"
zi light starship/starship
```

### 常见用例 {#common-use-cases}

Load the pure theme, with the **zsh-async** library that's bundled with it.

```shell title="~/.zshrc" showLineNumbers
zi ice pick"async.zsh" src"pure.zsh"
zi light sindresorhus/pure
```

Binary release in the archive, from GitHub. After automatic unpacking, it provides the program "fzf".

```shell title="~/.zshrc" showLineNumbers
zi ice from"gh-r" as"program"
zi light junegunn/fzf
```

One other binary release needs renaming from `docker-compose-Linux-x86_64`. This can be done by [ice modifier][1]: `mv'{from} -> {to}'`.

There are multiple packages per single version for OS X, Linux, and Windows – the ice-modifier `bpick` is utilized to select the Linux package – in this case - not required, Zi will grep operating system name and architecture automatically when there's no `bpick`.

```shell title="~/.zshrc" showLineNumbers
zi ice from"gh-r" as"program" mv"docker* -> docker-compose" bpick"*linux*"
zi load docker/compose
```

Handle completions without loading any plugin, see the `clist` command. This one is to be run just once, in an interactive session.

```shell title="~/.zshrc"
zi creinstall %HOME/my_completions
```

If you are interested to try out more then check out the [playground repository](https://github.com/z-shell/playground) where users have uploaded the `~/.zshrc` and other Zi configurations. Feel free to [submit](https://github.com/z-shell/playground/issues/new?template=request-to-add-zshrc-to-the-zi-configs-repo.md) your `~/.zshrc` configuration.

其他例子：[collection](/community/gallery/collection)

<!-- end-of-file -->
<!-- links -->

[1]: /search?q=ice+modifiers

[1]: /search?q=ice+modifiers
[12]: /community/zsh_plugin_standard#use-of-add-zsh-hook-to-install-hooks
