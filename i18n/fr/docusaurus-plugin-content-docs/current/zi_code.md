---
id: code
title: "🔖 Documentation du code"
description: La documentation répertorie toutes les fonctions, les interactions entre elles, leurs commentaires et leurs caractéristiques.
keywords:
  - code
  - zi-code
  - documentation
---

:::info

Documentation mise à jour automatiquement tous les `jeudi 4:30 UTC` à [z-shell/docs][1].

:::

| Fichier              | Format du document                | Description                                                                       |
| -------------------- | --------------------------------- | --------------------------------------------------------------------------------- |
| [zi.zsh][2]          | [adoc][3], [pdf][4], [html][5]    | Le script principal qui est toujours chargé, dans `.zshrc`                        |
| [side.zsh][6]        | [adoc][7], [pdf][8], [html][9]    | Fonctions, chargées par les scripts `install.zsh` et `autoload.zsh`               |
| [install.zsh][10]    | [adoc][11], [pdf][12], [html][13] | Fonctions utilisées uniquement lors de l'installation d'un plugin ou d'un snippet |
| [autoload.zsh][14]   | [adoc][15], [pdf][16], [html][17] | Fonctions utilisées uniquement dans les invocations interactives `Zi`             |
| [additional.zsh][18] | [adoc][19], [pdf][20], [html][21] | Support additionnel pour les fonctions                                            |

[1]: https://github.com/z-shell/docs
[2]: https://github.com/z-shell/zi/blob/main/zi.zsh
[3]: https://github.com/z-shell/docs/blob/main/code/zsdoc/asciidoc/zi.zsh.adoc
[4]: https://github.com/z-shell/docs/blob/main/code/zsdoc/pdf/zi.zsh.pdf
[5]: https://z-shell.github.io/docs/code/html/zi.zsh.html
[6]: https://github.com/z-shell/zi/blob/main/lib/zsh/side.zsh
[7]: https://github.com/z-shell/docs/blob/main/code/zsdoc/asciidoc/side.zsh.adoc
[8]: https://github.com/z-shell/docs/blob/main/code/zsdoc/pdf/side.zsh.pdf
[9]: https://z-shell.github.io/docs/code/html/side.zsh.html
[10]: https://github.com/z-shell/zi/blob/main/lib/zsh/install.zsh
[11]: https://github.com/z-shell/docs/blob/main/code/zsdoc/asciidoc/install.zsh.adoc
[12]: https://github.com/z-shell/docs/blob/main/code/zsdoc/pdf/install.zsh.pdf
[13]: https://z-shell.github.io/docs/code/html/install.zsh.html
[14]: https://github.com/z-shell/zi/blob/main/lib/zsh/autoload.zsh
[15]: https://github.com/z-shell/docs/blob/main/code/zsdoc/asciidoc/autoload.zsh.adoc
[16]: https://github.com/z-shell/docs/blob/main/code/zsdoc/pdf/autoload.zsh.pdf
[17]: https://z-shell.github.io/docs/code/html/autoload.zsh.html
[18]: https://github.com/z-shell/zi/blob/main/lib/zsh/additional.zsh
[19]: https://github.com/z-shell/docs/blob/main/code/zsdoc/asciidoc/additional.zsh.adoc
[20]: https://github.com/z-shell/docs/blob/main/code/zsdoc/pdf/additional.zsh.pdf
[21]: https://z-shell.github.io/docs/code/html/additional.zsh.html
