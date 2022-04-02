---
title: '♻️ 迁移'
image: zw/logo/320x320.png
description: 迁移到 ZI 的指南
keywords:
  - migration
  - setup
---

## OMZ 基础知识

URL 的原始语法：

```shell
zi snippet <URL>
```

OMZ 短语法：

<https://github.com/ohmyzsh/ohmyzsh/raw/master/>

```shell
zi snippet OMZ::<PATH>
```

OMZL:

<http://github.com/ohmyzsh/ohmyzsh/raw/master/lib>

```shell
zi snippet OMZL::<PATH>
```

OMZP:

<http://github.com/ohmyzsh/ohmyzsh/raw/master/plugins>

```shell
zi snippet OMZP::<PATH>
```

OMZT:

<http://github.com/ohmyzsh/ohmyzsh/raw/master/themes>

```shell
zi snippet OMZT::<PATH>
```

### OMZ 库

从OMZ库样本中导入 [剪贴板][1] 和 [term 支持][2] 。

原始语法：

```shell
zi snippet https://github.com/ohmyzsh/ohmyzsh/blob/master/lib/clipboard.zsh
zi snippet https://github.com/ohmyzsh/ohmyzsh/blob/master/lib/termsupport.zsh
```

OMZ 短语法：

```shell
zi snippet OMZ::lib/clipboard.zsh
zi snippet OMZ::lib/termsupport.zsh
```

OMZL 缩写语法：

```shell
zi snippet OMZL::clipboard.zsh
zi snippet OMZL::termsupport.zsh
```

### OMZ 插件

```diff
- plugins=(
-  git
-  dotenv
-  rake
-  rbenv
-  ruby
-)

+ zi snippet OMZP::git
+ zi snippet OMZP::dotenv
+ zi snippet OMZP::rake
+ zi snippet OMZP::rbenv
+ zi snippet OMZP::ruby
```

:::tip

将多个命令捆绑到单个文件：

`zi snippet <some/path/or/url/bundled-snippets.zsh`

:::

如果多个文件需要整个子目录，使用 `zi ice svn` 。

- [gitfast][4]
- [osx][5]

```shell
zi ice svn
zi snippet OMZP::gitfast

zi ice svn
zi snippet OMZP::osx
```

使用 `zi ice as "completion"` 来直接添加单个文件的补全 snippet。

- [docker][6]
- [fd][7]

```shell
zi ice as"completion"
zi snippet OMZP::docker/_docker

zi ice as"completion"
zi snippet OMZP::fd/_fd
```

[您可以在 Wiki 中查看 OMZ 设置的扩展说明][8]

### 插件

```diff
- plugins=(
-  git
-  dotenv
-  rake
-  rbenv
-  ruby
-)

+ zi snippet OMZP::git
+ zi snippet OMZP::dotenv
+ zi snippet OMZP::rake
+ zi snippet OMZP::rbenv
+ zi snippet OMZP::ruby
```

如果它由一个文件组成，用 ZI 你可以直接加载它。 `zi snippet <some/path/or/url/undled-snnippets.zsh`

如果多个文件需要整个子目录，使用 `zi ice svn` 。

- [gitfast][4]
- [osx][5]

```shell
zi ice svn
zi snippet OMZP::gitfast

zi ice svn
zi snippet OMZP::osx
```

使用 `zi ice as "completion"` 来直接添加单个文件的补全 snippet。

- [docker][6]
- [fd][7]

```shell
zi ice as"completion"
zi snippet OMZP::docker/_docker

zi ice as"completion"
zi snippet OMZP::fd/_fd
```

[您可以在 Wiki 中查看 OMZ 设置的扩展说明][8]

### OMZ 主题

主题存储在 `themes` 目录中。 全部都在后台加载，使用简单语法： 全部都在后台加载。 使用简单语法：

```shell
ZSH_THEME="robbyrussell"
```

但是， ZI 不支持 `ZSH_THEME` 变量。

To use **themes** created for OMZ, it requires loading shown below as it would be the same as OMZ does in the background.

> 有些主题可能需要额外的配置，它可以从主题配置文件中确定。

- Load `Git` library
- 加载 `Git` 插件
- 启用 `setopt promptsubst`

如果上述任何一项不符合顺序或缺失，主题就会出现类似的中断，如下图所示。

```shell
… $(build_prompt) …
```

如果 `Git` 库没有被加载或加载顺序错误，那么可能会出现类似下面的情况。

```shell
........:1: command not found: git_prompt_status
........:1: command not found: git_prompt_short_sha
```

总的来说看起来像这样：

```shell
zi snippet OMZL::git.zsh
zi snippet OMZP::git
zi cdclear -q
```

然后加载提示符：

```shell
setopt promptsubst
zi snippet OMZT::robbyrussell
```

### 外部主题样本： [NicoSantangelo/Alpharized][3]

使用 OMZ 加载：

```shell
ZSH_THEME="alpharized"
```

使用 OMZ 加载：

```shell
zi snippet OMZL::git.zsh
```

加载 `Git` 插件:

```shell
zi snippet OMZP::git
zi cdclear -q

setopt promptsubst

zi light NicoSantangelo/Alpharized
```

## Prezto basics

URL 的原始语法：

```shell
zi snippet <URL>
```

PZT 简写： <https://github.com/sorin-ionescu/prezto/tree/master/>

```shell
zi snippet PZT::<PATH>
```

PZT/modules 简称：

```shell
zi snippet PZTM::<PATH>
```

### Prezto 模块

导入 [environment][9] 和 [terminal][10] Prezto 模块示例：

Prezto 设置：

```shell
zstyle ':prezto:load' pmodule 'environment' 'terminal'
```

ZI 设置：

> 从 URL 导入原始语法。

```shell
zi snippet https://github.com/sorin-ionescu/prezto/blob/master/modules/environment/init.zsh
zi snippet https://github.com/sorin-ionescu/prezto/blob/master/modules/terminal/init.zsh
```

PZT 缩写语法：

```shell
zi snippet PZT::modules/environment
zi snippet PZT::modules/terminal
```

PZTM 缩写语法：

```shell
zi snippet PZTM::environment
zi snippet PZTM::terminal
```

如果多个文件需要整个子目录，使用 `zi ice svn` 。

- [docker][11]
- [git][12]

```shell
zi ice svn
zi snippet PZTM::docker

zi ice svn
zi snippet PZTM::git
```

如果在模块中不存在匹配 `*.plugin.zsh`, `init.zsh`, `*.zsh-theme*` 的文件，使用 `zi ice as "null"`。

- [归档][13]:

```shell
zi ice svn as"null"
zi snippet PZTM::archive
```

使用 `zi ice atclone "git clone <repo> <location>"` 如果模块有外部模块。

- [completion][14]:

```shell
zi ice svn blockf \
  atclone"git clone --recursive https://github.com/zsh-users/zsh-completions.git external"
zi snippet PZTM::completion
```

使用 `blockf` 来防止对 fpath 的任何不必要的添加，因为 ZI 管理着 fpath。

:::tip

什么是 `zstyle`?

- 官方 (zsh.sourceforge.net): [zstyle（英语）][15]
- StackExchange: [What does `zstyle` do?][16]

:::

## Zgen

### 加载 OMZ 库

```diff
- zgen oh-my-zsh

+ zi snippet OMZL::<ANY OF THEM>
```

### 加载 OMZ 插件

```diff
- zgen oh-my-zsh <PATH>

+ zi snippet OMZP::<PATH>
```

### 加载 Prezto 模块

```diff
- zgen prezto

+ zi snippet PZTM::<ANY FROM LIST BELOW>
```

- environment
- terminal
- editor
- history
- directory
- spectrum
- utility
- completion
- prompt

```diff
- zgen prezto <modulename>

+ zi snippet PZTM::<modulename>
```

将库作为 Prezto 插件加载：

```diff
- zgen pmodule <reponame> <branch>

+ zi ice ver"<branch>"
+ zi load <repo/plugin>
```

### 摘要 Zgen

:::info

对于 `location`：参考 [文件的选择][17]。

:::

```diff
- zgen load <repo> [location] [branch]

+ zi ice ver"[branch]"
+ zi load <repo>
```

## Zplug 基础知识

```diff
- zplug <repo/plugin>, tag1:<option1>, tag2:<option2>

+ zi ice tag1"<option1>" tag2"<option2>"
+ zi load <repo/plugin>
```

### 标签比较

- `as` => `as`
- `use` => `pick`, `src`, `multisrc`
- `ignore` => None
- `from` => `from`
- `at` => `ver`
- `rename-to` => `mv`, `cp`
- `dir` => Selection(`pick`, …) with rename
- `if` => `if`
- `hook-build` => `atclone`, `atpull`
- `hook-load` => `atload`
- `frozen` => None
- `on` => None
- `defer` => `wait`
- `lazy` => `autoload`
- `depth` => `depth`

[1]: https://github.com/ohmyzsh/ohmyzsh/blob/master/lib/clipboard.zsh
[2]: https://github.com/ohmyzsh/ohmyzsh/blob/master/lib/termsupport.zsh
[3]: https://github.com/nicosantangelo/Alpharized
[4]: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/gitfast
[5]: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/osx
[6]: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/docker
[7]: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/fd
[8]: /docs/guides/customization#oh-my-zsh
[9]: https://github.com/sorin-ionescu/prezto/tree/master/modules/environment
[10]: https://github.com/sorin-ionescu/prezto/tree/master/modules/terminal
[11]: https://github.com/sorin-ionescu/prezto/tree/master/modules/docker
[12]: https://github.com/sorin-ionescu/prezto/tree/master/modules/git
[13]: https://github.com/sorin-ionescu/prezto/tree/master/modules/archive
[14]: https://github.com/sorin-ionescu/prezto/tree/master/modules/completion
[15]: http://zsh.sourceforge.net/Doc/Release/Zsh-Modules.html#The-zsh_002fzutil-Module
[16]: https://unix.stackexchange.com/questions/214657/what-does-zstyle-do
[17]: /docs/guides/syntax/ice#src-pick-multisrc
