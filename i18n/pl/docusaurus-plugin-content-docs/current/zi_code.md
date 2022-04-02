---
id: code
title: '🔖 Code documentation'
description: The documentation lists all functions, interactions between them, their comments, and features.
keywords:
  - code
  - documentation
---

import APITable from '@site/src/components/APITable';

:::info

Documentation automatically updated every `Thursday 4:30 UTC` at [z-shell/docs][1].

:::

<!-- markdownlint-disable MD013 -->

<APITable>

| File                 |           Documentation           | Description                                                   |
| -------------------- | :-------------------------------: | ------------------------------------------------------------- |
| [zi.zsh][2]          |  [adoc][3], [pdf][4], [html][5]   | The main script which is always loaded, in `.zshrc`           |
| [side.zsh][6]        |  [adoc][7], [pdf][8], [html][9]   | Functions, loaded by `install.zsh` and `autoload.zsh` scripts |
| [install.zsh][10]    | [adoc][11], [pdf][12], [html][13] | Functions used only when installing a plugin or snippet       |
| [autoload.zsh][14]   | [adoc][15], [pdf][16], [html][17] | Functions used only in interactive `ZI` invocations           |
| [additional.zsh][18] | [adoc][19], [pdf][20], [html][21] | Additonal support for functions                               |

</APITable>
<APITable>

| File                                | Description                                                                                                                                                                                             |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Zsh Plugin Standart][22]           | Proposed enhancements and codifications of the definition of a "Zsh the plugin" and the actions of plugin managers – standardization. The document covers the information on how to write a Zsh plugin. |
| [Zsh Native Scripting Handbook][23] | Handbook to keep Zsh constructs that are fast, robust, and do not depend on external tools. Such code is similar to Ruby or Perl and less like top-down shell scripts.                                  |

</APITable>

<!-- markdownlint-enable MD013 -->

[1]: https://github.com/z-shell/docs
