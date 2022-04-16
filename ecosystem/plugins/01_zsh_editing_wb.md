---
id: editing-workbech
title: ⚙️ Editing Workbench
image: zw/logo/320x320.png
description: Organized shortcuts for Zsh
keywords: [zsh-edit, workbench, organized]
---

- [zsh-editing-workbench](https://github.com/z-shell/zsh-editing-workbench)

Organized shortcuts for various command line editing operations, plus new operations (e.g. incremental history word
completion).

Incremental history _word_ completing (started with <kbd>Alt-h/H</kbd> or <kbd>Option-h/H</kbd> on Mac):

## Install Zsh Editing Workbench

### With [ZI](https://github.com/z-shell/zi)

Add `zinit load z-shell/zsh-editing-workbench` to `.zshrc`. The config files will be available in `~/.config/zew`.

### With Zgen

Add `zgen load z-shell/zsh-editing-workbench` to `.zshrc` and issue a `zgen reset` (this assumes that there is a proper
`zgen save` construct in `.zshrc`). The config files will be available in `~/.config/zew`.

### With Antigen

Add `antigen bundle z-shell/zsh-editing-workbench` to `.zshrc`. There also should be `antigen apply`. The config files
will be in `~/.config/znt`.

### Manual Installation

After extracting `ZEW` to `{some-directory}` add following two lines to `~/.zshrc`:

```shell
fpath+=( {some-directory} )
source "{some-directory}/zsh-editing-workbench.plugin.zsh"
```

As you can see, no plugin manager is needed to use the `*.plugin.zsh` file. The above two lines of code are all that
almost **all** plugin managers do. In fact, what's actually needed is only:

```shell
source "{some-directory}/zsh-editing-workbench.plugin.zsh"
```

because `ZEW` detects if it is used by **any** plugin manager and can handle `$fpath` update by itself.

## Configuring terminals

### **XTerm**

To make `Alt` key work like expected under `XTerm` add `XTerm*metaSendsEscape: true` to your resource file, e.g.:

```shell
echo 'XTerm*metaSendsEscape: true' >> ~/.Xresources
```
