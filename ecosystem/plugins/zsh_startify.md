---
id: zsh-startify
title: ⚙️ Startify
image: /img/png/theme/z/320x320.png
description: Zsh Plugin Startify documentation.
keywords:
  - startify
draft: true
---

<!-- @format -->

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

## <i class="fa-brands fa-github"></i> [z-shell/zsh-startify][]

A plugin that aims at providing what [mhinz/vim-startify][] plugin does but in Zsh. The analogy isn't fully easy to make. `vim-startify` states - it provides dynamically created headers or footers and uses configurable lists to show recently used or bookmarked files and persistent sessions.

Overview:

- Shows recently used files if used by a shell-util command, with the name of the command(s)
- Shows recently used `vim` files
- Show active `tmux` sessions
- Show statistics of the most popular aliases in use
- Show recently visited projects e.g: `git` repositories, and directories with:
  - `Makefile`, `CMakeLists.txt`, `configure` script
- Very advanced feature, inherited from `zsh-startify`'s predecessor: `z-shell/zaccumulator` plugin
- Show recently ran `git` commands, with analysis of e.g. recently checked-out branches
- Can cooperate with any bookmarking plugins to show their bookmarks

## Quick start

`zsh-startify` accumulates data in its history file. To pre-fill it quickly with a few entries (based on the regular history) you can run the `__from-zhistory-accumulate` command.

## [Zstyles](/search?q=zstyle) for Startify

The zstyles used to configure the plugin (add such commands anywhere in the `zshrc`):

```shell showLineNumbers
zstyle ":plugin:zsh-startify:shellutils" size 5  # The size of the recently used file list (default: 5)
zstyle ":plugin:zsh-startify:vim" size 5         # The size of the recently opened in Vim list (default: 5)
```

## Install Zsh Startify

The Standard install loads the plugin synchronously, at the time of execution of the `zi load …` command. The turbo mode loads asynchronously, 0 seconds after the prompt is first displayed.

<Tabs>
  <TabItem value="standard" label="Standard" default>

Standard syntax without [turbo mode](/search?q=turbo+mode).

```shell showLineNumbers
zi ice atload'zsh-startify'
zi load z-shell/zsh-startify
```

  </TabItem>
  <TabItem value="turbo-mode" label="Turbo mode" default>

Load using [turbo mode](/search?q=turbo+mode).

```shell showLineNumbers
zi ice wait'0' lucid atload'zsh-startify'
zi load z-shell/zsh-startify
```

  </TabItem>
</Tabs>

<!-- end-of-file -->
<!-- links -->

[z-shell/zsh-startify]: https://github.com/z-shell/zsh-startify
[mhinz/vim-startify]: https://github.com/mhinz/vim-startify
