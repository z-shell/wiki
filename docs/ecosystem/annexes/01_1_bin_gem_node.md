---
id: bin-gem-node
title: 💠 Bin Gem Node
image: zw/logo/320x320.png
description: Annex - Bin Gem Node documentation
keywords: [annex, bin-gem-node]
---

import APITable from '@site/src/components/APITable';

- [z-shell/z-a-bin-gem-node](https://github.com/z-shell/z-a-bin-gem-node) annex provides functionality, which allows to:

1. Run programs and scripts without adding anything to `$PATH`,
2. Install and run Ruby [Gems](https://github.com/rubygems/rubygems), [Node](https://github.com/npm/cli), and
   [Python](https://python.org) modules from within a local directory with
   [$GEM_HOME](https://guides.rubygems.org/command-reference/#gem-environment),
   [$NODE_PATH](https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders), and
   [$VIRTUALENV](https://docs.python.org/3/tutorial/venv.html) automatically set,
3. Run programs, scripts, and functions with automatic `cd` into the plugin or snippet directory, plus also with
   automatic standard output & standard error redirecting.
4. Source scripts through an automatically created function with the above `$GEM_HOME`, `$NODE_PATH`, `$VIRTUALENV`, and
   `cd` features available,
5. Create the so-called `shims` known from [rbenv](https://github.com/rbenv/rbenv) – the same feature as the first item
   of this enumeration – of running a program without adding anything to `$PATH` with all of the above features, however
   through an automatic **script** created in `$ZPFX/bin`, not a **function** (the first item uses a function-based
   mechanism),
6. Automatic updates of Ruby gems and Node modules during regular plugin and snippet updates with `zi update …`.

## Install bin-gem-node

Simply load like a regular plugin, i.e.:

```shell
zi light z-shell/z-a-bin-gem-node
```

After executing this command you can then use the dl'' and patch'' ice-mods.

### How it works – bird's-eye view

The `sbin''` ice that creates forwarder-scripts instead of forwarder-functions (created by the `fbin''` ice and
elaborated in this `How it works …` section) turned out to be the proper, best method for exposing binary programs and
scripts. You can jump to the `sbin''` ice [section](#5-sbingncneopath-to-binary---name-of-the-script-) if you want.

This way there is no need to add anything to `$PATH` – `z-a-bin-gem-node` will automatically create a function that will
wrap the binary and provide it on the command line like if it was being placed in the `$PATH`.

Also, like mentioned in the enumeration, the function can automatically export `$GEM_HOME`, `$NODE_PATH`, `$VIRTUALENV`
shell variables and also automatically cd into the plugin or snippet directory right before executing the binary and
then cd back to the original directory after the execution is finished.

Also, like already mentioned, instead of the function an automatically created script – so called `shim` – can be used
for the same purpose and with the same functionality, so that the command is being accessible practically fully normally
– not only in the live Zsh session (only within which the functions created by `fbin''` exist), but also from any Zsh
script.

### How it works

Suppose that you would want to install `junegunn/fzf` plugin from GitHub Releases, which contains only single file – the
`fzf` binary for the selected architecture. It is possible to do it in the standard way – by adding the plugin's
directory to the `$PATH`:

```shell
zi ice as"command" from"gh-r"
zi load junegunn/fzf
```

After this command, the `$PATH` variable will contain e.g.:

```shell
% print $PATH
/home/sg/.zi/plugins/junegunn---fzf:/bin:/usr/bin:/usr/sbin:/sbin
```

For many such programs loaded as plugins the PATH can become quite cluttered. I've had 26 entries before switching to
`z-a-bin-gem-node`. To solve this, load with use of `sbin''` ice provided and handled by `z-a-bin-gem-node`:

```shell
zi ice from"gh-r" sbin"fzf"
zi load junegunn/fzf
```

The `$PATH` will remain unchanged and a `fzf` forwarder-script, so called _shim_ will be created in `$ZPFX/bin`
(`~/.zi/polaris/bin` by default), which is being already added to the `$PATH` by ZI when it is being sourced:

```shell
% cat $ZPFX/bin/fzf
#!/usr/bin/env zsh

function fzf {
    local bindir="/home/sg/.zi/plugins/junegunn---fzf"
    "$bindir"/"fzf" "$@"
}

fzf "$@"
```

Running the script will forward the call to the program accessed through an embedded path to it. Thus, no `$PATH`
changes are needed!

## The Ice Modifiers Provided By The Annex

There are 7 ice modifiers provided and handled by the annex:

<APITable>

| Ice modifier      | Description                                                                                              |
| :---------------- | :------------------------------------------------------------------------------------------------------- |
| [`sbin''`](#sbin) | Creates `shims` for binaries and scripts.                                                                |
| [`fbin''`](#fbin) | Creates functions for binaries and scripts.                                                              |
| [`gem''`](#gem)   | Installs and updates gems + creates functions for gems' binaries.                                        |
| [`node''`](#node) | Installs and updates node_modules + creates functions for binaries of the modules.                       |
| [`pip''`](#pip)   | Installs and updates python packages into a virtualenv + creates functions for binaries of the packages. |
| [`fmod''`](#fmod) | Creates wrapping functions for other functions.                                                          |
| [`fsrc''`](#fsrc) | Creates functions that source given scripts.                                                             |
| [`ferc''`](#ferc) | The same as [`fsrc''`](#fscr), but using an alternate script-loading method.                             |

</APITable>

### The Ice Modifiers by the Annex

#### `SBIN''`

`sbin'[{g|n|c|N|E|O}:]{path-to-binary}[ -> {name-of-the-script}]; …'`

It creates the so called `shim` known from `rbenv` – a wrapper script that forwards the call to the actual binary.

The script is created always under the same, standard and single `$PATH` entry: `$ZPFX/bin` (which is
`~/.zi/polaris/bin` by default).

The flags have the same meaning as with `fbin''` ice.

Example:

```shell
% zi delete junegunn/fzf
Delete /home/sg/.zi/plugins/junegunn---fzf?
[yY/n…]
y
Done (action executed, exit code: 0)
% zi ice from"gh-r" sbin"fzf"
% zi load junegunn/fzf
…installation messages…
% cat $ZPFX/bin/fzf
#!/usr/bin/env zsh

function fzf {
    local bindir="/home/sg/.zi/plugins/junegunn---fzf"
    "$bindir"/"fzf" "$@"
}

fzf "$@"
```

**The ice can be empty**. It will then try to create the shim for:

- trailing component of the `id_as` ice, e.g.: `id_as'exts/git-my'` → it'll check if a file `git-my` exists and if yes,
  create the shim `git-my`,
- the plugin name, e.g.: for `paulirish/git-open` it'll check if a file `git-open` exists and if yes, create the shim
  `git-open`,
- trailing component of the snippet URL,
- for any alphabetically first executable file.

#### `FBIN''`

`fbin'[{g|n|c|N|E|O}:]{path-to-binary}[ -> {name-of-the-function}]; …'`

Creates a wrapper function of the name the same as the last segment of the path or as `{name-of-the-function}`.

<APITable>

| Flag | Description                                                                                                           |
| :--- | :-------------------------------------------------------------------------------------------------------------------- |
| `g`  | Set `$GEM_HOME` variable to `{plugin-dir}`.                                                                           |
| `n`  | Set `$NODE_PATH` variable to `{plugin-dir}/node_modules`.                                                             |
| `p`  | Set `$VIRTUALENV` variable to `{plugin-dir}/venv`.                                                                    |
| `c`  | `cd` to the plugin's directory before running the program and then cd back after it has been run.                     |
| `N`  | Append `&>/dev/null` to the call of the binary, i.e. redirect both standard output and standard error to `/dev/null`. |
| `E`  | Append `2>/dev/null` to the call of the binary, i.e. redirect standard error to `/dev/null`.                          |
| `O`  | Append `>/dev/null` to the call of the binary, i.e. redirect standard output to `/dev/null`.                          |

</APITable>

Example:

```shell
% zi ice from"gh-r" fbin"g:fzf -> myfzf"
% zi load junegunn/fzf
% which myfzf
myfzf () {
        local bindir="/home/sg/.zi/plugins/junegunn---fzf"
        local -x GEM_HOME="/home/sg/.zi/plugins/junegunn---fzf"
        "$bindir"/"fzf" "$@"
}
```

The ice can be empty. It will then try to create the function for:

- trailing component of the `id_as` ice, e.g.: `id_as'exts/git-my'` → it'll check if a file `git-my` exists and if yes,
  create the function `git-my`,
- the plugin name, e.g.: for `paulirish/git-open` it'll check if a file `git-open` exists and if yes, create the
  function `git-open`,
- trailing component of the snippet URL,
- for any alphabetically first executable file.

#### `GEM''`

`gem'{gem-name}; …'`

**`gem'[{path-to-binary} <-] !{gem-name} [-> {name-of-the-function}]; …'`**

Installs the gem of name `{gem-name}` with `$GEM_HOME` set to the plugin's or snippet's directory. In other words, the
gem and its dependencies will be installed locally in that directory.

In the second form it also creates a wrapper function identical to the one created with `fbin''` ice.

Example:

```shell
% zi ice gem'!asciidoctor'
% zi load z-shell/null
% which asciidoctor
asciidoctor () {
        local bindir="/home/sg/.zi/plugins/z-shell---null/bin"
        local -x GEM_HOME="/home/sg/.zi/plugins/z-shell---null"
        "$bindir"/"asciidoctor" "$@"
}
```

#### `NODE''`

`node'{node-module}; …'`

**`node'[{path-to-binary} <-] !{node-module} [-> {name-of-the-function}]; …'`**

Installs the node module of name `{node-module}` inside the plugin's or snippet's directory.

In the second form it also creates a wrapper function identical to the one created with `fbin''` ice.

Example:

```shell
% zi delete z-shell/null
Delete /home/sg/.zi/plugins/z-shell---null?
[yY/n…]
y
Done (action executed, exit code: 0)
% zi ice node'remark <- !remark-cli -> remark; remark-man'
% zi load z-shell/null
…installation messages…
% which remark
remark () {
        local bindir="/home/sg/.zi/plugins/z-shell---null/node_modules/.bin"
        local -x NODE_PATH="/home/sg/.zi/plugins/z-shell---null"/node_modules
        "$bindir"/"remark" "$@"
}
```

In this case the name of the binary program provided by the node module is different from its name, hence the second
form with the `b <- a -> c` syntax has been used.

#### `PIP''`

`pip'{pip-package}; …'`

**`node'[{path-to-binary} <-] !{pip-package} [-> {name-of-the-function}]; …'`**

Installs the node module of name `{pip-package}` inside the plugin's or snippet's directory.

In the second form it also creates a wrapper function identical to the one created with `fbin''` ice.

Example:

```shell
% zi delete z-shell/null
Delete /home/sg/.zi/plugins/z-shell---null?
[yY/n…]
y
Done (action executed, exit code: 0)
% zi ice node'ansible <- !ansible -> ansible; ansible-lint'
% zi load z-shell/null
…installation messages…
% which remark
ansible () {
        local bindir="/home/sg/.zi/plugins/z-shell---null/venv/bin"
        local -x VIRTUALENV="/home/sg/.zi/plugins/z-shell---null"/venv
        "$bindir"/"ansible" "$@"
}
```

In this case the name of the binary program provided by the node module is different from its name, hence the second
form with the `b <- a -> c` syntax has been used.

#### `FMOD''`

`fmod'[{g|n|c|N|E|O}:]{function-name}; …'`

**`fmod'[{g|n|c|N|E|O}:]{function-name} -> {wrapping-function-name}; …'`**

It wraps given function with the ability to set `$GEM_HOME`, etc. – the meaning of the `g`,`n` and `c` flags is the same
as in the `fbin''` ice.

Example:

```shell
% myfun() { pwd; ls -1 }
% zi ice fmod'cgn:myfun'
% zi load z-shell/null
% which myfun
myfun () {
        local -x GEM_HOME="/home/sg/.zi/plugins/z-shell---null"
        local -x NODE_PATH="/home/sg/.zi/plugins/z-shell---null"/node_modules
        local oldpwd="/home/sg/.zi/plugins/zi---z-a-bin-gem-node"
        () {
                setopt localoptions noautopushd
                builtin cd -q "/home/sg/.zi/plugins/z-shell---null"
        }
        "myfun--za-bgn-orig" "$@"
        () {
                setopt localoptions noautopushd
                builtin cd -q "$oldpwd"
        }
}
% myfun
/home/sg/.zi/plugins/z-shell---null
LICENSE
README.md
```

#### `FSCR''`

`fsrc'[{g|n|c|N|E|O}:]{path-to-script}[ -> {name-of-the-function}]; …'`

#### `FERC''`

`ferc'[{g|n|c|N|E|O}:]{path-to-script}[ -> {name-of-the-function}]; …'`

Creates a wrapper function that at each invocation sources the given file. The second ice, `ferc''` works the same with
the single difference that it uses `eval "$(<{path-to-script})"` instead of `source "{path-to-script}"` to load the
script.

Example:

```shell
% zi ice fsrc"myscript -> myfunc" ferc"myscript"
% zi load z-shell/null
% which myfunc
myfunc () {
        local bindir="/home/sg/.zi/plugins/z-shell---null"
        () {
                source "$bindir"/"myscript"
        } "$@"
}
% which myscript
myscript () {
        local bindir="/home/sg/.zi/snippets/OMZ::plugins--git/git.plugin.zsh"
        () {
                eval "$(<"$bindir"/"myscript")"
        } "$@"
}
```

**The ices can be empty**. They will then try to create the function for trailing component of the `id-as` ice and the
other cases, in the same way as with the `fbin` ice.

## Additional ZI commands {#additional-zi-commands}

There's an additional ZI command that's provided by this annex –`shim-list`. It searches for and displays any shims that
are being currently stored under `$ZPFX/bin`. Example invocation:

![shim-list invocation](https://github.com/z-shell/z-a-bin-gem-node/raw/7f9ed8918d15bc0b2fad4329bc867b022856f4e5/docs/images/shim-list.png)

Available flags are:

```shell
zi shim-list [-h/--help] [-t|--this-dir] [-i|--from-ices] \
      [-o|--one-line] [-s|--short] [-c|--cat]
```

<APITable>

| Flag               | Description                                                                                       |
| :----------------- | :------------------------------------------------------------------------------------------------ |
| `-h` `--help`      | Shows a usage information.                                                                        |
| `-t` `--this-dir`  | Istructs ZI to look for shims in the current directory instead of `$ZPFX/bin`.                    |
| `-i` `--from-ices` | Normally the code looks for the shim files by examining their contents (**more info below [!]**). |
| `-o` `--one-line`  | Display the list of shim files without line breaks, in single line, after spaces.                 |
| `-s` `--short`     | Don't show the plugin/snippet that the shim belongs to.                                           |
| `-c` `--cat`       | Displays contents of each of the found shim (unimplemented yet).                                  |

</APITable>

> [!] shims created by BGN annex have a fixed structure, this option instructs ZI to show the list of shims that results
> from the `sbin''` ice of the loaded plugins. If a plugin has `sbin'git-open'`, for example, then this means that there
> has to be such shim already created.

## Cygwin Support

The `sbin''` ice has an explicit Cygwin support – it creates additional, **extra shim files** – Windows batch scripts
that allow to run the shielded applications from e.g.: Windows run dialog – if the `~/.zi/polaris/bin` directory is
being added to the Windows `PATH` environment variable, for example (it is a good idea to do so, IMHO). The Windows
shims have the same name as the standard ones (which are also being created, normally) plus the `.cmd` extension. You
can test the feature by e.g.: installing Firefox from the ZI package via:

```shell
zi pack=bgn for firefox
```
