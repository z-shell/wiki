---
id: overview
title: "☑️ General Overview"
image: /img/logo/320x320.png
description: General overview of Zi usage
keywords:
  - overview
---

<!-- @format -->

This overview will cover the basics for:

1. [Oh-My-Zsh & Prezto](/search?q=Oh+My+Zsh+%26+Prezto)
2. [Complétions](/search?q=completions)
3. [Mode turbo](/search?q=turbo+mode)
4. [Ice modifiers (Modificateurs de glace)](/search?q=ice+modifiers)

## Chargement des plugins et des snippets

```shell showLineNumbers
zi load z-shell/H-S-MW
zi light zsh-users/zsh-syntax-highlighting
```

The above commands show two ways of basic plugin loading. If you want to source local or remote files (using a direct URL), you can do so with `snippet`.

```shell
zi snippet <URL>
```

Such lines should be added to `.zshrc`. Snippets are cached locally, use the `-f` option to download a fresh version of a snippet, or `zi update {URL}`. Use `zi update --all` to update all snippets and plugins.

Using `load` causes reporting to be enabled – you can track what the plugin does, view the information with `zi report {plugin-name}` and then also unload the plugin with `zi unload {plugin-name}`.

Using `light` is a faster loading without tracking and reporting about the plugin but also withdrawing the ability to unload it.

Using `load` or `light`.

```shell showLineNumbers
zi load  <repo/plugin> # Chargement avec rapport/enquête.
zi light <repo/plugin> # Chargement sans rapport/enquête.
```

Plugin history-search-multi-word loaded with investigating:

```shell
zi load z-shell/H-S-MW
```

Two regular plugins loaded without investigating:

```shell showLineNumbers
zi light zsh-users/zsh-autosuggestions
zi light z-shell/F-Sy-H
```

Snippet:

```shell
zi snippet https://gist.githubusercontent.com/hightemp/5071909/raw/
```

:::note

En mode de chargement turbo, le ralentissement par le suivi des plugins se fait en arrière-plan et n'affecte pas l'expérience de l'utilisateur, c'est-à-dire que le chargement avec `zi light` et `zi load` a le même effet.

:::

## Oh-My-Zsh, Prezto

To load Oh-My-Zsh and Prezto plugins, use the `snippet` feature. Les extraits sont des **fichiers uniques** téléchargés par `curl`, `wget`, etc., la détection automatique de l'outil de téléchargement est effectuée, directement à partir de l'URL:

```shell showLineNumbers
zi snippet 'https://github.com/robbyrussell/oh-my-zsh/raw/master/plugins/git/git.plugin.zsh'
zi snippet 'https://github.com/sorin-ionescu/prezto/blob/master/modules/helper/init.zsh'
```

Aussi, pour Oh-My-Zsh et Prezto, vous pouvez utiliser `OMZ::` et `PZT::` comme raccourcis:

```shell showLineNumbers
zi snippet OMZ::plugins/git/git.plugin.zsh
zi snippet PZT::modules/helper/init.zsh
```

Moreover, GitHub supports the Subversion protocol for snippets. This allows loading snippets that are multi-file (for example, a Prezto module can consist of two or more files, e.g. `init.zsh` and `alias.zsh`).

Default files that will be sourced are: `*.plugin.zsh`, `init.zsh`, `*.zsh-theme`:

L'URL pointe vers un répertoire:

```shell {2} showLineNumbers
zi ice svn
zi snippet PZT::modules/docker
```

## Snippets et performance

Using `curl`, `wget`, etc. along with Subversion allows us to almost completely avoid code dedicated to Oh-My-Zsh and Prezto, and also to other frameworks. It delivers better performance as has a low footprint on memory and shorter loading times.

## Ice modifiers (Modificateurs de glace)

The command `zi ice` provides [ice modifiers][1] for the single Zi command, i.e., `zi ice <some-ice-modifier>; zi load some/plugin`, after loading some/plugin the ice-modifier has to be set again.

La logique est que "la glace" est quelque chose qui est ajouté, par exemple à une boisson ou à un café, et dans le sens Zi, cela signifie que la glace est un modificateur ajouté à la prochaine commande Zi, et aussi quelque chose qui fond, donc qui ne dure pas longtemps, - et dans l'utilisation Zi, cela signifie que le modificateur ne dure que pour la prochaine commande Zi unique.

Using one other ice modifier "**pick**" users can explicitly **select the file to source**:

```shell {1} showLineNumbers
zi ice svn pick"init.zsh"
zi snippet PZT::modules/git
```

Content of ice-modifier is simply put into `"…"`, `'…'`, or `$'…'`. No need for `":"` after the ice-modifier name (although it's allowed: as the equal sign `=`, e.g. `pick="init.zsh"` or `pick=init.zsh`).

This way editors like `vim` and `emacs` and also `zsh-users/zsh-syntax-highlighting` and `z-shell/F-Sy-H` will highlight contents of ice-modifiers.

## About as"program"

A plugin might not be a file for sourcing, but a command to be added to `$PATH`. To obtain this effect, use ice-modifier `as` with value `program` (or an alias value `command`).

```shell {1} showLineNumbers
zi ice as"program" cp"httpstat.sh -> httpstat" pick"httpstat"
zi light b4b4r07/httpstat
```

The above command will add plugin directory to `$PATH`, copy file `httpstat.sh` into `httpstat` and add execution rights (`+x`) to the file selected with `pick`, i.e. to `httpstat`. Another ice-mod exists, `mv`, which works like `cp` but **moves** a file instead of **copying** it. `mv` is run before `cp`.

:::tip

The `cp` and `mv` ices (and also some other ones, like `atclone`) are being run when the plugin or snippet is being _installed_. To test them again first delete the plugin or snippet (example: `zi delete PZT::modules/osx`).

:::

## Ice modifier: atpull'…'

Copying file is safe for doing later updates – original files of the repository are unmodified and `Git` will report no conflicts. However, `mv` also can be used, if a proper `atpull`, an ice-modifier ran at **update** of the plugin:

```shell showLineNumbers
zi ice as"program" mv"httpstat.sh -> httpstat" \
  pick"httpstat" atpull'!git reset --hard'
zi light b4b4r07/httpstat
```

If `atpull` starts with an exclamation mark, then it will be run before `git pull`, and before `mv`. Nevertheless, `atpull`, `mv`, `cp` are run **only if new commits are to be fetched**.

So in summary, when the user runs `zi update b4b4r07/httpstat` to update this plugin, and there are new commits, what happens first is that `git reset --hard` is run – and it **restores** original `httpstat.sh`, **then** `git pull` is ran and it downloads new commits (doing fast-forward), **then** `mv` is running again so that the command is `httpstat` not `httpstat.sh`.

This way the `mv` ice can be used to induce permanent changes into the plugin's contents without blocking the ability to update it with `git` or with `subversion` in the case of snippets.

:::info

For exclamation marks to not be expanded by Zsh an interactive session, use `'…'` not `"…"` to enclose contents of `atpull` [ice-modifier](/search?q=ice-modifier).

:::

## Ice modifier: subscribe'…'

Ice modifier defers the loading of a plugin, while checking the modification time of the given file(s), and when it changes, it then triggers loading of the plugin or a snippet.

Copy and paste the example below to the terminal or add it to the `.zshrc` file and reload the shell with `exec zsh`.

```shell {1} showLineNumbers
zi ice subscribe'{~/files-*,/tmp/files-*}' id-as'z-sub' lucid \
  atload'+zi-message "{profile}I have been loaded{nl}\
  {auto}\`Zi Rocks ♥\`"' notify"Yes that is cool ♥ "
zi load z-shell/0
```

Update file as subscribed above to test the ice modifier:

```shell
touch ~/files-1
```

The plugin or snippet will be sourced as many times as the file gets updated.

## Snippets as'…' program

Commands can also be added to `$PATH` using **snippets**:

```shell {2} showLineNumbers
zi ice mv"httpstat.sh -> httpstat" \
  pick"httpstat" as"program"
zi snippet https://github.com/b4b4r07/httpstat/blob/master/httpstat.sh
```

:::tip

Snippets also support `atpull`, e.g. `atpull'!svn revert'`. Il y a aussi un modificateur de glace `atinit`, exécuté avant chaque chargement de plugin ou de snippet.

:::

## Snippets as'…' completion

By using the `as'…'` ice modifier with the value `completion` you can point the `snippet` subcommand directly to a completion file:

```shell {1} showLineNumbers
zi ice as"completion"
zi snippet https://github.com/docker/cli/blob/master/contrib/completion/zsh/_docker
```

## The completion management

Zi permet de désactiver et d'activer chaque complétion dans chaque plugin. Try installing a popular plugin that provides completions:

```shell {1} showLineNumbers
zi ice blockf
zi light zsh-users/zsh-completions
```

The first command, the `blockf` ice, will block the traditional method of adding completions. Zi utilise sa méthode, basée sur les liens symboliques au lieu d'ajouter plusieurs répertoires à `$fpath`. Zi **installera** automatiquement les complétions d'un plugin nouvellement téléchargé.

Pour désinstaller et installer les complétions:

- uninstall: `zi cuninstall zsh-users/zsh-completions`
- installer: `zi creinstall zsh-users/zsh-completions`

### Liste des complétions disponibles

Pour voir quels complétions **tous les plugins** fournissent, sous forme de tableau et avec le nom de chaque plugin:

```shell
zi clist
```

Cette commande est adaptée aux plugins comme `zsh-users/zsh-completions`, qui fournissent de nombreux complétions - le listing aura `3` complétions par ligne, et un plus petit nombre de pages de terminal peut être occupé de cette manière:

import ImgShow from '@site/src/components/ImgShow';

<ImgShow img="/asciicast/zi_clist.svg" alt="Zi completion list" />

Pour afficher plus d'une complétions par ligne en fournissant un argument **** à `clist`, par exemple: `zi clist 6`, affichera:

<div className="ScreenView">
  <img
    className="ImageView"
    width="1000"
    height="500"
    src="/asciicast/zi_clist_6.svg" alt="Zi completion list 6"
  />
</div>

### Activation / désactivation des complétions

Completions can be disabled and other completion will be used, e.g. Zsh builtin. The commands are very basic, they only need completion **name**:

```shell {1,3} showLineNumbers
$ zi cdisable cmake
Disabled cmake completion belonging to zsh-users/zsh-completions
$ zi cenable cmake
Enabled cmake completion belonging to zsh-users/zsh-completions
```

Command `zi csearch` will **search** all plugin directories for available completions:

<div className="ScreenView">
  <img
    className="ImageView"
    width="1000"
    height="500"
    src="/asciicast/zi_csearch.svg" alt="Zi completion search"
  />
</div>

## The subversion for subdirectories

In general, to use **subdirectories** of Github projects as snippets add `/trunk/{path-to-dir}` to the URL:

```shell showLineNumbers
zi ice svn
zi snippet https://github.com/zsh-users/zsh-completions/trunk/src
```

:::tip

For Oh-My-Zsh and Prezto, the OMZ:: and PZT:: prefixes work without the need to add the `/trunk/` infix, however, the path should point to a directory, not to a file.

:::

```shell showLineNumbers
zi ice svn
zi snippet PZT::modules/docker
```

## Turbo Mode (Zsh >= 5.3) {#turbo-mode-zsh--53}

The ice-modifier `wait` allows the user to postpone the loading of a plugin to the moment when the processing of `.zshrc` is finished and the first prompt is shown.

It is like Windows – during startup, it shows desktop even though it still loads data in the background. This has drawbacks but is for sure better than a blank screen for 10 minutes. But in Zi, there are no drawbacks of this approach – no lags, freezes, etc. – the command line is fully usable while the plugins are being loaded, for any number of plugins.

:::info

Turbo will speed up Zsh startup by **50%–80%**. For example, instead of 200 ms, it'll be 40 ms.

:::

:::note

Zsh 5.3 or greater is required.

:::

To use turbo mode add `wait` ice to the target plugin in one of the following ways:

```shell {2} showLineNumbers
PS1="READY > "
zi ice wait'!0'
zi load halfo/lambda-mod-zsh-theme
```

This sets plugin `halfo/lambda-mod-zsh-theme` to be loaded `0` seconds after `zshrc`. It will fire up after c.a. 1 ms of showing the basic prompt `READY >`.

You probably won't load the prompt in such a way, however, it is a good example in which turbo mode can be observed. Le point d'exclamation fait en sorte que Zi réinitialise l'invite après le chargement du plugin - il est nécessaire pour les thèmes. Idem avec les invites Prezto, avec un délai plus long:

```shell showLineNumbers
zi ice svn silent wait'!1' atload'prompt smiley'
zi snippet PZT::modules/prompt
```

Utilisation de `zsh-users/zsh-autosuggestions` sans aucun inconvénient:

```shell showLineNumbers
zi ice wait lucid atload'_zsh_autosuggest_start'
zi light zsh-users/zsh-autosuggestions
```

### Turbo en attente - la clé de la performance

It can be loaded asynchronously, which makes a huge difference when the amount of plugins increases. Usually used as `zi ice wait"<SECONDS>"`.

:::note

The `wait` and `wait"0"` is the same

:::

```shell showLineNumbers
zi ice wait
zi load z-shell/history-search-multi-word
```

Charger après 2 secondes:

```shell showLineNumbers
zi ice wait"2"
zi load z-shell/history-search-multi-word
```

Also can be used in `light` and `snippet`:

```shell showLineNumbers
zi ice wait
zi snippet https://gist.githubusercontent.com/hightemp/5071909/raw/
```

### Turbo & lucid

Turbo and lucid are the most used options because turbo mode is verbose and may require an option for quiet and this can be achieved with the `lucid`.

```shell showLineNumbers
zi ice wait lucid
zi load z-shell/history-search-multi-word
```

## Turbo mode with sophisticated prompts

For some, mostly advanced themes the initialization of the prompt is being done in a `precmd`-hook, i.e.; in a function that gets called before each prompt. Le hook est installé par la fonction Zsh [add-zsh-hook][12] en ajoutant son nom au tableau `$precmd_functions`.

Pour que l'invite soit pleinement initialisée après le chargement du mode turbo au milieu de l'invite, la même situation qu'avec le plug-in `zsh-autosuggestions` , le crochet doit être appelé à partir la de `atload'…'`\`.

Tout d'abord, trouvez le nom de la fonction hook en examinant le tableau `$precmd_functions`. For example, for the `robobenklein/zinc` theme, they'll be two functions: `prompt_zinc_setup` and `prompt_zinc_precmd`:

```shell showLineNumbers
root@user > ~ > print $precmd_functions < ✔ < 22:21:33
_zsh_autosuggest_start prompt_zinc_setup prompt_zinc_precmd
```

Then, add them to the ice list in the `atload'…'` ice:

```shell {2} showLineNumbers
zi ice wait'!' lucid nocd \
  atload'!prompt_zinc_setup; prompt_zinc_precmd'
zi load robobenklein/zinc
```

The exclamation mark in `atload'!…'` is to track the functions allowing the plugin to be unloaded, as described [here](/docs/guides/syntax/ice#atclone-atpull-atinit-atload). It might be useful for the multi-prompt setup described next.

### Récapitulatif du mode turbo

Autosuggestions use the `precmd` hook, which is being called right after processing `.zshrc` – `precmd` hooks are being called **right before displaying each prompt**.

Turbo mode with the empty `wait` ice will postpone the loading `1` ms after that, so `precmd` will not be called at that first prompt. This makes autosuggestions inactive at the first prompt.

**However** the given `atload'…'` ice-modifier fixes this, it calls the same function that `precmd` would, right after loading autosuggestions, resulting in the same behavior of the plugin.

The ice called `lucid` causes the under-prompt message saying `Loaded zsh-users/zsh-autosuggestions` that normally appears for every Turbo-loaded plugin to not show.

## Automatic condition based - load & unload

Ices `load` and `unload` allow defining when you want plugins active or inactive:

Load when in ~/tmp

```shell {1} showLineNumbers
zi ice load'![[ $PWD = */tmp* ]]' unload'![[ $PWD != */tmp* ]]' \
  atload'!promptinit; prompt sprint3'
zi load z-shell/zprompts
```

<span className="ScreenView">
  <img
    className="ImageView"
    width="1000"
    height="500"
    src="/asciicast/zi_load_at_tmp.svg" alt="Zi load at /tmp"
  />
</span>

Charger lorsqu'IL N'est PAS dans ~/tmp

```shell {1} showLineNumbers
zi ice load'![[ $PWD != */tmp* ]]' unload'![[ $PWD = */tmp* ]]'
zi load russjohnson/angry-fly-zsh
```

<span className="ScreenView">
  <img
    className="ImageView"
    width="1000"
    height="500"
    src="/asciicast/zi_load_not_tmp.svg" alt="Zi load not at /tmp"
  />
</span>

Two prompts, each active in different directories. This technique can be used to have plugin-sets, e.g. by defining parameter `$PLUGINS` with possible values like `cpp`, `web`, `admin` and by setting `load` / `unload` conditions to activate different plugins on `cpp`, on `web`, etc.

:::note

- La différence avec `wait` est que `load` / `unload` sont constamment actifs, pas seulement jusqu'à la première activation. Notez que pour que le déchargement d'un plugin fonctionne, le plugin doit être chargé avec le suivi, donc `zi load …` et non `zi light …`.

Tracking causes a slight slowdown, however, this doesn’t influence Zsh startup time when using turbo mode.

:::

### Un coup d'œil sur les prompts

:::tip

See: [multiple prompts](/docs/guides/customization#multiple-prompts) for more information. It contains more real-world examples of a multi-prompt setup, which is close to what the author uses in his setup.

:::

Il s'agit des échantillons de [powerlevel10k](https://github.com/romkatv/powerlevel10k), [pure](https://github.com/sindresorhus/pure), [starship](https://github.com/starship/starship):

Load powerlevel10k theme.

```shell title="~/.zshrc" showLineNumbers
zi ice depth"1"
zi light romkatv/powerlevel10k
```

Load pure theme

- Vous pouvez choisir la bibliothèque `async.zsh` et la sourcez.

```shell {1} title="~/.zshrc" showLineNumbers
zi ice pick"async.zsh" src"pure.zsh"
zi light sindresorhus/pure
```

Load starship theme:

- choisira le binaire `starhip` comme commande, à partir de la version GitHub
- `starship` configuration: `atclone` créer `init.zsh` et `completion`
- `atpull` comportement identique à celui de `atclone` et sera utilisé lors de l'exécution de `zi update`
- `src` sera la source de init.zsh

```shell title="~/.zshrc" showLineNumbers
zi ice as"command" from"gh-r" \
  atclone"./starship init zsh > init.zsh; ./starship completions zsh > _starship" \
  atpull"%atclone" \
  src"init.zsh"
zi light starship/starship
```

## Updates & upgrades

Self-update & compile:

```shell
zi self-update
```

Update plugins and snippets:

```shell
zi update --all
zi update --reset
zi update --quiet
```

Update plugins or snippets:

```shell
zi update --plugins
zi update --snippets
```

Update specific plugin. Default is GitHub but can specify any with ice [from'…'](/search?q=from):

```shell
zi update <user>/<repo>
```

Plugins de mise à jour parallèle des plugins:

```shell
zi update --parallel
```

Increase the number of jobs in a concurrent set to 40

```shell
zi update --parallel 40
```

### More examples of common use cases

Load the pure theme, with the **zsh-async** library that's bundled with it.

```shell title="~/.zshrc" showLineNumbers
zi ice pick"async.zsh" src"pure.zsh"
zi light sindresorhus/pure
```

Binary release in the archive, from GitHub. After automatic unpacking, it provides the program "fzf".

```shell title="~/.zshrc" showLineNumbers
zi ice from"gh-r" as"program"
zi light junegunn/fzf
```

One other binary release needs renaming from `docker-compose-Linux-x86_64`. This can be done by [ice modifier][1]: `mv'{from} -> {to}'`.

Il y a plusieurs paquets par version unique, pour OS X, Linux et Windows - ainsi le modificateur de glace `bpick` est utilisé pour sélectionner le paquet Linux - dans ce cas, ce n'est pas nécessaire, Zi va grep le nom du système d'exploitation et l'architecture automatiquement quand il n'y a pas `bpick`.

```shell title="~/.zshrc" showLineNumbers
zi ice from"gh-r" as"program" mv"docker* -> docker-compose" bpick"*linux*"
zi load docker/compose
```

Dépôt Vim sur GitHub - un code source typique qui nécessite une compilation, Zi peut la gérer pour vous si vous le souhaitez, exécutez `./configure` et `make`. Ice-modifier `pick` adds the binary program to `$PATH`. You could also install the package under the path $ZPFX.

```shell title="~/.zshrc" showLineNumbers
zi ice as"program" atclone"rm -f src/auto/config.cache; ./configure" \
  atpull"%atclone" make pick"src/vim"
zi light vim/vim
```

Scripts that are built to install

> Il y a une seule cible make par défaut, "install", et elle construit des scripts.

The `make'…'` ice could also be: `make"install PREFIX=$ZPFX"`, if "install" wouldn't be the only, default target.

```shell title="~/.zshrc" showLineNumbers
zi ice as"program" pick"$ZPFX/bin/git-*" make"PREFIX=$ZPFX"
zi light tj/git-extras
```

Handle completions without loading any plugin, see the `clist` command. This one is to be run just once, in an interactive session.

```shell title="~/.zshrc"
zi creinstall %HOME/my_completions
```

For GNU "ls" the binaries can be gls, gdircolors, but not on OS X when installing the coreutils package from Homebrew.

```shell title="~/.zshrc" showLineNumbers
zi ice atclone"dircolors -b LS_COLORS > c.zsh" \
  atpull'%atclone' pick"c.zsh" nocompile'!'
zi light trapd00r/LS_COLORS
```

`make'!'` -> exécuter make avant `atclone` & `atpull`.

```shell showLineNumbers
zi ice as"program" make'!' \
  atclone'./direnv hook zsh > zhook.zsh' \
  atpull'%atclone' src"zhook.zsh"
zi light direnv/direnv
```

Si vous souhaitez en essayer davantage, consultez le dépôt [playground](https://github.com/z-shell/playground) où les utilisateurs ont téléchargé le fichier `~/.zshrc` et d'autres configurations Zi. Feel free to [submit](https://github.com/z-shell/playground/issues/new?template=request-to-add-zshrc-to-the-zi-configs-repo.md) your `~/.zshrc` configuration.

Additional examples: [collection][10].

<!-- end-of-file -->
<!-- links -->

[1]: /search?q=ice+modifiers

[1]: /search?q=ice+modifiers
[10]: /community/gallery/collection
[12]: /community/zsh_plugin_standard#use-of-add-zsh-hook-to-install-hooks
