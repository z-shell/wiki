---
id: rust
title: "🌀 Rust"
image: /img/png/theme/z/320x320.png
description: An annex installs rust and cargo packages.
keywords:
  - annex
  - rust
---

<!-- @format -->

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import Link from '@docusaurus/Link'; import Player from '@site/src/components/Player'; import Shortcuts from '@site/src/components/Markdown/\_player_shortcuts.mdx';

An annex installs rust and cargo packages locally inside the plugin or snippet directories.

<Tabs className="player-tabs">
  <TabItem value="sbin-player" label="Player" default>
    <Player
      src='https://asciinema.org/a/555417.cast'
      rows={27}
      cols={130}
      terminalFontFamily="var(--ifm-font-family-monospace)"
      terminalFontSize="var(--ifm-code-font-size)"
      fit={false}
      speed={3}
    />
  </TabItem>
  <TabItem value="shortcuts" label="Shortcuts">
    <Shortcuts />
  </TabItem>
</Tabs>

## Usage of the annex

The Zi annex provides ice-modifiers `rustup` and `cargo'…'`.

The first one installs rust inside the plugin's folder using the official `rustup` installer and the second one has the following syntax:

```shell
cargo'[{name-of-the-binary-or-path} <-] [[!][c|n|e|o]:]{crate-name} [-> {shim-script-name}]'`
```

| Flag | 説明                                                                                               |
| ---- | ------------------------------------------------------------------------------------------------ |
| `N`  | redirect both standard output and error to `/dev/null`                                           |
| `E`  | redirect standard error to `/dev/null`                                                           |
| `O`  | redirect standard output to `/dev/null`                                                          |
| `c`  | change the current directory to the plugin's or snippet's directory before executing the command |

As the examples showed, the name of the binary to run and the shim name are by default equal to the name of the crate. Specifying `{binary-name} <- …` and/or `… -> {shim-name}` allows to override them.

The crate can create so-called _shims_ – scripts that are exposed to the standard `$PATH`. The shim script is a wrapper around the binary that is installed by the crate. The shim script is created in the plugin's or snippet's directory and is named after the crate. The shim script is a shell script that sets up the environment variables and then runs the binary.

Example of the _shim_ script:

```shell showLineNumbers
#!/usr/bin/env zsh

function lsd {
  local bindir="/root/.zi/plugins/z-shell---null/bin"
  local -x PATH="/root/.zi/plugins/z-shell---null"/bin:"$PATH" # -x means export
  local -x RUSTUP_HOME="/root/.zi/plugins/z-shell---null"/rustup CARGO_HOME="/root/.zi/plugins/z-shell---null"

  "$bindir"/"lsd" "$@"
}

lsd "$@"
```

As it can be seen shim ultimately provides the binary to the command line.

<details>
  <summary>Use case examples</summary>

Set up rust and the `lsd` crate with a shim `lsd` exposing the binary:

```shell showLineNumbers
zi ice rustup cargo'!lsd'
zi load z-shell/0
```

Set up rust and the `exa` crate with a shim `ls` exposing the `exa` binary:

```shell showLineNumbers
zi ice rustup cargo'!exa -> ls'
zi load z-shell/0
```

Set up rust and the `exa` and `lsd` crates:

```shell showLineNumbers
zi ice rustup cargo'exa;lsd'
zi load z-shell/0
```

Set up rust, then the `exa` and `lsd` crates, with their binaries exposed by altering `$PATH`:

```shell showLineNumbers
zi ice rustup cargo'exa;lsd' as"command" pick"bin/(exa|lsd)"
zi load z-shell/0
```

Set up rust and then the `exa` crate with shim standard error redirected to `/dev/null`:

```shell showLineNumbers
zi ice rustup cargo'!E:exa'
zi load z-shell/0
```

Just install rust and make it available globally in the system:

```shell showLineNumbers
zi ice id-as"rust" wait"0" lucid rustup as"command" pick"bin/rustc" atload="export \
  CARGO_HOME=\$PWD RUSTUP_HOME=\$PWD/rustup"
zi load z-shell/0
```

A little more complex rustup configuration that uses [bin-gem-node][annex-bin-gem-node] annex and installs the cargo completion provided with rustup, using the [for][for-syntax] syntax:

```shell showLineNumbers
zi id-as=rust wait=1 as=null sbin="bin/*" lucid rustup \
  atload="[[ ! -f ${ZI[COMPLETIONS_DIR]}/_cargo ]] && zi creinstall rust; \
  export CARGO_HOME=\$PWD RUSTUP_HOME=\$PWD/rustup" for \
z-shell/0
```

</details>

## Install rust {#install-rust}

:::info Source

- <Link className="github-link" href="https://github.com/z-shell/z-a-rust">z-shell/z-a-rust</Link>

:::

<Tabs>
  <TabItem value="default" label="Default" default>

Add the following snippet in the `.zshrc` file:

```shell
zi light z-shell/z-a-rust
```

</TabItem>
</Tabs>

This will register the `rustup` and `cargo'…'` ice-modifiers.

<!-- end-of-file -->
<!-- links -->

[annex-bin-gem-node]: /ecosystem/annexes/bin-gem-node
[for-syntax]: /docs/guides/syntax/for
