---
id: zsh-cmd-architect
title: ⚙️ Zsh Command Architect
image: /img/logo/320x320.png
description: Allows to copy segments of commands in history, rearrange segments of the current command, and delete segments of the current command.
keywords:
  - zsh-command-architect
  - zsh-plugin
  - zplugin
---

<!-- @format -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## <i class="fa-brands fa-github"></i> [z-shell/zsh-cmd-architect][]

The Zsh Command Architect allows to copy segments of commands in history, rearrange segments of the current command, and delete segments of the current command. This way user glues commands from parts without using a mouse. Advanced history search (multi-word, without duplicate lines) allows to quickly find the parts.

## Command architect keybindings

| Key(s)                                                               | Description                                                                                               |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| <kbd>Ctrl-T</kbd>                                                    | Start Zsh Command Architect (Z shell binding)                                                             |
| <kbd>Enter</kbd>                                                     | Delete selected segment (when in the command window) or add selected segment (when in the history window) |
| <kbd>[</kbd> or <kbd>]</kbd>                                         | Move active segment (when in the command window)                                                          |
| <kbd>Shift-left</kbd> or <kbd>Shift-right</kbd>                      | Move active segment (when in command window)                                                              |
| <kbd>Tab</kbd>                                                       | Switch between the two available windows                                                                  |
| <kbd>g</kbd>, <kbd>G</kbd>                                           | Beginning and end of the list                                                                             |
| <kbd>/</kbd>                                                         | Start incremental search                                                                                  |
| <kbd>Esc</kbd>                                                       | Exit incremental search, clearing filter                                                                  |
| <kbd>&lt;</kbd>,<kbd>&gt;</kbd>, <kbd>&#123;</kbd>,<kbd>&#125;</kbd> | Horizontal scroll                                                                                         |
| <kbd>Ctrl-L</kbd>                                                    | Redraw the whole display                                                                                  |
| <kbd>Ctrl-O</kbd>, <kbd>o</kbd>                                      | Enter unique mode (no duplicate lines)                                                                    |
| <kbd>Ctrl-W</kbd> (in incremental search)                            | Delete whole word                                                                                         |
| <kbd>Ctrl-K</kbd> (in incremental search)                            | Delete whole line                                                                                         |
| <kbd>Ctrl-D</kbd>, <kbd>Ctrl-U</kbd>                                 | Half page up or down                                                                                      |
| <kbd>Ctrl-P</kbd>, <kbd>Ctrl-N</kbd>                                 | Previous and next (also done with vim's j,k)                                                              |

## Install Zsh Command Architect

<Tabs>
  <TabItem value="zi" label="Zi" default>

Add the following to `.zshrc`. The config files will be available in `~/.config/zca`.

```shell title="~/.zshrc"
zi load z-shell/zsh-cmd-architect
```

  </TabItem>
  <TabItem value="zgen" label="Zgen">

Add the following to `.zshrc` and issue a `zgen reset` (this assumes that there is a proper `zgen save` construct in `.zshrc`). The config files will be available in `~/.config/zca`.

```shell title="~/.zshrc"
zgen load z-shell/zsh-cmd-architect
```

  </TabItem>
  <TabItem value="manual" label="Manual">

After extracting `ZCA` to `{some-directory}` add the following two lines to `~/.zshrc`:

```shell title="~/.zshrc" showLineNumbers
fpath+=( {some-directory} )
source "{some-directory}/zsh-cmd-architect.plugin.zsh"
```

As you can see, no plugin manager is needed to use the `*.plugin.zsh` file. The above two lines of code are all that almost **all** plugin managers do:

```shell title="~/.zshrc"
source "{some-directory}/zsh-cmd-architect.plugin.zsh"
```

because `ZCA` detects if it is used by **any** plugin manager and can handle the `$fpath` update by itself.

  </TabItem>
  <TabItem value="single-file" label="Single File">

Running script `doc/generate_single_file` will create a single-file version of `ZCA`. It can be sourced from `.zshrc`. Don't forget about configuration files (copy them to `~/.config/zca`).

  </TabItem>
  <TabItem value="standalone" label="Standalone">

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/z-shell/zsh-cmd-architect/main/doc/install.sh)"
```

To update run the command again.

`ZCA` will be installed at `~/.config/zca/zsh-cmd-architect`, config files will be copied to `~/.config/zca`. `.zshrc` will be updated with only `4` lines of code that will be added to the bottom.

After installing and reloading the shell give `ZCA` a quick try with <kbd>Ctrl-T</kbd>.

  </TabItem>
</Tabs>

## Performance

`ZCA` is fastest with `Zsh` before `5.0.6` and starting from `5.2`

## Fixing tmux, screen, and Linux vt

If `TERM=screen-256color` (often a case for `tmux` and `screen` sessions) then `ncv` terminfo capability will have `2`nd bit set.

This in general means that underlining won't work. To fix this by creating your own `ncv=0`-equipped terminfo file, run:

```shell
{ infocmp -x screen-256color; printf '\t%s\n' 'ncv@,'; } > /tmp/t && tic -x /tmp/t
```

A file will be created in the directory `~/.terminfo` and will be automatically used, `tmux` and `screen` will work.

Similar is for Linux virtual terminal:

```shell
{ infocmp -x linux; printf '\t%s\n' 'ncv@,'; } > /tmp/t && tic -x /tmp/t
```

It will not display underline properly, but will instead highlight by a color, which is quite nice. The same will not work for FreeBSD's vt, `ZCA` will detect if that `vt` is used and will revert to highlighting elements via `reverse` mode.

<!-- end-of-file -->
<!-- links -->
<!-- external -->

[z-shell/zsh-cmd-architect]: https://github.com/z-shell/zsh-cmd-architect
