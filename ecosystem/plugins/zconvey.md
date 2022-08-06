---
id: zconvey
title: ⚙️ ZConvey
image: /img/logo/320x320.png
description: Zsh Plugin ZConvey documentation
keywords:
  - zconvey
  - zplugin
  - zsh-plugin
---

<!-- @format -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Image from '@theme/IdealImage';

## <i class="fa-brands fa-github"></i> [z-shell/zconvey][]

ZConvey integrates multiple Zsh sessions. They are given an `ID`, optionally a `NAME` (both unique), and can send commands to each other. Use this to switch all your Zshells to a given directory, via `zc-all cd $PWD`! Also, there's a `zc-bg-notify` **script** (not a function), that will show notification under the prompt of every active Zsh session. You can call this script from any program, Bash or GUI.

<div className="ScreenView">
  <Image img="https://cdn.zshell.dev/img/asciicast/gif/zsh/zconvey.gif" className="ImageView" alt="ZConvey Preview" />
</div>

## [Zstyles](/search?q=zstyle) for ZConvey

The values being set are the defaults. They must be set before loading the plugin.

<div className="apitable">

| Value                                             | Description                                                                                                                                                                                                                                      |
| :------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| zstyle ":plugin:zconvey" check_interval "2"       | How often to check if there are new commands (in seconds)                                                                                                                                                                                        |
| zstyle ":plugin:zconvey" expire_seconds "22"      | If the shell is busy for 22 seconds, the received command will expire and not run                                                                                                                                                                |
| zstyle ":plugin:zconvey" greeting "logo"          | Display logo at Zsh start ("text" – display text, "none" – no greeting)                                                                                                                                                                          |
| zstyle ":plugin:zconvey" ask "0"                  | The `zc` won't ask for missing data ("1" has the same effect as always using `-a` option)                                                                                                                                                        |
| zstyle ":plugin:zconvey" ls_after_rename "0"      | Don't execute zc-ls after doing rename (with zc-rename or zc-take)                                                                                                                                                                               |
| zstyle ":plugin:zconvey" use_zsystem_flock "1"    | Should use a faster zsystem's flock when it's possible? (default true)                                                                                                                                                                           |
| zstyle ":plugin:zconvey" output_method "feeder"   | To put commands on the command line, ZConvey can use the small program "feeder" or "zsh" method, which currently doesn't automatically run the command – to use when e.g. feeder doesn't build (unlikely) or when occurring any problems with it |
| zstyle ":plugin:zconvey" timestamp_from "datetime | Use zsh/datetime module for obtaining timestamp. "date" – use date command (fork)                                                                                                                                                                |

</div>

## ZConvey commands

<div className="apitable">

| Command        | Description                                                                                            |
| -------------- | :----------------------------------------------------------------------------------------------------- |
| `zc`           | Sends to another session; use the `-a` option to be asked for a target and a command to send           |
| `zc-ls`        | Lists all active and named sessions                                                                    |
| `zc-id`        | Shows `ID` and `NAME` of current session                                                               |
| `zc-all`       | The same as `zc`, but targets are all other active sessions (with `-f` also busy sessions)             |
| `zc-take`      | Takes a name for current or selected sessions, schematically renames any conflicting sessions          |
| `zc-logo`      | The same as `zc-id`, but in a form of an on-screen logo; bound to <kbd>Ctrl-O</kbd>, <kbd>Ctrl-I</kbd> |
| `zc-rename`    | Assigns a name to a current or selected session; won't rename if there's a session with the same name  |
| `zc-bg-notify` | In subdirectory `cmds`, link it to `/usr/local/bin`, etc. or load with e.g. Zi                         |

</div>

The main command is `zc` (yet it is rather rarely used, I'm always sending to all sessions with `zc-all`). It is used to execute commands on other sessions. `zc-ls` is the main tool to obtain overall information on sessions and `zc-take` is a nice rename tool to quickly name a few sessions. Keyboard shortcut <kbd>Ctrl-O</kbd> and <kbd>Ctrl-I</kbd> will show current session's `ID` and `NAME` in form of an on-screen logo.

## Install zconvey

<Tabs>
  <TabItem value="standalone" label="Standalone" default>

The **standalone"** plugin install, unpack `zconvey` somewhere and add to `.zshrc`:

```shell
source {where-zconvey-is}/zconvey.plugin.zsh
```

  </TabItem>
  <TabItem value="zi" label="Zi">

Add the following to your `.zshrc` file. Zi will clone the plugin the next time you start Zsh. To update issue `zi update z-shell/zconvey`.

```shell
zi load z-shell/zconvey
```

Zi can load in [turbo mode](/search?q=turbo+and+lucid), below is an example configuration.

```shell showLineNumbers
zi ice wait"0"
zi light z-shell/zconvey
```

Adding `zc-bg-notify` to `$PATH`:

```shell showLineNumbers
zi ice wait"0" as"command" pick"cmds/zc-bg-notify" silent
zi light z-shell/zconvey
```

  </TabItem>
</Tabs>

The plugin integrates with my other plugin [z-shell/zsh-select][]. Install it with e.g. Zi to be able to use the `-a` option for the `zc` command.

<!-- end-of-file -->
<!-- links -->

[z-shell/zconvey]: https://github.com/z-shell/zconvey
[z-shell/zsh-select]: https://github.com/z-shell/zsh-select
