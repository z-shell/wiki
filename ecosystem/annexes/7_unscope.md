---
id: unscope
title: "🌀 Unscope"
image: /img/png/theme/z/320x320.png
description: Annex - Unscope IDs documentation
keywords:
  - annex
  - zannex
  - unscope
---

<!-- @format -->

<!-- TODO: Include image/video/code examples. -->

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import Link from '@docusaurus/Link'; import Highlight from "@site/src/components/Highlight";

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

Besides the GitHub-API querying, there's also a fixed, curated list of mappings of short names to the full GitHub IDs. The list currently consists of:

|                               Short (Nick-) Name                                | GitHub ID / scoped ID             |
| :-----------------------------------------------------------------------------: | :-------------------------------- |
|           <Highlight color="var(--ifm-color-info)"> null </Highlight>           | z-shell/null                      |
|       <Highlight color="var(--ifm-color-info)"> z-a-readurl </Highlight>        | z-shell/z-a-readurl               |
|         <Highlight color="var(--ifm-color-info)"> readurl </Highlight>          | z-shell/z-a-readurl               |
|          <Highlight color="var(--ifm-color-info)"> rdurl </Highlight>           | z-shell/z-a-readurl               |
|       <Highlight color="var(--ifm-color-info)"> z-a-patch-dl </Highlight>       | z-shell/z-a-patch-dl              |
|         <Highlight color="var(--ifm-color-info)"> patch-dl </Highlight>         | z-shell/z-a-patch-dl              |
|       <Highlight color="var(--ifm-color-info)"> z-a-submods </Highlight>        | z-shell/z-a-submods               |
|         <Highlight color="var(--ifm-color-info)"> submods </Highlight>          | z-shell/z-a-submods               |
|         <Highlight color="var(--ifm-color-info)"> z-a-rust </Highlight>         | z-shell/z-a-rust                  |
|           <Highlight color="var(--ifm-color-info)"> rust </Highlight>           | z-shell/z-a-rust                  |
|     <Highlight color="var(--ifm-color-info)"> z-a-bin-gem-node </Highlight>     | z-shell/z-a-bin-gem-node          |
|       <Highlight color="var(--ifm-color-info)"> bin-gem-node </Highlight>       | z-shell/z-a-bin-gem-node          |
|           <Highlight color="var(--ifm-color-info)"> bgn </Highlight>            | z-shell/z-a-bin-gem-node          |
|           <Highlight color="var(--ifm-color-info)"> meta </Highlight>           | z-shell/z-a-meta-plugins          |
|         <Highlight color="var(--ifm-color-info)"> metaplg </Highlight>          | z-shell/z-a-meta-plugins          |
|       <Highlight color="var(--ifm-color-info)"> meta-plugins </Highlight>       | z-shell/z-a-meta-plugins          |
|         <Highlight color="var(--ifm-color-info)"> archive </Highlight>          | PZTM::archive                     |
|           <Highlight color="var(--ifm-color-info)"> arch </Highlight>           | PZTM::archive                     |
|        <Highlight color="var(--ifm-color-info)"> directory </Highlight>         | PZTM::directory                   |
|           <Highlight color="var(--ifm-color-info)"> dir </Highlight>            | PZTM::directory                   |
|       <Highlight color="var(--ifm-color-info)"> environment </Highlight>        | PZTM::environment                 |
|           <Highlight color="var(--ifm-color-info)"> env </Highlight>            | PZTM::environment                 |
|         <Highlight color="var(--ifm-color-info)"> utility </Highlight>          | PZTM::utility                     |
|           <Highlight color="var(--ifm-color-info)"> util </Highlight>           | PZTM::utility                     |
| <Highlight color="var(--ifm-color-info)">fast-syntax-highlighting </Highlight>  | z-shell/fast-syntax-highlighting  |
|          <Highlight color="var(--ifm-color-info)"> f-sy-h </Highlight>          | z-shell/fast-syntax-highlighting  |
|           <Highlight color="var(--ifm-color-info)"> fsh </Highlight>            | z-shell/fast-syntax-highlighting  |
| <Highlight color="var(--ifm-color-info)">history-search-multi-word </Highlight> | z-shell/history-search-multi-word |
|           <Highlight color="var(--ifm-color-info)"> hsmw </Highlight>           | z-shell/history-search-multi-word |
|           <Highlight color="var(--ifm-color-info)"> zui </Highlight>            | z-shell/zui                       |
|           <Highlight color="var(--ifm-color-info)"> ZUI </Highlight>            | z-shell/zui                       |
|         <Highlight color="var(--ifm-color-info)"> zconvey </Highlight>          | z-shell/zconvey                   |
|          <Highlight color="var(--ifm-color-info)"> zconv </Highlight>           | z-shell/zconvey                   |
|         <Highlight color="var(--ifm-color-info)"> zbrowse </Highlight>          | z-shell/zbrowse                   |
|        <Highlight color="var(--ifm-color-info)"> zzcomplete </Highlight>        | z-shell/zzcomplete                |
|          <Highlight color="var(--ifm-color-info)"> zzcomp </Highlight>          | z-shell/zzcomplete                |
|          <Highlight color="var(--ifm-color-info)"> zzcom </Highlight>           | z-shell/zzcomplete                |
|   <Highlight color="var(--ifm-color-info)"> zsh-autosuggestions </Highlight>    | zsh-users/zsh-autosuggestions     |
|     <Highlight color="var(--ifm-color-info)"> autosuggestions </Highlight>      | zsh-users/zsh-autosuggestions     |
|         <Highlight color="var(--ifm-color-info)"> autosug </Highlight>          | zsh-users/zsh-autosuggestions     |
|           <Highlight color="var(--ifm-color-info)"> asug </Highlight>           | zsh-users/zsh-autosuggestions     |
|          <Highlight color="var(--ifm-color-info)"> z-asug </Highlight>          | zsh-users/zsh-autosuggestions     |
| <Highlight color="var(--ifm-color-info)"> zsh-syntax-highlighting </Highlight>  | zsh-users/zsh-syntax-highlighting |
|          <Highlight color="var(--ifm-color-info)"> z-sy-h </Highlight>          | zsh-users/zsh-syntax-highlighting |
|     <Highlight color="var(--ifm-color-info)"> zsh-autocomplete </Highlight>     | marlonrichert/zsh-autocomplete    |
|       <Highlight color="var(--ifm-color-info)"> autocomplete </Highlight>       | marlonrichert/zsh-autocomplete    |
|         <Highlight color="var(--ifm-color-info)"> autocomp </Highlight>         | marlonrichert/zsh-autocomplete    |
|          <Highlight color="var(--ifm-color-info)"> aucom </Highlight>           | marlonrichert/zsh-autocomplete    |
|           <Highlight color="var(--ifm-color-info)"> acom </Highlight>           | marlonrichert/zsh-autocomplete    |
|         <Highlight color="var(--ifm-color-info)"> z-aucom </Highlight>          | marlonrichert/zsh-autocomplete    |
|          <Highlight color="var(--ifm-color-info)"> z-acom </Highlight>          | marlonrichert/zsh-autocomplete    |
|       <Highlight color="var(--ifm-color-info)"> zsh-autopair </Highlight>       | hlissner/zsh-autopair             |
|         <Highlight color="var(--ifm-color-info)"> autopair </Highlight>         | hlissner/zsh-autopair             |
|          <Highlight color="var(--ifm-color-info)"> aupair </Highlight>          | hlissner/zsh-autopair             |
|           <Highlight color="var(--ifm-color-info)"> aupa </Highlight>           | hlissner/zsh-autopair             |
|          <Highlight color="var(--ifm-color-info)"> z-aupa </Highlight>          | hlissner/zsh-autopair             |
|      <Highlight color="var(--ifm-color-info)"> evil-registers </Highlight>      | zsh-vi-more/evil-registers        |
|         <Highlight color="var(--ifm-color-info)"> evil-reg </Highlight>         | zsh-vi-more/evil-registers        |
|          <Highlight color="var(--ifm-color-info)"> vi-reg </Highlight>          | zsh-vi-more/evil-registers        |
|          <Highlight color="var(--ifm-color-info)"> vireg </Highlight>           | zsh-vi-more/evil-registers        |
|        <Highlight color="var(--ifm-color-info)"> vi-motions </Highlight>        | zsh-vi-more/vi-motions            |
|         <Highlight color="var(--ifm-color-info)"> evil-mot </Highlight>         | zsh-vi-more/vi-motions            |
|          <Highlight color="var(--ifm-color-info)"> vi-mot </Highlight>          | zsh-vi-more/vi-motions            |
|          <Highlight color="var(--ifm-color-info)"> vimot </Highlight>           | zsh-vi-more/vi-motions            |
|       <Highlight color="var(--ifm-color-info)"> vi-increment </Highlight>       | zsh-vi-more/vi-increment          |
|         <Highlight color="var(--ifm-color-info)"> evil-inc </Highlight>         | zsh-vi-more/vi-increment          |
|          <Highlight color="var(--ifm-color-info)"> vi-inc </Highlight>          | zsh-vi-more/vi-increment          |
|          <Highlight color="var(--ifm-color-info)"> viinc </Highlight>           | zsh-vi-more/vi-increment          |
|         <Highlight color="var(--ifm-color-info)"> vi-quote </Highlight>         | zsh-vi-more/vi-quote              |
|         <Highlight color="var(--ifm-color-info)"> evil-qte </Highlight>         | zsh-vi-more/vi-quote              |
|          <Highlight color="var(--ifm-color-info)"> vi-qte </Highlight>          | zsh-vi-more/vi-quote              |
|          <Highlight color="var(--ifm-color-info)"> viqte </Highlight>           | zsh-vi-more/vi-quote              |
|     <Highlight color="var(--ifm-color-info)"> directory-marks </Highlight>      | zsh-vi-more/directory-marks       |
|      <Highlight color="var(--ifm-color-info)"> evil-dir-marks </Highlight>      | zsh-vi-more/directory-marks       |
|       <Highlight color="var(--ifm-color-info)"> vi-dir-marks </Highlight>       | zsh-vi-more/directory-marks       |
|         <Highlight color="var(--ifm-color-info)"> vi-dirma </Highlight>         | zsh-vi-more/directory-marks       |
|         <Highlight color="var(--ifm-color-info)"> vidirma </Highlight>          | zsh-vi-more/directory-marks       |
|            <Highlight color="var(--ifm-color-info)"> fd </Highlight>            | sharkdp/fd                        |
|         <Highlight color="var(--ifm-color-info)"> shark-fd </Highlight>         | sharkdp/fd                        |
|           <Highlight color="var(--ifm-color-info)"> bat </Highlight>            | sharkdp/bat                       |
|        <Highlight color="var(--ifm-color-info)"> shark-bat </Highlight>         | sharkdp/bat                       |
|           <Highlight color="var(--ifm-color-info)"> exa </Highlight>            | ogham/exa                         |
|     <Highlight color="var(--ifm-color-info)"> zsh-completions </Highlight>      | zsh-users/zsh-completions         |
|       <Highlight color="var(--ifm-color-info)"> completions </Highlight>        | zsh-users/zsh-completions         |
|          <Highlight color="var(--ifm-color-info)"> comps </Highlight>           | zsh-users/zsh-completions         |

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
