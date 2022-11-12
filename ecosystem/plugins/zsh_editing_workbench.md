---
id: zsh-editing-workbench
title: ⚙️ Editing Workbench
image: /img/png/theme/z/320x320.png
description: Organized shortcuts for Zsh
keywords:
  - zsh-plugin
  - workbench
  - organized
  - zsh-edit
  - zplugin
---

<!-- @format -->

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

## <i class="fa-brands fa-github"></i> [z-shell/zsh-editing-workbench][]

Organized shortcuts for various command line editing operations, plus new operations as incremental history word completion.

> Incremental history _word_ completing is started with <kbd>Alt-h/H</kbd> or <kbd>Option-h/H</kbd> on Mac.

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

## Configuring terminals

### **XTerm**

To make <kbd>Alt</kbd> key work like expected under `XTerm` add `XTerm*metaSendsEscape: true` to your resource file, e.g.:

```shell
echo 'XTerm*metaSendsEscape: true' >> ~/.Xresources
```

<!-- end-of-file -->
<!-- links -->
<!-- external -->

[z-shell/zsh-editing-workbench]: https://github.com/z-shell/zsh-editing-workbench
