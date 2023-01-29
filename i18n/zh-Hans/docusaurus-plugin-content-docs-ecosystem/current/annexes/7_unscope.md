---
id: unscope
title: "🌀 Unscope"
image: /img/png/theme/z/320x320.png
description: Annex - Unscope IDs documentation
keywords:
  - annex
  - unscope
---

<!-- @format -->

<!-- TODO: Include image/video/code examples. -->

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import Link from '@docusaurus/Link'; import Highlight from "@site/src/components/Highlight"; import APITable from '@site/src/components/APITable';

An annex allows the installation of plugins without specifying the GitHub user name, as follows:

1. On the installation of a plugin without any slashes (/) in its name the annex will query the GitHub API searching for `*/{the-name}`, sorting on stars.

2. It first requires at least 10 forks on the candidates, then 2, then 0.

3. After finding the best result it sets it as the **full** remote-id of the plugin, storing the ID on disk for later automatic use.

4. For security, for such GH-API request to be made a newly added (by this annex) ice: `ghapi` is required to be given.

5. Otherwise only the static database of mappings of short-plugin nicknames to the full scoped IDs will be searched. It contains many mappings, like, e.g.: `vi-reg → zsh-vi-more/evil-registers`, and some of the popular plugins, like, e.g.: `zsh-syntax-highlighting → zsh-users/zsh-syntax-highlighting` and more.

## Static mappings

:::info

Fill [request](https://github.com/z-shell/z-a-unscope/issues/new/choose) to add new repositories with scoped IDs.

:::

Besides the GitHub-API querying, there's also a fixed, curated list of mappings of short names to the full GitHub IDs:

```mdx-code-block
<APITable>
```

<table spaces-before="0">
  <tr>
    <th align="center">
      Short (Nick-) Name
    </th>
    
    <th align="left">
      GitHub ID / scoped ID
    </th>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> null </Highlight>
    </td>
    
    <td align="left">
      z-shell/null
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> z-a-readurl </Highlight>
    </td>
    
    <td align="left">
      z-shell/z-a-readurl
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> readurl </Highlight>
    </td>
    
    <td align="left">
      z-shell/z-a-readurl
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> rdurl </Highlight>
    </td>
    
    <td align="left">
      z-shell/z-a-readurl
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> z-a-patch-dl </Highlight>
    </td>
    
    <td align="left">
      z-shell/z-a-patch-dl
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> patch-dl </Highlight>
    </td>
    
    <td align="left">
      z-shell/z-a-patch-dl
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> z-a-submods </Highlight>
    </td>
    
    <td align="left">
      z-shell/z-a-submods
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> submods </Highlight>
    </td>
    
    <td align="left">
      z-shell/z-a-submods
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> z-a-rust </Highlight>
    </td>
    
    <td align="left">
      z-shell/z-a-rust
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> rust </Highlight>
    </td>
    
    <td align="left">
      z-shell/z-a-rust
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> z-a-bin-gem-node </Highlight>
    </td>
    
    <td align="left">
      z-shell/z-a-bin-gem-node
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> bin-gem-node </Highlight>
    </td>
    
    <td align="left">
      z-shell/z-a-bin-gem-node
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> bgn </Highlight>
    </td>
    
    <td align="left">
      z-shell/z-a-bin-gem-node
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> meta </Highlight>
    </td>
    
    <td align="left">
      z-shell/z-a-meta-plugins
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> metaplg </Highlight>
    </td>
    
    <td align="left">
      z-shell/z-a-meta-plugins
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> meta-plugins </Highlight>
    </td>
    
    <td align="left">
      z-shell/z-a-meta-plugins
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> archive </Highlight>
    </td>
    
    <td align="left">
      PZTM::archive
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> arch </Highlight>
    </td>
    
    <td align="left">
      PZTM::archive
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> directory </Highlight>
    </td>
    
    <td align="left">
      PZTM::directory
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> dir </Highlight>
    </td>
    
    <td align="left">
      PZTM::directory
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> environment </Highlight>
    </td>
    
    <td align="left">
      PZTM::environment
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> env </Highlight>
    </td>
    
    <td align="left">
      PZTM::environment
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> utility </Highlight>
    </td>
    
    <td align="left">
      PZTM::utility
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> util </Highlight>
    </td>
    
    <td align="left">
      PZTM::utility
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)">fast-syntax-highlighting </Highlight>
    </td>
    
    <td align="left">
      z-shell/fast-syntax-highlighting
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> f-sy-h </Highlight>
    </td>
    
    <td align="left">
      z-shell/fast-syntax-highlighting
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> fsh </Highlight>
    </td>
    
    <td align="left">
      z-shell/fast-syntax-highlighting
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)">history-search-multi-word </Highlight>
    </td>
    
    <td align="left">
      z-shell/history-search-multi-word
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> hsmw </Highlight>
    </td>
    
    <td align="left">
      z-shell/history-search-multi-word
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> zui </Highlight>
    </td>
    
    <td align="left">
      z-shell/zui
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> ZUI </Highlight>
    </td>
    
    <td align="left">
      z-shell/zui
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> zconvey </Highlight>
    </td>
    
    <td align="left">
      z-shell/zconvey
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> zconv </Highlight>
    </td>
    
    <td align="left">
      z-shell/zconvey
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> zbrowse </Highlight>
    </td>
    
    <td align="left">
      z-shell/zbrowse
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> zzcomplete </Highlight>
    </td>
    
    <td align="left">
      z-shell/zzcomplete
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> zzcomp </Highlight>
    </td>
    
    <td align="left">
      z-shell/zzcomplete
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> zzcom </Highlight>
    </td>
    
    <td align="left">
      z-shell/zzcomplete
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> zsh-autosuggestions </Highlight>
    </td>
    
    <td align="left">
      zsh-users/zsh-autosuggestions
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> autosuggestions </Highlight>
    </td>
    
    <td align="left">
      zsh-users/zsh-autosuggestions
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> autosug </Highlight>
    </td>
    
    <td align="left">
      zsh-users/zsh-autosuggestions
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> asug </Highlight>
    </td>
    
    <td align="left">
      zsh-users/zsh-autosuggestions
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> z-asug </Highlight>
    </td>
    
    <td align="left">
      zsh-users/zsh-autosuggestions
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> zsh-syntax-highlighting </Highlight>
    </td>
    
    <td align="left">
      zsh-users/zsh-syntax-highlighting
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> z-sy-h </Highlight>
    </td>
    
    <td align="left">
      zsh-users/zsh-syntax-highlighting
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> zsh-autocomplete </Highlight>
    </td>
    
    <td align="left">
      marlonrichert/zsh-autocomplete
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> autocomplete </Highlight>
    </td>
    
    <td align="left">
      marlonrichert/zsh-autocomplete
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> autocomp </Highlight>
    </td>
    
    <td align="left">
      marlonrichert/zsh-autocomplete
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> aucom </Highlight>
    </td>
    
    <td align="left">
      marlonrichert/zsh-autocomplete
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> acom </Highlight>
    </td>
    
    <td align="left">
      marlonrichert/zsh-autocomplete
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> z-aucom </Highlight>
    </td>
    
    <td align="left">
      marlonrichert/zsh-autocomplete
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> z-acom </Highlight>
    </td>
    
    <td align="left">
      marlonrichert/zsh-autocomplete
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> zsh-autopair </Highlight>
    </td>
    
    <td align="left">
      hlissner/zsh-autopair
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> autopair </Highlight>
    </td>
    
    <td align="left">
      hlissner/zsh-autopair
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> aupair </Highlight>
    </td>
    
    <td align="left">
      hlissner/zsh-autopair
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> aupa </Highlight>
    </td>
    
    <td align="left">
      hlissner/zsh-autopair
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> z-aupa </Highlight>
    </td>
    
    <td align="left">
      hlissner/zsh-autopair
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> evil-registers </Highlight>
    </td>
    
    <td align="left">
      zsh-vi-more/evil-registers
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> evil-reg </Highlight>
    </td>
    
    <td align="left">
      zsh-vi-more/evil-registers
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> vi-reg </Highlight>
    </td>
    
    <td align="left">
      zsh-vi-more/evil-registers
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> vireg </Highlight>
    </td>
    
    <td align="left">
      zsh-vi-more/evil-registers
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> vi-motions </Highlight>
    </td>
    
    <td align="left">
      zsh-vi-more/vi-motions
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> evil-mot </Highlight>
    </td>
    
    <td align="left">
      zsh-vi-more/vi-motions
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> vi-mot </Highlight>
    </td>
    
    <td align="left">
      zsh-vi-more/vi-motions
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> vimot </Highlight>
    </td>
    
    <td align="left">
      zsh-vi-more/vi-motions
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> vi-increment </Highlight>
    </td>
    
    <td align="left">
      zsh-vi-more/vi-increment
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> evil-inc </Highlight>
    </td>
    
    <td align="left">
      zsh-vi-more/vi-increment
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> vi-inc </Highlight>
    </td>
    
    <td align="left">
      zsh-vi-more/vi-increment
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> viinc </Highlight>
    </td>
    
    <td align="left">
      zsh-vi-more/vi-increment
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> vi-quote </Highlight>
    </td>
    
    <td align="left">
      zsh-vi-more/vi-quote
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> evil-qte </Highlight>
    </td>
    
    <td align="left">
      zsh-vi-more/vi-quote
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> vi-qte </Highlight>
    </td>
    
    <td align="left">
      zsh-vi-more/vi-quote
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> viqte </Highlight>
    </td>
    
    <td align="left">
      zsh-vi-more/vi-quote
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> directory-marks </Highlight>
    </td>
    
    <td align="left">
      zsh-vi-more/directory-marks
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> evil-dir-marks </Highlight>
    </td>
    
    <td align="left">
      zsh-vi-more/directory-marks
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> vi-dir-marks </Highlight>
    </td>
    
    <td align="left">
      zsh-vi-more/directory-marks
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> vi-dirma </Highlight>
    </td>
    
    <td align="left">
      zsh-vi-more/directory-marks
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> vidirma </Highlight>
    </td>
    
    <td align="left">
      zsh-vi-more/directory-marks
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> fd </Highlight>
    </td>
    
    <td align="left">
      sharkdp/fd
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> shark-fd </Highlight>
    </td>
    
    <td align="left">
      sharkdp/fd
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> bat </Highlight>
    </td>
    
    <td align="left">
      sharkdp/bat
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> shark-bat </Highlight>
    </td>
    
    <td align="left">
      sharkdp/bat
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> exa </Highlight>
    </td>
    
    <td align="left">
      ogham/exa
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> zsh-completions </Highlight>
    </td>
    
    <td align="left">
      zsh-users/zsh-completions
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> completions </Highlight>
    </td>
    
    <td align="left">
      zsh-users/zsh-completions
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <Highlight color="var(--ifm-color-info)"> comps </Highlight>
    </td>
    
    <td align="left">
      zsh-users/zsh-completions
    </td>
  </tr>
</table>

```mdx-code-block
</APITable>
```

## Install unscope {#install-unscope}

:::info Source

- <Link className="github-link" href="https://github.com/z-shell/z-a-unscope">z-shell/z-a-unscope</Link>

:::

<Tabs>
  <TabItem value="default" label="Default" default>

Add the following snippet in the `.zshrc` file:

```shell
zi light z-shell/z-a-unscope
```

</TabItem>
</Tabs>

This will allow scoped IDs to be searched and resolved.
