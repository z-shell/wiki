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

### `{auto}`

You can specify a modifier or use `{auto}` which will automaticly select the best one. For example, if it's an url, it will use `{url}`...

```shell
+zi-message "{auto}zi"
+zi-message "{auto}git"
+zi-message "{auto}https://wiki.zshell.dev ftp://zshell.dev rsync://zshell.dev ssh://github.com scp://zshell.dev ntp://time.cloudflare.com file://local.html"
+zi-message "{auto}z-shell/zi 0xMRTT/dotfiles"
+zi-message "{auto}10000000000s"
+zi-message "{auto}1000 66 000"
+zi-message "{auto}zi analytics"
+zi-message "{auto}sbin'a -> b'"
+zi-message "{auto} \`z-shell Zi'"
+zi-message "{auto} 'z-shell Zi'"
+zi-message "{auto} \"z-shell Zi\""
```

![zi_messages.gif](/asciicast/gif/zi_messages.gif)

<div id="demo"></div>

### Full list

| Modifier  | Output                                                                  | Modifier  | Output                                                                  | Modifier  | Output                                                                  | Modifier  | Output                                                                  |
| --------- | ----------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------- |
| `-…`      | <Image img={require('@site/static/img/png/zi-messages/-….png')} />      | `…`       | <Image img={require('@site/static/img/png/zi-messages/….png')} />       | `↔`       | <Image img={require('@site/static/img/png/zi-messages/↔.png')} />       | `quos`    | <Image img={require('@site/static/img/png/zi-messages/quos.png')} />    |
| `annex`   | <Image img={require('@site/static/img/png/zi-messages/annex.png')} />   | `apo`     | <Image img={require('@site/static/img/png/zi-messages/aps.png')} />     | `b`       | <Image img={require('@site/static/img/png/zi-messages/b.png')} />       | `rst`     | <Image img={require('@site/static/img/png/zi-messages/rst.png')} />     |
| `bapo`    | <Image img={require('@site/static/img/png/zi-messages/bapo.png')} />    | `baps`    | <Image img={require('@site/static/img/png/zi-messages/baps.png')} />    | `bar`     | <Image img={require('@site/static/img/png/zi-messages/bar.png')} />     | `slight`  | <Image img={require('@site/static/img/png/zi-messages/slight.png')} />  |
| `bcmd`    | <Image img={require('@site/static/img/png/zi-messages/bcmd.png')} />    | `b-lhi`   | <Image img={require('@site/static/img/png/zi-messages/b-lhi.png')} />   | `bspc`    | <Image img={require('@site/static/img/png/zi-messages/bspc.png')} />    | `st`      | <Image img={require('@site/static/img/png/zi-messages/st.png')} />      |
| `b-warn`  | <Image img={require('@site/static/img/png/zi-messages/b-warn.png')} />  | `cmd`     | <Image img={require('@site/static/img/png/zi-messages/cmd.png')} />     | `data`    | <Image img={require('@site/static/img/png/zi-messages/data.png')} />    | `tab`     | <Image img={require('@site/static/img/png/zi-messages/tab.png')} />     |
| `data2`   | <Image img={require('@site/static/img/png/zi-messages/data2.png')} />   | `dbg`     | <Image img={require('@site/static/img/png/zi-messages/dbg.png')} />     | `dir`     | <Image img={require('@site/static/img/png/zi-messages/dir.png')} />     | `term`    | <Image img={require('@site/static/img/png/zi-messages/term.png')} />    |
| `ehi`     | <Image img={require('@site/static/img/png/zi-messages/ehi.png')} />     | `error`   | <Image img={require('@site/static/img/png/zi-messages/error.png')} />   | `failure` | <Image img={require('@site/static/img/png/zi-messages/failure.png')} /> | `th-bar`  | <Image img={require('@site/static/img/png/zi-messages/th-bar.png')} />  |
| `faint`   | <Image img={require('@site/static/img/png/zi-messages/faint.png')} />   | `file`    | <Image img={require('@site/static/img/png/zi-messages/file.png')} />    | `func`    | <Image img={require('@site/static/img/png/zi-messages/func.png')} />    | `txt`     | <Image img={require('@site/static/img/png/zi-messages/txt.png')} />     |
| `glob`    | <Image img={require('@site/static/img/png/zi-messages/glob.png')} />    | `happy`   | <Image img={require('@site/static/img/png/zi-messages/happy.png')} />   | `hi`      | <Image img={require('@site/static/img/png/zi-messages/hi.png')} />      | `u`       | <Image img={require('@site/static/img/png/zi-messages/u.png')} />       |
| `ice`     | <Image img={require('@site/static/img/png/zi-messages/ice.png')} />     | `id-as`   | <Image img={require('@site/static/img/png/zi-messages/id-as.png')} />   | `info`    | <Image img={require('@site/static/img/png/zi-messages/info.png')} />    | `uname`   | <Image img={require('@site/static/img/png/zi-messages/uname.png')} />   |
| `info2`   | <Image img={require('@site/static/img/png/zi-messages/info2.png')} />   | `info3`   | <Image img={require('@site/static/img/png/zi-messages/info3.png')} />   | `it`      | <Image img={require('@site/static/img/png/zi-messages/it.png')} />      | `uninst`  | <Image img={require('@site/static/img/png/zi-messages/uninst.png')} />  |
| `keyword` | <Image img={require('@site/static/img/png/zi-messages/keyword.png')} /> | `lhi`     | <Image img={require('@site/static/img/png/zi-messages/lhi.png')} />     | `lr`      | <Image img={require('@site/static/img/png/zi-messages/lr.png')} />      | `url`     | <Image img={require('@site/static/img/png/zi-messages/url.png')} />     |
| `mdsh`    | <Image img={require('@site/static/img/png/zi-messages/mdsh.png')} />    | `meta`    | <Image img={require('@site/static/img/png/zi-messages/meta.png')} />    | `meta2`   | <Image img={require('@site/static/img/png/zi-messages/meta2.png')} />   | `u-warn`  | <Image img={require('@site/static/img/png/zi-messages/u-warn.png')} />  |
| `mmdsh`   | <Image img={require('@site/static/img/png/zi-messages/mmdsh.png')} />   | `msg`     | <Image img={require('@site/static/img/png/zi-messages/msg.png')} />     | `msg2`    | <Image img={require('@site/static/img/png/zi-messages/msg2.png')} />    | `var`     | <Image img={require('@site/static/img/png/zi-messages/var.png')} />     |
| `msg3`    | <Image img={require('@site/static/img/png/zi-messages/msg3.png')} />    | `nb`      | <Image img={require('@site/static/img/png/zi-messages/nb.png')} />      | `ndsh`    | <Image img={require('@site/static/img/png/zi-messages/ndsh.png')} />    | `version` | <Image img={require('@site/static/img/png/zi-messages/version.png')} /> |
| `nit`     | <Image img={require('@site/static/img/png/zi-messages/nit.png')} />     | `nl`      | <Image img={require('@site/static/img/png/zi-messages/u.png')} />       | `note`    | <Image img={require('@site/static/img/png/zi-messages/note.png')} />    | `warn`    | <Image img={require('@site/static/img/png/zi-messages/warn.png')} />    |
| `nst`     | <Image img={require('@site/static/img/png/zi-messages/nst.png')} />     | `nu`      | <Image img={require('@site/static/img/png/zi-messages/nu.png')} />      | `num`     | <Image img={require('@site/static/img/png/zi-messages/num.png')} />     |
| `obj`     | <Image img={require('@site/static/img/png/zi-messages/obj.png')} />     | `obj2`    | <Image img={require('@site/static/img/png/zi-messages/obj2.png')} />    | `ok`      | <Image img={require('@site/static/img/png/zi-messages/ok.png')} />      |
| `opt`     | <Image img={require('@site/static/img/png/zi-messages/opt.png')} />     | `p`       | <Image img={require('@site/static/img/png/zi-messages/p.png')} />       | `pname`   | <Image img={require('@site/static/img/png/zi-messages/pname.png')} />   |
| `pre`     | <Image img={require('@site/static/img/png/zi-messages/pre.png')} />     | `profile` | <Image img={require('@site/static/img/png/zi-messages/profile.png')} /> | `quo`     | <Image img={require('@site/static/img/png/zi-messages/quo.png')} />     |
