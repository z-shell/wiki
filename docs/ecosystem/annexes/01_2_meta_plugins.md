---
id: meta-plugins
title: 💠 Meta Plugins
image: zw/logo/320x320.png
description: Annex - meta plugins documentation
keywords: [annex, meta-plugins]
---

import APITable from '@site/src/components/APITable';

- [z-a-meta-plugins](https://github.com/z-shell/z-a-meta-plugins) annex have the curated, optimal
  [ice](/docs/guides/syntax/ice) lists automatically applied.

- It's possible to create your own group of plugins by requesting it at [annexes](https://github.com/z-shell/zannexes)
  repository.

:::info

- Before using meta plugins, a meta plugins annex have to be installed. (`zi light-mode for z-a-meta-plugins`)
- Prefix `@` used to avoid syntax conflicts. Example: `zi light-mode for @<meta-plugin-name>`
- Before installing any plugin visit original repository where available to verify that system is supported and meets
  other requirements.

:::

## Install meta plugins

:::note

To be able to use meta plugins, the annex has to be installed:

```shell
zi light z-shell/z-a-meta-plugins
```

Install annex meta plugins and a group of plugins with the same command:

```shell
zi light-mode for z-a-meta-plugins @annexes @ext-git @zsh-users
```

:::

Following commands are examples of installing meta plugins:

```shell
zi light @annexes
```

```shell
zi light-mode for @annexes @zsh-users @console-tools
```

```shell
zi light-mode for @annexes skip'zsh-completions' @zsh-users \
skip'vivid exa tig' @console-tools
```

## The list of available meta-plugins

<!--markdownlint-disable MD013 -->

<APITable>

| Meta plugin name | Consisting plugins                                                                                                                      |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| @annexes         | [bin-gem-node][1], [readurl][2], [patch-dl][3], [rust][4]                                                                               |
| @annexes+rec     | @annexes + [submods][5], [unscope][6]                                                                                                   |
| @annexes+add     | @annexes+rec + [default-ice][7], [test][8]                                                                                              |
| @annexes+con     | @annexes + [zi-console][9]                                                                                                              |
| @z-shell         | [F-Sy-H][10], [H-S-MW][11], [zsh-diff-so-fancy][12]                                                                                     |
| @z-shell2        | [zconvey][13], [zui][14], [zflai][15]                                                                                                   |
| @zsh-users       | [zsh-syntax-highlighting][16], [zsh-autosuggestions][17], [zsh-completions][18]                                                         |
| @zsh-users+fast  | [F-Sy-H][10], [zsh-autosuggestions][17], [zsh-completions][18]                                                                          |
| @romkatv         | [powerlevel10k][19]                                                                                                                     |
| @molovo          | [color][20], [revolver][21], [zunit][22]                                                                                                |
| @sharkdp         | [fd][23], [bat][24], [hexyl][25], [hyperfine][26], [vivid][27]                                                                          |
| @developer-tools | [color][20], [revolver][21], [zunit][22], [gitignore.plugin.zsh][28], [tig][29]                                                         |
| @console-tools   | [dircolors-material][30] (package), [fd][23], [bat][24], [hexyl][25], [hyperfine][26], [vivid][27], [exa][31], [ripgrep][32], [tig][29] |
| @fuzzy           | [fzf][33] (package), [fzy][34] (package), [skim][35], [peco][36]                                                                        |
| @fuzzy-src       | fzf-go, [fzy][z-shell/fzy], skim-cargo, peco-go                                                                                         |
| @ext-git         | [git-open][37], [git-recent][38], [git-my][39], [git-quick-stats][40], [git-now][41], [git-extras][42], [forgit][43]                    |
| @rust-utils      | rust-toolchain, cargo-extensions                                                                                                        |
| @py-utils        | [pyenv][44] (package)                                                                                                                   |
| @prezto          | PZTM::archive, PZTM::directory, PZTM::utility                                                                                           |

</APITable>

<!-- markdownlint-disable MD013 -->

---

## Meta Plugins Summary

It consumes time to:

- Constantly, over and over collect some new interesting plugins to install/load.
- Over and over reconstruct the new findings on the new machines.
- Constantly extend and tweak the ice list of each plugin, so that it's hard on the eyes, especially for an outsider.

|                        Problem                        | Solution                                                                                                                                                                                                                                                                           |
| :---------------------------------------------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|               (1) _finding new plugins_               | the annex contains a curated, broad list of plugins, e.g.: all the console tools like `fd`, `fzf`, `exa`, `ripgrep`, etc.,                                                                                                                                                         |
| (2) _reconstructing the findings in new environments_ | it's easy to say and memorize e.g.: `zi for console-tools` – one label pulls a group of plugins and also the curated, optimal, default ice lists for each of them,                                                                                                                 |
| (3) _constant increase of complexity of the commands_ | the provided, hopefully, best/optimal ices for each plugin are handled transparently and automatically; care is given to each ice list so that the plugin loads without any glitches (e.g.: without "No files for compilation found." message and other, even such slight issues). |

Other unique benefits of the meta plugins annex:

|                           Benefit                           | Description                                                                                                                                                                                                                                                                                                     |
| :---------------------------------------------------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                     Plugin dependencies                     | The meta plugins implement a dependency mechanism: selecting a from-source built [ogham/exa][31] will automatically pull-in also the Rust compiler (available under meta-plugin name: `rust-toolchain`).                                                                                                        |
| Flexible disabling of chosen sub-plugins in any meta-plugin | A meta-plugin can contain many sub-plugins and it's possible to skip installing some of them by the **skip'plg-1 plg-2…'** ice, e.g.: `zi skip'ripgrep fd' for console-tools`. This way despite that some of the meta plugins are broad the user still has control over what's and how much is being installed. |
|               Common from-source meta plugins               | For the plugins that provide the binary programs it is often the case that a meta-plugin exists that'll build the program from source (e.g.: **fuzzy** meta-plugin and its **fuzzy-src** counterpart). This might be handy e.g.: if there's no binary for our machine.                                          |

<img src="https://raw.githubusercontent.com/z-shell/z-a-meta-plugins/main/images/fuzzy-mplg-ex.png" alt="screenshot" width="90%" />

<!-- END meta-plugins -->

[1]: https://github.com/z-shell/z-a-bin-gem-node
[2]: https://github.com/z-shell/z-a-readurl
[3]: https://github.com/z-shell/z-a-patch-dl
[4]: https://github.com/z-shell/z-a-rust
[5]: https://github.com/z-shell/z-a-submods
[6]: https://github.com/z-shell/z-a-unscope
[7]: https://github.com/z-shell/z-a-default-ice
[8]: https://github.com/z-shell/z-a-test
[9]: https://github.com/z-shell/zi-console
[10]: https://github.com/z-shell/F-Sy-H
[11]: https://github.com/z-shell/H-S-MW
[12]: https://github.com/z-shell/zsh-diff-so-fancy
[13]: https://github.com/z-shell/zconvey
[14]: https://github.com/z-shell/zui
[15]: https://github.com/z-shell/zflai
[16]: https://github.com/zsh-users/zsh-syntax-highlighting
[17]: https://github.com/zsh-users/zsh-autosuggestions
[18]: https://github.com/zsh-users/zsh-completions
[19]: https://github.com/romkatv/powerlevel10k
[20]: https://github.com/molovo/revolver
[21]: https://github.com/molovo/color
[22]: https://github.com/zunit-zsh/zunit
[23]: https://github.com/sharkdp/fd
[24]: https://github.com/sharkdp/bat
[25]: https://github.com/sharkdp/hexyl
[26]: https://github.com/sharkdp/hyperfine
[27]: https://github.com/sharkdp/vivid
[28]: https://github.com/voronkovich/gitignore.plugin.zsh
[29]: https://github.com/jonas/tig
[30]: https://github.com/z-shell/dircolors-material
[31]: https://github.com/ogham/exa
[32]: https://github.com/BurntSushi/ripgrep
[33]: https://github.com/z-shell/fzf
[34]: https://github.com/z-shell/fzy
[35]: https://github.com/lotabout/skim
[36]: https://github.com/peco/peco
[37]: https://github.com/paulirish/git-open
[38]: https://github.com/paulirish/git-recent
[39]: https://github.com/davidosomething/git-my
[40]: https://github.com/arzzen/git-quick-stats
[41]: https://github.com/iwata/git-now
[42]: https://github.com/tj/git-extras
[43]: https://github.com/wfxr/forgit
[44]: https://github.com/z-shell/pyenv
