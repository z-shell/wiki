---
id: installation
title: '⚡️ 導入'
sidebar_position: 1
image: /img/png/theme/z/320x320.png
description: インストールガイド
keywords:
  - install
---

<!-- @format -->

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import Link from '@docusaurus/Link'; import Emoji from '@site/src/components/Emoji';

## <i class="fas fa-spinner fa-spin"></i> クイックセットアップ {#quick-setup}

`.zshrc` ファイルに以下のコードを追加します。

<Tabs>
  <TabItem value="instant-source" label="Instant" default>

```shell title="~/.zshrc"
source <(curl -sL init.zshell.dev); zzinit
```

  </TabItem>
  <TabItem value="verified-source" label="Verified">

:::caution

This setup method requires manually verifying the sha256 [checksum][checksum-txt] for a file `lib/zsh/init.zsh` every time the content is changed in the repository.

:::

```shell showLineNumbers title="~/.zshrc"
local cs_ok='7fab1ecb8d2ffbdb4aa98dd1e51cebaeaa4d8137e1de11938f3e0df24af262bb'
local cs_get=$(sha256sum <(curl -sL init.zshell.dev) | awk '{print $1}')
[[ $cs_ok == $cs_get ]] && { source <(curl -sL init.zshell.dev); zzinit; } || {
  print -P "%F{160}▓▒░ Houston, we have a problem, the %F{226}$cs_get%F{160} do not match\!%f%b"; return 1
}
unset cs_ok cs_get
```

  </TabItem>
</Tabs>

`exec zsh` でシェルをリロードし、 `zi -h` を実行して、使い方を確認します。

## <i class="fas fa-spinner fa-spin"></i> 自動セットアップ {#automated-setup}

:::tip

- ファイル: `lib/sh/install.sh` の sha256[checksum][checksum-txt]を検証します
- 必要であれば `-b <tag>` または `-b <branch>` を追加してください。 以下のように:

```shell
sh -c "$(curl -fsSL get.zshell.dev)" -- -i skip -b main
```

:::

<Tabs>
  <TabItem value="minimal" label="Minimal" default>

最小構成で`.zshrc`に設定するには:

```shell
sh -c "$(curl -fsSL get.zshell.dev)" --
```

  </TabItem>
  <TabItem value="minimal-loader" label="Loader">

Install and include minimal configuration with [loader](#loader):

```shell
sh -c "$(curl -fsSL get.zshell.dev)" -- -a loader
```

The installer will download the loader and add the snippet below to the `.zshrc` file.

```shell showLineNumbers
if [[ -r "${XDG_CONFIG_HOME:-${HOME}/.config}/zi/init.zsh" ]]; then
  source "${XDG_CONFIG_HOME:-${HOME}/.config}/zi/init.zsh" && zzinit
fi
```

:::tip

ローダーは、利用可能な [links](#loader) からシステム上の任意の場所に手動で取得し、 `.zshrc` または [quick-setup](#quick-setup) に示すところに読み込むことが可能です。

:::

Then reload the shell with: `exec zsh`. すべて完了です！

  </TabItem>
  <TabItem value="repository" label="Repository">

デフォルトまたは <Link to="/docs/guides/customization#customizing-paths">カスタム</Link> の値を使用してリポジトリをクローンします:

```shell
sh -c "$(curl -fsSL get.zshell.dev)" -- -i skip
```

  </TabItem>
  <TabItem value="minimal-annexes" label="Annex">

推奨する <Link to="/ecosystem/annexes/overview">別館</Link> と最小構成の設定を使用してインストール: 

```shell
sh -c "$(curl -fsSL get.zshell.dev)" -- -a annex
```

  </TabItem>
  <TabItem value="minimal-zunit" label="ZUnit">

推奨する <Link to="/ecosystem/annexes/overview">別館</Link> と最小構成の設定を使用し、また <Link href="https://github.com/zdharma/zunit">zdharma/zunit</Link> をインストール:

```shell
sh -c "$(curl -fsSL get.zshell.dev)" -- -a zunit
```

  </TabItem>
  </Tabs>

## <i class="fas fa-spinner fa-spin"></i> マニュアルセットアップ {#manual-setup}

:::tip 関連

- [🏗 Configuration management](/docs/guides/customization#customizing-paths)

:::

インストール先を設定し、ディレクトリを作成します。

```shell showLineNumbers
typeset -Ag ZI
typeset -gx ZI[HOME_DIR]="${HOME}/.zi" ZI[BIN_DIR]="${ZI[HOME_DIR]}/bin"
command mkdir -p "$ZI[BIN_DIR]"
```

セキュリティ上の理由から、関数 `compaudit` を実行して、 [補完システム][completion-system] が `root` または現在の `ユーザー`が所有するファイルであるか、もしくは、ファイルが`全ユーザー` か`グループ内のユーザーが書き込み可能`であるかをチェックします。

失敗した場合は、現在のユーザーをディレクトリのオーナーに設定し、グループ/その他の書き込み権限を削除して、リポジトリを複製します。

```shell showLineNumbers
compaudit | xargs chown -R "$(whoami)" "$ZI[HOME_DIR]"
compaudit | xargs chmod -R go-w "$ZI[HOME_DIR]"
command git clone https://github.com/z-shell/zi.git "$ZI[BIN_DIR]"
```

Zi を有効にするには、先に設定したディレクトリから `zi.zsh` をソースとして、 `.zshrc` ファイルに以下のスニペットを配置します。

```shell title="~/.zshrc" showLineNumbers
typeset -A ZI
ZI[BIN_DIR]="${HOME}/.zi/bin"
source "${ZI[BIN_DIR]}/zi.zsh"
```

:::caution

以下の2行は、上の行の後、つまりZiを有効にした後に配置する必要があります。

:::

以下でZi補完を有効にします:

```shell title="~/.zshrc" showLineNumbers
autoload -Uz _zi
(( ${+_comps} )) && _comps[zi]=_zi
```

## <i class="fas fa-spinner fa-spin"></i> インストール後 {#post-install}

新しくインストールした後は、 `exec zsh -il` でシェルをリロードし、 `zi self-update` で Zi をコンパイルすることをお勧めします。 `zi -h` を実行することで、利用可能な全コマンドを確認できます。 Zi の機能性とパフォーマンスを向上させるか、Wiki を調べて始めましょう。

何か問題があったり、助けが必要な場合は どの言語でも<Emoji symbol="🤦‍♂️" label="man-facepalming"/>、 [それについて話し合うか][discuss]、 [issueを作成][issue]してください。

Zi の改善に役立ちます。 どうか、シェア、貢献、または [翻訳][translate] <Emoji symbol="🌐" label="globe-with-meridians"/>で私たちに協力してください <Emoji symbol="🥰" label="smiling-face-with-hearts"/> <Emoji symbol="🤓" label="nerd-face"/>.

すべてを組み合わせて、私たちのためのツールチェインを作りましょう <Emoji symbol="🚀" label="rocket"/>。

## <i class="fas fa-sync-alt fa-spin"></i> アイデアがありますか？

### <i class="fa-solid fa-list-check"></i>&nbsp;<Link href="https://github.com/z-shell/playground">playgroundで提案・リクエストできます</Link>

```shell
sh -c "$(curl -fsSL get.zshell.dev)" -- -a ???
```

## <i class="fas fa-sync-alt fa-spin"></i>&nbsp;ウォーミングアップが必要ですか？

### <i class="fa-brands fa-docker"></i>&nbsp;<Link href="https://github.com/z-shell/zd/pkgs/container/zd">Docker Alpine</Link>

```shell
docker run --rm -it ghcr.io/z-shell/zd:latest
```

### <i class="fa-brands fa-docker"></i> DockerでのTurbo Zi

Zi を使用する Docker イメージを作成する場合、シェルが対話的に起動する前に、 `@zi-scheduler` 関数で ターボロードされるプラグインをインストールする必要があります:

- プロンプトを待たずにプラグインをインストールできる（つまり、スクリプトフレンドリー）。
- `wait` 引数を無視し、すべてのプラグインを即座にインストールします。

これを実現するために、burst 引数を使用し、 `@zi-scheduler` 関数を呼び出します。

```docker
RUN zsh -i -c -- '@zi-scheduler burst || true'
```

> - 例: [Dockerfile][dockerfile]
> - 試す: [playground][playground]

## <i class="fas fa-cog fa-pulse"></i> Zi モジュール: [zpmod][z-shell/zpmod] {#zi-module}

:::info

- 必要な Zsh バージョン: >= v5.8.0
- <i className="fa-brands fa-github"></i>&nbsp;<Link href="https://github.com/z-shell/zpmod">z-shell/zpmod</Link>

:::

<Tabs>
  <TabItem value="with-zi" label="With Zi" default>

使い方を説明します。

```shell showLineNumbers
zi module {build|info|help} [options]
zi module build [--clean]
zi module info [--link]
```

- Zi Zsh モジュールを使い始めるには、次のコマンドを実行します:  `zi module build` `--clean` を追加すると `make distclean` が実行されます。
- モジュールのロードに関する方法を表示するには、次を実行します: `zi module info`
- モジュールからのデバッグメッセージを有効にするには:

```shell
typeset -g ZI_MOD_DEBUG=1
```

</TabItem>
  <TabItem value="standalone" label="Standalone">

```shell
sh <(curl -sL src.zshell.dev/sh/install_zpmod.sh)
```

  </TabItem>
</Tabs>

## <i class="fas fa-sync-alt fa-spin"></i> 利用可能なリンク {#available-links}

[Status page][status] <Emoji symbol="✅" label="check-mark-button"/>

### <i class="fa-solid fa-gear"></i> インストーラー {#installer}

| サービス       | URL                                                                       |
|:---------- | ------------------------------------------------------------------------- |
| リダイレクト     | <https://get.zshell.dev>                                                  |
| R2         | <https://r2.zshell.dev/src/sh/install.sh>                                 |
| Cloudflare | <https://src.zshell.dev/sh/install.sh>                                    |
| IPFS       | <https://ipfs.zshell.dev/sh/install.sh>                                   |
| GitHub RAW | <https://raw.githubusercontent.com/z-shell/zi-src/main/lib/sh/install.sh> |

### <i class="fa-brands fa-superpowers"></i> ローダー {#loader}

| サービス       | URL                                                                      |
|:---------- | ------------------------------------------------------------------------ |
| リダイレクト     | <https://init.zshell.dev>                                                |
| R2         | <https://r2.zshell.dev/src/zsh/init.zsh>                                 |
| Cloudflare | <https://src.zshell.dev/zsh/init.zsh>                                    |
| IPFS       | <https://ipfs.zshell.dev/zsh/init.zsh>                                   |
| GitHub RAW | <https://raw.githubusercontent.com/z-shell/zi-src/main/lib/zsh/init.zsh> |

<!-- end-of-file -->
<!-- links -->
<!-- external -->

[checksum-txt]: https://raw.githubusercontent.com/z-shell/zi-src/main/lib/checksum.txt
[completion-system]: https://zsh.sourceforge.io/Doc/Release/Completion-System.html#Use-of-compinit
[discuss]: https://github.com/orgs/z-shell/discussions/new
[dockerfile]: https://github.com/robobenklein/configs/blob/master/Dockerfile
[issue]: https://github.com/z-shell/zi/issues/new/choose
[playground]: https://github.com/z-shell/playground
[status]: https://status.zshell.dev
[translate]: https://digitalclouds.crowdin.com/z-shell
[z-shell/zpmod]: https://github.com/z-shell/zpmod
