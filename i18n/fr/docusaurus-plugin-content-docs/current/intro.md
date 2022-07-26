---
id: intro
slug: /
title: "🎉 Introduction"
sidebar_position: 1
image: img/logo/320x320.png
description: Introduction à un couteau suisse pour Zsh, anciennement connu sous le nom de zplugin, zinit.
keywords:
  - introduction
  - caractéristiques de zi
  - à propos de zi
---

<!-- @format -->

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';
import Link from '@docusaurus/Link';
import Image from '@theme/IdealImage';
import ZGitImg from '@site/static/img/png/z_git.png';

<div className="ScreenView">
  <Image img={ZGitImg} />
</div>
<div className="ScreenView">
  <Link href="https://github.com/orgs/z-shell/">
    <img
      height="auto"
      width="90%"
      alt="Statistiques de l'organisation Z-Shell"
      src="https://raw.githubusercontent.com/z-shell/.github/main/metrics/metrics.svg"
     />
  </Link>
</div>

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

Install and control almost everything from [GitHub](https://github.com): [Annexes](/ecosystem/annexes), [Packages](/ecosystem/packages), [Gallery of Invocations](/community/gallery/collection).

</TabItem>
</Tabs>

## <i class="fa-solid fa-spinner fa-spin-pulse"></i> Rapide et riche en fonctionnalités

- [Meta plugins][16] allow installing groups of plugins via a single, friendly label.
- [Packages](/ecosystem/packages) offload the user from providing long and complex commands.
- [Annexes](/ecosystem/annexes) allow to extend the plugin manager with new commands.
- [Turbo][8] mode yields **50-80%** faster Zsh startup.

## <i className="fa-beat" class="fa-solid fa-heart fa-beat"></i> Soigné et flexible

- [Customize paths][9], use [multiple prompts][10] or create [your own][11] plugins.
- Supports [Oh My Zsh][oh-my-zsh] and [Prezto][prezto] plugins and libraries. ([migration][migration]).
- N'utilise pas `$FPATH`, le chargement de plusieurs plugins n'encombre pas `$FPATH` avec le même nombre d'entrées, par exemple : 10, 15, ou plus.
- Le code est immunisé contre `KSH_ARRAYS` et d'autres options causant généralement des problèmes de compatibilité.
- Ne nécessite pas `sudo`, et fournit de nombreuses solutions de contournement, par exemple: définir les **shims** localement.

## <i className="fa-beat-fade" class="fa-solid fa-circle-info fa-beat-fade"></i> Familiarisez-vous et contrôlez

- Visualise data: **aliases**, **functions**, **bindkeys**, **Zle widgets**, **zstyles**, **completions**, **variables**, `$PATH`, and `$FPATH` elements a plugin has set up.
- Quickly familiarize oneself with a new plugin and provides rich and easy-to-digest information that might be helpful on various occasions.
- [Load or unload][14] plugins, use the ability to [manage][15] completions.
- Docker [playground][], test or propose configurations.

## <i class="fa-solid fa-list-check"></i> Récapitulatif

<div className="ScreenView">
  <Link href="https://github.com/orgs/z-shell/projects/">
    <img
      height="auto"
      width="90%"
      alt="Suivi de l'organisation Z-Shell"
      src="https://raw.githubusercontent.com/z-shell/.github/main/metrics/plugin/followup/followup.svg"
    />
  </Link>
</div>

<!-- end-of-file -->

[8]: /docs/getting_started/overview#turbo-mode-zsh--53
[9]: /docs/guides/customization#customizing-paths
[10]: /docs/guides/customization#multiple-prompts
[11]: /docs/guides/customization#non-github-local-plugins
[oh-my-zsh]: /docs/getting_started/overview#oh-my-zsh-prezto
[prezto]: /docs/getting_started/overview#oh-my-zsh-prezto
[migration]: /docs/getting_started/migration
[14]: /docs/guides/commands#loading-and-unloading
[15]: /docs/guides/commands#completions-management
[16]: /search?q=meta+plugins
[playground]: https://github.com/z-shell/playground
