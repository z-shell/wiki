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

An ice modifiers are [passed][alternate-syntax] to `zi ice …` to obtain described effects, additionally can be added with [annexes][12]. To see all available ice modifiers run `zi -h`. The word `ice` means something that's added, like ice to a drink – and in Zi, it means adding a modifier to a next `zi` command, and also something temporary because it melts – and this means that the modification will last only for a **single** next `zi` command. Some ice modifiers are highlighted and clicking on them will take you to the appropriate Wiki page for an extended explanation. You may safely assume that given ice works with both plugins and snippets unless explicitly stated otherwise.

## <i class="fa-solid fa-list"></i> Ice effects {#ice-effects}

<div className="apitable">

|  Ice-modifier   | Description                                                                                                                                                                                                                                                                                                                                                     |
| :-------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      `as`       | Can be `as"program"` (alias: `as"command"`), and will cause to add script/program to `$PATH` instead of sourcing (see `pick`). Can also be `as"completion"` – use with plugins or snippets in whose only underscore-starting `_*` files you are interested in. [^8]                                                                                             |
|   [id-as][6]    | Nickname a plugin or snippet, e.g. create a short handler for the long-URL snippet.                                                                                                                                                                                                                                                                             |
|    `compile`    | Pattern (possible `{…}` expansion, like `{a/*,b*}`) to select additional files to compile, e.g. `compile"(pure \| async).zsh"`for`sindresorhus/pure`.                                                                                                                                                                                                           |
|   `nocompile`   | Don't try to compile `pick`-pointed files. Si on lui passe le point d'exclamation (c'est-à-dire `nocompile'!'`), alors on compile, mais après `make'…'` et `atclone'…'` (utile si le Makefile installe certains scripts, pour faire pointer `pick'…'` à l'emplacement de leur installation).                                                                                                    |
|    `service`    | Make the following plugin or snippet a _service_, which will run in the background, and only in a single Zshell instance. Voir la rubrique [#zservice][7].                                                                                                                                                                                                             |
| `reset-prompt`  | Reset the prompt after loading the plugin/snippet (by issuing `zle .reset-prompt`). Remarque : normalement, il suffit de faire précéder la valeur de la glace `wait'…'` de `!`.                                                                                                                                                                                              |
|  [bindmap][8]   | To hold `;`-separated strings like `Key(s)A -> Key(s)B`, e.g. `^R -> ^T; ^A -> ^B`. En général, `bindmap'…'` change les liaisons (faites avec le commande par défaut `bindkey`) que le plugin fait. Dans cet exemple, le plugin mapperait <kbd>Ctrl-T</kbd> au lieu de <kbd>Ctrl-R</kbd>, et <kbd>Ctrl-B</kbd> au lieu de <kbd>Ctrl-A</kbd>. **Ne fonctionne pas avec les snippets.** |
| [trackbinds][8] | Ombrage mais seulement les appels `bindkey` même avec `zi light …`, c'est-à-dire même avec l'investigation désactivée (chargement rapide), pour permettre à `bindmap` de remapper les key-binds. Le même effet a `zi light -b …`, c'est-à-dire l'option `-b` supplémentaire à la sous-commande `light`. **Does not work with snippets.**                                                                           |
|    [wrap][9]    | Takes a `;`-separated list of function names to be investigated (meaning gathering report and unloading data) **once** during execution. Il fonctionne en enveloppant les fonctions avec un bout de code permettant d'activer et de désactiver l'investigation. [^9]                                                                                                                  |
|    `aliases`    | Load the plugin with the aliases mechanism enabled. A utiliser avec les plugins qui définissent **et utilisent** des alias dans leurs scripts.                                                                                                                                                                                                                                          |
|  `light-mode`   | Load the plugin without investigating, i.e., same as the `light` command. Useful with the "for" syntax, where there is no `load` nor `light` subcommand                                                                                                                                                                                                         |
|  [extract][10]  | Performs archive extraction supporting multiple formats like `zip`, `tar.gz`, etc., and OS X `dmg` images. [^10]                                                                                                                                                                                                                                                |
|     `subst`     | Substitute the given string into another string when sourcing the plugin script, e.g.: `zi subst'autoload → autoload -Uz' …`.                                                                                                                                                                                                                                   |
|   `autoload`    | Autoload the given functions (from their files). Equivalent à l'appel de `atinit'autoload the-function'`. Supporte le renommage de la fonction - passez `'… → nouveau-nom '` ou `'… -> nouveau-nom'`, par exemple : `zi autoload 'fun → mon-fun ; fun2 → mon-fun2'`.                                                                                                                      |

</div>

## <i class="fa-solid fa-list"></i> Options de clonage {#cloning-options}

<div className="apitable">

|   Ice-modifier   | Description                                                                                                                                                                                                                                                                                                                    |
| :--------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|     `proto`      | Change protocol to `git`,`ftp`,`ftps`,`ssh`, `rsync`, etc. La valeur par défaut est `https`. **Does not work with snippets.**                                                                                                                                                                                                                |
| [from](ice#from) | Clone plugin from a given site. Les éléments pris en charge sont `from"github"` (par défaut), `…"github-rel"`, `…"gitlab"`, `…"bitbucket"`, `…"notabug"` (noms courts : `gh`, `gh-r`, `gl`, `bb`, `nb`). Peut également être un nom de domaine complet, par exemple: pour GitHub enterprise. **Does not work with snippets.**                                                  |
|      `ver`       | Used with `from"gh-r"` (i.e. downloading a binary release, e.g. for use with `as"program"`) – selects which version to download. La valeur par défaut est la plus récente, peut également être explicite `ver"latest"`. Fonctionne également avec les plugins ordinaires, et les checkouts par exemple `ver"branch"`, c'est-à-dire une version spécifique. **Does not work with snippets.**           |
|     `bpick`      | Used to select which release from GitHub Releases to download, e.g. `zi ice from"gh-r" as"program" bpick"*Darwin*"; zi load docker/compose`. **Does not work with snippets.**                                                                                                                                                  |
|     `depth`      | Pass `--depth` to `git`. C'est-à-dire, limiter la quantité d'historique à télécharger. **Does not work with snippets.**                                                                                                                                                                                                                            |
|   `cloneopts`    | Pass the contents of `cloneopts` to `git clone`. La valeur par défaut est `--recursive`. C'est-à-dire modifier les options de clonage. Passez de la glace vide pour désactiver le clonage récursif. **Does not work with snippets.**                                                                                                                                        |
|    `pullopts`    | Pass the contents of `pullopts` to `git pull` used when updating plugins. **Does not work with snippets.**                                                                                                                                                                                                                     |
|      `svn`       | Use Subversion for downloading snippets. GitHub supporte le protocole `SVN`, cela permet de cloner des sous-répertoires en tant que snippets, par exemple `zi ice svn ; zi snippet OMZP::git`. La glace `pick` peut être utilisé pour sélectionner un fichier à la source (les valeurs par défaut sont: `*.plugin.zsh`, `init.zsh`, `*.zsh-theme`). **Ne fonctionne pas avec les plugins.** |

</div>

## <i class="fa-solid fa-list"></i> Sélection de fichiers (source '…') {#selection-of-files-source}

<div className="apitable">

| Ice-modifier  | Description                                                                                                                                       |
| :-----------: | ------------------------------------------------------------------------------------------------------------------------------------------------- |
|   [pick][1]   | Select the file to source, or the file to set as a command, when using `snippet --command` or the ice `as"program"`. Plus d'informations ci-dessous [^1].             |
|   [src][1]    | Specify an additional file to source after the main file or after setting up command via `as"program"`. Il ne s'agit pas d'un motif mais d'un simple nom de fichier. |
| [multisrc][1] | Allows specifying multiple files for sourcing, enumerated with spaces as the separators. More below [^2].                                         |

</div>

## <i class="fa-solid fa-list"></i> Conditional loading {#conditional-loading}

<div className="apitable">

|  Ice-modifier  | Description                                                                                                              |
| :------------: | ------------------------------------------------------------------------------------------------------------------------ |
|   [wait][2]    | Postpone loading a plugin or snippet. For `wait'1'`, loading is done `1` second after the prompt. [^3].                  |
|   [load][3]    | A condition to check which should cause the plugin to load. [^4].                                                        |
|  [unload][3]   | A condition to check to cause the plugin to unload. More below [^5].                                                     |
|  `cloneonly`   | Don't load the plugin/snippet, only download it.                                                                         |
|      `if`      | Load plugin/snippet only when a given condition is true. Example: [^6].                                                  |
|     `has`      | Load plugin or snippet only when given command is available (in \$PATH), e.g. `zi ice has'git' …`.                       |
|  `subscribe`   | Postpone loading of a plugin or snippet until the given file(s) get updated, e.g. `subscribe'{~/files-*,/tmp/files-*}'`. |
| `trigger-load` | Creates a function that loads the associated plugin/snippet, with an option. More below [^7].                            |

</div>

## <i class="fa-solid fa-list"></i> Plugin output {#plugin-output}

<div className="apitable">

| Ice-modifier | Description                                                                                                                                                                                                                                                                                                 |
| :----------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   `silent`   | Mute plugin's or snippet's `stderr` & `stdout`. Also, skip the `loaded …` message under prompt for `wait`, etc. loaded plugins, and completion-installation messages.                                                                                                                                       |
|   `lucid`    | Skip `loaded …` message under prompt for `wait`, etc. loaded plugins (a subset of `silent`).                                                                                                                                                                                                                |
|   `notify`   | Output given message under-prompt after successfully loading a plugin/snippet. In case of problems with the loading, output a warning message and the return code. If starts with `!` it will then always output the given message. Hint: if the message is empty, then it will just notify about problems. |

</div>

## <i class="fa-solid fa-list"></i> Complétions {#completions}

<div>

|  Ice-modifier   | Description                                                                                                                                                           |
| :-------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    `blockf`     | Disallow plugin to modify `fpath`. Useful when a plugin wants to provide completions traditionally. Manage completions using Zi and block the plugins to expose them. |
| `nocompletions` | Skip plugin completions detection and installation. Completions can be installed anytime using: `zi creinstall {plugin-name}`.                                        |

</div>

## <i class="fa-solid fa-list"></i> Command execution after cloning, updating or loading {#command-execution-after-cloning-updating-or-loading}

<div className="apitable">

| Ice-modifier | Description                                                                                                                                                                                                                                                                                            |
| :----------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|     `mv`     | Move file after cloning or update (only for new commits). Exemple : `mv "fzf-* -> fzf"`. Il utilise `->` comme séparateur pour les anciens et les nouveaux noms de fichiers. Fonctionne également avec des extraits.                                                                                                                              |
| `cp` | Copiez le fichier après le clonage ou la mise à jour (uniquement pour les nouveaux commits). Exemple : `cp "docker-c* -> dcompose"`. Exécuté après `mv`.                                                                                                                                                                                       |
| [atclone][4] | Exécutez la commande après le clonage, dans le répertoire du plugin, par exemple `zi ice atclone"echo cloned"`. Exécuté également après le téléchargement de l'extrait.                                                                                                                                                                      |
| [atpull][4]  | Exécutez la commande après la mise à jour (uniquement pour les nouveaux commits), dans le répertoire du plugin. S'il commence par "!", la commande sera exécutée avant les glaces `mv` & `cp' et avant `git pull` ou `svn update`. Sinon, il est exécuté après les glaces `mv` &`cp`. Use the `atpull'%atclone'` to repeat `atclone` ice-modifier. |
| [atinit][4]  | Run command after directory setup (cloning, checking, etc.) of the plugin/snippet before loading it.                                                                                                                                                                                                   |
| [atload][4]  | Run the given command within the plugin's directory after loading. Can be used with snippets. Passed code can be preceded with `!`, to be investigated (when using `load`, not `light`).                                                                                                               |
| `run-atpull` | Always run the atpull hook (when updating), not exclusively for new commits.                                                                                                                                                                                                                           |
|    `nocd`    | Don't switch the current directory to the plugin's directory when evaluating the above ice-modifiers `atinit'…'`, `atload'…'`, etc.                                                                                                                                                                    |
|  [make][5]   | Run the `make` command after cloning or updating and executing the `mv`, `cp`, `atpull`, `atclone` ice-modifiers. Can obtain argument, e.g. `make"install PREFIX=/opt"`. If the value starts with `!` then `make` is run before `atclone` and `atpull` ice-modifiers, e.g. `make'!'`.                  |
| `countdown`  | Causes an interruptable (by <kbd>Ctrl-C</kbd>) countdown 5…4…3…2…1…0 to be displayed before executing `atclone'…'`, `atpull'…'` and `make` ices-modifiers.                                                                                                                                             |
|   `reset`    | Invokes `git reset --hard HEAD` for plugins or `svn revert` for SVN snippets before pulling any new changes. This way `git` or `svn` will not report conflicts if some changes were done by e.g.: `atclone'…'` ice-modifier. For file snippets and `gh-r` plugins, it invokes `rm -rf *`.              |

</div>

## <i class="fa-solid fa-list"></i> Sticky-Emulation Of other shells {#sticky-emulation-of-other-shells}

<div className="apitable">

|  Ice-modifier   | Description                                                                                                                                                                                                                                                                                                          |
| :-------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   `sh`, `!sh`   | Source the plugin's (or snippet's) script with `sh` emulation so that also all functions declared within the file will get a **sticky** emulation assigned and invoked with the `sh` emulation set-up. The `!sh` version switches additional options that are rather not important from the portability perspective. |
| `bash`, `!bash` | The same as `sh`, but with the `SH_GLOB` option disabled, for "Bash" regular expressions to work.                                                                                                                                                                                                                    |
|  `ksh`, `!ksh`  | The same as `sh`, but emulating the `ksh` shell.                                                                                                                                                                                                                                                                     |
|  `csh`, `!csh`  | The same as `sh`, but emulating the `csh` shell.                                                                                                                                                                                                                                                                     |

</div>

<!-- end-of-file -->
<!-- footnotes -->



<!-- links -->

[12]: /ecosystem/annexes/overview
[alternate-syntax]: /docs/guides/syntax/common#the-alternative-syntaxes
