---
id: linkbin
title: 🌀 Link Bin
image: img/logo/320x320.png
description: Annex - Link Bin documentation.
keywords:
  - symlink-binary
  - linkbin
  - annex
  - zsh
---

## <i class="fa-brands fa-github"></i> [z-shell/z-a-linkbin][]

An annex expose a binary program without modifying `$PATH` – `z-a-linkbin` and automatically create a hard or soft link to the binary at `$ZPFX/bin` exposing the program to the command line as if it were being placed in `$PATH`.

The command can then be accessed normally – not only in the live Zsh session, but also from any Zsh script.

The ice-modifier `lbin''` provided by the annex creates `links` for binaries and scripts.

It creates the `link` that calls the actual binary. The link is created always under the same, standard and single `$PATH` entry: `$ZPFX/bin`

> The optional preceding `!` flag means create a soft link instead of a hard link.

Example:

```shell
zi ice from'gh-r' as'program' lbin'!fzf'
zi load junegunn/fzf
```

Check the output:

```shell
ls -l $ZPFX/bin/ | awk '{print $(NF-2),$(NF-1),$NF}'
fzf --version
```

**The ice can contain globs**. It will expand these when searching for the binary.

Example:

```shell
zi ice from'gh-r' as'program' lbin'**fzf -> myfzf'
zi load junegunn/fzf
```

Check the output:

```shell
ls $ZPFX/bin
myfzf --version
```

**The ice can be empty**. It will then try to create the link:

- trailing component of the `id_as` ice, e.g.: `id_as'exts/git-my'` → it will check if a file `git-my` exists and if yes, create the link `git-my`,
- the plugin name, e.g.: for `paulirish/git-open` it'll check if a file `git-open` exists and if yes, create the link `git-open`,
- trailing component of the snippet URL,
- for any alphabetically first executable file.

Above also applies if just `!` were passed.

[z-shell/z-a-linkbin]: https://github.com/z-shell/z-a-linkbin
