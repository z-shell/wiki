---
id: patch-dl
title: "🌀 Patch DL"
image: img/logo/320x320.png
description: Annex - Patch DL documentation
keywords:
  - annex,
  - patch-dl
---

<!-- @format -->

## <i class="fa-brands fa-github"></i> [z-shell/z-a-patch-dl][]

An annex downloads files and applies patches and adds two ice modifiers:

First:

```shell
zi ice dl'{URL} [-> {optional-output-file-name}]; …' …
```

Second:

```shell
zi ice patch'{file-name-with-the-patch-to-apply}; …' …
```

The annex (i.e. Zi extension) will download the given `{URL}` under the path `{optional-output-file-name}` (if no file name given, then it is taken from last segment of the URL) in case of the `dl'…'` ice-modifier, and apply a patch given by the `{file-name-with-the-patch-to-apply}` in case of the `patch'…'` ice-modfier.

You can use this functionality to download and apply patches. For example, to install `fbterm`, two patches are being needed, one to fix the operation, the other one to fix the build:

```shell showLineNumbers
zi ice as"command" pick"$ZPFX/bin/fbterm" \
  dl"https://bugs.archlinux.org/task/46860?getfile=13513 -> ins.patch" \
  dl"https://aur.archlinux.org/cgit/aur.git/plain/0001-Fix-build-with-gcc-6.patch?h=fbterm-git" \
    patch"ins.patch; 0001-Fix-build-with-gcc-6.patch" \
      atclone"./configure --prefix=$ZPFX" \
      atpull"%atclone" make"install" reset
zi load izmntuk/fbterm
```

This command will result in:

![fbterm example](https://raw.githubusercontent.com/z-shell/z-a-patch-dl/main/docs/images/fbterm-ex.png#center)

## Install Patch DL

Simply load like a plugin, i.e.:

```shell
zi light z-shell/z-a-patch-dl
```

After executing this command you can then use the `dl'…'` and `patch'…'` ice-mods.

[z-shell/z-a-patch-dl]: https://github.com/z-shell/z-a-patch-dl
