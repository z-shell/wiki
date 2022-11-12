---
id: meta-plugins
title: "🌀 Meta Plugins"
image: /img/png/theme/z/320x320.png
description: Annex meta-plugins documentation
keywords:
  - annex
  - zsh-plugins
  - meta-plugins
  - optimized-zsh-plugins
---

<!-- @format -->

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import Link from '@docusaurus/Link'; import APITable from '@site/src/components/APITable';

An annex has the curated, optimal [ice-modifiers][] lists automatically applied. For more details refer to [z-a-meta-plugins.plugin.zsh][] file.

:::tip

- To create your group of plugins as meta-plugins propose them in a new [issue][issues/new]
- Prefix `@` used to avoid syntax conflicts, e.g: `zi light @<meta-plugin-name>`
- Before installing any plugin visit the original repository where available to verify that system is supported and meets other requirements

:::

## Usage of meta-plugins

The following snippets are examples of how to install meta-plugins:

```shell
zi light @annexes
```

```shell
zi light-mode for @annexes @zsh-users @console-tools
```

```shell showLineNumbers
zi light-mode for z-a-meta-plugins \
  @annexes @ext-git @zsh-users
```

```shell showLineNumbers
zi light-mode for @annexes \
  skip'zsh-completions' @zsh-users \
  skip'vivid exa tig' @console-tools
```

## Available meta-plugins

```mdx-code-block
<APITable>
```

| Meta-plugin name | Consisting plugins                                                                                                    |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| @annexes         | [bin-gem-node][], [readurl][], [patch-dl][], [rust][], [default-ice][], [unscope][]                                   |
| @annexes+        | @annexes + [submods][], [test][]                                                                                      |
| @console-tools   | [dircolors-material][] (package), [fd][], [bat][], [hexyl][], [hyperfine][], [vivid][], [exa][], [ripgrep][], [tig][] |
| @developer-tools | [color][], [revolver][], [zunit][], [gitignore.plugin.zsh][], [tig][]                                                 |
| @ext-git         | [git-open][], [git-recent][], [git-my][], [git-quick-stats][], [git-now][], [git-extras][], [forgit][]                |
| @fuzzy           | [fzf][] (package), [fzy][] (package), [skim][], [peco][]                                                              |
| @fuzzy-src       | fzf-go, [fzy][], skim-cargo, peco-go                                                                                  |
| @prezto          | PZTM::archive, PZTM::directory, PZTM::utility                                                                         |
| @py-utils        | [pyenv][] (package)                                                                                                   |
| @romkatv         | [powerlevel10k][]                                                                                                     |
| @rust-utils      | rust-toolchain, cargo-extensions                                                                                      |
| @sharkdp         | [fd][], [bat][], [hexyl][], [hyperfine][], [vivid][]                                                                  |
| @z-shell         | [F-Sy-H][], [H-S-MW][], [zsh-diff-so-fancy][]                                                                         |
| @z-shell+        | [zsh-select][], [zconvey][], [zui][], [zflai][]                                                                       |
| @zsh-users       | [zsh-syntax-highlighting][], [zsh-autosuggestions][], [zsh-completions][]                                             |
| @zsh-users+fast  | [F-Sy-H][], [zsh-autosuggestions][], [zsh-completions][], [z-shell/zsh-fancy-completions][]                           |
| @zunit           | [color][], [revolver][], [zunit][]                                                                                    |

```mdx-code-block
</APITable>
```

## Summary of the meta-plugins

It consumes time to:

- Constantly, over and over collect some new interesting plugins to install/load.
- Over and over reconstruct the new findings on the new machines.
- Constantly extend and tweak the ice list of each plugin, so that it's hard on the eyes, especially for an outsider.

```mdx-code-block
<APITable>
```

| Problem                                               | Solution                                                                                                                                                                                                                                                                               |
|:----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (1) _finding new plugins_                             | The annex contains a curated, broad list of plugins, e.g.: all the console tools like `fd`, `fzf`, `exa`, `ripgrep`, etc.,                                                                                                                                                             |
| (2) _reconstructing the findings in new environments_ | It's easy to say and memorize e.g.: `zi for console-tools` – one label pulls a group of plugins and also the curated, optimal, default ice lists for each of them,                                                                                                                     |
| (3) _constant increase of complexity of the commands_ | The provided, hopefully, best/optimal ices for each plugin are handled transparently and automatically; care is given to each ice list so that the plugin loads without any glitches (e.g.: without the "No files for compilation found." message and other, even such slight issues). |

```mdx-code-block
</APITable>
```

Other unique benefits of the meta-plugins annex:

```mdx-code-block
<APITable>
```

| Benefit                                                     | Description                                                                                                                                                                                                                                                                                                           |
|:----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Plugin dependencies                                         | The meta-plugins implement a dependency mechanism: selecting a from-source built [ogham/exa][exa] will automatically pull in also the Rust compiler (available under the meta-plugin name: `rust-toolchain`).                                                                                                         |
| Flexible disabling of chosen sub-plugins in any meta-plugin | A meta-plugin can contain many sub-plugins and it's possible to skip installing some of them by the **skip'plugin-1 plugin-2…'** ice, e.g.: `zi skip'ripgrep fd' for console-tools`. This way despite that some of the meta plugins are broad the user still has control over what's and how much is being installed. |
| Common from-source meta plugins                             | For the plugins that provide the binary programs it is often the case that a meta-plugin exists that'll build the program from the source (e.g.: **fuzzy** meta-plugin and its **fuzzy-src** counterpart). This might be handy e.g.: if there's no binary for our machine.                                            |

```mdx-code-block
</APITable>
```

## Install meta-plugins

:::info Source

- <Link className="github-link" href="https://github.com/z-shell/z-a-meta-plugins">z-shell/z-a-meta-plugins</Link>

:::

<Tabs>
  <TabItem value="default" label="Default" default>

Add the following snippet in the `.zshrc` file:

```shell
zi light z-shell/z-a-meta-plugins
```

  </TabItem>
</Tabs>

This will register the `skip'…'` ice-modifier.

<!-- end-of-file -->
<!-- links -->



<!-- external -->

[ice-modifiers]: /docs/guides/syntax/ice-modifiers

[bat]: https://github.com/sharkdp/bat
[bin-gem-node]: https://github.com/z-shell/z-a-bin-gem-node
[color]: https://github.com/zdharma/color
[default-ice]: https://github.com/z-shell/z-a-default-ice
[dircolors-material]: https://github.com/z-shell/dircolors-material
[exa]: https://github.com/ogham/exa
[exa]: https://github.com/ogham/exa
[F-Sy-H]: https://github.com/z-shell/F-Sy-H
[fd]: https://github.com/sharkdp/fd
[forgit]: https://github.com/wfxr/forgit
[fzf]: https://github.com/z-shell/fzf
[fzy]: https://github.com/z-shell/fzy
[git-extras]: https://github.com/tj/git-extras
[git-my]: https://github.com/davidosomething/git-my
[git-now]: https://github.com/iwata/git-now
[git-open]: https://github.com/paulirish/git-open
[git-quick-stats]: https://github.com/arzzen/git-quick-stats
[git-recent]: https://github.com/paulirish/git-recent
[gitignore.plugin.zsh]: https://github.com/voronkovich/gitignore.plugin.zsh
[H-S-MW]: https://github.com/z-shell/H-S-MW
[hexyl]: https://github.com/sharkdp/hexyl
[hyperfine]: https://github.com/sharkdp/hyperfine
[issues/new]: https://github.com/z-shell/z-a-meta-plugins/issues/new
[patch-dl]: https://github.com/z-shell/z-a-patch-dl
[peco]: https://github.com/peco/peco
[powerlevel10k]: https://github.com/romkatv/powerlevel10k
[pyenv]: https://github.com/z-shell/pyenv
[readurl]: https://github.com/z-shell/z-a-readurl
[revolver]: https://github.com/zdharma/revolver
[ripgrep]: https://github.com/BurntSushi/ripgrep
[rust]: https://github.com/z-shell/z-a-rust
[skim]: https://github.com/lotabout/skim
[submods]: https://github.com/z-shell/z-a-submods
[test]: https://github.com/z-shell/z-a-test
[tig]: https://github.com/jonas/tig
[unscope]: https://github.com/z-shell/z-a-unscope
[vivid]: https://github.com/sharkdp/vivid
[z-a-meta-plugins.plugin.zsh]: https://github.com/z-shell/z-a-meta-plugins/blob/main/z-a-meta-plugins.plugin.zsh
[zconvey]: https://github.com/z-shell/zconvey
[zflai]: https://github.com/z-shell/zflai
[zsh-autosuggestions]: https://github.com/zsh-users/zsh-autosuggestions
[zsh-completions]: https://github.com/zsh-users/zsh-completions
[zsh-diff-so-fancy]: https://github.com/z-shell/zsh-diff-so-fancy
[zsh-select]: https://github.com/z-shell/zsh-select
[zsh-syntax-highlighting]: https://github.com/zsh-users/zsh-syntax-highlighting
[zui]: https://github.com/z-shell/zui
[zunit]: https://github.com/zdharma/zunit
[z-shell/zsh-fancy-completions]: https://github.com/z-shell/zsh-fancy-completions
