---
id: zzcomplete
title: ⚙️ ZZComplete
image: /img/png/theme/z/320x320.png
description: Complete options from manual pages – press Ctrl-F to start the completer.
keywords:
  - zplugin
  - zzcomplete
  - zsh-plugin
  - zsh-completion
---

<!-- @format -->

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import Player from "@site/src/components/Player";

## <i class="fa-brands fa-github"></i> [z-shell/zzcomplete][]

Complete options from manual pages – press <kbd>Ctrl-F</kbd> to start the completer.

The completion of options has drawbacks:

1. The user has to remember a part of the option he wants to complete.
2. OR he is forced to read through all the options (listed after <kbd>TAB</kbd>).

With ZZComplete, the user can:

1. Search in the manual for arbitrary text related to the option.
2. Then select the option that's located nearby the found text.
3. Also, the user can read about the possible values of the options and select them too.

## ZZComplete preview

<Player
    src='https://asciinema.org/a/293365.cast'
    rows={21}
    cols={104}
    speed={1}
    idleTimeLimit={1}
    preload
/>

## Install ZZComplete

> Prerequisites: [ZUI][z-shell/zui] library and a Zsh that is built with the `zsh/curses` module.

<Tabs>
  <TabItem value="zi" label="Zi" default>

Add the following to your `.zshrc` file.

```shell title="~/.zshrc"
zi light z-shell/zzcomplete
```

  </TabItem>
  <TabItem value="zgen" label="Zgen">

Add the following to your `.zshrc` file in the same place you're doing your other `zgen load` calls in.

```shell title="~/.zshrc"
zgen load z-shell/zzcomplete
```

  </TabItem>
  <TabItem value="oh-my-zsh" label="Oh-My-Zsh">

Clone the Repository.

```shell title="~/.zshrc" showLineNumbers
git clone https://github.com/z-shell/zzcomplete.git \
  ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/zzcomplete
```

And add `zzcomplete` to your plugin list.

  </TabItem>
  <TabItem value="standalone" label="Standalone" default>

Clone the Repository.

```shell showLineNumbers
git clone https://github.com/z-shell/zzcomplete \
  ~/some/path/to/zzcomplete
```

And add the following to your `.zshrc` file.

```shell title="~/.zshrc"
source ~/path/to/zzcomplete/zzcomplete.plugin.zsh
```

  </TabItem>
</Tabs>

<!-- end-of-file -->
<!-- links -->

[z-shell/zui]: https://github.com/z-shell/zui
[z-shell/zzcomplete]: https://github.com/z-shell/zzcomplete
