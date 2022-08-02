---
title: "♻️ Migration"
image: img/logo/320x320.png
description: Guide de migration
keywords:
  - configuration
  - prezto
  - oh-my-zsh
  - migration
---

<!-- @format -->

## Oh-My-Zsh

### Syntaxe abrégée OMZ

```shell title="~/.zshrc" showLineNumbers
zi snippet <URL>        # Raw Syntax with URL
zi snippet OMZ::<PATH>  # Shorthand OMZ/          (http://github.com/ohmyzsh/ohmyzsh/raw/master/)
zi snippet OMZL::<PATH> # Shorthand OMZ/lib/      (http://github.com/ohmyzsh/ohmyzsh/raw/master/lib)
zi snippet OMZT::<PATH> # Shorthand OMZ/themes/   (http://github.com/ohmyzsh/ohmyzsh/raw/master/themes)
zi snippet OMZP::<PATH> # Shorthand OMZ/plugins/  (http://github.com/ohmyzsh/ohmyzsh/raw/master/plugins)
```

### Bibliothèque OMZ

Importing the [clipboard][1] and [termsupport][2] from the OMZ library sample:

Syntaxe brute:

```shell title="~/.zshrc" showLineNumbers
zi snippet https://github.com/ohmyzsh/ohmyzsh/blob/master/lib/clipboard.zsh
zi snippet https://github.com/ohmyzsh/ohmyzsh/blob/master/lib/termsupport.zsh
```

Syntaxe abrégée OMZ:

```shell title="~/.zshrc" showLineNumbers
zi snippet OMZ::lib/clipboard.zsh
zi snippet OMZ::lib/termsupport.zsh
```

Syntaxe abrégée OMZL:

```shell title="~/.zshrc" showLineNumbers
zi snippet OMZL::clipboard.zsh
zi snippet OMZL::termsupport.zsh
```

### Plug-ins OMZ

```diff title="~/.zshrc" showLineNumbers
- plugins=(
-  git
-  dotenv
-  rake
-  rbenv
-  ruby
-)

+ zi snippet OMZP::git
+ zi snippet OMZP::dotenv
+ zi snippet OMZP::rake
+ zi snippet OMZP::rbenv
+ zi snippet OMZP::ruby
```

Exemple de chargement turbo conditionnel plus avancé:

```shell title="~/.zshrc" showLineNumbers
zi is-snippet wait lucid for \
    atload"unalias grv g" \
  OMZP::{git,sudo,encode64,extract} \
    if'[[ -d /opt/google-cloud-sdk ]]' \
  OMZP::gcloud \
    if'[[ -f /etc/os-release ]] && source /etc/os-release && [[ "$ID" = arch ]]' \
  OMZP::archlinux \
    if'[[ -d ~/.nvm ]]' \
  OMZP::nvm \
    if'[[ -d ~/.ssh ]]' \
  OMZP::ssh-agent \
    if'[[ -d ~/.gnupg ]]' \
  OMZP::gpg-agent \
    if'[[ "$OSTYPE" = *-gnu ]]' \
  OMZP::gnu-utils \
    has'pip' \
  OMZP::pip \
    has'python' \
  OMZP::python
```

:::tip

Regroupez l'exemple ci-dessus dans un seul fichier:

`zi snippet <some/path/or/url/bundled-snippets.zsh`

:::

Utilisez `zi ice svn` si plusieurs fichiers nécessitent un sous-répertoire entier.

- [gitfast][4]
- [osx][5]
- [history-substring-search][18]

```shell title="~/.zshrc" showLineNumbers
zi ice svn
zi snippet OMZP::gitfast

zi ice svn
zi snippet OMZP::osx

zi ice svn
zi snippet OMZP::history-substring-search
```

Utilisez `zi ice as "completion"` pour ajouter directement des extraits de complétion de fichier unique.

- [docker][6]
- [fd][7]
- [ag][19]

```shell title="~/.zshrc" showLineNumbers
zi ice as"completion"
zi snippet OMZP::docker/_docker

zi ice as"completion"
zi snippet OMZP::fd/_fd

zi ice as"completion"
zi snippet OMZP::ag/_ag
```

### Thèmes OMZ

Themes are stored in the `themes` directory. Tout est chargé en arrière-plan. with the simple syntax:

```shell title="~/.zshrc"
ZSH_THEME="robbyrussell"
```

Cependant, ZI ne prend pas en charge la variable `ZSH_THEME` de manière native.

To use **themes** created for OMZ, it requires loading shown below as it would be the same as OMZ does in the background.

> Some themes may require additional configuration it can be determined from the theme configuration file.

- Charger la bibliothèque `Git`
- Charger le plug-in `Git`
- Charger les dépendances de la bibliothèque
- Activer `setopt promptsubst`

If any of the above are not in order or missing, the theme will break similar as shown below:

```shell
… $(build_prompt) …
```

If the `Git` library is not loaded or loaded in the wrong order, then it may appear similar to the following:

```shell showLineNumbers
........:1: Commande introuvable: git_prompt_status
........:1: Commande introuvable: git_prompt_short_sha
```

Si vous rencontrez un problème avec le thème, les bibliothèques de support OMZ doivent être chargées

- Si votre thème ne se colore pas comme il le devrait, vous devrez charger `theme-and-appearance.zsh`

- If you encounter an error message similar to:

```shell showLineNumbers
zsh: command not found: ruby_prompt_info
```

Vous devez charger `prompt_info_functions.zsh`

All together it looks like this:

```shell title="~/.zshrc" showLineNumbers
zi snippet OMZL::git.zsh
zi snippet OMZP::git
zi snippet OMZL::theme-and-appearance.zsh
zi snippet OMZL::prompt_info_functions.zsh
# Other libraries that might be needed
zi cdclear -q
```

Then load the prompt:

```shell showLineNumbers
setopt promptsubst
zi snippet OMZT::robbyrussell
```

### External theme sample: [NicoSantangelo/Alpharized][3]

Load with OMZ:

```shell title="~/.zshrc"
ZSH_THEME="alpharized"
```

Load with ZI:

```shell title="~/.zshrc"
zi snippet OMZL::git.zsh
```

Charger le plug-in `Git`:

```shell title="~/.zshrc" showLineNumbers
zi snippet OMZP::git
zi cdclear -q

setopt promptsubst

zi light NicoSantangelo/Alpharized
```

## Principes de base de Prezto

Raw Syntax with URL:

```shell title="~/.zshrc"
zi snippet <URL>
```

Shorthand PZT: <https://github.com/sorin-ionescu/prezto/tree/master/>

```shell title="~/.zshrc"
zi snippet PZT::<PATH>
```

Shorthand PZT/modules:

```shell title="~/.zshrc"
zi snippet PZTM::<PATH>
```

### Modules Prezto

Importing the [environment][9] and [terminal][10] Prezto Modules Sample:

Paramètre Prezto:

```shell title="~/.zshrc" showLineNumbers
zstyle ":prezto:load" pmodule "environnement" "terminal"
```

Réglage ZI:

> Importer les données à partir d'une URL.

```shell title="~/.zshrc" showLineNumbers
zi snippet https://github.com/sorin-ionescu/prezto/blob/master/modules/environment/init.zsh
zi snippet https://github.com/sorin-ionescu/prezto/blob/master/modules/terminal/init.zsh
```

Syntaxe abrégée PZT:

```shell title="~/.zshrc" showLineNumbers
zi snippet PZT::modules/environment
zi snippet PZT::modules/terminal
```

PZTM Shorthand Syntax:

```shell title="~/.zshrc" showLineNumbers
zi snippet PZTM::environment
zi snippet PZTM::terminal
```

Utilisez `zi ice svn` si plusieurs fichiers nécessitent un sous-répertoire entier.

- [docker][11]
- [git][12]

```shell title="~/.zshrc" showLineNumbers
zi ice svn
zi snippet PZTM::docker

zi ice svn
zi snippet PZTM::git
```

Utilisez `zi ice as"null"` si n'existe pas `*.plugin.zsh`, `init.zsh`, `*.zsh-theme*` fichiers dans module.

- [archive][13]:

```shell title="~/.zshrc" showLineNumbers
zi ice svn as"null"
zi snippet PZTM::archive
```

Utilisez `zi ice atclone "git clone <repo> <location>"` si le module a un module externe.

- [complétion][14]:

```shell title="~/.zshrc" showLineNumbers
zi ice svn blockf \
  atclone"git clone --recursive https://github.com/zsh-users/zsh-completions.git external"
zi snippet PZTM::completion
```

Utilisez `blockf` pour empêcher tout ajout inutile à fpath, car ZI gère fpath.

:::tip

Qu'est-ce que `zstyle`?

- Officiel (zsh.sourceforge.net) : [zstyle][15]
- StackExchange: [What does `zstyle` do?][16]

:::

## Zgen

### Charger la bibliothèque OMZ

```diff title="~/.zshrc" showLineNumbers
- zgen oh-my-zsh

+ zi snippet OMZL::<ANY OF THEM>
```

### Charger les plugins OMZ

```diff title="~/.zshrc" showLineNumbers
- zgen oh-my-zsh <PATH>

+ zi snippet OMZP::<PATH>
```

### Charger les modules Prezto

```diff title="~/.zshrc" showLineNumbers
- zgen prezto

+ zi snippet PZTM::<ANY FROM LIST BELOW>
```

- environnement
- terminal
- editor
- history
- directory
- spectrum
- utility
- completion
- prompt

```diff title="~/.zshrc" showLineNumbers
- zgen prezto <modulename>

+ zi snippet PZTM::<modulename>
```

Load repositories as prezto plugins:

```diff title="~/.zshrc" showLineNumbers
- zgen pmodule <reponame> <branch>

+ zi ice ver"<branch>"
+ zi load <repo/plugin>
```

### Résumé de Zgen

:::info

Pour l' `emplacement`: voir [sélection des fichiers][17]

:::

```diff title="~/.zshrc" showLineNumbers
- zgen load <repo> [location] [branch]

+ zi ice ver"[branch]"
+ zi load <repo>
```

## Les Bases de Zplug

```diff title="~/.zshrc" showLineNumbers
- zplug <repo/plugin>, tag1:<option1>, tag2:<option2>

+ zi ice tag1"<option1>" tag2"<option2>"
+ zi load <repo/plugin>
```

### Comparaison des tags

- `as` => `as`
- `use` => `pick`, `src`, `multisrc`
- `ignore` => None
- `from` => `from`
- `at` => `ver`
- `rename-to` => `mv`, `cp`
- `dir` => Selection(`pick`, …) with rename
- `if` => `if`
- `hook-build` => `atclone`, `atpull`
- `hook-load` => `atload`
- `frozen` => None
- `on` => None
- `defer` => `wait`
- `lazy` => `autoload`
- `depth` => `depth`

[1]: https://github.com/ohmyzsh/ohmyzsh/blob/master/lib/clipboard.zsh
[2]: https://github.com/ohmyzsh/ohmyzsh/blob/master/lib/termsupport.zsh
[3]: https://github.com/nicosantangelo/Alpharized
[4]: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/gitfast
[5]: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/osx
[6]: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/docker
[7]: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/fd
[9]: https://github.com/sorin-ionescu/prezto/tree/master/modules/environment
[10]: https://github.com/sorin-ionescu/prezto/tree/master/modules/terminal
[11]: https://github.com/sorin-ionescu/prezto/tree/master/modules/docker
[12]: https://github.com/sorin-ionescu/prezto/tree/master/modules/git
[13]: https://github.com/sorin-ionescu/prezto/tree/master/modules/archive
[14]: https://github. com/sorin-ionescu/prezto/tree/master/modules/completion
[15]: http://zsh.sourceforge.net/Doc/Release/Zsh-Modules.html#The-zsh_002fzutil-Module
[16]: https://unix.stackexchange.com/questions/214657/what-does-zstyle-do
[17]: /docs/guides/syntax/ice#src-pick-multisrc
[18]: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/history-substring-search
[19]: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/ag
