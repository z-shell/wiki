---
id: intro
slug: /
title: 🎉 Introduction
sidebar_position: 1
image: /img/png/theme/z/320x320.png
description: Introduction to a Swiss Army Knife for Zsh, formerly known as zplugin, zinit.
---

<!-- @format -->

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import Link from '@docusaurus/Link'; import Image from '@theme/IdealImage'; import ImgShow from '@site/src/components/ImgShow'; import ZGitImg from '@site/static/img/png/theme/branch_box.png';

<Image alt="Z-Shell" width="100%" height="auto" img={ZGitImg} />

<Tabs>
  <TabItem value="gems" label="RubyGems">

The [RubyGems](https://rubygems.org) and [$GEM_HOME](https://guides.rubygems.org/command-reference/#gem-environment) are automatically managed by the [bin-gem-node](/ecosystem/annexes/bin-gem-node) annex or installed by the [any-gem](https://github.com/z-shell/any-gem) package.

  </TabItem>
  <TabItem value="node" label="Node">

The [Node](https://www.npmjs.com) modules and [$NODE_PATH](https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders) are automatically managed by the [bin-gem-node](/ecosystem/annexes/bin-gem-node) annex or installed by the [any-node](https://github.com/z-shell/any-node) package.

  </TabItem>
  <TabItem value="pip" label="Python">

The [Python](https://python.org) modules, [$VIRTUALENV](https://docs.python.org/3/tutorial/venv.html) are automatically managed by the [bin-gem-node](/ecosystem/annexes/bin-gem-node) annex.

  </TabItem>
  <TabItem value="rust" label="Rust">

The [Rust](https://crates.io) packages are managed by the [rust](/ecosystem/annexes/rust) annex.

  </TabItem>
  <TabItem value="github" label="GitHub" default>

Install and control almost everything from GitHub: [Annexes](/ecosystem/category/-annexes), [Packages](/ecosystem/category/-packages), [Gallery of Invocations](/community/gallery/collection).

  </TabItem>
</Tabs>

## <i class="fa-solid fa-spinner fa-spin-pulse"></i> Fast and feature-rich

- [Meta plugins][meta-plugins] allow installing groups of plugins via a single, friendly label.
- [Packages](/ecosystem/category/-packages) offload the user from providing long and complex commands.
- [Annexes](ecosystem/category/-annexes) allow extending the plugin manager with new features.
- [Turbo][turbo-mode-zsh--53] mode yields **50-80%** faster Zsh startup.

## <i className="fa-beat" class="fa-solid fa-heart fa-beat"></i> Neat and flexible

- [Customize paths][customizing-paths], use [multiple prompts][multiple-prompts] or create [your own][non-github-local-plugins] plugins.
- Supports [Oh My Zsh][oh-my-zsh-prezto] and [Prezto][oh-my-zsh-prezto] plugins and libraries. ([migration][]).
- Does not use `$FPATH`, loading multiple plugins doesn't clutter `$FPATH` with the same number of entries, e.g: 10, 15, or more.
- Code is immune to `KSH_ARRAYS` and other options typically causing compatibility problems.
- Do not require `sudo`, and provide many workarounds e.g: setting so-called **shims** locally.

## <i className="fa-beat-fade" class="fa-solid fa-circle-info fa-beat-fade"></i> Familiarize and control

- [Visualize and manage][commands] elements of the plugin:
  - **aliases**, **functions**, **bindkeys**, **zle widgets**, **completions**, **variables**.
- Quickly [familiarize][reports-and-statistics] yourself with rich and easy-to-digest information.
- [Load or unload][loading-and-unloading] plugins, use the ability to [manage][completions-management] completions.
- Docker [playground][], test or propose configurations.

## <i class="fa-solid fa-list-check"></i> Summary

<Link href="https://github.com/orgs/z-shell">
  <ImgShow alt="Z-Shell Metrics" width="100%" height="auto" img="https://raw.githubusercontent.com/z-shell/.github/main/metrics/plugin/metrics.svg" />
  <ImgShow alt="Z-Shell Repositories" width="100%" height="auto" img="https://raw.githubusercontent.com/z-shell/.github/main/metrics/plugin/repositories_metrics.svg" />
  <ImgShow alt="Z-Shell FollowUp" width="100%" height="auto" img="https://raw.githubusercontent.com/z-shell/.github/main/metrics/plugin/followup/followup.svg" />
  <ImgShow alt="Z-Shell Stargazers" width="100%" height="auto" img="https://raw.githubusercontent.com/z-shell/.github/main/metrics/plugin/stargazers/worldmap.svg" />
</Link>

<!-- end-of-file -->
<!-- links -->

[commands]: /docs/guides/commands
[completions-management]: /docs/guides/commands#completions-management
[customizing-paths]: /docs/guides/customization#customizing-paths
[loading-and-unloading]: /docs/guides/commands#loading-and-unloading
[meta-plugins]: /search?q=meta+plugins
[migration]: /docs/getting_started/migration
[multiple-prompts]: /docs/guides/customization#multiple-prompts
[non-github-local-plugins]: /docs/guides/customization#non-github-local-plugins
[oh-my-zsh-prezto]: /docs/getting_started/overview#oh-my-zsh-prezto
[reports-and-statistics]: /docs/guides/commands#reports-and-statistics
[turbo-mode-zsh--53]: /docs/getting_started/overview#turbo-mode-zsh--53

<!-- external -->

[playground]: https://github.com/z-shell/playground
