---
id: test
title: 💠 Test
image: img/logo/320x320.png
description: Annex - Test documentation
keywords:
  - annex
  - test
  - zsh
---

<div align="center">

![https://user-images.githubusercontent.com/59910950/162143845-c44ead50-b21a-46c0-8372-18325eb1f33a.gif](https://user-images.githubusercontent.com/59910950/162143845-c44ead50-b21a-46c0-8372-18325eb1f33a.gif)

</div>

- [z-shell/z-a-test](https://github.com/z-shell/z-a-test) annex runs tests (via `make test`, for example) – if it finds
  any of them – after installing and updating a plugin or snippet. Simply load it like any other plugin to make it
  active:

```shell
zi light z-shell/z-a-test
```

## Configuration

To run the tests in a verbose mode, issue:

```shell
zstyle :zi:annex:test quiet 0
```

before installing or updating the plugin. To skip tests for a single plugin, add `notest` ice:

```shell
zi ice notest
zi load …
```

### Examples

Example activation in the default quiet mode:

![z-a-test activation](https://raw.githubusercontent.com/z-shell/z-a-test/main/docs/images/z-p-test-1.png)

Example activation in non-quiet mode:

![z-a-test activation](https://raw.githubusercontent.com/z-shell/z-a-test/main/docs/images/z-p-test-2.png)
