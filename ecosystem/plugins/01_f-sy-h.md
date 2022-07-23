---
id: f-sy-h
title: ⚙️ Feature-rich syntax highlighting
sidebar_position: 1
image: img/logo/320x320.png
description: Feature-rich Syntax Highlighting for Zsh
toc_max_heading_level: 3
keywords:
  - feature-ruch
  - fast-syntax-highlighting
  - syntax-highlighting
  - zsh-plugin
---

<!-- @format -->

import Image from '@theme/IdealImage';

## <i class="fa-brands fa-github"></i> [z-shell/f-sy-h][1]

## Syntax highlighting features

### Themes

Switch themes via `fast-theme {theme-name}`.

<div>
  <Image img={require('@site/static/img/png/f-s-y_theme.png')} />
</div>

Run `fast-theme -t {theme-name}` option to obtain the snippet above.

Run `fast-theme -l` to list available themes.

#### Theme guide for F-Sy-H

`fast-theme` tool is used to select a theme. There are 6 shipped themes, they can be listed with `fast-theme -l`. Themes are basic [INI files](https://github.com/z-shell/fast-syntax-highlighting/tree/main/themes) where each key is a _style_.

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

```C++ showLineNumbers
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

![sshot](https://raw.githubusercontent.com/z-shell/F-Sy-H/main/docs/images/cmdsubst.png#floatleft)

In the above screen-shot the interior of `$( ... )` uses different colors than the rest of the code. Example for `eval`:

![image](https://raw.githubusercontent.com/z-shell/F-Sy-H/main/docs/images/eval_cmp.png#floatleft)

First line doesn't use recursive highlighting, highlights `eval` argument as regular string. Second line switches theme to `zdharma` and does full recursive highlighting of eval argument.

### Variables

Comparing to the project `zsh-users/zsh-syntax-highlighting` (the upper line):

<img loading="lazy"
    src="https://raw.githubusercontent.com/z-shell/F-Sy-H/main/docs/images/parameter.png#floatleft"
    alt="image could not be loaded"
  />

<img loading="lazy"
    src="https://raw.githubusercontent.com/z-shell/F-Sy-H/main/docs/images/in_string.png#floatleft"
    alt="image could not be loaded"
  />

### Brackets

<img loading="lazy"
    src="https://raw.githubusercontent.com/z-shell/F-Sy-H/main/docs/images/brackets.gif#floatleft"
    alt="image could not be loaded"
  />

### Conditions

Comparing to the project `zsh-users/zsh-syntax-highlighting` (the upper line):

<img loading="lazy"
    src="https://raw.githubusercontent.com/z-shell/F-Sy-H/main/docs/images/cplx_cond.png#floatleft"
    alt="image could not be loaded"
  />

### Strings

Exact highlighting that recognizes quotings.

<img loading="lazy"
    src="https://raw.githubusercontent.com/z-shell/F-Sy-H/main/docs/images/ideal-string.png#floatleft"
    alt="image could not be loaded"
  />

#### here-strings

<img loading="lazy"
    src="https://raw.githubusercontent.com/z-shell/F-Sy-H/main/docs/images/herestring.png#floatleft"
    alt="image could not be loaded"
  />

### `exec` descriptor-variables

Comparing to the project `zsh-users/zsh-syntax-highlighting` (the upper line):

<img loading="lazy"
    src="https://raw.githubusercontent.com/z-shell/F-Sy-H/main/docs/images/execfd_cmp.png#floatleft"
    alt="image could not be loaded"
  />

### The for-loops and alternate syntax (brace `{`/`}` blocks)

<img loading="lazy"
    src="https://raw.githubusercontent.com/z-shell/F-Sy-H/main/docs/images/for-loop-cmp.png#floatleft"
    alt="image could not be loaded"
  />

### Function definitions

Comparing to the project `zsh-users/zsh-syntax-highlighting` (the upper 2 lines):

<img loading="lazy"
    src="https://raw.githubusercontent.com/z-shell/F-Sy-H/main/docs/images/function.png#floatleft"
    alt="image could not be loaded"
  />

### Recursive `eval` and `$( )` highlighting

Comparing to the project `zsh-users/zsh-syntax-highlighting` (the upper line):

<img loading="lazy"
    src="https://raw.githubusercontent.com/z-shell/F-Sy-H/main/docs/images/eval_cmp.png#floatleft"
    alt="image could not be loaded"
  />

### Chroma functions

Highlighting that is specific for a given command.

<img loading="lazy"
    src="https://raw.githubusercontent.com/z-shell/F-Sy-H/main/docs/images/git_chroma.png#floatleft"
    alt="image could not be loaded"
  />

The [chromas](https://github.com/z-shell/F-Sy-H/tree/main/→chroma) that are enabled by default can be found [here](https://github.com/z-shell/F-Sy-H/blob/main/fast-highlight#L166).

<img
    src="https://raw.githubusercontent.com/z-shell/F-Sy-H/main/docs/images/math.gif#floatleft"
    alt="image could not be loaded"
  />

### Zcalc highlighting

<img loading="lazy"
    src="https://raw.githubusercontent.com/z-shell/F-Sy-H/main/docs/images/zcalc.png#floatleft"
    alt="image could not be loaded"
  />

### Performance

Performance differences can be observed in this Asciinema recording, where a `10 kB` function is being edited.

  <a href="https://asciinema.org/a/112367">
    <Image img={require('@site/static/img/png/112367.png')} />
  </a>

### Custom Working Directory

Set `$FAST_WORK_DIR` before loading the plugin to have e.g. processed theme files (ready to load, in Zsh format, not INI) kept under specified location. This is handy if e.g. you install Fast-Syntax-Highlighting system-wide (e.g. from AUR on ArchLinux) and want to have per-user theme setup.

You can use "~" in the path, e.g. `FAST_WORK_DIR=~/.fsh` and also the `XDG:`, `LOCAL:`, `OPT:`, etc. short-hands, so e.g. `FAST_WORK_DIR=XDG` or `FAST_WORK_DIR=XDG:` is allowed (in this case it will be changed to `$HOME/.config/fsh` by default by F-Sy-H loader).

### Chroma guide for F-Sy-H

#### Motivation

Someone might want to create a detailed highlighting for a **specific program** and this document helps achieving this. It explains how chroma functions – the code behind such detailed highlighting – are constructed and used.

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

#### example of chroma function

```shell showLineNumbers
# -_- mode: sh; sh-indentation: 4; indent-tabs-mode: nil; sh-basic-offset: 4; -_-
# Copyright (c) 2018 Sebastian Gniazdowski
#
# Example chroma function. It colorizes first two arguments as `builtin' style,
# third and following arguments as `globbing' style. First two arguments may
# be "strings", they will be passed through to normal higlighter (by returning 1).
#
# $1 - 0 or 1, denoting if it's first call to the chroma, or following one
#
# $2 - like above document says
#
# $3 - ...
#
# $4 - ...
#
# Other tips are:
# - $CURSOR holds cursor position
# - $BUFFER holds whole command line buffer
# - $LBUFFER holds command line buffer that is left from the cursor, i.e. it's a
# BUFFER substring 1 .. $CURSOR
# - $RBUFFER is the same as LBUFFER but holds part of BUFFER right to the cursor
#
# The function receives $BUFFER but via sequence of tokens, which are shell words,
# e.g. "a b c" is a shell word, while a b c are 3 shell words.
#
# FAST_HIGHLIGHT is a friendly hash array which allows to store strings without
# creating global parameters (variables). If you need hash, go ahead and use it,
# declaring first, under some distinct name like: typeset -gA CHROMA_EXPLE_DICT.
# Remember to reset the hash and others at __first_call == 1, so that you have
# a fresh state for new command.

# Keep chroma-takever state meaning: until ;, handle highlighting via chroma.
# So the below 8192 assignment takes care that next token will be routed to chroma.
(( next_word = 2 | 8192 ))

local __first_call="$1"__wrd="$2" __start_pos="$3"__end_pos="$4"
local __style
integer__idx1 __idx2

(( __first_call )) && {
    # Called for the first time - new command.
    # FAST_HIGHLIGHT is used because it survives between calls, and
    # allows to use a single global hash only, instead of multiple
    # global string variables.
    FAST_HIGHLIGHT[chroma-example-counter]=0

    # Set style for region_highlight entry. It is used below in
    # '[[ -n "$__style" ]] ...' line, which adds highlight entry,
    # like "10 12 fg=green", through `reply' array.
    #
    # Could check if command `example' exists and set `unknown-token'
    # style instead of `command'
    __style=${FAST_THEME_NAME}command

} || {
    # Following call, i.e. not the first one

    # Check if chroma should end – test if token is of type
    # "starts new command", if so pass-through – chroma ends
    [[ "$__arg_type" = 3 ]] && return 2

    if [[ "$__wrd" = -* ]]; then
        # Detected option, add style for it.
        [[ "$__wrd" = --* ]] && __style=${FAST_THEME_NAME}double-hyphen-option || \
                                __style=${FAST_THEME_NAME}single-hyphen-option
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
# If 1 will be subtracted from__end_pos, this will highlight "toke".
# $PREBUFFER is for specific situations when users does command \<ENTER>
# i.e. when multi-line command using backslash is entered.
#
# This is a common place of adding such entry, but any above code can do
# it itself (and it does in other chromas) and skip setting __style to
# this way disable this code.
[[ -n "$__style" ]] && ((__start=__start_pos-${#PREBUFFER},__end=__end_pos-${#PREBUFFER},__start >= 0 )) && reply+=("$__start $__end ${FAST_HIGHLIGHT_STYLES[$__style]}")

# We aren't passing-through, do obligatory things ourselves.
# _start_pos=$_end_pos advainces pointers in command line buffer.
(( this_word = next_word ))
_start_pos=$_end_pos

return 0
```

### Install F-Sy-H

#### Standalone

Clone the Repository.

```shell
git clone https://github.com/z-shell/F-Sy-H ~/path/to/fsh
```

And add the following to your `zshrc` file.

```shell
source ~/path/to/fsh/F-Sy-H.plugin.zsh
```

#### ZI

Add the following to your `zshrc` file.

```shell
zi light z-shell/F-Sy-H
```

Here's an example of how to load the plugin together with a few other popular ones with the use of [Turbo](/docs/getting_started/overview#turbo-mode-zsh--53), i.e.: speeding up the Zsh startup by loading the plugin right after the first prompt, in background:

```shell showLineNumbers
zi wait lucid for \
 atinit"ZI[COMPINIT_OPTS]=-C; zicompinit; zicdreplay" \
    z-shell/F-Sy-H \
 blockf \
    zsh-users/zsh-completions \
 atload"!_zsh_autosuggest_start" \
    zsh-users/zsh-autosuggestions
```

#### Zinit

Add the following to your `zshrc` file.

```shell
zinit light z-shell/F-Sy-H
```

#### Antigen

Add the following to your `zshrc` file.

```shell
antigen bundle z-shell/F-Sy-H
```

#### Zgen

Add the following to your `.zshrc` file in the same place you're doing your other `zgen load` calls in.

```shell
zgen load z-shell/F-Sy-H
```

#### Oh-My-Zsh

Clone the Repository:

```shell
git clone https://github.com/z-shell/F-Sy-H.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/F-Sy-H
```

And add `F-Sy-H` to your plugin list.

[1]: https://github.com/z-shell/F-Sy-H
