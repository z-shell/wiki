---
id: snippets
title: '🔺 Snippets'
description: The Collection of Snippets
keywords: [collection, snippets]
---

:::info

Related:

1. [Ice: svn](/docs/guides/syntax/ice#svn)
2. [Ice: multisrc'…'](/docs/guides/syntax/ice#the-multisrc-ice)

:::

### SC: [OMZ::lib](https://github.com/ohmyzsh/ohmyzsh/tree/master/lib)

```shell
zi ice svn pick"completion.zsh" src"git.zsh"
zi snippet OMZ::lib
```

```shell
zi ice svn pick"completion.zsh" multisrc'git.zsh \
    functions.zsh {history,grep}.zsh'
zi snippet OMZ::lib
```

### SC: [OMZ::plugin/osx](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/osx)

```shell
zi ice svn
zi snippet OMZ::plugins/osx
```

### SC: [z-shell/z](https://github.com/z-shell/z)

```shell
zi lucid light-mode for pick"z.sh" z-shell/z
```
