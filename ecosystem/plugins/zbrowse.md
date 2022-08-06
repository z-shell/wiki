---
id: zbrowse
title: ⚙️ ZBrowse
image: /img/logo/320x320.png
description: Check variables of a possible loop.
keywords:
  - zbrowse
  - zplugin
  - variable
  - zsh-plugin
---

<!-- @format -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Image from '@theme/IdealImage';

## <i class="fa-brands fa-github"></i> [z-shell/zbrowse][]

When doing shell work, it is often the case that `echo $variable` is invoked multiple times, to check the result of a loop, etc.

With ZBrowse, you just need to press <kbd>Ctrl-B</kbd>, which invokes the`ZBrowse` variable browser for the Z shell.

<div className="ScreenView">
  <Image img="https://cdn.zshell.dev/img/asciicast/gif/zsh/zbrowse.gif" className="ImageView" alt="ZBrowse Preview" />
</div>

## Install Zbrowse

First, install the [ZUI](https://github.com/z-shell/zui) plugin - a UI library for Z shell.

<Tabs>
  <TabItem value="standalone" label="Standalone" default>

**The plugin is "standalone"**, which means that only sourcing it is needed. So to install, unpack ZBrowse somewhere and add to `.zshrc`:

```shell
source {where-zbrowse-is}/zbrowse.plugin.zsh
```

  </TabItem>
  <TabItem value="zi" label="Zi">

Add the following to your `.zshrc`. Zi will handle cloning the plugin for you automatically the next time you start Zsh. To update run `zi update z-shell/zbrowse`.

```shell
zi load z-shell/zbrowse
```

  </TabItem>
  <TabItem value="zgen" label="Zgen">

Add the following to your `.zshrc` file in the same place you're doing your other `zgen load` calls.

```shell
zgen load z-shell/zbrowse.git
```

  </TabItem>
  <TabItem value="antigen" label="Antigen">

Add the following to your `.zshrc` file. Antigen will handle cloning the plugin for you automatically the next time you start Zsh.

```shell
antigen bundle z-shell/zbrowse.git
```

  </TabItem>
  <TabItem value="oh-my-zsh" label="Oh-My-Zsh">

Clone the Repository:

```shell
git clone https://github.com/z-shell/zbrowse.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/zbrowse
```

And add `F-Sy-H` to your plugin list.

  </TabItem>
</Tabs>

<!-- end-of-file -->
<!-- links -->

[z-shell/zbrowse]: https://github.com/z-shell/zbrowse
