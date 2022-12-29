---
id: overview
title: "🌀 What can Annexes do?"
sidebar_position: 1
image: /img/png/theme/z/320x320.png
description: Annex Introduction
keywords:
  - annex
  - zannex
  - synopsis
  - overview
---

<!-- @format -->

1. Add a new Zi subcommand (i.e. the [command][command] that’s placed after the function `zi …` when calling Zi).

2. Add new [ice-modifiers][ice-modifiers].

3. Register four types of hooks:

   3.1. `atclone` hook – run after cloning any plugin or downloading any snippet.

   3.2. `atpull` hook – run after pulling new commits (i.e. updating) for any plugin/snippet.

   3.3. `atinit` hook – run before loading any plugin/snippet, after it has been set up (i.e. downloaded).

   3.4. `atload` hook – run after loading any plugin/snippet.

4. Register hooks for generating help text, shown by the `zi icemods` subcommand.

## Recommended annexes

### Common

1. [z-a-bin-gem-node][bin-gem-node]
2. [z-a-readurl][readurl]
3. [z-a-patch-dl][patch-dl]
4. [z-a-rust][rust]

### Additional

1. [z-a-submods][submods]
2. [z-a-unscope][unscope]
3. [z-a-test][test]

:::tip

Use [meta-plugins](/ecosystem/annexes/meta-plugins) to install common annexes as a group:

```shell
zi light-mode for z-shell/z-a-meta-plugins @annexes
```

To install common and additional annexes:

```shell
zi light-mode for z-shell/z-a-meta-plugins @annexes+rec
```

:::

## How to code them?

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
