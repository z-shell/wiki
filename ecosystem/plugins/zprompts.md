---
id: zprompts
title: ⚙️ ZPrompts
image: /img/logo/320x320.png
description: Zsh themes (prompts) that use original Zsh theming subsystem.
keywords:
  - zsh-plugin
  - zsh-prompt
  - zsh-theme
  - prompt
---

<!-- @format -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ImgShow from '@site/src/components/ImgShow';

## <i class="fa-brands fa-github"></i> [z-shell/zprompts][]

Zsh themes (prompts) that use original Zsh theming subsystem.

The previews demonstrate:

- ability to change prompt’s colors and other traits (original Zsh feature)
- information on the age of unstaged changes
- list of oldest unstaged modified files in the repo (3 files, starting from the oldest)

<ImgShow
  img="https://cdn.zshell.dev/img/asciicast/gif/zsh/zprompts.gif"
  alt="Zprompts Preview"
/>

<ImgShow
  img="https://cdn.zshell.dev/img/asciicast/gif/zsh/zprompts_theming.gif"
  alt="Zprompts Theming Preview"
/>

## Install Zprompts

<Tabs>
  <TabItem value="zi" label="Zi" default>

Add the following to your `.zshrc` file with prefered theme e.g:

```shell {2} showLineNumbers
zi nocd for \
  atload'!promptinit; typeset -g PSSHORT=0; prompt sprint3 yellow red green blue' \
    z-shell/zprompts
```

  </TabItem>
  <TabItem value="standalone" label="Standalone">

To use load the plugin:

```shell
source {where-zprompts-is}/zprompts.plugin.zsh
```

and then invoke (to use theme `scala3`) e.g.:

```shell showLineNumbers
  promptinit
  prompt scala3
```

  </TabItem>
</Tabs>

Please submit your prompt if you find a time to write the `prompt_NAME_setup` file.

## Help for the prompts

Each prompt has its help available, e.g. for the theme `scala`:

```shell title="prompt -h scala"
This prompt is themable. You can invoke it in following way:
prompt scala <prompt, default is ":: "> <prompt color> <path color> <vcs info color>
You can provide only N first arguments, N=1..4.
The default invocation is: ":: " cyan cyan magenta
```

<!-- end-of-file -->
<!-- links -->
<!-- external -->

[z-shell/zprompts]: https://github.com/z-shell/zprompts
