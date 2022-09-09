---
id: themes
title: "🔺 Themes"
image: /img/logo/320x320.png
description: The Collection of Themes
keywords:
  - collection
  - prompts
  - themes
---

<!-- @format -->

:::info Related

1. [Multiple prompts](/docs/guides/customization#multiple-prompts)
2. [Automatic load/unload based on condition](/docs/getting_started/overview#automatic-condition-based---load--unload)
3. [Ice `atclone`, `atpull`, `atinit`, `atload`](/docs/guides/syntax/ice#atclone-atpull-atinit-atload)

:::

:::tip

Zsh tweak - map colors to the nearest color in the available palette.

```shell
[[ $COLORTERM = *(24bit|truecolor)* ]] || zmodload zsh/nearcolor
```

:::

### THP: [romkatv/powerlevel10k](https://github.com/romkatv/powerlevel10k) {#thp-romkatv-powerlevel10k}

:::tip

Include at the top of `.zshrc` for powerlevel10k theme

```shell title="~/.zshrc" showLineNumbers
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi
```

:::

Install fonts for powerlevel10k. It has to match your system settings as this is an example of how flexible Zi is and can install anything in a preferred way.

The following snippet placed in the `.zshrc` file will:

- check if conditions are met to proceed with the install
- download, extract, clean not required files, and move fonts to the required directory.
- update font cache.

When running: `zi update` will:

- if an update is available, will update the fonts.
- repeat the install process to update fonts.

```shell
zi ice if"[[ -d ${HOME}/.fonts/ttf ]] && [[ $OSTYPE = linux* ]]" \
  id-as"meslo" from"gh-r" bpick"Meslo.zip" extract nocompile depth"1" \
  atclone="rm -f *Windows*; mv -vf *.ttf ${HOME}/.fonts/ttf/; fc-cache -v -f" atpull"%atclone"
zi light ryanoasis/nerd-fonts
```

Load prompt if the terminal has at least 256 colors.

```shell showLineNumbers
zi ice if"[ "${TERM##*-}" = '256color' ] || [ "${terminfo[colors]:?}" -gt 255 ]" depth=1
zi light romkatv/powerlevel10k
```

Oneliner:

```shell
zi ice depth=1; zi light romkatv/powerlevel10k
```

[meta-plugins](/ecosystem/annexes/meta-plugins) with configuration wizard disabled by default:

- Run manually: `p10k configure` (The file `~/.p10k.zsh` auto sourced if exists).

```shell
zi light-mode for @romkatv
```

After finishing the configuration wizard last question:

- "Apply changes to ~/.zshrc?" choose no - unless you know what you're doing.

```shell showLineNumbers
zi ice depth'1' atload"[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh" nocd
zi light romkatv/powerlevel10k
```

### THP: [ohmyzsh/robbyrussell](https://github.com/ohmyzsh/ohmyzsh/blob/master/themes/robbyrussell.zsh-theme)

```shell showLineNumbers
zi wait'!' lucid for OMZL::prompt_info_functions.zsh \
  OMZT::robbyrussell
```

### THP: [z-shell/zprompts](https://github.com/z-shell/zprompts)

```shell showLineNumbers
zi lucid for \
  atload"!promptinit; typeset -g PSSHORT=0; \
  prompt sprint3 yellow red green blue" nocd \
    z-shell/zprompts
```

### THP: [halfo/lambda-mod-zsh-theme](https://github.com/halfo/lambda-mod-zsh-theme)

```shell showLineNumbers
zi lucid for nocd \
  halfo/lambda-mod-zsh-theme
```

### THP: [geometry-zsh/geometry](https://github.com/geometry-zsh/geometry)

```shell showLineNumbers
zi lucid for atload"!geometry::prompt" \
  atinit"GEOMETRY_COLOR_DIR=63 GEOMETRY_PATH_COLOR=63" nocd \
    geometry-zsh/geometry
```

### THP: [sindresorhus/pure](https://github.com/sindresorhus/pure)

```shell showLineNumbers
zi lucid for pick"/dev/null" multisrc"{async,pure}.zsh" \
atload"!prompt_pure_precmd" nocd \
  sindresorhus/pure
```

Install as meta-plugin:

```shell
zi light-mode for @sindresorhus/pure
```

Personalised:

```shell showLineNumbers
zi light-mode for compile'(pure|async).zsh' pick'async.zsh' src'pure.zsh' atload" \
  PURE_GIT_UP_ARROW='↑'; PURE_GIT_DOWN_ARROW='↓'; PURE_PROMPT_SYMBOL='ᐳ'; PURE_PROMPT_VICMD_SYMBOL='ᐸ'; \
  zstyle ':prompt:pure:prompt:success' color 'green' \
  zstyle ':prompt:pure:git:action' color 'yellow'; \
  zstyle ':prompt:pure:git:branch' color 'blue'; \
  zstyle ':prompt:pure:git:dirty' color 'red'; \
  zstyle ':prompt:pure:path' color 'cyan'" \
    sindresorhus/pure
```

### THP: [agkozak/agkozak-zsh-prompt](https://github.com/agkozak/agkozak-zsh-prompt)

```shell showLineNumbers
zi lucid nocd atinit"AGKOZAK_COLORS_PROMPT_CHAR='magenta' AGKOZAK_MULTILINE=0 \
  AGKOZAK_PROMPT_CHAR=( ❯ ❯ ❮ ) AGKOZAK_USER_HOST_DISPLAY=0" for \
    agkozak/agkozak-zsh-prompt
```

Install as meta-plugin:

```shell
zi for @agkozak/agkozak-zsh-prompt
```

### THP: [chauncey-garrett/zsh-prompt-garrett](https://github.com/chauncey-garrett/zsh-prompt-garrett)

```shell showLineNumbers
zi ice atload"fpath+=( \$PWD );"
zi light chauncey-garrett/zsh-prompt-garrett

zi ice svn atload"prompt garrett" silent
zi snippet PZT::modules/prompt
```

### THP: [starship/starship](https://github.com/starship/starship)

```shell showLineNumbers
zi ice as"command" from"gh-r" \
  atclone"./starship init zsh > init.zsh; ./starship completions zsh > _starship" \
  atpull"%atclone" src"init.zsh"
zi light starship/starship
```

### THP: [robobenklein/zinc][robobenklein/zinc]

```shell showLineNumbers
zi ice wait'!' lucid nocompletions \
  compile"{zinc_functions/*,segments/*,zinc.zsh}" \
  atload'!prompt_zinc_setup; prompt_zinc_precmd'
zi load robobenklein/zinc
```

ZINC git info is already async, but if you want it even faster with [gitstatus][gitstatus] in turbo mode:

```shell showLineNumbers
zi ice wait'1' atload'zinc_optional_dependency_loaded'
zi load romkatv/gitstatus
```

[robobenklein/zinc]: https://github.com/robobenklein/zinc
[gitstatus]: https://github.com/romkatv/gitstatus
