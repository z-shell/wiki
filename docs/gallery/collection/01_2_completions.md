---
id: completions
title: '🔺 Completions'
description: The Collection of Completions
keywords: [collection, completions]
---

:::info

Related:

1. [Completions managment](/docs/guides/commands#completions-management)
2. [Calling compinit without turbo mode](/docs/guides/commands#calling-compinit-without-turbo-mode)
3. [Calling compinit with turbo mode](/docs/guides/commands#calling-compinit-with-turbo-mode)
4. [Ice modifiers/completions](/docs/guides/syntax/ice-modifiers#completions)
5. [Ice: `src'…'`, `pick'…'`, `multisrc'…'`](/docs/guides/syntax/ice#src-pick-multisrc)

:::

:::tip

Create your own syntax e.g:

> - The ver'master' - allows to select specific version or branch.
> - It's optional and can be removed if not required.

```shell
z_lucid() {
  zi ice lucid ver'master' "$@"
}

zi0a() {
  z_lucid wait'0a' "$@"
}

zi_completion() {
  zi0a as'completion' blockf "$@"
}
```

Then load as:

```shell
zi_completion has'…'
zi snippet …

zi_completion has'…' pick'…' from'…'
zi light …

zi_completion has'…'
zi snippet …
```

:::

### COMP: [docker/cli](https://github.com/docker/cli) {#comp-dockercli}

```shell
zi ice as"completion"
zi snippet https://github.com/docker/cli/blob/master/contrib/completion/zsh/_docker
```

### COMP: [Aloxaf/fzf-tab](https://github.com/Aloxaf/fzf-tab) {#comp-aloxaffzf-tab}

```shell
zi ice lucid wait has'fzf'
zi light Aloxaf/fzf-tab
```

### COMP: [x-motemen/ghq](https://github.com/x-motemen/ghq/blob/master/misc/zsh/_ghq) {#comp-x-motemenghq}

```shell
zi ice lucid wait as'completion' blockf has'ghq'
zi snippet https://github.com/x-motemen/ghq/blob/master/misc/zsh/_ghq
```

### COMP: [greymd/tmux-xpanes](https://github.com/greymd/tmux-xpanes) {#comp-greymdtmux-xpanes}

```shell
zi ice lucid wait as'completion' blockf has'tmux' pick'completion/zsh'
zi light greymd/tmux-xpanes
```

### COMP: [rust-lang/cargo](https://github.com/rust-lang/cargo/blob/master/src/etc/_cargo) {#comp-rust-langcargo}

```shell
zi ice lucid wait as'completion' blockf has'cargo'
zi snippet https://github.com/rust-lang/cargo/blob/master/src/etc/_cargo
```

### COMP: [ohmyzsh/rust](https://github.com/ohmyzsh/ohmyzsh/blob/master/plugins/rust/_rust) {#comp-ohmyzshrust}

```shell
zi ice lucid wait as'completion' blockf has'rustc'
zi snippet https://github.com/ohmyzsh/ohmyzsh/blob/master/plugins/rust/_rust
```

### COMP: [BurntSushi/ripgrep/rg](https://github.com/BurntSushi/ripgrep/blob/master/complete/_rg) {#comp-burntsushiripgreprg}

```shell
zi ice lucid wait as'completion' blockf has'rg'
zi snippet https://github.com/BurntSushi/ripgrep/blob/master/complete/_rg
```

### COMP: [TheLocehiliosan/yadm](https://github.com/TheLocehiliosan/yadm/blob/master/completion/zsh/_yadm) {#comp-thelocehiliosanyadm}

```shell
zi ice lucid wait as'completion' blockf has'yadm'
zi snippet https://github.com/TheLocehiliosan/yadm/blob/master/completion/zsh/_yadm
```

### COMP: [dbrgn/tealdeer](https://github.com/dbrgn/tealdeer/blob/master/zsh_tealdeer) {#comp-dbrgntealdeer}

```shell
zi ice lucid wait as'completion' blockf has'tldr' mv'zsh_tealdeer -> _tldr'
zi snippet https://github.com/dbrgn/tealdeer/blob/master/zsh_tealdeer
```

### COMP: [srijanshetty/zsh-pandoc-completion](https://github.com/srijanshetty/zsh-pandoc-completion) {#comp-srijanshettyzsh-pandoc-completion}

```shell
zi ice lucid wait as'completion' blockf has'pandoc'
zi light srijanshetty/zsh-pandoc-completion
```

### COMP: [ohmyzsh/fd](https://github.com/ohmyzsh/ohmyzsh/blob/master/plugins/fd/_fd) {#comp-ohmyzshfd}

```shell
zi ice lucid wait as'completion' blockf has'fd'
zi snippet https://github.com/ohmyzsh/ohmyzsh/blob/master/plugins/fd/_fd
```

### COMP: [jarun/Buku](https://github.com/jarun/Buku/blob/master/auto-completion/zsh/_buku) {#comp-jarunbuku}

```shell
zi ice lucid wait as'completion' blockf has'buku'
zi snippet https://github.com/jarun/Buku/blob/master/auto-completion/zsh/_buku
```

### COMP: [ytdl-org/youtube-dl](https://github.com/ytdl-org/youtube-dl/blob/master/youtube-dl.plugin.zsh) {#comp-ytdl-orgyoutube-dl}

```shell
zi ice lucid wait as'completion' blockf has'youtube-dl' mv'youtube-dl.zsh -> _youtube-dl'
zi snippet https://github.com/ytdl-org/youtube-dl/blob/master/youtube-dl.plugin.zsh
```

### COMP: [mpv-player/mpv](https://github.com/mpv-player/mpv/blob/master/etc/_mpv.zsh) {#comp-mpv-playermpv}

```shell
zi ice lucid wait as'completion' blockf has'mpv'
zi snippet https://github.com/mpv-player/mpv/blob/master/etc/_mpv.zsh
```

### COMP: [alacritty/alacritty](https://github.com/alacritty/alacritty/blob/master/extra/completions/_alacritty) {#comp-alacrittyalacritty}

```shell
zi ice lucid wait as'completion' blockf has'alacritty'
zi snippet https://github.com/alacritty/alacritty/blob/master/extra/completions/_alacritty
```

### COMP: [bugaevc/wl-clipboard](https://github.com/bugaevc/wl-clipboard/blob/master/completions/zsh/) {#comp-bugaevcwl-clipboard}

```shell
zi ice lucid wait as'completion' blockf has'wl-copy'
zi snippet https://github.com/bugaevc/wl-clipboard/blob/master/completions/zsh/_wl-copy

zi ice lucid wait as'completion' blockf has'wl-paste'
zi snippet https://github.com/bugaevc/wl-clipboard/blob/master/completions/zsh/_wl-paste
```

### COMP: [flatpak/flatpak](https://github.com/flatpak/flatpak/blob/master/completion/_flatpak) {#comp-flatpakflatpak}

```shell
zi ice lucid wait as'completion' blockf has'flatpak'
zi light https://github.com/flatpak/flatpak/blob/master/completion/_flatpak
```

### COMP: [beetbox/beets](https://github.com/beetbox/beets/blob/master/extra/_beet) {#comp-beetboxbeets}

```shell
zi ice lucid wait as'completion' blockf has'beet'
zi snippet https://github.com/beetbox/beets/blob/master/extra/_beet
```

### COMP: [zsh-users/zsh-completions](https://github.com/zsh-users/zsh-completions) {#comp-zsh-userszsh-completions}

```shell
zi ice lucid wait as'completion'
zi light zsh-users/zsh-completions
```

### COMP: [zchee/zsh-completions](https://github.com/zchee/zsh-completions) {#comp-zcheezsh-completions}

```shell
zi ice lucid wait as'completion' blockf pick'src/go' src'src/zsh'
zi light zchee/zsh-completions
```

### COMP: [git/git](https://github.com/git/git/blob/master/contrib/completion/git-completion.zsh) {#comp-gitgit}

```shell
zi ice lucid wait as'completion' blockf mv'git-completion.zsh -> _git'
zi snippet https://github.com/git/git/blob/master/contrib/completion/git-completion.zsh
```

### COMP: Local {#comp-local}

```shell
zi ice lucid wait as'completion' blockf has'pip'
zi snippet "$SHELL_COMMON/zsh/completions/_pip"

zi ice lucid wait as'completion' blockf has'poetry'
zi snippet "$SHELL_COMMON/zsh/completions/_poetry"

zi ice lucid wait has'thefuck'
zi snippet "$SHELL_COMMON/zsh/thefuck/thefuck.sh"

zi ice lucid wait
zi snippet "$XDG_CONFIG_HOME/less/less_termcap.sh"

zi ice lucid wait pick'aliases.sh' multisrc'functions_ghq.sh pash.sh functions.sh aliases_private.sh'
zi light "$SHELL_COMMON"

zi ice lucid wait has'broot'
zi snippet "$XDG_CONFIG_HOME/broot/launcher/bash/br"
```
