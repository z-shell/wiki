---
id: common
title: '🔀 常用语法'
sidebar_position: 1
image: zw/logo/320x320.png
description: 基本 ZI 语法
keywords:
  - syntax
  - how-to-use
---

import APITable from '@site/src/components/APITable';

:::tip

建议在此之前熟悉 [getting_started/oveview][9]。

:::

## 标准语法

```shell
zi …
zi ice …
zi load …
zi light …
zi unload …
zi snippet …
```

指定 ice 修饰符选项和参数的一般方法：

```shell
zi wait"1" from"gh-r" atload"print Hello World"
zi load …
```

:::note

不需要 `ice` 子命令——这是完全允许的。

:::

## 可选的语法

当然，ZI 也支持其他语法，其中之一的等号（`=`）语法：

```shell
zi wait=1 from=gh-r atload="print Hello World"
zi load …
```

冒号（`:`）语法：

```shell
zi wait:1 from:gh-r atload:"print Hello World"
zi load …
```

以及，结合以上内容的，GNU 语法：

```shell
zi --wait=1 --from=gh-r --atload="print Hello World"
zi load …
```

### 摘要

选择哪种语法取决于用户。

标准语法背后的最初动机是：支持 Vim 等编辑器的语法高亮——和让 ice 后面的字符串用不同的颜色高亮，以做区分。 但是，对 \[zi/zi-vim-syntax\]\[11\] 语法的定义，该动机可以被 ZI 特定的高亮配置所取代，至少对于 Vim 而言。

### Make 语法

```shell
zi ice as"program" pick"$ZPFX/bin/git-*" make"PREFIX=$ZPFX"
zi light tj/git-extras
```

上面项目的 `Makefile` 只有 2 个任务：

1. 安装目标。
2. 构建安装所需的脚本。

`Makefile` 有 2 个任务，可以使用：

1. `make"all install PREFIX=…"`,
2. `pick'…'` will `chmod +x` all matching files and add `$ZPFX/bin/` to `$PATH`.

:::info

[$ZPFX][8] 由 ZI 提供，默认设置为 `~/.zi/polaris`。

但是，如果需要，可以通过指定自定义 `$ZPFX=` 目标来更改它。

:::

### Compiling programs

```shell
zi ice as"program" atclone"rm -f src/auto/config.cache; ./configure" \
  atpull"%atclone" make pick"src/vim"
zi light vim/vim
```

<APITable>

| 语法             | 描述                                                                               |
| ------------------ | :---------------------------------------------------------------------------------------- |
| `as'program'`      | 添加被 `pick'…'` 选择的文件到 `$PATH` 同时不 source 它                          |
| `atclone'…'`       | 在下载后执行代码                                                           |
| `atpull'%atclone'` | 和 `atclone'…'` 行为类似，但仅在成功更新后执行                 |
| `make`             | 在 `atclone'…'` 和 `atpull'…'` 之后运行 `make`（注意: `make'!'` 将会在他们之后执行)。 |
| `pick'src/vim'`    | 在 `src/vim` 上设置可执行标签，注意 `src/` 应该被添加到 `$PATH`.            |

</APITable>

与上面的命令一样但会默认在 [$ZPFX][8] 下**安装**（`make install`）：

```shell
zi ice as'program' atclone'rm -f src/auto/config.cache; \
  ./configure --prefix=$ZPFX' atpull'%atclone' make'all install' pick'$ZPFX/bin/vim'
zi light vim/vim
```

| Syntax             | Description                                                |
| ------------------ |:---------------------------------------------------------- |
| `as'program'`      | 如上所述。                                                      |
| `atclone'…'`       | 和上面的一样，但**额外**传递 `--prefix=$ZPFX` 到 `./configure`，以设置安装目录。 |
| `atpull'%atclone'` | 如上所述。                                                      |
| `make`             | 和上面的一样，但运行 `install` 目标。                                   |
| `pick'src/vim'`    | 和上面的一样，但使用不同的路径 `$ZPFX/bin/vim`.                           |

### LS_COLORS

项目 [trapd00r/LS_COLORS][1] 提供了一个包含 GNU `ls` 命令以及 [ogham/exa][2] 颜色定义的文件。

通常会执行 `eval $( dircolors -b $HOME/LS_COLORS)` 来处理此文件并为 `ls` 设置环境。 这意味着 `dircolors` 在每次 shell 启动时运行。

这花费了很多时间，因为必须完成一个 fork 程序，即 `dircolors`，二进制文件需要加载和执行，因为 `dircolors` 需要加载颜色的定义并处理它们。 以下 ZI 调用解决了此问题：

```shell
zi ice atclone'dircolors -b LS_COLORS > clrs.zsh' \
  atpull'%atclone' pick"clrs.zsh" nocompile'!' \
  atload'zstyle ":completion:*" list-colors “${(s.:.)LS_COLORS}”'
zi light trapd00r/LS_COLORS
```

<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->


<APITable>

| Syntax             | Description                                                                                                 |
|--------------------|:------------------------------------------------------------------------------------------------------------|
| `atclone'…'`       | 生成 shell 脚本，不传递给 `eval`. 更多如下: (1)                                 |
| `atpull'%atclone'` | 在每次插件更新时操作 更多如下：（2）                                                    |
| `pick"clrs.zsh"`   | source 先前从 `clrs zsh` 生成的文件                                                            |
| `nocompile'!'`     | 在 `atclone'…'` [ice 修饰符][3] **之后**编译，[感叹号][4] 开启了该选项 |
| `atload'…'` | 此外，还设置 Zsh 补全以使用 trapd00r 包提供的颜色。                 |


<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

</APITable>

- (1) 保存至文件。 Ice 修饰符 `atclone'…'` 正在执行**安装**操作，同时 `atpull'…'` 钩子正在**更新** [**trapd00r/LS_COLORS**][1] 插件。
- (2) `%atclone` 只是一个特殊的字符串，表示 `atclone'…'` 钩子，并同时复制到 `atpull'…'` 钩子上。

这样，除了插件安装和更新，`dircolors` 不会运行，仅正常添加 source。

每天都会被 source 的文件，也就是 `clrs.zsh`，会被编译以提升加载速度。

### Direnv

项目 [**direnv/direnv**][5] 在 Z-shell 中注册自己以在目录更改时修改环境。 注册通常由 `eval "$(dienv hook zsh)"` 添加到 `.zshrc` 中。

```shell
zi ice as"program" make'!' atclone'./direnv hook zsh > zhook.zsh' \
  atpull'%atclone' src"zhook.zsh"
zi light direnv/direnv
```

- `make'!'`——在 `atclone'…'` 和 `atpull'…'` 之前执行 `make`（参考下面的 `make`），
- `src'zhook.zsh'`—— source `zhook.zsh` 文件。

一般来说，direnv 的工作原理是 hook Zsh。

此代码由程序 `direnv` 提供（由 `make"…"` 构建）。

上方的 `atclone'…'` 将此代码放入 `zhook.zsh`，`src''` source 它。

这样 ` direnv hook zsh` 只在 clone 或更新时执行 ，Zsh 启动的速度会更快。

#### 一瞥「for」语法

这个标准过程的缺点是 `direnv` 二进制文件在每次 shell 启动时运行，并且极大拖慢了 Zsh 的速度。 ZI 允许通过以下方式解决此问题：

```shell
zi as"program" make'!' atclone'./direnv hook zsh > zhook.zsh' \
  atpull'%atclone' pick"direnv" src"zhook.zsh" for \
    direnv/direnv
```

<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<APITable>

| Syntax             | Description                                                                                                          |
|--------------------|:---------------------------------------------------------------------------------------------------------------------|
| `make'!'`          | Compile `direnv`, the exclamation mark means: run the `make` first, before `atclone'…'` and `atpull'…'` hooks.       |
| `atclone'…'`       | As soon as plugin installed generate the registration code and save it to `zhook.zsh`, instead of passing to `eval`. |
| `atpull'%atclone'` | The `atclone'…'` runs on **installation** while `atpull'…'` runs on **update** of the plugin.                        |
| `src'zhook.zsh'`   | Load generated registration code                                                                                     |
| `pick'direnv'`     | Ensure `+x` permission on the binary                                                                                 |
| `as'program'`      | The plugin is a program, there's no main file to the source.                                                         |

</APITable>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

This way registration code is generated once every installation and update, to then be simply sourced without running `direnv`.

The project is also available as a binary [Github releases][6]. This distribution can be installed by:

```shell
zi from"gh-r" as"program" mv"direnv* -> direnv" \
  atclone'./direnv hook zsh > zhook.zsh' atpull'%atclone' \
  pick"direnv" src="zhook.zsh" for \
    direnv/direnv
```

<APITable>

| Syntax                    | Description                                                                |
| ------------------------- | :------------------------------------------------------------------------- |
| `from'gh-r'`              | Install from `direnv` from [GitHub releases][6].                           |
| `mv'direnv* -> direnv'`   | After installation, rename `direnv.linux-386` or similar file to `direnv`. |
| `atclone'…'`, `atpull'…'` | As in previous example                                                     |
| `pick'direnv'`            | As in previous example.                                                    |
| `as'program'`             | As in previous example                                                     |

</APITable>
[1]: https://github.com/trapd00r/LS_COLORS

[1]: https://github.com/trapd00r/LS_COLORS
[2]: https://github.com/ogham/exa
[5]: https://github.com/direnv/direnv
[6]: https://github.com/direnv/direnv/releases/
[8]: /docs/guides/customization#$ZPFX
[9]: /docs/getting_started/overview
