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

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

- [z-shell/zsh-zoxide](https://github.com/z-shell/zsh-zoxide)

[`ajeetdsouza/zoxide`](https://github.com/ajeetdsouza/zoxide) is a smarter `cd` command, inspired by `z` and `autojump`.

> It remembers which directories you use most frequently, so you can "jump" to them in just a few keystrokes.
> `zoxide` works on all major shells.
>
> — ajeetdsouza/zoxide

![zsh_zoxide.gif](/asciicast/gif/zsh_zoxide.gif)

### Install `zoxide`

<Tabs>
<TabItem value="official" label="Official install" default>

Follow [https://github.com/ajeetdsouza/zoxide#step-1-install-zoxide](https://github.com/ajeetdsouza/zoxide#step-1-install-zoxide)

</TabItem>

<TabItem value="zi" label="WIth Zi" default>

```zsh
zi ice as'null' from"gh-r" sbin
zi light ajeetdsouza/zoxide
```

</TabItem>
</Tabs>

### Install `zsh-zoxide`

<Tabs>

<TabItem value="standard" label="Standard syntax" default>

```zsh
zi ice has'zoxide'
zi light z-shell/zsh-zoxide
```

</TabItem>

<TabItem value="for" label='The "for" syntax' default>

```zsh
zi has'zoxide' light-mode for \
  z-shell/zsh-zoxide
```

</TabItem>

<TabItem value="turbo" label='Turbo mode + "for" syntax' default>

```zsh
zi has'zoxide' wait lucid for \
  z-shell/zsh-zoxide
```

</TabItem>

</Tabs>

:::info

Wiki: [automatic, condition based (loading/unloading)](https://wiki.zshell.dev/docs/getting_started/overview#automatic-condition-based---load--unload)

:::

### Add interactive selection with [`fzf`](https://github.com/z-shell/fzf)

[fzf](https://github.com/junegunn/fzf) is a command-line fuzzy finder, used by zoxide for interactive selection. It can be installed from [here](https://github.com/z-shell/fzf) as a zi package.

### Usage

The plugin will call `zoxide init` with prefixed commands `x`, `xi`:

`zoxide` will remember the most used directory and add the ability to `cd` in the directory whithout specifing the entire path. Just by typing the directory name.

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

:::tip

If you want to replace `cd` with `zoxide`. You can set the prefix to `cd` by setting `_ZO_CMD_PREFIX=cd` in `~.zshrc`
before the installation of zoxide

:::

### Environment variables

The [database](https://github.com/ajeetdsouza/zoxide#environment-variables) is stored in [\$ZPFX/share](https://wiki.zshell.dev/community/zsh_plugin_standard#global-parameter-with-prefix). You can customize the path by following [the wiki](https://wiki.zshell.dev/docs/guides/customization#customizing-paths).

Manpages are auto installed in [\$ZI[MAN_DIR]](https://wiki.zshell.dev/docs/guides/customization#customizing-paths)

### Import your data

If you currently use any of the following utilities, you may want to import your data into zoxide:

<Tabs>
  <TabItem value="autojump" label="autojump" default>
    <code>
    x import --from autojump``` path/to/db # replace x with your alias
    </code>
  </TabItem>
  <TabItem value="z" label="z, z.lua or zsh-z">
    <code>
    x import --from z path/to/db # replace x with your alias
    </code>
  </TabItem>
</Tabs>