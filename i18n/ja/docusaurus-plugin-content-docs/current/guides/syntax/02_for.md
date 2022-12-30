---
id: for
title: '✨ "For" 構文'
sidebar_position: 2
image: /img/png/theme/z/320x320.png
description: '"For" 構文のドキュメント'
keywords:
  - for
  - syntax
  - how-to-use
  - the-for-syntax
---

<!-- @format -->

import APITable from '@site/src/components/APITable';

`for` 構文は、最も人気があり、より簡潔で、より最適化されている構文です。 単一のコマンドは、 [標準構文][standard-syntax] 呼び出しと同じように動作します。

これはより、 <b>プラグインの集合</b> 、または<b>複数のファイル</b> のsourceについて、 [src, pick, multisrc][src-pick-multisrc] などの共通/デフォルトのice修飾子を提供することができます。

:::tip

より詳しい情報を得るには、 [検索][3] または、 <kbd>CTRL+K</kbd>を使ってください。

:::

```shell showLineNumbers
zi light-mode for \
  zsh-users/zsh-autosuggestions \
  z-shell/F-Sy-H \
  z-shell/H-S-MW \
    pick"async.zsh" src"pure.zsh" \
      sindresorhus/pure
```

実例を挙げて紹介するのが一番です。

```shell showLineNumbers
zi wait"3" lucid for as"null" \
  sbin Fakerr/git-recall \
  sbin paulirish/git-open \
  sbin paulirish/git-recent \
  sbin davidosomething/git-my \
  make"PREFIX=$ZPFX install" iwata/git-now \
  make"PREFIX=$ZPFX" tj/git-extras
```

上記の1つのコマンドで、6つのプラグイン ([git extension][2] packages) がインストールされます。`as"null" wait"3" lucid` はベースのiceとしてすべてのプラグインに共通して指定され、それぞれ6つのプラグイン固有の ice修飾子も指定されます。

[GitHub リリース][1]から、いくつかの便利なバイナリー・パッケージをロードする場合:

```shell showLineNumbers
zi for as"null" wait"2" lucid from"gh-r" \
  mv"exa* -> exa" sbin ogham/exa \
  mv"fd* -> fd" sbin"fd/fd" @sharkdp/fd \
  sbin"fzf" junegunn/fzf
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

Popular plugin set with [turbo][6] and The "For":

```shell {1} showLineNumbers
zi wait lucid light-mode for \
  atinit"zicompinit; zicdreplay" \
    z-shell/F-Sy-H \
  atload"_zsh_autosuggest_start" \
    zsh-users/zsh-autosuggestions \
  blockf atpull'zi creinstall -q .' \
    zsh-users/zsh-completions
```

```mdx-code-block
<APITable>
```

| 構文           | 説明                                                                                           |
| ------------ |:-------------------------------------------------------------------------------------------- |
| `wait`       | Load 0 seconds (about 5 ms exactly) after prompt ([turbo mode][6]).                          |
| `lucid`      | Silence the under-prompt messages ("`Loaded {name of the plugin}`").                         |
| `light-mode` | Load the plugin in `light` mode. [^1].                                                       |
| `atpull'…'`  | Execute after updating the plugin – the command in the ice will install any new completions. |
| `atinit'…'`  | Execute code before loading plugin.                                                          |
| `atload'…'`  | Execute code after loading the plugin.                                                       |
| `zicompinit` | Equals to `autoload compinit; compinit`.                                                     |
| `zicdreplay` | Execute `compdef …` calls by plugins. More below [^2].                                       |

```mdx-code-block
</APITable>
```

## <i class="fa-solid fa-list"></i> Oh-My-Zsh, [turbo][6] Oh-My-Zsh と "For" 構文

### <i class="fa-solid fa-forward-step"></i> Without [turbo mode][6] and The "For"

```shell showLineNumbers
# A.
setopt prompt_subst

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

### <i class="fa-solid fa-forward-fast"></i> With [turbo mode][6] and The "For"

```shell showLineNumbers
# A.
setopt prompt_subst

# B, C.
zi wait lucid for \
  OMZL::git.zsh \
  atload"unalias grv" \
  OMZP::git

# Provide a simple prompt till the theme loads to visualize the effect.
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

**B, C** - OMZ themes use this library and some others use also the plugin. It provides many aliases – `atload'…'` showing how to disable some of them (e.g.: to use the program `rgburke/grv`).

**D** - Set OMZ theme. Loaded separately because the theme needs the `!` passed to the `wait` ice to reset the prompt after loading the snippet in turbo mode.

**E, F, G** - Some plugins:

1. syntax-highlighting, loaded possibly early for a better user experience).
2. example functional plugin.
3. docker completion.

:::

The above setup loads everything after the prompt, because of the preceding `wait` ice. That is called **turbo mode**, which shortens Zsh startup time by <u>50%-80%</u>, e.g. instead of 200 ms, it'll be getting your shell started up after **40 ms**.

Try both setups on the daily basis to notice the difference. The features of Zi can do much more than this simple example.

### `zi-turbo '…' for …` {#zi-turbo--for-}

The `zi-turbo` is a function to simplify `wait`:

```shell showLineNumbers
zi-turbo() {
  zi depth'3' lucid ${1/#[0-9][a-c]/wait"${1}"} "${@:2}"
}
```

Then use the `for` syntax in the imposed loading order:

```shell {1,6,10,15} showLineNumbers
zi-turbo '0a' for \
  OMZL::git.zsh \
  OMZL::compfix.zsh \
  OMZL::functions.zsh \

zi-turbo '0b' for \
  OMZL::prompt_info_functions.zsh OMZL::spectrum.zsh \
  OMZL::clipboard.zsh OMZL::termsupport.zsh OMZL::directories.zsh

zi-turbo '0c' for \
  OMZP::sudo OMZP::encode64 \
    atload"unalias grv g" OMZP::git \
  OMZP::gcloud OMZP::nvm OMZP::gem OMZP::rust

zi-turbo '1a' for \
  MichaelAquilina/zsh-you-should-use
```

## <i class="fa-solid fa-book-bookmark"></i> 概要

In general, [turbo mode][6] can be optionally enabled only for a subset of plugins or for all plugins.

Syntax-highlighting plugins, like [F-Sy-H][11] or [zsh-syntax-highlighting][12], theoretically expect to be loaded last, even after the completion initialization as `compinit` function.

However, in practice, you just have to ensure that such plugin is loaded after plugins that are issuing `compdef` – which means completions that aren't using the underscore-starting function file; the completion initialization still has to be performed before the syntax-highlighting plugin, hence the `atinit'…'` ice, which will load `compinit` right before loading the plugin, the syntax-highlighting and suggestions plugins are loaded early for a better user experience.

<!-- end-of-file -->
<!-- footnotes -->



<!-- links -->



<!-- external -->

[^1]: Then the tracking of plugin, activity report gathering, accessible via the `zi report {plugin-name}` subcommand) is being disabled. Note that for turbo mode, the performance gains are almost `0`, so in this mode, you can load all plugins with the tracking and the `light-mode` ice can be removed from the command.
[^2]: They were recorded and `compinit` can be called later. `compinit` provides the `compdef` function, so it must be run before issuing the taken-over `compdef`s with `zicdreplay`.

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
[standard-syntax]: /docs/guides/syntax/standard
[src-pick-multisrc]: /docs/guides/syntax/standard#src-pick-multisrc

[11]: https://github.com/z-shell/F-Sy-H
[12]: https://github.com/zsh-users/zsh-syntax-highlighting
