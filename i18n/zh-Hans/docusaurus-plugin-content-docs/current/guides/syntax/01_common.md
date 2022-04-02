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

A repository [trapd00r/LS_COLORS][1] provides a file with color definitions for GNU `ls` command, and also for [ogham/exa][2].

Typically one does `eval $( dircolors -b $HOME/LS_COLORS)` to process this file and set the environment for `ls`. This means `dircolors` is run every shell startup.

This costs much time because a fork has to be done and the program, i.e. `dircolors`, binary needs to be loaded and executed, and because `dircolors` loads the colors' definitions and processes them. Following ZI invocation solves this problem:

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
| `atclone'…'`       | Generate shell script, but instead of passing it to `eval`. More below: (1)                                 |
| `atpull'%atclone'` | Do the same at any update of the plugin. More below: (2)                                                    |
| `pick"clrs.zsh"`   | Source the previously generated file `clrs zsh`.                                                            |
| `nocompile'!'`     | Invokes compilation **after** the `atclone'…'` [ice-modifier][3] and the [exclamation mark][4] causes this. |
| `atload'…'`        | Additionally sets up the Zsh completion to use the colors provided by the trapd00r package.                 |


<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

</APITable>

- (1) Save it to file. The `atclone'…'` is being ran on the **installation** while the `atpull'…'` hook is being run on an **update** of the [**trapd00r/LS_COLORS**][1] plugin.
- (2) The `%atclone` is just a special string that denotes the `atclone'…'` hook and is copied onto the `atpull'…'` hook.

This way, except for the plugin installation and update, `dircolors` isn't ran, just normal sourcing is done.

The everyday sourced file, i.e. `clrs.zsh`, is being compiled to speed up the loading.

### Direnv

The project [**direnv/direnv**][5] registers itself in Z shell to modify the environment on directory change. This registration is most often done by `eval "$(direnv hook zsh)"` added to `.zshrc`.

```shell
zi ice as"program" make'!' atclone'./direnv hook zsh > zhook.zsh' \
  atpull'%atclone' src"zhook.zsh"
zi light direnv/direnv
```

- `make'!'` – execute `make` before `atclone'…'` and before `atpull'…'` (see `make` above),
- `src'zhook.zsh'` – source file `zhook.zsh`.

In general, direnv works by hooking up to Zsh.

The code that does this is provided by program `direnv` (built by `make'…'`).

Above `atclone'…'` puts this code into file `zhook.zsh`, `src''` sources it.

This way `direnv hook zsh` is executed only on clone and update, and Zsh starts faster.

#### Glance at the 'for' syntax

The drawback of this standard procedure is that the `direnv` binary is run on every shell startup and significantly slows it down. ZI allows to solve this in the following way:

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
