---
id: meta-plugins
title: "🌀 Meta Plugins"
image: /img/logo/320x320.png
description: Annex meta-plugins documentation
keywords:
  - annex
  - zsh-plugins
  - meta-plugins
  - optimised-zsh-plugins
---

<!-- @format -->

import Image from '@theme/IdealImage';

## <i class="fa-brands fa-github"></i> [z-shell/z-a-meta-plugins][]

An annex has the curated, optimal [ice][46] lists automatically applied. For more details refer to [z-a-meta-plugins.plugin.zsh][] file.

- To create your group of plugins as meta-plugins propose them in a new [issue][47].

:::info

- Before using meta plugins, a meta plugins annex have to be installed. (`zi light-mode for z-a-meta-plugins`)
- Prefix `@` used to avoid syntax conflicts. E.g: `zi light-mode for @<meta-plugin-name>`
- Before installing any plugin visit the original repository where available to verify that system is supported and meets other requirements.

:::

## Install meta-plugins

:::note

To be able to use meta plugins, the annex has to be installed:

```shell
zi light z-shell/z-a-meta-plugins
```

Install annex meta plugins and a group of plugins with the same command:

```shell showLineNumbers
zi light-mode for z-a-meta-plugins \
  @annexes @ext-git @zsh-users
```

:::

The following commands are examples of installing meta plugins:

```shell
zi light @annexes
```

```shell
zi light-mode for @annexes @zsh-users @console-tools
```

```shell showLineNumbers
zi light-mode for @annexes \
  skip'zsh-completions' @zsh-users \
  skip'vivid exa tig' @console-tools
```

## Available meta-plugins

<div class="table-responsive">

| Meta plugin name | Consisting plugins                                                                                                                      |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| @annexes         | [bin-gem-node][1], [readurl][2], [patch-dl][3], [rust][4], [default-ice][7], [unscope][6]                                               |
| @annexes+        | @annexes + [submods][5], [test][8]                                                                                                      |
| @z-shell         | [F-Sy-H][10], [H-S-MW][11], [zsh-diff-so-fancy][12], [z-shell/zsh-select][49]                                                           |
| @z-shell+        | [zconvey][13], [zui][14], [zflai][15]                                                                                                   |
| @zsh-users       | [zsh-syntax-highlighting][16], [zsh-autosuggestions][17], [zsh-completions][18]                                                         |
| @zsh-users+fast  | [F-Sy-H][10], [zsh-autosuggestions][17], [zsh-completions][18]                                                                          |
| @romkatv         | [powerlevel10k][19]                                                                                                                     |
| @zunit           | [color][20], [revolver][21], [zunit][22]                                                                                                |
| @sharkdp         | [fd][23], [bat][24], [hexyl][25], [hyperfine][26], [vivid][27]                                                                          |
| @developer-tools | [color][20], [revolver][21], [zunit][22], [gitignore.plugin.zsh][28], [tig][29]                                                         |
| @console-tools   | [dircolors-material][30] (package), [fd][23], [bat][24], [hexyl][25], [hyperfine][26], [vivid][27], [exa][31], [ripgrep][32], [tig][29] |
| @fuzzy           | [fzf][33] (package), [fzy][34] (package), [skim][35], [peco][36]                                                                        |
| @fuzzy-src       | fzf-go, [fzy][34], skim-cargo, peco-go                                                                                                  |
| @ext-git         | [git-open][37], [git-recent][38], [git-my][39], [git-quick-stats][40], [git-now][41], [git-extras][42], [forgit][43]                    |
| @rust-utils      | rust-toolchain, cargo-extensions                                                                                                        |
| @py-utils        | [pyenv][44] (package)                                                                                                                   |
| @prezto          | PZTM::archive, PZTM::directory, PZTM::utility                                                                                           |

</div>

## 摘要

It consumes time to:

- Constantly, over and over collect some new interesting plugins to install/load.
- Over and over reconstruct the new findings on the new machines.
- Constantly extend and tweak the ice list of each plugin, so that it's hard on the eyes, especially for an outsider.

<div className="apitable">

| Problem                                               | Solution                                                                                                                                                                                                                                                                               |
| :---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (1) _finding new plugins_                             | The annex contains a curated, broad list of plugins, e.g.: all the console tools like `fd`, `fzf`, `exa`, `ripgrep`, etc.,                                                                                                                                                             |
| (2) _reconstructing the findings in new environments_ | It's easy to say and memorize e.g.: `zi for console-tools` – one label pulls a group of plugins and also the curated, optimal, default ice lists for each of them,                                                                                                                     |
| (3) _constant increase of complexity of the commands_ | The provided, hopefully, best/optimal ices for each plugin are handled transparently and automatically; care is given to each ice list so that the plugin loads without any glitches (e.g.: without the "No files for compilation found." message and other, even such slight issues). |

</div>

Other unique benefits of the meta plugins annex:

<div className="apitable">

| Benefit                                                     | Description                                                                                                                                                                                                                                                                                                           |
| :---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Plugin dependencies                                         | The meta plugins implement a dependency mechanism: selecting a from-source built [ogham/exa][31] will automatically pull in also the Rust compiler (available under the meta-plugin name: `rust-toolchain`).                                                                                                          |
| Flexible disabling of chosen sub-plugins in any meta-plugin | A meta-plugin can contain many sub-plugins and it's possible to skip installing some of them by the **skip'plugin-1 plugin-2…'** ice, e.g.: `zi skip'ripgrep fd' for console-tools`. This way despite that some of the meta plugins are broad the user still has control over what's and how much is being installed. |
| Common from-source meta plugins                             | For the plugins that provide the binary programs it is often the case that a meta-plugin exists that'll build the program from the source (e.g.: **fuzzy** meta-plugin and its **fuzzy-src** counterpart). This might be handy e.g.: if there's no binary for our machine.                                            |

</div>
<div className="ScreenView">
  <Image className="ImageView" img="https://raw.githubusercontent.com/z-shell/z-a-meta-plugins/main/docs/images/fuzzy-mplg-ex.png" alt="Meta plugins preview" />
</div>

<!-- end-of-file -->

[46]: /docs/guides/syntax/ice
[z-shell/z-a-meta-plugins]: https://github.com/z-shell/z-a-meta-plugins
[47]: https://github.com/z-shell/z-a-meta-plugins/issues/new
[z-a-meta-plugins.plugin.zsh]: https://github.com/z-shell/z-a-meta-plugins/blob/main/z-a-meta-plugins.plugin.zsh
