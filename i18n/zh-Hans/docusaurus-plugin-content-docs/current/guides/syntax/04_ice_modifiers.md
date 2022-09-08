---
id: ice-modifiers
title: "🧊 Ice Modifiers"
sidebar_position: 4
image: /img/logo/320x320.png
description: Ice Modifiers Documentation
keywords:
  - ice-syntax
  - ice-modifiers
  - ice-modifiers-reference
---

<!-- @format -->

import APITable from '@site/src/components/APITable';

An ice modifiers are [passed][alternate-syntax] to `zi ice …` to obtain described effects, additionally can be added with [annexes][12]. To see all available ice modifiers run `zi -h`. The word `ice` means something that's added, like ice to a drink – and in Zi, it means adding a modifier to a next `zi` command, and also something temporary because it melts – and this means that the modification will last only for a **single** next `zi` command.

Some ice modifiers are highlighted and clicking on them will take you to the appropriate Wiki page for an extended explanation. You may safely assume that given ice works with both plugins and snippets unless explicitly stated otherwise.

## <i class="fa-solid fa-list"></i> Ice effects {#ice-effects}

```mdx-code-block
<APITable>
```

|  Ice-modifier   | Description                                                                                                                                                                                                                                                                                                                                                              |
|:---------------:| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|      `as`       | Can be `as"program"` (alias: `as"command"`), and will cause to add script/program to `$PATH` instead of sourcing (see `pick`). Can also be `as"completion"` – use with plugins or snippets in whose only underscore-starting `_*` files you are interested in. [^8]                                                                                                      |
|   [id-as][6]    | Nickname a plugin or snippet, e.g. create a short handler for the long-URL snippet.                                                                                                                                                                                                                                                                                      |
|    `compile`    | Pattern (possible `{…}` expansion, like `{a/*,b*}`) to select additional files to compile, e.g. `compile"(pure \| async).zsh"`for`sindresorhus/pure`.                                                                                                                                                                                                                   |
|   `nocompile`   | Don't try to compile `pick`-pointed files. If passed the exclamation mark (i.e. `nocompile'!'`), then do compile, but after `make'…'` and `atclone'…'` (useful if Makefile installs some scripts, to point `pick'…'` at the location of their installation).                                                                                                             |
|    `service`    | Make the following plugin or snippet a _service_, which will run in the background, and only in a single Zshell instance. See [#zservice][7] topic.                                                                                                                                                                                                                      |
| `reset-prompt`  | Reset the prompt after loading the plugin/snippet (by issuing `zle .reset-prompt`). Note: normally it's sufficient to precede the value of `wait'…'` ice with `!`.                                                                                                                                                                                                       |
|  [bindmap][8]   | To hold `;`-separated strings like `Key(s)A -> Key(s)B`, e.g. `^R -> ^T; ^A -> ^B`. In general, `bindmap'…'` changes bindings (done with the `bindkey` builtin) the plugin does. The example would cause the plugin to map <kbd>Ctrl-T</kbd> instead of <kbd>Ctrl-R</kbd>, and <kbd>Ctrl-B</kbd> instead of <kbd>Ctrl-A</kbd>. **Does not work with snippets.** |
| [trackbinds][8] | Shadow but only `bindkey` calls even with `zi light …`, i.e. even with investigating disabled (fast loading), to allow `bindmap` to remap the key-binds. The same effect has the `zi light -b …`, i.e. additional `-b` option to the `light`-subcommand. **Does not work with snippets.**                                                                                |
|    [wrap][9]    | Takes a `;`-separated list of function names to be investigated (meaning gathering report and unloading data) **once** during execution. It works by wrapping the functions with an investigating-enabling and disabling snippet of code. [^9]                                                                                                                           |
|    `aliases`    | Load the plugin with the aliases mechanism enabled. Use plugins that define **and use** aliases in their scripts.                                                                                                                                                                                                                                                        |
|  `light-mode`   | Load the plugin without investigating, i.e., the same as the `light` command. Useful with the "for" syntax, where there is no `load` nor `light` subcommand                                                                                                                                                                                                              |
|  [extract][10]  | Performs archive extraction supporting multiple formats like `zip`, `tar.gz`, etc., and OS X `dmg` images. [^10]                                                                                                                                                                                                                                                         |
|     `subst`     | Substitute the given string into another string when sourcing the plugin script, e.g.: `zi subst'autoload → autoload -Uz' …`.                                                                                                                                                                                                                                            |
|   `autoload`    | Autoload the given functions (from their files). Equivalent to calling `atinit'autoload the-function'`. Supports renaming of the function – pass `'… → new-name'` or `'… -> new-name'`, e.g.: `zi autoload'fun → my-fun; fun2 → my-fun2'`.                                                                                                                            |

```mdx-code-block
</APITable>
```

## <i class="fa-solid fa-list"></i> Cloning options {#cloning-options}

```mdx-code-block
<APITable>
```

|   Ice-modifier   | Description                                                                                                                                                                                                                                                                                                                     |
|:----------------:| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `proto`      | Change protocol to `git`,`ftp`,`ftps`,`ssh`, `rsync`, etc. The default is `https`. **Does not work with snippets.**                                                                                                                                                                                                             |
| [from](ice#from) | Clone plugin from a given site. Supported are `from"github"` (default), `…"github-rel"`, `…"gitlab"`, `…"bitbucket"`, `…"notabug"` (short names: `gh`, `gh-r`, `gl`, `bb`, `nb`). Can also be a full domain name e.g: for GitHub enterprise. **Does not work with snippets.**                                                   |
|      `ver`       | Used with `from"gh-r"` (i.e. downloading a binary release, e.g. for use with `as"program"`) – selects which version to download. Default is latest, can also be explicit `ver"latest"`. Works also with regular plugins, and checkouts e.g. `ver"branch"`, i.e. a specific version. **Does not work with snippets.**            |
|     `bpick`      | Used to select which release from GitHub Releases to download, e.g. `zi ice from"gh-r" as"program" bpick"*Darwin*"; zi load docker/compose`. **Does not work with snippets.**                                                                                                                                                   |
|     `depth`      | Pass `--depth` to `git`. I.e., limit how much history to download. **Does not work with snippets.**                                                                                                                                                                                                                             |
|   `cloneopts`    | Pass the contents of `cloneopts` to `git clone`. Defaults to `--recursive`. I.e., change cloning options. Pass empty ice to disable recursive cloning. **Does not work with snippets.**                                                                                                                                         |
|    `pullopts`    | Pass the contents of `pullopts` to `git pull` used when updating plugins. **Does not work with snippets.**                                                                                                                                                                                                                      |
|      `svn`       | Use Subversion for downloading snippets. GitHub supports the `SVN` protocol, which allows cloning of subdirectories as snippets, e.g. `zi ice svn; zi snippet OMZP::git`. Other ice `pick` can be used to select a file to the source (default are: `*.plugin.zsh`, `init.zsh`, `*.zsh-theme`). **Does not work with plugins.** |

```mdx-code-block
</APITable>
```

## <i class="fa-solid fa-list"></i> Selection of files (source '…') {#selection-of-files-source}

```mdx-code-block
<APITable>
```

| Ice-modifier  | Description                                                                                                                                       |
|:-------------:| ------------------------------------------------------------------------------------------------------------------------------------------------- |
|   [pick][1]   | Select the file to source, or the file to set as a command, when using `snippet --command` or the ice `as"program"`. More below [^1].             |
|   [src][1]    | Specify an additional file to source after the main file or after setting up command via `as"program"`. It is not a pattern but a plain filename. |
| [multisrc][1] | Allows specifying multiple files for sourcing, enumerated with spaces as the separators. More below [^2].                                         |

```mdx-code-block
</APITable>
```

## <i class="fa-solid fa-list"></i> Conditional loading {#conditional-loading}

```mdx-code-block
<APITable>
```

|  Ice-modifier  | Description                                                                                                              |
|:--------------:| ------------------------------------------------------------------------------------------------------------------------ |
|   [wait][2]    | Postpone loading a plugin or snippet. For `wait'1'`, loading is done `1` second after the prompt. [^3].                  |
|   [load][3]    | A condition to check which should cause the plugin to load. [^4].                                                        |
|  [unload][3]   | A condition to check to cause the plugin to unload. More below [^5].                                                     |
|  `cloneonly`   | Don't load the plugin/snippet, only download it.                                                                         |
|      `if`      | Load plugin/snippet only when a given condition is true. Example: [^6].                                                  |
|     `has`      | Load plugin or snippet only when given command is available (in \$PATH), e.g. `zi ice has'git' …`.                      |
|  `subscribe`   | Postpone loading of a plugin or snippet until the given file(s) get updated, e.g. `subscribe'{~/files-*,/tmp/files-*}'`. |
| `trigger-load` | Creates a function that loads the associated plugin/snippet, with an option. More below [^7].                            |

```mdx-code-block
</APITable>
```

## <i class="fa-solid fa-list"></i> Plugin output {#plugin-output}

```mdx-code-block
<APITable>
```

| Ice-modifier | Description                                                                                                                                                                                                                                                                                                 |
|:------------:| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   `silent`   | Mute plugin's or snippet's `stderr` & `stdout`. Also, skip the `loaded …` message under the prompt for `wait`, etc. loaded plugins, and completion-installation messages.                                                                                                                                   |
|   `lucid`    | Skip `loaded …` message under prompt for `wait`, etc. loaded plugins (a subset of `silent`).                                                                                                                                                                                                                |
|   `notify`   | Output given message under-prompt after successfully loading a plugin/snippet. In case of problems with the loading, output a warning message and the return code. If starts with `!` it will then always output the given message. Hint: if the message is empty, then it will just notify about problems. |

```mdx-code-block
</APITable>
```

## <i class="fa-solid fa-list"></i> 命令补全 {#completions}

```mdx-code-block
<APITable>
```

|  Ice-modifier   | Description                                                                                                                                                           |
|:---------------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    `blockf`     | Disallow plugin to modify `fpath`. Useful when a plugin wants to provide completions traditionally. Manage completions using Zi and block the plugins to expose them. |
| `nocompletions` | Skip plugin completions detection and installation. Completions can be installed anytime using: `zi creinstall {plugin-name}`.                                        |

```mdx-code-block
</APITable>
```

## <i class="fa-solid fa-list"></i> Command execution after cloning, updating or loading {#command-execution-after-cloning-updating-or-loading}

```mdx-code-block
<APITable>
```

| Ice-modifier | Description                                                                                                                                                                                                                                                                                            |
|:------------:| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|     `mv`     | Move file after cloning or update (only for new commits). Example: `mv "fzf-* -> fzf"`. It uses `->` as a separator for old and new file names. Also works with snippets.                                                                                                                        |
|     `cp`     | Copy file after cloning or update (only for new commits). Example: `cp "docker-c* -> dcompose"`. Ran after `mv`.                                                                                                                                                                                    |
| [atclone][4] | Run command after cloning, within plugin's directory, e.g. `zi ice atclone"echo cloned"`. Ran also after downloading the snippet.                                                                                                                                                                      |
| [atpull][4]  | Run command after updating (only for new commits), within the plugin's directory. If starts with "!" then the command will be run before `mv` & `cp` ices and before `git pull` or `svn update`. Otherwise is run after `mv` & `cp` ices. Use the `atpull'%atclone'` to repeat `atclone` ice-modifier. |
| [atinit][4]  | Run command after directory setup (cloning, checking, etc.) of the plugin/snippet before loading it.                                                                                                                                                                                                   |
| [atload][4]  | Run the given command within the plugin's directory after loading. Can be used with snippets. Passed code can be preceded with `!`, to be investigated (when using `load`, not `light`).                                                                                                               |
| `run-atpull` | Always run the atpull hook (when updating), not exclusively for new commits.                                                                                                                                                                                                                           |
|    `nocd`    | Don't switch the current directory to the plugin's directory when evaluating the above ice-modifiers `atinit'…'`, `atload'…'`, etc.                                                                                                                                                                    |
|  [make][5]   | Run the `make` command after cloning or updating and executing the `mv`, `cp`, `atpull`, `atclone` ice-modifiers. Can obtain argument, e.g. `make"install PREFIX=/opt"`. If the value starts with `!` then `make` is run before `atclone` and `atpull` ice-modifiers, e.g. `make'!'`.                  |
| `countdown`  | Causes an interruptible (by <kbd>Ctrl-C</kbd>) countdown 5…4…3…2…1…0 to be displayed before executing `atclone'…'`, `atpull'…'` and `make` ices-modifiers.                                                                                                                                             |
|   `reset`    | Invokes `git reset --hard HEAD` for plugins or `svn revert` for SVN snippets before pulling any new changes. This way `git` or `svn` will not report conflicts if some changes were done by e.g.: `atclone'…'` ice-modifier. For file snippets and `gh-r` plugins, it invokes `rm -rf *`.              |

```mdx-code-block
</APITable>
```

## <i class="fa-solid fa-list"></i> Sticky-Emulation Of other shells {#sticky-emulation-of-other-shells}

```mdx-code-block
<APITable>
```

|  Ice-modifier   | Description                                                                                                                                                                                                                                                                                                          |
|:---------------:| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   `sh`, `!sh`   | Source the plugin's (or snippet's) script with `sh` emulation so that also all functions declared within the file will get a **sticky** emulation assigned and invoked with the `sh` emulation set-up. The `!sh` version switches additional options that are rather not important from the portability perspective. |
| `bash`, `!bash` | The same as `sh`, but with the `SH_GLOB` option disabled, for "Bash" regular expressions to work.                                                                                                                                                                                                                    |
|  `ksh`, `!ksh`  | The same as `sh`, but emulating the `ksh` shell.                                                                                                                                                                                                                                                                     |
|  `csh`, `!csh`  | The same as `sh`, but emulating the `csh` shell.                                                                                                                                                                                                                                                                     |

```mdx-code-block
</APITable>
```

<!-- end-of-file -->
<!-- footnotes -->



<!-- end-of-file -->
<!-- links -->



<!-- external -->

[^8]: The third possible value is `as"null"` – a shorthand for `pick"/dev/null" nocompletions` – i.e.: it disables the default script-file sourcing and also the installation of completions.
[^9]: In summary, `wrap` allows to extend the investigating beyond the moment of loading of a plugin. An example use is to `wrap` a precmd function of a prompt (like `_p9k_precmd()` of powerlevel10k) or other plugins that _postpones its initialization till the first prompt_ (like e.g.: zsh-autosuggestions). **Does not work with snippets.**
[^10]: If it has no value, then it works in the _auto_ mode – it automatically extracts all files of known archive extensions IF they aren't located deeper than in a sub-directory (this is to prevent extraction of some helper archive files, typically located somewhere deeper in the tree). If no such files will be found, then it extracts all found files of known **type** – the type is being read by the `file` Unix command. If not empty, then takes the names of the files to extract. Refer to the Wiki page for further information.

[^1]: This pattern will alphabetically match and choose the first file e.g: `zi ice pick"*.plugin.zsh"; zi load …`.
[^2]: Example: `multisrc'misc.zsh grep.zsh'` and also using brace-expansion syntax: `multisrc'{misc,grep}.zsh'` also supports patterns.
[^3]: For `wait'[[ … ]]'`, `wait'(( … ))'`, loading is done when given condition is meet. For `wait'!…'`, the prompt is reset after load. Zsh can start 80% (i.e.: 5x) faster thanks to postponed loading. **Fact:** when `wait` is used without a value, it works as `wait'0'`.
[^4]: It will load once, the condition can be still true, but will not trigger the second load, unless the plugin is unloaded earlier, see `unload`. E.g.: `load'[[ $PWD = */github* ]]'`.
[^5]: It will unload once, then only if loaded again e.g: `unload'[[ $PWD != */github* ]]'`.
[^6]: Example: `zi ice if'[[ -n "$commands[otool]" ]]'; zi load …` or `zi ice if'[[ $OSTYPE = darwin* ]]'; zi load …`.
[^7]: To use the option, precede the ice content with `!` to automatically forward the call afterward, to a command of the same name as the function. Can obtain multiple functions to create – separate with `;`.

[8]: /docs/guides/syntax/bindkey

[8]: /docs/guides/syntax/bindkey
[9]: /docs/guides/syntax/ice#wrap
[10]: /docs/guides/syntax/ice#extract
[12]: /ecosystem/annexes/overview
[alternate-syntax]: /docs/guides/syntax/common#the-alternative-syntaxes
[1]: /docs/guides/syntax/ice#src-pick-multisrc
[1]: /docs/guides/syntax/ice#src-pick-multisrc
[1]: /docs/guides/syntax/ice#src-pick-multisrc
[2]: /docs/guides/syntax/ice#wait
[3]: /docs/guides/customization#multiple-prompts
[3]: /docs/guides/customization#multiple-prompts
[4]: /docs/guides/syntax/ice#atclone-atpull-atinit-atload
[4]: /docs/guides/syntax/ice#atclone-atpull-atinit-atload
[4]: /docs/guides/syntax/ice#atclone-atpull-atinit-atload
[4]: /docs/guides/syntax/ice#atclone-atpull-atinit-atload
[5]: /docs/guides/syntax/common#the-make-syntax
[6]: /docs/guides/syntax/ice#id-as

[7]: https://github.com/search?q=topic%3Azservice+org%3Az-shell&type=Repositories
