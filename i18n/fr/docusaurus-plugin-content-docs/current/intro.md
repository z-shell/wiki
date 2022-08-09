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

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';
import Link from '@docusaurus/Link';
import Image from '@theme/IdealImage';
import ZGitImg from '@site/static/img/png/z_git.png';

<span className="ScreenView">
  <Image className="ImageView" img={ZGitImg} />
</span>
<span className="ScreenView">
  <Link href="https://github.com/orgs/z-shell/">
  <img
    className="ImageView"
    width="1000"
    height="500"
    alt="Z-Shell Organization Stats"
    src="https://raw.githubusercontent.com/z-shell/.github/main/metrics/metrics.svg"
  />
  </Link>
</span>

<Tabs>
  <TabItem value="gems" label="RubyGems">

The [RubyGems](https://rubygems.org) and [$GEM_HOME](https://guides.rubygems.org/command-reference/#gem-environment) are automatically managed by the [bin-gem-node](/ecosystem/annexes/bin-gem-node) annex or installed by the [any-gem](https://github.com/z-shell/any-gem) package.

  </TabItem>
  <TabItem value="node" label="Node">

Les modules [Node](https://www.npmjs.com) et [$NODE_PATH](https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders) sont automatiquement gérés par l'annexe [bin-gem-node](/ecosystem/annexes/bin-gem-node) ou installés par le paquet [any-node](https://github.com/z-shell/any-node).

  </TabItem>
  <TabItem value="pip" label="Python">

Les modules [Python](https://python.org), [$VIRTUALENV](https://docs.python.org/3/tutorial/venv.html) sont automatiquement gérés par l'annexe [bin-gem-node](/ecosystem/annexes/bin-gem-node).

  </TabItem>
  <TabItem value="rust" label="Rust">

Les paquets [Rust](https://crates.io) sont gérés par l'annexe [rust](/ecosystem/annexes/rust).

  </TabItem>
  <TabItem value="github" label="GitHub" default>

Install and control almost everything from [GitHub](https://github.com): [Annexes](/ecosystem/annexes), [Packages](/ecosystem/packages), [Gallery of Invocations](/community/gallery/collection).

</TabItem>
</Tabs>

## <i class="fa-solid fa-spinner fa-spin-pulse"></i> Rapide et riche en fonctionnalités

- [Les meta plugins][16] permettent d'installer des groupes de plugins via une étiquette unique et conviviale.
- [Packages](/ecosystem/packages) offload the user from providing long and complex commands.
- [Annexes](/ecosystem/annexes) allow extend the plugin manager with new commands.
- [Turbo][8] mode yields **50-80%** faster Zsh startup.

## <i className="fa-beat" class="fa-solid fa-heart fa-beat"></i> Soigné et flexible

- [Customize paths][9], use [multiple prompts][10] or create [your own][11] plugins.
- Supports [Oh My Zsh][oh-my-zsh] and [Prezto][] plugins and libraries. ([migration][]).
- Does not use `$FPATH`, loading multiple plugins doesn't clutter `$FPATH` with the same number of entries, e.g: 10, 15, or more.
- Le code est immunisé contre `KSH_ARRAYS` et d'autres options causant généralement des problèmes de compatibilité.
- Ne nécessite pas `sudo`, et fournit de nombreuses solutions de contournement, par exemple: définir les **shims** localement.

## <i className="fa-beat-fade" class="fa-solid fa-circle-info fa-beat-fade"></i> Familiarisez-vous et contrôlez

- Visualiser les données: **alias**, **fonctions**, **bindkeys**, **Widgets Zle**, **zstyles**, **complétions**, **variables**, `$PATH`et `$FPATH` qu'un plugin a configurés.
- Familiarisez-vous rapidement avec un nouveau plugin et fournissez des informations riches et faciles à digérer qui pourraient être utiles à diverses occasions.
- [Chargez ou déchargez les plugins][14] , utilisez la capacité de [gestion][15] des complétions.
- Un [terrain de jeu][] docker, pour tester ou proposer des configurations.

## <i class="fa-solid fa-list-check"></i> Récapitulatif

<span className="ScreenView">
  <Link href="https://github.com/orgs/z-shell/projects/">
  <img
    className="ImageView"
    loading="lazy"
    width="1000"
    height="500"
    alt="Z-Shell Organization FollowUp"
    src="https://raw.githubusercontent.com/z-shell/.github/main/metrics/plugin/followup/followup.svg"
  />
  </Link>
</span>

<!-- end-of-file -->
<!-- links -->

[8]: /docs/getting_started/overview#turbo-mode-zsh--53
[9]: /docs/guides/customization#customizing-paths
[10]: /docs/guides/customization#multiple-prompts
[11]: /docs/guides/customization#non-github-local-plugins
[oh-my-zsh]: /docs/getting_started/overview#oh-my-zsh-prezto
[Prezto]: /docs/getting_started/overview#oh-my-zsh-prezto
[migration]: /docs/getting_started/migration
[14]: /docs/guides/commands#loading-and-unloading
[15]: /docs/guides/commands#completions-management
[16]: /search?q=meta+plugins
[terrain de jeu]: https://github.com/z-shell/playground
