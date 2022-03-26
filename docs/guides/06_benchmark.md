---
id: benchmark
title: '⏲ Benchmarking'
image: zw/logo/320x320.png
description: Benchmarking, Profiling & Statistics
keywords: [statistics, benchmark, profiling]
---

## Profile plugins

```shell title="~/.zshrc"
zi ice atinit'zmodload zsh/zprof' \
  atload'zprof | head -n 20; zmodload -u zsh/zprof'
zi light z-shell/F-Sy-H
```

| Syntax      | Description                                                                                                              |
| ----------- | :----------------------------------------------------------------------------------------------------------------------- |
| `atinit'…'` | loads `zsh/zprof` module, shipped with Zsh, before loading the plugin – this starts the profiling.                       |
| `atload'…'` | works after loading the plugin – shows profiling results `zprof / head`, unloads `zsh/zprof` - this stops the profiling. |

While in effect, only a single plugin, in this case `z-shell/F-Sy-H`, will be profiled.

The rest plugins will go on completely normally, as when plugins are loaded with `light` - reporting is disabled.

Less code is being run in the background, the automatic data gathering, during loading of a plugin, for the reports and
the possibility to unload the plugin, will be activated and the functions will not appear in the `zprof` report.

- Example `zprof` report:

```shell {3} title="zprof"
num calls    time                self                 name
---------------------------------------------------------------------------
 1)  1 57,76 57,76 57,91%  57,76 57,76 57,91% _zsh_highlight_bind_widgets
 2)  1 25,81 25,81 25,88%  25,81 25,81 25,88% compinit
 3)  4 10,71  2,68 10,74%   8,71  2,18  8,73% --zi-shadow-autoload
 4) 43  2,06  0,05  2,07%   2,06  0,05  2,07% -zi-add-report
 5)  8  1,98  0,25  1,98%   1,98  0,25  1,98% compdef
 6)  1  2,85  2,85  2,85%   0,87  0,87  0,87% -zi-compdef-replay
 7)  1  0,68  0,68  0,68%   0,68  0,68  0,68% -zi-shadow-off
 8)  1  0,79  0,79  0,79%   0,49  0,49  0,49% add-zsh-hook
 9)  1  0,47  0,47  0,47%   0,47  0,47  0,47% -zi-shadow-on
1)   3  0,34  0,11  0,35%   0,34  0,11  0,35% (anon)
2)   4 10,91  2,73 10,94%   0,20  0,05  0,20% autoload
3)   1  0,19  0,19  0,19%   0,19  0,19  0,19% -fast-highlight-fill-option-variables
4)   1 25,98 25,98 26,05%   0,17  0,17  0,17% zpcompinit
5)   1  2,88  2,88  2,89%   0,03  0,03  0,03% zpcdreplay
6)   1  0,00  0,00  0,00%   0,00  0,00  0,00% -zi-load-plugin
-----------------------------------------------------------------------------------
```

- The first column is the time is in milliseconds;

  - It denotes the amount of time spent in a function in total.
  - For example, `--zi-shadow-autoload` consumed 10.71 ms of the execution time,

- The fourth column is also a time in milliseconds, but it denotes the amount of time spent on executing only of
  function's **own code**, it doesn't count the time spent in **descendant functions** that are called from the
  function;

  - For example, `--zi-shadow-autoload` spent 8.71 ms on executing only its own code.

- The table is sorted on the **self-time** column.

## Profile `.zshrc` startup

> `PROFILE_STARTUP=true` to enable profiling.

Place snippet below at the top of `.zshrc`.

```shell title="~/.zshrc"
PROFILE_STARTUP=false

if [[ "$PROFILE_STARTUP" == true ]]; then
  zmodload zsh/zprof
  PS4=$'%D{%M%S%.} %N:%i> '
  exec 3>&2 2>$HOME/startlog.$$
  setopt xtrace prompt_subst
fi
```

:::info PS4 Prompt Expansion

Zsh Sourceforge docs: [Prompt Exapansion][1]

:::

Place at the bottom of `.zshrc`

```shell title="~/.zshrc"
if [["$PROFILE_STARTUP" == true]]; then unsetopt xtrace exec 2>&3 3>&- zprof > ~/zshprofile$(date +'%s') fi
```

The next time your `.zshrc` is sourced it will generate 2 files in the `$HOME` directory.

[1]: https://zsh.sourceforge.net/Doc/Release/Prompt-Expansion.html
