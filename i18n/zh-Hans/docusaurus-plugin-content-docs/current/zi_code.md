---
id: code
title: "🔖 代码文档"
description: 文档列出了所有函数，以及它们之间的交互，注释和功能。
keywords:
  - code
  - zi-code
  - documentation
---

<!-- @format -->

:::info

Documentation is automatically updated every `Thursday` at `4:30 UTC` at [z-shell/docs][].

:::

| File                 | Document format                   | Description                                                   |
| -------------------- | --------------------------------- | ------------------------------------------------------------- |
| [zi.zsh][2]          | [adoc][3], [pdf][4], [html][5]    | The main script which is always loaded, in `.zshrc`           |
| [side.zsh][6]        | [adoc][7], [pdf][8], [html][9]    | Functions, loaded by `install.zsh` and `autoload.zsh` scripts |
| [install.zsh][10]    | [adoc][11], [pdf][12], [html][13] | Functions used only when installing a plugin or snippet       |
| [autoload.zsh][14]   | [adoc][15], [pdf][16], [html][17] | Functions used only in interactive `Zi` invocations           |
| [additional.zsh][18] | [adoc][19], [pdf][20], [html][21] | Additonal support for functions                               |

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
