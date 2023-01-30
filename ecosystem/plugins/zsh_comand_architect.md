---
id: zsh-cmd-architect
title: ⚙️ Command Architect
image: /img/png/theme/z/320x320.png
description: Allows to copy segments of commands in history, rearrange segments of the current command, and delete segments of the current command.
keywords:
  - zsh-command-architect
---

<!-- @format -->

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import APITable from '@site/src/components/APITable';

## <i class="fa-brands fa-github"></i> [z-shell/zsh-cmd-architect][zsh-cmd-architect]

The Zsh Command Architect allows to copy segments of commands in history, rearrange segments of the current command, and delete segments of the current command. This way user glues commands from parts without using a mouse. Advanced history search (multi-word, without duplicate lines) allows to quickly find the parts.

## Keybindings

```mdx-code-block
<APITable>
```

| Key(s)                                                                                      | Description                                                                       |
| ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| <kbd><kbd><samp>Ctrl</samp></kbd>+<kbd><samp>T</samp></kbd></kbd>                                                     | Start Zsh Command Architect (Zshell binding)                                      |
| <kbd><samp>Enter</samp></kbd>                                                                            | Delete selected segment (command window) or add selected segment (history window) |
| <kbd><samp>[</samp></kbd> or <kbd><samp>]</samp></kbd>                                                                | Move active segment (when in command window)                                      |
| <kbd><kbd><samp>Shift</samp></kbd>+<kbd><samp>left</samp></kbd></kbd> or <kbd><kbd>Shift</kbd>+<kbd>right</kbd></kbd> | Move active segment (when in command window)                                      |
| <kbd><samp>Tab</samp></kbd>                                                                              | Switch between the two available windows                                          |
| <kbd><samp>g</samp></kbd>, <kbd><samp>G</samp></kbd>                                                                  | Beginning and end of the list                                                     |
| <kbd><samp>/</samp></kbd>                                                                                | Start incremental search                                                          |
| <kbd>Esc</kbd>                                                                              | Exit incremental search, clearing filter                                          |
| <kbd><samp><</samp></kbd>,<kbd><samp>></samp></kbd>, <kbd><samp>{</samp></kbd>,<kbd><samp>}</samp></kbd>                                        | Horizontal scroll                                                                 |
| <kbd><kbd><samp>Ctrl</samp></kbd>+<kbd><samp>L</samp></kbd></kbd>                                                     | Redraw of whole display                                                           |
| <kbd><kbd><samp>Ctrl</samp></kbd>+<kbd><samp>O</samp></kbd></kbd>, <kbd>o</kbd>                                       | Enter uniq mode (no duplicate lines)                                              |
| <kbd><kbd><samp>Ctrl</samp></kbd>+<kbd><samp>W</samp></kbd></kbd>                                                     | (in incremental search) - delete whole word                                       |
| <kbd><kbd><samp>Ctrl</samp></kbd>+<kbd><samp>K</samp></kbd></kbd>                                                     | (in incremental search) - delete whole line                                       |
| <kbd><kbd><samp>Ctrl</samp></kbd>+<kbd><samp>D</samp></kbd></kbd>, <kbd><kbd><samp>Ctrl</samp></kbd>+<kbd><samp>U</samp></kbd></kbd>            | Half page up or down                                                              |
| <kbd><kbd><samp>Ctrl</samp></kbd>+<kbd><samp>P</samp></kbd></kbd>, <kbd><kbd><samp>Ctrl</samp></kbd>+<kbd><samp>N</samp></kbd></kbd>            | Previous and next (also done with vim's <kbd>j</kbd>,<kbd>k</kbd>)                |

```mdx-code-block
</APITable>
```

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

<details>
<summary>Fixing tmux, screen and linux vt</summary>

If `TERM=screen-256color` (often a case for `tmux` and `screen` sessions) then
`ncv` terminfo capability will have `2`nd bit set. This in general means that
underline won't work. To fix this by creating your own `ncv=0`-equipped
terminfo file, run:

```shell
{ infocmp -x screen-256color; printf '\t%s\n' 'ncv@,'; } > /tmp/t && tic -x /tmp/t
```

A file will be created in directory `~/.terminfo` and will be automatically
used, `tmux` and `screen` will work. Similar is for Linux virtual terminal:

```shell
{ infocmp -x linux; printf '\t%s\n' 'ncv@,'; } > /tmp/t && tic -x /tmp/t
```

It will not display underline properly, but will instead highlight by a color,
which is quite nice. The same will not work for FreeBSD's vt, `ZCA` will detect
if that vt is used and will revert to highlighting elements via `reverse` mode.

</details>

<!-- end-of-file -->
<!-- links -->
<!-- external -->

[zsh-cmd-architect]: https://github.com/z-shell/zsh-cmd-architect
