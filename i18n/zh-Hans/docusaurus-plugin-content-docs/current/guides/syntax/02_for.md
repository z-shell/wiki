---
id: for
title: '✨ The "For" Syntax'
sidebar_position: 2
image: img/logo/320x320.png
description: The "For" Syntax documentation
keywords:
  - for
  - syntax
  - how-to-use
  - the-for-syntax
---

The `for` syntax is the most popular, more concise, and more optimized. The single command will work the same as the classic-syntax invocation.

It allows providing common/default ices for a <b> set of plugins </b> or to source <b> multiple files </b> with ices: [src, pick, multisrc][ice#src-pick-multisrc].

:::tip

To find more information about anything use [search][3] or just <kbd>CTRL+K</kbd>.

:::

```shell showLineNumbers
zi light-mode for \
  zsh-users/zsh-autosuggestions \
  z-shell/F-Sy-H \
  z-shell/H-S-MW \
    pick"async.zsh" src"pure.zsh" \
      sindresorhus/pure
```

It is best presented by a real-world examples:

```shell showLineNumbers
zi wait"3" lucid for as"null" \
  sbin Fakerr/git-recall \
  sbin paulirish/git-open \
  sbin paulirish/git-recent \
  sbin davidosomething/git-my \
  make"PREFIX=$ZPFX install" iwata/git-now \
  make"PREFIX=$ZPFX"
    tj/git-extras
```

Above single command installs 6 plugins ([git extension][2] packages), with the base ices `as"null" wait"3" lucid` that are common to all of the plugins and 6 plugin-specific add-on ices.

Load a few useful binary packages from the [GitHub releases][1], utils:

```shell showLineNumbers
zi for as"null" wait"2" lucid from"gh-r" \
  mv"exa* -> exa" sbin ogham/exa \
  mv"fd* -> fd" sbin"fd/fd" @sharkdp/fd \
  sbin"fzf"
    junegunn/fzf
```

:::note

- `sbin'…'` is an [ice][3] added by the [bin-gem-node][4] [annex][5], it provides the command to the command line without altering `$PATH`.
- If the name of the command is the same as the name of the plugin, the ice contents can be skipped.

:::

[Turbo][6] load some plugins, without any plugin-specific ices:

```shell showLineNumbers
zi wait lucid for \
  hlissner/zsh-autopair \
  urbainvaes/fzf-marks
```

Load two [Oh-My-Zsh][7] files as [snippets][8], in turbo mode:

```shell showLineNumbers
zi wait lucid for \
    OMZ::lib/git.zsh \
  atload"unalias grv" \
    OMZ::plugins/git/git.plugin.zsh
```

Popular plugin set with [turbo][6] and [for][10]:

```shell {1} showLineNumbers
zi wait lucid light-mode for \
  atinit"zicompinit; zicdreplay" \
    z-shell/F-Sy-H \
  atload"_zsh_autosuggest_start" \
    zsh-users/zsh-autosuggestions \
  blockf atpull'zi creinstall -q .' \
    zsh-users/zsh-completions
```

| Syntax       | Description                                                                                  |
| ------------ |:-------------------------------------------------------------------------------------------- |
| `wait`       | Load 0 seconds (about 5 ms exactly) after prompt ([turbo mode][6]).                          |
| `lucid`      | Silence the under-prompt messages ("`Loaded {name of the plugin}`").                         |
| `light-mode` | Load the plugin in `light` mode. [^1].                                                       |
| `atpull'…'`  | Execute after updating the plugin – the command in the ice will install any new completions. |
| `atinit'…'`  | Execute code before loading plugin.                                                          |
| `atload'…'`  | Execute code after loading plugin.                                                           |
| `zicompinit` | Equals to `autoload compinit; compinit`.                                                     |
| `zicdreplay` | Execute `compdef …` calls that plugins did. More below [^2].                                 |

## <i class="fa-solid fa-list"></i> Oh-My-Zsh, [turbo][6] Oh-My-Zsh and the [for][10] syntax

### <i class="fa-solid fa-forward-step"></i> Without [turbo mode][6] and [for][10]

```shell showLineNumbers
# A.
setopt promptsubst

# B.
zi snippet OMZL::git.zsh

# C.
zi ice atload"unalias grv"
zi snippet OMZP::git

# D.
zi for OMZL::prompt_info_functions.zsh OMZT::gnzh

# E.
zi snippet OMZP::colored-man-pages

# F.
zi ice as"completion"
zi snippet OMZP::docker/_docker

# G.
zi ice atinit"zicompinit; zicdreplay"
zi light z-shell/F-Sy-H
```

### <i class="fa-solid fa-forward-fast"></i> With [turbo mode][6] and [for][10]

```shell showLineNumbers
# A.
setopt promptsubst

# B, C.
zi wait lucid for \
  OMZL::git.zsh \
  atload"unalias grv" \
  OMZP::git

# Provide a simple prompt till the theme loads to visualise the effect.
PS1="READY >"

# D.
zi wait'!' lucid for \
  OMZL::prompt_info_functions.zsh \
  OMZT::gnzh

# E, F, G.
zi wait lucid for \
    atinit"zicompinit; zicdreplay" \
    z-shell/fast-syntax-highlighting \
  OMZP::colored-man-pages \
    as"completion" \
  OMZP::docker/_docker
```

:::info

**A** - Most themes use this option.

**B, C** - OMZ themes use this library and some other use also the plugin. It provides many aliases – `atload'…'` shows how to disable some of them (e.g.: to use program `rgburke/grv`).

**D** - Set OMZ theme. Loaded separately because the theme needs the `!` passed to the `wait` ice to reset the prompt after loading the snippet in turbo mode.

**E, F, G** - Some plugins:

1. syntax-highlighting, loaded possibly early for a better user experience).
2. example functional plugin.
3. docker completion.

:::

Above setup loads everything after prompt, because of preceding `wait` ice. That is called **turbo mode**, it shortens Zsh startup time by <u>50%-80%</u>, e.g. instead of 200 ms, it'll be getting your shell started up after **40 ms**.

Try both setups on the daily basis to notice the difference. The features of ZI can do much more than this simple example.

## <i class="fa-solid fa-book-bookmark"></i> 摘要

In general, [turbo mode][6] can be optionally enabled only for a subset of plugins or for all plugins.

Syntax-highlighting plugins, like [F-Sy-H][11] or [zsh-syntax-highlighting][12], theoretically expect to be loaded last, even after the completion initialization as `compinit` function.

However in practice, you just have to ensure that such plugin is loaded after plugins that are issuing `compdef` – which basically means completions that aren't using the underscore-starting function file; the completion initialization still has to be performed before syntax-highlighting plugin, hence the `atinit'…'` ice, which will load `compinit` right before loading the plugin, the syntax-highlighting and suggestions plugins are loaded early for a better user experience.

[^1]: Then the tracking of plugin, activity report gathering, accessible via the `zi report {plugin-name}` subcommand) is being disabled. Note that for turbo mode, the performance gains are almost `0`, so in this mode, you can load all plugins with the tracking and the `light-mode` ice can be removed from the command.
[^2]: They were recorded and `compinit` can be called later. `compinit` provides the `compdef` function, so it must be ran before issuing the taken-over `compdef`s with `zicdreplay`.

[1]: /search/?q=GH-R
[2]: /search/?q=git+ext
[3]: /search/?q=ice
[3]: /search/?q=ice
[4]: /search/?q=bin+gem+node
[5]: /search/?q=annex
[6]: /search/?q=turbo+mode
[6]: /search/?q=turbo+mode
[6]: /search/?q=turbo+mode
[7]: /search/?q=oh+my+zsh
[8]: /search/?q=snippets
[10]: /docs/guides/syntax/for
[11]: https://github.com/z-shell/F-Sy-H
[12]: https://github.com/zsh-users/zsh-syntax-highlighting
[ice#src-pick-multisrc]: /docs/guides/syntax/ice#src-pick-multisrc
