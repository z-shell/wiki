---
id: test
title: 💠 Test
image: zw/logo/320x320.png
description: Annex - Test documentation
keywords: [annex, test, zsh]
---

- [z-shell/z-a-test](https://github.com/z-shell/z-a-test) annex runs tests (via `make test`, for example) – if it finds
  any of them – after installing and updating a plugin or snippet. Simply load it like any other plugin to make it
  active:

```shell
zi light z-shell/z-a-test
```

## Configuration {#configuration}

To run the tests in a verbose mode, issue:

```shell
zstyle :zi:annex:test quiet 0
```

before installing or updating the plugin. To skip tests for a single plugin, add `notest` ice:

```shell
zi ice notest
zi load …
```

### Examples {#examples}

Example activation in the default quiet mode:

![z-a-test activation](https://raw.githubusercontent.com/z-shell/z-a-test/main/images/z-p-test-1.png)

Example activation in non-quiet mode:

![z-a-test activation](https://raw.githubusercontent.com/z-shell/z-a-test/main/images/z-p-test-2.png)
