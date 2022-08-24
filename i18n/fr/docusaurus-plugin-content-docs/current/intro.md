---
id: intro
slug: /
title: "🎉 Introduction"
sidebar_position: 1
image: /img/logo/320x320.png
description: Introduction à un couteau suisse pour Zsh, anciennement connu sous le nom de zplugin, zinit.
keywords:
  - introduction
  - caractéristiques de zi
  - à propos de zi
---

<!-- @format -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@docusaurus/Link';
import Image from '@theme/IdealImage';
import ZGitImg from '@site/static/img/png/z_git.png';

<div className="ScreenView">
  <Image className="ImageView" img={ZGitImg} />
  <Link href="https://github.com/orgs/z-shell/">
  <Image
    className="ImageView"
    width="1000"
    height="500"
    alt="Z-Shell Organization Stats"
    img="https://raw.githubusercontent.com/z-shell/.github/main/metrics/metrics.svg"
  />
  </Link>
</div>

<Tabs>
  <TabItem value="gems" label="RubyGems">

The [RubyGems](https://rubygems.org) and [\$GEM_HOME](https://guides.rubygems.org/command-reference/#gem-environment) are automatically managed by the [bin-gem-node](/ecosystem/annexes/bin-gem-node) annex or installed by the [any-gem](https://github.com/z-shell/any-gem) package.

  </TabItem>
  <TabItem value="node" label="Node">

The [Node](https://www.npmjs.com) modules and [\$NODE_PATH](https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders) are automatically managed by the [bin-gem-node](/ecosystem/annexes/bin-gem-node) annex or installed by the [any-node](https://github.com/z-shell/any-node) package.

  </TabItem>
  <TabItem value="pip" label="Python">

The [Python](https://python.org) modules, [\$VIRTUALENV](https://docs.python.org/3/tutorial/venv.html) are automatically managed by the [bin-gem-node](/ecosystem/annexes/bin-gem-node) annex.

  </TabItem>
  <TabItem value="rust" label="Rust">

Les paquets [Rust](https://crates.io) sont gérés par l'annexe [rust](/ecosystem/annexes/rust).

  </TabItem>
  <TabItem value="github" label="GitHub" default>

Install and control almost everything from GitHub: [Annexes](/ecosystem/annexes/overview), [Packages](/ecosystem/packages/synopsis), [Gallery of Invocations](/community/gallery/collection).

</TabItem>
</Tabs>

## <i class="fa-solid fa-spinner fa-spin-pulse"></i> Rapide et riche en fonctionnalités

- [Meta plugins][meta-plugins] allow installing groups of plugins via a single, friendly label.
- [Les paquets](/ecosystem/packages/synopsis) dispensent l'utilisateur de fournir des commandes longues et complexes.
- [Les annexes](/ecosystem/annexes/overview) permettent d'étendre le gestionnaire de plugins avec de nouvelles commandes.
- [Turbo][turbo-mode-zsh--53] mode yields **50-80%** faster Zsh startup.

## <i className="fa-beat" class="fa-solid fa-heart fa-beat"></i> Soigné et flexible

- [Customize paths][customizing-paths], use [multiple prompts][multiple-prompts] or create [your own][non-github-local-plugins] plugins.
- Supports [Oh My Zsh][oh-my-zsh-prezto] and [Prezto][oh-my-zsh-prezto] plugins and libraries. ([migration][]).
- Does not use `$FPATH`, loading multiple plugins doesn't clutter `$FPATH` with the same number of entries, e.g: 10, 15, or more.
- Le code est immunisé contre `KSH_ARRAYS` et d'autres options causant généralement des problèmes de compatibilité.
- Ne nécessite pas `sudo`, et fournit de nombreuses solutions de contournement, par exemple: définir les **shims** localement.

## <i className="fa-beat-fade" class="fa-solid fa-circle-info fa-beat-fade"></i> Familiarisez-vous et contrôlez

- Visualize data: **aliases**, **functions**, **bindkeys**, **Zle widgets**, **zstyles**, **completions**, **variables**, `$PATH`, and `$FPATH` elements a plugin has set up.
- Familiarisez-vous rapidement avec un nouveau plugin et fournissez des informations riches et faciles à digérer qui pourraient être utiles à diverses occasions.
- [Load or unload][loading-and-unloading] plugins, use the ability to [manage][completions-management] completions.
- Docker [playground][], test or propose configurations.

## <i class="fa-solid fa-list-check"></i> Récapitulatif

<div className="ScreenView">
  <Link href="https://github.com/orgs/z-shell/projects/">
  <Image
    className="ImageView"
    width="1000"
    height="500"
    alt="Z-Shell Organization FollowUp"
    img="https://raw.githubusercontent.com/z-shell/.github/main/metrics/plugin/followup/followup.svg"
  />
  </Link>
</div>

<!-- end-of-file -->
<!-- links -->



<!-- external -->

[turbo-mode-zsh--53]: /docs/getting_started/overview#turbo-mode-zsh--53
[customizing-paths]: /docs/guides/customization#customizing-paths
[multiple-prompts]: /docs/guides/customization#multiple-prompts
[non-github-local-plugins]: /docs/guides/customization#non-github-local-plugins
[oh-my-zsh-prezto]: /docs/getting_started/overview#oh-my-zsh-prezto
[oh-my-zsh-prezto]: /docs/getting_started/overview#oh-my-zsh-prezto
[migration]: /docs/getting_started/migration
[loading-and-unloading]: /docs/guides/commands#loading-and-unloading
[completions-management]: /docs/guides/commands#completions-management
[meta-plugins]: /search?q=meta+plugins

[playground]: https://github.com/z-shell/playground
