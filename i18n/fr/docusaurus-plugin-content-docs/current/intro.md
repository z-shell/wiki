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

[RubyGems](https://rubygems.org) et [$GEM_HOME][] sont automatiquement gérés par l'annexe [bin-gem-node][1] ou installés par le paquet [any-gem][2] .

  </TabItem>
  <TabItem value="node" label="Node">

Les modules [Node](https://www.npmjs.com) et [$NODE_PATH][] sont automatiquement gérés par l'annexe [bin-gem-node][1] ou installés par le paquet [any-node][3] .

  </TabItem>
  <TabItem value="pip" label="Python">

Les modules [Python](https://python.org), [$VIRTUALENV][] sont automatiquement gérés par l'annexe [bin-gem-node][1] .

  </TabItem>
  <TabItem value="rust" label="Rust">

Les paquets [Rust](https://crates.io) sont gérés par l'annexe [rust][4].

  </TabItem>
  <TabItem value="github" label="GitHub" default>

Install and control almost everything from [GitHub](https://github.com): [Annexes][5], [Packages][6], [Gallery of Invocations][7].

</TabItem>
</Tabs>

## <i class="fa-solid fa-spinner fa-spin-pulse"></i> Rapide et riche en fonctionnalités

- [Meta plugins][16] allow installing groups of plugins via a single, friendly label.
- [Les paquets][6] dispensent l'utilisateur de fournir des commandes longues et complexes.
- [Les annexes][5] permettent d'étendre le gestionnaire de plugins avec de nouvelles commandes.
- [Le mode Turbo][8] permet un démarrage de Zsh 50-80% plus rapide de \*\*\*\*.

## <i className="fa-beat" class="fa-solid fa-heart fa-beat"></i> Soigné et flexible

- [Customize paths][9], use [multiple prompts][10] or create [your own][11] plugins.
- Prend en charge les plugins et bibliothèques [Oh My Zsh][12] et [Prezto][12] . ([migration][13]).
- N'utilise pas `$FPATH`, le chargement de plusieurs plugins n'encombre pas `$FPATH` avec le même nombre d'entrées, par exemple : 10, 15, ou plus.
- Le code est immunisé contre `KSH_ARRAYS` et d'autres options causant généralement des problèmes de compatibilité.
- Ne nécessite pas `sudo`, et fournit de nombreuses solutions de contournement, par exemple: définir les **shims** localement.

## <i className="fa-beat-fade" class="fa-solid fa-circle-info fa-beat-fade"></i> Familiarisez-vous et contrôlez

- Visualise data: **aliases**, **functions**, **bindkeys**, **Zle widgets**, **zstyles**, **completions**, **variables**, `$PATH`, and `$FPATH` elements a plugin has set up.
- Quickly familiarize oneself with a new plugin and provides rich and easy-to-digest information that might be helpful on various occasions.
- [Load or unload][14] plugins, use the ability to [manage][15] completions.
- Docker [playground][], tester ou proposer des configurations.

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

[5]: /ecosystem/annexes
[6]: /ecosystem/packages
[8]: /docs/getting_started/overview#turbo-mode-zsh--53
[13]: /docs/getting_started/migration
[9]: /docs/guides/customization#-customizing-paths
[10]: /docs/guides/customization#multiple-prompts
[16]: /search?q=meta+plugins
[11]: /docs/guides/customization#non-github-local-plugins
[12]: /docs/getting_started/overview#oh-my-zsh-prezto
[12]: /docs/getting_started/overview#oh-my-zsh-prezto
[14]: /docs/guides/commands#loading-and-unloading
[15]: /docs/guides/commands#completions-management
[playground]: https://github.com/z-shell/playground
