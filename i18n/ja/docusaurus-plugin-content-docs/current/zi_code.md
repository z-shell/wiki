---
id: code
title: "🔖 コードドキュメント"
image: /img/png/theme/z/320x320.png
description: 文書には、すべての機能、それらの間の相互作用、それらのコメント、および機能が示されています。
keywords:
  - code
  - zi-code
  - documentation
  - code-explained
---

<!-- @format -->

import APITable from '@site/src/components/APITable';

:::info

[z-shell/docs][] にあるドキュメントは、 `木曜日` の `4:30 UTC` に自動的に更新されます。

:::

```mdx-code-block
<APITable>
```

| ファイル                 | ドキュメントの様式                         | 説明                                                 |
| -------------------- | --------------------------------- | -------------------------------------------------- |
| [zi.zsh][2]          | [adoc][3], [pdf][4], [html][5]    | `.zshrc`で常に読み込まれるメインスクリプト                          |
| [side.zsh][6]        | [adoc][7], [pdf][8], [html][9]    | `install.zsh` および `autoload.zsh` スクリプトによって読み込まれる関数 |
| [install.zsh][10]    | [adoc][11], [pdf][12], [html][13] | プラグインまたはスニペットをインストールする場合にのみ使用される関数                 |
| [autoload.zsh][14]   | [adoc][15], [pdf][16], [html][17] | 対話型 `Zi` 呼び出しでのみ使用される関数                            |
| [additional.zsh][18] | [adoc][19], [pdf][20], [html][21] | 関数に対する追加サポート                                       |

```mdx-code-block
</APITable>
```

<!-- end-of-file -->
<!-- links -->
<!-- external -->

[z-shell/docs]: https://github.com/z-shell/docs
[2]: https://github.com/z-shell/zi/blob/main/zi.zsh
[3]: https://github.com/z-shell/docs/blob/main/code/zsdoc/asciidoc/zi.zsh.adoc
[4]: https://github.com/z-shell/docs/blob/main/code/zsdoc/pdf/zi.zsh.pdf
[5]: https://z-shell.github.io/docs/code/html/zi.zsh.html
[6]: https://github.com/z-shell/zi/blob/main/lib/zsh/side.zsh
[7]: https://github.com/z-shell/docs/blob/main/code/zsdoc/asciidoc/side.zsh.adoc
[8]: https://github.com/z-shell/docs/blob/main/code/zsdoc/pdf/side.zsh.pdf
[9]: https://z-shell.github.io/docs/code/html/side.zsh.html
[10]: https://github.com/z-shell/zi/blob/main/lib/zsh/install.zsh
[11]: https://github.com/z-shell/docs/blob/main/code/zsdoc/asciidoc/install.zsh.adoc
[12]: https://github.com/z-shell/docs/blob/main/code/zsdoc/pdf/install.zsh.pdf
[13]: https://z-shell.github.io/docs/code/html/install.zsh.html
[14]: https://github.com/z-shell/zi/blob/main/lib/zsh/autoload.zsh
[15]: https://github.com/z-shell/docs/blob/main/code/zsdoc/asciidoc/autoload.zsh.adoc
[16]: https://github.com/z-shell/docs/blob/main/code/zsdoc/pdf/autoload.zsh.pdf
[17]: https://z-shell.github.io/docs/code/html/autoload.zsh.html
[18]: https://github.com/z-shell/zi/blob/main/lib/zsh/additional.zsh
[19]: https://github.com/z-shell/docs/blob/main/code/zsdoc/asciidoc/additional.zsh.adoc
[20]: https://github.com/z-shell/docs/blob/main/code/zsdoc/pdf/additional.zsh.pdf
[21]: https://z-shell.github.io/docs/code/html/additional.zsh.html
