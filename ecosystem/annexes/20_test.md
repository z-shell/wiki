---
id: test
title: "🌀 Test"
hide_title: false
hide_table_of_contents: false
image: /img/logo/320x320.png
description: Annex - Test documentation
keywords:
  - annex
  - zannex
  - test
draft: true
---

<!-- @format -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@docusaurus/Link';
import ImgShow from '@site/src/components/ImgShow';

An annex runs `zunit` and `make` tests if they are configured in the repository.

<ImgShow
  width={1000}
  height={900}
  img="https://user-images.githubusercontent.com/59910950/162143845-c44ead50-b21a-46c0-8372-18325eb1f33a.gif"
  alt="Annex - z-a-test preview"
/>

Simply load it like any other plugin to make it active:

```shell
zi light z-shell/z-a-test
```

## Configuration

To run the tests in a verbose mode, issue:

```shell
zstyle :zi:annex:test quiet 0
```

To skip tests for a single plugin before installing or updating add the `notest` ice-modifier:

```shell showLineNumbers
zi ice notest
zi load …
```
