---
id: migration
title: '♻️ 移行'
image: /img/png/theme/z/320x320.png
description: 移行ガイド
keywords:
  - prezto
  - oh-my-zsh
---

import Link from '@docusaurus/Link';

## Oh-My-Zsh

### OMZ のショートハンドシンタックス

```shell title="~/.zshrc" showLineNumbers
zi snippet <URL>        # Raw syntax with URL
zi snippet OMZ::<PATH>  # Shorthand OMZ::         (http://github.com/ohmyzsh/ohmyzsh/raw/master/)
zi snippet OMZL::<PATH> # Shorthand OMZ::lib      (http://github.com/ohmyzsh/ohmyzsh/raw/master/lib)
zi snippet OMZT::<PATH> # Shorthand OMZ::themes   (http://github.com/ohmyzsh/ohmyzsh/raw/master/themes)
zi snippet OMZP::<PATH> # Shorthand OMZ::plugins  (http://github.com/ohmyzsh/ohmyzsh/raw/master/plugins)
```

### OMZライブラリ

OMZ ライブラリから [クリップボード][omz/clipboard] と [termsupport][omz/termsupport] をインポートする例:

生の構文:

```shell title="~/.zshrc" showLineNumbers
zi snippet https://github.com/ohmyzsh/ohmyzsh/blob/master/lib/clipboard.zsh
zi snippet https://github.com/ohmyzsh/ohmyzsh/blob/master/lib/termsupport.zsh
```

OMZの省略記号構文:

```shell title="~/.zshrc" showLineNumbers
zi snippet OMZ::lib/clipboard.zsh
zi snippet OMZ::lib/termsupport.zsh
```

OMZLの省略記号構文:

```shell title="~/.zshrc" showLineNumbers
zi snippet OMZL::clipboard.zsh
zi snippet OMZL::termsupport.zsh
```

より高度な、Subversionを使ったライブラリの読み込みの例:

```shell title="~/.zshrc" showLineNumbers
if (( $+commands[svn] )) {
    sni=({git,theme-and-appearance,prompt_info_functions,history,completion,vcs_info}.zsh)
    zi is-snippet has'svn' for svn \
        multisrc'${sni[*]}' pick'/dev/null' \
        atinit'typeset -gx COMPLETION_WAITING_DOTS=true \
    HISTSIZE=290000 SAVEHIST=290000 HISTFILE=${ZSH_CACHE_DIR}/.history;' \
      OMZ::lib
    unset sni
} else {
    +zi-message "{auto}Subversion not installed!"
}
```

### OMZ プラグイン

```diff title="~/.zshrc" showLineNumbers
- plugins=(
-  git
-  dotenv
-  rake
-  rbenv
-  ruby
-)

+ zi snippet OMZP::git
+ zi snippet OMZP::dotenv
+ zi snippet OMZP::rake
+ zi snippet OMZP::rbenv
+ zi snippet OMZP::ruby
```

より高度な、条件付きターボローディングの例:

```shell title="~/.zshrc" showLineNumbers
zi is-snippet wait lucid for \
    atload"unalias grv g" \
  OMZP::{git,sudo,encode64,extract} \
    if'[[ -d /opt/google-cloud-sdk ]]' \
  OMZP::gcloud \
    if'[[ -f /etc/os-release ]] && source /etc/os-release && [[ "$ID" = arch ]]' \
  OMZP::archlinux \
    if'[[ -d ~/.nvm ]]' \
  OMZP::nvm \
    if'[[ -d ~/.ssh ]]' \
  OMZP::ssh-agent \
    if'[[ -d ~/.gnupg ]]' \
  OMZP::gpg-agent \
    if'[[ "$OSTYPE" = *-gnu ]]' \
  OMZP::gnu-utils \
    has'pip' \
  OMZP::pip \
    has'python' \
  OMZP::python
```

:::tip

上の例を1つのファイルに束ねる:

`zi snippet <some/path/or/url/bundled-snippets.zsh`

:::

複数のファイルがサブディレクトリ全体を必要とする場合は、 `zi ice svn` を使用します。

- [gitfast][omz/gitfast]
- [osx][omz/osx]
- [history-substring-search][omz/history-substring-search]

```shell title="~/.zshrc" showLineNumbers
zi ice svn
zi snippet OMZP::gitfast

zi ice svn
zi snippet OMZP::osx

zi ice svn
zi snippet OMZP::history-substring-search
```

`zi ice as "completion"` を使用すると、単一ファイルの補完スニペットを直接追加することができます。

- [docker][omz/docker]
- [fd][omz/fd]
- [ag][omz/ag]

```shell title="~/.zshrc" showLineNumbers
zi ice as"completion"
zi snippet OMZP::docker/_docker

zi ice as"completion"
zi snippet OMZP::fd/_fd

zi ice as"completion"
zi snippet OMZP::ag/_ag
```

### OMZ テーマ

テーマは `themes` ディレクトリに保存され、簡単な構文でバックグラウンドで読み込まれます。

```shell title="~/.zshrc"
ZSH_THEME="robbyrussell"
```

ただし、Zi は `ZSH_THEME` 変数をネイティブにサポートしていません。

**OMZ用に作成したテーマ** を使用するには、バックグラウンドでOMZが行っているのと同じように、以下のような読み込みが必要です。

> テーマによっては、追加の設定が必要な場合があります。それは、テーマ設定ファイルから判断できます。

- `git` ライブラリを読み込む
- `git` プラグインをロードする
- ライブラリの依存関係を読み込む
- `setopt prompt_subst`を設定

上記のうち1つでも欠けていたり、順番が違っていたりすると、以下のようにテーマが壊れます。

```shell
… $(build_prompt) …
```

`Git` ライブラリがロードされていなかったり、ロードする順番を間違えたりすると、以下のような表示になることがあります。

```shell showLineNumbers
........:1: command not found: git_prompt_status
........:1: command not found: git_prompt_short_sha
```

テーマで問題が発生した場合、OMZサポートライブラリを読み込む必要があります。

- もし、あなたのテーマがあるべき時に色づけされていないなら、 `theme-and-appearance.zsh`をロードしてください。

- 次のようなエラーメッセージが表示された場合:

```shell showLineNumbers
zsh: command not found: ruby_prompt_info
```

`prompt_info_functions.zsh`を読み込む必要があります。

まとめると、次のようになります:

```shell title="~/.zshrc" showLineNumbers
zi snippet OMZL::git.zsh
zi snippet OMZP::git
zi snippet OMZL::theme-and-appearance.zsh
zi snippet OMZL::prompt_info_functions.zsh
```

その後、プロンプトを読み込みます:

```shell showLineNumbers
setopt prompt_subst
zi snippet OMZT::robbyrussell
```

### 外部テーマのサンプル: [NicoSantangelo/Alpharized][]

OMZを読み込む:

```shell title="~/.zshrc"
ZSH_THEME="alpharized"
```

OMZから `git` ライブラリを読み込む:

```shell title="~/.zshrc"
zi snippet OMZL::git.zsh
```

OMZから `git` プラグインを読み込む:

```shell title="~/.zshrc" showLineNumbers
zi snippet OMZP::git
zi cdclear -q
```

その後、プロンプトを読み込みます:

```shell title="~/.zshrc" showLineNumbers
setopt prompt_subst
zi light NicoSantangelo/Alpharized
```

## Prezto

### PZT 省略記号構文

```shell title="~/.zshrc" showLineNumbers
zi snippet <URL>        # Raw syntax with URL
zi snippet PZT::<PATH>  # Shorthand PZT::         (https://github.com/sorin-ionescu/prezto/tree/master/)
zi snippet PZTM::<PATH> # Shorthand PZT::modules/ (https://github.com/sorin-ionescu/prezto/tree/master/modules/)
```

### PZT モジュール {#pzt-modules}

Preztoの[environment](https://github.com/sorin-ionescu/prezto/tree/master/modules/environment/README.md) と [terminal](https://github.com/sorin-ionescu/prezto/tree/master/modules/terminal/README.md) モジュールのインポートの例:

生の構文

```shell title="~/.zshrc" showLineNumbers
zi snippet https://github.com/sorin-ionescu/prezto/blob/master/modules/environment/init.zsh
zi snippet https://github.com/sorin-ionescu/prezto/blob/master/modules/terminal/init.zsh
```

PZT 省略記号構文:

```shell title="~/.zshrc" showLineNumbers
zi snippet PZT::<PATH>
zi snippet PZT::modules/environment
zi snippet PZT::modules/terminal
```

PZTMの省略記号構文:

```shell title="~/.zshrc" showLineNumbers
zi snippet PZTM::<PATH>
zi snippet PZTM::environment
zi snippet PZTM::terminal
```

Preztoモジュール:

```diff title="~/.zshrc" showLineNumbers
- zstyle ':prezto:load' pmodule 'git'
- zstyle ':prezto:load' pmodule 'environment' 'terminal'

+ zi snippet PZTM::git
+ zi is-snippet for PZTM::environment PZTM::terminal
```

利用可能なPreztoモジュール:

| モジュール名                                                                                                                     | 説明                                                                 |
| -------------------------------------------------------------------------------------------------------------------------- |:------------------------------------------------------------------ |
| [archive](https://github.com/sorin-ionescu/prezto/blob/master/modules/archive/README.md)                                   | アーカイブの一覧表示や抽出を行う機能を提供します。                                          |
| [autosuggestions](https://github.com/sorin-ionescu/prezto/blob/master/modules/autosuggestions/README.md)                   | `zsh-autosuggestions` プラグインを Prezto に統合します。                        |
| [command-not-found](https://github.com/sorin-ionescu/prezto/tree/master/modules/command-not-found/README.md)               | MacOS または Debian ベースのディストリビューションで、 `command-not-found` ツールをロードします。 |
| [completion](https://github.com/sorin-ionescu/prezto/tree/master/modules/completion/README.md)                             | <kbd>TAB</kbd> 補完を設定し、 `zsh-completions`から追加の補完を提供します。             |
| [directory](https://github.com/sorin-ionescu/prezto/tree/master/modules/directory/README.md)                               | ディレクトリのオプションを設定し、ディレクトリ・エイリアスを定義します。                               |
| [dnf](https://github.com/sorin-ionescu/prezto/tree/master/modules/dnf/README.md)                                           | `dnf` エイリアスを定義します。                                                 |
| [docker](https://github.com/sorin-ionescu/prezto/tree/master/modules/docker/README.md)                                     | `docker` エイリアスや関数を定義しています。                                         |
| [dpkg](https://github.com/sorin-ionescu/prezto/tree/master/modules/dpkg/README.md)                                         | `dpkg` エイリアスや関数を定義しています。                                           |
| [editor](https://github.com/sorin-ionescu/prezto/tree/master/modules/editor/README.md)                                     | キーバインディングを設定します。                                                   |
| [emacs](https://github.com/sorin-ionescu/prezto/tree/master/modules/emacs/README.md)                                       | Emacsの依存関係管理を有効にします。                                               |
| [environment](https://github.com/sorin-ionescu/prezto/tree/master/modules/environment/README.md)                           | 一般的なシェルオプションを設定し、環境変数を定義します。                                       |
| [fasd](https://github.com/sorin-ionescu/prezto/tree/master/modules/fasd/README.md)                                         | 頻繁に使用するファイルやディレクトリのリストを保持し、高速なアクセスを実現します。                          |
| [git](https://github.com/sorin-ionescu/prezto/tree/master/modules/git/README.md)                                           | 別名、関数、およびリポジトリー状況情報をプロンプトに表示することによって、 Git を拡張します。                  |
| [gnu-utility](https://github.com/sorin-ionescu/prezto/tree/master/modules/gnu-utility/README.md)                           | GNU 以外のシステムでの GNU ユーティリティのインタラクティブな使用を可能にします。                      |
| [gpg](https://github.com/sorin-ionescu/prezto/tree/master/modules/gpg/README.md)                                           | `gpg-agent`を設定することにより、GPGをより簡単に利用できるようにします。                        |
| [haskell](https://github.com/sorin-ionescu/prezto/tree/master/modules/haskell/README.md)                                   | Haskell パッケージのローカルインストールを有効にします。                                   |
| [helper](https://github.com/sorin-ionescu/prezto/tree/master/modules/helper/README.md)                                     | モジュール開発のためのヘルパー機能を提供します。                                           |
| [history-substring-search](https://github.com/sorin-ionescu/prezto/tree/master/modules/history-substring-search/README.md) | Zsh-history-substring-searchをPreztoに統合します。                         |
| [history](https://github.com/sorin-ionescu/prezto/tree/master/modules/history/README.md)                                   | ヒストリーのオプションを設定し、ヒストリーのエイリアスを定義します。                                 |
| [homebrew](https://github.com/sorin-ionescu/prezto/tree/master/modules/homebrew/README.md)                                 | Homebrewのエイリアスを定義します。                                              |
| [macports](https://github.com/sorin-ionescu/prezto/tree/master/modules/macports/README.md)                                 | MacPortsのエイリアスを定義し、MacPortsのディレクトリをpathに追加します。                     |
| [node](https://github.com/sorin-ionescu/prezto/tree/master/modules/node/README.md)                                         | Node.js 用のユーティリティ関数を提供し、 `npm` 補完をロードします。                          |
| [ocaml](https://github.com/sorin-ionescu/prezto/tree/master/modules/ocaml/README.md)                                       | OCaml パッケージ管理を初期化します。                                              |
| [osx](https://github.com/sorin-ionescu/prezto/tree/master/modules/osx/README.md)                                           | MacOSのエイリアスや関数を定義しています。                                            |
| [pacman](https://github.com/sorin-ionescu/prezto/tree/master/modules/pacman/README.md)                                     | Pacman パッケージマネージャとフロントエンドのためのエイリアスや関数を提供します。                       |
| [perl](https://github.com/sorin-ionescu/prezto/tree/master/modules/perl/README.md)                                         | MacOSでのPerlモジュールのローカルインストールを可能にし、エイリアスを定義します。                      |
| [prompt](https://github.com/sorin-ionescu/prezto/tree/master/modules/prompt/README.md)                                     | プロンプトのテーマを読み込みます。                                                  |
| [python](https://github.com/sorin-ionescu/prezto/tree/master/modules/python/README.md)                                     | ローカルPythonおよびローカルPythonパッケージのインストールを有効にします。                        |
| [rails](https://github.com/sorin-ionescu/prezto/tree/master/modules/rails/README.md)                                       | Ruby on Railsのエイリアスを定義します。                                         |
| [rsync](https://github.com/sorin-ionescu/prezto/tree/master/modules/rsync/README.md)                                       | `rsync` エイリアスを定義します。                                               |
| [ruby](https://github.com/sorin-ionescu/prezto/tree/master/modules/ruby/README.md)                                         | Rubyのローカルgemのインストール、バージョンマネージャのロード、エイリアスの定義などを設定します。               |
| [screen](https://github.com/sorin-ionescu/prezto/tree/master/modules/screen/README.md)                                     | GNU Screen のエイリアスを定義し、起動時に自動起動する機能を提供します。                          |
| [spectrum](https://github.com/sorin-ionescu/prezto/tree/master/modules/spectrum/README.md)                                 | 256 colorやエフェクトをより使いやすくするための機能を提供します。                              |
| [ssh](https://github.com/sorin-ionescu/prezto/tree/master/modules/ssh/README.md)                                           | `ssh-agent`を設定することにより、SSH をより簡単に使用できるようにします。                       |
| [syntax-highlighting](https://github.com/sorin-ionescu/prezto/tree/master/modules/syntax-highlighting/README.md)           | `zsh-syntax-highlighting` を Prezto に統合します。                         |
| [terminal](https://github.com/sorin-ionescu/prezto/tree/master/modules/terminal/README.md)                                 | ターミナルウィンドウとタブのタイトルを設定します。                                          |
| [tmux](https://github.com/sorin-ionescu/prezto/tree/master/modules/tmux/README.md)                                         | `tmux` エイリアスを定義し、起動時に自動起動する機能を提供します。                               |
| [utility](https://github.com/sorin-ionescu/prezto/tree/master/modules/utility/README.md)                                   | 一般的なエイリアスや関数を定義します。                                                |
| [wakeonlan](https://github.com/sorin-ionescu/prezto/tree/master/modules/wakeonlan/README.md)                               | このモジュールは、wakeonlanツールのラッパーを提供します。                                  |
| [yum](https://github.com/sorin-ionescu/prezto/blob/master/modules/autosuggestions/README.md)                               | yum のエイリアスを定義します。                                                  |

複数のファイルがサブディレクトリ全体を必要とする場合は、 `zi ice svn` を使用します。

- [docker](https://github.com/sorin-ionescu/prezto/tree/master/modules/docker/README.md)
- [git](https://github.com/sorin-ionescu/prezto/tree/master/modules/git/README.md)

```shell title="~/.zshrc" showLineNumbers
zi ice svn
zi snippet PZTM::docker

zi ice svn
zi snippet PZTM::git
```

`*.plugin.zsh`, `init.zsh`, `*.zsh-theme*` ファイルがモジュールディレクトリに存在しない場合 `zi ice as"null"`を使用してください。

- [archive](https://github.com/sorin-ionescu/prezto/tree/master/modules/archive/README.md):

```shell title="~/.zshrc" showLineNumbers
zi ice svn as"null"
zi snippet PZTM::archive
```

モジュールが外部モジュールを使用している場合は、 `zi atclone"git clone <repo> <location>"` を使用します。

- [completion](https://github.com/sorin-ionescu/prezto/tree/master/modules/completion/README.md):

```shell title="~/.zshrc" showLineNumbers
zi ice svn blockf \
  atclone"git clone --recursive https://github.com/zsh-users/zsh-completions.git external"
zi snippet PZTM::completion
```

Zi は `fpath`を管理しているので、 `fpath`への不必要な追加を防ぐには `blockf` を使用してください。

:::tip

`zstyle`とは？

- 公式 (zsh.sourceforge.net): [zsh/zutil](http://zsh.sourceforge.net/Doc/Release/Zsh-Modules.html#The-zsh_002fzutil-Module)
- StackExchange: [What does `zstyle` do?][about-zstyle]

:::

利用可能

## Zgen

### OMZライブラリの読み込み

```diff title="~/.zshrc" showLineNumbers
- zgen oh-my-zsh

+ zi snippet OMZL::<ANY OF THEM>
```

### OMZプラグインの読み込み

```diff title="~/.zshrc" showLineNumbers
- zgen oh-my-zsh <PATH>

+ zi snippet OMZP::<PATH>
```

### Prezto モジュールのロード

```diff title="~/.zshrc" showLineNumbers
- zgen prezto <module name>

+ zi snippet PZTM::<module name>
```

リポジトリを prezto プラグインとして読み込む:

```diff title="~/.zshrc" showLineNumbers
- zgen pmodule <reponame> <branch>

+ zi ice ver"<branch>"
+ zi load <repo/plugin>
```

### Zgenの要約

:::info

`location`については、<Link to="/docs/guides/syntax/standard#src-pick-multisrc">src、pick、multisrc </Link> ice修飾子を参照してください。

:::

```diff title="~/.zshrc" showLineNumbers
- zgen load <repo> [location] [branch]

+ zi ice ver"[branch]"
+ zi load <repo>
```

## Zplugの基本

```diff title="~/.zshrc" showLineNumbers
- zplug <repo/plugin>, tag1:<option1>, tag2:<option2>

+ zi ice tag1"<option1>" tag2"<option2>"
+ zi load <repo/plugin>
```

### タグの比較

- `as` => `as`
- `use` => `pick`, `src`, `multisrc`
- `ignore` => None
- `from` => `from`
- `at` => `ver`
- `rename-to` => `mv`, `cp`
- `dir` => Selection(`pick`, …) with rename
- `if` => `if`
- `hook-build` => `atclone`, `atpull`
- `hook-load` => `atload`
- `frozen` => None
- `on` => None
- `defer` => `wait`
- `lazy` => `autoload`
- `depth` => `depth`

<!-- end-of-file -->
<!-- links -->
<!-- external -->

[about-zstyle]: https://unix.stackexchange.com/questions/214657/what-does-zstyle-do
[NicoSantangelo/Alpharized]: https://github.com/nicosantangelo/Alpharized
[omz/ag]: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/ag
[omz/clipboard]: https://github.com/ohmyzsh/ohmyzsh/blob/master/lib/clipboard.zsh
[omz/docker]: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/docker
[omz/fd]: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/fd
[omz/gitfast]: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/gitfast
[omz/history-substring-search]: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/history-substring-search
[omz/osx]: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/osx
[omz/termsupport]: https://github.com/ohmyzsh/ohmyzsh/blob/master/lib/termsupport.zsh
