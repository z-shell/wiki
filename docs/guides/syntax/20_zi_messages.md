---
id: zi-messages
title: "🔀 Zi messages"
image: /img/logo/320x320.png
description: Use `+zi-message` for rich text output
keywords:
  - syntax
  - how-to-use
  - zi-message
  - zi-messages
  - rich-text
---

<!-- @format -->

import Image from '@theme/IdealImage';

You can use `+zi-message` for printing rich text message. `+zi-message` support output like url,
color, blink, underline, italic, etc...

## `+zi-message` syntax

`+zi-message` is a more featured `print`. For coloring a part of the output in red because it's an error, you need to add
`{error}` before the text and if you want to change the color add `{rst}` (reset).

## Modifiers list

| Modifier  | Output                                                                  |
| --------- | ----------------------------------------------------------------------- |
| `st`      | <Image img={require('@site/static/img/png/zi-messages/st.png')} />      |
| `term`    | <Image img={require('@site/static/img/png/zi-messages/term.png')} />    |
| `th-bar`  | <Image img={require('@site/static/img/png/zi-messages/th-bar.png')} />  |
| `txt`     | <Image img={require('@site/static/img/png/zi-messages/txt.png')} />     |
| `u-warn`  | <Image img={require('@site/static/img/png/zi-messages/u-warn.png')} />  |
| `u`       | <Image img={require('@site/static/img/png/zi-messages/u.png')} />       |
| `uname`   | <Image img={require('@site/static/img/png/zi-messages/uname.png')} />   |
| `uninst`  | <Image img={require('@site/static/img/png/zi-messages/uninst.png')} />  |
| `url`     | <Image img={require('@site/static/img/png/zi-messages/url.png')} />     |
| `var`     | <Image img={require('@site/static/img/png/zi-messages/var.png')} />     |
| `version` | <Image img={require('@site/static/img/png/zi-messages/version.png')} /> |
| `warn`    | <Image img={require('@site/static/img/png/zi-messages/warn.png')} />    |
