---
id: available-packages
title: "📦 Available packages"
image: /img/logo/320x320.png
description: The Z-Shell Organization packages
keywords:
  - zpackage
  - zi-package
---

<!-- @format -->

For all the available packages use [GitHub search][22].

|       Package Name       | Description                                                                                      |
| :----------------------: | ------------------------------------------------------------------------------------------------ |
|      [any-node][1]       | The any Node module(s) locally in a newly created plugin directory.                              |
|       [any-gem][2]       | The any Gem(s) locally in a newly created plugin directory.                                      |
|         [apr][3]         | The Apache Portable Runtime (APR) library.                                                       |
|         [fzf][4]         | The fzf command-line fuzzy finder.                                                               |
|         [fzy][5]         | The fzy command-line fuzzy finder.                                                               |
|        [pyenv][6]        | The pyenv Python virtual environment manager.                                                    |
|       [remark][7]        | The remark Markdown processor.                                                                   |
|       [doctoc][8]        | The doctoc Markdown processor.                                                                   |
|      [ls_colors][9]      | The LS_COLORS and setup a zsh-completion system color scheme.                                    |
| [dircolors-material][10] | The dircolors-material and setup a zsh-completion system color-scheme.                           |
|    [asciidoctor][11]     | The asciidoctor Markdown processor.                                                              |
| [system-completions][12] | Moves the stock Zsh completions under the control of Zi.                                         |
|  [brew-completions][21]  | The Homebrew Shell Completion under the control of Zsh & Zi.                                     |
|      [ecs-cli][13]       | The AWS ECS CLI                                                                                  |
|     [subversion][14]     | The Subversion client                                                                            |
|   [github-issues][15]    | The GitHub Issues client                                                                         |
| [github-issues-srv][16]  | The GitHub Issues server                                                                         |
|    [firefox-dev][17]     | The Firefox Developer Edition                                                                    |
|        [zsh][18]         | The Zsh mirror of zsh-users                                                                      |
|         [nb][19]         | Bookmarking, and archiving with linking, tagging, search, Git syncing, Pandoc conversion, + more |
|      [zsh-bin][20]       | Package of statically-linked, hermetic, relocatable - romkatv/zsh-bin                            |

## Package profiles

### The Firefox Developer Edition

<h3 align="center">
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
        <td>✔️ (default)</td>
        <td>❌</td>
        <td>❌</td>
        <td>❌</td>
      </tr>
    </tbody>
  </table>
</h3>

Download the firefox-dev latest binary

```shell
zi pack for firefox-dev
```

Download the firefox-dev latest binary with use of the [bin-gem-node][] annex.

```shell
zi pack"bgn" for firefox-dev
```

### The fzf command-line fuzzy finder

<h3 align="center">
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
        <td>✔️ (default)</td>
        <td>✔️</td>
        <td>✔️</td>
        <td>❌</td>
        <td>❌</td>
      </tr>
    </tbody>
  </table>
</h3>

Download the package with the default ice list.

```shell
zi pack for fzf
```

Download the package with the default ice list + key bindings.

```shell
zi pack"default+keys" for fzf
```

Download the package with the [bin-gem-node][] annex.

```shell
zi pack"bgn" for fzf
```

Download the package with the [bin-gem-node][] annex + key bindings. 

> The "+keys" variants are available for each profile.

```shell
zi pack"bgn+keys" for fzf
```

Download with the [bin-gem-node][] annex from GitHub repository.

```shell
zi pack"bgn" git for fzf
```

Download the binary from the Github releases.

```shell
zi pack"binary" for fzf
```

Download the binary from the GitHub releases and install using [bin-gem-node][] + shims.

```shell
zi pack"bgn-binary" for fzf
```

### The LS_COLORS color scheme

<h3 align="center">
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
        <td>✔️ (default)</td>
        <td>❌</td>
        <td>❌</td>
      </tr>
    </tbody>
  </table>
</h3>

Download the default profile

```shell
zi pack for ls_colors
```

Download the "no-zsh-completion" profile

```shell
zi pack"no-zsh-completion" for ls_colors
```

Download the "no-dir-color-swap" profile

```shell
zi pack"no-dir-color-swap" for ls_colors
```

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
[bin-gem-node]: https://wiki.zshell.dev/ecosystem/annexes/bin-gem-node
