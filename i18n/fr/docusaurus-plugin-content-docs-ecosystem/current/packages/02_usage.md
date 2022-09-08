---
id: usage
title: "📦 Usage"
image: /img/logo/320x320.png
description: Zi packages usage information.
keywords:
  - zpackage
  - paquets
  - zsh-packages
---

<!-- @format -->

import Emoji from '@site/src/components/Emoji';
import APITable from '@site/src/components/APITable';
import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

## Package repositories

For all the available packages use [GitHub search][github-search].

```mdx-code-block
<APITable>
```

|      Package Name      | Description                                                                                         |
|:----------------------:|:--------------------------------------------------------------------------------------------------- |
|      [any-node][]      | The any Node module(s) locally in a newly created plugin directory.                                 |
|      [any-gem][]       | The any Gem(s) locally in a newly created plugin directory.                                         |
|        [apr][]         | The Apache Portable Runtime (APR) library.                                                          |
|        [fzf][]         | The fzf command-line fuzzy finder.                                                                  |
|        [fzy][]         | The fzy command-line fuzzy finder.                                                                  |
|       [pyenv][]        | The pyenv Python virtual environment manager.                                                       |
|       [remark][]       | The remark Markdown processor.                                                                      |
|       [doctoc][]       | The doctoc Markdown processor.                                                                      |
|     [ls_colors][]      | The LS_COLORS and setup a zsh-completion system color scheme.                                       |
| [dircolors-material][] | The dircolors-material and set up a zsh-completion system color scheme.                             |
|    [asciidoctor][]     | The asciidoctor Markdown processor.                                                                 |
| [system-completions][] | Moves the stock Zsh completions under the control of Zi.                                            |
|  [brew-completions][]  | The Homebrew Shell Completion under the control of Zsh & Zi.                                        |
|      [ecs-cli][]       | The AWS ECS CLI.                                                                                    |
|     [subversion][]     | The Subversion client.                                                                              |
|   [github-issues][]    | The GitHub Issues client.                                                                           |
| [github-issues-srv][]  | The GitHub Issues server.                                                                           |
|    [firefox-dev][]     | The Firefox Developer Edition.                                                                      |
|        [zsh][]         | The Zsh mirror of zsh-users.                                                                        |
|         [nb][]         | Bookmarking, and archiving with linking, tagging, search, Git syncing, Pandoc conversion, and more. |
|      [zsh-bin][]       | Package of statically-linked, hermetic, relocatable - romkatv/zsh-bin.                              |

```mdx-code-block
</APITable>
```

## Package profiles

### Apache Portable Runtime (APR) library

<table>
  <tbody>
    <tr>
      <td>
        <b>Package source:</b>
      </td>
      <td>Source Tarball</td>
      <td>Binary</td>
      <td>Git</td>
      <td>Node</td>
      <td>Gem</td>
    </tr>
    <tr>
      <td>
        <b>Status:</b>
      </td>
      <td><Emoji symbol="✅" label="check-mark-button"/> (default)</td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="✅" label="check-mark-button"/></td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
    </tr>
  </tbody>
</table>

Download, build and install the latest Apache Portable Runtime.

```shell
zi pack for apr
```

### `asciidoctor` Markdown processor

<table>
  <tbody>
    <tr>
      <td>
        <b>Package source:</b>
      </td>
      <td>Source Tarball</td>
      <td>Binary</td>
      <td>Git</td>
      <td>Node</td>
      <td>Gem</td>
    </tr>
    <tr>
      <td>
        <b>Status:</b>
      </td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="✅" label="check-mark-button"/> (default)</td>
    </tr>
  </tbody>
</table>

Download the Gem of asciidoctor locally with the [bin-gem-node][] annex.

> Using the `@` prefix because of collision with the as'' ice.

```shell
zi pack for @asciidoctor
```

### AWS ECS CLI

<table>
  <tbody>
    <tr>
      <td>
        <b>Package source:</b>
      </td>
      <td>Source Tarball</td>
      <td>Binary</td>
      <td>Git</td>
      <td>Node</td>
      <td>Gem</td>
    </tr>
    <tr>
      <td>
        <b>Status:</b>
      </td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="✅" label="check-mark-button"/> (default)</td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
    </tr>
  </tbody>
</table>

<Tabs>
<TabItem value="default" label="Default" default>

Download the binary of the Amazon-ECS-CLI command.

```shell
zi pack for ecs-cli
```

</TabItem>
<TabItem value="bin-gem-node" label="Annex">

Download the ECS-CLI binary with the use of the bin-gem-node annex.

```shell
zi pack"bgn" for ecs-cli
```

</TabItem>
</Tabs>

### `dircolors-material` color scheme

<table>
  <tbody>
    <tr>
      <td>
        <b>Package source</b>
      </td>
      <td>Tarball</td>
      <td>Binary</td>
      <td>Git</td>
      <td>Node</td>
      <td>Gem</td>
    </tr>
    <tr>
      <td>
        <b>Status:</b>
      </td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="✅" label="check-mark-button"/> (default)</td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
    </tr>
  </tbody>
</table>

<Tabs>
<TabItem value="default" label="Default"  default>

Download the default profile.

```shell
zi pack for dircolors-material
```

</TabItem>
<TabItem value="no-zsh-completion" label="No completion">

Download the "no-zsh-completion" profile.

```shell
zi pack"no-zsh-completion" for dircolors-material
```

</TabItem>
<TabItem value="no-color-swap" label="No color swap">

Download the "no-color-swaps" profile.

```shell
zi pack"no-color-swaps" for dircolors-material
```

</TabItem>
<TabItem value="minimal" label="Minimal">

Download the minimal profile without altering the original theme.

```shell
zi pack"minimal" for dircolors-material
```

</TabItem>
</Tabs>

### `doctoc` Markdown processor

<table>
  <tbody>
    <tr>
      <td>
        <b>Package source:</b>
      </td>
      <td>Source Tarball</td>
      <td>Binary</td>
      <td>Git</td>
      <td>Node</td>
      <td>Gem</td>
    </tr>
    <tr>
      <td>
        <b>Status:</b>
      </td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="✅" label="check-mark-button"/> (default)</td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
    </tr>
  </tbody>
</table>

A download default profile with the Node package of doctoc.

```shell
zi pack for doctoc
```

### Firefox Developer Edition

<table>
  <tbody>
    <tr>
      <td>
        <b>Package source:</b>
      </td>
      <td>Source Tarball</td>
      <td>Binary</td>
      <td>Git</td>
      <td>Node</td>
      <td>Gem</td>
    </tr>
    <tr>
      <td>
        <b>Status:</b>
      </td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="✅" label="check-mark-button"/> (default)</td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
    </tr>
  </tbody>
</table>

<Tabs>
<TabItem value="default" label="Default" default>

Download the firefox-dev latest binary.

```shell
zi pack for firefox-dev
```

</TabItem>
<TabItem value="bin-gem-node" label="Annex">

Download the firefox-dev latest binary with use of the [bin-gem-node][] annex.

```shell
zi pack"bgn" for firefox-dev
```

</TabItem>
</Tabs>

### `fzf` command-line fuzzy finder

<table>
  <tbody>
    <tr>
      <td>
        <b>Package source:</b>
      </td>
      <td>Source Tarball</td>
      <td>Binary</td>
      <td>Git</td>
      <td>Node</td>
      <td>Gem</td>
    </tr>
    <tr>
      <td>
        <b>Status:</b>
      </td>
      <td><Emoji symbol="✅" label="check-mark-button"/> (default)</td>
      <td><Emoji symbol="✅" label="check-mark-button"/></td>
      <td><Emoji symbol="✅" label="check-mark-button"/></td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
    </tr>
  </tbody>
</table>

<Tabs>
<TabItem value="default" label="Default" default>

Download the package with the default profile.

```shell
zi pack for fzf
```

</TabItem>
<TabItem value="key-bindings" label="Key bindings">

Download the package with the default profile + key bindings.

```shell
zi pack"default+keys" for fzf
```

</TabItem>
<TabItem value="bin-gem-node" label="Annex">

Download the package with the [bin-gem-node][] annex.

```shell
zi pack"bgn" for fzf
```

</TabItem>
<TabItem value="bin-gem-node+key-bindings" label="Annex + key bindings">

Download the package with the [bin-gem-node][] annex and with the key bindings.

> The "+keys" variants are available for each profile.

```shell
zi pack"bgn+keys" for fzf
```

</TabItem>
<TabItem value="bin-gem-node+git" label="Annex + git">

Download with the [bin-gem-node][] annex from GitHub repository.

```shell
zi pack"bgn" git for fzf
```

</TabItem>
<TabItem value="binary" label="Binary">

Download the binary from the GitHub releases.

```shell
zi pack"binary" for fzf
```

</TabItem>
<TabItem value="bin-gem-node+binary" label="Annex + binary">

Download the binary from the GitHub releases and install using [bin-gem-node][] + shims.

```shell
zi pack"bgn-binary" for fzf
```

</TabItem>
</Tabs>

### `fzy` command-line fuzzy finder

<table>
  <tbody>
    <tr>
      <td>
        <b>Package source:</b>
      </td>
      <td>Tarball</td>
      <td>Binary</td>
      <td>Git</td>
      <td>Node</td>
      <td>Gem</td>
    </tr>
    <tr>
      <td>
        <b>Status:</b>
      </td>
      <td><Emoji symbol="✅" label="check-mark-button"/> (default)</td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="✅" label="check-mark-button"/></td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
    </tr>
  </tbody>
</table>

<Tabs>
<TabItem value="default" label="Default" default>

Download the package with the default profile.

```shell
zi pack for fzy
```

</TabItem>
<TabItem value="bin-gem-node" label="Annex">

Download the package with the [bin-gem-node][] annex.

```shell
zi pack"bgn" for fzy
```

</TabItem>
<TabItem value="bin-gem-node+git" label="Annex + git">

Download with the [bin-gem-node][] annex from GitHub repository.

```shell
zi pack"bgn" git for fzy
```

</TabItem>
<TabItem value="default+override" label="Default Override">

Download normal ice list and override atclone'' ice to skip the contrib scripts

```shell
zi pack"bgn" atclone'' for fzy
```

</TabItem>
</Tabs>

### `LS_COLORS` color scheme

<table>
  <tbody>
    <tr>
      <td>
        <b>Package source:</b>
      </td>
      <td>Tarball</td>
      <td>Git</td>
      <td>Node</td>
      <td>Gem</td>
    </tr>
    <tr>
      <td>
        <b>Status:</b>
      </td>
      <td><Emoji symbol="🚫" label="prohibited"/></td>
      <td><Emoji symbol="✅" label="check-mark-button"/> (default)</td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
    </tr>
  </tbody>
</table>

<Tabs>
<TabItem value="default" label="Default" default>

Download the default profile.

```shell
zi pack for ls_colors
```

</TabItem>
<TabItem value="no-zsh-completion" label="No completion">

Download the "no-zsh-completion" profile.

```shell
zi pack"no-zsh-completion" for ls_colors
```

</TabItem>
<TabItem value="no-dir-color-swap" label="No color swap">

Download the "no-dir-color-swap" profile.

```shell
zi pack"no-dir-color-swap" for ls_colors
```

</TabItem>
</Tabs>

### Feature-rich note‑taking (`nb`) {#nb-pkg-profile}

<table>
  <tbody>
    <tr>
      <td>
        <b>Package source:</b>
      </td>
      <td>Source Tarball</td>
      <td>Git</td>
      <td>Node</td>
      <td>Gem</td>
    </tr>
    <tr>
      <td>
        <b>Status:</b>
      </td>
      <td><Emoji symbol="✅" label="check-mark-button"/> (default)</td>
      <td><Emoji symbol="🚫" label="prohibited"/></td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
    </tr>
  </tbody>
</table>

Default profile are using [bin-gem-node][] to set shims.

```shell
zi pack for nb
```

### Python virtual environment manager - `pyenv` {#pyenv-pkg-profile}

<table>
  <tbody>
    <tr>
      <td>
        <b>Package source:</b>
      </td>
      <td>Source Tarball</td>
      <td>Binary</td>
      <td>Git</td>
      <td>Node</td>
      <td>Gem</td>
    </tr>
    <tr>
      <td>
        <b>Status:</b>
      </td>
      <td><Emoji symbol="✅" label="check-mark-button"/> (default)</td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="✅" label="check-mark-button"/></td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
    </tr>
  </tbody>
</table>

<Tabs>
<TabItem value="default" label="Default" default>

Download the tarball with the default ice list.

```shell
zi pack for pyenv
```

</TabItem>
<TabItem value="bin-gem-node" label="Annex">

Download the binary from the GitHub releases with the [bin-gem-node][] annex.

```shell
zi pack"bgn" for pyenv
```

</TabItem>
<TabItem value="bin-gem-node+git" label="Annex + git">

Download with the [bin-gem-node][] annex from GitHub repository.

```shell
zi pack"bgn" git for pyenv
```

</TabItem>
</Tabs>

### `remark` Markdown processor

<table>
  <tbody>
    <tr>
      <td>
        <b>Package source:</b>
      </td>
      <td>Tarball</td>
      <td>Git</td>
      <td>Node</td>
      <td>Gem</td>
    </tr>
    <tr>
      <td>
        <b>Status:</b>
      </td>
      <td><Emoji symbol="🚫" label="prohibited"/></td>
      <td><Emoji symbol="🚫" label="prohibited"/></td>
      <td><Emoji symbol="✅" label="check-mark-button"/> (default)</td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
    </tr>
  </tbody>
</table>

<Tabs>
<TabItem value="default" label="Default" default>

Download the Node package of remark-CLI, remark-man and remark-HTML

```shell
zi pack for remark
```

</TabItem>
<TabItem value="man-only" label="Man only">

Download the Node package of remark-CLI and remark-man

```shell
zi pack"man-only" for remark
```

</TabItem>
<TabItem value="specific-version" label="HTML only">

Download the Node package of remark-CLI and remark-HTML

```shell
zi pack"html-only" for remark
```

</TabItem>
</Tabs>

### Subversion

<table>
  <tbody>
    <tr>
      <td>
        <b>Package source:</b>
      </td>
      <td>Source Tarball</td>
      <td>Binary</td>
      <td>Git</td>
      <td>Node</td>
      <td>Gem</td>
    </tr>
    <tr>
      <td>
        <b>Status:</b>
      </td>
      <td><Emoji symbol="✅" label="check-mark-button"/> (default)</td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="✅" label="check-mark-button"/></td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
    </tr>
  </tbody>
</table>

Download, build and install the latest Subversion.

> Dependency of Subversion: [APR][]

```shell
zi pack for subversion
```

### Zsh mirror of zsh-users

<table>
  <tbody>
    <tr>
      <td>
        <b>Package source:</b>
      </td>
      <td>Source Tarball</td>
      <td>Binary</td>
      <td>Git</td>
      <td>Node</td>
      <td>Gem</td>
    </tr>
    <tr>
      <td>
        <b>Status:</b>
      </td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="✅" label="check-mark-button"/> (default)</td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
    </tr>
  </tbody>
</table>

<Tabs>
<TabItem value="default" label="Default" default>

Install the newest Zsh.

```shell
zi pack for zsh
```

</TabItem>
<TabItem value="specific-version" label="Specific version">

Install preferred Zsh version.

```shell
zi pack"5.9" for zsh
zi pack"5.8.1" for zsh
zi pack"5.8" for zsh
zi pack"5.7.1" for zsh
zi pack"5.6.2" for zsh
zi pack"5.5.1" for zsh
zi pack"5.4.2" for zsh
zi pack"5.3.1" for zsh
zi pack"5.2.4" for zsh
zi pack"5.1.1" for zsh
```

</TabItem>
</Tabs>

### Statically-linked, hermetic, relocatable Zsh

<table>
  <tbody>
    <tr>
      <td>
        <b>Package source:</b>
      </td>
      <td>Source Tarball</td>
      <td>Binary</td>
      <td>Git</td>
      <td>Node</td>
      <td>Gem</td>
    </tr>
    <tr>
      <td>
        <b>Status:</b>
      </td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="✅" label="check-mark-button"/> (default)</td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
      <td><Emoji symbol="❌" label="cross-mark"/></td>
    </tr>
  </tbody>
</table>

<Tabs>
<TabItem value="default" label="Default" default>

Requires **root** access to install Zsh at `/usr/local` and will attempt to register it as a login shell.

```shell
zi pack for zsh-bin
```

</TabItem>
<TabItem value="bin-gem-node" label="Annex">

Does not require **root** access, when install using [bin-gem-node][] to set shims.

```shell
zi pack"bgn" for zsh-bin
```

</TabItem>
<TabItem value="rootless" label="Rootless">

Does not require **root** access, will install to `~/.local`.

```shell
zi pack"rootless" for zsh-bin
```

</TabItem>
</Tabs>

<!-- end-of-file -->
<!-- links -->



<!-- external -->

[bin-gem-node]: /ecosystem/annexes/bin-gem-node

[any-node]: https://github.com/z-shell/any-node
[any-gem]: https://github.com/z-shell/any-gem
[APR]: https://github.com/z-shell/apr
[apr]: https://github.com/z-shell/apr
[fzf]: https://github.com/z-shell/fzf
[fzy]: https://github.com/z-shell/fzy
[pyenv]: https://github.com/z-shell/pyenv
[remark]: https://github.com/z-shell/remark
[doctoc]: https://github.com/z-shell/doctoc
[ls_colors]: https://github.com/z-shell/ls_colors
[dircolors-material]: https://github.com/z-shell/dircolors-material
[asciidoctor]: https://github.com/z-shell/asciidoctor
[system-completions]: https://github.com/z-shell/system-completions
[ecs-cli]: https://github.com/z-shell/ecs-cli
[subversion]: https://github.com/z-shell/subversion
[github-issues]: https://github.com/z-shell/github-issues
[github-issues-srv]: https://github.com/z-shell/github-issues-srv
[firefox-dev]: https://github.com/z-shell/firefox-dev
[zsh]: https://github.com/z-shell/zsh
[nb]: https://github.com/z-shell/nb
[zsh-bin]: https://github.com/z-shell/zsh-bin
[brew-completions]: https://github.com/z-shell/brew-completions
[github-search]: https://github.com/search?q=topic%3Azpackage+org%3Az-shell&type=Repositories
