---
id: zsh_plugin_standard
title: ℹ️ Zsh Plugin Standard
sidebar_position: 2
---

## Zsh 插件是什么？

从历史上看，Zsh 插件最初是由 Oh My Zsh 定义的。 他们提供了一种打包的方式，来封装扩展或以特定方式配置 shell 功能的文件。

简单来说，一个插件：

1. Has its directory added to `$fpath` ([Zsh documentation](http://zsh.sourceforge.net/Doc/Release/Functions.html#Autoloading-Functions)). 这由插件管理器或插件自己完成 ( 更多信息请阅读 [第5部分](#run-on-unload-call)) 。

2. 这些插件应该有统一标准的文件后缀名 `*.plugin.zsh` （而类似`*.zsh`, `init.zsh`, `*.sh`, 这些文件后缀名是非标准的）。

   2.1 The first point allows plugins to provide completions and functions that are loaded via Zsh’s `autoload` mechanism (a single function per file).

3. 从更全面的角度来看，一个插件包含以下几点：

   3.1. A directory containing various files (the main script, autoload functions, completions, Makefiles, backend programs, documentation).

   3.2. 可以通过`$0`获取插件源代码脚本的所在路径 (更多相关改进建议请参阅 [下一节](#zero-handling))。

   3.3. A Github (or another site) repository identified by two components **username**/**pluginname**.

   3.4. 软件包应该要支持任意类型的命令行包管理工具 —— 比如使用带有 hooks 技术的高级插件管理器在运行Makefiles安装插件时可以触发钩子, 将插件目录添加到`$PATH`。

下面是对 "Zsh插件 "的定义和插件 管理者的行为的增强和编纂建议——建议的标准化。

它们涵盖了如何编写Zsh插件的信息。

## 1. Standardized `$0` Handling {#zero-handling}

> [ zero-handling ]

要获取插件的位置，插件应该这样做:

```shell showLineNumbers
0="${ZERO:-${${0:#$ZSH_ARGZERO}:-${(%):-%N}}}"
0="${${(M)0:#/*}:-$PWD/$0}"
```

然后使用`${0:h}`获取插件的目录。

以上的单行代码将：

1. 向后兼容正常的 `$0` 设置和使用。

2. 如果插件目录不为空，可以使用 ` $0 ` 。

   - 在插件管理器载入插件前，可以轻松更改有效的 `$0`。

   - 这允许例如 `eval "$(<plugin)"`，这可能比 `source` 更快（[查看这两种方案的比较](http://www.zsh.org/mla/workers/2017/msg01827.html) 请注意，这不适用于已经编译好的脚本）。

3. 如果它不包含 Zsh 二进制文件的路径，请使用 `$0` 。

   - 插件管理器仍然能够设置 `$0`，尽管比较困难，需要在载入插件脚本之前设置一个 `unsetopt function_argzero` ，然后在载入插件脚本之后使用 `0=…` 进行赋值。

   - `unsetopt function_argzero` will be detected (it causes `$0` not to contain a plugin-script path, but the path to Zsh binary, if not overwritten by a `0=…​` assignment),

   - `setopt posix_argzero` 被检测到后（同上）。

4. 使用 `%N` 提示扩展标志，它总是给出脚本的绝对路径。

   - 插件管理器无法预加载（不可能实现插件的提前加载），但直接加载插件文件（不通过插件管理器）的方法将被保存下来，以避免由提到的 `*_argzero` 选项引起的破坏，所以这是一个 非常好的最后退路。

5. 最后，在第二行中，如果有必要请预置 ` $PWD ` 确保 `$0` 包含插件的绝对路径。

支持 `eval “$(<plugin)”` 以及明确解决 `setopt no_function_argzero` 和 `setopt posix_argzero` 的目标是为了保证获取插件路径的灵活性。

插件管理器甚至能够将一个插件转换为一个函数（作者对这个的概念性的功能进行了验证，它是完全可能的--也是以自动化的方式），但其性能差异尚不清楚。

但是，它可能会提供一个用例。

最后，第5点也允许在脚本中使用 ` $0 ` 的处理方式（即用 hashbang  ` #!… `）来获取脚本文件所在的目录。

这种引用环境变量的方法使其能够适应类似 `GLOB_SUBST` 和 `GLOB_ASSIGN` 选项。 这是一个标准的代码片段，所以它始终是可以运行的。

当你在例如： `zsh` 函数中实验时，一般来说你不必引用全局变量。

### **STATUS:** [ zero-handling ]

1. 插件管理器 [ZI](https://github.com/z-shell/zi)，[Zinit](https://github.com/zdharma-continuum/zinit)， [Zpm](https://github.com/zpm-zsh/zpm)， [Zgenom](https://github.com/jandamm/zgenom),，Zgen（可能要在 [PR](https://github.com/tarjoilija/zgen/pull/124) 被合并之后得到支持)。

2. 插件： [GitHub search](https://github.com/search?q=%22${ZERO:-${0:%23$ZSH_ARGZERO}}%22&type=Code)

## 2. Functions 目录 {#funtions-directory}

> [ functions-directory ]

尽管如此，在现行标准下，插件仍然是将其主目录添加到`$fpath` ，我们提出了一个更干净的方法：

插件使用一个名为 `functions` 的子目录来存储它们的补全和自动加载函数。 这允许更干净的插件设计

插件管理器应该将这样的一个子目录添加到 `$fpath`。

当前插件管理器缺乏支持的问题可以通过 <a href=“#indicator”> 指导 </a> 轻松解决

```shell showLineNumbers
if [[ ${zsh_loaded_plugins[-1]} != */kalc && -z ${fpath[(r)${0:h}/functions]} ]] {
    fpath+=( "${0:h}/functions" )
}
```

或者，使用 `PMSPEC` <a href=“#PMSPEC”>参数</a>：

```shell showLineNumbers
if [[ $PMSPEC != *f* ]] {
    fpath+=( "${0:h}/functions" )
}
```

添加了上面代码片段的 `plugin.zsh` 文件将会把目录添加到 `$fpath`, 将保留与任何支持新标准的插件管理器的兼容性。

`functions` 子目录的存在将取代把插件主目录添加到`$fpath`的常规操作。

### **STATUS:** [ functions-directory ]

1. 插件管理器: [Zpm](https://github.com/zpm-zsh/zpm)， [ZI](https://github.com/z-shell/zi)， [Zinit](https://github.com/zdharma-continuum/zinit)， [Zgenom](https://github.com/jandamm/zgenom)。

## 3. 二进制文件目录 {#binaries-directory}

> [ binaries-directory ]

插件有时会提供一个可执行的脚本或程序，供其内部使用或供终端用户使用。

对于后者建议该插件应在其主目录内使用 `bin/` 子目录（对于内部使用建议可运行程序应通过调用 `$0` 来获取值，如上所述）。

插件的二进制文件应该被放入目录，并分配 `+x` 执行权限。

插件管理器的任务应该是：

1. 在载入插件的脚本之前，它应该检测 `bin/` 目录是否存在于插件目录中。

2. 如果 `bin/` 目录存在，它应该将目录添加到 `$PATH`。

3. 插件管理器也可以不扩展 `$PATH`，而是创建一个 **shim** （即一个转发脚本）或者在一个已经被添加到 `$PATH` 的公共目录内创建一个 符号链接（以限制扩展它）。

4. 插件管理器被允许做一些可选的事情，比如确保目录的内容具有 `+x` 的可执行权限。

当 `$PMSPEC` 的特征码字母是 `b` 时，它允许插件自行通过 `$PATH` 进行扩展， 例如：

```shell showLineNumbers
if [[ $PMSPEC != *b* ]] {
    path+=( "${0:h}/bin" )
}
```

### **STATUS:** [ binaries-directory ]

1. 插件管理器： [Zpm](https://github.com/zpm-zsh/zpm), [Zgenom](https://github.com/jandamm/zgenom) （需要设置 `ZGENOM_AUTO_ADD_BIN=1`）。

## 4. 卸载函数 {#unload-function}

> [ unload-function ]

如果一个插件被命名为，例如 `kalc` （并且可以通过 `any-user/kalc` 获得它的plugin-ID ），那么它可以提供一个`kalc_plugin_unload` 函数，以供插件管理器调用来撤销加载该插件的效果。

在一般情况下也能可选的通过插件管理器实现对插件所做的更改进行跟踪。 但是更加合适的示例卸载操作应该是做一个提示，专门地跟踪插件的卸载（对插件创建者来说很容易做到）这样可以提供更好的、可预测的结果。

对于所有特殊的、不常见的插件效果，只能通过专门的函数才有可能撤销。

然而，还有一个有趣的折中办法——插件提供专门用来撤销这个特殊效果的函数，然后把其余的工作留给插件管理器。 维护这个功能函数的价值在于，如果通过插件管理器去撤销插件 **所有** 的副作用，可能会是一项难以完成的艰巨任务，这需要在插件开发过程中对其进行持续把控。

请注意，卸载函数应包含 `unfunction $0` (或使用更好的 `unfunction kalc_plugin_unload` 等，这不仅可以与`*_argzero` 选项兼容) ，还可以删除该功能本身。

### **STATUS:** [ unload-function ] {#unload-function}

- [ZI](https://github.com/z-shell/zi)，实现调用该函数进行插件卸载。

- `romkatv/powerlevel10k`， [使用](https://github.com/romkatv/powerlevel10k/blob/f17081ca/internal/p10k.zsh#L5390) 这个函数来执行特定的任务：关闭二进制的 [gitstatus](https://github.com/romkatv/gitstatus) 后台常驻程序，具有非常好的效果。

- `agkozak/agkozak-zsh-prompt` [使用](https://github.com/agkozak/agkozak-zsh-prompt/blob/ed228952d68fea6d5cad3beee869167f76c59606/agkozak-zsh-prompt.plugin.zsh#L992-L1039) 此函数实现完全卸载提示。

- `agkozak/zsh-z` [使用](https://github.com/agkozak/zsh-z/blob/16fba5e9d5c4b650358d65e07609dda4947f97e8/zsh-z.plugin.zsh#L680-L698) 此函数实现完全卸载提示。

- `agkozak/zhooks` [使用](https://github.com/agkozak/zhooks/blob/628e1e3b8373bf31c26cb154f71c16ebe9d13b51/zhooks.plugin.zsh#L75-L82) 此函数实现完全卸载提示。

## 5. `@zsh-plugin-run-on-unload` 调用 {#run-on-unload-call}

> [ run-on-unload-call ]

插件管理器可以提供一个函数 `@zsh-plugin-run-on-unload` 它的调用语法如下：

```zsh
@zsh-plugin-run-on-unload "{code-snippet-1}" "{code-snippet-2}" …
```

该函数注册了一些代码片段，以便在卸载插件时由插件管理器 **运行**。

代码的执行应该由 `eval` 内置的代码完成，其顺序与传递给调用的顺序相同。

该代码应该在插件的目录下，在当前的shell中执行。

因此，该机制在 [卸载函数](#unload-function)之外，提供了另一种方式，让插件参与 卸载的过程。

### **STATUS:** [ run-on-unload-call ]

1. 插件管理器。 [ZI](https://github.com/z-shell/zi), [Zinit](https://github.com/zdharma-continuum/zinit)。

## 6. `@zsh-plugin-run-on-unload` 调用 {#run-on-update-call}

> [ run-on-update-call ]

插件管理器可以提供一个函数 `@zsh-plugin-run-on-unload` 它的调用语法如下。

```shell
@zsh-plugin-run-on-update "{code-snippet-1}" "{code-snippet-2}" …
```

该函数注册了一些代码片段，以便在卸载插件时由插件管理器 运行。

代码的执行应该由 `eval` 内置的代码完成，其顺序与传递给调用的顺序相同。

代码应该在插件的目录中执行，可能是在一个子壳中 **在下载任何新的提交** 到 储存库后。

### **STATUS:** [ run-on-update-call ]

1. 插件管理器。 [ZI](https://github.com/z-shell/zi), [Zinit](https://github.com/zdharma-continuum/zinit)。

## 7. Plugin Manager Activity Indicator {#activity-indicator}

> [ activity-indicator ]

Plugin managers should set the `$zsh_loaded_plugins` array to contain all previously loaded plugins and the plugin currently being loaded (as the last element).

This will allow any plugin to:

1. Check which plugins are already loaded.

2. Check if it is being loaded by a plugin manager (i.e. not just sourced).

The first item allows a plugin to e.g. issue a notice about missing dependencies.

Instead of issuing a notice, it may be able to satisfy the dependencies from resources it provides.

For example, the `pure` prompt provides a `zsh-async` dependency library within its source tree, which is normally a separate project. Consequently, the prompt can decide to source its private copy of `zsh-async`, having also reliable `$0` defined by the previous section (note: `pure` doesn’t normally do this).

The second item allows a plugin to e.g. set up `$fpath`, knowing that plugin manager will not handle this:

```shell showLineNumbers
if [[ ${zsh_loaded_plugins[-1]} != */kalc && -z ${fpath[(r)${0:h}]} ]] {
    fpath+=( "${0:h}" )
}
```

This will allow the user to reliably source the plugin without using a plugin manager.

The code uses the wrapping braces around variables (i.e.: e.g.: `${fpath…}`) to make it compatible with the `KSH_ARRAYS` option and the quoting around `${0:h}` to make it compatible with the `SH_WORD_SPLIT` option.

### **STATUS:** [ activity-indicator ]

1. 插件管理器 [ZI](https://github.com/z-shell/zi)，[Zinit](https://github.com/zdharma-continuum/zinit)， [Zpm](https://github.com/zpm-zsh/zpm)， [Zgenom](https://github.com/jandamm/zgenom),，Zgen（可能要在 [PR](https://github.com/tarjoilija/zgen/pull/124) 被合并之后得到支持)。

2. Plugins: [GitHub search](https://github.com/search?q=if+%22zsh_loaded_plugins%22&type=Code)

## 8. Global Parameter With PREFIX For Make, Configure, Etc {#global-parameter-with-prefix}

> [ global-parameter-with-prefix ]

Plugin managers may export the parameter `$ZPFX` which should contain a path to a directory dedicated for user-land software, i.e. for directories `$ZPFX/bin`, `$ZPFX/lib`, `$ZPFX/share`, etc.

The suggested name of the directory is `polaris` (e.g.: ZI uses this name and places this directory at `~/.zi/polaris` by default).

Users can then configure hooks (a feature of e.g. zplug and ZI) to invoke e.g. `make PREFIX=$ZPFX install` at clone & update of the plugin to install software like e.g. [tj/git-extras](https://github.com/tj/git-extras). This is a the developing role of Zsh plugin managers as package managers, where `.zshrc` has a similar role to Chef or Puppet configuration and allows to **declare** system state, and have the same state on different accounts/machines.

No-narration facts-list related to `$ZPFX`:

1. `export ZPFX="$HOME/polaris"` (or e.g. `$HOME/.zi/polaris`)

2. `make PREFIX=$ZPFX install`

3. `./configure --prefix=$ZPFX`

4. `cmake -DCMAKE_INSTALL_PREFIX=$ZPFX .`

5. `zi ice make"PREFIX=$ZPFX install"`

6. `zi … hook-build:"make PREFIX=$PFX install"`

### **STATUS:** [ global-parameter-with-prefix ]

1. Plugin managers: [ZI](https://github.com/z-shell/zi), [Zinit](https://github.com/zdharma-continuum/zinit), [Zpm](https://github.com/zpm-zsh/zpm), [Zgenom](https://github.com/jandamm/zgenom).

## 9. Global Parameter holding the plugin manager’s capabilities {#global-parameter-with-capabilities}

> [ global-parameter-with-capabilities ]

The above paragraphs of the standard spec each constitute a capability, a feature of the plugin manager.

It would make sense that the capabilities are somehow discoverable. To address this, a global parameter called `PMSPEC` (from _plugin-manager specification_) is proposed.

It can hold the following Latin letters each informing the plugin, that the plugin manager has support for a given feature:

- `0` – the plugin manager provides the `ZERO` parameter,

- `f` - … supports the `functions/` subdirectory,

- `b` - … supports the `bin/` subdirectory,

- `u` - … the unload function,

- `U` - … the `@zsh-plugin-run-on-unload` call,

- `p` – … the `@zsh-plugin-run-on-update` call,

- `i` – … the `zsh_loaded_plugins` activity indicator,

- `P` – … the `ZPFX` global parameter,

- `s` – … the `PMSPEC` global parameter itself (i.e.: should be always present).

The contents of the parameter describing a fully-compliant plugin manager should be: `0fuUpiPs`.

The plugin can then verify the support by, e.g.:

```shell showLineNumbers
if [[ $PMSPEC != *f* ]] {
    fpath+=( "${0:h}/functions" )
}
```

### **STATUS:** [ global-parameter-with-capabilities ]

1. Plugin managers: [ZI](https://github.com/z-shell/zi), [Zinit](https://github.com/zdharma-continuum/zinit), [Zpm](https://github.com/zpm-zsh/zpm), [Zgenom](https://github.com/jandamm/zgenom).

## Zsh Plugin-Programming Best practices

The document is to define a **Zsh-plugin** but also to serve as an information source for plugin creators.

Therefore, it covers also best practices information in this section.

## Use Of `add-zsh-hook` To Install Hooks

Zsh ships with a function `add-zsh-hook`. It has the following invocation syntax:

```zsh
add-zsh-hook [ -L | -dD ] [ -Uzk ] hook function
```

The command installs a `function` as one of the supported zsh `hook` entries. which are one of: `chpwd`, `periodic`, `precmd`, `preexec`, `zshaddhistory`, `zshexit`, `zsh_directory_name`. For their meaning refer to the [Zsh documentation](http://zsh.sourceforge.net/Doc/Release/Functions.html#Hook-Functions).

## Use Of `add-zle-hook-widget` To Install Zle Hooks

The zle editor is the part of the Zsh that is responsible for receiving the text from the user.

It can be said that it’s based on widgets, which are nothing more than Zsh functions that are allowed to be run in Zle context, i.e. from the Zle editor (plus a few minor differences, like e.g.: the `$WIDGET` parameter that’s automatically set by the Zle editor).

The syntax of the call is:

```shell
add-zle-hook-widget [ -L | -dD ] [ -Uzk ] hook widgetname
```

The call resembles the syntax of the `add-zsh-hook` function. The only the difference is that it takes a `widgetname`, not a function name and that the `hook` is being one of: `isearch-exit`, `isearch-update`, `line-pre-redraw`, `line-init`, `line-finish`, `history-line-set`, or `keymap-select`.

Their meaning is explained in the [Zsh documentation](http://zsh.sourceforge.net/Doc/Release/Zsh-Line-Editor.html#Special-Widgets).

The use of this function is recommended because it allows the installation **multiple** hooks per each `hook` entry. Before introducing the `add-zle-hook-widget` function the "normal" way to install a hook was to define a widget with the name of one of the special widgets.

Now, after the function has been introduced in Zsh `5.3` it should be used instead.

## Standard Parameter Naming

There’s a convention already present in the Zsh world – to name array variables lowercase and scalars uppercase. It’s being followed by e.g.: the Zsh manual and the Z shell itself (e.g.: `REPLY` scalar and `reply` array, etc.).

The requirement for the scalars to be uppercase should be, in my opinion, kept only for the global parameters. I.e.: it’s fine to name local parameters inside a function lowercase even when they are scalars, not only arrays.

An extension to the convention is being proposed: to name associative arrays (i.e.: hashes) capitalized, i.e.: with only first letter uppercase and the remaining letters lowercase.

See [the next section](#standard-plugins-hash) for an example of such hash. In the case of the name consisting of multiple words each of them should be capitalized, e.g.: `typeset -A MyHash`.

This convention will increase code readability and bring order to it.

## Standard `Plugins` Hash

The plugin often has to declare global parameters that should live throughout a Zsh session. Following the [namespace pollution prevention](#preventing-function-pollution) the plugin could use a hash to store the different values.

Additionally, the plugins could use a single hash parameter – called `Plugins` – to prevent the pollution.

An example value needed by the plugin:

```shell showLineNumbers
…
typeset -gA Plugins
Plugins[MY_PLUGIN_REPO_DIR]="${0:h}"
```

This way all the data of all plugins will be kept in a single parameter, available for easy examination and overview (via e.g.: `varied Plugins`) and also not polluting the namespace.

## Standard Recommended Options

The following code snippet is recommended to be included at the beginning of each of the main functions provided by the plugin:

```shell showLineNumbers
emulate -L zsh
setopt extended_glob warn_create_global typeset_silent \
        no_short_loops rc_quotes no_auto_pushd
```

It resets all the options to their default state according to the `zsh` emulation mode, with the use of the `local_options` option – so the options will be restored to their previous state when leaving the function.

It then alters the emulation by `6` different options:

- `extended_glob` – enables one of the main Zshell features – the advanced, the built-in regex-like globing mechanism,

- `warn_create_global` – enables warnings to be printed each time a (global) the variable is defined without being explicitly defined by a `typeset`, `local`, `declare`, etc. call; it allows to catch typos and missing localizations of the variables and thus prevent from writing a bad code,

- `typeset_silent` – it allows to call `typeset`, `local`, etc. multiple times on the same variable; without it, the second call causes the variable contents to be printed first; using this option allows to declare variables inside loops, near the place of their use, which sometimes helps to write a more readable code,

- `no_short_loops` – disables the short-loops syntax; this is done because when the syntax is enabled it limits the parser’s ability to detect errors (see this [zsh-workers post](https://www.zsh.org/mla/workers/2011/msg01050.html) for the details),

- `rc_quotes` – adds useful ability to insert apostrophes into an apostrophe-quoted string, by use of `''` inside it, e.g.: `'a string’s example'` will yield the string `a string’s example`,

- `no_auto_pushd` - disables the automatic push of the directory passed to `cd` builtin onto the directory stack; this is useful because otherwise the internal directory changes done by the plugin will pollute the global directory stack.

## Standard Recommended Variables

It’s good to localize the following variables at the entry of the main function of a plugin:

```shell showLineNumbers
local MATCH REPLY; integer MBEGIN MEND
local -a match mbegin mend reply
```

The variables starting with `m` and `M` are being used by the substitutions utilizing `(#b)` and `(#m)` flags, respectively. They should not leak to the global scope. Also, their automatic creation would trigger the warning from the `warn_create_global` option.

The `reply` and `REPLY` parameters are being normally used to return an array or a scalar from a function, respectively – it’s the standard way of passing values from functions.

Their use is naturally limited to the functions called from the the main function of a plugin – they should not be used to pass data around e.g.: in between prompts, thus it’s natural to localize them in the main function.

## Standard Function Name-Space Prefixes

The recommendation is the purely subjective opinion of the author.

It can evolve – if you have any remarks, don’t hesitate to [fill them](https://github.com/z-shell/zw/issues/new).

## The Problems Solved By The Proposition

However, when adopted, the proposition will solve the following issues:

1. Using the underscore `_` to namespace functions – this isn’t the right thing to do because the prefix is being already used by the completion functions, so the namespace is already filled up greatly and the plugin functions get lost in it.

2. Not using a prefix at all – this is also an unwanted practice as it pollutes the command namespaceof such issue appearing.

3. It would allow to quickly discriminate between function types – e.g.: seeing the `:` prefix informs the user that it’s a hook-type function while seeing the `@` prefix informs the user that it’s an API-like function, etc.

4. It also provides an improvement during programming, by allowing to quickly limit the number of completions offered by the editor, e.g.: for Vim’s `Ctrl-P` completing, when entering `+<Ctrl-P>`, then only a subset of the functions are being completed (see below for the type of the functions). **Note:** the editor has to be configured so that it accepts such special characters as part of keywords, for Vim it’s: `:set isk+=@-@,.,+,/,:` for all of the proposed prefixes.

## The Proposed Function-Name Prefixes

The proposition of the standard prefixes is as follows:

1. `.`: for regular private functions. Example function: `.prompt_zinc_get_value`.

2. `→`: for hook-like functions, so it should be used e.g.: for the [Zsh hooks](#use-of-add-zsh-hook-to-install-hooks) and the [Zle hooks](#use-of-add-zle-hook-widget-to-install-zle-hooks), but also for any other, custom hook-like mechanism in the plugin.

Example function name: `→prompt_zinc_precmd`.

- the previous version of the document recommended colon (`:`) for the prefix, however, it was problematic, because Windows doesn’t allow colons in file names, so it wasn’t possible to name an autoload function this way,

- the arrow has a rationale behind it - it denotes the execution **coming back** to the function at a later time, after it has been registered as a callback or a handler,

- the arrow is easy to type on most keyboard layouts – it is `Right-Alt`+`I`; in case of problems with typing the character can be always copied – handler functions do occur in the code rarely,

- Zsh supports any string as a function name, because absolutely any string can be a **file** name – if there would be an exception in the name of the callables, then how would it be possible to run a script called "→abcd"? There are **no** exceptions, the function can be called even as a the sequence of null bytes:

```shell showLineNumbers
    ❯ $'\0'() { print hello }
    ❯ $'\0'
    hello
```

3. `+`: for output functions, i.e.: for functions that print to the standard output and error or a log, etc. Example function name: `+prompt_zinc_output_segment`.

4. `/`: for debugging functions, i.e: for functions that output debugs messages to the screen or a log or e.g.: gather some debug data. **Note:** the slash makes it impossible for such functions to be auto-loaded via the `autoload` mechanism. It is somewhat risky to assume, that this will never be needed for the functions, however, the limited number of available ASCII characters justifies such allocation. Example function name: `/prompt_zinc_dmsg`.

5. `@`: for API-like functions, i.e: for functions that are on a boundary to a subsystem and expose its functionality through a well-defined, in general fixed interface. For example this plugin standard [defines](#update-register-call) the function `@zsh-plugin-run-on-update`, which is exposing a plugin manager’s functionality in a well-defined way.

## Example Code Utilizing The Prefixes

```shell showLineNumbers
.zinc_register_hooks() {
    add-zsh-hook precmd :zinc_precmd
    /zinc_dmsg "Installed precmd hook with result: $?"
    @zsh-plugin-run-on-unload "add-zsh-hook -d precmd :zinc_precmd"
    +zinc_print "Zinc initialization complete"
}
```

## Preventing Function Pollution

When writing a larger autoload function, it very often is the case that the function contains definitions of other functions.

When the main function finishes executing, the functions are being left defined. This might be undesired, e.g.: because of the command namespace pollution.

The following snippet of code, when added at the beginning of the main function will automatically unset the sub-functions when leaving the main function to don't leak any functions into the global namespace:

```shell showLineNumbers
typeset -g prjef
prjef=( ${(k)functions} )
trap "unset -f -- \"\${(k)functions[@]:|prjef}\" &>/dev/null; unset prjef" EXIT
trap "unset -f -- \"\${(k)functions[@]:|prjef}\" &>/dev/null; unset prjef; return 1" INT
```

Replace the `prj*` prefix with your project name, e.g.: `rustef` for a `rust`-related plugin. The `*ef` stands for "entry functions". The snippet works as follows:

1. The line `prjef=( ${(k)functions} )` remembers all the functions that are currently defined – which means that the list excludes the functions that are to be yet defined by the body of the main function.

2. The code `unset -f — "${(k)functions[@]:|prjef}"` first does an subtraction of array contents – the `:|` substitution operator – of the functions that are defined at the moment of leaving of the function (the `trap`-s invoke the code in this moment) with the list of functions from the start of the main function – the ones stored in the variables `$prjef`.

3. It then unsets the resulting list of the functions – being only the newly defined functions in the main function – by passing it to `unset -f …`.

This way the functions defined by the body of the main (most often an autoload) the function will be only set during the execution of the function.

## Preventing Parameter Pollution

When writing a plugin one often needs to keep a state during the Zsh session. To do this it is natural to use global parameters. However, when the number of the parameters grows one might want to limit it.

With the following method, only a single global parameter per plugin can be sufficient:

```shell showLineNumbers
typeset -A PlgMap
typeset -A SomeMap
typeset -a some_array

# Use

PlgMap[state]=1
SomeMap[state]=1
some_array[1]=state
```

can be converted into:

```shell showLineNumbers
typeset -A PlgMap

# Use

PlgMap[state]=1
PlgMap[SomeMap__state]=1
PlgMap[some_array__1]=state
```

The use of this method is very unproblematic.

The author reduced the number of global parameters in one of the projects by 21 by using an automatic conversion with Vim substitution patterns with backreferences without any problems.

Following the [Standard Plugins Hash](#standard-plugins-hash) section, the plugin could even use a common hash name – `Plugins` – to lower the pollution even more.
