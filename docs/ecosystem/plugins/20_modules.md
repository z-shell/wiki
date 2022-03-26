---
id: modules
title: ⚙️ Modules
image: zw/logo/320x320.png
description: Zsh Modules Documentation
keywords: [modules, zsh]
---

## Module [zpmod][1]

[![👾 CodeQL][2]][2-1]

The module is a binary Zsh module, think about `zmodload` Zsh command, it's that topic, which transparently and
automatically **compiles sourced scripts**.

Many plugin managers do not offer a compilation of plugins, the module is a solution to this. Even if a plugin manager
does compile the plugin's main script (like ZI does).

## Install standalone zpmod

Install just the **standalone** binary which can be used with any other plugin manager.

:::note

This script can be used with most plugin managers and [ZI][3] is not required.

:::

```shell
bash <(curl -fsSL https://raw.githubusercontent.com/z-shell/zpmod/HEAD/build.sh)
```

This script will display what to add to `~/.zshrc` (2 lines) and show usage instructions.

### With [ZI][3]

:::tip

[ZI][3] users can build the module by issuing the following command instead of running the above `build.sh` script.

:::

```shell
zi module build
```

This command will compile the module and display instructions on what to add to `~/.zshrc`.

## Measuring Time of sources

Besides the compilation feature, the module also measures **duration** of each script sourcing.

Issue `zpmod source-study` after loading the module at top of `~/.zshrc` to see a list of all sourced files with the
time the sourcing took in milliseconds on the left.

This feature allows profiling the shell startup. Also, no script can pass through that check and you will obtain a
complete list of all loaded scripts, like if Zshell itself was investigating this.

**The list can be surprising.**

## Debugging

To enable debug messages from the module set:

```shell
typeset -g ZI_MOD_DEBUG=1
```

## Module [zgdbm][4]

Provides GDBM module as plugin

`zstyles` - The values being set are the defaults. Change the values before loading zgdbm plugin.

```shell title="~/.zshrc"
zstyle ":plugin:zgdbm" cppflags "-I/usr/local/include"  # Additional include directory
zstyle ":plugin:zgdbm" cflags "-Wall -O2 -g"            # Additional CFLAGS
zstyle ":plugin:zgdbm" ldflags "-L/usr/local/lib"       # Additional library directory
```

[1]: https://github.com/z-shell/zpmod
[2]: https://github.com/z-shell/zpmod/actions/workflows/codeql-analysis.yml/badge.svg
[2-1]: https://github.com/z-shell/zpmod/actions/workflows/codeql-analysis.yml
[3]: https://github.com/z-shell/zi
[4]: https://github.com/z-shell/zgdbm
