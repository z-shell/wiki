---
id: overview
title: '☑️ 概要'
image: /img/png/theme/z/320x320.png
description: Zi の使用方法の概要
---

import ImgShow from '@site/src/components/ImgShow'; import Link from '@docusaurus/Link';

この概要では、以下の基礎を説明します。

1. [Oh-My-Zsh & Prezto](/search?q=Oh+My+Zsh+%26+Prezto)
2. [補完](/search?q=completions)
3. [ターボモード](/search?q=turbo+mode)
4. [Ice 修飾子](/search?q=ice+modifiers)

## プラグインとスニペットの読み込み

```shell showLineNumbers
zi load z-shell/H-S-MW
zi light zsh-users/zsh-syntax-highlighting
```

上記のコマンドは2通りの基本的なプラグインの読み込み方法です。 ローカルまたはリモートのファイルを（直接URLを使って）ソースにしたい場合は、 `snippet`を使用します。

```shell
zi snippet <URL>
```

これらは、 `.zshrc` に追加する必要があります。 スニペットはローカルにキャッシュされます。新しいバージョンのスニペットをダウンロードするには `-f` オプションを、また `zi update {URL}`を使用してください。 `zi update --all` を使用すると、すべてのスニペットとプラグインが更新されます。

`load`はレポート(プラグインが何をするかの追跡) を可能にし、`zi report {plugin-name}`で情報を出力でき、`zi unload {plugin-name}`でプラグインをアンロードすることができます。

`light` を使用すると、プラグインに関する追跡やレポートがなくロードが速くなりますが、それをアンロードする機能も無効化されます.

`load` か `light`を使用:

```shell showLineNumbers
zi load  <repo/plugin> # Load with reporting/investigating.
zi light <repo/plugin> # Load without reporting/investigating.
```

プラグイン history-search-multi-word が調査しながら読み込み:

```shell
zi load z-shell/H-S-MW
```

2つの通常のプラグインを調査せずに読み込み:

```shell showLineNumbers
zi light zsh-users/zsh-autosuggestions
zi light z-shell/F-Sy-H
```

スニペット:

```shell
zi snippet https://gist.githubusercontent.com/hightemp/5071909/raw/
```

:::note

ターボモードの読み込みでは、プラグイン追跡による速度低下はバックグラウンドで行われるため、ユーザー体験に影響を与えません。つまり、 `zi light` と `zi load` で読み込んでも同じ効果が得られます。

:::

## Oh-My-Zsh, Prezto

Oh-My-ZshとPreztoのプラグインを読み込むには、`snippet`機能を使用してください。 スニペットとは、 `curl`、 `wget`などによって URL から直接ダウンロードされる（ダウンロードツールは自動検出されます）単一ファイルです。

```shell showLineNumbers
zi snippet 'https://github.com/robbyrussell/oh-my-zsh/raw/master/plugins/git/git.plugin.zsh'
zi snippet 'https://github.com/sorin-ionescu/prezto/blob/master/modules/helper/init.zsh'
```

また、Oh My ZshとPreztoに対しては短縮形 `OMZ::` と `PZT::` も使えます。

```shell showLineNumbers
zi snippet OMZ::plugins/git/git.plugin.zsh
zi snippet PZT::modules/helper/init.zsh
```

さらに、GitHubはスニペットのためにSubversionプロトコルをサポートしています。 これにより複数ファイル(例えば、Preztoのモジュールを構成する2つ以上のファイル e.g. `init.zsh` と `alias.zsh`)の読み込みも可能です:

指定なしの場合に読み込むファイルは `*.plugin.zsh`, `init.zsh`, `*.zsh-theme`です:

URLはディレクトリを指します:

```shell {2} showLineNumbers
zi ice svn
zi snippet PZT::modules/docker
```

## スニペットとパフォーマンス

`curl`, `wget`等やSubversionを一緒に使うことで、Oh My ZshとPrezto、または他フレームワーク固有のコードをほぼ回避できます。 メモリへの負荷が少なく、ロード時間も短いため、より高いパフォーマンスを実現します。

## Ice 修飾子

`zi ice` というコマンドは、 [ice 修飾子][1] を単一の Zi コマンドに対して提供します。すなわち、 `zi ice <some-ice-modifier>; zi load some/plugin` です。プラグインをロードした後に ice修飾子は再び設定しなければいけません。

この考え方は、"氷"が飲み物やコーヒーに入れられるようなもので、これをZIに置き換えると、iceは次のZIコマンドへ変更を与えることを意味しています。 また、溶けること(つまり長く続かない)は、Ziの中ではその変更は次のZIコマンドにのみ有効ということです。

Ice修飾子"**pick**"を使うと、明示的に**読み込むファイル**を選択できます:

```shell {1} showLineNumbers
zi ice svn pick"init.zsh"
zi snippet PZT::modules/git
```

ice修飾子の内容は，単純に `"…"`, `'…'`, `$'…'` の中に入れるだけです。 ice修飾子名の後に`":"`は必要ありません( `pick="init.zsh"`や`pick=init.zsh` のように`=`を使うことでも正しく動きますが。)。

`vim`や`emacs`のようなエディタや`zsh-users/zsh-syntax-highlighting`, `z-shell-F-Sy-H` を使うとice修飾子に指定している内容がハイライトされます。

## as"program" について

あるプラグインはファイルを読み込むだけではなく、`$PATH`にコマンドを追加するかもしれません。 この効果を得るには、ice修飾子`as`とその値に`program` (またはエイリアスの`command`) を指定します。

```shell {1} showLineNumbers
zi ice as"program" cp"httpstat.sh -> httpstat" pick"httpstat"
zi light b4b4r07/httpstat
```

上記のコマンドは`$PATH`にプラグインディレクトリを追加し、`httpstat.sh`を`httpstat`としてコピーして`pick`で選択されたファイル、すなわち`httpstat`へ実行権限(`+x`)を付与します。 別のice修飾子`mv`もあり、これは`cp`のように動きますが、ファイルを**コピー**する代わりに`移動`します。 `mv`は`cp`より前に動作します。

:::tip

ice修飾子`cp`と`mv`(他に`atclone`などもあります) は、プラグインやスニペットがインストールする時に実行されます。 それらを再度試したい場合、`zi delete PZT::modules/osx`などのコマンドでプラグインやスニペットを削除してください。

:::

## Ice 修飾子: atpull'…'

ファイルをコピーすることはあとで更新する場合にも安全です。 リポジトリの元のファイルは変更されませんし、`Git`もコンフリクトを報告しません。 しかし、適切な `atpull` (プラグインの**更新時**に実行されるice修飾子) を使用すれば、`mv` も使用できます。

```shell showLineNumbers
zi ice as"program" mv"httpstat.sh -> httpstat" \
  pick"httpstat" atpull'!git reset --hard'
zi light b4b4r07/httpstat
```

`atpull` が `!` で始まる場合、`git pull`と`mv` の前に実行されます。 そうでなければ、 `atpull`、 `mv`、 `cp` は、**新しいコミットを取得する場合のみ**に実行されます。

つまり、ユーザがプラグインを更新するために `zi update b4b4r07/httpstat` を実行して、新しいコミットが存在した場合、初めに`git reset --hard` が実行されて、元の `httpstat.sh` が**復元** され、**それから**`git pull` が実行されて新しいコミットをダウンロード(fast-forwardで)し、**次に**`mv` を再び実行してコマンドが `httpstat.sh` ではなく`httpstat` になります。

このようにすることで、ice修飾子`mv`では、`git`や`subversion`(snippetの場合) による更新を妨げることなく永続的にプラグインの更新を取り込むことができます。

:::info

`!`をZshの対話形式のセッションで展開されないようにするには、`atpull` [ice修飾子](/search?q=ice-modifier)の内容を`"… "`ではなく`'…'`で囲ってください。

:::

## Ice 修飾子: subscribe'…'

このice修飾子は、与えられたファイル(複数可) の更新時間をチェックしながらプラグインの読み込みを延期し、変更されるとプラグインまたはスニペットの読み込みを実行します。

以下の例をコピーしてターミナルに貼り付けるか、 `.zshrc` ファイルに追加して、 `exec zsh`でシェルを再読み込みしてください。

```shell {1} showLineNumbers
zi ice subscribe'{~/files-*,/tmp/files-*}' id-as'z-sub' lucid \
  atload'+zi-message "{profile}I have been loaded{nl}\
  {auto}\`Zi Rocks ♥\`"' notify"Yes that is cool ♥ "
zi load z-shell/0
```

上記で説明したようにファイルを更新して、 ice 修飾子をテストします。

```shell
touch ~/files-1
```

プラグインやスニペットは、ファイルが更新されるたびに何度でもsourceされます。

## スニペットで as'…' program

**スニペット**を使うことで、、`$PATH`にコマンドを追加することもできます:

```shell {2} showLineNumbers
zi ice mv"httpstat.sh -> httpstat" \
  pick"httpstat" as"program"
zi snippet https://github.com/b4b4r07/httpstat/blob/master/httpstat.sh
```

:::tip

スニペットは、 `atpull`をサポートしています。例えば `atpull'!svn revert'`。 また、 `atinit` ice修飾子があり、プラグインやスニペットのロードの前に毎回実行されます。

:::

## スニペットで as'…' completion

`as'…'` ice修飾子に値 `completion` を指定すると、 `snippet` で補完ファイルを直接指定することができます。

```shell {1} showLineNumbers
zi ice as"completion"
zi snippet https://github.com/docker/cli/blob/master/contrib/completion/zsh/_docker
```

## 補完管理

Ziは、各プラグインの各補完機能を無効化、有効化することができます。 補完を提供する人気のプラグインをインストールしてみましょう:

```shell {1} showLineNumbers
zi ice blockf
zi light zsh-users/zsh-completions
```

最初のコマンド、 `blockf` ice は、従来の方法で補完を追加するのをブロックします。 Zi は、いくつかのディレクトリを `$fpath`に追加する代わりに、シンボリックリンクに基づく補完の管理方法を使用しています。 Ziは、新しくダウンロードしたプラグインの補完を自動的に **インストール** します。

補完のアンインストールとインストール:

アンインストール:

```shell
zi cuninstall zsh-users/zsh-completions
```

インストール:

```shell
zi creinstall zsh-users/zsh-completions
```

### 使用可能な補完のリスト

**すべての** プラグインが提供する補完機能を、表形式で、各プラグインの名前とともに確認できます。

```shell
zi clist
```

このコマンドは `zsh-users/zsh-completions`のような、多くの補完を提供するプラグインに適応しています。リスト は一行に `3` つの補完を表示し、少ない端末サイズを活用することができま す。

<ImgShow height="455.91" width="1660" img="/img/cast/svg/zi_clist.svg" alt="Zi completion list" />

1行により多くの補完を表示する場合、`clist`の**引数** に数字を与えます。例えば: `zi clist 6`

<ImgShow height="455.91" width="1660" img="/img/cast/svg/zi_clist_6.svg" alt="Zi completion list 6" />

### 補完の有効化／無効化

補完を無効にし、Zshの組み込み関数など他の補完を使用することも可能です。 以下のコマンドはとても基本的なもので、必要なのは補完する **コマンド名**だけです:

`cmake` の補完を無効にする:

```shell
zi cdisable cmake
```

`cmake` の補完を有効にする:

```shell
zi cenable cmake
```

コマンド `zi csearch` は利用可能な補完を探すためにプラグインの全てのディレクトリを**検索**します。

<ImgShow height="455.91" width="1180" img="/img/cast/svg/zi_csearch.svg" alt="Zi completion search" />

## Subversionを使ってサブディレクトリ指定

一般的に、Github プロジェクトの **サブディレクトリ** をスニペットとして利用するには、URLに `/trunk/{path-to-dir}` を追加してください。

```shell showLineNumbers
zi ice svn
zi snippet https://github.com/zsh-users/zsh-completions/trunk/src
```

:::tip

Oh-My-Zsh と Prezto については、OMZ:: と PZT:: というプレフィックスには `/trunk/` を付けなくても動作しますが、パスはファイルではなくディレクトリを指す必要があります。

:::

```shell showLineNumbers
zi ice svn
zi snippet PZT::modules/docker
```

## ターボモード (Zsh >= 5.3) {#turbo-mode-zsh--53}

ice 修飾子 `wait` は、 `.zshrc` の処理が終了し、最初のプロンプトが表示される時点まで、プラグインの読み込みを延期することができます。

Windowsと同じで、起動時に、バックグラウンドでデータを読み込んでいるにもかかわらず、デスクトップを表示するのです。 欠点もありますが、10分も真っ白な画面が続くよりは確実にマシです。 しかし、Ziでは、この方法の欠点はありません 。ラグやフリーズなどはありません。プラグインがロードされている間、コマンドラインは完全に使用可能で、プラグインの数に関係なく使用できます。

:::info

Turbo は Zsh の起動を **50%-80%**. 高速化します たとえば、200ミリ秒ではなく、40ミリ秒になります。

:::

:::note

Zsh 5.3以降が必要です。

:::

ターボモードを使用するには、以下のいずれかの方法で、対象のプラグインに `wait` ice を追加してください。

```shell {2} showLineNumbers
PS1="READY > "
zi ice wait'!0'
zi load halfo/lambda-mod-zsh-theme
```

これにより、プラグイン `halfo/lambda-mod-zsh-theme` が `.zshrc`から `0` 秒後に読み込まれるように設定されます。 これは、 1msの間基本プロンプト`READY >`. を表示します。

このような方法でプロンプトを読み込むことはないでしょうが、ターボモードが観察できる良い例です。 感嘆符を使うと、Zi はプラグインのロード後にプロンプトをリセットします。これはテーマに大抵必要です。 Prezto プロンプトの場合も同様です。遅延時間がより長い場合:

```shell showLineNumbers
zi ice svn silent wait'!1' atload'prompt smiley'
zi snippet PZT::modules/prompt
```

`zsh-users/zsh-autosuggestions` を欠点なく使用する場合:

```shell showLineNumbers
zi ice wait lucid atload'!_zsh_autosuggest_start'
zi light zsh-users/zsh-autosuggestions
```

### ターボモードが性能の決め手です。

非同期で読み込むことができるので、プラグインの量が増えたときに大きな差が出ます。 通常、 `zi ice wait'<秒数>'`として使用します。

:::note

`wait` は `wait'0'`と等価です。

:::

```shell showLineNumbers
zi ice wait
zi load z-shell/H-S-MW
```

2秒後に読み込みむ:

```shell showLineNumbers
zi ice wait'2'
zi load z-shell/H-S-MW
```

また、 `light` と `snippet`でも使用することができます。

```shell showLineNumbers
zi ice wait
zi snippet https://gist.githubusercontent.com/hightemp/5071909/raw/
```

### ターボモード & lucid

Turboとlucidが最もよく使われるオプションです。turboモードは表示が冗長なので、quietなオプションが必要な場合があり、これは `lucid`で実現可能です。

```shell showLineNumbers
zi ice wait lucid
zi load z-shell/H-S-MW
```

## 高度なプロンプトを使用したターボ・モード

いくつかの、主に上級者向けのテーマでは、プロンプトの初期化は `precmd`-hook で、つまり、各プロンプトの前に呼ばれる関数で行われています。 フックは、 [add-zsh-hook][12] Zsh 関数によって `$precmd_functions` 配列に名前を追加することでインストールされます。

`zsh-autosuggestions` プラグインの場合と同様に、プロンプトの途中でターボモードを読み込んだ後にプロンプトが完全に初期化されるようにするには、 フックを `atload'…'` ice から呼び出す必要があります。

まず、 `$precmd_functions` の配列を調べて、フック関数の名前を見つけます。 例えば、 `robobenklein/zinc` というテーマでは、 `prompt_zinc_setup` と `prompt_zinc_precmd`という2つの関数になります。

```shell title="print $precmd_functions"
_zsh_autosuggest_start prompt_zinc_setup prompt_zinc_precmd
```

その後、 `atload'…'` ice のリストに追加します。

```shell {2} showLineNumbers
zi ice wait'!' lucid nocd \
  atload'!prompt_zinc_setup; prompt_zinc_precmd'
zi load robobenklein/zinc
```

`atload'!…'` の感嘆符はプラグインのアンロード用に関数を追跡するためのもので、 [ここで説明されています](/docs/guides/syntax/standard#atclone-atpull-atinit-atload)。 次に説明するマルチプロンプトの設定に便利かもしれません。

### ターボモードのまとめ

Autosuggestionが使用する`precmd` フックは、 `.zshrc`の直後に **各プロンプトを表示する直前に呼び出されます。**.

ターボモードで空の `wait` iceを指定すると、`1` ms 読み込みを延期するので、 `precmd` は最初のプロンプトでは呼び出されないことになります。 これにより、最初のプロンプトでautosuggestionは無効となります。

**しかし、** 与えられた `atload'…'` ice修飾子はこれを修正し、 `precmd` と同じ関数を、autosuggestionを読み込んだ直後に呼び出し、結果としてプラグインと同じ動作をするようにします。

`lucid` というiceは、通常ターボロードしたプラグインごとに表示されるプロンプト下のメッセージ `Loaded zsh-users/zsh-autosuggestions` を表示されないようにします。

## 自動条件ベース - ロード & アンロード

`load` と `unload` iceは、プラグインをアクティブまたは非アクティブにする条件を定義することができます。

`~/tmp`に居るときに読み込む:

```shell {1} showLineNumbers
zi ice load'![[ $PWD = */tmp* ]]' unload'![[ $PWD != */tmp* ]]' \
  atload'!promptinit; prompt sprint3'
zi load z-shell/zprompts
```

<ImgShow width="1100" height="325.65" img="/img/cast/svg/zi_load_at_tmp.svg" alt="Zi load at /tmp" />

`~/tmp`以外のときに読み込む:

```shell {1} showLineNumbers
zi ice load'![[ $PWD != */tmp* ]]' unload'![[ $PWD = */tmp* ]]'
zi load russjohnson/angry-fly-zsh
```

<ImgShow width="1100" height="325.65" img="/img/cast/svg/zi_load_not_tmp.svg" alt="Zi load not at /tmp" />

2つのプロンプトは、それぞれ異なるディレクトリでアクティブになります。 このテクニックは、例えば、 `cpp`, `web`, `admin` のような値を持つパラメータ `$PLUGINS` を定義し、 `load` / `unload` 条件を設定して、 `cpp`, `web`, などで異なるプラグインを有効にすることでプラグインのグループを管理することができま す。

:::note

- `wait` との違いは、 `load` / `unload` が最初の起動までだけでなく、常に行われることです。 プラグインのアンロードが機能するためには、プラグインがトラッキングでロードされている必要があるので、 `zi load …` ではなく、 `zi light …`を使うことに注意してください。

トラッキングにより若干の速度低下が発生しますが、ターボモード使用時のZsh起動時間には影響ありません。

:::

### プロンプトの概要

:::tip

参照： <Link to="/docs/guides/customization#multiple-prompts">複数のプロンプト</Link> または詳細。 マルチプロンプト・セットアップの実際の例をさらに示します。これは、著者がセットアップで使用するものに近いものです。

:::

これは [powerlevel10k](https://github.com/romkatv/powerlevel10k), [pure](https://github.com/sindresorhus/pure), [starship](https://github.com/starship/starship) の例です:

powerlevel10kのテーマを読み込む:

```shell title="~/.zshrc" showLineNumbers
zi ice depth"1"
zi light romkatv/powerlevel10k
```

pure のテーマを読み込む:

> `async.zsh` ライブラリを選び、それをソースとする。

```shell {1} title="~/.zshrc" showLineNumbers
zi ice pick"async.zsh" src"pure.zsh"
zi light sindresorhus/pure
```

starship テーマをロード読み込む:

> - `starship` バイナリをコマンドとして、GitHubのリリースから取得します。
> - `atclone` を使って `starship` をセットアップし、 `init.zsh` と `補完`を作成します。
> - `atpull'…'` の動作は `atclone'…'` と同じですが、 `zi update`を実行するときに使用されます。
> - `src` は、 `init.zsh` を読み込みます。

```shell {2} {3} title="~/.zshrc" showLineNumbers
zi ice as"command" from"gh-r" \
  atclone"./starship init zsh > init.zsh; ./starship completions zsh > _starship" \
  atpull"%atclone" src"init.zsh"
zi light starship/starship
```

### 一般的な使用例 {#common-use-cases}

pure テーマを、それにバンドルされている **zsh-async** ライブラリとともに読み込みます。

```shell title="~/.zshrc" showLineNumbers
zi ice pick"async.zsh" src"pure.zsh"
zi light sindresorhus/pure
```

GitHub のバイナリのリリースを使う場合。 自動で展開後、プログラム "fzf "を提供します。

```shell title="~/.zshrc" showLineNumbers
zi ice from"gh-r" as"program"
zi light junegunn/fzf
```

他のバイナリリリース、たとえば `docker-compose-Linux-x86_64`では名前を変更する必要があります。 これは、 [ice modifier][1]: `mv'{from} -> {to}'` で行えます。

OS X, Linux, Windows 用の一つのバージョンに複数のパッケージがあります。 この場合Linux パッケージを選択するために ice修飾子`bpick` が利用できますが必要ありません。`bpick`がない場合は Zi が自動的に OS 名とアーキテクチャを grep してくれます...

```shell title="~/.zshrc" showLineNumbers
zi ice from"gh-r" as"program" mv"docker* -> docker-compose" bpick"*linux*"
zi load docker/compose
```

プラグインをロードせずに補完機能を処理するには、 `clist` コマンドを参照してください。 こちらは、インタラクティブセッションで一度だけ実行することになっています。

```shell title="~/.zshrc"
zi creinstall %HOME/my_completions
```

`~/.zshrc` やその他の Zi の設定をアップロードしている [playground](https://github.com/z-shell/playground) リポジトリをチェックしてみてください。 [](https://github.com/z-shell/playground/issues/new?template=request-to-add-zshrc-to-the-zi-configs-repo.md) `~/.zshrc` 設定を自由に投稿してください。

その他の例： [コレクション](/community/gallery/collection).

<!-- end-of-file -->
<!-- links -->

[1]: /search?q=ice+modifiers

[1]: /search?q=ice+modifiers
[12]: /community/zsh_plugin_standard#use-of-add-zsh-hook-to-install-hooks
