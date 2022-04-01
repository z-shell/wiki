---
id: ice-modifiers
title: '🧊 Ice Modifiers'
image: zw/logo/320x320.png
description: Documentation for the ice Modifiers
keywords:
  - ice-modifiers
---

import APITable from '@site/src/components/APITable';

Following ice modifiers are to be [passed](#alternate-syntax) to `zi ice …` to obtain described effects.

The word `ice` means something that's added (like ice to a drink) – and in ZI it means adding a modifier to a next `zi` command, and also something that's temporary because it melts – and this means that the modification will last only for a **single** next `zi` command.

Some Ice-modifiers are highlighted and clicking on them will take you to the appropriate Wiki page for an extended explanation.

You may safely assume given ice works with both plugins and snippets unless explicitly stated otherwise.

## Cloning options

<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<APITable>

|      Modifier      | Description                                                                                                                                                                                                                                                                                                         |
| :----------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      `proto`       | Change protocol to `git`,`ftp`,`ftps`,`ssh`, `rsync`, etc. Default is `https`. **Does not work with snippets.**                                                                                                                                                                                                     |
| [`from`](ice#from) | Clone plugin from given site. Supported are `from"github"` (default), `…"github-rel"`, `…"gitlab"`, `…"bitbucket"`, `…"notabug"` (short names: `gh`, `gh-r`, `gl`, `bb`, `nb`). Can also be a full domain name e.g: for GitHub enterprise. **Does not work with snippets.**                                         |
|       `ver`        | Used with `from"gh-r"` (i.e. downloading a binary release, e.g. for use with `as"program"`) – selects which version to download. Default is latest, can also be explicitly `ver"latest"`. Works also with regular plugins, checkouts e.g. `ver"abranch"`, i.e. a specific version. **Does not work with snippets.** |
|      `bpick`       | Used to select which release from GitHub Releases to download, e.g. `zi ice from"gh-r" as"program" bpick"*Darwin*"; zi load docker/compose`. **Does not work with snippets.**                                                                                                                                       |
|      `depth`       | Pass `--depth` to `git`, i.e. limit how much of history to download. **Does not work with snippets.**                                                                                                                                                                                                               |
|    `cloneopts`     | Pass the contents of `cloneopts` to `git clone`. Defaults to `--recursive`. I.e.: change cloning options. Pass empty ice to disable recursive cloning. **Does not work with snippets.**                                                                                                                             |
|     `pullopts`     | Pass the contents of `pullopts` to `git pull` used when updating plugins. **Does not work with snippets.**                                                                                                                                                                                                          |
|       `svn`        | Use Subversion for downloading snippet. GitHub supports `SVN` protocol, this allows to clone subdirectories as snippets, e.g. `zi ice svn; zi snippet OMZP::git`. Other ice `pick` can be used to select file to source (default are: `*.plugin.zsh`, `init.zsh`, `*.zsh-theme`). **Does not work with plugins.**   |

</APITable>

## Selection of files (`source '…'`)

<APITable>

|    Modifier     | Description                                                                                                                                 |
| :-------------: | ------------------------------------------------------------------------------------------------------------------------------------------- |
|   [`pick`][1]   | Select the file to source, or the file to set as command, when using `snippet --command` or the ice `as"program"`. More below (1).          |
|   [`src`][1]    | Specify additional file to source after main file or after setting up command via `as"program"`. It is not a pattern but a plain file name. |
| [`multisrc`][1] | Allows to specify multiple files for sourcing, enumerated with spaces as the separators. More below (2).                                    |

</APITable>

- (1) This pattern will alphabetically match and choose the first file e.g: `zi ice pick"*.plugin.zsh"; zi load …`.
- (2) Example: `multisrc'misc.zsh grep.zsh'` and also using brace-expansion syntax: `multisrc'{misc,grep}.zsh'` also supports patterns.

## Conditional loading

<APITable>

|           Modifier           | Description                                                                                                              |
| :--------------------------: | ------------------------------------------------------------------------------------------------------------------------ |
|         [`wait`][2]          | Postpone loading a plugin or snippet. For `wait'1'`, loading is done `1` second after prompt. More below (1).            |
|         [`load`][3]          | A condition to check which should cause plugin to load. More below (2).                                                  |
|        [`unload`][3]         | A condition to check causing plugin to unload. More below (3).                                                           |
|         `cloneonly`          | Don't load the plugin / snippet, only download it.                                                                       |
|             `if`             | Load plugin or snippet only when given condition is fulfilled. Example below (4).                                        |
|            `has`             | Load plugin or snippet only when given command is available (in \$PATH), e.g. `zi ice has'git' …`.                       |
| `subscribe` / `on-update-of` | Postpone loading of a plugin or snippet until the given file(s) get updated, e.g. `subscribe'{~/files-*,/tmp/files-*}'`. |
|        `trigger-load`        | Creates a function that loads the associated plugin/snippet, with an option. More below (5).                             |

</APITable>

- (1) For `wait'[[ … ]]'`, `wait'(( … ))'`, loading is done when given condition is meet. For `wait'!…'`, prompt is reset after load. Zsh can start 80% (i.e.: 5x) faster thanks to postponed loading. **Fact:** when `wait` is used without value, it works as `wait'0'`.
- (2) It will load once, the condition can be still true, but will not trigger second load, unless plugin is unloaded earlier, see `unload`. E.g.: `load'[[ $PWD = */github* ]]'`.
- (3) It will unload once, then only if loaded again e.g: `unload'[[ $PWD != */github* ]]'`.
- (4) Example: `zi ice if'[[ -n "$commands[otool]" ]]'; zi load …` or `zi ice if'[[ $OSTYPE = darwin* ]]'; zi load …`.
- (5) To use the option, precede the ice content with `!` to automatically forward the call afterwards, to a command of the same name as the function. Can obtain multiple functions to create – sparate with `;`.

## Plugin output

<APITable>

| Modifier | Description                                                                                                                                                                                                                                                                                                 |
|:--------:|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `silent` | Mute plugin's or snippet's `stderr` & `stdout`. Also skip `Loaded …` message under prompt for `wait`, etc. loaded plugins, and completion-installation messages.                                                                                                                                            |
| `lucid`  | Skip `Loaded …` message under prompt for `wait`, etc. loaded plugins (a subset of `silent`).                                                                                                                                                                                                                |
| `notify` | Output given message under-prompt after successfully loading a plugin/snippet. In case of problems with the loading, output a warning message and the return code. If starts with `!` it will then always output the given message. Hint: if the message is empty, then it will just notify about problems. |

</APITable>

## 命令补全

<APITable>

|    Modifier     | Description                                                                                                                                                                      |
|:---------------:|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    `blockf`     | Disallow plugin to modify `fpath`. Useful when a plugin wants to provide completions in traditional way. ZI can manage completions and plugin can be blocked from exposing them. |
| `nocompletions` | Don't detect, install and manage completions for this plugin. Completions can be installed later with `zi creinstall {plugin-spec}`.                                             |

</APITable>

## Command execution after cloning, updating or loading

<APITable>

|    Modifier    | Description                                                                                                                                                                                                                                                                                                  |
|:--------------:|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|      `mv`      | Move file after cloning or after update (then, only if new commits were downloaded). Example: `mv "fzf-* -> fzf"`. It uses `->` as separator for old and new file names. Works also with snippets.                                                                                                           |
|      `cp`      | Copy file after cloning or after update (then, only if new commits were downloaded). Example: `cp "docker-c* -> dcompose"`. Ran after `mv`.                                                                                                                                                                  |
| [`atclone`][4] | Run command after cloning, within plugin's directory, e.g. `zi ice atclone"echo Cloned"`. Ran also after downloading snippet.                                                                                                                                                                                |
| [`atpull`][4]  | Run command after updating (**only if new commits are waiting for download**), within plugin's directory. If starts with "!" then command will be ran before `mv` & `cp` ices and before `git pull` or `svn update`. Otherwise it is ran after them. Can be `atpull'%atclone'`, to repeat `atclone` Ice-mod. |
| [`atinit`][4]  | Run command after directory setup (cloning, checking it, etc.) of plugin/snippet but before loading.                                                                                                                                                                                                         |
| [`atload`][4]  | Run command after loading, within plugin's directory. Can be also used with snippets. Passed code can be preceded with `!`, it will then be investigated (if using `load`, not `light`).                                                                                                                     |
|  `run-atpull`  | Always run the atpull hook (when updating), not only when there are new commits to be downloaded.                                                                                                                                                                                                            |
|     `nocd`     | Don't switch the current directory into the plugin's directory when evaluating the above ice-mods `atinit'…'`,`atload'…'`, etc.                                                                                                                                                                              |
|  [`make`][5]   | Run `make` command after cloning/updating and executing `mv`, `cp`, `atpull`, `atclone` Ice mods. Can obtain argument, e.g. `make"install PREFIX=/opt"`. If the value starts with `!` then `make` is ran before `atclone`/`atpull`, e.g. `make'!'`.                                                          |
|  `countdown`   | Causes an interruptable (by Ctrl-C) countdown 5…4…3…2…1…0 to be displayed before executing `atclone'…'`,`atpull'…'` and `make` ices                                                                                                                                                                          |
|    `reset`     | Invokes `git reset --hard HEAD` for plugins or `svn revert` for SVN snippets before pulling any new changes. This way `git` or `svn` will not report conflicts if some changes were done in e.g.: `atclone'…'` ice. For file snippets and `gh-r` plugins it invokes `rm -rf *`.                              |

</APITable>

## Sticky-Emulation Of other shells

<APITable>

|    Modifier     | Description                                                                                                                                                                                                                                                                                                                                  |
|:---------------:|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|   `sh`, `!sh`   | Source the plugin's (or snippet's) script with `sh` emulation so that also all functions declared within the file will get a **sticky** emulation assigned – when invoked they'll execute also with the `sh` emulation set-up. The `!sh` version switches additional options that are rather not important from the portability perspective. |
| `bash`, `!bash` | The same as `sh`, but with the `SH_GLOB` option disabled, so that Bash regular expressions work.                                                                                                                                                                                                                                             |
|  `ksh`, `!ksh`  | The same as `sh`, but emulating `ksh` shell.                                                                                                                                                                                                                                                                                                 |
|  `csh`, `!csh`  | The same as `sh`, but emulating `csh` shell.                                                                                                                                                                                                                                                                                                 |

</APITable>
