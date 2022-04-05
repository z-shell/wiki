---
id: code
title: '🔖 代码文档'
description: 文档列出了所有函数，以及它们之间的交互，注释和功能。
keywords:
  - code
  - documentation
---

import APITable from '@site/src/components/APITable';

:::info

Documentation automatically updated every `Thursday 4:30 UTC` at [z-shell/docs][].

:::

<!-- markdownlint-disable MD013 -->

<APITable>

| File                 |           Documentation           | Description                                                   |
| -------------------- | :-------------------------------: | ------------------------------------------------------------- |
| [zi.zsh][]          |  [adoc][3], [pdf][4], [html][5]   | The main script which is always loaded, in `.zshrc`           |
| [side.zsh][]        |  [adoc][7], [pdf][8], [html][9]   | Functions, loaded by `install.zsh` and `autoload.zsh` scripts |
| [install.zsh][]    | [adoc][11], [pdf][12], [html][13] | Functions used only when installing a plugin or snippet       |
| [autoload.zsh][]   | [adoc][15], [pdf][16], [html][17] | Functions used only in interactive `ZI` invocations           |
| [additional.zsh][] | [adoc][19], [pdf][20], [html][21] | Additonal support for functions                               |

</APITable>
<APITable>

| File                                | Description                                                                                                                                                                                             |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Zsh Plugin Standart][]           | Proposed enhancements and codifications of the definition of a "Zsh the plugin" and the actions of plugin managers – standardization. 该文档涵盖了如何编写 Zsh 插件的信息。 |
| [Zsh Native Scripting Handbook][] | Handbook to keep Zsh constructs that are fast, robust, and do not depend on external tools. 这样的代码类似于 Ruby 或 Perl，而不像过程式的 shell 脚本。                                  |

</APITable>

<!-- markdownlint-enable MD013 -->

[z-shell/docs]: https://github.com/z-shell/docs
