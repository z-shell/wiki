---
id: migration
title: ♻️ Migration
image: /img/png/theme/z/320x320.png
description: Migration Guide
keywords:
  - prezto
  - oh-my-zsh
---

import Link from '@docusaurus/Link';

## Oh-My-Zsh

### OMZ shorthand syntax

```shell title="~/.zshrc" showLineNumbers
zi snippet <URL>        # Raw syntax with URL
zi snippet OMZ::<PATH>  # Shorthand OMZ::         (http://github.com/ohmyzsh/ohmyzsh/raw/master/)
zi snippet OMZL::<PATH> # Shorthand OMZ::lib      (http://github.com/ohmyzsh/ohmyzsh/raw/master/lib)
zi snippet OMZT::<PATH> # Shorthand OMZ::themes   (http://github.com/ohmyzsh/ohmyzsh/raw/master/themes)
zi snippet OMZP::<PATH> # Shorthand OMZ::plugins  (http://github.com/ohmyzsh/ohmyzsh/raw/master/plugins)
```

### OMZ library

Importing the [clipboard][omz/clipboard] and [termsupport][omz/termsupport] from the OMZ library example:

Raw syntax:

```shell title="~/.zshrc" showLineNumbers
zi snippet https://github.com/ohmyzsh/ohmyzsh/blob/master/lib/clipboard.zsh
zi snippet https://github.com/ohmyzsh/ohmyzsh/blob/master/lib/termsupport.zsh
```

OMZ shorthand syntax:

```shell title="~/.zshrc" showLineNumbers
zi snippet OMZ::lib/clipboard.zsh
zi snippet OMZ::lib/termsupport.zsh
```

OMZL shorthand syntax:

```shell title="~/.zshrc" showLineNumbers
zi snippet OMZL::clipboard.zsh
zi snippet OMZL::termsupport.zsh
```

Example of more advanced, library loading using subversion:

```shell title="~/.zshrc" showLineNumbers
if (( $+commands[svn] )) {
	sni=({git,theme-and-appearance,prompt_info_functions,history,completion,vcs_info}.zsh)
	zi is-snippet has'svn' for svn \
		multisrc'${sni[*]}' pick'/dev/null' \
		atinit'typeset -gx COMPLETION_WAITING_DOTS=true \
    HISTSIZE=290000 SAVEHIST=290000 HISTFILE=${ZSH_CACHE_DIR}/.history;' \
      OMZ::lib
	unset sni
} else {
	+zi-message "{auto}Subversion not installed!"
}
```

### OMZ plugins

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

Example of more advanced, conditional turbo loading:

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

Bundle the example above to a single file:

`zi snippet <some/path/or/url/bundled-snippets.zsh`

:::

Use `zi ice svn` if multiple files require an entire subdirectory.

- [gitfast][omz/gitfast]
- [osx][omz/osx]
- [history-substring-search][omz/history-substring-search]

```shell title="~/.zshrc" showLineNumbers
zi ice svn
zi snippet OMZP::gitfast

zi ice svn
zi snippet OMZP::osx

zi ice svn
zi snippet OMZP::history-substring-search
```

Use `zi ice as"completion"` to directly add single file completion snippets.

- [docker][omz/docker]
- [fd][omz/fd]
- [ag][omz/ag]

```shell title="~/.zshrc" showLineNumbers
zi ice as"completion"
zi snippet OMZP::docker/_docker

zi ice as"completion"
zi snippet OMZP::fd/_fd

zi ice as"completion"
zi snippet OMZP::ag/_ag
```

### OMZ themes

Themes are stored in the `themes` directory and loaded in the background with the simple syntax:

```shell title="~/.zshrc"
ZSH_THEME="robbyrussell"
```

However, Zi doesn't support the `ZSH_THEME` variable natively.

To use **themes** created for OMZ requires loading shown below as it would be the same as OMZ does in the background.

> Some themes may require additional configuration it can be determined from the theme configuration file.

- Load `git` library
- Load the `git` plugin
- Load library dependencies
- Enable `setopt prompt_subst`

If any of the above are not in order or missing, the theme will break similar as shown below:

```shell
… $(build_prompt) …
```

If the `Git` library is not loaded or loaded in the wrong order, then it may appear similar to the following:

```shell showLineNumbers
........:1: command not found: git_prompt_status
........:1: command not found: git_prompt_short_sha
```

If you encounter any issue with the theme, OMZ support libraries are to be loaded

- If your theme isn't colored when it should, you will want to load `theme-and-appearance.zsh`

- If you encounter an error message similar to:

```shell showLineNumbers
zsh: command not found: ruby_prompt_info
```

You need to load `prompt_info_functions.zsh`

All together it looks like this:

```shell title="~/.zshrc" showLineNumbers
zi snippet OMZL::git.zsh
zi snippet OMZP::git
zi snippet OMZL::theme-and-appearance.zsh
zi snippet OMZL::prompt_info_functions.zsh
```

Then load the prompt:

```shell showLineNumbers
setopt prompt_subst
zi snippet OMZT::robbyrussell
```

### External theme sample: [NicoSantangelo/Alpharized][]

Load with OMZ:

```shell title="~/.zshrc"
ZSH_THEME="alpharized"
```

Load `git` library from OMZ:

```shell title="~/.zshrc"
zi snippet OMZL::git.zsh
```

Load `git` plugin from OMZ:

```shell title="~/.zshrc" showLineNumbers
zi snippet OMZP::git
zi cdclear -q
```

Then load the prompt:

```shell title="~/.zshrc" showLineNumbers
setopt prompt_subst
zi light NicoSantangelo/Alpharized
```

## Prezto

### PZT shorthand syntax

```shell title="~/.zshrc" showLineNumbers
zi snippet <URL>        # Raw syntax with URL
zi snippet PZT::<PATH>  # Shorthand PZT::         (https://github.com/sorin-ionescu/prezto/tree/master/)
zi snippet PZTM::<PATH> # Shorthand PZT::modules/ (https://github.com/sorin-ionescu/prezto/tree/master/modules/)
```

### PZT modules {#pzt-modules}

Importing the [environment](https://github.com/sorin-ionescu/prezto/tree/master/modules/environment/README.md) and [terminal](https://github.com/sorin-ionescu/prezto/tree/master/modules/terminal/README.md) Prezto modules example:

Raw syntax

```shell title="~/.zshrc" showLineNumbers
zi snippet https://github.com/sorin-ionescu/prezto/blob/master/modules/environment/init.zsh
zi snippet https://github.com/sorin-ionescu/prezto/blob/master/modules/terminal/init.zsh
```

PZT shorthand syntax:

```shell title="~/.zshrc" showLineNumbers
zi snippet PZT::<PATH>
zi snippet PZT::modules/environment
zi snippet PZT::modules/terminal
```

PZTM shorthand syntax:

```shell title="~/.zshrc" showLineNumbers
zi snippet PZTM::<PATH>
zi snippet PZTM::environment
zi snippet PZTM::terminal
```

Prezto modules:

```diff title="~/.zshrc" showLineNumbers
- zstyle ':prezto:load' pmodule 'git'
- zstyle ':prezto:load' pmodule 'environment' 'terminal'

+ zi snippet PZTM::git
+ zi is-snippet for PZTM::environment PZTM::terminal
```

Available Prezto modules:

| Module name                                                                                                                | Description                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------- |
| [archive](https://github.com/sorin-ionescu/prezto/blob/master/modules/archive/README.md)                                   | Provides functions to list and extract archives.                                                           |
| [autosuggestions](https://github.com/sorin-ionescu/prezto/blob/master/modules/autosuggestions/README.md)                   | Integrates `zsh-autosuggestions` plugin into Prezto.                                                       |
| [command-not-found](https://github.com/sorin-ionescu/prezto/tree/master/modules/command-not-found/README.md)               | Loads the `command-not-found` tool on macOS or Debian-based distributions.                                 |
| [completion](https://github.com/sorin-ionescu/prezto/tree/master/modules/completion/README.md)                             | Sets <kbd>TAB</kbd> completion and provides additional completions from the `zsh-completions`.             |
| [directory](https://github.com/sorin-ionescu/prezto/tree/master/modules/directory/README.md)                               | Sets directory options and defines directory aliases.                                                      |
| [dnf](https://github.com/sorin-ionescu/prezto/tree/master/modules/dnf/README.md)                                           | Defines `dnf` aliases.                                                                                     |
| [docker](https://github.com/sorin-ionescu/prezto/tree/master/modules/docker/README.md)                                     | Defines `docker` aliases and functions.                                                                    |
| [dpkg](https://github.com/sorin-ionescu/prezto/tree/master/modules/dpkg/README.md)                                         | Defines `dpkg` aliases and functions.                                                                      |
| [editor](https://github.com/sorin-ionescu/prezto/tree/master/modules/editor/README.md)                                     | Sets key bindings.                                                                                         |
| [emacs](https://github.com/sorin-ionescu/prezto/tree/master/modules/emacs/README.md)                                       | Enables Emacs dependency management.                                                                       |
| [environment](https://github.com/sorin-ionescu/prezto/tree/master/modules/environment/README.md)                           | Sets general shell options and defines environment variables.                                              |
| [fasd](https://github.com/sorin-ionescu/prezto/tree/master/modules/fasd/README.md)                                         | Maintains a frequently used file and directory list for fast access.                                       |
| [git](https://github.com/sorin-ionescu/prezto/tree/master/modules/git/README.md)                                           | Enhances the Git by providing aliases, functions and by exposing repository status information to prompts. |
| [gnu-utility](https://github.com/sorin-ionescu/prezto/tree/master/modules/gnu-utility/README.md)                           | Provides for the interactive use of GNU utilities on non-GNU systems.                                      |
| [gpg](https://github.com/sorin-ionescu/prezto/tree/master/modules/gpg/README.md)                                           | Provides for an easier use of GPG by setting up `gpg-agent`.                                               |
| [haskell](https://github.com/sorin-ionescu/prezto/tree/master/modules/haskell/README.md)                                   | Enables local Haskell package installation.                                                                |
| [helper](https://github.com/sorin-ionescu/prezto/tree/master/modules/helper/README.md)                                     | Provides helper functions for developing modules.                                                          |
| [history-substring-search](https://github.com/sorin-ionescu/prezto/tree/master/modules/history-substring-search/README.md) | Integrates zsh-history-substring-search into Prezto.                                                       |
| [history](https://github.com/sorin-ionescu/prezto/tree/master/modules/history/README.md)                                   | Sets history options and defines history aliases.                                                          |
| [homebrew](https://github.com/sorin-ionescu/prezto/tree/master/modules/homebrew/README.md)                                 | Defines Homebrew aliases.                                                                                  |
| [macports](https://github.com/sorin-ionescu/prezto/tree/master/modules/macports/README.md)                                 | Defines MacPorts aliases and adds MacPorts directories to path variables.                                  |
| [node](https://github.com/sorin-ionescu/prezto/tree/master/modules/node/README.md)                                         | Provides utility functions for Node.js and loads `npm` completion.                                         |
| [ocaml](https://github.com/sorin-ionescu/prezto/tree/master/modules/ocaml/README.md)                                       | Initializes OCaml package management.                                                                      |
| [osx](https://github.com/sorin-ionescu/prezto/tree/master/modules/osx/README.md)                                           | Defines macOS aliases and functions.                                                                       |
| [pacman](https://github.com/sorin-ionescu/prezto/tree/master/modules/pacman/README.md)                                     | Provides aliases and functions for the Pacman package manager and frontends.                               |
| [perl](https://github.com/sorin-ionescu/prezto/tree/master/modules/perl/README.md)                                         | Enables local Perl module installation on macOS and defines aliases.                                       |
| [prompt](https://github.com/sorin-ionescu/prezto/tree/master/modules/prompt/README.md)                                     | Loads prompt themes.                                                                                       |
| [python](https://github.com/sorin-ionescu/prezto/tree/master/modules/python/README.md)                                     | Enables local Python and local Python package installation.                                                |
| [rails](https://github.com/sorin-ionescu/prezto/tree/master/modules/rails/README.md)                                       | Defines Ruby on Rails aliases.                                                                             |
| [rsync](https://github.com/sorin-ionescu/prezto/tree/master/modules/rsync/README.md)                                       | Defines `rsync` aliases.                                                                                   |
| [ruby](https://github.com/sorin-ionescu/prezto/tree/master/modules/ruby/README.md)                                         | Configures Ruby local gem installation, loads version managers, and defines aliases.                       |
| [screen](https://github.com/sorin-ionescu/prezto/tree/master/modules/screen/README.md)                                     | Defines GNU Screen aliases and provides for auto launching it at start-up.                                 |
| [spectrum](https://github.com/sorin-ionescu/prezto/tree/master/modules/spectrum/README.md)                                 | Provides for easier use of 256 colors and effects.                                                         |
| [ssh](https://github.com/sorin-ionescu/prezto/tree/master/modules/ssh/README.md)                                           | Provides for an easier use of SSH by setting up `ssh-agent`.                                               |
| [syntax-highlighting](https://github.com/sorin-ionescu/prezto/tree/master/modules/syntax-highlighting/README.md)           | Integrates `zsh-syntax-highlighting` into Prezto.                                                          |
| [terminal](https://github.com/sorin-ionescu/prezto/tree/master/modules/terminal/README.md)                                 | Sets terminal window and tab titles.                                                                       |
| [tmux](https://github.com/sorin-ionescu/prezto/tree/master/modules/tmux/README.md)                                         | Defines `tmux` aliases and provides for auto launching it at start-up.                                     |
| [utility](https://github.com/sorin-ionescu/prezto/tree/master/modules/utility/README.md)                                   | Defines general aliases and functions.                                                                     |
| [wakeonlan](https://github.com/sorin-ionescu/prezto/tree/master/modules/wakeonlan/README.md)                               | This module provides a wrapper around the wakeonlan tool.                                                  |
| [yum](https://github.com/sorin-ionescu/prezto/blob/master/modules/autosuggestions/README.md)                               | Defines yum aliases.                                                                                       |

Use `zi ice svn` if multiple files require an entire subdirectory.

- [docker](https://github.com/sorin-ionescu/prezto/tree/master/modules/docker/README.md)
- [git](https://github.com/sorin-ionescu/prezto/tree/master/modules/git/README.md)

```shell title="~/.zshrc" showLineNumbers
zi ice svn
zi snippet PZTM::docker

zi ice svn
zi snippet PZTM::git
```

Use `zi ice as"null"` no `*.plugin.zsh`, `init.zsh`, `*.zsh-theme*` files exist in module directory.

- [archive](https://github.com/sorin-ionescu/prezto/tree/master/modules/archive/README.md):

```shell title="~/.zshrc" showLineNumbers
zi ice svn as"null"
zi snippet PZTM::archive
```

Use `zi ice atclone"git clone <repo> <location>"` if module have external module.

- [completion](https://github.com/sorin-ionescu/prezto/tree/master/modules/completion/README.md):

```shell title="~/.zshrc" showLineNumbers
zi ice svn blockf \
  atclone"git clone --recursive https://github.com/zsh-users/zsh-completions.git external"
zi snippet PZTM::completion
```

Use `blockf` to prevent any unnecessary additions to `fpath`, as Zi manages `fpath`.

:::tip

What is `zstyle`?

- Official (zsh.sourceforge.net): [zsh/zutil](http://zsh.sourceforge.net/Doc/Release/Zsh-Modules.html#The-zsh_002fzutil-Module)
- StackExchange: [What does `zstyle` do?][about-zstyle]

:::

Available

## Zgen

### Load OMZ library

```diff title="~/.zshrc" showLineNumbers
- zgen oh-my-zsh

+ zi snippet OMZL::<ANY OF THEM>
```

### Load OMZ plugins

```diff title="~/.zshrc" showLineNumbers
- zgen oh-my-zsh <PATH>

+ zi snippet OMZP::<PATH>
```

### Load Prezto modules

```diff title="~/.zshrc" showLineNumbers
- zgen prezto <module name>

+ zi snippet PZTM::<module name>
```

Load repositories as prezto plugins:

```diff title="~/.zshrc" showLineNumbers
- zgen pmodule <reponame> <branch>

+ zi ice ver"<branch>"
+ zi load <repo/plugin>
```

### Summarized Zgen

:::info

For the `location`: refer <Link to="/docs/guides/syntax/standard#src-pick-multisrc">src, pick, multisrc</Link> ice-modifier.

:::

```diff title="~/.zshrc" showLineNumbers
- zgen load <repo> [location] [branch]

+ zi ice ver"[branch]"
+ zi load <repo>
```

## Zplug Basics

```diff title="~/.zshrc" showLineNumbers
- zplug <repo/plugin>, tag1:<option1>, tag2:<option2>

+ zi ice tag1"<option1>" tag2"<option2>"
+ zi load <repo/plugin>
```

### Tag comparison

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

<!-- end-of-file -->
<!-- links -->
<!-- external -->

[about-zstyle]: https://unix.stackexchange.com/questions/214657/what-does-zstyle-do
[nicosantangelo/alpharized]: https://github.com/nicosantangelo/Alpharized
[omz/ag]: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/ag
[omz/clipboard]: https://github.com/ohmyzsh/ohmyzsh/blob/master/lib/clipboard.zsh
[omz/docker]: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/docker
[omz/fd]: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/fd
[omz/gitfast]: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/gitfast
[omz/history-substring-search]: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/history-substring-search
[omz/osx]: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/osx
[omz/termsupport]: https://github.com/ohmyzsh/ohmyzsh/blob/master/lib/termsupport.zsh
