---
id: customization
title: '🏗 Preferences & Configuration'
image: zw/logo/320x320.png
description: User Preferences & Configuration
keywords: [customization, preferences, config]
---

import APITable from '@site/src/components/APITable';

## Customizing Paths

Following variables can be set to custom values, before sourcing ZI.

Initial ZI's hash definition:

```shell
declare -A ZI
```

Variables below has to be set before loading ZI:

<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<APITable>

| Hash Field                       | Description                                                                                                                                                                                                                                                                                                                                                                                        |
|----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `ZI[BIN_DIR]`                    | Where ZI code resides, e.g: "~/.zi/bin"                                                                                                                                                                                                                                                                                                                                                            |
| `ZI[HOME_DIR]`                   | Where ZI should create all working directories, e.g: "~/.zi"                                                                                                                                                                                                                                                                                                                                       |
| `ZI[PLUGINS_DIR]`                | Override single working directory – for plugins, e.g: "/opt/zsh/zi/plugins"                                                                                                                                                                                                                                                                                                                        |
| `ZI[COMPLETIONS_DIR]`            | As above, but for completion files, e.g: "/opt/zsh/zi/root_completions"                                                                                                                                                                                                                                                                                                                            |
| `ZI[SNIPPETS_DIR]`               | As above, but for snippets                                                                                                                                                                                                                                                                                                                                                                         |
| `ZI[ZMODULES_DIR]`               | Override single working directory – for Zsh modules e.g: "/opt/zsh/zi/zmodules"                                                                                                                                                                                                                                                                                                                    |
| `ZI[ZCOMPDUMP_PATH]`             | Path to `.zcompdump` file, with the file included (e.g: its name can be different)                                                                                                                                                                                                                                                                                                                 |
| `ZI[COMPINIT_OPTS]`              | Options for `compinit` call (e.g: done by `zicompinit`), use to pass -C to speed up loading                                                                                                                                                                                                                                                                                                        |
| `ZI[MUTE_WARNINGS]`              | If set to `1`, then mutes some of the ZI warnings, specifically the `plugin already registered` warning                                                                                                                                                                                                                                                                                            |
| `ZI[OPTIMIZE_OUT_DISK_ACCESSES]` | If set to `1`, then ZI will skip checking if a Turbo-loaded object exists on the disk. By default, ZI skips Turbo for non-existing objects (plugins or snippets) to install them before the first prompt – without any delays, during the normal processing of `zshrc`. This option can give a performance gain of about 10 ms out of 150 ms (e.g: Zsh will start-up in 140 ms instead of 150 ms). |
| `$ZPFX`                          | set by default to `~/.zi/polaris`, a directory where software with `Makefile`, etc. can be pointed to, by e.g. `atclone'./configure --prefix=$ZPFX'`.                                                                                                                                                                                                                                              |

</APITable>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

## Non-GitHub (Local) Plugins

Use `create` subcommand with user name `_local` (the default) to create the plugin's skeleton in `$ZI[PLUGINS_DIR]`. It
will be not connected with the GitHub repository (because of the user name being `_local`). To enter the plugin's
directory use the `cd` command with just the plugin's name (without `_local`, it's optional).

If the user name will not be `_local`, then ZI will create a repository also on GitHub and set up the correct repository
origin.

## Extending Git

Several projects provide git extensions. Installing them with ZI has many benefits:

- all files are under `$HOME` – no administrator rights needed,
- declarative setup (like Chef or Puppet) – copying `.zshrc` to a different account brings also git-related setup,
- easy update by e.g: `zi update --all`.

Below is a configuration that adds multiple git extensions, loaded in Turbo mode, 1 second after prompt, with use of the
[bin-gem-node][1] annex:

```shell title="~/.zshrc"
zi as"null" wait"1" lucid for \
    sbin    Fakerr/git-recall \
    sbin    cloneopts paulirish/git-open \
    sbin    paulirish/git-recent \
    sbin    davidosomething/git-my \
    sbin atload"export _MENU_THEME=legacy" \
            arzzen/git-quick-stats \
    sbin    iwata/git-now \
    make"PREFIX=$ZPFX install" \
            tj/git-extras \
    sbin"bin/git-dsf;bin/diff-so-fancy" \
            z-shell/zsh-diff-so-fancy \
    sbin"git-url;git-guclone" make"GITURL_NO_CGITURL=1" \
            z-shell/git-url
```

The target directory for installed files is `$ZPFX` - `~/.zi/polaris` by default.

With [meta-plugins][2] consisting of:

Annexes:

1. [z-shell/z-a-readurl][3],
2. [z-shell/z-a-patch-dl][4],
3. [z-shell/z-a-rust][5],
4. [z-shell/z-a-bin-gem-node][6].

Git tools:

1. [paulirish/git-open][7],
2. [paulirish/git-recent][8],
3. [davidosomething/git-my][9],
4. [arzzen/git-quick-stats][10],
5. [iwata/git-now][11],
6. [tj/git-extras][12],
7. [wfxr/forgit][13].

just run:

```shell
zi light-mode for z-shell/z-a-meta-plugins @annexes @ext-git
```

## Zsh options `setopt`

Options are primarily referred to by name. These names are case insensitive and underscores are ignored. For example,
`allexport` is equivalent to `A__lleXP_ort`.

The sense of an option name may be inverted by preceding it with `no`, so `setopt No_Beep` is equivalent to
`unsetopt beep`. This inversion can only be done once, so `nonobeep` is not a synonym for `beep`. Similarly, `tify` is
not a synonym for `nonotify` (the inversion of `notify`).

Some options also have one or more single letter names. There are two sets of single letter options: one used by
default, and another used to emulate sh/ksh (used when the SH_OPTION_LETTERS option is set). The single letter options
can be used on the shell command line, or with the set, setopt and unsetopt builtins, as normal Unix options preceded by
`-`.

The sense of the single letter options may be inverted by using `+` instead of `-`. Some of the single letter option
names refer to an option being off, in which case the inversion of that name refers to the option being on. For example,
`+n` is the short name of `exec`, and `-n` is the short name of its inversion, `noexec`.

In strings of single letter options supplied to the shell at startup, trailing whitespace will be ignored; for example
the string `-f` will be treated just as `-f`, but the string `-f i` is an error.

This is because many systems which implement the `#!` mechanism for calling scripts do not strip trailing whitespace.

### History optimization

<APITable>

| Option                            | Description                                                                |
| --------------------------------- | -------------------------------------------------------------------------- |
| `setopt` `hist_ignore_all_dups`   | Remove older duplicate entries from history.                               |
| `setopt` `hist_expire_dups_first` | Expire A Duplicate Event First When Trimming History.                      |
| `setopt` `hist_ignore_dups`       | Do Not Record An Event That Was Just Recorded Again.                       |
| `setopt` `hist_reduce_blanks`     | Remove superfluous blanks from history items.                              |
| `setopt` `hist_find_no_dups`      | Do Not Display A Previously Found Event.                                   |
| `setopt` `hist_ignore_space`      | Do Not Record An Event Starting With A Space.                              |
| `setopt` `hist_save_no_dups`      | Do Not Write A Duplicate Event To The History File.                        |
| `setopt` `hist_verify`            | Do Not Execute Immediately Upon History Expansion.                         |
| `setopt` `append_history`         | Allow multiple terminal sessions to all append to one zsh command history. |
| `setopt` `extended_history`       | Show Timestamp In History.                                                 |
| `setopt` `inc_append_history`     | Write To The History File Immediately, Not When The Shell Exits.           |
| `setopt` `share_history`          | Share history between different instances of the shell                     |

</APITable>

<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

### Other tweaks

<APITable>

| Option                          | Description                                                                                  |
|---------------------------------|----------------------------------------------------------------------------------------------|
| `setopt` `bang_hist`            | Treat The '!' Character Specially During Expansion.                                          |
| `setopt` `multios`              | Perform implicit tees or cats when multiple redirections are attempted.                      |
| `setopt` `interactive_comments` | Allow comments even in interactive shells (especially for Muness).                           |
| `setopt` `pushd_ignore_dups`    | Don't push multiple copies of the same directory onto the directory stack.                   |
| `setopt` `auto_cd`              | Use cd by typing directory name if it's not a command.                                       |
| `setopt` `no_beep`              | Don't beep on error.                                                                         |
| `setopt` `auto_list`            | Automatically list choices on ambiguous completion.                                          |
| `setopt` `auto_pushd`           | Make cd push the old directory onto the directory stack.                                     |
| `setopt` `pushdminus`           | Swapped the meaning of cd +1 and cd -1; we want them to mean the opposite of what they mean. |
| `setopt` `promptsubst`          | Enables the substitution of parameters inside the prompt each time the prompt is drawn.      |

</APITable>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

## Style control for the completion system `zstyle`

What does `zstyle` do? - [unix.stackexchange.com/what-does-zstyle-do][14]

The `zstyle` handles the obvious style control for the completion system, but it seems to cover more than just that.

E.g., the vcs_info module relies on it for display of git status in your prompt.

You can start by looking at the few explanatory paragraphs in `man zshmodules` in the `zstyle` section.

### Fuzzy matching of completions

```shell title="~/.zshrc"
zstyle ':completion:*' completer _complete _match _approximate
zstyle ':completion:*:match:*' original only
zstyle -e ':completion:*:approximate:*' max-errors 'reply=($((($#PREFIX+$#SUFFIX)/3>7?7:($#PREFIX+$#SUFFIX)/3))numeric)'
```

### Pretty completions

```shell title="~/.zshrc"
zstyle ':completion:*:matches' group 'yes'
zstyle ':completion:*:options' description 'yes'
zstyle ':completion:*:options' auto-description '%d'
zstyle ':completion:*:corrections' format ' %F{green}-- %d (errors: %e) --%f'
zstyle ':completion:*:descriptions' format ' %F{yellow}-- %d --%f'
zstyle ':completion:*:messages' format ' %F{purple} -- %d --%f'
zstyle ':completion:*:warnings' format ' %F{red}-- no matches found --%f'
zstyle ':completion:*:default' list-prompt '%S%M matches%s'
zstyle ':completion:*' format ' %F{yellow}-- %d --%f'
zstyle ':completion:*' group-name ''
zstyle ':completion:*' verbose yes
zstyle ':completion:*' matcher-list 'm:{a-zA-Z}={A-Za-z}' 'r:|[._-]=* r:|=*' 'l:|=* r:|=*'
zstyle ':completion:*:functions' ignored-patterns '(_*|pre(cmd|exec))'
zstyle ':completion:*' use-cache true
zstyle ':completion:*' rehash true
```

### Do menu-driven completion

```shell
zstyle ':completion:*' menu select
```

### Color completion for [some things][15]

```shell
zstyle ':completion:*' list-colors ${(s.:.)LS_COLORS}
```

## Disabling System-Wide `compinit` Call (Ubuntu)

On Ubuntu users might get surprised that e.g. their completions work while they didn't call `compinit` in their
`.zshrc`.

That's because the function is being called in `/etc/zshrc`.

To disable this call – what is needed to avoid the slowdown and if the user loads any completion-equipped plugins, i.e.
almost on 100% – add the following line to `~/.zshenv` to skip the not helping Ubuntu global compinit:

```shell title="~/.zshenv"
skip_global_compinit=1
```

## Multiple prompts

<APITable>

| Syntax      | Description                                                   |
| ----------- | :------------------------------------------------------------ |
| `load'…'`   | condition that when fulfilled will cause plugin to be loaded. |
| `unload'…'` | as above, but will unload plugin.                             |

</APITable>

:::note

`zi light …` loads the plugin without tracking it, while `zi load` tracks the plugin. To be able unload the plugin, it
has to be loaded with `zi load …` instead of `zi light …`.

:::

<APITable>

| Syntax       | Description                                                                                           |
| ------------ | :---------------------------------------------------------------------------------------------------- |
| `atload'!…'` | run the `precmd` hooks to make the prompts fully initialized when loaded in the middle of the prompt. |
| `precmd`     | hooks are being normally run before each **new** prompt.                                              |

</APITable>

:::info

Exclamation mark causes the effects of the functions to be tracked.

:::

To allow better unloading, conditions are checked every second, you can use conditions like:

<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<APITable>

| Condition                 | Description                                                                                                                                          |
|---------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------|
| `![[ $PWD == *github* ]]` | Change prompt after changing directory to `*github*`.                                                                                                |
| `![[ $MYPROMPT = 1 ]]`    | Change prompt when variable `MYPROMPT = 1` is true.                                                                                                  |
| `![[ … ]]`                | The exclamation mark causes prompt to be reset after loading or unloading the plugin `pick'/dev/null'` – disable sourcing of the default-found file. |
| `multisrc'…'`             | Source multiple files.                                                                                                                               |
| `lucid`                   | Don't show the under-prompt message that says e.g: `Loaded geometry-zsh/geometry`.                                                                   |
| `nocd`                    | Don't cd into the plugin's directory when executing the `atload'…'`.                                                                                 |
| `atload'…'`               | This ice can make the path that's displayed by the theme to point to that directory.                                                                 |

</APITable>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

### Loading and unloading themes (8 examples)

1 - zprompts

```shell
zi lucid \
  load'![[ $MYPROMPT = 1 ]]' \
  unload'![[ $MYPROMPT != 1 ]]' \
  atload'!promptinit; typeset -g PSSHORT=0; prompt sprint3 yellow red green blue' nocd for \
    z-shell/zprompts
```

2 – lambda-mod-zsh-theme

```shell
zi lucid load'![[ $MYPROMPT = 2 ]]' unload'![[ $MYPROMPT != 2 ]]' nocd for \
    halfo/lambda-mod-zsh-theme
```

3 – lambda-gitster

```shell
zi lucid load'![[ $MYPROMPT = 3 ]]' unload'![[ $MYPROMPT != 3 ]]' nocd for \
    ergenekonyigit/lambda-gitster
```

4 – geometry

```shell
zi lucid load'![[ $MYPROMPT = 4 ]]' unload'![[ $MYPROMPT != 4 ]]' \
  atload'!geometry::prompt' nocd \
  atinit'GEOMETRY_COLOR_DIR=63 GEOMETRY_PATH_COLOR=63' for \
    geometry-zsh/geometry
```

5 – pure

```shell
zi lucid load'![[ $MYPROMPT = 5 ]]' unload'![[ $MYPROMPT != 5 ]]' \
  pick"/dev/null" multisrc"{async,pure}.zsh" atload'!prompt_pure_precmd' nocd for \
    sindresorhus/pure
```

6 - agkozak-zsh-theme

```shell
zi lucid load'![[ $MYPROMPT = 6 ]]' unload'![[ $MYPROMPT != 6 ]]' \
  atload'!_agkozak_precmd' nocd atinit'AGKOZAK_FORCE_ASYNC_METHOD=subst-async' for \
    agkozak/agkozak-zsh-theme
```

7 - zinc

```shell
zi load'![[ $MYPROMPT = 7 ]]' unload'![[ $MYPROMPT != 7 ]]' \
  compile"{zinc_functions/*,segments/*,zinc.zsh}" nocompletions \
  atload'!prompt_zinc_setup; prompt_zinc_precmd' nocd for \
    robobenklein/zinc
```

8 - git-prompt

```shell
zi lucid load'![[ $MYPROMPT = 8 ]]' unload'![[ $MYPROMPT != 8 ]]' \
  atload'!_zsh_git_prompt_precmd_hook' nocd for \
    woefe/git-prompt.zsh
```

[1]: https://github.com/z-shell/z-a-bin-gem-node
[2]: https://github.com/z-shell/zi/wiki/z-a-meta-plugins
[3]: https://github.com/z-shell/z-a-readurl
[4]: https://github.com/z-shell/z-a-patch-dl
[5]: https://github.com/z-shell/z-a-rust
[6]: https://github.com/z-shell/z-a-bin-gem-node
[7]: https://github.com/paulirish/git-open
[8]: https://github.com/paulirish/git-recent
[9]: https://github.com/davidosomething/git-my
[10]: https://github.com/arzzen/git-quick-stats
[11]: https://github.com/iwata/git-now
[12]: https://github.com/tj/git-extras
[13]: https://github.com/wfxr/forgit
[14]: https://unix.stackexchange.com/questions/214657/what-does-zstyle-do/239980
[15]: https://linuxshellaccount.blogspot.com/2008/12/color-completion-using-zsh-modules-on.html
