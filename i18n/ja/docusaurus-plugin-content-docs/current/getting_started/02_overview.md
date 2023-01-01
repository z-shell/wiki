---
id: overview
title: '☑️ 概要'
image: /img/logo/320x320.png
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

Using one other ice modifier "**pick**" users can explicitly **select the file to source**:

```shell {1} showLineNumbers
zi ice svn pick"init.zsh"
zi snippet PZT::modules/git
```

The content of the ice-modifier is simply put into `"…"`, `'…'`, `$'…'`. No need for `":"` after the ice-modifier name (although it's allowed: as the equal sign `=`, e.g. `pick="init.zsh"` or `pick=init.zsh`).

This way editors like `vim` and `emacs` and also `zsh-users/zsh-syntax-highlighting` and `z-shell/F-Sy-H` will highlight the contents of ice-modifiers.

## as"program" について

あるプラグインはファイルを読み込むだけではなく、`$PATH`にコマンドを追加するかもしれません。 To obtain this effect, use ice-modifier `as` with value `program` (or an alias value `command`).

```shell {1} showLineNumbers
zi ice as"program" cp"httpstat.sh -> httpstat" pick"httpstat"
zi light b4b4r07/httpstat
```

The above command will add plugin directory to `$PATH`, copy file `httpstat.sh` into `httpstat` and add execution rights (`+x`) to the file selected with `pick`, i.e. to `httpstat`. Another ice-mod exists, `mv`, which works like `cp` but **moves** a file instead of **copying** it. `mv` is run before `cp`.

:::tip

The `cp` and `mv` ices (and also some other ones, like `atclone`) are being run when the plugin or snippet is being _installed_. To test them again first delete the plugin or snippet (example: `zi delete PZT::modules/osx`).

:::

## Ice 修飾子: atpull'…'

Copying file is safe for doing later updates – original files of the repository are unmodified and `Git` will report no conflicts. However, `mv` also can be used, if a proper `atpull`, an ice-modifier ran at **update** of the plugin:

```shell showLineNumbers
zi ice as"program" mv"httpstat.sh -> httpstat" \
  pick"httpstat" atpull'!git reset --hard'
zi light b4b4r07/httpstat
```

If `atpull` starts with an exclamation mark, then it will be run before `git pull`, and before `mv`. Nevertheless, `atpull`, `mv`, and `cp` are run **only if new commits are to be fetched**.

So in summary, when the user runs `zi update b4b4r07/httpstat` to update this plugin, and there are new commits, what happens first is that `git reset --hard` is run – and it **restores** original `httpstat.sh`, **then** `git pull` is ran and it downloads new commits (doing fast-forward), **then** `mv` is running again so that the command is `httpstat` not `httpstat.sh`.

This way the `mv` ice can be used to induce permanent changes into the plugin's contents without blocking the ability to update it with `git` or with `subversion` in the case of snippets.

:::info

For exclamation marks to not be expanded by Zsh an interactive session, use `'…'` not `"…"` to enclose contents of `atpull` [ice-modifier](/search?q=ice-modifier).

:::

## Ice 修飾子: subscribe'…'

Ice modifier defers the loading of a plugin while checking the modification time of the given file(s), and when it changes, it then triggers the loading of the plugin or a snippet.

Copy and paste the example below to the terminal or add it to the `.zshrc` file and reload the shell with `exec zsh`.

```shell {1} showLineNumbers
zi ice subscribe'{~/files-*,/tmp/files-*}' id-as'z-sub' lucid \
  atload'+zi-message "{profile}I have been loaded{nl}\
  {auto}\`Zi Rocks ♥\`"' notify"Yes that is cool ♥ "
zi load z-shell/0
```

Update file as subscribed above to test the ice modifier:

```shell
touch ~/files-1
```

The plugin or snippet will be sourced as many times as the file gets updated.

## スニペットで as'…' program

Commands can also be added to `$PATH` using **snippets**:

```shell {2} showLineNumbers
zi ice mv"httpstat.sh -> httpstat" \
  pick"httpstat" as"program"
zi snippet https://github.com/b4b4r07/httpstat/blob/master/httpstat.sh
```

:::tip

Snippets also support `atpull`, e.g. `atpull'!svn revert'`. There’s also an `atinit` ice-modifier, executed before each loading of plugin or snippet.

:::

## スニペットで as'…' completion

By using the `as'…'` ice modifier with the value `completion` you can point the `snippet` subcommand directly to a completion file:

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

This command is adapted for plugins like `zsh-users/zsh-completions`, which provide many completions – listing will have `3` completions per line, and a smaller number of terminal pages can be occupied like this:

<ImgShow height="455.91" width="1660" img="/img/cast/svg/zi_clist.svg" alt="Zi completion list" />

To show more completions per line by providing an **argument** to `clist`, e.g.: `zi clist 6`, will show:

<ImgShow height="455.91" width="1660" img="/img/cast/svg/zi_clist_6.svg" alt="Zi completion list 6" />

### 補完の有効化／無効化

Completions can be disabled and other completion will be used, e.g. Zsh builtin. The commands are very basic, they only need completion **name**:

`cmake` の補完を無効にする:

```shell
zi cdisable cmake
```

`cmake` の補完を有効にする:

```shell
zi cenable cmake
```

Command `zi csearch` will **search** all plugin directories for available completions:

<ImgShow height="455.91" width="1180" img="/img/cast/svg/zi_csearch.svg" alt="Zi completion search" />

## The subversion for subdirectories

In general, to use **subdirectories** of Github projects as snippets add `/trunk/{path-to-dir}` to the URL:

```shell showLineNumbers
zi ice svn
zi snippet https://github.com/zsh-users/zsh-completions/trunk/src
```

:::tip

For Oh-My-Zsh and Prezto, the OMZ:: and PZT:: prefixes work without the need to add the `/trunk/` infix, however, the path should point to a directory, not to a file.

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

これにより、プラグイン `halfo/lambda-mod-zsh-theme` が `.zshrc`から `0` 秒後に読み込まれるように設定されます。 It will fire up after c.a. 1 ms of showing the basic prompt `READY >`.

このような方法でプロンプトを読み込むことはないでしょうが、ターボモードが観察できる良い例です。 感嘆符を使うと、Zi はプラグインのロード後にプロンプトをリセットします。これはテーマに大抵必要です。 Prezto プロンプトの場合も同様です。遅延時間がより長い場合:

```shell showLineNumbers
zi ice svn silent wait'!1' atload'prompt smiley'
zi snippet PZT::modules/prompt
```

`zsh-users/zsh-autosuggestions` を欠点なく使用する場合:

```shell showLineNumbers
zi ice wait lucid atload'_zsh_autosuggest_start'
zi light zsh-users/zsh-autosuggestions
```

### ターボモードが性能の決め手です。

非同期で読み込むことができるので、プラグインの量が増えたときに大きな差が出ます。 通常、 `zi ice wait'<秒数>'`として使用します。

:::note

`wait` は `wait'0'`と等価です。

:::

```shell showLineNumbers
zi ice wait
zi load z-shell/history-search-multi-word
```

2秒後に読み込みむ:

```shell showLineNumbers
zi ice wait'2'
zi load z-shell/history-search-multi-word
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
zi load z-shell/history-search-multi-word
```

## 高度なプロンプトを使用したターボ・モード

いくつかの、主に上級者向けのテーマでは、プロンプトの初期化は `precmd`-hook で、つまり、各プロンプトの前に呼ばれる関数で行われています。 The hook is installed by the [add-zsh-hook][12] Zsh function by adding its name to the `$precmd_functions` array.

To make the prompt fully initialized after turbo mode loading in the middle of the prompt the same situation as with the `zsh-autosuggestions` plugin, the hook should be called from `atload'…'` ice.

First, find the name of the hook function by examining the `$precmd_functions` array. For example, for the `robobenklein/zinc` theme, they'll be two functions: `prompt_zinc_setup` and `prompt_zinc_precmd`:

```shell title="print $precmd_functions"
_zsh_autosuggest_start prompt_zinc_setup prompt_zinc_precmd
```

Then, add them to the ice list in the `atload'…'` ice:

```shell {2} showLineNumbers
zi ice wait'!' lucid nocd \
  atload'!prompt_zinc_setup; prompt_zinc_precmd'
zi load robobenklein/zinc
```

The exclamation mark in `atload'!…'` is to track the functions allowing the plugin to be unloaded, as described [here](/docs/guides/syntax/standard#atclone-atpull-atinit-atload). It might be useful for the multi-prompt setup described next.

### ターボモードのまとめ

Autosuggestions use the `precmd` hook, which is being called right after processing `.zshrc` – `precmd` hooks are being called **right before displaying each prompt**.

Turbo mode with the empty `wait` ice will postpone the loading `1` ms after that, so `precmd` will not be called at that first prompt. This makes autosuggestions inactive at the first prompt.

**However** the given `atload'…'` ice-modifier fixes this, it calls the same function that `precmd` would, right after loading autosuggestions, resulting in the same behavior of the plugin.

The ice called `lucid` causes the under-prompt message saying `Loaded zsh-users/zsh-autosuggestions` that normally appears for every Turbo-loaded plugin to not show.

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

2つのプロンプトは、それぞれ異なるディレクトリでアクティブになります。 This technique can be used to have plugin-sets, e.g. by defining parameter `$PLUGINS` with possible values like `cpp`, `web`, `admin` and by setting `load` / `unload` conditions to activate different plugins on `cpp`, on `web`, etc.

:::note

- The difference with `wait` is that `load` / `unload` are constantly active, not only till the first activation. プラグインのアンロードが機能するためには、プラグインがトラッキングでロードされている必要があるので、 `zi load …` ではなく、 `zi light …`を使うことに注意してください。

トラッキングにより若干の速度低下が発生しますが、ターボモード使用時のZsh起動時間には影響ありません。

:::

### A Glance at the prompts

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

There are multiple packages per single version for OS X, Linux, and Windows – the ice-modifier `bpick` is utilized to select the Linux package – in this case - not required, Zi will grep operating system name and architecture automatically when there's no `bpick`.

```shell title="~/.zshrc" showLineNumbers
zi ice from"gh-r" as"program" mv"docker* -> docker-compose" bpick"*linux*"
zi load docker/compose
```

プラグインをロードせずに補完機能を処理するには、 `clist` コマンドを参照してください。 こちらは、インタラクティブセッションで一度だけ実行することになっています。

```shell title="~/.zshrc"
zi creinstall %HOME/my_completions
```

If you are interested to try out more then check out the [playground repository](https://github.com/z-shell/playground) where users have uploaded the `~/.zshrc` and other Zi configurations. [](https://github.com/z-shell/playground/issues/new?template=request-to-add-zshrc-to-the-zi-configs-repo.md) `~/.zshrc` 設定を自由に投稿してください。

その他の例： [コレクション](/community/gallery/collection).

<!-- end-of-file -->
<!-- links -->

[1]: /search?q=ice+modifiers

[1]: /search?q=ice+modifiers
[12]: /community/zsh_plugin_standard#use-of-add-zsh-hook-to-install-hooks
