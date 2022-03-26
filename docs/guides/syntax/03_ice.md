---
id: ice
title: 🧊 Ice Syntax
image: zw/img/ice-239x200.png
description: Ice syntax documentation
keywords: [ice, syntax]
---

import Image from '@theme/IdealImage'; import APITable from '@site/src/components/APITable'; import ZIceImg from
'@site/static/zw/img/ice-239x200.png';

<div align="right">

<Image className="IceLogo" img={ZIceImg} alt="What is ice" />

</div>

:::info FAQ: What is ice?

The word **ice** means something that's added (like ice to a drink) – and in ZI syntax it means adding a modifier to a
next zi command, and also something that's temporary because it melts – and this means that the modification will last
only for a single next zi command.

:::

## `extract'…'`

### The Automatic archive-extraction

ZI has a swiss-knife tool for unpacking all kinds of archives – the `extract'…'` ice. It works in two modes – automatic
mode and fixed mode.

#### automatic mode

It is active if the ice is empty (or contains only flags – more on them later). It works as follows:

1. At first, a recursive search for files of known [file extensions](#supported-file-formats) located not deeper than in
   a sub-directory is being performed. All such found files are then extracted.
   - The directory-level limit is to skip extraction of some helper archive files, which are typically located somewhere
     deeper in the directory tree.
2. **IF** no such files will be found, then a recursive search for files of known archive **types** will be performed.
   This is basically done by running the `file` Unix command on each file in the plugin or snippet directory and then
   grepping the output for strings like `Zip`, `bzip2`, etc. All such discovered files are then extracted.
   - The directory-level requirement is imposed also during this stage - files located deeper in the tree than in a
     sub-directory are omitted.
3. If no archive files will be discovered then no action is being performed and also no warning message is being
   printed.

#### Fixed mode

It is active when a filename is being passed as the `extract`'s argument, e.g.:
`zi extract=archive.zip for z-shell/null`.

Multiple files can be specified – separated by spaces. In this mode all and only the specified files are being
extracted.

#### Filenames With Spaces

The filenames with spaces in them are supported by a trick – to correctly pass such a filename to `extract` use the
non-breaking space in place of the in-filename original spaces.

The non-breaking space is easy to type by pressing right <kbd>ALT</kbd> and the <kbd>SPACE</kbd>.

#### Flags

The value of the ice can begin with a two special characters:

1. Exclamation mark (`!`), i.e.: `extract='!…'` – it'll cause the files to be moved one directory-level up upon
   unpacking,
2. Dash (`-`), i.e.: `extract'-…'` – it'll prevent removal of the archive after unpacking.
   - This flag is useful to allow comparing timestamps with the server in case of snippet-downloaded file – it will
     prevent unnecessary downloads during `zi update`, as the timestamp of the archive file on the disk will be first
     compared with the HTTP last-modification time header.

The flags can be combined in any order: `extract'!-'`.

### `ziextract`

Sometimes a more uncommon unpacking operation is needed.

In such case you can directly use the function that implements the ice – it is called `ziextract`.

It recognizes the following options:

1. `--auto` – runs the automatic extraction.
2. `--move` – performs the one-directory-level-up move of the files after unpacking.
3. `--norm` - prevents the archive file removal.
4. And also one option specific only to the function: `--nobkp`, which prevents clearing of the plugin's dir before the
   extraction – normally all the files except the archive are being moved into `._backup` directory and after that the
   extraction is performed. - `extract` ice also skips creating the backup **if** more than one archive is found or
   given as the argument.

### Supported File Formats

<APITable>

| File formats | ✓   |
| :----------- | --- |
| Zip          | ✓   |
| RAR          | ✓   |
| tar.gz       | ✓   |
| tar.bz2      | ✓   |
| tar.xz       | ✓   |
| tar.7z       | ✓   |
| tar          | ✓   |
| tgz          | ✓   |
| tbz2         | ✓   |
| gz           | ✓   |
| bz2          | ✓   |
| txz          | ✓   |
| xz           | ✓   |
| 7z           | ✓   |
| exe          | ✓   |
| deb          | ✓   |
| OS X (dmg)   | ✓   |

</APITable>

## `from'…'`

In order to install and load a plugin whose repository is private - e.g: requires providing credentials in order to log
in – use the `from'…'` ice in the following way:

```shell
zi ice from"user@github.com"
zi load user/fsh-auto-themes
```

Current preset:

<APITable>

| Ice name   | Domain name / URL                    |
| :--------- | :----------------------------------- |
| ge         | gitee.com                            |
| gitee      | gitee.com                            |
| github     | github.com                           |
| gh         | github.com                           |
| gitlab     | gitlab.com                           |
| gl         | gitlab.com                           |
| notabug    | notabug.org                          |
| nb         | notabug.org                          |
| bitbucket  | bitbucket.org                        |
| bb         | bitbucket.org                        |
| github-rel | github.com/$remote_url_path/releases |
| gh-r       | github.com/$remote_url_path/releases |
| cygwin     | cygwin                               |

</APITable>

:::note

If the `from'…'` ice isn't one of above table, then **it is treaten as a domain name** and inserted into the domain
position into the `git clone` url:

```shell
git clone https://{from-ice-contents}/user/plugin
```

In order to change the protocol, use the `proto'…'` ice.

:::

### Summary of `from'…'`

By using this method you can clone plugins from e.g. GitHub Enterprise or embed the passwords as plain text in `.zshrc`.

## `id-as'…'`

### Nickname a plugin or snippet

ZI supports loading a plugin or snippet with a nickname. Set the nickname through the `id-as` ice-modifier.

For example, one could try to load [**docker/compose**][1] from GitHub binary releases:

```shell
zi ice as"program" from"gh-r" mv"docker-c* -> docker-compose"
zi light "docker/compose"
```

This registers plugin under the ID `docker/compose`. Now suppose the user would want to also load a completion from the
project's GitHub repository (not the binary release catalog) which is also available under the GitHub url-path
**…/docker/compose**.

The two IDs, both being "docker/compose", will collide.

The solution to this problem – the `id-as` (to be read as: _identify-as_) ice to which this document is devoted: by
using the `id-as` ice the user can resolve the conflict by loading the completion under a kind of a _nickname_, for
example under "_dc-complete_", by issuing the following commands:

```shell
zi ice as"completion" id-as"dc-complete"
zi load docker/compose
```

The plugin (of the type `completion`) is now seen under ID `dc-complete`:

```shell
zi list | grep -i dc-complete
dc-complete
```

Issuing `zi report dc-complete` also works, so as other Zi commands:

```shell
zi report dc-complete

Plugin report for dc-complete
-------------------------------

Completions:
_docker-compose [enabled]
```

This can be also used to nickname snippets.

For example, you can use this to create handy IDs in place of long urls:

```shell
zi ice as"program" id-as"git-unique"
zi snippet https://github.com/Osse/git-scripts/blob/master/git-unique
```

The commands `zi update git-unique`, `zi delete git-unique` and other will work normally and e.g. `zi times` will show
the _nickname_-ID `git-unique` instead of the long URL.

### `id-as'auto'` {#id-asauto}

There's a special value to the `id-as'…'` ice – `auto`. It causes the nickname to be automatically set to the last
component of the plugin name or snippet URL. For example:

```shell
zi ice as"program" id-as"auto"
zi snippet https://github.com/Osse/git-scripts/blob/master/git-unique
```

will work the same as before, e.g: like if the ice used was `id-as'git-unique'`.

Will work as if id-as'zsh-autopair' was passed:

```shell
zi ice wait lucid id-as"auto"
zi load hlissner/zsh-autopair
```

### Empty `id-as'…'`

An empty `id-as'…'` will work the same as `id-as'auto'`, i.e.:

```shell
# Will work as if id-as'zsh-autopair' was passed
zi ice wait lucid id-as
zi load hlissner/zsh-autopair
```

## `wait`

:::note

Turbo mode, i.e. the `wait` ice that implements it - needs Zsh >= 5.3.

:::

```shell
zi ice wait'0' # or just: zi ice wait
zi light wfxr/forgit
```

- waits for prompt,
- instantly ("0" seconds) after prompt loads given plugin.

```shell
zi ice wait'[[ -n ${ZLAST_COMMANDS[(r)cras*]} ]]'
zi light z-shell/zi-crasis
```

- `$ZLAST_COMMANDS` is an array build by [**F-Sy-H**][2], it contains commands currently entered at prompt,
- `(r)` searches for element that matches given pattern (`cras*`) and returns it,
- `-n` means: not-empty, so it will be true when users enters "cras",
- after 1 second or less, ZI will detect that `wait'…'` condition is true, and load the plugin, which provides command
  _crasis_,
- Screencast that presents the feature: [![screencast][3]][4]

```shell
zi ice wait'[[ $PWD = */github || $PWD = */github/* ]]'
zi load unixorn/git-extra-commands
```

it waits until user enters a `github` directory.

Turbo mode also support a suffix – the letter `a`, `b` or `c`. The meaning is illustrated by the following example:

```shell
zi ice wait"0b" as"command" pick"wd.sh" atinit"echo Firing 1" lucid
zi light mfaerevaag/wd
zi ice wait"0a" as"command" pick"wd.sh" atinit"echo Firing 2" lucid
zi light mfaerevaag/wd

# The output
Firing 2
Firing 1
```

As it can be seen, the second plugin has been loaded first. That's because there are now three sub-slots (the `a`, `b`
and `c`) in which the plugin/snippet loadings can be put into. Plugins from the same time-slot with suffix `a` will be
loaded before plugins with suffix `b`, etc.

In other words, instead of `wait'1'` you can enter `wait'1a'`, `wait'1b'` and `wait'1c'` – to this way **impose order**
on the loadings **regardless of the order of `zi` commands**.

### `zi-turbo '…' for …`

The `zi-turbo` is a funtion to simplify `wait`. This is how the function looks like:

```shell
zi-turbo () {
   zi depth'3' lucid ${1/#[0-9][a-d]/wait"${1}"} "${@:2}"
}
```

It can be executed with the `for` syntax in the imposed loading order e.g:

```shell
zi-turbo '0a' for \
   OMZL::git.zsh \
   OMZL::compfix.zsh \
   OMZL::functions.zsh \

zi-turbo '0b' for \
   OMZL::prompt_info_functions.zsh OMZL::spectrum.zsh \
   OMZL::clipboard.zsh OMZL::termsupport.zsh OMZL::directories.zsh

zi-turbo '1a' for \
   OMZP::sudo OMZP::encode64 \
      atload"unalias grv g" OMZP::git \
   OMZP::gcloud OMZP::nvm OMZP::gem OMZP::rust

zi-turbo '1b' for \
   MichaelAquilina/zsh-you-should-use
```

## `wrap-track'…'`

The `wrap-track'…'` ice-mod allows to extend the tracking (e.g: gathering of report and unload data) of a plugin beyond
the moment of sourcing it's main file(s).

It works by wrapping the given functions with a tracking-enabling and disabling snippet of code. This is useful
especially with prompts, as they very often do their initialization in the first call to their `precmd` [**hook**][5]
function.

For example, [**romkatv/powerlevel10k**][6] works this way.

The ice takes a list of function names, with the elements separated by `;`:

```shell
zi ice wrap-track"func1;func2;…" …
…
```

### Use case for `wrap-track'…'` {#use-case-for-wrap-track}

Therefore, to e.g. load and unload the example powerlevel10k prompt in the fashion of [**Multiple prompts**][7] article,
the `precmd` function of the plugin – called `_p9k_precmd`, to get the name of the function do `echo $precmd_functions`
after loading a theme, should be passed to `wrap-track'…'` ice.

Load when `MYPROMPT == 4`

```shell
zi ice load'![[ $MYPROMPT = 4 ]]' unload'![[ $MYPROMPT != 4 ]]' \
  atload'source ~/.p10k.zsh; _p9k_precmd' wrap-track'_p9k_precmd'
zi load romkatv/powerlevel10k
```

This way the actions done during the first call to `_p9k_precmd()` will be normally recorded, which can be viewed in the
report of the [**romkatv/powerlevel10k**][6] theme:

```shell
➜ zi report romkatv/powerlevel10k:
Report for romkatv/powerlevel10k plugin
---------------------------------------
Source powerlevel10k.zsh-theme (reporting enabled)
Autoload is-at-least with options -U -z

(…)

Note: === Starting to track function: _p9k_precmd ===
Zle -N p9k-orig-zle-line-finish _zsh_highlight_widget_zle-line-finish
Note: a new widget created via zle -N: p9k-orig-zle-line-finish
Zle -N -- zle-line-finish _p9k_wrapper__p9k_zle_line_finish
Autoload vcs_info with options -U -z
Zstyle :vcs_info:* check-for-changes true

(…)

Zstyle :vcs_info:* get-revision false
Autoload add-zsh-hook with options -U -z
Zle -F 22_gitstatus_process_response_POWERLEVEL9K
Autoload_gitstatus_cleanup_15877_0_16212
Zle -N -- zle-line-pre-redraw _p9k_wrapper__p9k_zle_line_pre_redraw
Note: a new widget created via zle -N: zle-line-pre-redraw
Zle -N -- zle-keymap-select _p9k_wrapper__p9k_zle_keymap_select
Note: === Ended tracking function:_p9k_precmd ===

Functions created:
+vi-git-aheadbehind                      +vi-git-remotebranch

(…)
```

#### Summary of `wrap-track'…'`

As it can be seen, creation of four additional Zle-widgets has been recorded - `Zle -N …` lines. They will be properly
deleted/restored on the plugin unload with `MYPROMPT=3` as example and the shell state will be clean, ready to load a
new prompt.

## `src'…'` `pick'…'` `multisrc'…'`

Normally `src'…'` can be used to specify additional file to source:

```shell
zi ice pick"powerless.zsh" src"utilities.zsh"
zi light martinrotter/powerless
```

<APITable>

|  Syntax   | Description                                                                                        |
| :-------: | :------------------------------------------------------------------------------------------------- |
| `pick'…'` | Provide main file to source - like `*.sh`, otherwise alphabetically first matched file is sourced. |
| `src'…'`  | Provide second file to source - not a pattern - plain file name.                                   |

</APITable>

However, via `atload'…'` ice one can provide simple loop to source more files:

```shell
zi ice svn pick"completion.zsh" \
  atload'local f; for f in git.zsh misc.zsh; do \
        source $f \
    done'
zi snippet OMZ::lib
```

<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<APITable>

|   Syntax    | Description |
|:-----------:|:------------|
|    `svn`    | Use Subversion to clone `OMZ::lib` (the whole Oh My Zsh `lib/` directory). More below (1). |
| `atload'…'` | Code isn't tracked and cannot be unloaded. The `atload'…'` is executed after loading main files `pick'…'` and `src'…'`.  More below (2). |

</APITable>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

- (1) Note that `atload'…'` uses apostrophes not double quotes, to literally put `$f` into the string, `atload`'s code
  is automatically being run **within the snippet's (or plugin's) directory**.
- (2) Unless you load a plugin (not a snippet) with `zi load …` and prepend the value of the ice with exclamation mark.
  Example: `atload'!local f; for …'`.

### The `multisrc'…'` ice

Loads **multiple** files enumerated with spaces as the separator (e.g. `multisrc'misc.zsh grep.zsh'`) and also using
brace-expansion syntax (e.g. `multisrc'{misc,grep}.zsh')`. Example:

```shell
zi ice svn pick"completion.zsh" multisrc'git.zsh \
    functions.zsh {history,grep}.zsh'
zi snippet OMZ::lib
```

The all possible ways to use the `multisrc'…'` ice-modifier:

```shell
zi ice depth"1" multisrc="lib/{functions,misc}.zsh" pick"/dev/null"
zi load robbyrussell/oh-my-zsh
```

Can use patterns:

```shell
zi ice svn multisrc"{funct*,misc}.zsh" pick"/dev/null"
zi snippet OMZ::lib
```

```shell
zi ice svn multisrc"misc.zsh functions.zsh" pick"/dev/null"
zi snippet OMZ::lib
```

Will use the array's value at the moment of plugin load:

> This can matter in case of using turbo mode.

```shell
array=({functions,misc}.zsh)
zi ice svn multisrc"\$array" pick"/dev/null"
zi snippet OMZ::lib
```

Compatible with KSH_ARRAYS option:

```shell
array=({functions,misc}.zsh)
zi ice svn multisrc"${array[*]}" pick"/dev/null"
zi snippet OMZ::lib
```

Hack with ZI: the ice's contents is simply `eval`-uated like follows: eval "reply=($multisrc)".

So it might get handy on an occasion to pass code there, but first you must close the paren and then don't forget to
assign `reply`, and to provide a trailing opening paren.

In the code be careful to not redefine any variable used internally by ZI – e.g.: `i` is safe:

```shell
array=({functions,misc}.zsh)
zi ice svn multisrc'); local i; for i in $array; do \
            reply+=( ${i/.zsh/.sh} ); \
        done; ((1)' pick"/dev/null"
zi snippet OMZ::lib
```

Extended with the [for][8] syntax which can in some situations replace a typical `multisrc'…'` loading.

The point is that this syntax allows to easily specify snippets to source – and do this within a single ZI command.

Thus, instead of:

```shell
zi ice multisrc'(functions|misc|completion).zsh'
zi snippet OMZ::lib
```

it's possible to write:

```shell
zi for \
  OMZL::functions.zsh \
  OMZL::misc.zsh \
  OMZL::completion.zsh
```

which is somewhat easier on eyes.

:::info Important Property

The multiple snippets loaded with the `for` syntax are being loaded _separately_, which means that they will not cause a
longer keyboard blockage, which could have been noticeable – when using Turbo.

:::

The ZI scheduler will distribute the work over time and will allow activation of keyboard in between the snippets.

The `multisrc'…'` way doesn't work this way – sourcing many files can cause noticeable keyboard freezes (in Turbo).

## `atclone'…'` `atpull'…'` `atinit'…'` `atload'…'`

There are four code-receiving ices: `atclone'…'`, `atpull'…'`, `atinit'…'`, `atload'…'`.

Their role is to **receive a portion of Zsh code and execute it in certain moments of the plugin life-cycle**.

<APITable>

|    Syntax    | Execution moment                                                |
| :----------: | :-------------------------------------------------------------- |
| `atclone'…'` | **after cloning** the associated plugin or snippet to the disk. |
| `atpull'…'`  | **after updating** the associated plugin or snippet.            |
| `atinit'…'`  | **before loading** of the associated plugin or snippet.         |
| `atload'…'`  | **after loading** of the associated plugin or snippet.          |

</APITable>

For convenience, you can use each of the ices multiple times in single `zi ice …` invocation – all the passed commands
will be executed in the given order.

The `atpull'…'` ice recognizes a special value: `%atclone`, so the code looks: `atpull'%atclone'`.

It causes the contents of the `atclone'…'` ice to be copied into the contents of the `atpull` ice.

This is handy when the same tasks have to be performed on clone **and** on update of plugin or snippet, like e.g.: in
the [**Direnv example**][9].

### `atload'!…'` with exclamation mark preceded

The `wrap-track` ice allows to track and unload plugins that defer their initialization into a function run later after
sourcing the plugin's script – when the function is called, the plugin is then being fully initialized.

However, if the function is being called from the `atload` ice, then there is a simpler method than the `wrap-track` ice
– an _exclamation mark_-preceded `atload` contents

The exclamation mark causes the effects of the execution of the code passed to `atload` ice to be recorded.

### Use case for `atload'…'`

For example, in the following invocation:

```shell
zi ice id-as'test' atload'!PATH+=:~/share'
zi load z-shell/null
```

the `$PATH` is being changed within `atload` ice.

ZI's tracking records `$PATH` changes and withdraws them on plugin unload, and also shows information loading:

```shell
➜ zi report test
Report for test plugin
----------------------
Source  (reporting enabled)

PATH elements added:
/home/sg/share
```

As it can be seen, the `atload` code is being correctly tracked and can be unloaded & viewed.

Below is the result of using the `unload` subcommand to unload the `test` plugin:

```shell
zi unload test
--- Unloading plugin: test ---
Removing PATH element /home/sg/share
Unregistering plugin test
Plugin report saved to $LASTREPORT
```

### Practical example

The same example as in the [**Tracking precmd-based Plugins**](#wrap-track) article, but using the _exclamation
mark_-preceded `atload` instead of `wrap-track`:

Load when - `MYPROMPT == 4`

```shell
zi ice load'![[ $MYPROMPT = 4 ]]' unload'![[ $MYPROMPT != 4 ]]' \
  atload'!source ~/.p10k.zsh; _p9k_precmd'
zi load romkatv/powerlevel10k
```

[1]: https://github.com/docker/compose
[2]: https://github.com/z-shell/F-Sy-H
[3]: https://asciinema.org/a/149725.svg
[4]: https://asciinema.org/a/149725
[5]: https://zsh.sourceforge.net/Doc/Release/Functions.html#Hook-Functions
[6]: https://github.com/romkatv/powerlevel10k
[7]: /docs/guides/customization#multiple-prompts
[8]: /docs/guides/syntax/for
[9]: /docs/guides/syntax/common#direnv
