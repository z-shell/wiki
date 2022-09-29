---
id: commands
title: "🛠 Commands"
sidebar_position: 1
image: /img/png/theme/z/320x320.png
description: Zi commands, functions
keywords:
  - commands
  - functions
---

<!-- @format -->

import Link from '@docusaurus/Link';
import APITable from '@site/src/components/APITable';
import ZiTabCompletion from '@site/src/components/Markdown/\_zi_tab_completion.mdx';

## Commands available using <kbd>^TAB</kbd> <Link to="/docs/getting_started/installation#enable-completions">completion</Link>

<ZiTabCompletion/>

## Updates

To update and recompile Zi run `zi self-update` in the command line. To update all plugins and snippets, issue `zi update`. To update all in parallel (up to 40 at the time) `zi update -p 40` If you wish to update only a single plugin/snippet instead issue `zi update <plugin-name>`. A list of commits will be shown if any.

Some plugins require acting each time they're updated. One way you can do this is by using the `atpull'…'` ice modifier. For example, writing `zi ice atpull'./configure'` before loading a plugin will execute `./configure` after a successful update. Refer to [ice-modifiers][1] for more information.

The ice-modifiers for any plugin or snippet are stored in their directory in a `._zi` subdirectory, hence the plugin doesn't have to be loaded to be correctly updated. There's one other file created there, `.zi_lstupd` – it holds the log of the new commits pulled-in in the last update.

:::info Related

- It is possible to combine system updates with tools like [topgrade][5] which will run Zi updates automatically.
- Additional information on updates available at [general overview](/docs/getting_started/overview#updates-upgrades) section.

:::

## Compinit

:::note

Calling `compinit` once is a huge performance gain, for example, shell startup time with double `compinit`: **0.980** sec, with `cdreplay` and single `compinit`: **0.156** sec.

:::

### Calling `compinit` without turbo mode

With no turbo mode in use, compinit can be called normally, i.e.: as `autoload compinit; compinit`. This should be done after loading all plugins and before possibly calling `zi cdreplay`. The `cdreplay` subcommand is provided to re-play all caught `compdef` calls. The `compdef` calls are used to define a completion for a command. For example, `compdef _git git` defines that the `git` command should be completed by a `_git` function. The `compdef` function is provided by the `compinit` call.

As it should be called later, after loading all of the plugins, Zi provides its own `compdef` function that catches (i.e.: records in an array) the arguments of the call, so that the loaded plugins can freely call `compdef`. Then, the `cdreplay` (compdef-replay) can be used, after `compinit` will be called (and the original `compdef` function will become available), to execute all detected `compdef` calls.

```shell title="~/.zshrc" showLineNumbers
source ~/.zi/bin/zi.zsh

zi load "some/plugin"

(…)

compdef _gnu_generic fd  # this will be intercepted by ZI, because as the compinit
                         # isn't yet loaded, thus there's no such function `compdef'; yet
                         # ZI provides its own `compdef' function which saves the
                         # completion-definition for later possible re-run with `zi
                         # cdreplay' or `zicdreplay' (the second one can be used in hooks
                         # like atload'…', atinit'…', etc.)

(…)

zi load "other/plugin"

autoload -Uz compinit
compinit

zi cdreplay -q      # -q is for quiet; actually, run all the `compdef's saved before
                    #`compinit` call (`compinit' declares the `compdef' function, so
                    # it cannot be used until `compinit' is run; ZI solves this
                    # via intercepting the `compdef'-calls and storing them for later
                    # use with `zi cdreplay')
```

### Calling `compinit` with turbo mode

If you load completions using `wait'…'` [turbo mode][2] then you can add `atinit'zicompinit'` to the syntax-highlighting plugin (which should be the last one loaded, as their (2 projects, [zsh-syntax-highlighting][3] & [F-Sy-H][4]) documentation state), or `atload'zicompinit'` to last completion-related plugin. `zicompinit` is a function that just runs `autoload compinit; compinit`, created for convenience.

Alternatively, the `zicompinit` can be replaced with `zicompinit_fast` which checks the cached `.zcompdump` and determines when to regenerate the file. This restricts checking it once a day, as compinit doesn't always need to modify the compdump and compiles mapped to share in the background in multiple shells.

There's also `zicdreplay` which will replay any caught compdefs so you can also do: `atinit'zicompinit; zicdreplay'`, etc.

It is recommended to run the `compinit` call in the `atinit` or `atload` hook of the last related plugin with the use of the helper functions `zicompinit`,`zicdreplay` & `zicdclear` as shown below:

```shell {10} title="~/.zshrc" showLineNumbers
source ~/.zi/bin/zi.zsh

# Load using the for-syntax
zi wait lucid for \
  "some/plugin"

zi wait lucid for \
  "other/plugin"

zi wait lucid atload"zicompinit; zicdreplay" blockf for \
  zsh-users/zsh-completions
```

### Ignoring compdefs

If you want to ignore compdefs provided by some plugins or snippets, place their load commands before commands loading other plugins or snippets, and issue `zi cdclear` (or `zicdclear`, designed to be used in hooks like `atload'…'`):

```shell showLineNumbers
source ~/.zi/bin/zi.zsh
zi snippet OMZP::git
zi cdclear -q # <- forget completions provided by Git plugin

zi load "some/plugin"

(…)

zi load "other/plugin"

autoload -Uz compinit
compinit
zi cdreplay -q # <- execute compdefs provided by rest of plugins
zi cdlist # look at gathered compdefs
```

The `cdreplay` is important if you use plugins like `OMZP::kubectl` or `asdf-vm/asdf` because these plugins call `compdef`.

Following commands are passed to `zi …` to obtain described effects.

## Loading and unloading

```mdx-code-block
<APITable>
```

|       Command        | Description                                                                                       |
|:--------------------:| ------------------------------------------------------------------------------------------------- |
|     `load` `'…'`     | Load plugin, can also receive absolute local path.                                                |
|  `light` `-b` `'…'`  | Light plugin load, without reporting/investigating. `-b` – investigate `bindkey`-calls only. [^1] |
| `unload` `-q` `'…'`  | Unload plugin loaded with `zi load …`. `-q` – quiet.                                              |
| `snippet` `-f` `URL` | Source local (full path) or remote file (URL). `-f` – don't use cache (force re-download). [^2]   |

```mdx-code-block
</APITable>
```

## Completions management

```mdx-code-block
<APITable>
```

|                   Command                    | Description                                                                                                                             |
|:--------------------------------------------:| --------------------------------------------------------------------------------------------------------------------------------------- |
| `clist` `columns` or `completions` `columns` | List completions in use, with `columns` completions per line. `zi clist 5` will for example print 5 completions per line. Default is 3. |
|               `cdisable` `'…'`               | Disable completion.                                                                                                                     |
|               `cenable` `'…'`                | Enable completion.                                                                                                                      |
|         `creinstall` `-q` `-Q` `'…'`         | Install completions for the plugin, can also receive absolute local path. `-q` – quiet. `-Q` - quiet all.                               |
|               `cuninstall '…'`               | Uninstall completions for the plugin.                                                                                                   |
|                  `csearch`                   | Search for available completions from any plugin.                                                                                       |
|                  `compinit`                  | Refresh installed completions.                                                                                                          |
|                   `cclear`                   | Clear stray and improper completions.                                                                                                   |
|                   `cdlist`                   | Show compdef replay list.                                                                                                               |
|               `cdreplay` `-q`                | Replay compdefs (to be done after compinit). `-q` – quiet.                                                                              |
|                `cdclear` `-q`                | Clear compdef replay list. `-q` – quiet.                                                                                                |

```mdx-code-block
</APITable>
```

## Tracking of the active session

```mdx-code-block
<APITable>
```

|     Command      | Description                                           |
|:----------------:| ----------------------------------------------------- |
| `dtrace, dstart` | Start investigating what's going on in the session.   |
|     `dstop`      | Stop investigating what's going on in the session.    |
|    `dunload`     | Revert changes recorded between `dstart` and `dstop`. |
|    `dreport`     | Report what was going on in the session.              |
|     `dclear`     | Clear report of what was going on in the session.     |

```mdx-code-block
</APITable>
```

## Reports and statistics

```mdx-code-block
<APITable>
```

|             Command             | Description                                                                                                                                                |
|:-------------------------------:| ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `times` `-s` `-m` `-a`      | Statistics on plugin load times, sorted in order of loading. `-s` – use seconds instead of milliseconds. `-m` – show plugin loading moments and `-a` both. |
|            `zstatus`            | Overall ZI status.                                                                                                                                         |
|     `report` `'…'` `--all`      | Show plugin report. `--all` – do it for all plugins.                                                                                                       |
|            `loaded`             | Show loaded plugins                                                                                                                                        |
|        `list` `keyword`         | Filter loaded plugins with only 'keyword'                                                                                                                  |
|              `ls`               | List snippets in a formatted and colorized manner. Requires **tree** program.                                                                              |
| `status` `'…'` or `URL` `--all` | Git status for plugin or svn status for the snippet. `--all` – do it for all plugins and snippets.                                                         |
|     `recently` `time-spec`      | Show plugins that changed recently, the argument is e.g. 1 month 2 days.                                                                                   |
|           `bindkeys`            | Lists bindkeys set up by each plugin.                                                                                                                      |

```mdx-code-block
</APITable>
```

## Compiling

```mdx-code-block
<APITable>
```

|          Command          | Description                                                             |
|:-------------------------:| ----------------------------------------------------------------------- |
|  `compile` `'…'` `--all`  | Compile plugin. `--all` – compile all plugins.                          |
| `uncompile` `'…'` `--all` | Remove compiled version of the plugin. `--all` – do it for all plugins. |
|        `compiled`         | List plugins that are compiled.                                         |

```mdx-code-block
</APITable>
```

## Other commands

```mdx-code-block
<APITable>
```

|                         Command                          | Description                                                                                                                                                |
|:--------------------------------------------------------:| ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                      `self-update`                       | Updates and compiles Zi.                                                                                                                                   |
|           `update` `-q` `-r` `'…'` or `--all`            | Update all plugins and snippets with `--all` – for quiet `-q` – execute `git reset --hard` or `svn revert` before pulling changes with `-r`.               |
|                        `ice '…'`                         | Add ice to next command, argument e.g.: from"gitlab".                                                                                                      |
|           `delete` `'…'` or `--clean` `--all`            | Remove plugin or snippet from disk (good to forget wrongly passed ice-modifiers) `--all` – delete plugins and snippets that are not loaded with `--clean`. |
|                         `cd '…'`                         | Jump into the plugin's directory. Also support snippets if fed with URL.                                                                                   |
|                        `edit '…'`                        | Edit plugin's file with set \$EDITOR.                                                                                                                     |
|                       `glance '…'`                       | Look at plugin's source (pygmentize, {,source-}highlight).                                                                                                 |
|                       `stress '…'`                       | Test plugin for compatibility with a set of options.                                                                                                       |
|                      `changes '…'`                       | View plugin's git log.                                                                                                                                     |
|                       `create '…'`                       | Create plugin (also together with GitHub repository).                                                                                                      |
|              `srv` `service-id` `{command}`              | Control a service, command can be: stop,start,restart,next,quit; `next` moves the service to another Z shell.                                              |
|                    `recall '…'` `URL`                    | Fetch saved ice modifiers and construct `zi ice '…'` command.                                                                                              |
|           `env-whitelist` `-v` `-h` `{env..}`            | Allows to specify names or patterns of variables left unchanged during an unload – verbose `-v` – help `-h`.                                               |
|                         `module`                         | Manage binary Zsh module shipped with ZI, see `zi module help`.                                                                                            |
| `add-fpath` `fpath` `-f` `--front` `'…'` `sub-directory` | Adds given plugin (not yet snippet) directory to `$fpath`. If the second argument is given, it is appended to the directory path. [^3]                     |
|             `run` `-l` `plugin` `{command}`              | Runs the given command in the given plugin's directory. [^4]                                                                                               |

```mdx-code-block
</APITable>
```

## Help & manual

```mdx-code-block
<APITable>
```

|  Command   | Description        |
|:----------:| ------------------ |
| `-h, help` | Usage information. |
|   `man`    | Manual.            |

```mdx-code-block
</APITable>
```

<!-- end-of-file -->
<!--footnotes-->



<!-- links -->



<!-- external -->

[^1]: There's also `light-mode` ice which can be used to induce the no-investigating (i.e.: _light_) loading, regardless of the command used.
[^2]: The URL can use the following shorthands: `PZT::` (Prezto), `PZTM::` (Prezto module), `OMZ::` (Oh-My-Zsh), `OMZP::` (OMZ plugin), `OMZL::` (OMZ library), `OMZT::` (OMZ theme), e.g.: `PZTM::environment`, `OMZP::git`, etc.
[^3]: The `'…'` can be an absolute path, i.e.: it's possible to also add regular directories. If the option `-f` or `--front` is given, the directory path is prepended instead of appended to `$fpath`.
[^4]: If the option `-l` will be given then the plugin should be skipped – the option will cause the previous plugin to be reused.

[1]: /search/?q=ice-modifiers
[2]: /search?q=turbo+mode

[3]: https://github.com/zsh-users/zsh-syntax-highlighting
[4]: https://github.com/z-shell/F-Sy-H
[5]: https://github.com/r-darwish/topgrade
