---
id: bin-gem-node
title: "🌀 Bin Gem Node"
image: /img/png/theme/z/320x320.png
description: Annex - Bin Gem Node documentation.
keywords:
  - zannex,
  - bin-gem-node
  - z-a-bin-gem-node
---

<!-- @format -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@docusaurus/Link';
import Player from '@site/src/components/Player';
import APITable from '@site/src/components/APITable';
import Shortcuts from '@site/src/components/Markdown/\_player_shortcuts.mdx';

An annex provides the following functionality:

1. Run programs and scripts without adding anything to `$PATH`,
2. Install: [Ruby Gems][rubygems], [Node][node], and [Python][python] modules, with automatically set:
   - [$GEM_HOME][gem-home]
   - [$NODE_PATH][node-path]
   - [$VIRTUALENV][virtualenv]
3. Run programs, scripts, and functions with automatic `cd` into the plugin or snippet directory, plus also with automatic standard output & standard error redirecting.
4. Source scripts through an automatically created function with the above `$GEM_HOME`, `$NODE_PATH`, `$VIRTUALENV`, and `cd` features available,
5. Create the so-called `shims` known from [rbenv][rbenv/rbenv] – the same feature as the first item of this enumeration – of running a program without adding anything to `$PATH` with all of the above features, however through an automatic **script** created in `$ZPFX/bin`, not a **function** (the first item uses a function-based mechanism),
6. Automatic updates of Ruby gems and Node modules during regular plugin and snippet updates with `zi update …`.

The [sbin](#sbin) ice-modifier that creates forwarder-scripts instead of forwarder-functions created by the [fbin](#fbin) ice-modifier turned out to be the proper, best method for exposing binary programs and scripts. This way there is no need to add anything to `$PATH` – `z-a-bin-gem-node` will automatically create a function that will wrap the binary and provide it on the command line as if it was being placed in the `$PATH`.

As previously mentioned, the function can automatically export `$GEM_HOME`, `$NODE_PATH`, `$VIRTUALENV` shell variables and also automatically cd into the plugin or snippet directory right before executing the binary and then cd back to the original directory after the execution is finished. As previously mentioned, instead of the function an automatically created script – the so-called `shim` – can be used for the same purpose and with the same functionality, so that the command is accessible practically fully normally – not only in the live Zsh session, only within which the functions created by [fbin](#fbin) exist, but also from any Zsh script.

Suppose that we want to install the `junegunn/fzf` plugin from GitHub Releases, which contains only a single file – the `fzf` binary for the selected architecture. It is possible to do it in the standard way – by adding the plugin's directory to the `$PATH`.

```shell
zi ice as'program' from'gh-r'
zi load junegunn/fzf
```

After this command, the `$PATH` variable will contain e.g.:

```shell title="print $PATH" showLineNumbers
/home/sall/.zi/plugins/junegunn---fzf:/bin:/usr/bin:/usr/sbin:/sbin
```

For many such programs loaded as plugins, the PATH can become quite cluttered. I've had 26 entries before switching to `z-a-bin-gem-node`. To solve this, load with the use of [sbin](#sbin) ice-modifier provided and handled by `z-a-bin-gem-node`:

```shell showLineNumbers
zi ice as'program' from'gh-r' sbin'fzf'
zi load junegunn/fzf
```

The `$PATH` will remain unchanged and a forwarder-script of `fzf` shim will be created in `$ZPFX/bin` (`~/.zi/polaris/bin` by default), which is being already added to the `$PATH` by Zi when it is being sourced:

```shell title="cat $ZPFX/bin/fzf" showLineNumbers
#!/usr/bin/env zsh

function fzf {
  local bindir="/home/sall/.zi/plugins/junegunn---fzf"
  "$bindir"/"fzf" "$@"
}

fzf "$@"
```

Running the script will forward the call to the program accessed through an embedded path to it. Thus, no `$PATH` changes are needed.

```mdx-code-block
<APITable>
```

| Ice modifier  | 説明                                                                                                         |
|:------------- |:---------------------------------------------------------------------------------------------------------- |
| [sbin](#sbin) | Creates `shims` for binaries and scripts.                                                                  |
| [fbin](#fbin) | Creates functions for binaries and scripts.                                                                |
| [gem](#gem)   | Installs and updates gems + creates functions for gems binaries.                                           |
| [node](#node) | Installs and updates node_modules + creates functions for binaries of the modules.                         |
| [pip](#pip)   | Installs and updates python packages into a `virtualenv` + creates functions for binaries of the packages. |
| [fmod](#fmod) | Creates wrapping functions for other functions.                                                            |
| [fsrc](#fsrc) | Creates functions that source given scripts.                                                               |
| [ferc](#ferc) | The same as [fsrc](#fscr), but using an alternate script-loading method.                                   |

```mdx-code-block
</APITable>
```

Function wrappers for binaries, scripts, gems, node_modules, python packages, etc:

```mdx-code-block
<APITable>
```

| Flag | 説明                                                                                                                           |
|:---- |:---------------------------------------------------------------------------------------------------------------------------- |
| `g`  | Set `$GEM_HOME` variable to `{plugin-dir}`.                                                                                  |
| `n`  | Set `$NODE_PATH` variable to `{plugin-dir}/node_modules`.                                                                    |
| `p`  | Set `$VIRTUALENV` variable to `{plugin-dir}/venv`.                                                                           |
| `c`  | `cd` to the plugin's directory before running the program and then cd back after it has been run.                            |
| `N`  | Append `&>/dev/null` to the call of the binary, i.e. redirect both standard output and standard error to `/dev/null`. |
| `E`  | Append `2>/dev/null` to the call of the binary, i.e. redirect standard error to `/dev/null`.                              |
| `O`  | Append `>/dev/null` to the call of the binary, i.e. redirect standard output to `/dev/null`.                              |

```mdx-code-block
</APITable>
```

View all currently registered:

- ice-modifiers: `zi icemods`
- subcommand: `zi subcmds`

## `SBIN'…'` {#sbin}

`sbin'[{g|n|c|N|E|O}:]{path-to-binary}[ -> {name-of-the-script}]; …'`

Creates the so-called `shim` known from `rbenv` – a wrapper script that forwards the call to the actual binary. The script is created always under the same, standard, and single `$PATH` entry: `$ZPFX/bin` (which is `~/.zi/polaris/bin` by default). The flags have the same meaning as with `fbin'…'` ice.

<Tabs className="player-tabs">
  <TabItem value="sbin-player" label="Player" default>
    <Player
      src='https://asciinema.org/a/513810.cast'
      rows={26}
      cols={184}
    />
  </TabItem>
  <TabItem value="shortcuts" label="Shortcuts">
    <Shortcuts />
  </TabItem>
</Tabs>

```shell showLineNumbers
zi ice as'program' from'gh-r' sbin'fzf'
zi load junegunn/fzf
```

```shell title="cat $ZPFX/bin/fzf" showLineNumbers
#!/usr/bin/env zsh

function fzf {
  local bindir="/home/sall/.zi/plugins/junegunn---fzf"
  local -xU PATH="$bindir":"$PATH"
  "$bindir"/"fzf" "$@"
}

fzf "$@"
```

:::note

- as'program' (an alias: as'command') - used for the plugin to be added to $PATH when a plugin is not a file for sourcing.

The [sbin](#sbin) ice-modifier can be empty, it will then try to create the shim for the trailing component of the [id-as][] ice, e.g.:

- `id_as'exts/git-my'` → it'll check if a file `git-my` exists and if yes, will create the function `git-my`.
- `paulirish/git-open` → it'll check if a file `git-open` exists and if yes, will create the function `git-open`.

The same trailing component would be set for the snippet URL, for any alphabetically first and executable file.

:::

## `FBIN'…'` {#fbin}

`fbin'[{g|n|c|N|E|O}:]{path-to-binary}[ -> {name-of-the-function}]; …'`

Creates a wrapper function of the name the same as the last segment of the path or as `{name-of-the-function}`.

<Tabs className="player-tabs">
  <TabItem value="fbin-player" label="Player" default>
    <Player
      src='https://asciinema.org/a/513297.cast'
      rows={18}
      cols={166}
    />
  </TabItem>
  <TabItem value="shortcuts" label="Shortcuts">
    <Shortcuts />
  </TabItem>
</Tabs>

```shell showLineNumbers
zi ice from"gh-r" fbin"g:fzf -> myfzf" nocompile
zi load junegunn/fzf
```

```shell title="which myfzf" showLineNumbers
myfzf () {
  local bindir="/home/sall/.zi/plugins/junegunn---fzf"
  local -x GEM_HOME="/home/sall/.zi/plugins/junegunn---fzf"
  local -xU PATH="/home/sall/.zi/plugins/junegunn---fzf"/bin:"$bindir":"$PATH"
  "$bindir"/"fzf" "$@"
}
```

:::note

- `nocompile` ice-modifier is used to skip file compilation when it is not required.

:::

## `GEM'…'` {#gem}

`gem'{gem-name}; …'`

`gem'[{path-to-binary} <-] !{gem-name} [-> {name-of-the-function}]; …'`

Installs the gem of name `{gem-name}` with `$GEM_HOME` set to the plugin's or snippet's directory. In other words, the gem and its dependencies will be installed locally in that directory. In the second form, it also creates a wrapper function identical to the one created with `fbin'…'` ice.

<Tabs className="player-tabs">
  <TabItem value="gem-player" label="Player" default>
    <Player
      src='https://asciinema.org/a/513303.cast'
      rows={23}
      cols={140}
    />
  </TabItem>
  <TabItem value="shortcuts" label="Shortcuts">
    <Shortcuts />
  </TabItem>
</Tabs>

```shell showLineNumbers
zi ice gem'!asciidoctor' id-as'asciidoctor' nocompile
zi load z-shell/0
```

```shell title="which asciidoctor" showLineNumbers
asciidoctor () {
  local bindir="/home/sall/.zi/plugins/asciidoctor/bin"
  local -x GEM_HOME="/home/sall/.zi/plugins/asciidoctor"
  local -xU PATH="/home/sall/.zi/plugins/asciidoctor"/bin:"$bindir":"$PATH"
  "$bindir"/"asciidoctor" "$@"
}
```

:::note

- `z-shell/0` - an empty repository to aid Zi's hooks, in this case, used to store the `asciidoctor` gem.
- `id-as'asciidoctor'` - used to assign a name instead of the `z-shell/0`.
- `nocompile` - used to skip file compilation when it is not required.

:::

## `NODE'…'` {#node}

`node'{node-module}; …'`

`node'[{path-to-binary} <-] !{node-module} [-> {name-of-the-function}]; …'`

Installs the node module of name `{node-module}` inside the plugin's or snippet's directory. In the second form, it also creates a wrapper function identical to the one created with `fbin'…'` ice.

<Tabs className="player-tabs">
  <TabItem value="node-player" label="Player" default>
    <Player
      src='https://asciinema.org/a/513774.cast'
      rows={18}
      cols={140}
    />
  </TabItem>
  <TabItem value="shortcuts" label="Shortcuts">
    <Shortcuts />
  </TabItem>
</Tabs>

```shell showLineNumbers
zi ice node'remark <- !remark-cli -> remark; remark-man' id-as'remark' nocompile
zi load z-shell/0
```

```shell title="which remark" showLineNumbers
remark () {
  local bindir="/home/sall/.zi/plugins/remark/node_modules/.bin"
  local -x NODE_PATH="/home/sall/.zi/plugins/remark"/node_modules
  local -xU PATH="/home/sall/.zi/plugins/remark"/node_modules/.bin:"$bindir":"$PATH"
  "$bindir"/"remark" "$@"
}
```

In this case, the name of the binary program provided by the node module is different from its name, hence the second form with the `b <- a -> c` syntax has been used.

:::note

- `z-shell/0` - an empty repository to aid Zi's hooks, in this case, used to store the `remark` Node module.
- `id-as'remark'` - used to assign a name instead of the `z-shell/0`.
- `nocompile` - used to skip file compilation when it is not required.

:::

## `PIP'…'` {#pip}

`pip'{pip-package}; …'`

`pip'[{path-to-binary} <-] !{pip-package} [-> {name-of-the-function}]; …'`

Installs the node module of name `{pip-package}` inside the plugin's or snippet's directory. In the second form, it also creates a wrapper function identical to the one created with `fbin'…'` ice.

<Tabs className="player-tabs">
  <TabItem value="pip-player" label="Player" default>
    <Player
      src='https://asciinema.org/a/513793.cast'
      rows={26}
      cols={156}
    />
  </TabItem>
  <TabItem value="shortcuts" label="Shortcuts">
    <Shortcuts />
  </TabItem>
</Tabs>

```shell showLineNumbers
zi ice pip'youtube-dl <- !youtube-dl -> youtube-dl' id-as'youtube-dl' nocompile
zi load z-shell/0
```

```shell title="which youtube-dl" showLineNumbers
youtube-dl () {
  local bindir="/home/sall/.zi/plugins/youtube-dl/venv/bin"
  local -x VIRTUALENV="/home/sall/.zi/plugins/youtube-dl"/venv
  local -xU PATH="/home/sall/.zi/plugins/youtube-dl"/venv/bin:"$bindir":"$PATH"
  "$bindir"/"youtube-dl" "$@"
}
```

:::note

- `z-shell/0` - an empty repository to aid Zi's hooks, in this case, used to store the `youtube-dl` pip package.
- `id-as'youtube-dl'` - used to assign a name instead of the `z-shell/0`.
- `nocompile` - used to skip file compilation when it is not required.

:::

## `FMOD'…'` {#fmod}

`fmod'[{g|n|c|N|E|O}:]{function-name}; …'`

`fmod'[{g|n|c|N|E|O}:]{function-name} -> {wrapping-function-name}; …'`

It wraps the given function with the ability to set `$GEM_HOME`, etc. – the meaning of the `g`, `n`, and `c` flags is the same as in the `fbin'…'` ice.

Example:

<Tabs className="player-tabs">
  <TabItem value="fmod-player" label="Player" default>
    <Player
      src='https://asciinema.org/a/513805.cast'
      rows={26}
      cols={140}
    />
  </TabItem>
  <TabItem value="shortcuts" label="Shortcuts">
    <Shortcuts />
  </TabItem>
</Tabs>

```shell showLineNumbers
myfunc() { pwd; ls -1 }; zi ice fmod'cgn:myfunc' id-as'myfunc' nocompile
zi load z-shell/0
```

```shell title="which myfunc" showLineNumbers
myfunc () {
  local -x GEM_HOME="/home/sall/.zi/plugins/myfunc"
  local -x NODE_PATH="/home/sall/.zi/plugins/myfunc"/node_modules
  local oldpwd="/home/sall"
  () {
    setopt local_options no_auto_pushd
    builtin cd -q "/home/sall/.zi/plugins/myfunc"
  }
  "myfunc--za-bgn-orig" "$@"
  () {
    builtin setopt local_options no_auto_pushd
    builtin cd -q "$oldpwd"
  }
}
```

```shell title="myfun" showLineNumbers
/home/sall/.zi/plugins/z-shell---0
docs/
LICENSE
README.md
```

:::note

- `z-shell/0` - an empty repository to aid Zi's hooks, in this case, used to store the `myfunc` function files.
- `id-as'myfunc'` - used to assign a name instead of the `z-shell/0`.
- `nocompile` - used to skip file compilation when it is not required.

:::

## `FSCR'…'` {#fscr}

`fsrc'[{g|n|c|N|E|O}:]{path-to-script}[ -> {name-of-the-function}]; …'`

## `FERC'…'` {#ferc}

`ferc'[{g|n|c|N|E|O}:]{path-to-script}[ -> {name-of-the-function}]; …'`

Creates a wrapper function that at each invocation sources the given file. The second ice, `FERC'…'` works the same with the single difference that it uses `eval "$(<{path-to-script})"` instead of `source "{path-to-script}"` to load the script.

<Tabs className="player-tabs">
  <TabItem value="fscr-ferc-player" label="Player" default>
    <Player
      src='https://asciinema.org/a/513308.cast'
      rows={26}
      cols={140}
    />
  </TabItem>
  <TabItem value="shortcuts" label="Shortcuts">
    <Shortcuts />
  </TabItem>
</Tabs>

```shell showLineNumbers
zi ice fsrc"myscript -> myfunc" ferc"myscript" nocompile
zi load z-shell/0
```

```shell title="which myfunc" showLineNumbers
myfunc () {
  local bindir="/home/sall/.zi/plugins/z-shell---0"
  local -xU PATH="$bindir":"$PATH"
  () {
    source "$bindir"/"myscript"
  } "$@"
}
```

```shell title="which myscript" showLineNumbers
myscript () {
  local bindir="/home/sall/.zi/plugins/z-shell---0"
  local -xU PATH="$bindir":"$PATH"
  () {
    eval "$(<"$bindir"/"myscript")"
  } "$@"
}
```

:::note

- `nocompile` ice-modifier is used to skip file compilation when it is not required.

The ices can be empty as the trailing component will be assigned with [id-as][] ice-modifier the same way as described in the [sbin](#sbin).

:::

## `shim-list` {#shim-list}

An annex provides a subcommand – `shim-list` for shims currently stored in `$ZPFX/bin` management:

Available flags are:

```shell
zi shim-list [ -t | -i | -o | -s | -h ]
```

| Flag               | 説明                                                                                       |
|:------------------ |:---------------------------------------------------------------------------------------- |
| `-t` `--this-dir`  | Instructs Zi to look for shims in the current directory instead of `$ZPFX/bin`.          |
| `-i` `--from-ices` | Normally the code looks for the shim files by examining their contents (more info [^1]). |
| `-o` `--one-line`  | Display the list of shim files without line breaks, in a single line, after spaces.      |
| `-s` `--short`     | Don't show the plugin/snippet that the shim belongs to.                                  |
| `-h` `--help`      | Shows usage information.                                                                 |

## Cygwin support {#cygwin-support}

The [sbin](#sbin) ice-modifier has an explicit Cygwin support – it creates additional, **extra shim files** – Windows batch scripts that allow running the shielded applications from e.g.: Windows run dialog – if the `~/.zi/polaris/bin` directory is being added to the Windows `PATH` environment variable, for example (it is a good idea to do so, IMHO). The Windows shims have the same name as the standard ones (which are also being created, normally) plus the `.cmd` extension. You can test the feature by e.g.: installing Firefox from the Zi package via:

```shell
zi pack=bgn for firefox
```

## Install bin-gem-node

:::info Source

- <Link className="github-link" href="https://github.com/z-shell/z-a-bin-gem-node">z-shell/z-a-bin-gem-node</Link>

:::

<Tabs>
  <TabItem value="default" label="Default" default>

Add the following snippet in the `.zshrc` file:

```shell
zi light z-shell/z-a-bin-gem-node
```

  </TabItem>
  <TabItem value="unscope-annex" label="Unscoped">

Add the following snippet in the `.zshrc` file to install using the [unscope][] annex:

```shell
zi light z-shell/z-a-unscope bgn
```

</TabItem>
</Tabs>

This will register the [shim-list](#shim-list) subcommand and following ice-modifiers:

<!-- end-of-file -->
<!--footnotes-->



<!-- links -->



<!-- external -->

[^1]: shims created by the `bin-gem-node` annex have a fixed structure, this option instructs Zi to show the list of shims that results from the [sbin](#sbin) ice-modifier of the loaded plugins. If a plugin for example has `sbin'git-open'`, means that such shim has already been created.

[id-as]: /docs/guides/syntax/ice#id-as

[gem-home]: https://guides.rubygems.org/command-reference/#gem-environment
[node-path]: https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders
[node]: https://github.com/npm/cli
[python]: https://python.org
[rbenv/rbenv]: https://github.com/rbenv/rbenv
[rubygems]: https://github.com/rubygems/rubygems
[virtualenv]: https://docs.python.org/3/tutorial/venv.html
