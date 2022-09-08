---
id: rust
title: "🌀 Rust"
image: /img/logo/320x320.png
description: Annex - Rust documentation.
keywords:
  - annex
  - zannex
  - rust
---

<!-- @format -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@docusaurus/Link';

An annex installs rust and cargo packages locally inside the plugin or snippet directories. The crate can create so-called _shims_ – scripts that are exposed to the standard `$PATH`.

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

## Usage of the annex

The Zi annex provides ice-modifiers `rustup` and `cargo'…'`.

The first one installs rust inside the plugin's folder using the official `rustup` installer and the second one has the following syntax:

`cargo'[{name-of-the-binary-or-path} <-] [[!][c|n|e|o]:]{crate-name} [-> {shim-script-name}]'`

### Use case examples

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

A little more complex rustup configuration that uses [bin-gem-node][bin-gem-node] annex and installs the cargo completion provided with rustup, using the [for][for] syntax:

```shell showLineNumbers
zi id-as=rust wait=1 as=null sbin="bin/*" lucid rustup \
  atload="[[ ! -f ${ZI[COMPLETIONS_DIR]}/_cargo ]] && zi creinstall rust; \
  export CARGO_HOME=\$PWD RUSTUP_HOME=\$PWD/rustup" for \
z-shell/0
```

Flags:

- `N` – redirect both standard output and error to `/dev/null`
- `E` – redirect standard error to `/dev/null`
- `O` – redirect standard output to `/dev/null`
- `c` – change the current directory to the plugin's or snippet's directory before executing the command

As the examples showed, the name of the binary to run and the shim name are by default equal to the name of the crate. Specifying `{binary-name} <- …` and/or `… -> {shim-name}` allows to override them.

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

[bin-gem-node]: /ecosystem/annexes/bin-gem-node
[for]: /docs/guides/syntax/for
