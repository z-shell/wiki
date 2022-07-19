---
id: ice-modifiers
title: '🧊 Ice Modifiers'
sidebar_position: 4
image: img/logo/320x320.png
description: Ice Modifiers Documentation
keywords:
  - ice-syntax
  - ice-modifiers
---

import APITable from '@site/src/components/APITable';

An ice modifiers are [passed][alternate-syntax] to `zi ice …` to obtain described effects, additionally can be added with [annexes][12]. To see all available ice modifiers run `zi -h`.

The word `ice` means something that's added, like ice to a drink – and in ZI it means adding a modifier to a next `zi` command, and also something temporary because it melts – and this means that the modification will last only for a **single** next `zi` command.

Some ice modifiers are highlighted and clicking on them will take you to the appropriate Wiki page for an extended explanation. You may safely assume that given ice works with both plugins and snippets unless explicitly stated otherwise.

## <i class="fa-solid fa-list"></i> Ice effects {#ice-effects}

<APITable>

|     Modifier      | Description                                                                                                                                                                                                                                                                                                         |
| :---------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|       `as`        | Can be `as"program"` (alias: `as"command"`), and will cause to add script/program to `$PATH` instead of sourcing (see `pick`). Can also be `as"completion"` – use with plugins or snippets in whose only underscore-starting `_*` files you are interested in. [^8]                                                 |
|   [`id-as`][6]    | Nickname a plugin or snippet, e.g. create a short handler for the long-URL snippet.                                                                                                                                                                                                                                 |
|     `compile`     | Pattern (+ possible `{…}` expansion, like `{a/*,b*}`) to select additional files to compile, e.g. `compile"(pure\|async).zsh"` for `sindresorhus/pure`.                                                                                                                                                             |
|    `nocompile`    | Don't try to compile `pick`-pointed files. If passed the exclamation mark (i.e. `nocompile'!'`), then do compile, but after `make'…'` and `atclone'…'` (useful if Makefile installs some scripts, to point `pick'…'` at the location of their installation).                                                        |
|     `service`     | Make following plugin or snippet a _service_, which will be ran in background, and only in single Zshell instance. See [#zservice][7] topic.                                                                                                                                                                        |
|  `reset-prompt`   | Reset the prompt after loading the plugin/snippet (by issuing `zle .reset-prompt`). Note: normally it's sufficient to precede the value of `wait'…'` ice with `!`.                                                                                                                                                  |
|  [`bindmap`][8]   | To hold `;`-separated strings like `Key(s)A -> Key(s)B`, e.g. `^R -> ^T; ^A -> ^B`. In general, `bindmap'…'` changes bindings (done with the `bindkey` builtin) the plugin does. The example would cause the plugin to map Ctrl-T instead of Ctrl-R, and Ctrl-B instead of Ctrl-A. **Does not work with snippets.** |
| [`trackbinds`][8] | Shadow but only `bindkey` calls even with `zi light …`, i.e. even with investigating disabled (fast loading), to allow `bindmap` to remap the key-binds. The same effect has `zi light -b …`, i.e. additional `-b` option to the `light`-subcommand. **Does not work with snippets.**                               |
|    [`wrap`][9]    | Takes a `;`-separated list of function names that are to be investigated (meaning gathering report and unloading data) **once** during execution. It works by wrapping the functions with an investigating-enabling and disabling snippet of code. [^9]                                                             |
|     `aliases`     | Load the plugin with the aliases mechanism enabled. Use with plugins that define **and use** aliases in their scripts.                                                                                                                                                                                              |
|   `light-mode`    | Load the plugin without investigating, i.e.: as if it would be loaded with the `light` command. Useful for the for-syntax, where there is no `load` nor `light` subcommand                                                                                                                                          |
|  [`extract`][10]  | Performs archive extraction supporting multiple formats like `zip`, `tar.gz`, etc., and also notably OS X `dmg` images. [^10]                                                                                                                                                                                       |
|      `subst`      | Substitute the given string into another string when sourcing the plugin script, e.g.: `zi subst'autoload → autoload -Uz' …`.                                                                                                                                                                                       |
|    `autoload`     | Autoload the given functions (from their files). Equivalent to calling `atinit'autoload the-function'`. Supports renaming of the function – pass `'… → new-name'` or `'… -> new-name'`, e.g.: `zi autoload'fun → my-fun; fun2 → my-fun2'`.                                                                          |

</APITable>

## <i class="fa-solid fa-list"></i> Cloning options {#cloning-options}

<APITable>

|      Modifier       | Description                                                                                                                                                                                                                                                                                                                    |
| :-----------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|       `proto`       | Change protocol to `git`,`ftp`,`ftps`,`ssh`, `rsync`, etc. Default is `https`. **Does not work with snippets.**                                                                                                                                                                                                                |
| [`from`](ice#-from) | Clone plugin from given site. Supported are `from"github"` (default), `…"github-rel"`, `…"gitlab"`, `…"bitbucket"`, `…"notabug"` (short names: `gh`, `gh-r`, `gl`, `bb`, `nb`). Can also be a full domain name e.g: for GitHub enterprise. **Does not work with snippets.**                                                    |
|        `ver`        | Used with `from"gh-r"` (i.e. downloading a binary release, e.g. for use with `as"program"`) – selects which version to download. Default is latest, can also be explicit `ver"latest"`. Works also with regular plugins, and checkouts e.g. `ver"branch"`, i.e. a specific version. **Does not work with snippets.**           |
|       `bpick`       | Used to select which release from GitHub Releases to download, e.g. `zi ice from"gh-r" as"program" bpick"*Darwin*"; zi load docker/compose`. **Does not work with snippets.**                                                                                                                                                  |
|       `depth`       | Pass `--depth` to `git`, i.e. limit how much history to download. **Does not work with snippets.**                                                                                                                                                                                                                             |
|     `cloneopts`     | Pass the contents of `cloneopts` to `git clone`. Defaults to `--recursive`. I.e.: change cloning options. Pass empty ice to disable recursive cloning. **Does not work with snippets.**                                                                                                                                        |
|     `pullopts`      | Pass the contents of `pullopts` to `git pull` used when updating plugins. **Does not work with snippets.**                                                                                                                                                                                                                     |
|        `svn`        | Use Subversion for downloading snippets. GitHub supports the `SVN` protocol, this allows cloning of subdirectories as snippets, e.g. `zi ice svn; zi snippet OMZP::git`. Other ice `pick` can be used to select a file to the source (default are: `*.plugin.zsh`, `init.zsh`, `*.zsh-theme`). **Does not work with plugins.** |

</APITable>

## <i class="fa-solid fa-list"></i> Selection of files (source '…') {#selection-of-files-source}

<APITable>

|    Modifier     | Description                                                                                                                                       |
| :-------------: | ------------------------------------------------------------------------------------------------------------------------------------------------- |
|   [`pick`][1]   | Select the file to source, or the file to set as a command, when using `snippet --command` or the ice `as"program"`. More below [^1].             |
|   [`src`][1]    | Specify an additional file to source after the main file or after setting up command via `as"program"`. It is not a pattern but a plain filename. |
| [`multisrc`][1] | Allows specifying multiple files for sourcing, enumerated with spaces as the separators. More below [^2].                                         |

</APITable>

## <i class="fa-solid fa-list"></i> Conditional loading {#conditional-loading}

<APITable>

|           Modifier           | Description                                                                                                              |
| :--------------------------: | ------------------------------------------------------------------------------------------------------------------------ |
|         [`wait`][2]          | Postpone loading a plugin or snippet. For `wait'1'`, loading is done `1` second after prompt. [^3].                      |
|         [`load`][3]          | A condition to check which should cause plugin to load. [^4].                                                            |
|        [`unload`][3]         | A condition to check causing plugin to unload. More below [^5].                                                          |
|         `cloneonly`          | Don't load the plugin / snippet, only download it.                                                                       |
|             `if`             | Load plugin or snippet only when given condition is fulfilled. Example: [^6].                                            |
|            `has`             | Load plugin or snippet only when given command is available (in \$PATH), e.g. `zi ice has'git' …`.                       |
| `subscribe` / `on-update-of` | Postpone loading of a plugin or snippet until the given file(s) get updated, e.g. `subscribe'{~/files-*,/tmp/files-*}'`. |
|        `trigger-load`        | Creates a function that loads the associated plugin/snippet, with an option. More below [^7].                            |

</APITable>

## <i class="fa-solid fa-list"></i> Plugin output {#plugin-output}

<APITable>

| Modifier | Description                                                                                                                                                                                                                                                                                                 |
| :------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `silent` | Mute plugin's or snippet's `stderr` & `stdout`. Also, skip the `Loaded …` message under prompt for `wait`, etc. loaded plugins, and completion-installation messages.                                                                                                                                       |
| `lucid`  | Skip `Loaded …` message under prompt for `wait`, etc. loaded plugins (a subset of `silent`).                                                                                                                                                                                                                |
| `notify` | Output given message under-prompt after successfully loading a plugin/snippet. In case of problems with the loading, output a warning message and the return code. If starts with `!` it will then always output the given message. Hint: if the message is empty, then it will just notify about problems. |

</APITable>

## <i class="fa-solid fa-list"></i> Completions {#completions}

<APITable>

|    Modifier     | Description                                                                                                                                                                  |
| :-------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    `blockf`     | Disallow plugin to modify `fpath`. Useful when a plugin wants to provide completions traditionally. ZI can manage completions and plugins can be blocked from exposing them. |
| `nocompletions` | Don't detect, install and manage completions for this plugin. Completions can be installed later with `zi creinstall {plugin-spec}`.                                         |

</APITable>

## <i class="fa-solid fa-list"></i> Command execution after cloning, updating or loading {#command-execution-after-cloning-updating-or-loading}

<APITable>

|    Modifier    | Description                                                                                                                                                                                                                                                                                                       |
| :------------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      `mv`      | Move file after cloning or after update (then, only if new commits were downloaded). Example: `mv "fzf-* -> fzf"`. It uses `->` as a separator for old and new file names. Works also with snippets.                                                                                                              |
|      `cp`      | Copy file after cloning or after update (then, only if new commits were downloaded). Example: `cp "docker-c* -> dcompose"`. Ran after `mv`.                                                                                                                                                                       |
| [`atclone`][4] | Run command after cloning, within plugin's directory, e.g. `zi ice atclone"echo Cloned"`. Ran also after downloading the snippet.                                                                                                                                                                                 |
| [`atpull`][4]  | Run command after updating (**only if new commits are waiting for download**), within plugin's directory. If starts with "!" then the command will be run before `mv` & `cp` ices and before `git pull` or `svn update`. Otherwise, it is run after them. Can be `atpull'%atclone'`, to repeat `atclone` Ice-mod. |
| [`atinit`][4]  | Run command after directory setup (cloning, checking it, etc.) of plugin/snippet but before loading.                                                                                                                                                                                                              |
| [`atload`][4]  | Run command after loading, within plugin's directory. Can be also used with snippets. Passed code can be preceded with `!`, it will then be investigated (if using `load`, not `light`).                                                                                                                          |
|  `run-atpull`  | Always run the atpull hook (when updating), not only when there are new commits to be downloaded.                                                                                                                                                                                                                 |
|     `nocd`     | Don't switch the current directory into the plugin's directory when evaluating the above ice-mods `atinit'…'`,`atload'…'`, etc.                                                                                                                                                                                   |
|  [`make`][5]   | Run `make` command after cloning/updating and executing `mv`, `cp`, `atpull`, `atclone` Ice mods. Can obtain argument, e.g. `make"install PREFIX=/opt"`. If the value starts with `!` then `make` is run before `atclone`/`atpull`, e.g. `make'!'`.                                                               |
|  `countdown`   | Causes an interruptable (by Ctrl-C) countdown 5…4…3…2…1…0 to be displayed before executing `atclone'…'`,`atpull'…'` and `make` ices                                                                                                                                                                               |
|    `reset`     | Invokes `git reset --hard HEAD` for plugins or `svn revert` for SVN snippets before pulling any new changes. This way `git` or `svn` will not report conflicts if some changes were done e.g.: `atclone'…'` ice. For file snippets and `gh-r` plugins, it invokes `rm -rf *`.                                     |

</APITable>

## <i class="fa-solid fa-list"></i> Sticky-Emulation Of other shells {#sticky-emulation-of-other-shells}

<APITable>

|    Modifier     | Description                                                                                                                                                                                                                                                                                                                                  |
| :-------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   `sh`, `!sh`   | Source the plugin's (or snippet's) script with `sh` emulation so that also all functions declared within the file will get a **sticky** emulation assigned – when invoked they'll execute also with the `sh` emulation set-up. The `!sh` version switches additional options that are rather not important from the portability perspective. |
| `bash`, `!bash` | The same as `sh`, but with the `SH_GLOB` option disabled, so that Bash regular expressions work.                                                                                                                                                                                                                                             |
|  `ksh`, `!ksh`  | The same as `sh`, but emulating `ksh` shell.                                                                                                                                                                                                                                                                                                 |
|  `csh`, `!csh`  | The same as `sh`, but emulating `csh` shell.                                                                                                                                                                                                                                                                                                 |

</APITable>

<!-- end-of-file -->

[12]: /ecosystem/annexes
[alternate-syntax]: /docs/guides/syntax/common#the-alternative-syntaxes
