---
id: zsh-zoxide
title: ⚙️ Zoxide
image: /img/logo/320x320.png
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

`zoxide` is a smarter `cd` command written in Rust which remember most used directory and add the ability to "jump" inside without typing the entire path.
`zoxide` also provide interactive completion with `fzf`

[![asciicast](https://asciinema.org/a/512856.svg)](https://asciinema.org/a/512856)

## Install `zoxide`

First, you need to have `zoxide` installed on your system. You can install using two differents ways:
<Tabs>
<TabItem value="official" label="Official install" default>

Follow [https://github.com/ajeetdsouza/zoxide#step-1-install-zoxide](https://github.com/ajeetdsouza/zoxide#step-1-install-zoxide)

</TabItem>

<TabItem value="zi" label="With Zi" default>

```shell showLineNumbers
zi ice as'null' from"gh-r" sbin
zi light ajeetdsouza/zoxide
```

</TabItem>
</Tabs>

## Install `zsh-zoxide`

After, you can install `zsh-zoxide` using the most adapted syntax for your `.zshrc`:
<Tabs>

<TabItem value="standard" label="Standard syntax" default>

```shell showLineNumbers
zi ice has'zoxide'
zi light z-shell/zsh-zoxide
```

</TabItem>

<TabItem value="for" label='The "for" syntax' default>

```shell showLineNumbers
zi has'zoxide' light-mode for \
  z-shell/zsh-zoxide
```

</TabItem>

<TabItem value="turbo" label='Turbo mode + "for" syntax' default>

```shell showLineNumbers
zi has'zoxide' wait lucid for \
  z-shell/zsh-zoxide
```

</TabItem>

</Tabs>

:::info

See the wiki for [automatic or condition based loading/unloading](/docs/getting_started/overview#automatic-condition-based---load--unload)

:::

## Add interactive selection with [`fzf`](https://github.com/z-shell/fzf)

[fzf](https://github.com/junegunn/fzf) is a command-line fuzzy finder, used by `zoxide` for interactive selection. It can be installed as a Zi [package](/ecosystem/packages/available-packages#the-fzf-command-line-fuzzy-finder).

## Usage

The plugin will call `zoxide init` with prefixed commands `x`, `xi`:

`zoxide` will remember the most used directory and add the ability to `cd` in the directory whithout specifing the entire path. Just by typing the directory name.

- `cd` into highest ranked directory matching `foo`

```sh showLineNumbers
x foo
```

- `cd` into highest ranked directory matching `foo` and `bar`

```sh
x foo bar
```

- `cd` into a subdirectory starting with `foo`

```sh
x foo /
```

- `zoxide` also works like a regular `cd` command

```sh showLineNumbers
x ~/foo
```

- `cd` into relative path

```sh
x foo/
```

- `cd` one level up

```sh
x ..
```

- `cd` into previous directory

```sh
x -
```

- `cd` with interactive selection (using `fzf`)

<pre>
x foo <kbd>SPACE</kbd> <kbd>TAB</kbd>
</pre>

:::tip

If you want to replace `cd` with `zoxide`. You can set the prefix to `cd` by setting `_ZO_CMD_PREFIX=cd` in `~.zshrc` before the installation of zoxide

:::

## Matching

`zoxide` uses a simple, predictable algorithm for resolving queries:

- All matching is case-insensitive.

`z foo` matches `/foo` as well as `/FOO`.

- All terms must be present (including slashes) within the path, in order.

  `z fo ba` matches `/foo/bar`, but not `/bar/foo`.
  `z fo / ba` matches `/foo/bar`, but not `/foobar`.

- The last component of the last keyword must match the last component of the path.
  `z bar` matches `/foo/bar`, but not `/bar/foo`.
  `z foo/bar` (last component: `bar`) matches `/foo/bar`, but not `/foo/bar/baz`.

- Matches are returned in descending order of frecency.

## Environment variables

The [database](https://github.com/ajeetdsouza/zoxide#environment-variables) is stored in [\$ZPFX/share](/community/zsh_plugin_standard#global-parameter-with-prefix). You can customize the path by following [the wiki](/docs/guides/customization#customizing-paths).

Manpages auto installed: [\$ZI[MAN_DIR]](/docs/guides/customization#customizing-paths)

## Import your data

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
