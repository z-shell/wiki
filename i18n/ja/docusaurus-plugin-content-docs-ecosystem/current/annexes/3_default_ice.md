---
id: default-ice
title: "🌀 Default Ice"
image: /img/png/theme/z/320x320.png
description: 別館 - デフォルト Iceのドキュメント
keywords:
  - annex
  - default-ice
---

<!-- @format -->

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import Link from '@docusaurus/Link';

附属書は、次の `zi` コマンドのために **デフォルトのice** を設定する機能を提供します。例:

デフォルトのiceの設定:

```shell
zi default-ice lucid from"gh-r"
```

これは GitHub リリース (gh-r) からダウンロードされ、デフォルトでは lucid ice も使用します。

```shell showLineNumbers
zi wait for \
  sbin        junegunn/fzf-bin \
  sbin"**/pk" peco/peco
```

:::caution

このサブコマンドを使用して、 `wait` ice をデフォルトにすることはできません。

:::

## `default-ice` {#default-ice}

この別館では、以下のような構文を持つ、サブコマンド `default-ice` を提供します。

```shell showLineNumbers
— default-ice [ -s | -c | -g | -t | -q | -h ]

 [ -s ] - 現在設定されているデフォルトのiceを表示
 [ -c ] - デフォルトのiceをリセット
 [ -g ] - REPLAYハッシュに現在のiceを返す
 [ -t ] - 統計情報を表示
 [ -q ] - すべてのメッセージを隠す
 [ -h ] - このメッセージを表示
```

## default-iceのインストール {#install-default-ice}

:::info Source

- <Link className="github-link" href="https://github.com/z-shell/z-a-default-ice">z-shell/z-a-default-ice</Link>

:::

<Tabs>
  <TabItem value="default" label="Default" default>

`.zshrc` ファイルに以下のスニペットを追加します:

```shell
zi light z-shell/z-a-default-ice
```

  </TabItem>
</Tabs>

これにより、 [default-ice](#default-ice) サブコマンドが登録されます。
