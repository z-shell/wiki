---
id: zsh-unique-id
title: ⚙️ Unique ID
image: zw/logo/320x320.png
description: Provides a **unique number** that identifies a **running** Zshell session
keywords: [zsh-unique-id, unique-id]
---

- [z-shell/zsh-unique-id](https://github.com/z-shell/zsh-unique-id)

This plugin provides a **unique number** that identifies a **running** Zshell session, in its shell variable `$ZUID_ID`.

Besides this unique number, also a unique _codename_ is provided, in shell variable `$ZUID_CODENAME`.

Once you load this plugin, the two parameters will be set, and their values will not be available to other Zshell
sessions (being thus _unique_).

`$ZUID_ID` is a progressing number starting from `1`. `$ZUID_CODENAME` is chosen from a list of predefined codenames,
see the default list below.

An example use case is to hold logs in files `.../mylog-${ZUID_CODENAME}.log`, so that two different Zshells will not
write to the same file at the same time.

Default codenames are:

- atlantis (for `ZUID_ID` == `1`)
- echelon (for `ZUID_ID` == `2`)
- quantum (etc.)
- ion
- proxima
- polaris
- solar
- momentum
- hyper
- gloom
- velocity
- future
- enigma
- andromeda
- saturn
- jupiter
- aslan
- commodore
- falcon
- persepolis
- dharma
- samsara
- prodigy
- ethereal
- epiphany
- aurora
- oblivion

Zstyle configuration allows to customize the codenames:

```shell
zstyle :plugin:zuid codenames paper metal wood plastic # first 4 shells will have those codenames
```

## Install Zsh Unique ID

**The plugin is "standalone"**, which means that only sourcing it is needed (without using a plugin manager). So to
install, unpack `zsh-unique-id` somewhere and add:

```shell
source {where-zsh-unique-id-is}/zsh-unique-id.plugin.zsh
```

to `zshrc`.

Sourcing is recommended, because it can be done early, at top of zshrc, without a plugin manager – to acquire the unique
identification as early as possible.

## With [ZI](https://github.com/z-shell/zi)

Add `zi load z-shell/zsh-unique-id` to your `.zshrc` file. ZI will clone the plugin the next time you start zsh. To
update issue `zi update z-shell/zsh-unique-id`.

## With Antigen

Add `antigen bundle z-shell/zsh-unique-id` to your `.zshrc` file. Antigen will handle cloning the plugin for you
automatically the next time you start zsh.

## With Oh-My-Zsh

1. `cd ~/.oh-my-zsh/custom/plugins`
2. `git clone git@github.com:z-shell/zsh-unique-id.git`
3. Add `zsh-unique-id` to your plugin list

## With Zgen

Add `zgen load z-shell/zsh-unique-id` to your .zshrc file in the same place you're doing your other `zgen load` calls
in.
