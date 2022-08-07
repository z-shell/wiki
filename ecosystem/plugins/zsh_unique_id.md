---
id: zsh-unique-id
title: ⚙️ Zsh Unique ID
image: /img/logo/320x320.png
description: Provides a **unique number** that identifies a **running** Zshell session.
keywords:
  - zsh-unique-id
  - zsh-plugin
  - unique-id
  - zplugin
---

<!-- @format -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Highlight from "@site/src/components/Highlight";

## <i class="fa-brands fa-github"></i> [z-shell/zsh-unique-id][]

This plugin provides a **unique number** that identifies a **running** Z shell session, in its shell variable `$ZUID_ID`. Besides this unique number, also a unique _codename_ is provided, in the shell variable `$ZUID_CODENAME`. Once you load this plugin, the two parameters will be set, and their values will not be available to other Zshell sessions (being thus _unique_). `$ZUID_ID` is a progressing number starting from `1`. `$ZUID_CODENAME` is chosen from a list of predefined codenames, see the default list below. An example use case is to hold logs in files `.../mylog-${ZUID_CODENAME}.log` so that two different Z shells will not write to the same file at the same time.

Default codenames are:

- <Highlight>atlantis</Highlight> (for `ZUID_ID` == `1`)
- <Highlight>echelon</Highlight> (for `ZUID_ID` == `2`)
- <Highlight>quantum</Highlight> (for `ZUID_ID` == `3` and etc.)
- <Highlight>ion</Highlight>
- <Highlight>proxima</Highlight>
- <Highlight>polaris</Highlight>
- <Highlight>solar</Highlight>
- <Highlight>momentum</Highlight>
- <Highlight>hyper</Highlight>
- <Highlight>gloom</Highlight>
- <Highlight>velocity</Highlight>
- <Highlight>future</Highlight>
- <Highlight>enigma</Highlight>
- <Highlight>andromeda</Highlight>
- <Highlight>saturn</Highlight>
- <Highlight>jupiter</Highlight>
- <Highlight>aslan</Highlight>
- <Highlight>commodore</Highlight>
- <Highlight>falcon</Highlight>
- <Highlight>persepolis</Highlight>
- <Highlight>dharma</Highlight>
- <Highlight>samsara</Highlight>
- <Highlight>prodigy</Highlight>
- <Highlight>ethereal</Highlight>
- <Highlight>epiphany</Highlight>
- <Highlight>aurora</Highlight>
- <Highlight>oblivion</Highlight>

Zstyle configuration allows to customize the codenames:

```shell
zstyle :plugin:zuid codenames paper metal wood plastic # first 4 shells will have those codenames
```

## Install Zsh Unique ID

<Tabs>
  <TabItem value="standalone" label="Standalone" default>

Unpack `zsh-unique-id` to the chosen location and add to `.zshrc`:

```shell
source {where-zsh-unique-id-is}/zsh-unique-id.plugin.zsh
```

Sourcing is recommended, because it can be done early, at top of zshrc, without a plugin manager – to acquire the unique identification as early as possible.

  </TabItem>
  <TabItem value="zi" label="Zi">

Add the following to your `.zshrc` file. Zi will clone the plugin the next time you start zsh. To update issue `zi update z-shell/zsh-unique-id`.

```shell
zi load z-shell/zsh-unique-id
```

  </TabItem>
  <TabItem value="zgen" label="Zgen">

Add `zgen load z-shell/zsh-unique-id` to your .zshrc file in the same place you're doing your other `zgen load` calls in.

  </TabItem>
  <TabItem value="oh-my-zsh" label="Oh-My-Zsh">

Clone the Repository:

```shell
git clone https://github.com/z-shell/zsh-unique-id.git \
${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/zsh-unique-id
```

And add `zsh-unique-id` to your plugin list.

  </TabItem>
</Tabs>

<!-- end-of-file -->
<!-- links -->

[z-shell/zsh-unique-id]: https://github.com/z-shell/zsh-unique-id
