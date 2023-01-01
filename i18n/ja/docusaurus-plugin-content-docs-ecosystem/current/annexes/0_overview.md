---
id: overview
title: "🌀 別館でできることは？"
sidebar_position: 1
image: /img/png/theme/z/320x320.png
description: 別館の紹介
keywords:
  - annex
  - zannex
  - synopsis
  - overview
---

<!-- @format -->

1. 新しい Zi サブコマンド（Zi を呼び出すときに関数 `zi …` の後に置かれる [コマンド][command] など）を追加します。

2. 新しい [ice修飾子][ice-modifiers] を追加します。

3. 4種類のフックを登録します:

   3.1. `atclone` hook - 任意のプラグインのクローンやスニペットのダウンロード後に実行されます。

   3.2. `atpull` フック - 任意のプラグイン/スニペットの新しいコミットをプルした（つまり更新した）後に実行されます。

   3.3. `atinit` フック - プラグイン/スニペットのセットアップ（ダウンロードなど）が完了し、ロードする前に実行されます。

   3.4. `atload` フック - 任意のプラグイン/スニペットをロードした後に実行されます。

4. `zi icemods` サブコマンドで表示されるヘルプテキストを生成するためのフックを登録します。

## 推奨する別館

### 共通

1. [z-a-bin-gem-node][bin-gem-node]
2. [z-a-readurl][readurl]
3. [z-a-patch-dl][patch-dl]
4. [z-a-rust][rust]

### その他

1. [z-a-submods][submods]
2. [z-a-unscope][unscope]
3. [z-a-test][test]

:::tip

[メタプラグイン](/ecosystem/annexes/meta-plugins) を使用して、共通の別館をまとめてインストールします。

```shell
zi light-mode for z-shell/z-a-meta-plugins @annexes
```

共通およびその他の別館をインストールする場合:

```shell
zi light-mode for z-shell/z-a-meta-plugins @annexes+rec
```

:::

## どのように使うのですか？

Below is an example body of an `atclone` hook taken from [submods][submods] annex.

It shows how to:

1. Obtain the arguments passed to the hook.
2. Use an [ice-modifier][ice-modifiers].
3. It also shows a useful snippet that will trim the whitespace in array elements (see `# (4) …` in the code).
4. Utilize the last hook argument – the plugin’s/snippet’s containing directory.

```shell showLineNumbers
emulate -L zsh -o extended_glob -o warn_create_global -o typeset_silent

[[ -z "${ZI_ICE[submods]}" ]] && return 0

# (1) – get arguments
[[ "$1" = plugin ]] && \
local type="$1" user="$2" plugin="$3" id_as="$4" dir="$5" hook="$6" || \
local type="$1" url="$2" id_as="$3" dir="$4" hook="$6" # type: snippet

# (2) – we're interested only in plugins/snippets
# which have the submods'' ice in their load command
[[ -z ${ZI_ICE[submods]} ]] && return 0

local -a mods parts
local mod

# (3) – process the submods'' ice
mods=( ${(@s.;.)ZI_ICE[submods]} )
for mod in "${mods[@]}"; do
  parts=( "${(@s:->:)mod}" )
  # (4) Remove only leading and trailing whitespace
  parts=( "${parts[@]//((#s)[[:space:]]##|[[:space:]]##(#e))/}" )

  print "\nCloning submodule: ${parts[1]} to dir: ${parts[2]}"
  parts[1]="https://github.com/${parts[1]}"
  # (5) – the use of the input argument: `$dir'
  command git -C "$dir" clone --progress "${parts[1]}" "${parts[2]}"
done
```

The recommended method of creating a hook is to place its body into a file that starts with a right arrow `→` ([more information][the-proposed-function-name-prefixes], and also a `za-` prefix, e.g. `→za-myproject-atclone-hook` and then to mark it for autoloading via `autoload -Uz →za-myproject-atclone-hook`. Then register the hook, presumably in the `myproject.plugin.zsh` file, with the API call:

`@zi-register-annex`:

```shell
@zi-register-annex myproject hook:atclone \
  →za-myproject-atclone-handler \
  →za-myproject-atclone-help-handler \
  "submods''" # register a new ice-modifier: submods''
```

The general syntax of the API call is:

```shell
@zi-register-annex {project-name} \
  {hook: \
  {name-of-the-handler-function} \
  {name-of-the-HELP-handler-function} \
  "{ice-mod1}|{ice-mod2}|…" < hook-type >| subcommand: < new-subcommand-name > }
```

The last argument, i.e. the `|`-separated ice list, is optional. That’s all\! After this loading the plugin `myproject` will set up the new [ice-modifier][ice-modifiers] `submods` that will have syntax `submods'{user}/{plugin} –> {output-dir}; …'` and will clone submodules when installing the original plugin or snippet\!

Example of the [submods][submods] ice-modifier to load the `zsh-autosuggestions` plugin via the Prezto module: `autosuggestions`:

```shell showLineNumbers
zi ice svn submods'zsh-users/zsh-autosuggestions -> external'
zi snippet PZT::modules/autosuggestions
```

Check out the project which fully implements this idea, [z-a-submods][submods]. It e.g. also implements the `atpull` hook, i.e. supports the automatic update of the submodules. The `z-a-*` prefix is recommended for projects which indicate annexes.

## 概要

There are 2 or 3 subtypes for each of the hooks:

1. `atinit` or `!atinit` – the `!` version is run before the `atinit` ice-modifier (i.e. before `zi ice atinit'echo this!'; …`), while the normal version runs after it.
2. `atload` or `!atload` – analogous to the `atinit` case: the `!` version runs before the `atload` ice-modifier (while the normal version runs after it).
3. `atclone` or `!atclone` – analogous to the `atinit` and `atload` cases.
4. `atpull`, `!atpull`, or `%atpull` – the first two are being run **only when there are new commits to be downloaded** during the update. The `%` version is being **always** run, regardless of whether the update will pull any actual commits or not, and it is being run **after** the `atpull` ice-modifier.

<!-- end-of-file  -->
<!-- links -->



<!-- external -->

[command]: /docs/guides/commands
[ice-modifiers]: /docs/guides/syntax/ice-modifiers
[ice-modifiers]: /docs/guides/syntax/ice-modifiers
[the-proposed-function-name-prefixes]: /community/zsh_plugin_standard#the-proposed-function-name-prefixes

[bin-gem-node]: https://github.com/z-shell/z-a-bin-gem-node
[patch-dl]: https://github.com/z-shell/z-a-patch-dl
[readurl]: https://github.com/z-shell/z-a-readurl
[rust]: https://github.com/z-shell/z-a-rust
[submods]: https://github.com/z-shell/z-a-submods
[submods]: https://github.com/z-shell/z-a-submods
[test]: https://github.com/z-shell/z-a-test
[unscope]: https://github.com/z-shell/z-a-unscope
