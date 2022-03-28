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

要加载 Oh My Zsh 和 Prezto 插件，请使用 `snippet` 功能。 Snippet 是通过 `curl`、`wget` 等工具下载的单个文件， 支持从 URL 推断，自动选择下载工具。 For example:

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

上面的命令将会添加插件目录到 `$PATH`，复制文件 `httpstat.sh` 到 `httpstat` 并且添加执行权限 (`+x`) 到通过 `pick` 选中的文件，这里是添加给 `httpstat`。 Another ice-mod exists, `mv`, which works like `cp` but **moves** a file instead of **copying** it. `mv` is ran before `cp`.

:::tip

`cp` 和 `mv` ice 修饰符（或者其他类似的，就像 `atclone`）是在插件或 snippet _安装时_运行的。

要再次测试它们，请首先通过 `zi delete PZT::modules/osx` 删除（此处用 osx 插件举例）。

:::

## About - atpull"…"

复制文件对以后的更新是安全的——仓库的原始文件没有被修改， `Git` 不会产生冲突。

However, `mv` also can be used, if a proper `atpull`, an ice–modifier ran at **update** of the plugin, will be used:

```shell
zi ice as"program" mv"httpstat.sh -> httpstat" \
  pick"httpstat" atpull'!git reset --hard'
zi light b4b4r07/httpstat
```

If `atpull` starts with an exclamation mark, then it will be run before `git pull`, and before `mv`. Nevertheless, `atpull`, `mv`, `cp` are run **only if new commits are to be fetched**. Nevertheless, `atpull`, `mv`, `cp` are run **only if new commits are to be fetched**.

So in summary, when the user runs `zi update b4b4r07/httpstat` to update this plugin, and there are new commits, what happens first is that `git reset --hard` is run – and it **restores** original `httpstat.sh`, **then** `git pull` is ran and it downloads new commits (doing fast-forward), **then** `mv` is running again so that the command is `httpstat` not `httpstat.sh`.

This way the `mv` ice can be used to induce permanent changes into the plugin's contents without blocking the ability to update it with `git` (or with `subversion` in case of snippets, more on this below).

:::info

For exclamation marks to not be expanded by Zsh an interactive session, use `'…'` not `"…"` to enclose contents of `atpull` [ice-modifier](/search?q=ice-modifier).

:::

## Snippets as'…' commands

Commands can also be added to `$PATH` using **snippets**. 例如： For example:

```shell {2,4}
zi ice mv"httpstat.sh -> httpstat" \
  pick"httpstat" as"program"
zi snippet \
  https://github.com/b4b4r07/httpstat/blob/master/httpstat.sh
```

:::tip

Snippets also support `atpull`, so it’s possible to do e.g. `atpull'!svn revert'`.

There’s also an `atinit` ice-modifier, executed before each loading of plugin or snippet.

:::

## Snippets as'…' completions

By using the `as''` ice modifier with value `completion` you can point the `snippet` subcommand directly to a completion file:

```shell {2}
zi ice as"completion"
zi snippet https://github.com/docker/cli/blob/master/contrib/completion/zsh/_docker
```

## The completion management

ZI allows to disable and enable each completion in every plugin. Try installing a popular plugin that provides completions: Try installing a popular plugin that provides completions:

```shell {1}
zi ice blockf
zi light zsh-users/zsh-completions
```

The first command, the `blockf` ice, will block the traditional method of adding completions. The first command, the `blockf` ice, will block the traditional method of adding completions. ZI uses its method, based on symlinks instead of adding several directories to `$fpath`.

ZI will automatically **install** completions of a newly downloaded plugin.

To uninstall the completions and install them again, you would use:

Uninstall: `zi cuninstall zsh-users/zsh-completions`

Install: `zi creinstall zsh-users/zsh-completions`

### Listing available completions

:::note

`zini` is an alias that can be used in interactive sessions.

:::

To see what completions **all** plugins provide, in tabular formatting and with the name of each plugin, use:

```shell
zini clist
```

This command is specially adapted for plugins like `zsh-users/zsh-completions`, which provide many completions – listing will have `3` completions per line, so that a smaller number of terminal pages will be occupied like this:

```shell
…
…
atach, bitcoin-cli, bower zsh-users/zsh-completions
bundle, caffeinate, cap zsh-users/zsh-completions
cask, cf, chattr zsh-users/zsh-completions
…
```

You can show more completions per line by providing an **argument** to `clist`, e.g. `zi clist 6`, will show:

```shell
…
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

That’s all on completions. That’s all on completions. There’s one more command, `zi csearch`, that will **search** all plugin directories for available completions, and show if they are installed:

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

## Turbo Mode (Zsh >= 5.3)

The ice-mod `wait` allows the user to postpone the loading of a plugin to the moment when the processing of `.zshrc` is finished and the first prompt is being shown.

It is like Windows – during startup, it shows desktop even though it still loads data in the background.

This has drawbacks but is for sure better than a blank screen for 10 minutes. This has drawbacks but is for sure better than a blank screen for 10 minutes. And here, in ZI, there are no drawbacks of this approach – no lags, freezes, etc. – the command line is fully usable while the plugins are being loaded, for any number of plugins.

:::info

Turbo will speed up Zsh startup by **50%–80%**. For example, instead of 200 ms, it'll be 40 ms. For example, instead of 200 ms, it'll be 40 ms.

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

It will fire up after c.a. It will fire up after c.a. 1 ms of showing the basic prompt `READY >`.

You probably won't load the prompt in such a way, however, it is a good example in which Turbo can be directly observed.

The exclamation mark causes ZI to reset the prompt after loading the plugin – it is needed for themes. The same with Prezto prompts, with a longer delay: The same with Prezto prompts, with a longer delay:

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

Turbo with the empty `wait` ice will postpone the loading `1` ms after that, so `precmd` will not be called at that first prompt. This makes autosuggestions inactive at the first prompt. This makes autosuggestions inactive at the first prompt.

**However** the given `atload` ice-mod fixes this, it calls the same function that `precmd` would, right after loading autosuggestions, resulting in the same behavior of the plugin.

The ice `lucid` causes the under-prompt message saying `Loaded zsh-users/zsh-autosuggestions` that normally appears for every Turbo-loaded plugin to not show.

## A Quick Glance At [`for`][14] syntax

This introduction is based on the classic, two-command syntax (`zi ice …; zi load/light/snippet …`) of ZI. However, there's also available a recently added so-called _for-syntax_. However, there's also available a recently added so-called _for-syntax_.

It is the right moment to take a glance at it, by rewriting the above autosuggestions invocation using it:

```shell
zi wait lucid atload'_zsh_autosuggest_start' light-mode for zsh-users/zsh-autosuggestions
```

The syntax is a more concise one. The single command will work the same as the previous classic-syntax invocation. The syntax is a more concise one. The single command will work the same as the previous classic-syntax invocation. It also allows solving some typical problems when using ZI, like providing common/default ices for a set of plugins or sourcing multiple files with [`src''` ice][13]. For more information refer to the page dedicated to the syntax ([here][14]). For more information refer to the page dedicated to the syntax ([here][14]).

## Turbo with sophisticated prompts

For some, mostly advanced themes the initialization of the prompt is being done in a `precmd`-hook, i.e.; in a function that's gets called before each prompt.

The hook is installed by the [add-zsh-hook][12] Zsh function by adding its name to the `$precmd_functions` array.

To make the prompt fully initialized after Turbo loading in the middle of the prompt the same situation as with the `zsh-autosuggestions` plugin, the hook should be called from `atload''` ice`.

First, find the name of the hook function by examining the `$precmd_functions` array.

For example, for the `robobenklein/zinc` theme, they'll be two functions: `prompt_zinc_setup` and `prompt_zinc_precmd`:

```shell
root@sg > ~ > print $precmd_functions < ✔ < 22:21:33
_zsh_autosuggest_start prompt_zinc_setup prompt_zinc_precmd
```

Then, add them to the ice-list in the `atload''` ice:

```shell {2}
zi ice wait'!' lucid nocd \
  atload'!prompt_zinc_setup; prompt_zinc_precmd'
zi load robobenklein/zinc
```

The exclamation mark in `atload'!…'` is to track the functions allowing the plugin to be unloaded, as described [here][11]. It might be useful for the multi-prompt setup described next. It might be useful for the multi-prompt setup described next.

## Automatic load/unload based on condition {#automatic-loadunload-based-on-condition}

Ices `load` and `unload` allow defining when you want plugins active or inactive. 例如： For example:

Load when in ~/tmp

```shell {1}
zi ice load'![[ $PWD = */tmp* ]]' unload'![[ $PWD != */tmp* ]]' \
  atload"!promptinit; prompt sprint3"
zi load psprint/zprompts
```

Load when NOT in ~/tmp

```shell {1}
zi ice load'![[ $PWD != */tmp* ]]' unload'![[ $PWD = */tmp* ]]'
zi load russjohnson/angry-fly-zsh
```

Two prompts, each active in different directories. Two prompts, each active in different directories. This technique can be used to have plugin-sets, e.g. by defining parameter `$PLUGINS` with possible values like `cpp`, `web`, `admin` and by setting `load` / `unload` conditions to activate different plugins on `cpp`, on `web`, etc.

:::note

- The difference with `wait` is that `load` / `unload` are constantly active, not only till the first activation.

- Note that for the unloading of a plugin to work the plugin needs to be loaded with tracking, so `zi load …` and not `zi light …`.

Tracking causes a slight slowdown, however, this doesn’t influence Zsh startup time when using Turbo mode.

:::

:::tip

See: [multiple prompts][15] for more information. It contains more real-world examples of a multi-prompt setup, which is being close to what the author uses in his setup. It contains more real-world examples of a multi-prompt setup, which is being close to what the author uses in his setup.

:::

## Plugins and snippets

Plugins can be loaded using `load` or `light`.

```shell
zi load  <repo/plugin> # Load with reporting/investigating.
zi light <repo/plugin> # Load without reporting/investigating.
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

```shell
zi light zsh-users/zsh-autosuggestions
zi light z-shell/F-Sy-H
```

Snippet:

```shell
zi snippet https://gist.githubusercontent.com/hightemp/5071909/raw/
```

### A Glance to prompts

This is [powerlevel10k][18], [pure][17], [starship][16] sample:

Load powerlevel10k theme.

```shell title="~/.zshrc"
zi ice depth"1"
zi light romkatv/powerlevel10k
```

Load pure theme

- Will pick the `async.zsh` library and will source it.

```shell title="~/.zshrc"
zi ice pick"async.zsh" src"pure.zsh"
zi light sindresorhus/pure
```

Load starship theme:

- will pick `starship` binary as a command, from the GitHub release
- `starship` setup: `atclone` create `init.zsh` and `completion`
- `atpull` behavior same as `atclone` and will be used when running `zi update`
- `src` will source init.zsh

```shell title="~/.zshrc"
zi ice as"command" from"gh-r" \
  atclone"./starship init zsh > init.zsh; ./starship completions zsh > _starship" \
  atpull"%atclone" src"init.zsh"
zi light starship/starship
```

## ZI Upgrades

ZI can be updated to `self-update` and plugins to `update`.

Self-update

```shell
zi self-update
```

Update all plugins

```shell
zi update
```

Update specific plugin. Update specific plugin. Default is GitHub but can specify any with ice [from''][2]

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

## The Turbo and Lucid

Turbo and lucid are the most used options.

### Turbo

Turbo mode is the key to performance.

It can be loaded asynchronously, which makes a huge difference when the amount of plugins increases.

Usually used as `zi ice wait"<SECONDS>"`, let's use the previous example:

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

Turbo mode is verbose, so you need an option for quiet. To achieve this the `lucid` can be used.s To achieve this the `lucid` can be used.s

```shell
zi ice wait lucid
zi load z-shell/history-search-multi-word
```

### Some examples with ZI

After installing ZI you can start adding some actions (load some plugins) to `~/.zshrc`, at the bottom.

Some examples: Load the pure theme, with the zsh-async library that's bundled with it.

```shell title="~/.zshrc"
zi ice pick"async.zsh" src"pure.zsh"
zi light sindresorhus/pure
```

### As glance at the <code>for</code> syntax

Load all of the above plugins with a single command:

:::tip

To find more information about anything use [search][3] or just <kbd>CTRL+K</kbd>.

:::

```shell title="~/.zshrc"
zi light-mode for \
    zsh-users/zsh-autosuggestions \
    z-shell/F-Sy-H \
    z-shell/H-S-MW \
  pick"async.zsh" src"pure.zsh" \
    sindresorhus/pure
```

Binary release in the archive, from GitHub-releases page. After automatic unpacking, it provides the program "fzf". After automatic unpacking, it provides the program "fzf".

```shell title="~/.zshrc"
zi ice from"gh-r" as"program"
zi light junegunn/fzf
```

One other binary release needs renaming from `docker-compose-Linux-x86_64`.

This is done by [ice modifier][1]: `mv'{from} -> {to}'`.

There are multiple packages per single version, for OS X, Linux, and Windows – so ice modifier `bpick` is used to select Linux package – in this case, this is not needed, ZI will grep operating system name and architecture automatically when there's no `bpick`.

```shell title="~/.zshrc"
zi ice from"gh-r" as"program" mv"docker* -> docker-compose" bpick"*linux*"
zi load docker/compose
```

Vim repository on GitHub – a typical source code that needs compilation, ZI can manage it for you if you like, run `./configure` and other `make` stuff.

Ice modifier `pick` selects a binary program to add to $PATH. You could also install the package under the path $ZPFX. You could also install the package under the path $ZPFX.

```shell title="~/.zshrc"
zi ice as"program" atclone"rm -f src/auto/config.cache; ./configure" \
  atpull"%atclone" make pick"src/vim"
zi light vim/vim
```

Scripts that are built at install

> There's single default make target, "install", and it constructs scripts.

The `make''` ice could also be: `make"install PREFIX=$ZPFX"`, if "install" wouldn't be the only, default target.

```shell title="~/.zshrc"
zi ice as"program" pick"$ZPFX/bin/git-*" make"PREFIX=$ZPFX"
zi light tj/git-extras
```

Handle completions without loading any plugin, see `clist` command.

This one is to be run just once, in an interactive session.

```shell title="~/.zshrc"
zi creinstall %HOME/my_completions
```

For GNU ls the binaries can be gls, gdircolors, but not on OS X when installing the coreutils package from Homebrew.

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

Feel free to [submit][20] your `~/.zshrc` there if it contains ZI commands.

For some additional examples you can also check out the:

- [Collection][10],
- [Oh-My-Zsh][9].

[1]: /search?q=ice+modifiers

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
