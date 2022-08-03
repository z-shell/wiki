---
id: zsh-zoxide
title: ⚙️ Zoxide
image: img/logo/320x320.png
description: The ajeetdsouza/zoxide init for Zsh
keywords:
  - zsh-plugin
  - zsh-zoxide
  - zoxide
  - cd
---

<!-- @format -->

- [z-shell/zsh-zoxide](https://github.com/z-shell/zsh-zoxide)

[`ajeetdsouza/zoxide`](https://github.com/ajeetdsouza/zoxide) is a smarter `cd` command, inspired by `z` and `autojump`.

It remembers which directories you use most frequently, so you can "jump" to them in just a few keystrokes.
zoxide works on all major shells.

### Install `zoxide`

- [Official install](https://github.com/ajeetdsouza/zoxide#step-1-install-zoxide) (recommended)
- With Zi:

```zsh
zi ice as'null' from"gh-r" sbin
zi light ajeetdsouza/zoxide
```

### Install `zsh-zoxide`

#### Standart syntax

```zsh
zi ice has'zoxide'
zi light z-shell/zsh-zoxide
```

#### The "For" syntax

```zsh
zi has'zoxide' light-mode for \
  z-shell/zsh-zoxide
```

#### Turbo mode + "For" syntax

```zsh
zi has'zoxide' wait lucid for \
  z-shell/zsh-zoxide
```

> Wiki: [automatic, condition based (loading/unloading)](https://wiki.zshell.dev/docs/getting_started/overview#automatic-condition-based---load--unload)

### Add interactive selection with [`fzf`](https://github.com/z-shell/fzf)

[fzf](https://github.com/junegunn/fzf) is a command-line fuzzy finder, used by zoxide for interactive selection. It can be installed from [here](https://github.com/z-shell/fzf) as a zi package.

### Environment variables and usage with Zi

The plugin will call `zoxide init` with prefixed commands `x`, `xi`:

- [x] Completions auto-loaded: [commands](https://wiki.zshell.dev/docs/guides/commands#completions-management), [ice-modifiers](https://wiki.zshell.dev/docs/guides/syntax/ice-modifiers#completions)
- [x] Manpages auto installed: [\$ZI[MAN_DIR]](https://wiki.zshell.dev/docs/guides/customization#customizing-paths)
- [x] [Database](https://github.com/ajeetdsouza/zoxide#environment-variables) directory set: [\$ZPFX/share](https://wiki.zshell.dev/community/zsh_plugin_standard#global-parameter-with-prefix), [customizing-paths](https://wiki.zshell.dev/docs/guides/customization#customizing-paths)

```sh
x foo              # cd into highest ranked directory matching foo
x foo bar          # cd into highest ranked directory matching foo and bar
x foo /            # cd into a subdirectory starting with foo
```

```sh
x ~/foo            # z also works like a regular cd command
x foo/             # cd into relative path
x ..               # cd one level up
x -                # cd into previous directory
```

```sh
xi foo             # cd with interactive selection (using fzf)
```

```sh
x foo<SPACE><TAB>  # show interactive completions
```

#### Change prefix

If you want to replace `cd` with `zoxide`. You can set the prefix to `cd` by setting `_ZO_CMD_PREFIX=cd` in `~.zshrc`
before the installation of zoxide

### Environment variables and usage with other plugin managers

The plugin will call `zoxide init` with prefixed commands `z`, `zi`.

### Import your data

If you currently use any of the following utilities, you may want to import your data into zoxide:

#### autojump

```shell
x import --from autojump path/to/db # replace x with your alias
```

#### z, z.lua or zsh-z

```shell
x import --from z path/to/db # replace x with your alias
```
