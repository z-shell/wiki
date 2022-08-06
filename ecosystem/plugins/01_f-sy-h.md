---
id: f-sy-h
title: ⚙️ Feature-rich syntax highlighting
sidebar_position: 1
image: /img/logo/320x320.png
description: Feature-rich Syntax Highlighting for Zsh
toc_max_heading_level: 4
keywords:
  - feature-ruch
  - fast-syntax-highlighting
  - syntax-highlighting
  - zsh-plugin
---

<!-- @format -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Image from '@theme/IdealImage';
import Loadable from '@loadable/component';
import Spinner from "@site/src/components/Spinner";

export const AsciinemaPlayer = Loadable(() => import('@site/src/components/AsciinemaPlayer'));

## <i class="fa-brands fa-github"></i> [z-shell/f-sy-h][1]

## Install F-Sy-H

<Tabs>
  <TabItem value="standalone" label="Standalone" default>

Clone the Repository.

```shell
git clone https://github.com/z-shell/F-Sy-H ~/path/to/fsh
```

And add the following to your `zshrc` file.

```shell
source ~/path/to/fsh/F-Sy-H.plugin.zsh
```

  </TabItem>
  <TabItem value="zi" label="Zi">

Add the following to your `zshrc` file.

```shell
zi light z-shell/F-Sy-H
```

Load the plugin in [turbo mode][turbo-mode]:

```shell showLineNumbers
zi wait lucid for \
 atinit"ZI[COMPINIT_OPTS]=-C; zicompinit; zicdreplay" \
    z-shell/F-Sy-H \
 blockf \
    zsh-users/zsh-completions \
 atload"!_zsh_autosuggest_start" \
    zsh-users/zsh-autosuggestions
```

  </TabItem>
  <TabItem value="zinit" label="Zinit">

Add the following to your `zshrc` file.

```shell
zinit light z-shell/F-Sy-H
```

  </TabItem>
  <TabItem value="antigen" label="Antigen">

Add the following to your `zshrc` file.

```shell
antigen bundle z-shell/F-Sy-H
```

  </TabItem>
  <TabItem value="zgen" label="Zgen">

Add the following to your `.zshrc` file in the same place you're doing your other `zgen load` calls in.

```shell
zgen load z-shell/F-Sy-H
```

  </TabItem>
  <TabItem value="oh-my-zsh" label="Oh-My-Zsh">

Clone the Repository:

```shell
git clone https://github.com/z-shell/F-Sy-H.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/F-Sy-H
```

And add `F-Sy-H` to your plugin list.

  </TabItem>
</Tabs>

## Syntax highlighting features

### Themes

Switch themes via `fast-theme {theme-name}`.

<div className="ScreenView">
  <Image img="https://cdn.zshell.dev/img/asciicast/gif/fsh/fsh.gif" className="ImageView" alt="Syntax highlighting themes" />
</div>

Run `fast-theme -t {theme-name}` option to obtain the snippet above.

Run `fast-theme -l` to list available themes.

#### Theme guide for F-Sy-H

To select a theme use `fast-theme`. There are 6 shipped themes which are basic [INI files][ini-files] where each key is a _style_, they can be listed with `fast-theme -l`.

Besides shipped themes, user can point this tool to any other theme, by simple `fast-theme ~/mytheme.ini`. To obtain template to work on when creating own theme, issue `fast-theme --copy-shipped-theme {theme-name}`.

To alter just a few styles and not create a whole new theme, use **overlay**. What is overlay? It is in the same
format as full theme, but can have only a few styles defined, and these styles will overwrite styles in main-theme.

Example overlay file:

```ini showLineNumbers
; overlay.ini
[base]
commandseparator = yellow,bold
comment          = 17

[command-point]
function       = green
command        = 180
```

File name `overlay.ini` is treated specially.

When specifing path, following short-hands can be used:

```ini showLineNumbers
XDG:    = ~/.config/fsh (respects $XDG_CONFIG_HOME env var)
LOCAL:  = /usr/local/share/fsh/
HOME:   = ~/.fsh/
OPT:    = /opt/local/share/fsh/
```

So for example, issue `fast-theme XDG:overlay` to load `~/.config/fsh/overlay.ini` as overlay. The `.ini` extension is optional.

#### Secondary theme

Each theme has key `secondary`, e.g. for theme `free`:

```ini showLineNumbers
; free.ini
[base]
default          = none
unknown-token    = red,bold
; ...
; ...
; ...
secondary        = zdharma
```

Secondary theme (`zdharma` in the example) will be used for highlighting of argument for `eval` and of `$( ... )` interior (i.e. of interior of command substitution). Basically, recursive highlighting uses alternate theme to make the highlighted code distinct:

<div className="ScreenView">
  <Image className="ImageView" img="https://raw.githubusercontent.com/z-shell/F-Sy-H/main/docs/images/cmdsubst.png" alt="Syntax highlighting command substitution" />
</div>

In the above screen-shot the interior of `$( ... )` uses different colors than the rest of the code. Example for `eval`:

<div className="ScreenView">
  <Image className="ImageView" img="https://raw.githubusercontent.com/z-shell/F-Sy-H/main/docs/images/eval_cmp.png" alt="Syntax highlighting eval" />
</div>

First line doesn't use recursive highlighting, highlights `eval` argument as regular string. Second line switches theme to `zdharma` and does full recursive highlighting of eval argument.

### Variables

Comparing to the project `zsh-users/zsh-syntax-highlighting` (the upper line):

<div className="ScreenView">
  <Image className="ImageView" img="https://raw.githubusercontent.com/z-shell/F-Sy-H/main/docs/images/parameter.png" alt="Syntax highlighting parameter" />
</div>
<div className="ScreenView">
  <Image className="ImageView" img="https://raw.githubusercontent.com/z-shell/F-Sy-H/main/docs/images/in_string.png" alt="Syntax highlighting in string" />
</div>

### Brackets

<div className="ScreenView">
  <Image className="ImageView" img="https://raw.githubusercontent.com/z-shell/F-Sy-H/main/docs/images/brackets.gif" alt="Syntax highlighting brackets" />
</div>

### Conditions

Comparing to the project `zsh-users/zsh-syntax-highlighting` (the upper line):

<div className="ScreenView">
  <Image className="ImageView" img="https://raw.githubusercontent.com/z-shell/F-Sy-H/main/docs/images/cplx_cond.png" alt="Syntax highlighting conditions" />
</div>

### Strings

Exact highlighting that recognizes quotings.

<div className="ScreenView">
  <Image className="ImageView" img="https://raw.githubusercontent.com/z-shell/F-Sy-H/main/docs/images/ideal-string.png" alt="Syntax highlighting strings" />
</div>

#### here-strings

<div className="ScreenView">
  <Image className="ImageView" img="https://raw.githubusercontent.com/z-shell/F-Sy-H/main/docs/images/herestring.png" alt="Syntax highlighting here-strings" />
</div>

### `exec` descriptor-variables

Comparing to the project `zsh-users/zsh-syntax-highlighting` (the upper line):

<div className="ScreenView">
  <Image className="ImageView" img="https://raw.githubusercontent.com/z-shell/F-Sy-H/main/docs/images/execfd_cmp.png" alt="Syntax highlighting exec" />
</div>

### The for-loops and alternate syntax (brace `{`/`}` blocks)

<div className="ScreenView">
  <Image className="ImageView" img="https://raw.githubusercontent.com/z-shell/F-Sy-H/main/docs/images/for-loop-cmp.png" alt="Syntax highlighting loops" />
</div>

### Function definitions

Comparing to the project `zsh-users/zsh-syntax-highlighting` (the upper 2 lines):

<div className="ScreenView">
  <Image className="ImageView" img="https://raw.githubusercontent.com/z-shell/F-Sy-H/main/docs/images/function.png" alt="Syntax highlighting function" />
</div>

### Recursive `eval` and `$( )` highlighting

Comparing to the project `zsh-users/zsh-syntax-highlighting` (the upper line):

<div className="ScreenView">
  <Image className="ImageView" img="https://raw.githubusercontent.com/z-shell/F-Sy-H/main/docs/images/eval_cmp.png" alt="Syntax highlighting eval" />
</div>

## Chroma functions

### Command specific highlighting

#### Autoload

<div className="ScreenView">
  <Image className="ImageView" img="https://cdn.zshell.dev/img/asciicast/gif/fsh/fsh-autoload.gif" alt="Syntax highlighting autoload" />
</div>

#### Awk

<div className="ScreenView">
  <Image className="ImageView" img="https://cdn.zshell.dev/img/asciicast/gif/fsh/fsh-awk.gif" alt="Syntax highlighting awk" />
</div>

#### Git commit

<div className="ScreenView">
  <Image className="ImageView" img="https://cdn.zshell.dev/img/asciicast/gif/fsh/fsh-git-commit.gif" alt="Syntax highlighting git commit" />
</div>

#### Git checkout

<div className="ScreenView">
  <Image className="ImageView" img="https://cdn.zshell.dev/img/asciicast/gif/fsh/fsh-git-checkout.gif" alt="Syntax highlighting git checkout" />
</div>

#### Grep

<div className="ScreenView">
  <Image className="ImageView" img="https://cdn.zshell.dev/img/asciicast/gif/fsh/fsh-grep.gif" alt="Syntax highlighting grep" />
</div>

#### Perl

<div className="ScreenView">
  <Image className="ImageView" img="https://cdn.zshell.dev/img/asciicast/gif/fsh/fsh-perl.gif" alt="Syntax highlighting perl" />
</div>

#### Sh

<div className="ScreenView">
  <Image className="ImageView" img="https://cdn.zshell.dev/img/asciicast/gif/fsh/fsh-sh-c.gif" alt="Syntax highlighting sh -c" />
</div>

The [chromas](https://github.com/z-shell/F-Sy-H/tree/main/→chroma) that are enabled by default can be found [here](https://github.com/z-shell/F-Sy-H/blob/main/fast-highlight#L166).

### Fpath highlighting

<div className="ScreenView">
  <Image className="ImageView" img="https://cdn.zshell.dev/img/asciicast/gif/fsh/fsh-fpath.gif" alt="Syntax highlighting fpath" />
</div>

### Case highlighting

<div className="ScreenView">
  <Image className="ImageView" img="https://cdn.zshell.dev/img/asciicast/gif/fsh/fsh-case.gif" alt="Syntax highlighting case" />
</div>

### Math highlighting

<div className="ScreenView">
  <Image className="ImageView" img="https://raw.githubusercontent.com/z-shell/F-Sy-H/main/docs/images/math.gif" alt="Syntax highlighting math" />
</div>

### Zcalc highlighting

<div className="ScreenView">
  <Image className="ImageView" img="https://raw.githubusercontent.com/z-shell/F-Sy-H/main/docs/images/zcalc.png" alt="Syntax highlighting zcalc" />
</div>

### Performance

Performance differences can be observed in this Asciinema recording, where a `10 kB` function is being edited.

<div className="ScreenView">
  <AsciinemaPlayer
    fallback={<Spinner />}
    src='https://asciinema.org/a/512971.cast'
    rows={24}
    cols={135}
    speed={1.5}
    idleTimeLimit={1}
  />
</div>

### Custom Working Directory

Set `$FAST_WORK_DIR` before loading the plugin to have e.g. processed theme files (ready to load, in Zsh format, not INI) kept under specified location. This is handy if e.g. you install Fast-Syntax-Highlighting system-wide (e.g. from AUR on ArchLinux) and want to have per-user theme setup.

You can use "~" in the path, e.g. `FAST_WORK_DIR=~/.fsh` and also the `XDG:`, `LOCAL:`, `OPT:`, etc. short-hands, so e.g. `FAST_WORK_DIR=XDG` or `FAST_WORK_DIR=XDG:` is allowed (in this case it will be changed to `$HOME/.config/fsh` by default by F-Sy-H loader).

### Chroma guide for F-Sy-H

This document explains to create a detailed highlighting for a **specific program**.

#### Keywords

- `chroma` - a shorthand for `chroma function` – the thing that literally colorizes selected commands, like `git`, `grep`, etc. invocations, see `chroma function` below,
- `big loop` - main highlighting code, a loop over tokens and at least 2 large structular constructs (big `if` and `case`);
  it is advanced, e.g. parses `case` statements, here-string, it basically constitutes 90% of the F-Sy-H project,
- `chroma function` - a plugin-function that is called when a specific command occurs (e.g. when user enters `git` at
  command line) suppressing activity of `big loop` (i.e. no standard highlighting unless requested),
- `token` - result of splitting whole command line (i.e. `$BUFFER`, the Zle variable) into bits called tokens, which are
  words in general, separated by spaces on the command line.

#### Overview of functioning

1. Big loop is working – token by token processes command line, changes states (e.g. enters state "inside case statement") and in the end decides on color of the token currently processed.
2. Big loop occurs a command that has a chroma, e.g. `git`.
3. Big loop enters "chroma" state, calls associated chroma function.
4. Chroma takes care of "chroma" state, ensures it will be set also for next token.
5. "chroma" state is active, so all following tokens are routed to the chroma (in general skipping big-loop, see next items),
6. When processing of a single token is complete, the associated chroma returns 0 (shell-truth) to request no further processing by the big loop.
7. It can also return 1 so that single, current token will be passed into big-loop for processing (to do a standard highlighting).

#### Chroma function arguments

- `$1` - 0 or 1, denoting if it's the first call to the chroma, or a following one,
- `$2` - the current token, also accessible by `$\__arg` from the upper scope - basically a private copy of `$__arg`; the token can be eg.: "grep",
- `$3` - a private copy of `$_start_pos`, i.e. the position of the token in the command line buffer, used to add region_highlight entry (see man), because Zsh colorizes by \_ranges\* applied onto command line buffer (e.g. `from-10 to-13 fg=red`),
- `$4` - a private copy of `$_end_pos` from the upper scope; denotes where current token ends (at which index in the string being the command line).

So example invocation could look like this:

```sh
→chroma/-example.ch 1 "grep" "$_start_pos" "$_end_pos"
```

Big-loop will be doing such calls for the user, after occurring a specific chroma-enabled command (like e.g. `awk`), and then until chroma will detect end of this chroma-enabled command (end of whole invocation, with arguments, etc.; in other words, when e.g. new line or `;`-character occurs, etc.).

#### Example of chroma function

```shell title="→chroma/-example.ch" showLineNumbers
# -*- mode: zsh; sh-indentation: 2; indent-tabs-mode: nil; sh-basic-offset: 2; -*-
# vim: ft=zsh sw=2 ts=2 et
#
# Example chroma function. It colorizes first two arguments as `builtin' style,
# third and following arguments as `globbing' style. First two arguments may
# be "strings", they will be passed through to normal higlighter (by returning 1).
#
# $1 - 0 or 1, denoting if it's first call to the chroma, or following one
#
# $2 - the current token, also accessible by $__arg from the above scope -
#      basically a private copy of $__arg; the token can be eg.: "grep"
#
# $3 - a private copy of $_start_pos, i.e. the position of the token in the
#      command line buffer, used to add region_highlight entry (see man),
#      because Zsh colorizes by *ranges* in command line buffer
#
# $4 - a private copy of $_end_pos from the above scope
#
#
# Overall functioning is: when command "example" is occured, this function
# is called with $1 == 1, it ("example") is the first token ($2), then for any
# following token, this function is called with $1 == 0, until end of command
# is occured (i.e. till enter is pressed or ";" is put into source, or the
# command line simply ends).
#
# Other tips are:
# - $CURSOR holds cursor position
# - $BUFFER holds whole command line buffer
# - $LBUFFER holds command line buffer that is left from the cursor, i.e. it's a
#   BUFFER substring 1 .. $CURSOR
# - $RBUFFER is the same as LBUFFER but holds part of BUFFER right to the cursor
#
# The function receives $BUFFER but via sequence of tokens, which are shell words,
# e.g. "a b c" is a shell word, while a b c are 3 shell words.
#
# FAST_HIGHLIGHT is a friendly hash array which allows to store strings without
# creating global parameters (variables). If you need hash, just use it first
# declaring, under some distinct name like: typeset -gA CHROMA_EXPLE_DICT.
# Remember to reset the hash and others at __first_call == 1, so that you have
# a fresh state for new command.

# Keep chroma-takever state meaning: until ;, handle highlighting via chroma.
# So the below 8192 assignment takes care that next token will be routed to chroma.
(( next_word = 2 | 8192 ))

local __first_call="$1" __wrd="$2" __start_pos="$3" __end_pos="$4"
local __style
integer __idx1 __idx2

(( __first_call )) && {
  # Called for the first time - new command. FAST_HIGHLIGHT is used because it survives between calls,
  # and allows to use a single global hash only, instead of multiple global string variables.
  FAST_HIGHLIGHT[chroma-example-counter]=0

  # Set style for region_highlight entry. It is used below in
  # '[[ -n "$__style" ]] ...' line, which adds highlight entry, like "10 12 fg=green", through `reply' array.
  #
  # Could check if command `example' exists and set `unknown-token'
  # style instead of `command'
  __style=${FAST_THEME_NAME}command

} || {
  # Following call, i.e. not the first one

  # Check if chroma should end – test if token is of type "starts new command", if so pass-through – chroma ends
  [[ "$__arg_type" = 3 ]] && return 2

  if (( in_redirection > 0 || this_word & 128 )) || [[ $__wrd == "<<<" ]]; then
    return 1
  fi

  if [[ "$__wrd" = -* ]]; then
    # Detected option, add style for it.
    [[ "$__wrd" = --* ]] && \
    __style=${FAST_THEME_NAME}double-hyphen-option || __style=${FAST_THEME_NAME}single-hyphen-option
  else
    # Count non-option tokens
    (( FAST_HIGHLIGHT[chroma-example-counter] += 1, __idx1 = FAST_HIGHLIGHT[chroma-example-counter] ))

    # Colorize 1..2 as builtin, 3.. as glob
    if (( FAST_HIGHLIGHT[chroma-example-counter] <= 2 )); then
      if [[ "$__wrd" = \"* ]]; then
        # Pass through, fsh main code will do the highlight!
        return 1
      else
        __style=${FAST_THEME_NAME}builtin
      fi
    else
      __style=${FAST_THEME_NAME}globbing
    fi
  fi
}

# Add region_highlight entry (via `reply' array).
# If 1 will be added to __start_pos, this will highlight "oken".
# If 1 will be subtracted from __end_pos, this will highlight "toke".
# $PREBUFFER is for specific situations when users does command \<ENTER>
# i.e. when multi-line command using backslash is entered.
#
# This is a common place of adding such entry, but any above code can do
# it itself (and it does in other chromas) and skip setting __style to this way disable this code.
[[ -n "$__style" ]] && \
(( __start=__start_pos-${#PREBUFFER}, __end=__end_pos-${#PREBUFFER}, __start >= 0 )) && \
reply+=("$__start $__end ${FAST_HIGHLIGHT_STYLES[$__style]}")

# We aren't passing-through, do obligatory things ourselves.
# _start_pos=$_end_pos advainces pointers in command line buffer.
#
# To pass through means to `return 1'.
# The highlighting of this single token is then done by F-Sy-H's
# main code and chroma doesn't have to do anything.
(( this_word = next_word ))
_start_pos=$_end_pos

return 0
```

<!-- end-of-file -->
<!-- links -->

[1]: https://github.com/z-shell/F-Sy-H
[ini-files]: https://github.com/z-shell/F-Sy-H/tree/main/themes
[turbo-mode]: /docs/getting_started/overview#turbo-mode-zsh--53
