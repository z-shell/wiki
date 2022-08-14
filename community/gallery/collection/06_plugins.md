---
id: plugins
title: "🔺 Plugins"
image: /img/logo/320x320.png
description: The Collection of Plugins
keywords:
  - Collection
  - plugins
---

<!-- @format -->

:::info

Related:

1. [Usage: Turbo and Lucid][3]
2. [Syntax: The `for` syntax][4]
3. [Guides: Ice Syntax][5]
4. [Guides: Ice Modifiers][6]
5. [Compiling programs][7]
6. [Customizing paths][8]
7. [The Ice modifiers by `bin-gem-node` annex][9]

:::

:::tip

Load in turbo mode and adjust loading order by appending e.g:

```shell showLineNumbers
zi ice wait'0a' lucid …
zi light …

zi ice wait'0b' lucid …
zi light …

zi ice wait'0c' lucid …
zi light …
```

:::

:::tip Create your own syntax style:

- The ver'master' - allows to select specific commit, version or branch.
- It's optional and can be removed if not required.

```shell showLineNumbers
z_lucid() {
  zi ice lucid ver'master' "$@"
}

zi0a() {
  z_lucid wait'0a' "$@"
}

zi0b() {
  z_lucid wait'0b' "$@"
}

zi0c() {
  z_lucid wait'0c' "$@"
}
```

:::

:::Load:

```shell showLineNumbers
zi0a
zi light …

zi0b
zi light …

zi0c
zi light …
```

:::

## Without [for][4] syntax

### SC: [trapd00r/LS_COLORS](https://github.com/trapd00r/LS_COLORS)

```shell showLineNumbers
zi ice wait lucid reset \
 atclone"[[ -z \${commands[dircolors]} ]] && local P=g
    \${P}sed -i '/DIR/c\DIR 38;5;63;1' LS_COLORS
    \${P}dircolors -b LS_COLORS >! clrs.zsh" \
 atpull'%atclone' pick"clrs.zsh" nocompile'!' \
 atload'zstyle ":completion:*:default" list-colors "${(s.:.)LS_COLORS}";'
zi light trapd00r/LS_COLORS
```

### SC: [paoloantinori/hhighlighter](https://github.com/paoloantinori/hhighlighter)

```shell showLineNumbers
zi ice wait lucid pick"h.sh"
zi light paoloantinori/hhighlighter
```

### SC: [wfxr/forgit](https://github.com/wfxr/forgit)

```shell showLineNumbers
zi ice wait lucid
zi load wfxr/forgit
```

### SC: [urbainvaes/fzf-marks](https://github.com/urbainvaes/fzf-marks)

```shell showLineNumbers
zi ice wait lucid
zi load urbainvaes/fzf-marks
```

### SC: [hlissner/zsh-autopair](https://github.com/hlissner/zsh-autopair)

```shell showLineNumbers
zi ice wait lucid pick'autopair.zsh'
zi load hlissner/zsh-autopair
```

### SC: [voronkovich/gitignore.plugin.zsh](https://github.com/voronkovich/gitignore.plugin.zsh)

```shell showLineNumbers
zi ice wait lucid
zi load voronkovich/gitignore.plugin.zsh
```

### SC: [xPMo/zsh-toggle-command-prefix](https://github.com/xPMo/zsh-toggle-command-prefix)

```shell showLineNumbers
zi ice wait lucid
zi light xPMo/zsh-toggle-command-prefix
```

### SC: [leonjza/history-here](https://github.com/leonjza/history-here)

```shell showLineNumbers
zi ice wait lucid
zi light leonjza/history-here
```

### SC: [hkbakke/bash-insulter](https://github.com/hkbakke/bash-insulter)

```shell showLineNumbers
zi ice wait lucid pick'src/bash.command-not-found'
zi light hkbakke/bash-insulter
```

### SC: [leophys/zsh-plugin-fzf-finder](https://github.com/leophys/zsh-plugin-fzf-finder)

```shell showLineNumbers
zi ice wait lucid has'fzf' pick'fzf-finder.plugin.zsh'
zi light leophys/zsh-plugin-fzf-finder
```

### SC: [autosuggestions][1], [fast-syntax-highlighting][2]

```shell showLineNumbers
zi ice wait lucid atinit"ZI[COMPINIT_OPTS]=-C; zicompinit; zicdreplay"
zi light z-shell/F-Sy-H

zi ice wait lucid atload"!_zsh_autosuggest_start"
zi load zsh-users/zsh-autosuggestions
```

### SC: [z-shell/zsh-github-issues](https://github.com/z-shell/zsh-github-issues)

```shell showLineNumbers
zi ice lucid id-as"GitHub-notify" \
  on-update-of"~/.cache/zsh-github-issues/new_titles.log" \
  notify"New issue: $NOTIFY_MESSAGE"
zi light z-shell/zsh-github-issues
```

### SC: [zsh-shell/zsh-startify](https://github.com/z-shell/zsh-startify)

```shell showLineNumbers
zi ice wait lucid atload"zsh-startify"
zi load z-shell/zsh-startify
```

### SC: [z-shell/declare-zsh](https://github.com/z-shell/declare-zsh)

```shell showLineNumbers
zi ice wait lucid
zi load z-shell/declare-zsh
```

### SC: [z-shell/zsh-navigation-tools](https://github.com/z-shell/zsh-navigation-tools)

```shell showLineNumbers
zi ice wait lucid
zi load z-shell/zsh-navigation-tools
```

### SC: [z-shell/H-S-MW](https://github.com/z-shell/H-S-MW) {#sc-z-shellh-s-mw}

```shell showLineNumbers
zstyle ":history-search-multi-word" page-size "11"
zi ice wait lucid
zi load z-shell/H-S-MW
```

### SC: [z-shell/zui](https://github.com/z-shell/zui), [z-shell/zi-crasis](https://github.com/z-shell/zi-crasis)

```shell showLineNumbers
zi ice wait lucid
zi load z-shell/zui

zi ice wait"[[ -n ${ZLAST_COMMANDS[(r)cra*]} ]]" lucid
zi load z-shell/zi-crasis
```

### SC: [z-shell/zredis](https://github.com/z-shell/zredis)

```shell showLineNumbers
zstyle ":plugin:zredis" configure_opts "--without-tcsetpgrp"
zstyle ":plugin:zredis" cflags "-Wall -O2 -g -Wno-unused-but-set-variable"

zi ice wait lucid atload"ztie -d db/redis -a 127.0.0.1:4815/5 -zSL main rdhash"
zi load z-shell/zredis
```

## With [for][4] syntax

### SC: [zplugin/zsh-exa](https://github.com/zplugin/zsh-exa)

```shell showLineNumbers
zi wait lucid for \
  has'exa' atinit'AUTOCD=1' \
    zplugin/zsh-exa
```

### SC: [z-shell/zsh-zoxide](https://github.com/z-shell/zsh-zoxide)

```shell showLineNumbers
zi has'zoxide' light-mode for \
  z-shell/zsh-zoxide
```

### GH-R: [pemistahl/grex](https://github.com/pemistahl/grex)

```shell showLineNumbers
zi wait lucid for as"command" from"gh-r" sbin"grex" \
  pemistahl/grex
```

### GH-R: [ahmetb/kubectx](https://github.com/ahmetb/kubectx)

```shellshowLineNumbers
zi wait lucid for as"command" from"gh-r" \
  bpick"kubectx;kubens" sbin"kubectx;kubens" \
    ahmetb/kubectx
```

### B: [stedolan/jq](https://github.com/stedolan/jq)

```shell showLineNumbers
zi wait lucid for if"(( ! ${+commands[jq]} ))" as"null" \
  atclone"autoreconf -fi && ./configure --with-oniguruma=builtin && make \
  && ln -sfv $PWD/jq.1 $ZI[MAN_DIR]/man1" sbin"jq" \
    stedolan/jq
```

### GH-R: [github/git-sizer](https://github.com/github/git-sizer)

```shell showLineNumbers
zi wait lucid for \
  as"command" from"gh-r" sbin"git-sizer" \
    @github/git-sizer
```

[1]: https://github.com/zsh-users/zsh-autosuggestions
[2]: https://github.com/z-shell/F-Sy-H
[3]: /docs/getting_started/overview#turbo--lucid
[4]: /docs/guides/syntax/for
[5]: /docs/guides/syntax/ice
[6]: /docs/guides/syntax/ice-modifiers
[7]: /docs/guides/syntax/common#-compiling-programs
[8]: /docs/guides/customization#-customizing-paths
[9]: /ecosystem/annexes/bin-gem-node#the-ice-modifiers-provided-by-the-annex
