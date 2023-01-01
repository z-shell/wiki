---
id: unscope
title: "🌀 Unscope"
image: /img/png/theme/z/320x320.png
description: 別館 - アンスコープ IDのドキュメント
keywords:
  - annex
  - zannex
  - unscope
---

<!-- @format -->

<!-- TODO: Include image/video/code examples. -->

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import Link from '@docusaurus/Link'; import Highlight from "@site/src/components/Highlight";

この別館では、以下のようにGitHubのユーザー名を指定せずにプラグインをインストールすることができます。

1. プラグイン名にスラッシュ (/) を含まないプラグインをインストールすると、annex は GitHub API に照会して `*/{the-name}`を検索し、スターの数でソートするようになります。

2. まず候補にはフォークが10回以上必要で、なければ次に2回、そして0回となります。

3. 最適な結果を見つけたら、それをプラグインの **full** remote-id として設定し、後で自動的に使用できるように ID をディスクに保存します。

4. セキュリティのため，このようなGH-APIリクエストを行う際には，（本別館により）新たに追加されたice: `ghapi` を与える必要があります．

5. そうでない場合は、プラグインのニックネームとフルスコープIDの静的マッピングデータベースのみが検索されます。 `vi-reg → zsh-vi-more/evil-registers`のような多くのマッピングと、例えば `zsh-syntax-highlighting → zsh-users/zsh-syntax-highlighting` などの有名なプラグインを含んでいます。

## 静的マッピング

:::info

スコープ付き ID を持つ新しいリポジトリを追加するには [リクエスト](https://github.com/z-shell/z-a-unscope/issues/new/choose) を埋めてください。

:::

GitHub-APIによる問い合わせの他に、ショートネームと完全なGitHub IDのマッピングの固定されたキュレーションリストがあります。 現在のリストは以下のように構成されています:

<table spaces-before="0">
  <tr>
    <th align="center">
      略称(ニックネーム)
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

## unscope をインストールする {#install-unscope}

:::info Source

- <Link className="github-link" href="https://github.com/z-shell/z-a-unscope">z-shell/z-a-unscope</Link>

:::

<Tabs>
  <TabItem value="default" label="Default" default>

`.zshrc` ファイルに以下のスニペットを追加します:

```shell
zi light z-shell/z-a-unscope
```

</TabItem>
</Tabs>

これにより、スコープ ID の検索と解決が可能になります。
