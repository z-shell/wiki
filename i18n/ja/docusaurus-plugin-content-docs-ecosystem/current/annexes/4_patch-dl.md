---
id: patch-dl
title: "🌀 Patch DL"
image: /img/png/theme/z/320x320.png
description: 別館 - Patch DLのドキュメント
keywords:
  - annex
  - patch-dl
---

<!-- @format -->

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import Link from '@docusaurus/Link'; import ImgShow from '@site/src/components/ImgShow';

この別館では、ファイルのダウンロードとパッチの適用をする、2つのice修飾子の追加を行います。

1番目

```shell
zi ice dl'{URL} [-> {optional-output-file-name}]; …' …
```

2番目

```shell
zi ice patch'{file-name-with-the-patch-to-apply}; …' …
```

この別館は、 `dl'…'` ice修飾子を指定した場合、 `{URL}` を `{optional-output-file-name}` で指定されたパスにダウンロードします(ファイル名が指定されていない場合は、URLの最後のセグメントから取得されます)。 `patch...` を指定した場合は `{file-name-with-the-patch-to-apply}` によって与えられたパッチを適用します。 この機能を利用して、パッチのダウンロードや適用を行うことができます。

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

<ImgShow img="/img/png/content/annex/patch-dl/fbterm-ex.png" alt="fbterm" />

## patch-dlのインストール {#install-patch-dl}

:::info Source

- <Link className="github-link" href="https://github.com/z-shell/z-a-patch-dl">z-shell/z-a-patch-dl</Link>

:::

<Tabs>
  <TabItem value="default" label="Default" default>

`.zshrc` ファイルに以下のスニペットを追加します:

```shell
zi light z-shell/z-a-patch-dl
```

</TabItem>
</Tabs>

これにより、 `dl'…'` と `patch'…'` ice修飾子が登録されます。
