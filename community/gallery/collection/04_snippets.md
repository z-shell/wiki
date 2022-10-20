---
id: snippets
title: "🔺 Snippets"
image: /img/png/theme/z/320x320.png
description: The Collection of Snippets
keywords:
  - collection
  - snippets
---

<!-- @format -->

:::info Related:

1. [Ice: svn](/docs/guides/syntax/ice#the-ice-ice)
2. [Ice: multisrc'…'](/docs/guides/syntax/ice#the-multisrc-ice)

:::

### SC: [OMZ::lib](https://github.com/ohmyzsh/ohmyzsh/tree/master/lib)

```shell showLineNumbers
zi ice svn pick"completion.zsh" src"git.zsh"
zi snippet OMZ::lib
```

```shell showLineNumbers
zi ice svn pick"completion.zsh" multisrc'git.zsh \
    functions.zsh {history,grep}.zsh'
zi snippet OMZ::lib
```

### SC: [OMZ::plugin/osx](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/osx)

```shell showLineNumbers
zi ice svn
zi snippet OMZ::plugins/osx
```
