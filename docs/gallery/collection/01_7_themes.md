---
id: themes
title: '🔺 Themes'
description: The Collection of Themes
keywords: [collection, themes, prompts]
---

:::info Related

1. [Multiple prompts](/docs/guides/customization#multiple-prompts)
2. [Automatic load/unload based on condition](/docs/getting_started/overview#automatic-loadunload-based-on-condition)
3. [Ice `atclone`, `atpull`, `atinit`, `atload`](/docs/guides/syntax/ice#atclone-atpull-atinit-atload)

:::

:::tip

Zsh tweak - map colours to the nearest colour in the available palette.

```shell
[[ $COLORTERM = *(24bit|truecolor)* ]] || zmodload zsh/nearcolor
```

:::

### THP: [romkatv/powerlevel10k](https://github.com/romkatv/powerlevel10k) {#thp-romkatvpowerlevel10k}

:::tip

Include at the top of `.zshrc` for powerlevel10k theme

```shell title="~/.zshrc"
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi
```

:::

```shell
# Load prompt if terminal has least 256 colors.
if [ "${TERM##*-}" = '256color' ] || [ "${terminfo[colors]:?}" -gt 255 ]; then
  zi ice depth=1; zi light romkatv/powerlevel10k
fi
```

Oneliner:

```shell
zi ice depth=1; zi light romkatv/powerlevel10k
```

Meta plugin with configuration wizard disbled by default:

- Run manually: `p10k configure`

```shell
zi light-mode for @romkatv
```

After finishing the configuration wizard last question:

- "Apply changes to ~/.zshrc?" choose no - unless you know what you're doing.

```shell
zi ice depth'1' atload"[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh" nocd
zi light romkatv/powerlevel10k
```

### THP: [ohmyzsh/robbyrussell](https://github.com/ohmyzsh/ohmyzsh/blob/master/themes/robbyrussell.zsh-theme) {#thp-ohmyzshrobbyrussell}

```shell
zi wait'!' lucid for OMZL::prompt_info_functions.zsh \
    OMZT::robbyrussell
```

### THP: [z-shell/zprompts](https://github.com/z-shell/zprompts) {#thp-z-shellzprompts}

```shell
zi lucid atload"!promptinit; typeset -g PSSHORT=0; \
prompt sprint3 yellow red green blue" nocd for \
    z-shell/zprompts
```

### THP: [halfo/lambda-mod-zsh-theme](https://github.com/halfo/lambda-mod-zsh-theme) {#thp-halfolambda-mod-zsh-theme}

```shell
zi lucid nocd for \
    halfo/lambda-mod-zsh-theme
```

### THP: [geometry-zsh/geometry](https://github.com/geometry-zsh/geometry) {#thp-geometry-zshgeometry}

```shell
zi lucid atload"!geometry::prompt" nocd \
atinit"GEOMETRY_COLOR_DIR=63 GEOMETRY_PATH_COLOR=63" for \
    geometry-zsh/geometry
```

### THP: [sindresorhus/pure](https://github.com/sindresorhus/pure) {#thp-sindresorhuspure}

```shell
zi lucid pick"/dev/null" multisrc"{async,pure}.zsh" atload"!prompt_pure_precmd" nocd for \
    sindresorhus/pure
```

```shell
# Install as meta plugin
zi light-mode for @sindresorhus/pure
```

```shell
# Personalised
zi light-mode for compile'(pure|async).zsh' pick'async.zsh' src'pure.zsh' atload" \
  PURE_GIT_UP_ARROW='↑'; PURE_GIT_DOWN_ARROW='↓'; PURE_PROMPT_SYMBOL='ᐳ'; PURE_PROMPT_VICMD_SYMBOL='ᐸ'; \
  zstyle ':prompt:pure:prompt:success' color 'green' \
  zstyle ':prompt:pure:git:action' color 'yellow'; \
  zstyle ':prompt:pure:git:branch' color 'blue'; \
  zstyle ':prompt:pure:git:dirty' color 'red'; \
  zstyle ':prompt:pure:path' color 'cyan'" \
    sindresorhus/pure
```

### THP: [agkozak/agkozak-zsh-prompt](https://github.com/agkozak/agkozak-zsh-prompt) {#thp-agkozakagkozak-zsh-prompt}

```shell
zi lucid nocd atinit"AGKOZAK_COLORS_PROMPT_CHAR='magenta' AGKOZAK_MULTILINE=0 \
AGKOZAK_PROMPT_CHAR=( ❯ ❯ ❮ ) AGKOZAK_USER_HOST_DISPLAY=0" for \
    agkozak/agkozak-zsh-prompt
```

```shell
# Install as meta plugin
zi for @agkozak/agkozak-zsh-prompt
```

### THP: [chauncey-garrett/zsh-prompt-garrett](https://github.com/chauncey-garrett/zsh-prompt-garrett) {#thp-chauncey-garrettzsh-prompt-garrett}

```shell
zi ice atload"fpath+=( \$PWD );"
zi light chauncey-garrett/zsh-prompt-garrett

zi ice svn atload"prompt garrett" silent
zi snippet PZT::modules/prompt
```

### THP: [starship/starship](https://github.com/starship/starship) {#thp-starshipstarship}

```shell
zi ice as"command" from"gh-r" \
  atclone"./starship init zsh > init.zsh; ./starship completions zsh > _starship" \
  atpull"%atclone" src"init.zsh"
zi light starship/starship
```

### THP: [robobenklein/zinc](https://github.com/robobenklein/zinc) {#thp-robobenkleinzinc}

```shell
zi ice wait'!' lucid nocompletions \
  compile"{zinc_functions/*,segments/*,zinc.zsh}" \
  atload'!prompt_zinc_setup; prompt_zinc_precmd'
zi load robobenklein/zinc

# ZINC git info is already async, but if you want it
# even faster with gitstatus in Turbo mode: https://github.com/romkatv/gitstatus
zi ice wait'1' atload'zinc_optional_depenency_loaded'
zi load romkatv/gitstatus
```
