---
id: zbrowse
title: ⚙️ ZBrowse
image: zw/logo/320x320.png
description: Check variables of a possible loop.
keywords: [zbrowse, zsh-plugin, variable]
---

import Image from '@theme/IdealImage'; import Screen1 from '@site/static/img/plugins/zbrowse.png'; import Asciinema1
from '@site/static/img/asciinema/122018.png';

- [z-shell/zbrowse](https://github.com/z-shell/zbrowse)

When doing shell work, it is often the case that `echo $variable` is invoked multiple times, to check result of a loop,
etc.

With ZBrowse, you just need to press `Ctrl-B`, which invokes the `ZBrowse` – `Zshell` variable browser:

<Image className="ScreenView" img={Screen1} alt="ZBrowse preview" />

---

:::tip

You can resize the video by pressing `Ctrl-+` or `Cmd-+`.

:::

<a href="https://asciinema.org/a/122018">
  <Image className="ScreenView" img={Asciinema1} alt="ZBrowse view on Asciinema" />
</a>

Video source: [Asciinema](https://asciinema.org/a/122018)

## Install zbrowse

First install the [ZUI](https://github.com/z-shell/zui) plugin (it's an UI library).

**The plugin is "standalone"**, which means that only sourcing it is needed. So to install, unpack `zbrowse` somewhere
and add

```zsh
source {where-zbrowse-is}/zbrowse.plugin.zsh
```

to `zshrc`.

If using a plugin manager, then `ZI` is recommended, but you can use any other too, and also install with `Oh My Zsh`
(by copying directory to `~/.oh-my-zsh/custom/plugins`).

### [ZI](https://github.com/z-shell/zi)

Add `zi load z-shell/zbrowse` to your `.zshrc` file. ZI will handle cloning the plugin for you automatically the next
time you start zsh. To update run `zi update z-shell/zbrowse` (`update-all` can also be used).

### Antigen

Add `antigen bundle z-shell/zbrowse` to your `.zshrc` file. Antigen will handle cloning the plugin for you automatically
the next time you start zsh.

### Oh-My-Zsh

1. `cd ~/.oh-my-zsh/custom/plugins`
2. `git clone git@github.com:z-shell/zbrowse.git`
3. Add `zbrowse` to your plugin list

### Zgen

Add `zgen load z-shell/zbrowse` to your .zshrc file in the same place you're doing your other `zgen load` calls.
