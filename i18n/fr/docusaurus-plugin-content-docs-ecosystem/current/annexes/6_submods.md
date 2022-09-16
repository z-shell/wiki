---
id: submods
title: "🌀 Submods"
image: /img/logo/320x320.png
description: Annexe-Documentation des sous-modules.
keywords:
  - annex
  - zannex
  - submods
---

<!-- @format -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@docusaurus/Link';

Une annexe offre la possibilité de cloner des sous-modules supplémentaires tout en installant un plugin ou un snippet. The submodules are then automatically updated on the `zi update …` command.

Synopsis:

```shell
submods'{user}/{plugin} -> {output directory}; …'
```

An example command utilizing the annex and its ice-modifier to load `zsh-autosuggestions` plugin via [Prezto module](/docs/getting_started/migration#pzt-modules) `autosuggestions`.

```shell title="~/.zshrc" showLineNumbers
zi ice svn submods'zsh-users/zsh-autosuggestions -> external'
zi snippet PZT::modules/autosuggestions
```

## Install submods {#install-submods}

:::info Source

- <Link className="github-link" href="https://github.com/z-shell/z-a-submods">z-shell/z-a-submods</Link>

:::

<Tabs>
  <TabItem value="default" label="Default" default>

Add the following snippet in the `.zshrc` file:

```shell
zi light z-shell/z-a-submods
```

</TabItem>
</Tabs>

This will register the `submods'…'` ice-modifier.