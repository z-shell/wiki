---
id: programs
title: '🔺 Programs'
description: The Collection of Programs
keywords: [collection, programs]
---

:::info

Related:

1. [Overview: as'program'][100]
2. [Turbo and Lucid][101]
3. [The `for` syntax][102]
4. [The `make` syntax][103]
5. [Ice Syntax][104]
6. [Ice Modifiers][105]
7. [Compiling programs][106]
8. [Customizing paths][107]
9. [The Ice modifiers by `bin-gem-node` annex][108]

:::

:::tip

You can create your own syntax e.g:

> - The ver'master' - allows to select specific version or branch.
> - It's optional and can be removed if not required.

```shell
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

```shell
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

```shell
zi ice wait lucid as'program' from'gh-r' sbin'**/delta -> delta'
zi light dandavison/delta
```

### GH-R: [denisidoro/navi][6]

```shell
zi ice lucid wait as'program' from"gh-r" has'fzf'
zi light denisidoro/navi
```

### GH-R: [junegunn/fzf][1]

```shell
zi ice from'gh-r' as'program'
zi light @junegunn/fzf
```

### GH-R: [sharkdp/fd][2]

```shell
zi ice from'gh-r' as'program' mv'fd* fd' sbin'**/fd(.exe|) -> fd'
zi light @sharkdp/fd
```

### GH-R: [sharkdp/bat][3]

```shell
zi ice from'gh-r' as'program' mv'bat* bat' sbin'**/bat(.exe|) -> bat'
zi light @sharkdp/bat
```

### GH-R: [sharkdp/hexyl][7]

```shell
zi ice from'gh-r' as'program' mv'hexyl* hexyl' sbin'**/hexyl(.exe|) -> hexyl'
zi light @sharkdp/hexyl
```

### GH-R: [sharkdp/hyperfine][8]

```shell
zi ice from'gh-r' as'program' mv"hyperfine* hyperfine" sbin"**/hyperfine(.exe|) -> hyperfine"
zi light @sharkdp/hyperfine
```

### GH-R: [sharkdp/vivid][9]

```shell
zi ice from'gh-r' as'program' mv'vivid* vivid' sbin'**/vivid(.exe|) -> vivid'
zi light @sharkdp/vivid
```

### GH-R: [ogham/exa][4]

```shell
zi ice from'gh-r' as'program' sbin'**/exa -> exa' atclone'cp -vf completions/exa.zsh _exa'
zi light ogham/exa
```

### GH-R: [docker/compose][10]

```shell
zi ice from"gh-r" as'program' mv'docker* -> docker-compose'
zi light docker/compose
```

### GH-R: [neovim/neovim][11]

```shell
zi ice as'program' bpick'${bpick}' from'gh-r' sbin'**/bin/nvim -> nvim'
zi light neovim/neovim
```

### GH-R: [direnv/direnv][12]

```shell
zi ice as'program' from'gh-r' mv'direnv* -> direnv'
zi light direnv/direnv
```

### GH-R: [mvdan/sh][13]

```shell
zi ice as'program' from'gh-r' mv'shfmt* -> shfmt'
zi light mvdan/sh
```

### GH-R: [b4b4r07/gotcha](https://github.com/b4b4r07/gotcha) {#gh-r-b4b4r07gotcha}

```shell
zi ice as'program' from'gh-r' mv'gotcha_* -> gotcha'
zi light b4b4r07/gotcha
```

### SC: [molovo/revolver](https://github.com/molovo/revolver) {#sc-molovorevolver}

```shell
zi ice wait lucid as'program' pick'revolver'
zi light molovo/revolver
```

### SC: [zunit-zsh/zunit](https://github.com/zunit-zsh/zunit) {#sc-zunit-zshzunit}

```shell
zi ice wait lucid as'program' pick'zunit' atclone'./build.zsh' atpull'%atclone'
zi load @zunit-zsh/zunit
```

### SC: [Osse/git-scripts/git-unique](https://github.com/Osse/git-scripts/blob/master/git-unique) {#sc-ossegit-scriptsgit-unique}

```shell
zi ice as'program' id-as'git-unique' pick'git-unique'
zi snippet https://github.com/Osse/git-scripts/blob/master/git-unique
```

### SC: [mfaerevaag/wd](https://github.com/mfaerevaag/wd) {#sc-mfaerevaagwd}

```shell
zi ice wait lucid as'program' cp'wd.sh -> wd' mv'_wd.sh -> _wd' atpull'!git reset --hard' pick'wd'
zi light mfaerevaag/wd
```

### SC: [z-shell/zsh-diff-so-fancy](https://github.com/z-shell/zsh-diff-so-fancy) {#sc-z-shellzsh-diff-so-fancy}

```shell
zi ice wait lucid as'program' pick'bin/git-dsf'
zi load z-shell/zsh-diff-so-fancy
```

### SC: [obihann/archey-osx](https://github.com/obihann/archey-osx) {#sc-obihannarchey-osx}

```shell
zi ice wait lucid as'program' pick'bin/archey'
zi light obihann/archey-osx
```

### SC: [eth-p/bat-extras](https://github.com/eth-p/bat-extras) {#sc-eth-pbat-extras}

```shell
zi ice lucid wait as'program' has'bat' pick'src/*'
zi light eth-p/bat-extras
```

### SC: [paulirish/git-open](https://github.com/paulirish/git-open) {#sc-paulirishgit-open}

```shell
zi ice lucid wait as'program' has'git' atclone"cp git-open.1.md $ZPFX/man/man1/git-open.1" atpull'%atclone'
zi light paulirish/git-open
```

### SC: [LuRsT/hr](https://github.com/LuRsT/hr) {#sc-lursthr}

```shell
zi ice lucid wait as'program' atclone"cp hr.1 $ZPFX/man/man1" atpull'%atclone'
zi light LuRsT/hr
```

### SC: [z-shell/imgur-album-downloader](https://github.com/z-shell/imgur-album-downloader) {#sc-z-shellimgur-album-downloader}

```shell
zi ice lucid wait as'program' has'python3' pick'imguralbum.py'
zi light z-shell/imgur-album-downloader
```

### SC: [Seirdy/stpv](https://github.com/Seirdy/stpv) {#sc-seirdystpv}

```shell
zi ice lucid wait as'program' has'fzf' pick'fzfp'
zi light Seirdy/stpv
```

```shell
zi ice lucid wait as'program' has'ueberzug' pick'stpvimg'
zi light Seirdy/stpv
```

```shell
zi ice lucid wait as'program' pick'stpv'
zi light Seirdy/stpv
```

### SC: [exiftool/exiftool](https://github.com/exiftool/exiftool) {#sc-exiftoolexiftool}

```shell
zi ice lucid wait as'program' has'perl' has'convert' pick'exiftool'
zi light exiftool/exiftool
```

### SC: [smxi/inxi](https://github.com/smxi/inxi) {#sc-smxiinxi}

```shell
if [ -z "$SSH_CONNECTION" ]; then
  zi ice lucid wait as'program' has'perl' pick'inxi'
  zi light smxi/inxi
fi
```

### SC: [dylanaraps/pash](https://github.com/dylanaraps/pash) {#sc-dylanarapspash}

```shell
zi ice lucid wait as'program' has'gpg'
zi light dylanaraps/pash
```

### SC: [hackerb9/lsix](https://github.com/hackerb9/lsix) {#sc-hackerb9lsix}

```shell
zi ice lucid wait as'program' has'mogrify'
zi light hackerb9/lsix
```

### SC: [denilsonsa/prettyping](https://github.com/denilsonsa/prettyping) {#sc-denilsonsaprettyping}

```shell
zi ice lucid wait as'program' pick'prettyping' has'ping'
zi light denilsonsa/prettyping
```

### SC: [greymd/tmux-xpanes](https://github.com/greymd/tmux-xpanes) {#sc-greymdtmux-xpanes}

```shell
zi ice lucid wait as'program' has'tmux' pick'bin/xpanes'
zi light greymd/tmux-xpanes
```

### SC: [DanielG/dxld-mullvad/blob/master/am-i-mullvad.sh](https://github.com/DanielG/dxld-mullvad/blob/master/am-i-mullvad.sh)

```shell
zi ice lucid wait as'program' has'jq'
zi snippet 'https://github.com/DanielG/dxld-mullvad/blob/master/am-i-mullvad.sh'
```

### B: [abishekvashok/cmatrix](https://github.com/abishekvashok/cmatrix/)

```shell
# Regular syntax
zi ice lucid as'program' atclone"autoreconf -i && PREFIX=$ZPFX ./configure" \
  atpull'%atclone' pick"$ZPFX/cmatrix" make"PREFIX=$ZPFX"
zi light abishekvashok/cmatrix
```

```shell
# With the for syntax
zi for as'program' atclone"autoreconf -i && PREFIX=$ZPFX ./configure" \
  atpull'%atclone' pick"$ZPFX/cmatrix" make"PREFIX=$ZPFX" abishekvashok/cmatrix
```

### B: [tj/git-extras](https://github.com/tj/git-extras)

```shell
zi ice wait lucid as'program' pick'$ZPFX/bin/git-*' make'PREFIX=$ZPFX' nocompile
zi light tj/git-extras
```

### B: [k4rthik/git-cal](https://github.com/k4rthik/git-cal)

```shell
zi ice wait lucid as'program' atclone'perl Makefile.PL PREFIX=$ZPFX' atpull'%atclone' make'install' pick'$ZPFX/bin/git-cal'
zi light k4rthik/git-cal
```

### B: [aaronNG/reddio](https://gitlab.com/aaronNG/reddio)

```shell
zi ice lucid wait as'program' has'jq' pick'reddio' from'gitlab'
zi light aaronNG/reddio
```

### B: [TheLocehiliosan/yadm](https://github.com/TheLocehiliosan/yadm)

```shell
zi ice lucid wait as'program' has'git' pick'yadm' atclone"cp yadm.1 $ZPFX/man/man1" atpull'%atclone'
zi light TheLocehiliosan/yadm
```

### B: [sdushantha/farge](https://github.com/sdushantha/farge)

```shell
if [ -n "$WAYLAND_DISPLAY" ]; then
  zi ice lucid wait as'program' pick'farge'
  zi light 'sdushantha/farge'
fi
```

### B: [dylanaraps/neofetch](https://github.com/dylanaraps/neofetch)

```shell
zi ice lucid wait as'program' pick'neofetch' atclone"cp neofetch.1 $ZPFX/man/man1" atpull'%atclone'
zi light dylanaraps/neofetch
```

### B: [vim/vim](https://github.com/vim/vim)

```shell
zi ice as'program' atclone'rm -f src/auto/config.cache; ./configure' \
  atpull'%atclone' make pick'src/vim'
zi light vim/vim
```

### B: [direnv/direnv](https://github.com/direnv/direnv)

```shell
zi ice as'program' make'!' atclone'./direnv hook zsh > zhook.zsh' atpull'%atclone' src'zhook.zsh'
zi light direnv/direnv
```

### B: [mptre/yank](https://github.com/mptre/yank)

```shell
zi ice as'program' pick'yank' make
zi light mptre/yank
```

### B: [pyenv/pyenv](https://github.com/pyenv/pyenv) {#b-pyenvpyenv}

```shell
zi ice atclone'PYENV_ROOT="$PWD" ./libexec/pyenv init - > zpyenv.zsh' \
  atinit'export PYENV_ROOT="$PWD"' atpull"%atclone" \
  as'program' pick'bin/pyenv' src"zpyenv.zsh" nocompile'!'
zi light pyenv/pyenv
```

### B: [sdkman/sdkman-cli](https://github.com/sdkman/sdkman-cli) {#b-sdkmansdkman-cli}

```shell
zi ice as'program' pick'$ZPFX/sdkman/bin/sdk' id-as'sdkman' run-atpull \
  atclone'curl -s "https://get.sdkman.io?rcupdate=false" -o scr.sh; SDKMAN_DIR=$ZPFX/sdkman bash scr.sh' \
  atpull'SDKMAN_DIR=$ZPFX/sdkman sdk selfupdate' \
  atinit'export SDKMAN_DIR=$ZPFX/sdkman; source $ZPFX/sdkman/bin/sdkman-init.sh'
zi light z-shell/null
```

### B: [asciinema/asciinema](https://github.com/asciinema/asciinema) {#b-asciinemaasciinema}

```shell
zi ice as"program" wait lucid atinit"export PYTHONPATH=$ZPFX/lib/python3.10/site-packages/" \
  atclone"PYTHONPATH=$ZPFX/lib/python3.10/site-packages/ python3 setup.py --quiet install --prefix $ZPFX" \
  atpull"%atclone" test"0" pick"$ZPFX/bin/asciinema"
zi load asciinema/asciinema
```

### RA: Rust and [Peltoche/lsd](https://github.com/Peltoche/lsd) {#ra-rust-and-peltochelsd}

```shell
zi ice rustup cargo"!lsd"
zi load z-shell/null
```

### RA: Rust and [ogham/exa](https://github.com/ogham/exa) {#ra-rust-and-oghamexa}

```shell
# the `ls' shim exposing the `exa' binary
zi ice rustup cargo"!exa -> ls"
zi load z-shell/null
```

```shell
# shim with standard error redirected to /dev/null
zi ice rustup cargo"!E:exa"
zi load z-shell/null
```

### RA: Rust and [ogham/exa][4], [Peltoche/lsd][14]

```shell
zi ice rustup cargo"exa;lsd"
zi load z-shell/null
```

```shell
# exposes their binaries by altering $PATH
zi ice rustup cargo'exa;lsd' as"program" pick"bin/(exa|lsd)"
zi load z-shell/null
```

## With [`for`][102] syntax

### GH-R: [argoproj/argo-cd](https://github.com/argoproj/argo-cd) {#gh-r-argoprojargo-cd}

```shell
zi light-mode for \
  as'completions' atclone'./argocd* completion zsh > _argocd' \
  atpull'%atclone' from'gh-r' if'[[ "$(uname -m)" == x86_64 ]]' \
  sbin'argocd* -> argocd' \
    argoproj/argo-cd
```

### GH-R: [junegunn/fzf](https://github.com/junegunn/fzf) + grab extras {#gh-r-junegunnfzf--grab-extras}

```shell
zi for \
  atclone'mkdir -p $ZPFX/{bin,man/man1}' atpull'%atclone' \
  from'gh-r' dl'
      https://raw.githubusercontent.com/junegunn/fzf/master/shell/completion.zsh -> _fzf_completion;
      https://raw.githubusercontent.com/junegunn/fzf/master/shell/key-bindings.zsh -> key-bindings.zsh;
      https://raw.githubusercontent.com/junegunn/fzf/master/man/man1/fzf-tmux.1 -> $ZPFX/man/man1/fzf-tmux.1;
      https://raw.githubusercontent.com/junegunn/fzf/master/man/man1/fzf.1 -> $ZPFX/man/man1/fzf.1' \
  id-as'junegunn/fzf' nocompile pick'/dev/null' sbin'fzf' src'key-bindings.zsh' \
    @junegunn/fzf
```

### GH-R: [junegunn/fzf][1], [sharkdp/fd][2], [sharkdp/bat][3], [ogham/exa][4]

```shell
zi from"gh-r" as"null" for \
  sbin"fzf" junegunn/fzf \
  sbin"**/fd" @sharkdp/fd \
  sbin"**/bat" @sharkdp/bat \
  sbin"**/exa -> exa" atclone"cp -vf completions/exa.zsh _exa" ogham/exa
```

### SC: [molovo/revolver](https://github.com/molovo/revolver), [zunit-zsh/zunit](https://github.com/zunit-zsh/zunit)

```shell
zi wait lucid for \
  as'program' atclone'ln -sfv revolver.zsh-completion _revolver' \
  atpull'%atclone' pick'revolver' \
    @molovo/revolver \
  as'completion' atclone'./build.zsh; ln -sfv zunit.zsh-completion _zunit' \
  atpull'%atclone' sbin'zunit' \
    @zunit-zsh/zunit
```

### GH-R: [yarnpkg/yarn](https://github.com/yarnpkg/yarn)

```shell
zi light-mode for from'gh-r' as'program' \
  atinit'export PATH="$HOME/.yarn/bin:$PATH"' mv'yarn* -> yarn' pick"yarn/bin/yarn" bpick'*.tar.gz' \
    yarnpkg/yarn
```

### SC: [tj/n](https://github.com/tj/n)

```shell
zi light-mode for as'program' atinit'export N_PREFIX="$HOME/n"; \
[[ :$PATH: == *":$N_PREFIX/bin:"* ]] || PATH+=":$N_PREFIX/bin"' pick"bin/n" \
    tj/n
```

### B: [jarun/nnn](https://github.com/jarun/nnn)

```shell
zi pick"misc/quitcd/quitcd.zsh" sbin make light-mode for jarun/nnn
```

### RA: Rust compiler environment

```shell
# Just install rust and make it available globally in the system
zi ice id-as"rust" wait"0" lucid rustup as"program" pick"bin/rustc" atload="export \
CARGO_HOME=\$PWD RUSTUP_HOME=\$PWD/rustup"
zi load z-shell/null
```

```shell
# More complex installation.
zi id-as"rust" wait=1 as=null sbin="bin/*" lucid rustup \
  atload="[[ ! -f ${ZI[COMPLETIONS_DIR]}/_cargo ]] && zi creinstall -q rust; \
export CARGO_HOME=\$PWD; export RUSTUP_HOME=\$PWD/rustup" for \
  z-shell/null
```

[1]: https://github.com/junegunn/fzf
[2]: https://github.com/shakrdp/fd
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
[100]: /docs/getting_started/overview#asprogram
[101]: /docs/getting_started/overview#turbo-and-lucid
[102]: /docs/guides/syntax/for
[103]: /docs/guides/syntax/common#the-make-syntax
[104]: /docs/guides/syntax/ice
[105]: /docs/guides/syntax/ice-modifiers
[106]: /docs/gallery/collection#compiling-programs
[107]: /docs/guides/customization#customizing-paths
[108]: /docs/ecosystem/annexes/bin-gem-node#the-ice-modifiers-provided-by-the-annex
