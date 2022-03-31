---
title: '☑️ 概览'
image: zw/logo/320x320.png
description: 对 Z-Shell ZI 的用例概览。
keywords:
  - overview
---

此概览包括：

1. [Oh My Zsh & Prezto](/search?q=Oh+My+Zsh+%26+Prezto)
2. [命令补全](/search?q=completions)
3. [Turbo 模式](/search?q=turbo+mode)
4. [Ice 修饰符](/search?q=ice+modifiers)

## 装载插件的基本用法

```shell
zi load z-shell/H-S-MW
zi light zsh-users/zsh-syntax-highlighting
```

以上命令展示了两种基本插件加载方式。

使用 `load` 加载会打开报告——你可以知道插件做了什么，通过`zi report {插件名}` 查看信息，通过 `zi unload {插件名}` 卸载插件。

使用 `light` 加载会快很多，没有额外的追踪和报告。用户将不能查看报告或卸载。

:::note

在 Turbo 模式下，由于跟踪引起的减速可以忽略不计。

:::

## Oh My Zsh, Prezto

要加载 Oh My Zsh 和 Prezto 插件，请使用 `snippet` 功能。 Snippet 是通过 `curl`、`wget` 等工具下载的单个文件， 支持从 URL 推断，自动选择下载工具。 例如：

```shell
zi snippet 'https://github.com/robbyrussell/oh-my-zsh/raw/master/plugins/git/git.plugin.zsh'
zi snippet 'https://github.com/sorin-ionescu/prezto/blob/master/modules/helper/init.zsh'
```

对于 Oh My Zsh 和 Prezto 你可以使用 `OMZ::` 或 `PZT::` 缩写：

```shell
zi snippet OMZ::plugins/git/git.plugin.zsh
zi snippet PZT::modules/helper/init.zsh
```

此外，snippet 支持 Subversion 协议，Github 也支持该协议。 这允许加载多个文件构成的 snippet（例如，Prezto 模块可能包含两个或多个文件，就像 `init.zsh` 和 `alias.zsh`）。

默认会 source 以下文件：`*.plugin.zsh`, `init.zsh`, `*.zsh-theme`：

指向文件夹的 URL：

```shell {3}
zi ice svn
zi snippet PZT::modules/docker
```

## Snippet 和性能

通过 `curl`、`wget` 等等下载工具以及 Subverion，可以直接使用 Oh My Zsh、Prezto 等等的功能，而非特定于框架。

这对 `ZI` 的性能带来了好处，它真的很快且紧凑（低内存占用、短加载时间）.

## Ice 修饰符

`zi ice` 命令可以对下个命令添加 [ice 修饰符][1].

其逻辑是，「冰」是被添加的东西，例如添加到饮料或咖啡中，在 ZI 意义上，这意味着冰是添加到下一个 ZI 命令中的修饰符，也是会融化的东西，所以它不会持续很久，——而在 ZI 使用中，这意味着修饰符只持续到下一条 ZI 命令。

使用 "**pick**" 修饰符，用户可以**显式 source 文件**:

```shell {1}
zi ice svn pick"init.zsh"
zi snippet PZT::modules/git
```

ice 修饰符的参数可用以下方式添加：`"…"`, `'…'`, or `$'…'`。 不需要在 ice 修饰符后面添加 `":"`（虽然不会产生错误，就像 `=` 一样，例如 `pick="init.zsh"` 或者 `pick=init.zsh` 都会被正确识别）。

这样，像 `vim`、`emacs`、`zsh-users/zsh-syntax-highlighting`、`z-shell/F-Sy-H` 都会高亮 ice 修饰符。

## 关于 as"program"

也许有的插件不作为 source 但作为添加到 `$PATH` 的命令。如果想要达到这个效果，使用 ice 修饰符 `as` 以及参数 `program` （或者别名 `command`）。 为了获得这种效果，使用 ice 修饰符 `as` 以及参数 `program`（或者别名 `command`）。

```shell
zi ice as"program" cp"httpstat.sh -> httpstat" pick"httpstat"
zi light b4b4r07/httpstat
```

上面的命令将会添加插件目录到 `$PATH`，复制文件 `httpstat.sh` 到 `httpstat` 并且添加执行权限 (`+x`) 到通过 `pick` 选中的文件，这里是添加给 `httpstat`。 另一个修饰符是 `mv`。类似 `cp` 但是**移动**而非**复制**文件。`mv` 在 `cp` 之前运行。 `mv` 在 `cp` 之前运行。

:::tip

`cp` 和 `mv` ice 修饰符（或者其他类似的，就像 `atclone`）是在插件或 snippet _安装时_运行的。

要再次测试它们，请首先通过 `zi delete PZT::modules/osx` 删除（此处用 osx 插件举例）。

:::

## 关于 atpull'…'

复制文件对以后的更新是安全的——仓库的原始文件没有被修改， `Git` 不会产生冲突。

当然，也可以使用 `mv` 搭配 `atpull`，该 ice 修饰符在**更新时**运行，例如：

```shell
zi ice as"program" mv"httpstat.sh -> httpstat" \
  pick"httpstat" atpull'!git reset --hard'
zi light b4b4r07/httpstat
```

如果 `atpull` 有感叹号前缀，那么它会在 `git pull` 之前执行，同时也在 `mv` 之前。 总之，`atpull`、`mv`、`cp` **只有在要获取新的提交时**才会运行。

总的来说，当用户运行 `zi update b4b4r07/httpstat` 更新插件时，并且有新 commit 加入，首先 `git reset --hard` 被运行——他 **复原**原始的 `httpstat.sh`，**然后** `git pull` 被运行，这下载了 commit（使用 fast-forward）， **之后** `mv` 再次被运行。所以命令叫 `httpstat` 而不是 `httpstat.sh`。

这样， `mv` ice 修饰符可以用于永久修改插件，而不会阻碍用 `git` 更新的能力（或者，对于 snippet，用 `subversion` 下面会有详细介绍）。

:::info

为了避免被 Zsh 交互对话展开感叹号，使用 `'…'` 而不是 `"…"` 包裹 `atpull` [ice 修饰符](/search?q=ice-modifier)。

:::

## Snippet as'…' 命令

Commands can also be added to `$PATH` using **snippets**. 例如： 例如：

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

通过使用 `as''` ice 修饰符与参数 `completion` 你可以将 `snippet` 子命令直接指向补全文件。

```shell {2}
zi ice as"completion"
zi snippet https://github.com/docker/cli/blob/master/contrib/completion/zsh/_docker
```

## 补全管理

ZI 允许关闭或打开每一个插件的补全。试试安装提供补全的热门插件： 试试安装提供补全的热门插件：

```shell {1}
zi ice blockf
zi light zsh-users/zsh-completions
```

第一个命令，`blockf` ice 修饰符，将会阻止添加补全的传统方式。 ZI 将会使用自己的命令，基于软链接而非添加数个目录到 `$fpath`。

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

这个命令特别适用于像 `zsh-users/zsh-completions`这样的插件，它提供了许多补全功能——列出它们每行将会有 `3` 个，这样就会占用较少的终端页。

```shell
…
…
atach, bitcoin-cli, bower zsh-users/zsh-completions
bundle, caffeinate, cap zsh-users/zsh-completions
cask, cf, chattr zsh-users/zsh-completions
…
```

你可以通过提供一个**参数**让 `clist` 在每行显示更多不全，例如：`zi clist 6`，将显示：

```shell
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

```shell {1,3}
$ zi cdisable cmake
Disabled cmake completion belonging to zsh-users/zsh-completions
$ zi cenable cmake
Enabled cmake completion belonging to zsh-users/zsh-completions
```

关于补全的信息就到这里。 还有一个命令， `zi csearch`，它将**搜索**所有插件目录下的可用补全，并显示它们是否被安装。

至此，你已经了解了补全控制的一切。

## 对子目录的 subversion

一般来说，要使用 **Github项目的子目录** 作为 snippet，在URL中添加 `/trunk/{path-to-dir}` ，比如说：

```shell
zi ice svn
zi snippet https://github.com/zsh-users/zsh-completions/trunk/src
```

:::tip

对于 Oh My Zsh 和 Prezto，OMZ:: 和 PZT:: 前缀可用，不需要添加 `/trunk/` 后缀，然而，路径应该指向一个目录，而不是一个文件。

:::

```shell
zi ice svn
zi snippet PZT::modules/docker
```

插件也有默认安装的补全，像插件一样。

## Turbo 模式（Zsh >= 5.3）

Ice 修饰符 `wait` 允许用户将插件的加载推迟到 `.zshrc` 处理完成并显示第一行提示的时候。

它就像 Windows 一样——在启动过程中，它显示桌面，尽管它仍然在后台加载数据。

这有缺点，但肯定比 10 分钟的空白屏幕要好。 并且，ZI 使用的方法没有任何缺点——不会卡顿、滞后等等。在加载插件的时候命令行完全可用，无论有多少插件。

:::info

Turbo 模式会加速 Zsh 启动速度 **50%–80%**。 比如，将从 200 ms 提速到 40 ms。

:::

:::note

需要 Zsh 5.3 或更高版本。

:::

要使用 Turbo 模式，向目标插件添加 `wait` ice 修饰符是一种方式。

```shell
PS1="READY > "
zi ice wait'!0'
zi load halfo/lambda-mod-zsh-theme
```

这设置了插件 `halfo/lambda-mod-zsh-theme` 在加载 `zshrc` 加载完毕 `0` 秒后再加载。

它在大约 1 ms 后启动 在大约 1 ms 后显示基本提示：`READY >`.

你可能不会以这种方式加载提示符，但是，这是使用 Turbo 模式的极佳示例。

感叹号让 ZI 加载完毕插件时重置提示符——主题需要该功能。这和 Prezto prompts 功能类似，但它的延迟更高： 这和 Prezto prompts 功能类似，但它的延迟更高：

```shell
zi ice svn silent wait'!1' atload'prompt smiley'
zi snippet PZT::modules/prompt
```

使用 `zsh-users/zsh-autosuggestions` 避免任何缺点:

```shell
zi ice wait lucid atload'_zsh_autosuggest_start'
zi light zsh-users/zsh-autosuggestions
```

解释：

自动建议使用 `precmd` 钩子，这在处理完毕 `zshrc` 后被调用。——`precmd` 会在执行提示符之前被恰当调用。

Turbo 下若使用无参数的 `wait` 修饰符，将延后提示符到 `1` ms 之后，所以 `precmd` 不在第一次提示时被调用。 这使得自动建议在第一次提示时不可用。

**然而** 给定的 `atload` ice 修饰符解决了这个问题，它调用 `precmd` 会调用的同一函数，就在加载 autosuggestions 后，所以插件行为不会变化。

Ice 操作符 `lucid` 让 Turbo 模式下的加载插件提示 `Loaded zsh-users/zsh-autosuggestions` 消失。

## 快速浏览 [`for`][14] 语法

该介绍基于经典的，双命令的 ZI 语法 (`zi ice …; zi load/light/snippet …`)。但也有最近添加的，所谓 _for 语法_。 但也有最近添加的，所谓 for 语法。

是时候一瞥 for 了，可以这样重写上面的 autosuggestions 调用：

```shell
zi wait lucid atload'_zsh_autosuggest_start' light-mode for zsh-users/zsh-autosuggestions
```

这种语法更加简洁。 一条命令可以相当于经典写法下的多条命令。 这也解决了使用 ZI 时的一些常见问题，像是为一组插件提供共用/默认的 ice 修饰符，或者通过 [`src''` 修饰符][13] source 多个文件。更多信息请参见 for 语法专页。（[这里][14]）. 更多信息请参考专门介绍 for 语法的页面（[这里][14]）。

## 具有复杂提示的 Turbo 启动

对于一些，主要是高级主题，提示的初始化是在 `precmd` 钩子中完成的，也就是说，在每次提示前调用函数。

钩子是由 [add-zsh-hook][12] Zsh 函数安装的，将其名称添加到 `$precmd_functions` 数组中。

为了使 Turbo 加载后的提示完全初始化，与 `zsh-autosuggestions` 插件的情况相同，应该从 `atload''` ice`调用钩子。

首先，通过检查 `$precmd_functions` 数组找到钩子函数的名称。

例如，对于 `robobenklein/zinc` 主题，它们将是两个函数。`prompt_zinc_setup` 和 `prompt_zinc_precmd`。

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

`atload'!…'` 中的感叹号，是为了跟踪函数并允许卸载他们。就如 [ 这里][11]描述的一样。这对下面描述的多个提示符的设置非常有用。 它可能对接下来描述的多提示符设置很有用。

## 基于条件的自动加载/卸载 {#automatic-loadunload-based-on-condition}

修饰符 `load` 和 `unload` 允许定义你希望插件何时激活或不激活。 例如：

在 ~/tmp 中加载时

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

两个提示符，它们在不同的文件夹下被激活。 两个提示符，它们在不同的文件夹下被激活。该技术可以用于用于插件组，例如通过定义 `$PLUGINS` 的值如 `cpp`，`web`， `admin` 并通过设置 `load` / `unload` 条件激活 `cpp` 或 `web` 插件组。

:::note

- 与 `wait` 不同的是， `load` / `unload` 是持续可用的，而不是只到第一次激活。

- 请注意，为了使插件的卸载工作顺利进行，该插件需要被加载跟踪，所以使用 `zi load …` 而不是 `zi light …`。

追踪会导致轻微的减速，然而，这并不影响使用 Turbo 模式时 Zsh 的启动时间。

:::

:::tip

参见：[多个提示符][15]以了解更多信息。其中包含不止一个多提示符的设置案例，这些用例也正是文章作者本人使用的。 其中包含不止一个多提示符的设置案例，这些用例也正是文章作者本人使用的。

:::

## 插件和 snippet

插件可以使用 `load` 或 `light` 加载。

```shell
zi load  <repo/plugin> # Load with reporting/investigating.
zi light <repo/plugin> # Load without reporting/investigating.
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

更新特定的插件。 更新特定的插件。默认为 GitHub，但也可以通过 ice 修饰符 [from''][2] 指定。

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

`wait` 和 `wait"0"` 等价

:::

```shell title="~/.zshrc"
zi ice wait
zi load z-shell/history-search-multi-word
```

2秒后加载。

```shell
zi ice wait"2"
zi load z-shell/history-search-multi-word
```

也可用于 `light` 和 `snippet`。

```shell
zi ice wait
zi snippet https://gist.githubusercontent.com/hightemp/5071909/raw/
```

### Lucid

Turbo 模式详细日志，所以需要一个安静选项。 为了实现这一点，可以使用 `lucid` 。

```shell
zi ice wait lucid
zi load z-shell/history-search-multi-word
```

### ZI 的一些示例

安装 ZI 后，你可以开始向底部的 `~/.zshrc` 添加一些动作（加载一些插件）。

一些例子。加载 pure 主题，以及与之捆绑的 zsh-async 库。

```shell title="~/.zshrc"
zi ice pick"async.zsh" src"pure.zsh"
zi light sindresorhus/pure
```

### 一瞥 <code>for</code> 语法

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

归档中的二进制发行版，来自 GitHub Release 页面。 在自动解压之后，提供 「fzf」程序。

```shell title="~/.zshrc"
zi ice from"gh-r" as"program"
zi light junegunn/fzf
```

另一个二进制发行 需要从 `docker-compos-Linux-x86_64` 重命名。

这通过 [ice 修饰符][1]: `mv'{from} -> {to}'`。

每个单一版本有多个软件包，适用于 OS X、Linux 和 Windows——所以 ice 修改器 `bpick` 被用来选择 Linux 软件包——在这种情况下，这是没有必要的，当 没有 `bpick` 时，ZI 会自动搜索操作系统名称和架构。

```shell title="~/.zshrc"
zi ice from"gh-r" as"program" mv"docker* -> docker-compose" bpick"*linux*"
zi load docker/compose
```

GitHub 上的 Vim 仓库——一个典型的需要编译的源代码，如果你愿意，ZI可以为你管理，运行 `./configure` 以及 `make`。

Ice 修饰符 `pick` 用于选择要添加到 $PATH 的二进制程序。 Ice 修饰符 `pick` 选择并添加二进制程序到 $PATH。你也能在 $ZPFX 下安装包。

```shell title="~/.zshrc"
zi ice as"program" atclone"rm -f src/auto/config.cache; ./configure" \
  atpull"%atclone" make pick"src/vim"
zi light vim/vim
```

安装时构建的脚本

> 有一个默认的 make 目标，「install」，它可以构建脚本。

`make''` ice 修饰符也可以像这样： `make"install PREFIX=$ZPFX"`，如果「install」不是唯一的默认的构建目标。

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

`make'!` -> 运行 make 之前 `atclone` & `atpull`。

```shell
zi ice as"program" make'!' atclone'./direnv hook zsh > zhook.zsh' atpull'%atclone' src"zhook.zsh"
zi light direnv/direnv
```

如果您有兴趣，想尝试更多，请查看用户上传的 `~/.zshrc` 以及其他 ZI 配置的[实验场仓库][19]。

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
