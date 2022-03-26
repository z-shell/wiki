---
id: for
title: ✨ For Syntax
image: zw/logo/320x320.png
description: The For Syntax documentation
keywords: [syntax, how-to-use]
---

import APITable from '@site/src/components/APITable';

The `for` syntax is more concise and more optimized.

It is best presented by a real-world example:

```shell
zi as"null" wait"3" lucid for \
  sbin Fakerr/git-recall \
  sbin paulirish/git-open \
  sbin paulirish/git-recent \
  sbin davidosomething/git-my \
  make"PREFIX=$ZPFX install" iwata/git-now \
  make"PREFIX=$ZPFX" tj/git-extras
```

Above single command installs 6 plugins ([git extension][2] packages), with the base ices `as"null" wait"3" lucid` that
are common to all of the plugins and 6 plugin-specific add-on ices.

### Use cases of `for` syntax

Load a few useful binary packages from the [GitHub releases][1], utils:

```shell
zi as"null" wait"2" lucid from"gh-r" for \
  mv"exa* -> exa" sbin ogham/exa \
  mv"fd* -> fd" sbin"fd/fd" @sharkdp/fd \
  sbin"fzf" junegunn/fzf
```

:::note

- `sbin'…'` is an [ice][4] added by the [bin-gem-node][5] [annex][6], it provides the command to the command line
  without altering `$PATH`.
- If the name of the command is the same as the name of the plugin, the ice contents can be skipped.

:::

[Turbo][7] load some plugins, without any plugin-specific ices:

```shell
zi wait lucid for \
  hlissner/zsh-autopair \
  urbainvaes/fzf-marks
```

Load two [Oh My Zsh][8] files as [snippets][9], in turbo mode:

```shell
zi wait lucid for \
  OMZ::lib/git.zsh \
  atload"unalias grv" OMZ::plugins/git/git.plugin.zsh
```

### With [turbo mode][7] and the [for][8] syntax

```shell {1}
zi wait lucid light-mode for \
  atinit"zicompinit; zicdreplay" \
    z-shell/F-Sy-H \
  atload"_zsh_autosuggest_start" \
    zsh-users/zsh-autosuggestions \
  blockf atpull'zi creinstall -q .' \
    zsh-users/zsh-completions
```

<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->


<APITable>

| Syntax       | Description                                                                                                                                                                                                                                                                                                                                                            |
|--------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `wait`       | Load 0 seconds (about 5 ms exactly) after prompt ([turbo mode][7]). |
| `lucid`      | Silence the under-prompt messages ("`Loaded {name of the plugin}`"). |
| `light-mode` | Load the plugin in `light` mode. More below (1). |
| `atpull'…'`  | Execute after updating the plugin – the command in the ice will install any new completions. |
| `atinit'…'`  | Execute code before loading plugin.  |
| `atload'…'`  | Execute code after loading plugin. |
| `zicompinit` | Equals to `autoload compinit; compinit`. |
| `zicdreplay` | Execute `compdef …` calls that plugins did. More below (2). |

</APITable>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

- (1) Then the tracking of plugin, activity report gathering, accessible via the `zi report {plugin-name}` subcommand)
  is being disabled. Note that for turbo mode, the performance gains are almost `0`, so in this mode, you can load all
  plugins with the tracking and the `light-mode` ice can be removed from the command.
- (2) They were recorded and `compinit` can be called later. `compinit` provides the `compdef` function, so it must be
  ran before issuing the taken-over `compdef`s with `zicdreplay`.

#### Summarized

Syntax-highlighting plugins, like [F-Sy-H][9] or [zsh-syntax-highlighting][10], theoretically expect to be loaded last,
even after the completion initialization as `compinit` function. However in practice, you just have to ensure that such
plugin is loaded after plugins that are issuing `compdef` – which basically means completions that aren't using the
underscore-starting function file; the completion initialization still has to be performed before syntax-highlighting
plugin, hence the `atinit'…'` ice, which will load `compinit` right before loading the plugin, the syntax-highlighting
and suggestions plugins are loaded early for a better user experience.

### Oh-My-Zsh

#### With [turbo mode][7] and [for][8] syntax

```shell
# A.
setopt promptsubst

# B.
zi wait lucid for \
  OMZL::git.zsh \
  atload"unalias grv" \
  OMZP::git

PS1="READY >" # provide a simple prompt till the theme loads

# C.
zi wait'!' lucid for \
  OMZL::prompt_info_functions.zsh \
  OMZT::gnzh

# D.
zi wait lucid for \
    atinit"zicompinit; zicdreplay" \
    z-shell/fast-syntax-highlighting \
  OMZP::colored-man-pages \
    as"completion" \
  OMZP::docker/_docker
```

:::info

**A** - Most themes use this option.

**B** - OMZ themes use this library and some other use also the plugin. It provides many aliases – `atload'…'` shows how
to disable some of them (e.g.: to use program `rgburke/grv`).

**C** - Set OMZ theme. Loaded separately because the theme needs the `!` passed to the `wait` ice to reset the prompt
after loading the snippet in Turbo.

**D** - Some plugins: a) syntax-highlighting, loaded possibly early for a better user experience), b) example functional
plugin, c) Docker completion.

:::

Above setup loads everything after prompt, because of preceding `wait` ice. That is called **turbo mode**, it shortens
Zsh startup time by <u>50%-80%</u>, e.g. instead of 200 ms, it'll be getting your shell started up after **40 ms**.

With normal setup – **you can remove `wait` only from the theme plugin** and its dependencies to have the same effect
while still using turbo mode for everything remaining:

```shell
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

In general, [turbo mode][7] can be optionally enabled only for a subset of plugins or for all plugins.

[1]: /search/?q=GH-R
[2]: /search/?q=git+ext
[4]: /search/?q=ice
[5]: /search/?q=bin+gem+node
[6]: /search/?q=annex
[7]: /search/?q=turbo+mode
[8]: /search/?q=oh+my+zsh
[9]: /search/?q=snippets
[7]: /docs/getting_started/overview#turbo-mode-zsh--53
[8]: /docs/guides/syntax#the-for-syntax
[9]: https://github.com/z-shell/F-Sy-H
[10]: https://github.com/zsh-users/zsh-syntax-highlighting
