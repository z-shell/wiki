---
id: patch-dl
title: "🌀 Patch DL"
image: /img/png/theme/z/320x320.png
description: Annex - Patch DL documentation
keywords:
  - annex
  - zannex
  - patch-dl
---

<!-- @format -->

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import Link from '@docusaurus/Link';

An annex downloads files and applies patches and adds two ice-modifiers:

1番目

```shell
zi ice dl'{URL} [-> {optional-output-file-name}]; …' …
```

2番目

```shell
zi ice patch'{file-name-with-the-patch-to-apply}; …' …
```

The annex will download the given `{URL}` under the path `{optional-output-file-name}` (if no file name given, then it is taken from last segment of the URL) in case of the `dl'…'` ice-modifier, and apply a patch given by the `{file-name-with-the-patch-to-apply}` in case of the `patch'…'` ice-modifier. You can use this functionality to download and apply patches.

例えば、 `fbterm`をインストールする場合、2つのパッチが必要です。1つは動作を修正するためのもの、もう1つはビルドを修正するためのものです。

```shell showLineNumbers
zi ice as"command" pick"$ZPFX/bin/fbterm" \
  dl"https://bugs.archlinux.org/task/46860?getfile=13513 -> ins.patch" \
  dl"https://aur.archlinux.org/cgit/aur.git/plain/0001-Fix-build-with-gcc-6.patch?h=fbterm-git" \
    patch"ins.patch; 0001-Fix-build-with-gcc-6.patch" \
      atclone"./configure --prefix=$ZPFX" \
      atpull"%atclone" make"install" reset
zi load izmntuk/fbterm
```

このコマンドを実行すると、次のようになります。

![fbtermの例](https://raw.githubusercontent.com/z-shell/z-a-patch-dl/main/docs/images/fbterm-ex.png#center)

## patch-dlのインストール

:::info Source

- <Link className="github-link" href="https://github.com/z-shell/z-a-patch-dl">z-shell/z-a-patch-dl</Link>

:::

<Tabs>
  <TabItem value="default" label="Default" default>

Add the following snippet in the `.zshrc` file:

```shell
zi light z-shell/z-a-patch-dl
```

</TabItem>
</Tabs>

This will register the `dl'…'` and `patch'…'` ice-modifiers.
