---
id: startify
title: ⚙️ Startify
image: zw/logo/320x320.png
description: Zsh Plugin Startify documentation
keywords: [startify, plugin]
---

- [z-shell/zsh-startify](https://github.com/z-shell/zsh-startify)

A plugin that aims at providing what [vim-startify](https://github.com/mhinz/vim-startify) plugin does, but in Zsh. The
analogy isn't fully easy to make. `vim-startify` states - it provides dynamically created headers or footers and uses
configurable lists to show recently used or bookmarked files and persistent sessions.

## Zsh Startify overview

- Shows recently used files if used by a shell-util command, with name of the command(s) on other right
- Shows recently used vim files
- Show active tmux sessions
- Show statistics of most popular aliases in use
- Show recently visited projects e.g: `git` repositories, and directories with:
  - `Makefile`,
  - `CMakeLists.txt`,
  - `configure` script.
- Very advanced feature, inherited from `zsh-startify`'s predecessor: `z-shell/zaccumulator` plugin
- Show recently ran `git` commands, with analysis of e.g. recently checked-out branches
- Can cooperate with any bookmarking plugins to show their bookmarks

## Quick Start

`zsh-startify` accumulates data in its own history file. To pre-fill it quickly with a few of entries (basing on the
regular history) you can run the `__from-zhistory-accumulate` command.

## [Zstyles](/search?q=zstyle) for Startify

The zstyles used to configure the plugin (add such commands anywhere in the `zshrc`):

```shell
zstyle ":plugin:zsh-startify:shellutils" size 5  # The size of the recently used file list (default: 5)
zstyle ":plugin:zsh-startify:vim" size 5         # The size of the recently opened in Vim list (default: 5)
```

## Startify installation with ZI

Option A – normal load without [turbo mode](/search?q=turbo+mode).

```shell
zi ice atload'zsh-startify'
zi load z-shell/zsh-startify
```

Option B – a load with [turbo mode](/search?q=turbo+mode).

```shell
zi ice wait'0' lucid atload'zsh-startify'
zi load z-shell/zsh-startify
```

The first option (A) loads the plugin synchronously, at the time of execution of the `zi load ...` command. The second
option (B) loads in an asynchronous manner, 0 seconds after the prompt being first displayed.

## Other Startify installations

Issue the regular loading command of your plugin manager, pointing it to `z-shell/zsh-startify`. Then, add invocation of
`zsh-startify` to the end of `~/.zshrc`:
