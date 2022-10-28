---
id: customization
title: "🏗 Configuration management"
sidebar_position: 2
image: /img/png/theme/z/320x320.png
description: User preferences, environment, and configuration.
keywords:
  - config
  - preferences
  - customization
---

<!-- @format -->

import APITable from '@site/src/components/APITable';
import MultiplePromptsExample from '@site/src/components/Markdown/\_multiple_prompts_example.mdx';

## <i class="fa-solid fa-hashtag"></i> Hash parameter

:::info Related

- [standard parameter naming][]

:::

Set the initial hash definition and custom values, before enabling Zi.

Example:

```shell showLineNumbers
typeset -A ZI
ZI[BIN_DIR]="some/custom/path/to/bin"
source "${ZI[BIN_DIR]}/zi.zsh"
```

### <i class="fa-solid fa-sliders"></i> Customize paths {#customizing-paths}

```mdx-code-block
<APITable>
```

| Hash Field                           | Default                                      | Description                                                                                                                                |
| ------------------------------------ | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `ZI[HOME_DIR]`                       | `$HOME/.zi`                                  | Where Zi should create all working directories                                                                                             |
| `ZI[BIN_DIR]`                        | `$HOME/.zi/bin`                              | Directory where Zi code resides                                                                                                            |
| `ZI[COMPLETIONS_DIR]`                | `$ZI[HOME_DIR]/completions`                  | Completion working directory                                                                                                               |
| `ZI[CACHE_DIR]`                     | `$HOME/.cache/zi`                             | Cache directory |                                       
| `ZI[CONFIG_DIR]`                    | `$HOME/.config/zi`                            | Directory for configuration files |
| `ZI[MAN_DIR]`                        | `$ZPFX/man`                                  | Directory to store manpages |
| `ZI[LOG_DIR]`                        | `$ZI[CACHE_DIR]/log`                         | Directory to store log files |
| `ZI[PLUGINS_DIR]`                    | `$ZI[HOME_DIR]/plugins`                      | Plugins working directory                                                                                                                  |
| `ZI[SNIPPETS_DIR]`                   | `$ZI[HOME_DIR]/snippets`                     | Snippets working directory                                                                                                                 |
| `ZI[ZCOMPDUMP_PATH]`                 | `${ZI[CACHE_DIR]}/.zcompdump` | Path to `.zcompdump` file                                                                                                 |
| `ZI[ZMODULES_DIR]`                   | `$ZI[HOME_DIR]/zmodules`                     | Zsh modules working directory                                                                                                              |
| [ZPFX][global-parameter-with-prefix] | `$ZI[HOME_DIR]/polaris`                      | Directory to store binary and related files                                                                                                |

```mdx-code-block
</APITable>
```

### <i class="fa-solid fa-sliders"></i> Modify settings {#modify-settings}

```mdx-code-block
<APITable>
```

| Hash Field                       | Default     | Description                                                                                                                                                                                               |
| -------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ZI[OPTIMIZE_OUT_DISK_ACCESSES]` | `undefined` | If set to `1`, will skip checking if a turbo-loaded object exists on the disk. This option can give a performance gain of about 10 ms out of 150 ms (e.g: Zsh will start up in 140 ms instead of 150 ms). |
| `ZI[COMPINIT_OPTS]`              | `undefined` | Options for `compinit` call (e.g: done by `zicompinit`), commonly used with `-C` to speed up loading                                                                                                      |
| `ZI[MUTE_WARNINGS]`              | `undefined` | If set to `1`, mutes some warnings, specifically the `plugin already registered` warning                                                                                                                  |
| `ZI[PKG_OWNER]`                  | `z-shell`   | Owner of the [packages][] (`zi pack …`)                                                                                                                                                                   |

```mdx-code-block
</APITable>
```

## <i class="fa-solid fa-square-up-right"></i> Non-GitHub (Local) Plugins {#non-github-local-plugins}

Use the `create` subcommand with user name `_local` (the default) to create the plugin's skeleton in `$ZI[PLUGINS_DIR]`. It will be not connected with the GitHub repository (because of the user name being `_local`). To enter the plugin's directory use the `cd` command with just the plugin's name (without `_local`, it's optional).

If the username is not `_local`, then Zi will create a repository also on GitHub and set up the correct repository origin.

## <i class="fa-brands fa-git-alt"></i> Extending Git {#extending-git}

Several projects provide git extensions. Installing them with Zi has many benefits:

- all files are under `$HOME` – no administrator rights are needed,
- declarative setup (like Chef or Puppet) – copying `.zshrc` to a different account brings also git-related setup,
- easy update by e.g: `zi update --all`.

Below is a configuration that adds multiple git extensions, loaded in Turbo mode, 1 second after prompt, with the use of the [bin-gem-node][z-shell/z-a-bin-gem-node] annex:

```shell title="~/.zshrc" showLineNumbers
zi as'null' wait'1' lucid for \
  sbin  Fakerr/git-recall \
  sbin  cloneopts paulirish/git-open \
  sbin  paulirish/git-recent \
  sbin  davidosomething/git-my \
  sbin  iwata/git-now \
  sbin atload'export _MENU_THEME=legacy' \
    arzzen/git-quick-stats \
  sbin'bin/git-dsf;bin/diff-so-fancy' \
    z-shell/zsh-diff-so-fancy \
  make'PREFIX=$ZPFX install' \
    tj/git-extras
```

The target directory for installed files is `$ZPFX` - `~/.zi/polaris` by default.

With [meta-plugins][z-shell/z-a-meta-plugins] consisting of:

Annexes:

1. [z-shell/z-a-readurl][],
2. [z-shell/z-a-patch-dl][],
3. [z-shell/z-a-rust][],
4. [z-shell/z-a-bin-gem-node][].

Git tools:

1. [paulirish/git-open][],
2. [paulirish/git-recent][],
3. [davidosomething/git-my][],
4. [arzzen/git-quick-stats][],
5. [iwata/git-now][],
6. [tj/git-extras][],
7. [wfxr/forgit][].

just run:

```shell
zi light-mode for z-shell/z-a-meta-plugins @annexes @ext-git
```

## <i class="fa-solid fa-gears"></i> [Zsh option][zsh-options]: `setopt` {#zsh-option-setopt}

[Options][zsh-options] are primarily referred to by name. These names are case insensitive and underscores are ignored. For example, `allexport` is equivalent to `A__lleXP_ort`.

The sense of an option name may be inverted by preceding it with `no`, so `setopt No_Beep` is equivalent to `unsetopt beep`. This inversion can only be done once, so `nonobeep` is not a synonym for `beep`. Similarly, `tify` is not a synonym for `nonotify` (the inversion of `notify`).

### <i class="fa-solid fa-clock-rotate-left"></i> History optimization {#history-optimization}

<!-- TODO: Include more setopt examples and import as component -->

```shell title="~/.zshrc" showLineNumbers
setopt append_history         # Allow multiple sessions to append to one Zsh command history.
setopt extended_history       # Show timestamp in history.
setopt hist_expire_dups_first # Expire A duplicate event first when trimming history.
setopt hist_find_no_dups      # Do not display a previously found event.
setopt hist_ignore_all_dups   # Remove older duplicate entries from history.
setopt hist_ignore_dups       # Do not record an event that was just recorded again.
setopt hist_ignore_space      # Do not record an Event Starting With A Space.
setopt hist_reduce_blanks     # Remove superfluous blanks from history items.
setopt hist_save_no_dups      # Do not write a duplicate event to the history file.
setopt hist_verify            # Do not execute immediately upon history expansion.
setopt inc_append_history     # Write to the history file immediately, not when the shell exits.
setopt share_history          # Share history between different instances of the shell.
```

### Other tweaks {#other-tweaks}

```shell title="~/.zshrc" showLineNumbers
setopt auto_cd              # Use cd by typing directory name if it's not a command.
setopt auto_list            # Automatically list choices on ambiguous completion.
setopt auto_pushd           # Make cd push the old directory onto the directory stack.
setopt bang_hist            # Treat the '!' character, especially during Expansion.
setopt interactive_comments # Comments even in interactive shells.
setopt multios              # Implicit tees or cats when multiple redirections are attempted.
setopt no_beep              # Don't beep on error.
setopt prompt_subst         # Substitution of parameters inside the prompt each time the prompt is drawn.
setopt pushd_ignore_dups    # Don't push multiple copies directory onto the directory stack.
setopt pushd_minus          # Swap the meaning of cd +1 and cd -1 to the opposite.
```

## <i class="fa-solid fa-wand-magic-sparkles"></i> Style the [completion system][completion-system-configuration] with: `zstyle` {#style-the-completion-system-with-zstyle}

What does `zstyle` do? - [unix.stackexchange.com/what-does-zstyle-do][what-does-zstyle-do]

The `zstyle` handles the obvious style control for the [completion system][completion-system-configuration], but it seems to cover more than just that. e.g., the vcs_info module relies on it for the display of git status in your prompt. You can start by looking at the few explanatory paragraphs in `man zshmodules` in the `zstyle` section.

### <i class="fa-solid fa-wand-sparkles"></i> Fuzzy matching of completions {#fuzzy-matching-of-completions}

<!-- TODO: Include more zstyle examples and import as component -->

```shell title="~/.zshrc" showLineNumbers
zstyle ':completion:*' completer _complete _match _approximate
zstyle ':completion:*:match:*' original only
zstyle -e ':completion:*:approximate:*' max-errors 'reply=($((($#PREFIX+$#SUFFIX)/3>7?7:($#PREFIX+$#SUFFIX)/3))numeric)'
```

### <i class="fa-solid fa-terminal"></i> Pretty completions {#pretty-completions}

```shell title="~/.zshrc" showLineNumbers
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

### <i class="fa-solid fa-terminal"></i> Do menu-driven completion {#do-menu-driven-completion}

```shell
zstyle ':completion:*' menu select
```

### <i class="fa-solid fa-fill-drip"></i> Color completion for [some things][color-completion-using-zsh-modules-on] {#color-completion-for-some-things}

```shell
zstyle ':completion:*' list-colors ${(s.:.)LS_COLORS}
```

## <i class="fa-solid fa-power-off"></i> Disabling System-Wide `compinit` Call (Ubuntu) {#disabling-system-wide-compinit-call-ubuntu}

On Ubuntu users might get surprised that e.g. their completions work while they didn't call `compinit` in their `.zshrc`. That's because the function is being called in `/etc/zshrc`.

To disable this call – what is needed to avoid the slowdown and if the user loads any completion-equipped plugins, i.e. almost on 100% – add the following line to `~/.zshenv` to skip the not helping Ubuntu global compinit:

```shell title="~/.zshenv"
skip_global_compinit=1
```

## <i class="fa-solid fa-list-check"></i> Multiple prompts {#multiple-prompts}

```mdx-code-block
<APITable>
```

| Syntax      | Description                                                       |
| ----------- | :---------------------------------------------------------------- |
| `load'…'`   | Condition that when fulfilled will cause the plugin to be loaded. |
| `unload'…'` | Same as above, but will unload the plugin.                        |

```mdx-code-block
</APITable>
```

:::note

`zi light …` loads the plugin without tracking it, while `zi load` tracks the plugin. To be able to unload the plugin, it has to be loaded with `zi load …` instead of `zi light …`.

:::

| Syntax       | Description                                                                                           |
| ------------ | :---------------------------------------------------------------------------------------------------- |
| `atload'!…'` | Run the `precmd` hooks to make the prompts fully initialized when loaded in the middle of the prompt. |
| `precmd`     | Hooks are normally run before each **new** prompt.                                                    |

:::info

Exclamation mark causes the effects of the functions to be tracked.

:::

To allow better unloading, conditions are checked every second, you can use conditions like:

```mdx-code-block
<APITable>
```

| Condition                 | Description                                                                                                                                              |
| ------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `![[ $PWD == *github* ]]` | Change prompt after changing directory to `*github*`.                                                                                                    |
| `![[ $MYPROMPT = 1 ]]`    | Change prompt when variable `MYPROMPT = 1` is true.                                                                                                      |
| `![[ … ]]`                | The exclamation mark causes the prompt to be reset after loading or unloading the plugin `pick'/dev/null'` – disable sourcing of the default-found file. |
| `multisrc'…'`             | Source multiple files.                                                                                                                                   |
| `lucid`                   | Don't show the under-prompt message that says e.g: `Loaded geometry-zsh/geometry`.                                                                       |
| `nocd`                    | Don't cd into the plugin's directory when executing the `atload'…'`.                                                                                     |
| `atload'…'`               | This ice can make the path that's displayed by the theme point to that directory.                                                                        |

```mdx-code-block
</APITable>
```

### <i class="fa-solid fa-layer-group"></i> Loading and unloading themes (8 examples) {#loading-and-unloading-themes-8-examples}

<MultiplePromptsExample/>

<!-- end-of-file -->
<!-- links -->

[global-parameter-with-prefix]: /community/zsh_plugin_standard#global-parameter-with-prefix
[packages]: /ecosystem/packages/synopsis
[standard parameter naming]: /community/zsh_plugin_standard#standard-parameter-naming

<!-- external -->

[arzzen/git-quick-stats]: https://github.com/arzzen/git-quick-stats
[color-completion-using-zsh-modules-on]: https://linuxshellaccount.blogspot.com/2008/12/color-completion-using-zsh-modules-on.html
[completion-system-configuration]: https://zsh.sourceforge.io/Doc/Release/Completion-System.html#Completion-System-Configuration
[davidosomething/git-my]: https://github.com/davidosomething/git-my
[iwata/git-now]: https://github.com/iwata/git-now
[paulirish/git-open]: https://github.com/paulirish/git-open
[paulirish/git-recent]: https://github.com/paulirish/git-recent
[tj/git-extras]: https://github.com/tj/git-extras
[wfxr/forgit]: https://github.com/wfxr/forgit
[what-does-zstyle-do]: https://unix.stackexchange.com/questions/214657/what-does-zstyle-do/239980
[z-shell/z-a-bin-gem-node]: https://github.com/z-shell/z-a-bin-gem-node
[z-shell/z-a-meta-plugins]: https://github.com/z-shell/z-a-meta-plugins
[z-shell/z-a-patch-dl]: https://github.com/z-shell/z-a-patch-dl
[z-shell/z-a-readurl]: https://github.com/z-shell/z-a-readurl
[z-shell/z-a-rust]: https://github.com/z-shell/z-a-rust
[zsh-options]: https://zsh.sourceforge.io/Doc/Release/Options.html
