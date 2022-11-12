---
id: zbrowse
title: ⚙️ ZBrowse
image: /img/png/theme/z/320x320.png
description: Check variables of a possible loop.
keywords:
  - zbrowse
  - zplugin
  - variable
  - zsh-plugin
---

<!-- @format -->

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import ImgShow from '@site/src/components/ImgShow';

## <i class="fa-brands fa-github"></i> [z-shell/zbrowse][]

When doing shell work, it is often the case that `echo $variable` is invoked multiple times, to check the result of a loop, etc.

With ZBrowse, you just need to press <kbd>Ctrl-B</kbd>, which invokes the`ZBrowse` variable browser for the Z shell.

<ImgShow
  img="/img/cast/gif/zsh/zbrowse.gif"
  alt="ZBrowse Preview"
/>

## Install Zbrowse

First, install the [z-shell/zui][] plugin - a UI library for Z shell.

<Tabs>
  <TabItem value="zi" label="Zi" default>

Add the following to your `.zshrc`. Zi will handle cloning the plugin for you automatically the next time you start Zsh. To update run `zi update z-shell/zbrowse`.

```shell title="~/.zshrc"
zi load z-shell/zbrowse
```

  </TabItem>
  <TabItem value="zgen" label="Zgen">

Add the following to your `.zshrc` file in the same place you're doing your other `zgen load` calls.

```shell title="~/.zshrc"
zgen load z-shell/zbrowse.git
```

  </TabItem>
  <TabItem value="oh-my-zsh" label="Oh-My-Zsh">

Clone the Repository:

```shell title="~/.zshrc" showLineNumbers
git clone https://github.com/z-shell/zbrowse.git \
${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/zbrowse
```

And add `Zbrowse` to your plugin list.

  </TabItem>
  <TabItem value="standalone" label="Standalone">

**The plugin is "standalone"**, which means that only sourcing it is needed. So to install, unpack ZBrowse somewhere and add to `.zshrc`:

```shell title="~/.zshrc"
source {where-zbrowse-is}/zbrowse.plugin.zsh
```

  </TabItem>
</Tabs>

<!-- end-of-file -->
<!-- links -->

[z-shell/zbrowse]: https://github.com/z-shell/zbrowse
[z-shell/zui]: https://github.com/z-shell/zui
