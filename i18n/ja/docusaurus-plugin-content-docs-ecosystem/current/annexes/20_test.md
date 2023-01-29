---
id: test
title: "🌀 テスト"
hide_title: false
hide_table_of_contents: false
image: /img/png/theme/z/320x320.png
description: 別館 - テスト用ドキュメント
keywords:
  - annex
  - test
draft: true
---

<!-- @format -->

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import Link from '@docusaurus/Link'; import ImgShow from '@site/src/components/ImgShow';

別館は、リポジトリで設定されている場合`zunit` と `make` のテストを実行します。

<ImgShow width={1000} height={900} img="https://user-images.githubusercontent.com/59910950/162143845-c44ead50-b21a-46c0-8372-18325eb1f33a.gif" alt="Annex - z-a-test preview" />

他のプラグインと同様に読み込むだけで、アクティブになります。

```shell
zi light z-shell/z-a-test
```

<details>
  <summary>📖 <b>Configuration</b></summary>

テストを冗長モードで実行するには、次のようにします。

```shell
zstyle :zi:annex:test quiet 0
```

インストールやアップデートの前に、一つのプラグインのテストをスキップするには、 `notest` ice修飾子を追加します。

```shell showLineNumbers
zi ice notest
zi load …
```

</details>
