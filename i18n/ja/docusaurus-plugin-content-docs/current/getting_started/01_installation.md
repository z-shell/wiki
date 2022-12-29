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
source <(curl -sL git.io/zi-loader); zzinit
```

  </TabItem>
  <TabItem value="verified-source" label="Verified">

Verify the sha256 [checksum][checksum] for a file: `lib/zsh/init.zsh`:

```shell showLineNumbers title="~/.zshrc"
local cs_ok='7fab1ecb8d2ffbdb4aa98dd1e51cebaeaa4d8137e1de11938f3e0df24af262bb'
local cs=$(sha256sum <(curl -sL git.io/zi-loader) | awk '{print $1}')
[[ $cs_ok == $cs ]] && { source <(curl -sL git.io/zi-loader); zzinit; } || {
  print -P "%F{160}▓▒░ Houston, we have a problem, the %F{226}$cs%F{160} do not match\!%f%b"; exit 1
}
```

  </TabItem>
</Tabs>

`exec zsh` でシェルをリロードし、 `zi -h` を実行して、使い方を確認します。

## <i class="fas fa-spinner fa-spin"></i> 自動セットアップ {#automated-setup}

:::tip

- ファイル: `lib/sh/install.sh` の sha256[checksum][checksum]を検証します
- 必要であれば `-b <tag>` または `-b <branch>` を追加してください。 以下のように:

```shell
sh -c "$(curl -fsSL git.io/get-zi)" -- -i skip -b main
```

:::

<Tabs>
  <TabItem value="minimal" label="Minimal" default>

最小構成で`.zshrc`に設定するには:

```shell
sh -c "$(curl -fsSL git.io/get-zi)" --
```

  </TabItem>
  <TabItem value="minimal-loader" label="Loader">

最小構成で[loader](#loader)に設定する場合:

```shell
sh -c "$(curl -fsSL git.io/get-zi)" -- -a loader
```

を実行します
インストーラはloaderをダウンロードし、以下のスニペットを`.zshrc`に追加します

```shell showLineNumbers
if [[ -r "${XDG_CONFIG_HOME:-${HOME}/.config}/zi/init.zsh" ]]; then
  source "${XDG_CONFIG_HOME:-${HOME}/.config}/zi/init.zsh" && zzinit
fi
```

:::tip

ローダーは、利用可能な [links](#loader) からシステム上の任意の場所に手動で取得し、 `.zshrc` または [quick-setup](#quick-setup) に示すところに読み込むことが可能です。

:::

次に、`exec zsh`でシェルを再読み込みします。 すべて完了です！

  </TabItem>
  <TabItem value="repository" label="Repository">

Clone repository using default or if set <Link to="/docs/guides/customization#customizing-paths">custom</Link> values:

```shell
sh -c "$(curl -fsSL git.io/get-zi)" -- -i skip
```

  </TabItem>
  <TabItem value="minimal-annexes" label="Annex">

Install and include minimal configuration with recommended <Link to="/ecosystem/annexes/overview">annexes</Link>:

```shell
sh -c "$(curl -fsSL git.io/get-zi)" -- -a annex
```

  </TabItem>
  <TabItem value="minimal-zunit" label="ZUnit">

Install and include minimal configuration with recommended <Link to="/ecosystem/annexes/overview">annexes</Link> and setup <Link href="https://github.com/zdharma/zunit">zdharma/zunit</Link>:

```shell
sh -c "$(curl -fsSL git.io/get-zi)" -- -a zunit
```

  </TabItem>
  </Tabs>

## <i class="fas fa-spinner fa-spin"></i> マニュアルセットアップ {#manual-setup}

:::ヒント 関連

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

新しくインストールした後は、 `exec zsh` でシェルをリロードし、 `zi self-update` で Zi をコンパイルすることをお勧めします。 `zi -h` を実行することで、利用可能な全コマンドを確認できます。 Increase Zi functionality, and performance, or get started by exploring the wiki.

何か問題があったり、助けが必要な場合は どの言語でも<Emoji symbol="🤦‍♂️" label="man-facepalming"/>、 [それについて話し合うか][discuss]、 [issueを作成][issue]してください。

Zi の改善に役立ちます。 どうか、シェア、貢献、または [翻訳][translate] <Emoji symbol="🌐" label="globe-with-meridians"/>で私たちに協力してください <Emoji symbol="🥰" label="smiling-face-with-hearts"/> <Emoji symbol="🤓" label="nerd-face"/>.

Let's glue everything together to create a toolchain that works for us <Emoji symbol="🚀" label="rocket"/>.

## <i class="fas fa-sync-alt fa-spin"></i> アイデアがありますか？

### <i class="fa-solid fa-list-check"></i>&nbsp;<Link href="https://github.com/z-shell/playground">playgroundで提案・リクエストできます</Link>

```shell
sh -c "$(curl -fsSL git.io/get-zi)" -- -a ???
```

## <i class="fas fa-sync-alt fa-spin"></i>&nbsp;ウォーミングアップが必要ですか？

### <i class="fa-brands fa-docker"></i>&nbsp;<Link href="https://github.com/z-shell/zd/pkgs/container/zd">Docker Alpine</Link>

```shell
docker run --rm -it ghcr.io/z-shell/zd:latest
```

### <i class="fa-brands fa-docker"></i> DockerでのTurbo Zi

If you create a Docker image that uses Zi, install Turbo-loaded plugins before the shell starts interactively, with the `@zi-scheduler` function in such a way, that it:

- Install plugins without waiting for the prompt (i.e. it's script friendly).
- Install all plugins instantly, without respecting the `wait` argument.

To accomplish this, use burst argument and call the `@zi-scheduler` function:

```docker
RUN zsh -i -c -- '@zi-scheduler burst || true'
```

> - 例: [Dockerfile][dockerfile]
> - In action: [Playground][playground]

## <i class="fas fa-cog fa-pulse"></i> Zi Module: [zpmod][z-shell/zpmod] {#zi-module}

:::info

- 必要な Zsh バージョン: >= v5.8.0
- <i className="fa-brands fa-github"></i>&nbsp;<Link href="https://github.com/z-shell/zpmod">z-shell/zpmod</Link>

:::

<Tabs>
  <TabItem value="with-zi" label="With Zi" default>

Usage:

```shell showLineNumbers
zi module {build|info|help} [options]
zi module build [--clean]
zi module info [--link]
```

- To start using the Zi Zsh module run: `zi module build`. Append `--clean` to run `make distclean`.
- To display the instructions on loading the module, run: `zi module info`.
- To enable debug messages from the module set:

```shell
typeset -g ZI_MOD_DEBUG=1
```

</TabItem>
  <TabItem value="standalone" label="Standalone">

```shell
sh -c "$(curl -fsSL git.io/get-zi)" -- -a zpmod
```

  </TabItem>
</Tabs>

## <i class="fas fa-sync-alt fa-spin"></i> 利用可能なリンク {#available-links}

[ステータスページ][status] <Emoji symbol="✅" label="check-mark-button"/>

### <i class="fa-solid fa-gear"></i> インストーラー {#installer}

| サービス                     | URL                                                                       |
|:------------------------ | ------------------------------------------------------------------------- |
| [リダイレクト][get.zshell.dev] | <https://get.zshell.dev>                                                  |
| [IPFS][ipfs.io]          | <https://ipfs.zshell.dev/sh/install.sh>                                   |
| [直接][direct-install]     | <https://raw.githubusercontent.com/z-shell/zi-src/main/lib/sh/install.sh> |

### <i class="fa-brands fa-superpowers"></i> ローダー {#loader}

| サービス                      | URL                                                                      |
|:------------------------- | ------------------------------------------------------------------------ |
| [リダイレクト][init.zshell.dev] | <https://init.zshell.dev>                                                |
| [IPFS][ipfs.io]           | <https://ipfs.zshell.dev/zsh/init.zsh>                                   |
| [直接][direct-init]         | <https://raw.githubusercontent.com/z-shell/zi-src/main/lib/zsh/init.zsh> |

<!-- end-of-file -->
<!-- links -->
<!-- external -->

[checksum]: https://raw.githubusercontent.com/z-shell/zi-src/main/lib/checksum.txt
[completion-system]: https://zsh.sourceforge.io/Doc/Release/Completion-System.html#Use-of-compinit
[direct-init]: https://raw.githubusercontent.com/z-shell/zi-src/main/lib/zsh/init.zsh
[direct-install]: https://raw.githubusercontent.com/z-shell/zi-src/main/lib/sh/install.sh
[discuss]: https://github.com/orgs/z-shell/discussions/new
[dockerfile]: https://github.com/robobenklein/configs/blob/master/Dockerfile
[get.zshell.dev]: https://get.zshell.dev
[init.zshell.dev]: https://init.zshell.dev
[ipfs.io]: https://ipfs.io
[issue]: https://github.com/z-shell/zi/issues/new/choose
[playground]: https://github.com/z-shell/playground
[status]: https://status.zshell.dev
[translate]: https://digitalclouds.crowdin.com/z-shell
[z-shell/zpmod]: https://github.com/z-shell/zpmod
