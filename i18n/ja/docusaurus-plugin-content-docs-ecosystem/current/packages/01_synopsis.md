---
id: synopsis
title: "📦 概要"
sidebar_position: 1
image: /img/png/theme/z/320x320.png
description: パッケージの紹介
keywords:
  - package
  - zpackage
  - zsh-package
  - packages-overview
---

<!-- @format -->

パッケージ機能を追加する動機

1. Ziは柔軟で機能豊富なプラグインマネージャーですが、ユーザーはその設定に圧倒されることが多いようです。

2. パッケージマネージャーに似た次のような機能が複数あります。

   - プラグインのGitリポジトリまたはパッケージのリリースURLを指定できます。
   - プラグインに推奨される [ice修飾子][] のリストを取得します。
     - [ice-modifiers][]のリストが複数存在する場合があります。
     - ice修飾子リストはプロファイルに保存されます。デフォルトでは少なくとも 1 つのプロファイルがあります。
     - the [ice修飾子][] を選択的にオーバーライドすることができます。
   - バイナリに対していわゆるシム（転送スクリプト）を自動的に提供します。
   - バイナリを公開するために `$PATH` を編集します。
   - `Makefile` などを実行することができます。

3. 一般に、Ziには驚くようなことを可能にするフックがたくさんありますが、その内容は徐々に良いものに進化していくことが多く、現在のバージョンをすべて把握することは困難です。

:::info

[bin-gem-node][] 別館を推奨します。そうでない場合、一部のパッケージは機能が不足しているためインストールに失敗します。

:::

## [any-gem][] パッケージと [any-node][] パッケージ

これらは、新しく作成されたプラグインディレクトリに、任意のGem（複数可）やNodeモジュール（複数可）をローカルインストールすることを可能にします。 例:

```shell showLineNumbers
zi pack param='GEM -> rails' for any-gem
zi pack param='MOD -> doctoc' for any-node
```

If the installation is used in the `.zshrc` file then use `id-as'…'`, then Zi knows that the package is already installed.

:::note

Zi の構文では、以下の例のように Unicode 矢印を使用することができます。

:::

```shell
zi id-as=jekyll pack param='GEM → jekyll' for any-gem
```

バイナリは shims 経由で PATH を変更することなく公開されます。 `zi delete …` でプラグインを削除すると、shimsが正しく削除されます。実態としては、メタデータを含む `package.json` ファイルを保持する GitHub リポジトリです。 この方法では、ice修飾子を指定する必要がありません（もちろん可能です）。 [ice修飾子][] リストは長くて複雑なので便利かもしれません。

## 導入例

これにより、 `fzf` をインストールするために使用される以下のコマンドの代わりに、次のようになります。

```shell showLineNumbers
zi lucid as=program pick="$ZPFX/bin/(fzf|fzf-tmux)" \
  atclone="cp shell/completion.zsh _fzf_completion; \
    cp bin/(fzf|fzf-tmux) $ZPFX/bin" \
  make="PREFIX=$ZPFX install" for \
    junegunn/fzf
```

必要なもの:

```shell
zi pack for fzf
```

to get the complete setup of the fuzzy finder, including:

- the completion
- the additional executable script `fzf-tmux`

The installation is like with package-manager because you don't need to invoke Zi anymore once installed to use `fzf` (that's because `fzf` is just a binary program and not e.g.: a shell function). You can also update the package with `zi update fzf` – it'll cause the project to refresh and rebuild, like with a "normal" package manager such as `apt-get`. However, it'll be more like to `emerge` from Gentoo, because the installation will be from the source… unless… the user will pick up a binary installation by profile argument specified in the `pack'…'` ice.

## 通常のソフトウェアインストールにZiパッケージを使用する場合の長所

通常のパッケージマネージャでインストールできるソフトウェアをZiでインストールすることには、いくつかの利点があります。

1. **長所:** Zi パッケージは通常、そのソフトウェアの_公式かつ最新の_ ディストリビューションの URL を使用します。 (例: [ecs-cli][] パッケージは、Linux にインストールする場合、URL: `https://amazon-ecs-cli.s3.amazonaws.com/ecs-cli-linux-amd64-latest` を使用します。)

2. **長所:** Zi ice修飾子を指定することで、簡単にインストールに編集を加えることができます。

   ```shell
   zi pack=bgn atclone="cp fzy.1 $ZI[MAN_DIR]/man1" for fzy
   ```

   to install also the man page for the `fzy` fuzzy finder (this omission in the package will be fixed soon).

3. **長所:** 通常のパッケージマネージャと比較して、インストールが非常に柔軟です。 使用可能な自由度の例:

   - to install from Git or release-tarball, or a binary-release file,
   - to install via shims or via extending `$PATH`, or by copying to `$ZPFX/bin`,
   - to download files and apply patches to the source by using the `patch-dl` annex features.

4. **Pro:** The installations are located in the user home directory, which doesn't require root access. Also, for Gems and Node modules, they are installed in their plugin directory, which can have advantages (e.g.: isolation allowing e.g: easy removal by `rm -rf …`).

5. **Con:** You're somewhat "on your own", with no support from any package maintainer.

Thus, summing up 1. with 4., it might be nice/convenient too, for example, have the latest ECS CLI binary installed in the home directory, without using root access and always the latest, and – summing up with 2. and 3. – to, for example, have always the latest `README` downloaded by additional ice: `dl'https://raw.githubusercontent.com/aws/amazon-ecs-cli/master/README.md'` (and then to have the `README` converted into a man page by the `remark` Markdown processor or other via an `atclone''` ice, as the tool doesn't have any official man page).

## パッケージの追加

1. Contact the author to have the repository at the [Z-Shell][z-shell] organization or set the [ZI\[PKG_OWNER\]][modify-settings].

2. Populate the `package.json` – I suggest grabbing the one for `fzf` or `doctoc` and doing a few substitutions like [doctoc][] → `your-project` and then simply filling the `default` profile in the `zi-ices` object – it is same as passing ice-modifiers to `zi ice …` but in JSON.

3. `package.json` のプロジェクト名は、 `zsh-` で開始する必要があります。 Zi で指定する場合、このプレフィックスはスキップされます。

4. コミットしてプッシュする。

<!-- end-of-file -->
<!-- links -->



<!-- external -->

[bin-gem-node]: /ecosystem/annexes/bin-gem-node
[ice修飾子]: /docs/guides/syntax/ice-modifiers
[ice-modifiers]: /docs/guides/syntax/ice-modifiers
[modify-settings]: /docs/guides/customization#modify-settings

[any-gem]: https://github.com/z-shell/any-gem
[any-node]: https://github.com/z-shell/any-node
[ecs-cli]: https://github.com/z-shell/ecs-cli
[z-shell]: https://github.com/z-shell
[doctoc]: https://github.com/z-shell/doctoc
