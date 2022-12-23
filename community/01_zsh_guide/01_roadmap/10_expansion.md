---
id: expansion
title: "🃏 Expansion"
description: "The expansion, commonly referred to as globbing, is the operation that expands a wildcard pattern into the list of pathnames matching the pattern"
sidebar_position: 2
image: /img/zsh/artwork/app-icons/zsh-icon-256x256.png
keywords:
  - globbing
  - expansion
  - global-expansion
---

<!-- TODO: Source: https://zsh.sourceforge.io/Doc/Release/Expansion.html#Expansion -->

:::caution

Work in progress!

:::

Global expansion is the operation that expands a wildcard pattern into the list of pathnames matching the pattern. A glob is a short expression that lets you filter files by their name 99% of the time, there’s an asterisk involved.

Given the following structure:

```verilog
zsh_demo
├── data
│ ├── africa
│ │ ├── kenya
│ │ │ ├── literacy.txt
│ │ │ ├── income.txt
│ │ │ └── population.txt
│ │ └── ...
│ ├── asia
│ │ ├── ...
│ └── europe
│ ├── ...
└── data
├── africa
│ ├── kenya
│ │ ├── literacy_index.txt
│ │ ├── median_income.txt
│ │ └── population_by_province.txt
│ └── ...
├── ...
```

Can be globbed with:

```shell
ls zsh_demo/**/*.txt # <= this is a glob
```

## Globbing TL;DR

:::info

Global expansion requires `extended_glob`, `dot_glob`, and related options to be enabled, this will treat the `#`, `~`, `^`, and more characters as part of patterns for filename generation, etc.

:::

Enable option:

```shell
setopt extended_glob
```

<!-- TODO: Tables below has ascaped '\|' because it breakes the table and requires other solution as the '\' makes the syntax in the codeblock incorrect -->

| Pattern                                  | Description                                                                        |
| :--------------------------------------- | :--------------------------------------------------------------------------------- |
| `ls *(<tab>`                             | Use tab completion to get **help** regarding globbing                              |
| `rm ../debianpackage(.)`                 | Remove **files** only                                                              |
| `ls -d *(/)`                             | List **directories** only                                                          |
| `ls /etc/*(@)`                           | List **symlinks** only                                                             |
| `ls -l *.(png\|jpg\|gif)`                | List **pictures** only                                                             |
| `ls *(*)`                                | List **executables** only                                                          |
| `ls /etc/**/zsh`                         | Which directories contain `zsh`?                                                   |
| `ls **/*(-@)`                            | List dangling symlinks (`**` recurses down directory trees)                        |
| `ls foo*~*bar*`                          | Match everything that starts with foo but doesn\'t contain bar                     |
| `ls *(e:'file $REPLY \| grep -q JPEG':)` | Match all files of which file says that they are JPEGs                             |
| `ls -ldrt -- *(mm+15)`                   | List all files older than 15mins                                                   |
| `ls -ldrt -- *(.mm+15)`                  | List just regular files                                                            |
| `ls -ld /my/path/**/*(D@-^@)`            | List the unbroken symlinks under a directory                                       |
| `ls -Lldrt -- *(-mm+15)`                 | List the age of the pointed-to file for symlinks                                   |
| `ls -l **/README`                        | Search for `README` in all Subdirectories                                          |
| `ls -l foo<23->`                         | List files beginning at `foo23` upwards (foo23, foo24, foo25, ..)                  |
| `ls -l 200406{04..10}*(N)`               | List all files that begin with the date strings from June 4 through June 9 of 2004 |
| `ls -l 200406<4-10>.*`                   | List will match the form of 200406XX                                               |
| `ls -l *.(c\|h)`                         | Show only all `*.c` and `*.h` files                                                |
| `ls -l *(R)`                             | Show only world-readable files                                                     |
| `ls -fld *(OL)`                          | Sort the output from `ls -l` by file size                                          |
| `ls -fl *(DOL[1,5])`                     | Print only 5 lines by the `ls` command (is equal to: `ls -laS \| head -n 5`)       |
| `ls -l *(G[users])`                      | Show only files are owned from group `users`                                       |
| `ls *(L0f.go-w.)`                        | Show only empty files which nor `group` or `world writable`                        |
| `ls *.c~foo.c`                           | Show only all `*.c` files and ignore `foo.c`                                       |

:::note

Bash won't match a `.` at the start of the name or a slash, to use matching with `.` and `/` use the `dot_glob` option.

:::

Enable the `dot_glob` option in Zsh:

```shell
setopt dot_glob
```

Enable `dot_glob` with bash:

```shell
shopt -s dot_glob
```

| Pattern                                                        | Description                                                                                                           |
| :------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| `print -rl /home/me/**/*(D/e{'reply=($REPLY/*(N[-1]:t))'})`    | Find all directories, list their contents, and output the first item in the above list                                |
| `print -rl /**/*~^*/path(\|/*)`                                | Find command to search for directory name instead of basename                                                         |
| `print -l ~/*(ND.^w)`                                          | List files in the current directory that are not writable by the owner                                                |
| `print -rl -- *(Dmh+10^/)`                                     | List all files which have not been updated in the last 10 hours                                                       |
| `print -rl -- **/*(Dom[1,10])`                                 | List the ten newest files in directories and subdirectories (recursive)                                               |
| `print -rl -- /path/to/dir/**/*(D.om[5,10])`                   | Display the 5-10 last modified files                                                                                  |
| `print -rl -- **/*.c(D.OL[1,10]:h) \| sort -u`                 | Print the path of the directories holding the ten biggest C regular files in the current directory and subdirectories |
| `print directory/**/*(om[1])`                                  | Find most recent file in a directory                                                                                  |
| `for a in ./**/*\ *(Dod); do mv $a ${a:h}/${a:t:gs/ /_}; done` | Remove spaces from filenames                                                                                          |
