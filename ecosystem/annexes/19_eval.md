---
id: eval
title: "🌀 Eval"
image: /img/logo/320x320.png
description: Annex - Eval documentation.
keywords:
  - annex
  - zannex
  - eval
---

<!-- @format -->

<!-- TODO: Add image/video/code examples -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@docusaurus/Link';
import Highlight from "@site/src/components/Highlight";

The output of a slow initialization command is redirected to a file located within the plugin or snippets directory and sourced while loading. The next time the plugin or snippet is loaded, this file will be sourced skipping the need to run the initialization command.

The ice-modifier `eval'…'` provided and handled by this annex creates a `cache` in the plugin or snippets directory which stores the output of the command and the cache is regenerated when:

1. The plugin or snippet is updated.
2. The cache file is removed.
3. When running `zi recache`.

:::note

The optional preceding `!` flag means to store command output regardless of exit code. Otherwise `eval'…'` will avoid caching the output of code which returns a non-zero exit code.

:::

## Example invocations

<Tabs>
  <TabItem value="no-eval+zi" label="No Eval + Zi" default>

```shell showLineNumbers
zi ice as"command" from"gh-r" \
  atclone"./zoxide init --cmd x zsh > init.zsh" \
  atpull"%atclone" src"init.zsh" nocompile'!'
zi light ajeetdsouza/zoxide
```

```shell showLineNumbers
zi ice atclone"dircolors -b LS_COLORS > init.zsh" \
  atpull"%atclone" pick"init.zsh" nocompile'!' \
  atload'zstyle ":completion:*" list-colors “${(s.:.)LS_COLORS}”'
zi light trapd00r/LS_COLORS
```

  </TabItem>
  <TabItem value="eval+zi" label="Eval + Zi">

```shell {2} showLineNumbers
zi ice as"command" from"gh-r" \
  eval"./zoxide init --cmd x zsh"
zi light ajeetdsouza/zoxide
```

```shell {1} showLineNumbers
zi ice eval"dircolors -b LS_COLORS" \
  atload'zstyle ":completion:*" list-colors “${(s.:.)LS_COLORS}”'
zi light trapd00r/LS_COLORS
```

  </TabItem>
</Tabs>
<Tabs>
  <TabItem value="no-zi-eval" label="No Zi + Eval">

```shell showLineNumbers
if [[ "${+commands[kubectl]}" == 1 ]]; then
  eval $(kubectl completion zsh)
fi
```

  </TabItem>
  <TabItem value="zi+eval" label="Zi + Eval">

```shell {2} showLineNumbers
zi ice id-as"kubectl_completion" has"kubectl" \
  eval"kubectl completion zsh" run-atpull
zi light z-shell/null
```

  </TabItem>
</Tabs>

## Install eval {#install-eval}

:::info Source

- <Link className="github-link" href="https://github.com/z-shell/z-a-eval">z-shell/z-a-eval</Link>

:::

<Tabs>
  <TabItem value="default" label="Default" default>

Add the following snippet in the `.zshrc` file:

```shell
zi light z-shell/z-a-eval
```

  </TabItem>
  <TabItem value="tab-completion" label="Enable Completion">

Add the following snippet in the `.zshrc` file:

> Set value `Z_A_USECOMP=1` to enable <kbd>TAB</kbd> completion for subcommand `recache`.

```shell showLineNumbers
zi ice atinit'Z_A_USECOMP=1'
zi light z-shell/z-a-eval
```

  </TabItem>
</Tabs>

This will register subcommand `recache` and `eval'…'` ice-modifier.
