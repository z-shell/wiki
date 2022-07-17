---
id: test
title: 🌀 Test
image: img/logo/320x320.png
description: Annex - Test documentation
keywords:
  - annex
  - test
  - zsh
---

## <i class="fa-brands fa-github"></i> [z-shell/z-a-test][]

An annex runs tests (for example `make test``) – if found will autorun it after installing and updating a plugin or snippet.

Simply load it like any other plugin to make it active:

```shell
zi light z-shell/z-a-test
```

## Configuration

To run the tests in a verbose mode, issue:

```shell
zstyle :zi:annex:test quiet 0
```

before installing or updating the plugin. To skip tests for a single plugin, add `notest` ice:

```shell showLineNumbers
zi ice notest
zi load …
```

### Annex showcase

Example activation in the default quiet mode:

![z-p-test-1][]

Example activation in non-quiet mode:

![z-p-test-2][]

![z-a-test][]

[z-p-test-1]: https://raw.githubusercontent.com/z-shell/z-a-test/main/docs/images/z-p-test-1.png#center
[z-p-test-2]: https://raw.githubusercontent.com/z-shell/z-a-test/main/docs/images/z-p-test-2.png#center
[z-a-test]: https://user-images.githubusercontent.com/59910950/162143845-c44ead50-b21a-46c0-8372-18325eb1f33a.gif#center
[z-shell/z-a-test]: https://github.com/z-shell/z-a-test
