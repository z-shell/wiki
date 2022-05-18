---
id: intro
title: '🎉Introduction'
sidebar_position: 1
image: img/logo/320x320.png
description: 对 Zsh 上的瑞士军刀的介绍，正式名称为 zplugin 或 zinit。
keywords:
  - introduction
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';
import Image from '@theme/IdealImage';
import ZGitImg from '@site/static/img/png/z_git.png';

<Image className="ScreenView" img={ZGitImg} />

[![Z-Shell Organization Stats](https://github.zshell.dev/.github/metrics.svg#center)](https://github.com/z-shell)

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

从 [GitHub]（https://github.com）安装和控制几乎所有东西。 [Annexes][5]、[包管理][6]、[用例示范][7]。

</TabItem>
</Tabs>

## <i class="fa-solid fa-spinner fa-spin-pulse"></i> Fast and feature-rich

- [Meta plugins][16] allow installing groups of plugins via a single, friendly label.
- [Packages][6] offload the user from providing long and complex commands.
- [Annexes][5] allow to extend the plugin manager with new commands.
- [Turbo][8] mode yields **50-80%** faster Zsh startup.

## <i className="fa-beat" class="fa-solid fa-heart fa-beat"></i> Neat and flexible

- [Customize paths][9], use [multiple prompts][10] or create [your own][11] plugins.
- Supports [Oh My Zsh][12] and [Prezto][12] plugins and libraries. ([migration][13]).
- Does not use `$FPATH`, loading multiple plugins doesn't clutter `$FPATH` with the same number of entries, e.g: 10, 15, or more.
- Code is immune to `KSH_ARRAYS` and other options typically causing compatibility problems.
- 不需要 `sudo`，或提供所谓的变通方法，如：在本地设置 **shims**。

## <i className="fa-beat-fade" class="fa-solid fa-circle-info fa-beat-fade"></i> Familiarize and control

- Visualise data: **aliases**, **functions**, **bindkeys**, **Zle widgets**, **zstyles**, **completions**, **variables**, `$PATH`, and `$FPATH` elements a plugin has set up.
- Quickly familiarize oneself with a new plugin and provides rich and easy-to-digest information that might be helpful on various occasions.
- [Load or unload][14] plugins, use the ability to [manage][15] completions.
- Docker [playground](https://github.com/z-shell/playground), test or propose configurations.

## <i class="fa-solid fa-list-check"></i> 摘要

[![Z-Shell Projects](https://raw.githubusercontent.com/z-shell/.github/main/metrics/plugin/projects/projects.svg#center)](https://github.com/orgs/z-shell/projects) <br /> [![Z-ShellOrganization](https://raw.githubusercontent.com/z-shell/.github/main/metrics/plugin/followup/followup.svg#center)](https://github.com/z-shell/) <br />

[5]: /ecosystem/annexes
[6]: /ecosystem/packages
[8]: /docs/getting_started/overview#turbo-mode-zsh--53
[9]: /docs/guides/customization#-customizing-paths
[10]: /docs/guides/customization#-multiple-prompts
[11]: /docs/guides/customization#-non-github-local-plugins
[12]: /docs/getting_started/overview#oh-my-zsh-prezto
[12]: /docs/getting_started/overview#oh-my-zsh-prezto
[13]: /docs/getting_started/migration
[14]: /docs/guides/commands#loading-and-unloading
[15]: /docs/guides/commands#completions-management
[16]: /search?q=meta+plugins
