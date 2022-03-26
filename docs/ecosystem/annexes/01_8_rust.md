---
id: rust
title: 💠 Rust
image: zw/logo/320x320.png
description: Annex - Rust documentation
keywords: [annex, rust, zsh, z-shell, zi]
---

- [z-shell/z-a-rust](https://github.com/z-shell/z-a-rust) annex installs rust and cargo packages locally inside the
  plugin or snippet directories.

The crate can then have a so called _shim_ created (name borrowed from `rbenv`) – a script that's located in the
standard `$PATH` entry "`$ZPFX/bin`" of following contents (example):

```shell
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

The ZI Annex provides two new ices: `rustup` and `cargo''`. The first one installs rust inside the plugin's folder using
the official `rustup` installer. The second one has the following syntax:

`cargo"[name-of-the-binary-or-path <-] [[!][c|N|E|O]:]{crate-name} [-> {shim-script-name}]'`

Example uses are:

```shell
# Installs rust and then the `lsd' crate and creates
# the `lsd' shim exposing the binary
zi ice rustup cargo'!lsd'
zi load z-shell/null

# Installs rust and then the `exa' crate and creates
# the `ls' shim exposing the `exa' binary
zi ice rustup cargo'!exa -> ls'
zi load z-shell/null

# Installs rust and then the `exa' and `lsd' crates
zi ice rustup cargo'exa;lsd'
zi load z-shell/null

# Installs rust and then the `exa' and `lsd' crates
# and exposes their binaries by altering $PATH
zi ice rustup cargo'exa;lsd' as"command" pick"bin/(exa|lsd)"
zi load z-shell/null

# Installs rust and then the `exa' crate and creates
# its shim with standard error redirected to /dev/null
zi ice rustup cargo'!E:exa'
zi load z-shell/null

# Just install rust and make it available globally in the system
zi ice id-as"rust" wait"0" lucid rustup as"command" pick"bin/rustc" atload="export \
CARGO_HOME=\$PWD RUSTUP_HOME=\$PWD/rustup"
zi load z-shell/null

# A little more complex rustup configuration that uses Bin-Gem-Node annex
# and installs the cargo completion provided with rustup, using for-syntax
zi id-as=rust wait=1 as=null sbin="bin/*" lucid rustup \
  atload="[[ ! -f ${ZI[COMPLETIONS_DIR]}/_cargo ]] && zi creinstall rust; \
  export CARGO_HOME=\$PWD RUSTUP_HOME=\$PWD/rustup" for \
z-shell/null
```

Flags meanings:

- `N` – redirect both standard output and error to `/dev/null`
- `E` – redirect standard error to `/dev/null`
- `O` – redirect standard output to `/dev/null`
- `c` – change the current directory to the plugin's or snippet's directory before executing the command

As the examples showed, the name of the binary to run and the shim name are by default equal to the name of the crate.
Specifying `{binary-name} <- …` and/or `… -> {shim-name}` allows to override them.

## Install rust annex {#install-rust-annex}

Simply load like a regular plugin, i.e.:

```shell
zi light z-shell/z-a-rust
```

This installs the annex and makes the `rustup` and `cargo''` ices available.

## Rust tools meta plugin {#rust-tools-meta-plugin}

To install [Rust utilities](meta-plugins#@rust-utils), simply run `zi light @rust-utils`, it will install and setup as
following:

```shell
bin-gem-node annex: Created the cargo shim and set +x on the cargo binary
bin-gem-node annex: Created the cargo-clippy shim and set +x on the cargo-clippy binary
bin-gem-node annex: Created the cargo-fmt shim and set +x on the cargo-fmt binary
bin-gem-node annex: Created the cargo-miri shim and set +x on the cargo-miri binary
bin-gem-node annex: Created the clippy-driver shim and set +x on the clippy-driver binary
bin-gem-node annex: Created the rls shim and set +x on the rls binary
bin-gem-node annex: Created the rustc shim and set +x on the rustc binary
bin-gem-node annex: Created the rustdoc shim and set +x on the rustdoc binary
bin-gem-node annex: Created the rustfmt shim and set +x on the rustfmt binary
bin-gem-node annex: Created the rust-gdb shim and set +x on the rust-gdb binary
bin-gem-node annex: Created the rust-lldb shim and set +x on the rust-lldb binary
bin-gem-node annex: Created the rustup shim and set +x on the rustup binary
```
