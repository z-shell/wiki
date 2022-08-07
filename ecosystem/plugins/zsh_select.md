---
id: zsh-select
title: ⚙️ Zsh Select
image: /img/logo/320x320.png
description: A shell command that will display a selection list.
keywords:
  - zsh-plugin
  - zsh-select
  - zplugin
  - vim
---

<!-- @format -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Image from '@theme/IdealImage';

## <i class="fa-brands fa-github"></i> [z-shell/zsh-select][]

A shell command that will display a selection list. It is similar to `selecta`, but uses curses library to do display, and when compared to `fzf`, the main difference is approximate matching instead of fuzzy matching.

It is written in Z shell and has its capabilities:

- Patterns, allowing multi-term searching
- Curses module
- Approximate matching <kbd>Ctrl-F</kbd>

The file `zsh-select` can be copied to any `bin` directory. `Zsh` will serve as say `Ruby`, and `zsh-select` will be a regular program available in the system.

Pressing <kbd>o</kbd> will make elements uniqe. To search again after pressing enter, press <kbd>/</kbd>. Approximate matching mode is activated by <kbd>Ctrl-F</kbd>.

<div className="ScreenView">
  <Image img="https://cdn.zshell.dev/img/asciicast/gif/zsh/zsh-select.gif" className="ImageView" alt="Zsh Select Preview" />
</div>

## Install Zsh Select

The `zsh-select` will be available in interactive `Zsh` sessions only when using this method. Nevertheless, integration with `Vim` and other methods will work when `Zsh` is your main shell.

<Tabs>
  <TabItem value="standalone" label="Standalone" default>

Simply copy file `zsh-select` to any `bin` directory such as `/usr/local/bin`.

  </TabItem>
  <TabItem value="zi" label="Zi">

Add the following to `.zshrc`. The plugin will be loaded next time you start `Zsh`. To update issue `zi update z-shell/zsh-select` from command line.

```shell title="~/.zshrc"
zi load z-shell/zsh-select
```

  </TabItem>
  <TabItem value="zgen" label="Zgen">

Add the following to `.zshrc` and issue a `zgen reset` (this assumes that there is a proper `zgen save` construct in `.zshrc`).

```shell title="~/.zshrc"
zgen load z-shell/zsh-select
```

  </TabItem>
  <TabItem value="vim" label="Vim">

Adding the following snippet to `.vimrc` will provide a `\f` keyboard shortcut that will run `zsh-select` as file-selector.

Multi-term searching and approximate matching <kbd>Ctrl-F</kbd> will be available. The snippet is based on code from the `selecta` GitHub page (MIT license):

```vim showLineNumbers
" Run a given vim command on the results of fuzzy selecting from a given shell
" command. See usage below.
function! ZshSelectCommand(choice_command, zshselect_args, vim_command)
  try
    let selection = system(a:choice_command . " | zsh-select " . a:zshselect_args)
  catch /Vim:Interrupt/
    " Swallow the ^C so that the redraw below happens; otherwise there will be
    " leftovers from zshselect on the screen
    redraw!
    return
  endtry
  redraw!
  exec a:vim_command . " " . selection
endfunction
" Find all files in all non-dot directories starting in the working directory.
" Fuzzy select one of those. Open the selected file with :e.
nnoremap <leader>f :call ZshSelectCommand("find * -type f 2>/dev/null", "", ":e")<cr>
```

  </TabItem>
</Tabs>

## Configuring

There are a few environment variables that can be set to alter `zsh-select` behavior.

The values assigned below are the defaults:

```shell showLineNumbers
export ZSHSELECT_BOLD="1"                   # The interface will be drawn in bold font. Use "0" for no bold
export ZSHSELECT_COLOR_PAIR="white/black"   # Draw in white foreground, black background. Try e.g.: "white/green"
export ZSHSELECT_BORDER="0"                 # No border around interface, Use "1" for the border
export ZSHSELECT_ACTIVE_TEXT="reverse"      # Mark current element with reversed text. Use "underline" for marking with underline
export ZSHSELECT_START_IN_SEARCH_MODE="1"   # Starts Zsh Select with searching active. "0" will not invoke searching at the start.
```

<!-- end-of-file -->
<!-- links -->

[z-shell/zsh-select]: https://github.com/z-shell/zsh-select
