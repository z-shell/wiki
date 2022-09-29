---
id: zsh-modules
title: ⚙️ Modules
image: /img/png/theme/z/320x320.png
description: Plugins & Modules Introduction
toc_max_heading_level: 3
keywords:
  - plugins
  - modules
  - zmodules
  - zsh-modules
  - zsh-plugins
---

<!-- @format -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## <i class="fa-brands fa-github"></i> [z-shell/zpmod][]

The module is a binary Zsh module, think about the `zmodload` Zsh command, it's that topic, which transparently and automatically **compiles sourced scripts**.

Many plugin managers do not offer a compilation of plugins, the module is a solution to this. Even if a plugin manager does compile the plugin's main script (like Zi does).

### Install zpmod

:::note

This script can be used with most plugin managers and [Zi][] is not required.

:::

<Tabs>
  <TabItem value="zi" label="Zi" default>

:::tip

[Zi][] users can build the module by issuing the following command instead of running the above `build.sh` script.

:::

```shell
zi module build
```

This command will compile the module and display instructions on what to add to `~/.zshrc`.

  </TabItem>
  <TabItem value="standalone" label="Standalone">

Install just the **standalone** binary which can be used with any other plugin manager.

```shell
sh -c "$(curl -fsSL https://git.io/get-zi)" -- -a zpmod
```

This script will display what to add to `~/.zshrc` (2 lines) and show usage instructions.

  </TabItem>
</Tabs>

#### Measuring Time of sources

Besides the compilation feature, the module also measures **duration** of each script sourcing.

Issue `zpmod source-study` after loading the module at top of `~/.zshrc` to see a list of all sourced files with the time the sourcing took in milliseconds on the left.

This feature allows profiling the shell startup. Also, no script can pass through that check and you will obtain a complete list of all loaded scripts, like if Zshell itself was investigating this.

**The list can be surprising.**

#### Debugging

To enable debug messages from the module set:

```shell
typeset -g ZI_MOD_DEBUG=1
```

## <i class="fa-brands fa-github"></i> [z-shell/zgdbm][]

Provides GDBM module as a plugin.

`zstyles` - The values being set are the defaults.

:::note

Change the values before loading the `zgdbm` plugin.

:::

```shell title="~/.zshrc" showLineNumbers
zstyle ":plugin:zgdbm" cppflags "-I/usr/local/include"  # Additional include directory
zstyle ":plugin:zgdbm" cflags "-Wall -O2 -g"            # Additional CFLAGS
zstyle ":plugin:zgdbm" ldflags "-L/usr/local/lib"       # Additional library directory
```

### Install zgdbm

```shell
zi light z-shell/zgdbm
```

<!-- end-of-file -->
<!-- links -->
<!-- external -->

[z-shell/zpmod]: https://github.com/z-shell/zpmod
[zi]: https://github.com/z-shell/zi
[z-shell/zgdbm]: https://github.com/z-shell/zgdbm
