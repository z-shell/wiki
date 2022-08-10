---
id: usage
title: "📦 Usage"
image: /img/logo/320x320.png
description: The Z-Shell Organization packages
keywords:
  - zpackage
  - zi-package
---

<!-- @format -->

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

## Package repositories

For all the available packages use [GitHub search][22].

<div className="apitable" align="center">

|       Package Name       | Description                                                                                         |
| :----------------------: | :-------------------------------------------------------------------------------------------------- |
|      [any-node][1]       | The any Node module(s) locally in a newly created plugin directory.                                 |
|       [any-gem][2]       | The any Gem(s) locally in a newly created plugin directory.                                         |
|         [apr][3]         | The Apache Portable Runtime (APR) library.                                                          |
|         [fzf][4]         | The fzf command-line fuzzy finder.                                                                  |
|         [fzy][5]         | The fzy command-line fuzzy finder.                                                                  |
|        [pyenv][6]        | The pyenv Python virtual environment manager.                                                       |
|       [remark][7]        | The remark Markdown processor.                                                                      |
|       [doctoc][8]        | The doctoc Markdown processor.                                                                      |
|      [ls_colors][9]      | The LS_COLORS and setup a zsh-completion system color scheme.                                       |
| [dircolors-material][10] | The dircolors-material and set up a zsh-completion system color scheme.                             |
|    [asciidoctor][11]     | The asciidoctor Markdown processor.                                                                 |
| [system-completions][12] | Moves the stock Zsh completions under the control of Zi.                                            |
|  [brew-completions][21]  | The Homebrew Shell Completion under the control of Zsh & Zi.                                        |
|      [ecs-cli][13]       | The AWS ECS CLI.                                                                                    |
|     [subversion][14]     | The Subversion client.                                                                              |
|   [github-issues][15]    | The GitHub Issues client.                                                                           |
| [github-issues-srv][16]  | The GitHub Issues server.                                                                           |
|    [firefox-dev][17]     | The Firefox Developer Edition.                                                                      |
|        [zsh][18]         | The Zsh mirror of zsh-users.                                                                        |
|         [nb][19]         | Bookmarking, and archiving with linking, tagging, search, Git syncing, Pandoc conversion, and more. |
|      [zsh-bin][20]       | Package of statically-linked, hermetic, relocatable - romkatv/zsh-bin.                              |

</div>

## Package profiles

### The Apache Portable Runtime (APR) library

<div className="apitable" align="center">
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
      <td>☑️ (default)</td>
      <td>❌</td>
      <td>☑️</td>
      <td>❌</td>
      <td>❌</td>
    </tr>
  </tbody>
</table></div>

Download, build and install the latest Apache Portable Runtime.

```shell
zi pack for apr
```

### The asciidoctor Markdown processor

<div className="apitable" align="center">
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
      <td>❌</td>
      <td>❌</td>
      <td>❌</td>
      <td>❌</td>
      <td>☑️ (default)</td>
    </tr>
  </tbody>
</table>
</div>

Download the Gem of asciidoctor locally with the [bin-gem-node][] annex.

> Using the `@' prefix because of collision with the as'' ice.

```shell
zi pack for @asciidoctor
```

### The AWS ECS CLI

<div className="apitable" align="center">
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
      <td>❌</td>
      <td>☑️ (default)</td>
      <td>❌</td>
      <td>❌</td>
      <td>❌</td>
    </tr>
  </tbody>
</table>
</div>

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

### The dircolors-material color scheme

<div className="apitable" align="center">
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
        <td>❌</td>
        <td>❌</td>
        <td>☑️ (default)</td>
        <td>❌</td>
        <td>❌</td>
      </tr>
    </tbody>
  </table>
</div>

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

### The doctoc Markdown processor

<div className="apitable" align="center">
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
      <td>❌</td>
      <td>❌</td>
      <td>❌</td>
      <td>☑️ (default)</td>
      <td>❌</td>
    </tr>
  </tbody>
</table>
</div>

A download default profile with the Node package of doctoc.

```shell
zi pack for doctoc
```

### The Firefox Developer Edition

<div className="apitable" align="center">
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
        <td>❌</td>
        <td>☑️ (default)</td>
        <td>❌</td>
        <td>❌</td>
        <td>❌</td>
      </tr>
    </tbody>
  </table>
</div>

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

### The fzf command-line fuzzy finder

<div className="apitable" align="center">
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
        <td>☑️ (default)</td>
        <td>☑️</td>
        <td>☑️</td>
        <td>❌</td>
        <td>❌</td>
      </tr>
    </tbody>
  </table>
</div>

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

Download the binary from the Github releases.

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

### The fzy command-line fuzzy finder

<div className="apitable" align="center">
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
        <td>☑️ (default)</td>
        <td>❌</td>
        <td>☑️</td>
        <td>❌</td>
        <td>❌</td>
      </tr>
    </tbody>
  </table>
</div>

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

### The LS_COLORS color scheme

<div className="apitable" align="center">
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
        <td>➖</td>
        <td>☑️ (default)</td>
        <td>❌</td>
        <td>❌</td>
      </tr>
    </tbody>
  </table>
</div>

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

### Feature-rich note‑taking (nb)

<div className="apitable" align="center">
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
      <td>☑️ (default)</td>
      <td>➖</td>
      <td>❌</td>
      <td>❌</td>
    </tr>
  </tbody>
</table>
</div>

Default profile are using [bin-gem-node][] to set shims.

```shell
zi pack for nb
```

### The Python virtual environment manager (pyenv)

<div className="apitable" align="center">
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
        <td>☑️ (default)</td>
        <td>❌</td>
        <td>☑️</td>
        <td>❌</td>
        <td>❌</td>
      </tr>
    </tbody>
  </table>
</div>

<Tabs>
  <TabItem value="default" label="Default" default>

Download the tarball with the default ice list.

```shell
zi pack for pyenv
```

  </TabItem>
  <TabItem value="bin-gem-node" label="Annex">

Download the binary from the Github releases with the [bin-gem-node][] annex.

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

### The remark Markdown processor

<div className="apitable" align="center">
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
      <td>➖</td>
      <td>➖</td>
      <td>☑️ (default)</td>
      <td>❌</td>
    </tr>
  </tbody>
</table>
</div>

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

<div className="apitable" align="center">
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
      <td>☑️ (default)</td>
      <td>❌</td>
      <td>☑️</td>
      <td>❌</td>
      <td>❌</td>
    </tr>
  </tbody>
</table>
</div>

Download, build and install the latest Subversion.

> Dependency of Subversion: [APR][3]

```shell
zi pack for subversion
```

### The Zsh mirror of zsh-users

<div className="apitable" align="center">
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
        <td>❌</td>
        <td>❌</td>
        <td>☑️ (default)</td>
        <td>❌</td>
        <td>❌</td>
      </tr>
    </tbody>
  </table>
</div>

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

<div className="apitable" align="center">
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
        <td>❌</td>
        <td>❌</td>
        <td>☑️ (default)</td>
        <td>❌</td>
        <td>❌</td>
      </tr>
    </tbody>
  </table>
</div>

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

[1]: https://github.com/z-shell/any-node
[2]: https://github.com/z-shell/any-gem
[3]: https://github.com/z-shell/apr
[4]: https://github.com/z-shell/fzf
[5]: https://github.com/z-shell/fzy
[6]: https://github.com/z-shell/pyenv
[7]: https://github.com/z-shell/remark
[8]: https://github.com/z-shell/doctoc
[9]: https://github.com/z-shell/ls_colors
[10]: https://github.com/z-shell/dircolors-material
[11]: https://github.com/z-shell/asciidoctor
[12]: https://github.com/z-shell/system-completions
[13]: https://github.com/z-shell/ecs-cli
[14]: https://github.com/z-shell/subversion
[15]: https://github.com/z-shell/github-issues
[16]: https://github.com/z-shell/github-issues-srv
[17]: https://github.com/z-shell/firefox-dev
[18]: https://github.com/z-shell/zsh
[19]: https://github.com/z-shell/nb
[20]: https://github.com/z-shell/zsh-bin
[21]: https://github.com/z-shell/brew-completions
[22]: https://github.com/search?q=topic%3Azpackage+org%3Az-shell&type=Repositories
[bin-gem-node]: /ecosystem/annexes/bin-gem-node
