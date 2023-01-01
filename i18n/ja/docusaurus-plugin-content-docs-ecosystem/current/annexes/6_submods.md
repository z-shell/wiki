---
id: submods
title: "🌀 Submods"
image: /img/png/theme/z/320x320.png
description: 別館 - Submodsのドキュメント
keywords:
  - annex
  - zannex
  - submods
---

<!-- @format -->

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import Link from '@docusaurus/Link';

この別館は、プラグインやスニペットをインストールする際に、追加のサブモジュールをクローンする機能を提供します。 その後、 `zi update …` コマンドでサブモジュールが自動的に更新されます。

概要:

```shell
submods'{user}/{plugin} -> {output directory}; …'
```

`zsh-autosuggestions` を [Prezto module](/docs/getting_started/migration#pzt-modules) `autosuggestions`経由で読み込むための、別館 とその ice-modifier を利用したコマンド例です。

```shell title="~/.zshrc" showLineNumbers
zi ice svn submods'zsh-users/zsh-autosuggestions -> external'
zi snippet PZT::modules/autosuggestions
```

## submodsのインストール {#install-submods}

:::info Source

- <Link className="github-link" href="https://github.com/z-shell/z-a-submods">z-shell/z-a-submods</Link>

:::

<Tabs>
  <TabItem value="default" label="Default" default>

`.zshrc` ファイルに以下のスニペットを追加します:

```shell
zi light z-shell/z-a-submods
```

</TabItem>
</Tabs>

これにより、 `submods'…'` ice 修飾子が登録されます。
