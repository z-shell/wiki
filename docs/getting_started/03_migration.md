---
title: '♻️ Migration'
image: zw/logo/320x320.png
description: Migration guide to ZI
keywords: [migration, setup]
---

## OMZ Basics

Raw Syntax with URL:

```shell
zi snippet <URL>
```

OMZ Shorthand Syntax:

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

### OMZ Library

Importing the [clipboard][1] and [termsupport][2] from the OMZ library sample:

Raw Syntax:

```shell
zi snippet https://github.com/ohmyzsh/ohmyzsh/blob/master/lib/clipboard.zsh
zi snippet https://github.com/ohmyzsh/ohmyzsh/blob/master/lib/termsupport.zsh
```

OMZ Shorthand Syntax:

```shell
zi snippet OMZ::lib/clipboard.zsh
zi snippet OMZ::lib/termsupport.zsh
```

OMZL Shorthand Syntax:

```shell
zi snippet OMZL::clipboard.zsh
zi snippet OMZL::termsupport.zsh
```

### OMZ Plugins

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

Bundle multiple commands to a single file:

`zi snippet <some/path/or/url/bundled-snippets.zsh`

:::

Use `zi ice svn` if multiple files require an entire subdirectory.

- [gitfast][4]
- [osx][5]

```shell
zi ice svn
zi snippet OMZP::gitfast

zi ice svn
zi snippet OMZP::osx
```

Use `zi ice as"completion"` to directly add single file completion snippets.

- [docker][6]
- [fd][7]

```shell
zi ice as"completion"
zi snippet OMZP::docker/_docker

zi ice as"completion"
zi snippet OMZP::fd/_fd
```

[You can see an extended explanation of OMZ setup in the Wiki][8]

### Plugins

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

If it consists of a single file, with ZI you can just load it: `zi snippet <some/path/or/url/undled-snnippets.zsh`

Use `zi ice svn` if multiple files require an entire subdirectory.

- [gitfast][4]
- [osx][5]

```shell
zi ice svn
zi snippet OMZP::gitfast

zi ice svn
zi snippet OMZP::osx
```

Use `zi ice as"completion"` to directly add single file completion snippets.

- [docker][6]
- [fd][7]

```shell
zi ice as"completion"
zi snippet OMZP::docker/_docker

zi ice as"completion"
zi snippet OMZP::fd/_fd
```

[You can see an extended explanation of OMZ setup in the Wiki][8]

### OMZ Themes

Themes are stored in the `themes` directory. All and loaded in the background. with the simple syntax:

```shell
ZSH_THEME="robbyrussell"
```

However, ZI doesn't support the `ZSH_THEME` variable natively.

To use **themes** created for OMZ, it requires loading shown below as it would be the same as OMZ does in the
background.

> Some themes may require additional configuration it can be determined from the theme configuration file.

- Load `Git` library
- Load `Git` plugin
- Enable `setopt promptsubst`

If any of the above are not in order or missing, the theme will break similar as shown below:

```shell
… $(build_prompt) …
```

If the `Git` library is not loaded or loaded in the wrong order, then it may appear similar to the following:

```shell
........:1: command not found: git_prompt_status
........:1: command not found: git_prompt_short_sha
```

All together it looks like this:

```shell
zi snippet OMZL::git.zsh
zi snippet OMZP::git
zi cdclear -q
```

Then load the prompt:

```shell
setopt promptsubst
zi snippet OMZT::robbyrussell
```

### External theme sample: [NicoSantangelo/Alpharized][3]

Load with OMZ:

```shell
ZSH_THEME="alpharized"
```

Load with ZI:

```shell
zi snippet OMZL::git.zsh
```

Load `Git` plugin from OMZ:

```shell
zi snippet OMZP::git
zi cdclear -q

setopt promptsubst

zi light NicoSantangelo/Alpharized
```

## Prezto basics

Raw Syntax with URL:

```shell
zi snippet <URL>
```

Shorthand PZT: <https://github.com/sorin-ionescu/prezto/tree/master/>

```shell
zi snippet PZT::<PATH>
```

Shorthand PZT/modules:

```shell
zi snippet PZTM::<PATH>
```

### Prezto modules

Importing the [environment][9] and [terminal][10] Prezto Modules Sample:

Prezto Setting:

```shell
zstyle ':prezto:load' pmodule 'environment' 'terminal'
```

ZI Setting:

> Import raw syntax from URL.

```shell
zi snippet https://github.com/sorin-ionescu/prezto/blob/master/modules/environment/init.zsh
zi snippet https://github.com/sorin-ionescu/prezto/blob/master/modules/terminal/init.zsh
```

PZT Shorthand Syntax:

```shell
zi snippet PZT::modules/environment
zi snippet PZT::modules/terminal
```

PZTM Shorthand Syntax:

```shell
zi snippet PZTM::environment
zi snippet PZTM::terminal
```

Use `zi ice svn` if multiple files require an entire subdirectory.

- [docker][11]
- [git][12]

```shell
zi ice svn
zi snippet PZTM::docker

zi ice svn
zi snippet PZTM::git
```

Use `zi ice as"null"` if don't exist `*.plugin.zsh`, `init.zsh`, `*.zsh-theme*` files in module.

- [archive][13]:

```shell
zi ice svn as"null"
zi snippet PZTM::archive
```

Use `zi ice atclone"git clone <repo> <location>"` if module have external module.

- [completion][14]:

```shell
zi ice svn blockf \
  atclone"git clone --recursive https://github.com/zsh-users/zsh-completions.git external"
zi snippet PZTM::completion
```

Use `blockf` to prevent any unnecessary additions to fpath, as ZI manages fpath.

:::tip

What is `zstyle`?

- Official (zsh.sourceforge.net): [zstyle][15]
- StackExchange: [What does `zstyle` do?][16]

:::

## Zgen

### Load OMZ library

```diff
- zgen oh-my-zsh

+ zi snippet OMZL::<ANY OF THEM>
```

### Load OMZ plugins

```diff
- zgen oh-my-zsh <PATH>

+ zi snippet OMZP::<PATH>
```

### Load Prezto modules

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

Load repositories as prezto plugins:

```diff
- zgen pmodule <reponame> <branch>

+ zi ice ver"<branch>"
+ zi load <repo/plugin>
```

### Summarized Zgen

:::info

For the `location`: refer [selection of files][17]

:::

```diff
- zgen load <repo> [location] [branch]

+ zi ice ver"[branch]"
+ zi load <repo>
```

## Zplug Basics

```diff
- zplug <repo/plugin>, tag1:<option1>, tag2:<option2>

+ zi ice tag1"<option1>" tag2"<option2>"
+ zi load <repo/plugin>
```

### Tag comparison

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
