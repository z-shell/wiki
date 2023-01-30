---
id: zsh-editing-workbench
title: ⚙️ Editing Workbench
image: /img/png/theme/z/320x320.png
description: Organized shortcuts for Zsh
keywords:
  - workbench
  - zsh-edit
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import APITable from '@site/src/components/APITable'; import Highlight from "@site/src/components/Highlight";

## <i class="fa-brands fa-github"></i> [z-shell/zsh-editing-workbench][zsh-editing-workbench]

Organized shortcuts for various command line editing operations, plus new operations as incremental history word completion.

|                                      Keys                                      | Description                                                                                                                                                  |
| :----------------------------------------------------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|                     <kbd><kbd>Alt</kbd>+<kbd>w</kbd></kbd>                     | Delete a **shell word** [^1]                                                                                                                                 |
|                     <kbd><kbd>Alt</kbd>+<kbd>t</kbd></kbd>                     | Transpose (swap) **shell words**                                                                                                                             |
|                     <kbd><kbd>Alt</kbd>+<kbd>m</kbd></kbd>                     | Copy previous **shell word**, or word before that, etc. when used multiple times                                                                             |
|                     <kbd><kbd>Alt</kbd>+<kbd>M</kbd></kbd>                     | Just copy previous **shell word** without iterating to previous ones                                                                                         |
|                     <kbd><kbd>Alt</kbd>+<kbd>.</kbd></kbd>                     | Copy last **shell word** from previous line, or line before that, etc. when used multiple times; can be combined with <kbd><kbd>Alt</kbd>+<kbd>m</kbd></kbd> |
|                    <kbd><kbd>Ctrl</kbd>+<kbd>W</kbd></kbd>                     | Delete word according to configured **word style** [^2]:                                                                                                     |
|                     <kbd><kbd>Alt</kbd>+<kbd>r</kbd></kbd>                     | Transpose (swap) words according to configured **word style** (cursor needs to be placed on beginning of word to swap)                                       |
|                     <kbd><kbd>Alt</kbd>+<kbd>/</kbd></kbd>                     | Complete **some word** [^3] from history                                                                                                                     |
| <kbd><kbd>Alt</kbd>+<kbd>h</kbd></kbd>, <kbd><kbd>Alt</kbd>+<kbd>H</kbd></kbd> | Complete **shell word** from history (custom version)                                                                                                        |
|                     <kbd><kbd>Alt</kbd>+<kbd>J</kbd></kbd>                     | Break line                                                                                                                                                   |
|                    <kbd><kbd>Alt</kbd>+<kbd>\_</kbd></kbd>                     | Undo                                                                                                                                                         |

## Install Zsh Editing Workbench

<Tabs>
  <TabItem value="zi" label="Zi" default>

Add the following to `.zshrc`. The config files will be available in `~/.config/zew`.

```shell title="~/.zshrc"
zi load z-shell/zsh-editing-workbench
```

  </TabItem>
  <TabItem value="zgen" label="Zgen">

Add `zgen load z-shell/zsh-editing-workbench` to `.zshrc` and issue a `zgen reset` (this assumes that there is a proper `zgen save` construct in `.zshrc`). The config files will be available in `~/.config/zew`.

  </TabItem>
  <TabItem value="standalone" label="Standalone">

After extracting `ZEW` to `{some-directory}` add the following two lines to `~/.zshrc`:

```shell title="~/.zshrc" showLineNumbers
fpath+=( {some-directory} )
source "{some-directory}/zsh-editing-workbench.plugin.zsh"
```

  </TabItem>
</Tabs>

<details>
<summary>Configure terminals</summary>

- **XTerm**

To make <kbd>Alt</kbd> key work like expected under `XTerm` add `XTerm*metaSendsEscape: true` to your resource file, e.g.:

```shell
echo 'XTerm*metaSendsEscape: true' >> ~/.Xresources
```

- **Konsole**

To make <kbd>Alt</kbd> key work like expected under `Konsole` add `Konsole*keysym.Meta: Meta` to your resource file, e.g.:

```shell
echo 'Konsole*keysym.Meta: Meta' >> ~/.config/konsolerc
```

</details>

<!-- end-of-file -->
<!-- footnotes -->
<!-- markdownlint-disable MD046 -->

[^1]: A **shell word** is a text that Zsh would see as single segment. For example `$(( i + 1 ))` is a single **shell word**.
[^2]:
    A **word style** defines a way Zsh recognizes segments (words) of text in commands that want to use the style information.
    The style can be configured in **zew.conf** to be one of:

    - bash words are built up of alphanumeric characters only.
    - normal as in normal shell operation: word characters are alphanumeric characters plus any characters present in the string given by the parameter `$WORDCHARS`.
    - shell words are complete shell command arguments, possibly including complete quoted strings, or any tokens special to the shell.
    - whitespace words are any set of characters delimited by whitespace.
    - default restore the default settings; this is the same as 'normal' with default `$WORDCHARS` value.

[^3]: **Some word** is in general a sophisticated word, but not a **shell word**, because of limitations in Zsh history word completion. **Some word** is rather not build from special characters, it works well for normal characters.

<!-- links -->
<!-- external -->

[zsh-editing-workbench]: https://github.com/z-shell/zsh-editing-workbench
