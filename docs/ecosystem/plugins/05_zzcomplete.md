---
id: zzcomplete
title: ⚙️ ZZComplete
image: zw/logo/320x320.png
description: Complete options from manual pages – press Ctrl-F to start the completer.
keywords: [zzcomplete, completion]
---

- [z-shell/zzcomplete](https://github.com/z-shell/zzcomplete)

Complete options from manual pages – press <kbd>Ctrl-F</kbd> to start the completer.

The completion of options has drawbacks:

1. The user has to remember a part of the option he wants to complete.
2. OR he is forced to read through all the options (listed after <kbd>TAB</kbd>).

With ZZ Complete, the user can:

1. Search in the manual for arbitrary text related to the option.
2. Then select the option that's located nearby the found text.
3. Also, the user can read about the possible values of the options and select them too.

## ZZ Complete preview on Asciinema

---

:::tip

You can resize the video by pressing <kbd>Ctrl-+</kbd> or <kbd>Cmd-+</kbd>.

:::

<a href="https://asciinema.org/a/293365">
  <img className="ScreenView" src="https://asciinema.org/a/293365.svg" async alt="ZZ Complete view on Asciinema" />
</a>

Video source: [Asciinema](https://asciinema.org/a/293365)

---

## Install ZZ Complete

### Dependencies

The plugin needs also [ZUI](https://github.com/z-shell/zui) plugin and a Zsh that is built with the `zsh/curses` module.

### Manual

Clone the Repository.

```shell
git clone https://github.com/z-shell/zzcomplete ~/path/to/zzcomplete
```

And add the following to your `zshrc` file.

```shell
source ~/path/to/zzcomplete/zzcomplete.plugin.zsh
```

### ZI

Add the following to your `zshrc` file.

```shell
zi light z-shell/zzcomplete
```

### Antigen

Add the following to your `zshrc` file.

```shell
antigen bundle z-shell/zzcomplete
```

### Zgen

Add the following to your `.zshrc` file in the same place you're doing your other `zgen load` calls in.

```shell
zgen load z-shell/zzcomplete
```

### Oh-My-Zsh

Clone the Repository.

```shell
git clone https://github.com/z-shell/zzcomplete.git \
  ~ZSH_CUSTOM/plugins/zzcomplete
```

And add `zzcomplete` to your plugin list.
