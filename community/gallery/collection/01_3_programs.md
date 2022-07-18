---
id: programs
title: "🔺 Programs"
description: The Collection of Programs
keywords:
  - collection
  - programs
---

:::info Related

1. [Overview: as'program'][100]
2. [Turbo and Lucid][101]
3. [The `for` syntax][102]
4. [The `make` syntax][103]
5. [Ice syntax][104]
6. [Ice modifiers][105]
7. [Compiling programs][106]
8. [Customizing paths][107]
9. [The ice modifiers by `bin-gem-node` annex][108]

:::

:::tip Secure with specific version

The `ver'…'` - allows to select specific version, branch or commit hash, also know as [permalink](https://docs.github.com/en/repositories/working-with-files/using-files/getting-permanent-links-to-files).

> It is recommended but not required (HEAD branch auto selected).

Example:

```shell showLineNumbers
zi wait lucid for \
  ver'88f3dae4f5391db589257ea069ab8fe4717c22c6' \
    z-shell/F-Sy-H
```

:::

:::tip Your own style

Command wrap example for cleaner or prefered syntax.

```shell showLineNumbers
z_lucid() {
  zi ice lucid ver'master' "$@"
}

zi0a() {
  z_lucid wait'0a' "$@"
}

zi_program() {
  zi0a as'program' "$@"
}
```

Then load as:

```shell showLineNumbers
zi_program has'…'
zi light …

zi_program has'…' pick'…' from'…'
zi light …

zi_program has'…'
zi light …
```

:::

## Without [`for`][102] syntax

### GH-R: [dandavison/delta][5]

```shell showLineNumbers
zi ice wait lucid as'program' from'gh-r' sbin'**/delta -> delta'
zi light dandavison/delta
```

### GH-R: [denisidoro/navi][6]

```shell showLineNumbers
zi ice lucid wait as'program' from"gh-r" has'fzf'
zi light denisidoro/navi
```

### GH-R: [junegunn/fzf][1]

```shell showLineNumbers
zi ice from'gh-r' as'program'
zi light @junegunn/fzf
```

### GH-R: [sharkdp/fd][2]

```shell showLineNumbers
zi ice from'gh-r' as'program' mv'fd* fd' sbin'**/fd(.exe|) -> fd'
zi light @sharkdp/fd
```

### GH-R: [sharkdp/bat][3]

```shell showLineNumbers
zi ice from'gh-r' as'program' mv'bat* bat' sbin'**/bat(.exe|) -> bat'
zi light @sharkdp/bat
```

### GH-R: [sharkdp/hexyl][7]

```shell showLineNumbers
zi ice from'gh-r' as'program' mv'hexyl* hexyl' sbin'**/hexyl(.exe|) -> hexyl'
zi light @sharkdp/hexyl
```

### GH-R: [sharkdp/hyperfine][8]

```shell showLineNumbers
zi ice from'gh-r' as'program' mv"hyperfine* hyperfine" sbin"**/hyperfine(.exe|) -> hyperfine"
zi light @sharkdp/hyperfine
```

### GH-R: [sharkdp/vivid][9]

```shell showLineNumbers
zi ice from'gh-r' as'program' mv'vivid* vivid' sbin'**/vivid(.exe|) -> vivid'
zi light @sharkdp/vivid
```

### GH-R: [ogham/exa][4]

```shell showLineNumbers
zi ice from'gh-r' as'program' sbin'**/exa -> exa' atclone'cp -vf completions/exa.zsh _exa'
zi light ogham/exa
```

### GH-R: [docker/compose][10]

```shell showLineNumbers
zi ice from"gh-r" as'program' mv'docker* -> docker-compose'
zi light docker/compose
```

### GH-R: [neovim/neovim][11]

```shell showLineNumbers
zi ice as'program' from'gh-r' \
  bpick'nvim-linux64.tar.gz' sbin'**/bin/nvim -> nvim'
zi light neovim/neovim
```

### GH-R: [direnv/direnv][12]

```shell showLineNumbers
zi ice as'program' from'gh-r' mv'direnv* -> direnv'
zi light direnv/direnv
```

### GH-R: [mvdan/sh][13]

```shell showLineNumbers
zi ice as'program' from'gh-r' mv'shfmt* -> shfmt'
zi light mvdan/sh
```

### GH-R: [b4b4r07/gotcha][15]

```shell showLineNumbers
zi ice as'program' from'gh-r' mv'gotcha_* -> gotcha'
zi light b4b4r07/gotcha
```

### SC: [zdharma/revolver][16]

```shell showLineNumbers
zi ice wait lucid as'program' pick'revolver'
zi light zdharma/revolver
```

### SC: [zdharma/zunit](https://github.com/zdharma/zunit)

```shell showLineNumbers
zi ice wait lucid as'program' pick'zunit' atclone'./build.zsh' atpull'%atclone'
zi load @zdharma/zunit
```

### SC: [Osse/git-scripts/git-unique](https://github.com/Osse/git-scripts/blob/master/git-unique)

```shell showLineNumbers
zi ice as'program' id-as'git-unique' pick'git-unique'
zi snippet https://github.com/Osse/git-scripts/blob/master/git-unique
```

### SC: [mfaerevaag/wd](https://github.com/mfaerevaag/wd)

```shell showLineNumbers
zi ice wait lucid as'program' cp'wd.sh -> wd' mv'_wd.sh -> _wd' atpull'!git reset --hard' pick'wd'
zi light mfaerevaag/wd
```

### SC: [z-shell/zsh-diff-so-fancy](https://github.com/z-shell/zsh-diff-so-fancy)

```shell showLineNumbers
zi ice wait lucid as'program' pick'bin/git-dsf'
zi load z-shell/zsh-diff-so-fancy
```

### SC: [obihann/archey-osx](https://github.com/obihann/archey-osx)

```shell showLineNumbers
zi ice wait lucid as'program' pick'bin/archey'
zi light obihann/archey-osx
```

### SC: [eth-p/bat-extras](https://github.com/eth-p/bat-extras)

```shell showLineNumbers
zi ice lucid wait as'program' has'bat' pick'src/*'
zi light eth-p/bat-extras
```

### SC: [paulirish/git-open](https://github.com/paulirish/git-open)

```shell showLineNumbers
zi ice lucid wait as'program' has'git' atclone"cp git-open.1.md $ZPFX/man/man1/git-open.1" atpull'%atclone'
zi light paulirish/git-open
```

### SC: [LuRsT/hr](https://github.com/LuRsT/hr)

```shell showLineNumbers
zi ice lucid wait as'program' atclone"cp hr.1 $ZPFX/man/man1" atpull'%atclone'
zi light LuRsT/hr
```

### SC: [z-shell/imgur-album-downloader](https://github.com/z-shell/imgur-album-downloader)

```shell showLineNumbers
zi ice lucid wait as'program' has'python3' pick'imguralbum.py'
zi light z-shell/imgur-album-downloader
```

### SC: [Seirdy/stpv](https://github.com/Seirdy/stpv)

```shell showLineNumbers
zi ice lucid wait as'program' has'fzf' pick'fzfp'
zi light Seirdy/stpv
```

```shell showLineNumbers
zi ice lucid wait as'program' has'ueberzug' pick'stpvimg'
zi light Seirdy/stpv
```

```shell showLineNumbers
zi ice lucid wait as'program' pick'stpv'
zi light Seirdy/stpv
```

### SC: [exiftool/exiftool](https://github.com/exiftool/exiftool)

```shell showLineNumbers
zi ice lucid wait as'program' has'perl' has'convert' pick'exiftool'
zi light exiftool/exiftool
```

### SC: [smxi/inxi](https://github.com/smxi/inxi)

```shell showLineNumbers
if [ -z "$SSH_CONNECTION" ]; then
  zi ice lucid wait as'program' has'perl' pick'inxi'
  zi light smxi/inxi
fi
```

### SC: [dylanaraps/pash](https://github.com/dylanaraps/pash)

```shell showLineNumbers
zi ice lucid wait as'program' has'gpg'
zi light dylanaraps/pash
```

### SC: [hackerb9/lsix](https://github.com/hackerb9/lsix)

```shell showLineNumbers
zi ice lucid wait as'program' has'mogrify'
zi light hackerb9/lsix
```

### SC: [denilsonsa/prettyping](https://github.com/denilsonsa/prettyping)

```shell showLineNumbers
zi ice lucid wait as'program' pick'prettyping' has'ping'
zi light denilsonsa/prettyping
```

### SC: [greymd/tmux-xpanes](https://github.com/greymd/tmux-xpanes)

```shell showLineNumbers
zi ice lucid wait as'program' has'tmux' pick'bin/xpanes'
zi light greymd/tmux-xpanes
```

### SC: [DanielG/dxld-mullvad/blob/master/am-i-mullvad.sh](https://github.com/DanielG/dxld-mullvad/blob/master/am-i-mullvad.sh)

```shell showLineNumbers
zi ice lucid wait as'program' has'jq'
zi snippet 'https://github.com/DanielG/dxld-mullvad/blob/master/am-i-mullvad.sh'
```

### B: [abishekvashok/cmatrix](https://github.com/abishekvashok/cmatrix/)

```shell showLineNumbers
# Regular syntax
zi ice lucid as'program' atclone"autoreconf -i; ./configure --prefix=$ZPFX" \
  atpull'%atclone' make"install" pick"$ZPFX/bin/cmatrix"
zi light abishekvashok/cmatrix
```

```shell showLineNumbers
# With the for syntax
zi for as'program' atclone"autoreconf -i; ./configure --prefix=$ZPFX" \
  atpull'%atclone' make"all install" pick"$ZPFX/bin/cmatrix" \
    abishekvashok/cmatrix
```

### B: [tj/git-extras](https://github.com/tj/git-extras)

```shell showLineNumbers
zi ice wait lucid as'program' pick'$ZPFX/bin/git-*' make'PREFIX=$ZPFX' nocompile
zi light tj/git-extras
```

### B: [k4rthik/git-cal](https://github.com/k4rthik/git-cal)

```shell showLineNumbers
zi ice wait lucid as'program' atclone'perl Makefile.PL PREFIX=$ZPFX' atpull'%atclone' make'install' pick'$ZPFX/bin/git-cal'
zi light k4rthik/git-cal
```

### B: [aaronNG/reddio](https://gitlab.com/aaronNG/reddio)

```shell showLineNumbers
zi ice lucid wait as'program' has'jq' pick'reddio' from'gitlab'
zi light aaronNG/reddio
```

### B: [TheLocehiliosan/yadm](https://github.com/TheLocehiliosan/yadm)

```shell showLineNumbers
zi ice lucid wait as'program' has'git' pick'yadm' atclone"cp yadm.1 $ZPFX/man/man1" atpull'%atclone'
zi light TheLocehiliosan/yadm
```

### B: [sdushantha/farge](https://github.com/sdushantha/farge)

```shell showLineNumbers
zi ice if'[[ -n "$WAYLAND_DISPLAY" ]]' lucid wait as'program' pick'farge'
zi light 'sdushantha/farge'
```

### B: [dylanaraps/neofetch](https://github.com/dylanaraps/neofetch)

```shell showLineNumbers
zi ice lucid wait as'program' pick'neofetch' atclone"cp neofetch.1 $ZPFX/man/man1" atpull'%atclone'
zi light dylanaraps/neofetch
```

### B: [vim/vim](https://github.com/vim/vim)

```shell showLineNumbers
zi ice as'program' atclone'rm -f src/auto/config.cache; ./configure' \
  atpull'%atclone' make pick'src/vim'
zi light vim/vim
```

### B: [direnv/direnv](https://github.com/direnv/direnv)

```shell showLineNumbers
zi ice as'program' make'!' atclone'./direnv hook zsh > zhook.zsh' atpull'%atclone' src'zhook.zsh'
zi light direnv/direnv
```

### B: [mptre/yank](https://github.com/mptre/yank)

```shell showLineNumbers
zi ice as'program' pick'yank' make
zi light mptre/yank
```

### B: [pyenv/pyenv](https://github.com/pyenv/pyenv)

```shell showLineNumbers
zi ice atclone'PYENV_ROOT="$PWD" ./libexec/pyenv init - > zpyenv.zsh' \
  atinit'export PYENV_ROOT="$PWD"' atpull"%atclone" \
  as'program' pick'bin/pyenv' src"zpyenv.zsh" nocompile'!'
zi light pyenv/pyenv
```

### B: [sdkman/sdkman-cli](https://github.com/sdkman/sdkman-cli)

```shell showLineNumbers
zi ice as'program' pick'$ZPFX/sdkman/bin/sdk' id-as'sdkman' run-atpull nocompile \
  atclone'curl -s "https://get.sdkman.io?rcupdate=false" -o scr.sh; SDKMAN_DIR=$ZPFX/sdkman bash scr.sh' \
  atpull'SDKMAN_DIR=$ZPFX/sdkman sdk selfupdate' \
  atinit'export SDKMAN_DIR=$ZPFX/sdkman; source $ZPFX/sdkman/bin/sdkman-init.sh'
zi light z-shell/0
```

### B: [asciinema/asciinema](https://github.com/asciinema/asciinema)

```shell showLineNumbers
zi ice as"program" wait lucid atinit"export PYTHONPATH=$ZPFX/lib/python3.10/site-packages/" \
  atclone"PYTHONPATH=$ZPFX/lib/python3.10/site-packages/ python3 setup.py --quiet install --prefix $ZPFX" \
  atpull"%atclone" test"0" pick"$ZPFX/bin/asciinema"
zi load asciinema/asciinema
```

### RA: Rust and [Peltoche/lsd](https://github.com/Peltoche/lsd)

```shell showLineNumbers
zi ice rustup cargo'!lsd' id-as'lsd' as'program' nocompile
zi load z-shell/0
```

### RA: Rust and [ogham/exa](https://github.com/ogham/exa)

```shell showLineNumbers
# the `ls' shim exposing the `exa' binary
zi ice rustup cargo'!exa -> ls' id-as'exa' as'program' nocompile
zi load z-shell/0
```

```shell showLineNumbers
# shim with standard error redirected to /dev/null
zi ice rustup cargo'!E:exa' id-as'exa' as'program' nocompile
zi load z-shell/0
```

### RA: Rust and [ogham/exa][4], [Peltoche/lsd][14]

```shell showLineNumbers
zi ice rustup cargo'exa;lsd' nocompile
zi load z-shell/0
```

```shell showLineNumbers
# exposes their binaries by altering $PATH
zi ice rustup cargo'exa;lsd' as'program' pick"bin/(exa|lsd)" nocompile
zi load z-shell/0
```

### RA: Rust compiler environment

```shell showLineNumbers
# Just install rust and make it available globally in the system
zi ice id-as"rust" wait"0" lucid rustup as"program" pick"bin/rustc" \
  atload="export nocompile CARGO_HOME=\$PWD RUSTUP_HOME=\$PWD/rustup"
zi load z-shell/0
```

## With [`for`][102] syntax

### GH-R: [argoproj/argo-cd](https://github.com/argoproj/argo-cd)

```shell showLineNumbers
zi light-mode for \
  as'completions' atclone'./argocd* completion zsh > _argocd' \
  atpull'%atclone' from'gh-r' if'[[ "$(uname -m)" == x86_64 ]]' \
  sbin'argocd* -> argocd' \
    argoproj/argo-cd
```

### GH-R: [junegunn/fzf](https://github.com/junegunn/fzf) + grab extras

```shell showLineNumbers
zi for atclone'mkdir -p $ZPFX/{bin,man/man1}' atpull'%atclone' from'gh-r' dl'
      https://raw.githubusercontent.com/junegunn/fzf/master/shell/completion.zsh -> _fzf_completion;
      https://raw.githubusercontent.com/junegunn/fzf/master/shell/key-bindings.zsh -> key-bindings.zsh;
      https://raw.githubusercontent.com/junegunn/fzf/master/man/man1/fzf-tmux.1 -> $ZPFX/man/man1/fzf-tmux.1;
      https://raw.githubusercontent.com/junegunn/fzf/master/man/man1/fzf.1 -> $ZPFX/man/man1/fzf.1' \
  id-as'junegunn/fzf' nocompile pick'/dev/null' sbin'fzf' src'key-bindings.zsh' \
    @junegunn/fzf
```

### GH-R: [junegunn/fzf][1], [sharkdp/fd][2], [sharkdp/bat][3], [ogham/exa][4]

```shell showLineNumbers
zi from"gh-r" as"null" for \
  sbin"fzf" junegunn/fzf \
  sbin"**/fd" @sharkdp/fd \
  sbin"**/bat" @sharkdp/bat \
  sbin"**/exa -> exa" atclone"cp -vf completions/exa.zsh _exa" ogham/exa
```

### SC: [zdharma/revolver](https://github.com/zdharma/revolver), [zdharma/zunit](https://github.com/zdharma/zunit)

```shell showLineNumbers
zi wait lucid for as'program' \
  atclone'ln -sfv revolver.zsh-completion _revolver' \
  atpull'%atclone' pick'revolver' \
    @zdharma/revolver \
  as'completion' atclone'./build.zsh; ln -sfv zunit.zsh-completion _zunit' \
  atpull'%atclone' sbin'zunit' \
    @zdharma/zunit
```

### SC: [tj/n](https://github.com/tj/n)

```shell showLineNumbers
zi light-mode for as'program' atinit'export N_PREFIX="$PWD/n"; \
[[ :$PATH: == *":$N_PREFIX/bin:"* ]] || PATH+=":$N_PREFIX/bin"' pick"bin/n" \
    tj/n
```

### GH-R: [pnpm/pnpm](https://github.com/pnpm/pnpm)

:::tip

- Manage [node version](https://pnpm.io/cli/env):
- Install required [release](https://github.com/pnpm/pnpm/releases):
  - See available releases in the repository.
  - Use `bpick` to match most relevant part of the release name as shown in example bellow.

:::

```shell showLineNumbers
zi light-mode for id-as'pnpm' from'gh-r' bpick'*-linux-x64' as'program' \
  atinit'export PNPM_HOME=$ZPFX/bin; [[ -z $NODE_PATH ]] && \
  export NODE_PATH=$PWD' sbin'pnpm* -> pnpm' nocompile \
    pnpm/pnpm
```

### GH-R: [yarnpkg/yarn](https://github.com/yarnpkg/yarn)

```shell showLineNumbers
zi light-mode for from'gh-r' as'program' \
  atinit'export PATH="$HOME/.yarn/bin:$PATH"' mv'yarn* -> yarn' \
  pick"yarn/bin/yarn" bpick'*.tar.gz' \
    yarnpkg/yarn
```

### B: [jarun/nnn](https://github.com/jarun/nnn)

```shell showLineNumbers
zi light-mode for pick'misc/quitcd/quitcd.zsh' as'program' nocompile \
  sbin make \
    jarun/nnn
```

### SC: [homebrew/brew](https://github.com/homebrew/brew)

```shell showLineNumbers
zi for as'null' depth'3' nocompletions sbin'bin/brew' \
  atclone'+zi-message "{auto}Installing brew …"; ./bin/brew update --preinstall; \
    ln -sf $PWD/completions/zsh/_brew $ZI[COMPLETIONS_DIR]; \
    rm -f brew.zsh; ./bin/brew shellenv --dummy-arg > brew.zsh; \
    zcompile brew.zsh;' \
  atpull'%atclone' src'brew.zsh' \
    @homebrew/brew
```

### RA: Rust compiler environment + completions

```shell showLineNumbers
zi id-as"rust" wait=1 as=null sbin="bin/*" lucid rustup nocompile \
  atload="[[ ! -f ${ZI[COMPLETIONS_DIR]}/_cargo ]] && zi creinstall -q rust; \
export CARGO_HOME=\$PWD; export RUSTUP_HOME=\$PWD/rustup" for \
  z-shell/0
```

### B: [ytdl-org/youtube-dl][]

```shell
zi for as'program' nocompile'!' depth'1' \
  has'python' pick'$ZPFX/bin/youtube-dl*' make'!PREFIX=$ZPFX install' \
  atclone'ln -sfv youtube-dl.zsh _youtube-dl' atpull'%atclone' \
    ytdl-org/youtube-dl
```

[1]: https://github.com/junegunn/fzf
[2]: https://github.com/sharkdp/fd
[3]: https://github.com/sharkdp/bat
[4]: https://github.com/sharkdp/exa
[5]: https://github.com/dandavison/delta
[6]: https://github.com/denisidoro/navi
[7]: https://github.com/sharkdp/hexyl
[8]: https://github.com/sharkdp/hyperfine
[9]: https://github.com/sharkdp/vivid
[10]: https://github.com/docker/compose
[11]: https://github.com/neovim/neovim
[12]: https://github.com/direnv/direnv
[13]: https://github.com/mvdan/sh
[14]: https://github.com/Peltoche/lsd
[15]: https://github.com/b4b4r07/gotcha
[16]: https://github.com/zdharma/revolver
[100]: /docs/getting_started/overview/#about-asprogram
[101]: /docs/getting_started/overview/#turbo--lucid
[102]: /docs/guides/syntax/for
[103]: /docs/guides/syntax/common#the-make-syntax
[104]: /docs/guides/syntax/ice
[105]: /docs/guides/syntax/ice-modifiers
[106]: /docs/guides/syntax/common#compiling-programs
[107]: /docs/guides/customization#customizing-paths
[108]: /ecosystem/annexes/bin-gem-node#the-ice-modifiers-provided-by-the-annex
[ytdl-org/youtube-dl]: https://github.com/ytdl-org/youtube-dl
