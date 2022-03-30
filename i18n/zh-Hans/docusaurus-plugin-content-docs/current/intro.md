---
id: intro
title: '🎉 介绍'
sidebar_position: 1
image: zw/logo/320x320.png
description: 对 Zsh 上的瑞士军刀的介绍，正式名称为 zplugin 或 zinit。
keywords:
  - introduction
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import Image from '@theme/IdealImage';
import ZGitImg from '@site/static/zw/img/z_git.png';

<Image className="ScreenView" img={ZGitImg} alt='Install almost everything from GitHub' />

<div align="center">
<a href="https://github.com/z-shell">
  <img
    className="ScreenViewFull"
    src="https://raw.githubusercontent.com/z-shell/.github/main/metrics/metrics.svg"
    alt="Z-Shell Organization"
  />
</a>
</div>

<Tabs>
  <TabItem value="gems" label="RubyGems">

[RubyGems](https://rubygems.org) 以及 [$GEM_HOME](https://guides.rubygems.org/command-reference/#gem-environment) 被 [bin-gem-node][1] annex 自动管理，或由 [any-gem][2] 包安装。

  </TabItem>
  <TabItem value="node" label="Node">

[Node](https://www.npmjs.com) 组件和 [$NODE_PATH](https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders) 被 [bin-gem-node][1] annex 自动管理，或由 [any-node][3] 安装。

  </TabItem>
  <TabItem value="pip" label="Python">

[Python](https://python.org) 组件和 [$VIRTUALENV](https://docs.python.org/3/tutorial/venv.html) 被 [bin-gem-node][1] annex 自动管理。

  </TabItem>
  <TabItem value="rust" label="Rust">

[Rust](https://crates.io) 包被 [rust annex][4] 自动管理。

  </TabItem>
  <TabItem value="github" label="GitHub" default>

从 [GitHub]（https://github.com）安装和控制几乎所有东西。[Annexes][5]、[包管理][6]、[用例示范][7]。

</TabItem>
</Tabs>

---

## ⚡️ 快速且功能丰富

- [元插件][16]允许用户通过一个友好的标签安装插件组。
- [Packages][6] 减轻了用户提供冗长复杂命令的负担。
- [Annexes][5] 允许在插件管理器的基础上拓展新命令。
- [Turbo][8] 模式加速了 **50-80%** 的 Zsh 启动速度。

## ☑️ 整洁且灵活

- [Customize paths][9], use [multiple prompts][10] or create [your own][11] plugins.
- 支持添加 [Oh My Zsh][12] 和 [Prezto][12] 的插件和库。 （[迁移][13]） ([migration][13]).
- 不使用 `$FPATH`，加载多个插件不会污染 `$FPATH`，不会添加相同数量的条目，如 10 个 15 个，或者更多。
- 代码不受 `KSH_ARRAYS` 或其他可能导致兼容性问题的选项影响。
- 不需要 `sudo`，或提供所谓的变通方法，如：在本地设置 **shims**。

## 📈 熟悉和控制

- 可视化数据：包含 **aliases**, **functions**, **bindkeys**, **Zle widgets**, **zstyles**, **completions**, **variables**, `$PATH`, 以及 `$FPATH` 的插件已经预装。
- 快速熟悉一个新的插件，并提供丰富和容易理解的信息，在各种场合下都会有帮助。
- [加载或卸载][14]插件，使用该功能[管理][15]补全。

- Docker [试验场](https://github.com/z-shell/playground)，测试或提交配置，通过 [asciinema.org](https://asciinema.org/a/459358) 预览.

## 📢 摘要

<!-- markdownlint-disable -->

<div align="center">
<a href="https://github.com/orgs/z-shell/projects">
  <img
    className="ScreenView"
    src="https://raw.githubusercontent.com/z-shell/.github/main/metrics/plugin/projects/projects.svg"
    alt="Z-Shell Projects"
  />
</a>
<a href="https://github.com/z-shell/">
  <img
    className="ScreenViewFull"
    src="https://raw.githubusercontent.com/z-shell/.github/main/metrics/plugin/followup/followup.svg"
    alt="Z-Shell Indepth"
  />
</a>
<a href="https://github.com/z-shell/zw">
  <img
    className="ScreenViewFull"
    src="https://raw.githubusercontent.com/z-shell/.github/main/metrics/plugin/pagespeed/detailed.svg"
    alt="ZW PageSpeed"
  />
</a>
</div>

<!-- markdownlint-restore -->

[5]: /docs/ecosystem/annexes
[6]: /docs/ecosystem/packages/packages-overview
[12]: /docs/getting_started/overview#oh-my-zsh-prezto
[12]: /docs/getting_started/overview#oh-my-zsh-prezto
[8]: /docs/getting_started/overview#turbo-mode-zsh--53
[13]: /docs/getting_started/migration
[13]: /docs/getting_started/migration
[9]: /docs/guides/customization#customizing-paths
[10]: /docs/guides/customization#multiple-prompts
[16]: /search?q=meta+plugins
[11]: /docs/guides/customization#non-github-local-plugins
[14]: /docs/guides/commands#loading-and-unloading
[15]: /docs/guides/commands#completions-management
