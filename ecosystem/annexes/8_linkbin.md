---
id: linkbin
title: "🌀 Link Bin"
image: /img/png/theme/z/320x320.png
description: Annex - Link Bin documentation.
keywords:
  - annex
  - zannex
  - linkbin
  - link-binary
---

<!-- @format -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@docusaurus/Link';

An annex exposes a binary program without modifying `$PATH` – `z-a-linkbin` and automatically creates a hard or soft link to the binary at `$ZPFX/bin` exposing the program to the command line as if it were being placed in `$PATH`.

The command can then be accessed normally – not only in the live Zsh session but also from any Zsh script. The ice-modifier `lbin''` provided by the annex creates `links` for binaries and scripts.

It creates the `link` that calls the actual binary. The link is created always under the same, standard and single `$PATH` entry: `$ZPFX/bin`

## Soft link

:::note

The optional preceding `!` flag means creating a soft link instead of a hard link.

:::

Example:

```shell {2} showLineNumbers
zi ice from'gh-r' as'program' \
  lbin'!fzf'
zi load junegunn/fzf
```

Check the output:

```shell showLineNumbers
ls -l $ZPFX/bin/ | awk '{print $(NF-2),$(NF-1),$NF}'
fzf --version
```

## Hard link

:::note

The ice-modifier can contain globs as it will expand these when searching for the binary.

:::

Example:

```shell {2} showLineNumbers
zi ice from'gh-r' as'program' \
  lbin'**fzf -> myfzf'
zi load junegunn/fzf
```

Check the output:

```shell
ls -l $ZPFX/bin/ | awk '{print $(NF-2),$(NF-1),$NF}'
myfzf --version
```

## Auto nickname link

If ice-modifier [id-as](/docs/guides/syntax/standard#id-as) is empty, then will try to create the link with a nickname as follows:

1. Trailing component of the `id-as` ice-modifier, e.g.: `id-as'exts/git-my'` → it will check if a file `git-my` exists and if yes, create the link `git-my`.
2. The plugin name, e.g.: for `paulirish/git-open` it'll check if a file `git-open` exists and if yes, create the link `git-open`.
3. Trailing component of the snippet URL.
4. For any alphabetically first executable file.

The above also applies if just `!` were passed.

## Install linkbin {#install-linkbin}

:::info Source

- <Link className="github-link" href="https://github.com/z-shell/z-a-linkbin">z-shell/z-a-linkbin</Link>

:::

<Tabs>
  <TabItem value="default" label="Default" default>

Add the following snippet in the `.zshrc` file:

```shell
zi light z-shell/z-a-linkbin
```

</TabItem>
</Tabs>

This will register the `lbin'…'` ice-modifier.
