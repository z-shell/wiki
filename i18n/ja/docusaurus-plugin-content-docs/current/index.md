---
id: intro
slug: /
title: '🎉 はじめに'
sidebar_position: 1
image: /img/png/theme/z/320x320.png
description: Zshのためのスイスアーミーナイフ（旧称：zplugin, zinit）の紹介。
---

<!-- @format -->

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import Link from '@docusaurus/Link'; import Image from '@theme/IdealImage'; import ImgShow from '@site/src/components/ImgShow'; import ZGitImg from '@site/static/img/png/theme/branch_box.png';

<Image alt="Z-Shell" width="100%" height="auto" img={ZGitImg} />

<Tabs>
  <TabItem value="gems" label="RubyGems">

[RubyGems](https://rubygems.org) と [$GEM_HOME](https://guides.rubygems.org/command-reference/#gem-environment) は、 [bin-gem-node](/ecosystem/annexes/bin-gem-node) 別館によって自動的に管理されるか、 [any-gem](https://github.com/z-shell/any-gem) パッケージによってインストールされます。

  </TabItem>
  <TabItem value="node" label="Node">

[Node](https://www.npmjs.com) モジュールと [$NODE_PATH](https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders) は [bin-gem-node](/ecosystem/annexes/bin-gem-node) 別館で自動的に管理されるか、 [any-node](https://github.com/z-shell/any-node) パッケージでインストールされます。

  </TabItem>
  <TabItem value="pip" label="Python">

[Python](https://python.org) モジュール、[$VIRTUALENV](https://docs.python.org/3/tutorial/venv.html) は [bin-gem-node](/ecosystem/annexes/bin-gem-node) 別館により自動的に管理されます。

  </TabItem>
  <TabItem value="rust" label="Rust">

[Rust](https://crates.io) パッケージは [rust](/ecosystem/annexes/rust) 別館によって管理されています。

  </TabItem>
  <TabItem value="github" label="GitHub" default>

[Annexes](/ecosystem/category/-annexes), [Packages](/ecosystem/category/-packages), [Gallery of Invocations](/community/gallery/collection): GitHubからほとんどすべてのものをインストールし、制御することができます。

  </TabItem>
</Tabs>

## <i class="fa-solid fa-spinner fa-spin-pulse"></i> 高速かつ豊富な機能

- [Meta plugins][meta-plugins] により、一つのラベル名からプラグインのグループを一括インストールすることができます。
- [パッケージ](/ecosystem/category/-packages) により長くて複雑なコマンドの入力からユーザーを解放します。
- [Annexes (別館)](ecosystem/category/-annexes) により 、プラグインマネージャ自体を新しい機能で拡張することができます。
- [Turbo][turbo-mode-zsh--53] モードでは、 Zsh の起動が **50-80%** 速くなります。

## <i className="fa-beat" class="fa-solid fa-heart fa-beat"></i> 端正で柔軟。

- [pathのカスタマイズ][customizing-paths]、 [複数のプロンプトの使用][multiple-prompts] 、または独自の [][non-github-local-plugins] プラグインの作成ができます。
- [Oh My Zsh][oh-my-zsh-prezto] と [Prezto][oh-my-zsh-prezto] のプラグインとライブラリに対応しています。 ([移行][]).
- `$FPATH`を使用しません。複数のプラグインをロードしても、同じエントリ数（10、15、またはそれ以上）で `$FPATH` が乱雑になることはありません。
- コードは、通常互換性の問題を引き起こす `KSH_ARRAYS` やその他のオプションの影響を受けません。
- `sudo`を要求せず、多くの回避策を提供します。例えば、いわゆる **shims** をローカルに設定します。

## <i className="fa-beat-fade" class="fa-solid fa-circle-info fa-beat-fade"></i> 熟知し、コントロールする

- [プラグイン][commands] を可視化し、管理します。
  - **aliases**, **functions**, **bindkeys**, **zle widgets**, **completions**, **variables**.
- 豊かで簡単な情報で、すばやく [理解][reports-and-statistics] できます。
- 補完の[管理][completions-management] を プラグインの [ロードまたはアンロード][loading-and-unloading] で行えます。
- [Docker プレイグラウンド][]で構成をテストしたり提案できます。

## <i class="fa-solid fa-list-check"></i> 概要

<Link href="https://github.com/orgs/z-shell">
  <ImgShow alt="Z-Shell Metrics" width="100%" height="auto" img="https://raw.githubusercontent.com/z-shell/.github/main/metrics/plugin/metrics.svg" />
  <ImgShow alt="Z-Shell Repositories" width="100%" height="auto" img="https://raw.githubusercontent.com/z-shell/.github/main/metrics/plugin/repositories_metrics.svg" />
  <ImgShow alt="Z-Shell FollowUp" width="100%" height="auto" img="https://raw.githubusercontent.com/z-shell/.github/main/metrics/plugin/followup/followup.svg" />
  <ImgShow alt="Z-Shell Stargazers" width="100%" height="auto" img="https://raw.githubusercontent.com/z-shell/.github/main/metrics/plugin/stargazers/worldmap.svg" />
</Link>

<!-- end-of-file -->
<!-- links -->



<!-- external -->

[commands]: /docs/guides/commands
[completions-management]: /docs/guides/commands#completions-management
[customizing-paths]: /docs/guides/customization#customizing-paths
[loading-and-unloading]: /docs/guides/commands#loading-and-unloading
[meta-plugins]: /search?q=meta+plugins
[移行]: /docs/getting_started/migration
[multiple-prompts]: /docs/guides/customization#multiple-prompts
[non-github-local-plugins]: /docs/guides/customization#non-github-local-plugins
[non-github-local-plugins]: /docs/guides/customization#non-github-local-plugins
[oh-my-zsh-prezto]: /docs/getting_started/overview#oh-my-zsh-prezto
[oh-my-zsh-prezto]: /docs/getting_started/overview#oh-my-zsh-prezto
[reports-and-statistics]: /docs/guides/commands#reports-and-statistics
[turbo-mode-zsh--53]: /docs/getting_started/overview#turbo-mode-zsh--53

[Docker プレイグラウンド]: https://github.com/z-shell/playground
