---
id: intro
slug: /
title: "🎉 Introduction"
sidebar_position: 1
image: /img/logo/320x320.png
description: Introduction à un couteau suisse pour Zsh, anciennement connu sous le nom de zplugin, zinit.
keywords:
  - introduction
  - features
  - synopsis
  - overview
  - welcome
---

<!-- @format -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@docusaurus/Link';
import Image from '@theme/IdealImage';
import ImgShow from '@site/src/components/ImgShow';
import ZGitImg from '@site/static/img/png/z_git.png';

<Image img={ZGitImg} />
<Link href="https://github.com/orgs/z-shell/">
<ImgShow
  alt="Z-Shell Organization Stats" width="100%" height="auto"
  img="https://raw.githubusercontent.com/z-shell/.github/main/metrics/metrics.svg"
/>
</Link>

<Tabs>
<TabItem value="gems" label="RubyGems">

Les modules [RubyGems](https://rubygems.org) et [\$GEM_HOME](https://guides.rubygems.org/command-reference/#gem-environment) sont automatiquement gérés par l’annexe [bin-gem-node](/ecosystem/annexes/bin-gem-node) ou installée par le paquet [any-gem](https://github.com/z-shell/any-gem).

</TabItem>
<TabItem value="node" label="Node">

Les modules [Node](https://www.npmjs.com) et [\$NODE_PATH](https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders) sont automatiquement gérés par l'annexe [bin-gem-node](/ecosystem/annexes/bin-gem-node) ou installés par le paquet [any-node](https://github.com/z-shell/any-node).

</TabItem>
<TabItem value="pip" label="Python">

Les modules [Python](https://python.org), [\$VIRTUALENV](https://docs.python.org/3/tutorial/venv.html) sont automatiquement gérés par l'annexe [bin-gem-node](/ecosystem/annexes/bin-gem-node).

</TabItem>
<TabItem value="rust" label="Rust">

Les paquets [Rust](https://crates.io) sont gérés par l'annexe [rust](/ecosystem/annexes/rust).

</TabItem>
<TabItem value="github" label="GitHub" default>

Install and control almost everything from GitHub: [Annexes](/ecosystem/category/-annexes), [Packages](/ecosystem/category/-packages), [Gallery of Invocations](/community/gallery/collection).

</TabItem>
</Tabs>

## <i class="fa-solid fa-spinner fa-spin-pulse"></i> Rapide et riche en fonctionnalités

- [Les meta plugins][meta-plugins] permettent d'installer des groupes de plugins via une étiquette unique et conviviale.
- [Les paquets](/ecosystem/category/-packages) dispensent l'utilisateur de fournir des commandes longues et complexes.
- [Les annexes](ecosystem/category/-annexes) permettent d'étendre le gestionnaire de plugins avec de nouvelles commandes.
- [Turbo][turbo-mode-zsh--53] mode yields **50-80%** faster Zsh startup.

## <i className="fa-beat" class="fa-solid fa-heart fa-beat"></i> Soigné et flexible

- [Customize paths][customizing-paths], use [multiple prompts][multiple-prompts] or create [your own][non-github-local-plugins] plugins.
- Supports [Oh My Zsh][oh-my-zsh-prezto] and [Prezto][oh-my-zsh-prezto] plugins and libraries. ([migration][]).
- Does not use `$FPATH`, loading multiple plugins doesn't clutter `$FPATH` with the same number of entries, e.g: 10, 15, or more.
- Le code est immunisé contre `KSH_ARRAYS` et d'autres options causant généralement des problèmes de compatibilité.
- Ne nécessite pas `sudo`, et fournit de nombreuses solutions de contournement, par exemple: définir les **shims** localement.

## <i className="fa-beat-fade" class="fa-solid fa-circle-info fa-beat-fade"></i> Familiarisez-vous et contrôlez

- Visualiser les données: **alias**, **fonctions**, **mappages de touches**, **Widgets Zle**, **zstyles**, **complétions**, **variables**, `$PATH`et `$FPATH` qu'un plugin a configurés.
- Familiarisez-vous rapidement avec un nouveau plugin et fournissez des informations riches et faciles à digérer qui pourraient être utiles à diverses occasions.
- [Chargez ou déchargez les plugins][loading-and-unloading] , utilisez la capacité de [gestion][completions-management] des complétions.
- Un [terrain de jeu][] docker, pour tester ou proposer des configurations.

## <i class="fa-solid fa-list-check"></i> Récapitulatif

<Link href="https://github.com/orgs/z-shell/projects/">
<ImgShow
  alt="Z-Shell Organization FollowUp" width="100%" height="auto"
  img="https://raw.githubusercontent.com/z-shell/.github/main/metrics/plugin/followup/followup.svg"
/>
</Link>

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

[terrain de jeu]: https://github.com/z-shell/playground
