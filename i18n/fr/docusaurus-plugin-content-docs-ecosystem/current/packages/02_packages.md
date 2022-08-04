---
id: available-packages
title: "📦 Paquets disponibles"
image: /img/logo/320x320.png
description: Les paquets de l'organisation Z-Shell
keywords:
  - zpackage
  - zi-package
---

<!-- @format -->

Pour tous les paquets disponibles, utilisez la [Recherche GitHub][22].

|      Nom du paquet       | Description                                                                                                            |
|:------------------------:| ---------------------------------------------------------------------------------------------------------------------- |
|      [any-node][1]       | Le(s) module(s) Node quelconque(s) localement dans un répertoire de plugins nouvellement créé.                         |
|       [any-gem][2]       | Le(s) Gem(s) quelconque(s) localement dans un répertoire de plugins nouvellement créé.                                 |
|         [apr][3]         | La bibliothèque Apache Portable Runtime (APR).                                                                         |
|         [fzf][4]         | L'outil de recherche de ligne de commande fzf.                                                                         |
|         [fzy][5]         | Le chercheur flou en ligne de commande.                                                                                |
|        [pyenv][6]        | Le gestionnaire d'environnement virtuel Python pyenv.                                                                  |
|       [remark][7]        | Le processeur Markdown remark.                                                                                         |
|       [doctoc][8]        | Le processeur doctoc Markdown.                                                                                         |
|      [ls_colors][9]      | The LS_COLORS and setup a zsh-completion system color scheme.                                                          |
| [dircolors-material][10] | Configurez un schéma de couleurs du système de complétion zsh.                                                         |
|    [asciidoctor][11]     | Le processeur Markdown d'asciidoctor.                                                                                  |
| [system-completions][12] | Déplace le stock de compléments Zsh sous le contrôle de Zi.                                                            |
|  [brew-completions][21]  | La complétion Homebrew Shell sous le contrôle de Zsh & Zi.                                                             |
|      [ecs-cli][13]       | La CLI ECS AWS                                                                                                         |
|     [subversion][14]     | Le client Subversion                                                                                                   |
|   [github-issues][15]    | Le client GitHub Issues                                                                                                |
| [github-issues-srv][16]  | Le serveur de tickets GitHub                                                                                           |
|    [firefox-dev][17]     | L'édition pour développeurs de Firefox                                                                                 |
|        [zsh][18]         | Le miroir Zsh de zsh-users                                                                                             |
|         [nb][19]         | Mise en signet et archivage avec liaison, étiquetage, recherche, synchronisation Git, conversion Pandoc et plus encore |
|      [zsh-bin][20]       | Paquet d'éléments liés statiquement, hermétiques, relocalisables - romkatv/zsh-bin                                     |

## Package profiles

### L'édition pour développeurs de Firefox

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

Download the firefox-dev latest binary.

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

Download the package with the [bin-gem-node][] annex-utilizing ice list + setting up the key bindings.

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

Download the default profile.

```shell
zi pack for ls_colors
```

Download the "no-zsh-completion" profile.

```shell
zi pack"no-zsh-completion" for ls_colors
```

Download the "no-dir-color-swap" profile.

```shell
zi pack"no-dir-color-swap" for ls_colors
```

### The Python virtual environment manager (pyenv)

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
        <td>❌</td>
        <td>✔️</td>
        <td>❌</td>
        <td>❌</td>
      </tr>
    </tbody>
  </table>
</h3>

Download the tarball with the default ice list.

```shell
zi pack for pyenv
```

Download the binary from the Github releases with the [bin-gem-node][] annex.

```shell
zi pack"bgn" for pyenv
```

Download with the [bin-gem-node][] annex from GitHub repository.

```shell
zi pack"bgn" git for pyenv
```

### Le miroir Zsh de zsh-users

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
        <td>❌</td>
        <td>✔️ (default)</td>
        <td>❌</td>
        <td>❌</td>
      </tr>
    </tbody>
  </table>
</h3>

Install the newest zsh.

```shell
zi pack for zsh
```

Install prefered Zsh version.

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

### Statically-linked, hermetic, relocatable Zsh

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
        <td>❌</td>
        <td>✔️ (default)</td>
        <td>❌</td>
        <td>❌</td>
      </tr>
    </tbody>
  </table>
</h3>

<b>Requires sudo</b> to install Zsh to /usr/local and will attempt to register it as a login shell.

```shell
zi pack for zsh-bin
```

Does not require <b>root</b>, install using [bin-gem-node][] + shims.

```shell
zi pack"bgn" for zsh-bin
```

Does not require <b>root</b>, will install to ~/.local.

```shell
zi pack"rootless" for zsh-bin
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
