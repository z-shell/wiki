---
id: zsh-navigation-tools
title: ⚙️ Navigation Tools
image: /img/logo/320x320.png
description: Multi-word history searcher, `n-cd` – directory bookmark manager, `n-kill` – `htop` like kill utility, and more.
keywords:
  - zsh-navigation-tools
  - zsh-plugin
  - zplugin
---

<!-- @format -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Image from '@theme/IdealImage';

## <i class="fa-brands fa-github"></i> [z-shell/zsh-navigation-tools][]

## Zsh Navigation Tools

The available tools

- `n-aliases` - browse aliases, relegates editing to `vared`
- `n-cd` - browses dir stack and bookmarked directories, allows entering the selected directory
- `n-functions` - browses functions, relegates editing to `zed` or `vared`
- `n-history` - browses history, allows to edit and run commands from it
- `n-kill` - browses processes list, allows sending a signal to the selected process
- `n-env` - browses environment, relegates editing to `vared`
- `n-options` - browse options, allows toggling their state
- `n-panelize` - loads the output of a given command into the list for browsing

---

All tools support horizontal scroll with <kbd>&lt;</kbd>, <kbd>&gt;</kbd>, <kbd>&#123;</kbd>, <kbd>&#125;</kbd> , <kbd>h</kbd>, <kbd>l</kbd> or left and right cursors. Other keys are:

<div className="apitable">

| Key(s)                                              | Description                                                                    |
| --------------------------------------------------- | ------------------------------------------------------------------------------ |
| <kbd>H</kbd>, <kbd>?</kbd>                          | (from n-history) - run n-help                                                  |
| <kbd>Ctrl-R</kbd>                                   | Start n-history, the incremental, multi-keyword history searcher (Zsh binding) |
| <kbd>Ctrl-A</kbd>                                   | Rotate entered words (1+2+3 -> 3+1+2)                                          |
| <kbd>Ctrl-F</kbd>                                   | Fix mode (approximate matching)                                                |
| <kbd>Ctrl-L</kbd>                                   | Redraw of whole display                                                        |
| <kbd>Ctrl-T</kbd>                                   | Browse themes (next theme)                                                     |
| <kbd>Ctrl-G</kbd>                                   | Browse themes (previous theme)                                                 |
| <kbd>Ctrl-U</kbd>                                   | Half page up                                                                   |
| <kbd>Ctrl-D</kbd>                                   | Half page down                                                                 |
| <kbd>Ctrl-P</kbd>                                   | Previous element (also done with vim's k)                                      |
| <kbd>Ctrl-N</kbd>                                   | Next element (also done with vim's j)                                          |
| <kbd>[</kbd>, <kbd>]</kbd>                          | Jump directory bookmarks in n-cd and typical signals in n-kill                 |
| <kbd>g</kbd>, <kbd>G</kbd>                          | Beginning and end of the list                                                  |
| <kbd>/</kbd>                                        | Show incremental search                                                        |
| <kbd>F3</kbd>                                       | Show/hide incremental search                                                   |
| <kbd>Esc</kbd>                                      | Exit incremental search, clearing filter                                       |
| <kbd>Ctrl-W</kbd> (in incremental search)           | delete whole word                                                              |
| <kbd>Ctrl-K</kbd> (in incremental search)           | delete whole line                                                              |
| <kbd>Ctrl-O</kbd>, <kbd>o</kbd>                     | Enter uniq mode (no duplicate lines)                                           |
| <kbd>Ctrl-E</kbd>, <kbd>e</kbd>                     | Edit private history (when in private history view)                            |
| <kbd>F1</kbd> (in n-history)                        | Switch view                                                                    |
| <kbd>F2</kbd>, <kbd>Ctrl-X</kbd>, <kbd>Ctrl-/</kbd> | Search predefined keywords (defined in config files)                           |

</div>

Set of tools like `n-history` – multi-word history searcher, `n-cd` – directory bookmark manager, `n-kill` – `htop` like kill utility, and more.

Based on `n-list`, a tool generates a selectable curses-based list of elements that has access to the current `Zsh` session, i.e. has broad capabilities to work together with it.

Feature highlights include incremental multi-word searching, approximate matching, ANSI coloring, themes, unique mode, horizontal scroll, grepping, advanced history management, and various integrations with `Zsh`.

## Install Zsh Navigation Tools

<Tabs>
  <TabItem value="standalone" label="Standalone" default>

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/z-shell/zsh-navigation-tools/main/doc/install.sh)"
```

To update run the command again.

`ZNT` will be installed at `~/.config/znt/zsh-navigation-tools`, config files will be copied to `~/.config/znt`. `.zshrc` will be updated with only `8` lines of code, which will be added at the bottom.

After installing and reloading the shell give `ZNT` a quick try with `Ctrl-R` – this keyboard shortcut will open `n-history`.

  </TabItem>
  <TabItem value="zi" label="Zi">

Add the following to `.zshrc`. The config files will be in `~/.config/znt`.

```shell
zi load z-shell/zsh-navigation-tools
```

  </TabItem>
  <TabItem value="zgen" label="Zgen">

Add the following to `.zshrc` and issue a `zgen reset` (this assumes that there is a proper `zgen save` construct in `.zshrc`).

```shell
zgen load z-shell/zsh-navigation-tools
```

The config files will be available in `~/.config/znt`.

  </TabItem>
  <TabItem value="antigen" label="Antigen">

Add the following to `.zshrc`. There also should be `antigen apply`.

```shell
antigen bundle z-shell/zsh-navigation-tools
```

The config files will be in `~/.config/znt`.

  </TabItem>
  <TabItem value="manual" label="Manual">

After extracting `ZNT` to `{some-directory}` add the following two lines to `~/.zshrc`:

```shell showLineNumbers
fpath+=( {some-directory} )
source "{some-directory}/zsh-navigation-tools.plugin.zsh"
```

As you can see, no plugin manager is needed to use the `*.plugin.zsh` file. The above two lines of code are all that almost **all** plugin managers do. What's actually needed is only:

```shell
source "{some-directory}/zsh-navigation-tools.plugin.zsh"
```

because `ZNT` detects if it is used by **any** plugin manager and can handle the `$fpath` update by itself.

  </TabItem>
  <TabItem value="single-file" label="Single file">

Running script `doc/generate_single_file` will create a single-file version of `ZNT`. It can be sourced from `.zshrc`.

Don't forget about configuration files as described above.

  </TabItem>
  <TabItem value="fully-manual" label="Fully manual">

Copy (or link) all `n-*` and `znt-*` files to **/usr/share/zsh/site-functions/** (or **/usr/local/share/zsh/site-functions/**, check with `echo $fpath[1]`) and then add:

`autoload n-list n-cd n-env n-kill n-panelize n-options n-aliases n-functions n-history n-help` to `~/.zshrc`.

Create aliases to avoid typing the minus sign `-`:

```shell showLineNumbers
alias naliases=n-aliases ncd=n-cd nenv=n-env nfunctions=n-functions nhistory=n-history
alias nkill=n-kill noptions=n-options npanelize=n-panelize nhelp=n-help
```

Don't forget to copy [configuration files][2].

They should go to `~/.config/znt`. Moreover, `n-cd` works together with option `AUTO_PUSHD` and you should have:

```shell
setopt AUTO_PUSHD
```

in `.zshrc` (also recommend `PUSHD_IGNORE_DUPS`). Without the option, `n-cd` will just work as an incremental searcher of directory bookmarks.

  </TabItem>
</Tabs>

## History Widget

To have `n-history` as the incremental searcher bound to `Ctrl-R` copy `znt-*` files into the `*/site-functions` dir (unless you do a single file install) and add:

```shell showLineNumbers
autoload znt-history-widget
zle -N znt-history-widget
bindkey "^R" znt-history-widget
```

to `.zshrc`. This is done automatically when using the installer, zgen, antigen, or single file install. Two other widgets exist, `and-cd-widget` and `znt-kill-widget`, they too can be assigned to key combinations (`autoload` is done in `.zshrc` so no need for it):

```shell showLineNumbers
zle -N znt-cd-widget
bindkey "^B" znt-cd-widget
zle -N znt-kill-widget
bindkey "^Y" znt-kill-widget
```

## Configuration

`ZNT` has configuration files located in `~/.config/znt`. The files are:

```ini showLineNumbers
n - aliases.conf;
n - cd.conf;
n - env.conf;
n - functions.conf;
n - history.conf;
n - kill.conf;
n - list.conf;
n - options.conf;
n - panelize.conf;
```

`n-list.conf` contains main configuration variables:

```shell showLineNumbers
# Should the list (text, borders) be drawn in bold
local bold=0

# Main color pair (foreground/background)
local colorpair="white/black"

# Should draw the border?
local border=1

# Combinations of colors to try out with Ctrl-T and Ctrl-G
# The last number is the bold option, 0 or 1
local -a themes
themes=(
  "white/black/1" "green/black/0" "green/black/1" "white/blue/0"
  "white/blue/1" "magenta/black/0" "magenta/black/1"
)
```

Read remaining configuration files to see what's in them. Nevertheless, a configuration can be also set from `.zshrc`.

There are `5` standard `.zshrc` configuration variables:

```shell showLineNumbers
znt_history_active_text - underline or reverse - how should be active element highlighted
znt_history_nlist_coloring_pattern - pattern that can be used to colorize elements
znt_history_nlist_coloring_color - color with which to colorize
znt_history_nlist_coloring_match_multiple - should multiple matches be colorized (0 or 1)
znt_history_keywords (array) - search keywords activated with `Ctrl-X`, `F2` or `Ctrl-/`, e.g. ( "git" "vim" )
```

The above variables will work for the `n-history` tool. For other tools, change `_history_` to e.g. `_cd_`, for the `n-cd` tool. The same works for all `8` tools.

The common configuration of the tools uses variables with `_list_` in them:

```shell showLineNumbers
znt_list_bold - should draw text in bold (0 or 1)
znt_list_colorpair - main pair of colors to be used, e.g "green/black"
znt_list_border - should draw borders around windows (0 or 1)
znt_list_themes (array) - list of themes to try out with Ctrl-T, e.g. ( "white/black/1" "green/black/0" )
znt_list_instant_select - should pressing enter in search mode leave tool (0 or 1)
```

If you used `ZNT` before `v2.1.12`, remove old configuration files `~/.config/znt/*.conf` so that `ZNT` can update them to the latest versions that support integration with `.zshrc`.

If you used installer then run it again (after the removal of configuration files).

## Programming

The function `n-list` is used as follows:

```shell
n-list {element1} [element2] ... [elementN]
```

This is all that is needed to be done to have the features like ANSI coloring, incremental multi-word search, unique mode, horizontal scroll, and non-selectable elements (grepping is done outside `n-list`, see the tools for how it can be done).

To set up non-selectable entries add their indices into the array `NLIST_NONSELECTABLE_ELEMENTS`:

```shell showLineNumbers
typeset -a NLIST_NONSELECTABLE_ELEMENTS
NLIST_NONSELECTABLE_ELEMENTS=( 1 )
```

The result is stored as `$reply[REPLY]` (`$` isn't needed before `REPLY` because of the arithmetic context inside `[]`). The returned array might be different from input arguments as `n-list` can process them via incremental search or uniq mode.

`$REPLY` is the index in that possibly processed array. If `$REPLY` equals `-1` it means that no selection has been made (user quitted via `q` key). To set up entries that can be jumped to with `[`,`]` keys add their indices to the `NLIST_HOP_INDEXES` array:

```shell showLineNumbers
typeset -a NLIST_HOP_INDEXES
NLIST_HOP_INDEXES=( 1 10 )
```

`n-list` can automatically colorize entries according to a `Zsh` pattern. The following example will colorize all numbers with blue:

```shell showLineNumbers
local NLIST_COLORING_PATTERN="[0-9]##"
local NLIST_COLORING_COLOR=$'\x1b[00;34m'
local NLIST_COLORING_END_COLOR=$'\x1b[0m'
local NLIST_COLORING_MATCH_MULTIPLE=1

n-list "This is a number 123" "This line too has a number: 456"
```

Blue is the default color, it doesn't have to be set. See the `zshexpn` man page for more information on `Zsh` patterns. Briefly, comparing to regular expressions, `(#s)` is `^`, `(#e)` is `$`, `#` is `*`, `##` is `+`.

The alternative will work when in parenthesis, i.e. `(a|b)`. BTW by using this method you can colorize the output of the tools, via their config files (check out e.g. n-cd.conf, it is using this).

## Performance

`ZNT` is fastest with `Zsh` before `5.0.6` and starting from `5.2`

:::tip

Zsh plugins may look scary, as they seem to have some "architecture". The plugin is:

1. has its directory added to `fpath`
2. has any first `*.plugin.zsh` file sourced

That's it. When one contributes to Oh-My-Zsh or creates a plugin for any plugin manager, he only needs to account for this. The same with doing any non-typical Zsh Navigation Tools installation.

:::

:::caution

Be aware of [this][3]

:::

## Fixing tmux, screen, and Linux vt

If `TERM=screen-256color` (often a case for `tmux` and `screen` sessions) then `ncv` terminfo capability will have `2`nd bit set. This in general means that the underline won't work. To fix this by creating your own `ncv=0`-equipped terminfo file, run:

```shell
{ infocmp -x screen-256color; printf '\t%s\n' 'ncv@,'; } > /tmp/t && tic -x /tmp/t
```

A file will be created in the directory `~/.terminfo` and will be automatically used, `tmux` and `screen` will work. Similar is for Linux virtual terminal:

```shell
{ infocmp -x linux; printf '\t%s\n' 'ncv@,'; } > /tmp/t && tic -x /tmp/t
```

It will not display underline properly, but will instead highlight by a color, which is quite nice. The same will not work for FreeBSD's vt, `ZNT` will detect if that `vt` is used and will revert to highlighting elements via `reverse` mode.

<!-- end-of-file -->
<!-- links -->

[z-shell/zsh-navigation-tools]: https://github.com/z-shell/zsh-navigation-tools
[2]: https://github.com/z-shell/zsh-navigation-tools/tree/main/.config/znt
[3]: https://github.com/z-shell/zsh-navigation-tools/blob/f49f910d239ae5bc6e1a5bb34930307b4f4e3ffe/zsh-navigation-tools.plugin.zsh#L35-L49
