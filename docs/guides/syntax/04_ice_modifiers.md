---
id: ice-modifiers
title: 🧊 Ice Modifiers
image: zw/logo/320x320.png
description: Documentation for the ice Modifiers
keywords: [ice-modifiers]
---

import APITable from '@site/src/components/APITable';

Following ice modifiers are to be [passed](#alternate-syntax) to `zi ice …` to obtain described effects.

The word `ice` means something that's added (like ice to a drink) – and in ZI it means adding a modifier to a next `zi`
command, and also something that's temporary because it melts – and this means that the modification will last only for
a **single** next `zi` command.

Some Ice-modifiers are highlighted and clicking on them will take you to the appropriate Wiki page for an extended
explanation.

You may safely assume given ice works with both plugins and snippets unless explicitly stated otherwise.

## Cloning options

<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<APITable>

|      Modifier      | Description                                                                                                                                                                                                                                                                                                         |
|:------------------:|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|      `proto`       | Change protocol to `git`,`ftp`,`ftps`,`ssh`, `rsync`, etc. Default is `https`. **Does not work with snippets.**                                                                                                                                                                                                     |
| [`from`](ice#from) | Clone plugin from given site. Supported are `from"github"` (default), `…"github-rel"`, `…"gitlab"`, `…"bitbucket"`, `…"notabug"` (short names: `gh`, `gh-r`, `gl`, `bb`, `nb`). Can also be a full domain name e.g: for GitHub enterprise. **Does not work with snippets.**                                       |
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
|:---------------:|---------------------------------------------------------------------------------------------------------------------------------------------|
|   [`pick`][1]   | Select the file to source, or the file to set as command, when using `snippet --command` or the ice `as"program"`. More below (1).          |
|   [`src`][1]    | Specify additional file to source after main file or after setting up command via `as"program"`. It is not a pattern but a plain file name. |
| [`multisrc`][1] | Allows to specify multiple files for sourcing, enumerated with spaces as the separators. More below (2).                                    |

</APITable>

- (1) This pattern will alphabetically match and choose the first file e.g: `zi ice pick"*.plugin.zsh"; zi load …`.
- (2) Example: `multisrc'misc.zsh grep.zsh'` and also using brace-expansion syntax: `multisrc'{misc,grep}.zsh'` also supports patterns.

## Conditional loading

<APITable>

|           Modifier           | Description                                                                                                              |
|:----------------------------:|--------------------------------------------------------------------------------------------------------------------------|
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

## Completions

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

## Others

<APITable>

|     Modifier      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|:-----------------:|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|       `as`        | Can be `as"program"` (also the alias: `as"command"`), and will cause to add script/program to `$PATH` instead of sourcing (see `pick`). Can also be `as"completion"` – use with plugins or snippets in whose only underscore-starting `_*` files you are interested in. The third possible value is `as"null"` – a shorthand for `pick"/dev/null" nocompletions` – i.e.: it disables the default script-file sourcing and also the installation of completions.                                                                                                                                                                                                   |
|   [`id-as`][6]    | Nickname a plugin or snippet, to e.g. create a short handler for long-url snippet.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|     `compile`     | Pattern (+ possible `{…}` expansion, like `{a/*,b*}`) to select additional files to compile, e.g. `compile"(pure\|async).zsh"` for `sindresorhus/pure`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|    `nocompile`    | Don't try to compile `pick`-pointed files. If passed the exclamation mark (i.e. `nocompile'!'`), then do compile, but after `make'…'` and `atclone'…'` (useful if Makefile installs some scripts, to point `pick'…'` at the location of their installation).                                                                                                                                                                                                                                                                                                                                                                                                      |
|     `service`     | Make following plugin or snippet a _service_, which will be ran in background, and only in single Zshell instance. See [#zservice][7] topic.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|  `reset-prompt`   | Reset the prompt after loading the plugin/snippet (by issuing `zle .reset-prompt`). Note: normally it's sufficient to precede the value of `wait'…'` ice with `!`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|  [`bindmap`][8]   | To hold `;`-separated strings like `Key(s)A -> Key(s)B`, e.g. `^R -> ^T; ^A -> ^B`. In general, `bindmap'…'`changes bindings (done with the `bindkey` builtin) the plugin does. The example would cause the plugin to map Ctrl-T instead of Ctrl-R, and Ctrl-B instead of Ctrl-A. **Does not work with snippets.**                                                                                                                                                                                                                                                                                                                                                |
| [`trackbinds`][8] | Shadow but only `bindkey` calls even with `zi light …`, i.e. even with investigating disabled (fast loading), to allow `bindmap` to remap the key-binds. The same effect has `zi light -b …`, i.e. additional `-b` option to the `light`-subcommand. **Does not work with snippets.**                                                                                                                                                                                                                                                                                                                                                                             |
| [`wrap-track`][9] | Takes a `;`-separated list of function names that are to be investigated (meaning gathering report and unload data) **once** during execution. It works by wrapping the functions with a investigating-enabling and disabling snippet of code. In summary, `wrap-track` allows to extend the investigating beyond the moment of loading of a plugin. Example use is to `wrap-track` a precmd function of a prompt (like `_p9k_precmd()` of powerlevel10k) or other plugin that _postpones its initialization till the first prompt_ (like e.g.: zsh-autosuggestions). **Does not work with snippets.**                                                            |
|     `aliases`     | Load the plugin with the aliases mechanism enabled. Use with plugins that define **and use** aliases in their scripts.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|   `light-mode`    | Load the plugin without the investigating, i.e.: as if it would be loaded with the `light` command. Useful for the for-syntax, where there is no `load` nor `light` subcommand                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
|  [`extract`][10]  | Performs archive extraction supporting multiple formats like `zip`, `tar.gz`, etc. and also notably OS X `dmg` images. If it has no value, then it works in the _auto_ mode – it automatically extracts all files of known archive extensions IF they aren't located deeper than in a sub-directory (this is to prevent extraction of some helper archive files, typically located somewhere deeper in the tree). If no such files will be found, then it extracts all found files of known **type** – the type is being read by the `file` Unix command. If not empty, then takes names of the files to extract. Refer to the Wiki page for further information. |
|      `subst`      | Substitute the given string into another string when sourcing the plugin script, e.g.: `zi subst'autoload → autoload -Uz' …`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
|    `autoload`     | Autoload the given functions (from their files). Equvalent to calling `atinit'autoload the-function'`. Supports renaming of the function – pass `'… → new-name'` or `'… -> new-name'`, e.g.: `zi autoload'fun → my-fun; fun2 → my-fun2'`.                                                                                                                                                                                                                                                                                                                                                                                                                         |

</APITable>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

## Order of execution

Order of execution of related Ice-modifiers is as follows:

`atinit` -> `atpull!` -> `make'!!'` -> `mv` -> `cp` -> `make!` -> `atclone`/`atpull` -> `make` ->
`(plugin script loading)` -> `src` -> `multisrc` -> `atload`.

## A few remarks

- The syntax automatically detects if the object is a snippet or a plugin, by checking if the object is an URL, i.e.: if
  it starts with `http*://` or `OMZ::`, etc.
- To load a local-file snippet (which will be treaten as a local-directory plugin by default) use the `is-snippet` ice,
- To load a plugin in `light` mode use the `light-mode` ice.
- If the plugin name collides with an ice name, precede the plugin name with `@`, e.g.: `@sharkdp/fd` (collides with the
  `sh` ice, ZI will take the plugin name as `sh"arkdp/fd"`), see the next section for an example.

[1]: /docs/guides/syntax/ice#src-pick-multisrc
[2]: /docs/guides/syntax/ice#wait
[3]: /docs/guides/customization#multiple-prompts
[4]: /docs/guides/syntax/ice#atclone-atpull-atinit-atload
[5]: /docs/guides/syntax/common#the-make-syntax
[6]: /docs/guides/syntax/ice#id-as
[7]: https://github.com/search?q=topic%3Azservice+org%3Az-shell&type=Repositories
[8]: /docs/guides/syntax/bindkey
[9]: /docs/guides/syntax/ice#wrap-track
[10]: /docs/guides/syntax/ice#extract
[11]: https://github.com/z-shell/zi-vim-syntax
