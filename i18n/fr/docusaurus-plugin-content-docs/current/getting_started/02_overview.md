---
title: '☑️ Aperçu général'
image: img/logo/320x320.png
description: Aperçu des cas d'utilisation avec ZI
keywords:
  - overview
---

Cet aperçu couvrira les éléments de base pour :

1. [Oh-My-Zsh & Prezto](/search?q=Oh+My+Zsh+%26+Prezto)
2. [Complétions](/search?q=completions)
3. [Mode turbo](/search?q=turbo+mode)
4. [Ice modifiers (Modificateurs de glace)](/search?q=ice+modifiers)

## Chargement des plugins et des snippets

```shell showLineNumbers
zi load z-shell/H-S-MW
zi light zsh-users/zsh-syntax-highlighting
```

Les commandes ci-dessus montrent deux façons de charger un plugin de base. Si vous voulez sourcer des fichiers locaux ou distants (en utilisant une URL directe), vous pouvez le faire avec le snippet ``.

```shell
zi snippet <URL>
```

De telles lignes doivent être ajoutées à `.zshrc`. Les snippets sont mis en cache localement, utilisez l'option `-f` pour télécharger une version fraîche d'un snippet, ou `zi update {URL}`. Utilisez `zi update --all` pour mettre à jour tous les snippets et plugins.

L'utilisation de `load` entraîne l'activation du reporting - vous pouvez suivre ce que fait le plugin, afficher les informations avec `zi report {plugin-name}` et ensuite également décharger le plugin avec `zi unload {plugin-name}`.

L'utilisation de `light` est un chargement nettement plus rapide sans suivi ni rapport, en utilisant lequel l'utilisateur renonce à la possibilité de voir le rapport du plugin et de le décharger.

Utilisation de `load` ou `light`.

```shell showLineNumbers
zi load  <repo/plugin> # Chargement avec rapport/enquête.
zi light <repo/plugin> # Chargement sans rapport/enquête.
```

Plug-in de recherche historique multi-mots chargé avec enquête:

```shell
zi load z-shell/H-S-MW
```

Deux plugins ordinaires ont été chargés sans enquête :

```shell showLineNumbers
zi light zsh-users/zsh-autosuggestions
zi light z-shell/F-Sy-H
```

Extrait:

```shell
zi snippet https://gist.githubusercontent.com/hightemp/5071909/raw/
```

:::note

En mode Turbo, le ralentissement causé par le suivi est négligeable...

:::

## Oh-My-Zsh, Prezto

Pour charger les plugins Oh-My-Zsh et Prezto, utilisez la fonction `snippet` . Les snippets sont des fichiers uniques téléchargés par `curl`, `wget`, etc., la détection automatique de l'outil de téléchargement étant effectuée, directement à partir de l'URL :

```shell showLineNumbers
zi snippet 'https://github.com/robbyrussell/oh-my-zsh/raw/master/plugins/git/git.plugin.zsh'
zi snippet 'https://github.com/sorin-ionescu/prezto/blob/master/modules/helper/init.zsh'
```

De même, pour Oh-My-Zsh et Prezto, vous pouvez utiliser les raccourcis `OMZ: :` et `PZT: :` :

```shell showLineNumbers
zi snippet OMZ::plugins/git/git.plugin.zsh
zi snippet PZT::modules/helper/init.zsh
```

De plus, les snippets supportent le protocole subversion, supporté également par Github. Cela permet de charger des extraits qui sont multi-fichiers (par exemple, un module Prezto peut être constitué de deux ou plusieurs fichiers, par exemple `init.zsh` et `alias.zsh`).

Les fichiers par défaut qui seront sourcés sont : `*.plugin.zsh`, `init.zsh`, `*.zsh-theme`:

L'URL pointe vers un répertoire :

```shell {2} showLineNumbers
zi ice svn
zi snippet PZT::modules/docker
```

## Snippets et performance

L'utilisation de `curl`, `wget`, etc. avec Subversion permet d'éviter presque complètement le code dédié à Oh-My-Zsh et Prezto, ainsi qu'à d'autres frameworks. Cela permet d'améliorer les performances de `ZI`, qui est très rapide et compact (faible empreinte mémoire et temps de chargement court).

## Ice modifiers (Modificateurs de glace)

La commande `zi ice` fournit [ice modificateurs][1] pour la commande unique suivante.

La logique est que "la glace" est quelque chose qui est ajouté, par exemple à une boisson ou à un café, et dans le sens ZI, cela signifie que la glace est un modificateur ajouté à la prochaine commande ZI, et aussi quelque chose qui fond, donc qui ne dure pas longtemps, - et dans l'utilisation ZI, cela signifie que le modificateur ne dure que pour la prochaine commande ZI unique.

En utilisant un autre modificateur de glace "**pick**" les utilisateurs peuvent explicitement **sélectionner le fichier à sourcer**:

```shell {1} showLineNumbers
zi ice svn pick"init.zsh"
zi snippet PZT::modules/git
```

Le contenu du modificateur de glace est simplement mis dans `"…"`, `'…'`, ou `$'…'`. Il n'est pas nécessaire d'ajouter `" :"` après le nom de l'ice-mod (bien qu'il soit autorisé, comme le signe égal `=`, donc par exemple `pick="init.zsh"` ou `pick=init.zsh` sont correctement reconnus).

De cette façon, des éditeurs comme `vim` et `emacs` et aussi `zsh-users/zsh-syntax-highlighting` et `z-shell/F-Sy-H` mettront en évidence le contenu des modificateurs de glace.

## A propos d'`as"program"`

Un plugin peut ne pas être un fichier à sourcer, mais une commande à ajouter à `$PATH`. Pour obtenir cet effet, utilisez le modificateur de glace `as` avec la valeur `program` (ou un alias valeur `command`).

```shell {1} showLineNumbers
zi ice as"program" cp"httpstat.sh -> httpstat" pick"httpstat"
zi light b4b4r07/httpstat
```

La commande ci-dessus ajoutera le répertoire plugin à `$PATH`, copiera le fichier `httpstat.sh` dans `httpstat` et ajoutera des droits d'exécution (`+x`) au fichier sélectionné avec `pick`, c'est-à-dire à `httpstat`. Il existe un autre ice-mod, `mv`, qui fonctionne comme `cp` mais **déplace** un fichier au lieu de **le copier** . `mv` est exécuté avant `cp`.

:::tip

Les glaces `cp` et `mv` (et aussi comme d'autres, comme `atclone`) sont en cours d'exécution lorsque le plugin ou l'extrait est en cours d'installation __. Pour les tester à nouveau, supprimez d'abord le plugin ou le snippet (exemple : `zi delete PZT::modules/osx`).

:::

## À propos d'atpull"…"

La copie du fichier est sûre pour les mises à jour ultérieures - les fichiers originaux du dépôt ne sont pas modifiés et `Git` ne signalera aucun conflit. Cependant, `mv` peut également être utilisé, si un `atpull`approprié, un modificateur de glace exécuté à **update** du plugin, sera utilisé :

```shell showLineNumbers
zi ice as"program" mv"httpstat.sh -> httpstat" \
  pick"httpstat" atpull'!git reset --hard'
zi light b4b4r07/httpstat
```

If `atpull` starts with an exclamation mark, then it will be run before `git pull`, and before `mv`. Nevertheless, `atpull`, `mv`, `cp` are run **only if new commits are to be fetched**.

So in summary, when the user runs `zi update b4b4r07/httpstat` to update this plugin, and there are new commits, what happens first is that `git reset --hard` is run – and it **restores** original `httpstat.sh`, **then** `git pull` is ran and it downloads new commits (doing fast-forward), **then** `mv` is running again so that the command is `httpstat` not `httpstat.sh`.

This way the `mv` ice can be used to induce permanent changes into the plugin's contents without blocking the ability to update it with `git` (or with `subversion` in case of snippets, more on this below).

:::info

For exclamation marks to not be expanded by Zsh an interactive session, use `'…'` not `"…"` to enclose contents of `atpull` [ice-modifier](/search?q=ice-modifier).

:::

## Snippets as'…' commands

Commands can also be added to `$PATH` using **snippets**:

```shell {2} showLineNumbers
zi ice mv"httpstat.sh -> httpstat" \
  pick"httpstat" as"program"
zi snippet https://github.com/b4b4r07/httpstat/blob/master/httpstat.sh
```

:::tip

Snippets also support `atpull`, so it’s possible to do e.g. `atpull'!svn revert'`. There’s also an `atinit` ice-modifier, executed before each loading of plugin or snippet.

:::

## Snippets en tant que'…' complétions (`as'...'`)

En utilisant le modificateur de glace `as''` avec la valeur `completion` vous pouvez faire pointer la sous-commande `snippet` directement vers un fichier completion :

```shell {1} showLineNumbers
zi ice as"completion"
zi snippet https://github.com/docker/cli/blob/master/contrib/completion/zsh/_docker
```

## La gestion des complétions

ZI permet de désactiver et d'activer chaque complétion dans chaque plugin. Essayez d'installer un plugin populaire qui fournit des complétions:

```shell {1} showLineNumbers
zi ice blockf
zi light zsh-users/zsh-completions
```

La première commande, le `blockf` ice, bloquera la méthode traditionnelle d'ajout de complétions. ZI utilise sa méthode, basée sur les liens symboliques au lieu d'ajouter plusieurs répertoires à `$fpath`. ZI **installera** automatiquement les complétions d'un plugin nouvellement téléchargé.

Pour désinstaller et installer les compléments :

- désinstaller : `zi cuninstall zsh-users/zsh-completions`
- installer: `zi creinstall zsh-users/zsh-completions`

### Liste des complétions disponibles

Pour voir quelles complétions fournissent **tous les plugins** , avec une mise en forme tabulaire et avec le nom de chaque plugin:

```shell
zi clist
```

Cette commande est spécialement adaptée pour les plugins tels que `zsh-users/zsh-completions`, qui fournissent plusieurs complétions – la liste aura `3` complétions par ligne, pour qu'un nombre plus petit de pages de terminal soient occupées comme ceci :

```shell showLineNumbers
…
atach, bitcoin-cli, bower zsh-users/zsh-completions
bundle, caféiné, cap zsh-users/zsh-completions
cask, cf, chattr zsh-users/zsh-completions
…
```

Pour afficher plus de complétions par ligne en fournissant un argument **** à `clist`, par exemple : `zi clist 6`, affichera :

```shell showLineNumbers
…
bundle, caffeinate, cap, cask, cf, chattr zsh-users/zsh-completions
cheat, choc, cmake, coffee, column, composer zsh-users/zsh-completions
console, dad, debuild, dget, dhcpcd, diana zsh-users/zsh-completions
…
```

### Activation / désactivation des complétions

Les complétions peuvent être désactivées afin que, par exemple, la complétion originale de Zsh soit utilisée. Les commandes sont très basiques, elles n'ont besoin que du nom **de la complétion**:

```shell {1,3} showLineNumbers
$ zi cdisable cmake
Disabled cmake completion belonging to zsh-users/zsh-completions
$ zi cenable cmake
Enabled cmake completion belonging to zsh-users/zsh-completions
```

C'est tout sur les complétions. Il y a une autre commande, `zi csearch`, qui va **rechercher** tous les répertoires de plugins pour les complétions disponibles.

## Subversion pour les sous-répertoires

En général, pour utiliser les **sous-répertoires** des projets Github comme les snippets, ajoutez `/trunk/{path-to-dir}` à l'URL :

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

## Turbo Mode (Zsh >= 5.3)

The ice-modifier `wait` allows the user to postpone the loading of a plugin to the moment when the processing of `.zshrc` is finished and the first prompt is being shown.

It is like Windows – during startup, it shows desktop even though it still loads data in the background. This has drawbacks but is for sure better than a blank screen for 10 minutes. And here, in ZI, there are no drawbacks of this approach – no lags, freezes, etc. – the command line is fully usable while the plugins are being loaded, for any number of plugins.

:::info

Turbo will speed up Zsh startup by **50%–80%**. For example, instead of 200 ms, it'll be 40 ms.

:::

:::note

Zsh 5.3 or greater is required.

:::

To use this turbo mode add `wait` ice to the target plugin in one of the following ways:

```shell {2} showLineNumbers
PS1="READY > "
zi ice wait'!0'
zi load halfo/lambda-mod-zsh-theme
```

This sets plugin `halfo/lambda-mod-zsh-theme` to be loaded `0` seconds after `zshrc`. It will fire up after c.a. 1 ms of showing the basic prompt `READY >`.

You probably won't load the prompt in such a way, however, it is a good example in which Turbo can be directly observed. The exclamation mark causes ZI to reset the prompt after loading the plugin – it is needed for themes. The same with Prezto prompts, with a longer delay:

```shell showLineNumbers
zi ice svn silent wait'!1' atload'prompt smiley'
zi snippet PZT::modules/prompt
```

Using `zsh-users/zsh-autosuggestions` without any drawbacks:

```shell showLineNumbers
zi ice wait lucid atload'_zsh_autosuggest_start'
zi light zsh-users/zsh-autosuggestions
```

### Turbo wait - the key to performance

It can be loaded asynchronously, which makes a huge difference when the amount of plugins increases. Usually used as `zi ice wait"<SECONDS>"`.

:::note

`wait` et `wait"0"` font la même chose

:::

```shell showLineNumbers
zi ice wait
zi load z-shell/history-search-multi-word
```

Chargement après 2 secondes :

```shell showLineNumbers
zi ice wait"2"
zi load z-shell/history-search-multi-word
```

Peut également être utilisé avec `light` et `snippet`:

```shell showLineNumbers
zi ice wait
zi snippet https://gist.githubusercontent.com/hightemp/5071909/raw/
```

### Turbo & lucid

Turbo and lucid are the most used options, because turbo mode is verbose, may require and option for quiet and this can be achieved with the `lucid`.

```shell showLineNumbers
zi ice wait lucid
zi load z-shell/history-search-multi-word
```

## Turbo with sophisticated prompts

For some, mostly advanced themes the initialization of the prompt is being done in a `precmd`-hook, i.e.; in a function that's gets called before each prompt. The hook is installed by the [add-zsh-hook][12] Zsh function by adding its name to the `$precmd_functions` array.

To make the prompt fully initialized after Turbo loading in the middle of the prompt the same situation as with the `zsh-autosuggestions` plugin, the hook should be called from `atload''` ice`.

First, find the name of the hook function by examining the `$precmd_functions` array. For example, for the `robobenklein/zinc` theme, they'll be two functions: `prompt_zinc_setup` and `prompt_zinc_precmd`:

```shell showLineNumbers
root@user > ~ > print $precmd_functions < ✔ < 22:21:33
_zsh_autosuggest_start prompt_zinc_setup prompt_zinc_precmd
```

Then, add them to the ice-list in the `atload''` ice:

```shell {2} showLineNumbers
zi ice wait'!' lucid nocd \
  atload'!prompt_zinc_setup; prompt_zinc_precmd'
zi load robobenklein/zinc
```

The exclamation mark in `atload'!…'` is to track the functions allowing the plugin to be unloaded, as described [here][11]. It might be useful for the multi-prompt setup described next.

### Summary of turbo mode

Autosuggestions use the `precmd` hook, which is being called right after processing `zshrc` – `precmd` hooks are being called **right before displaying each prompt**.

Turbo with the empty `wait` ice will postpone the loading `1` ms after that, so `precmd` will not be called at that first prompt. This makes autosuggestions inactive at the first prompt.

**However** the given `atload` ice-modifier fixes this, it calls the same function that `precmd` would, right after loading autosuggestions, resulting in the same behavior of the plugin.

The ice `lucid` causes the under-prompt message saying `Loaded zsh-users/zsh-autosuggestions` that normally appears for every Turbo-loaded plugin to not show.

## Automatic condition based - load & unload

Ices `load` and `unload` allow defining when you want plugins active or inactive:

Load when in ~/tmp

```shell {1} showLineNumbers
zi ice load'![[ $PWD = */tmp* ]]' unload'![[ $PWD != */tmp* ]]' \
  atload"!promptinit; prompt sprint3"
zi load z-shell/zprompts
```

Charger lorsqu'IL N'est PAS dans ~ / tmp

```shell {1} showLineNumbers
zi ice load'![[ $PWD != */tmp* ]]' unload'![[ $PWD = */tmp* ]]'
zi load russjohnson/angry-fly-zsh
```

Deux invites, chacune active dans des répertoires différents. Cette technique peut être utilisée pour créer des ensembles de plugins, par exemple en définissant le paramètre `$PLUGINS` avec des valeurs possibles comme `cpp`, `web`, `admin` et en définissant les conditions `load` / `unload` pour activer différents plugins sur `cpp`, sur `web`, etc.

:::note

- La différence avec `wait` est que `load` / `unload` sont constamment actifs, pas seulement jusqu'à la première activation. Notez que pour que le déchargement d'un plugin fonctionne, le plugin doit être chargé avec le suivi, donc `zi load …` et non `zi light …`.

Le suivi entraîne un léger ralentissement, cependant, cela n'influence pas le temps de démarrage de Zsh lorsque vous utilisez le mode turbo.

:::

### Un coup d'œil sur les prompts

:::tip

Voir : [invites multiples][15] pour plus d'informations. Il contient des exemples plus réels d'une configuration multi-prompts, qui est proche de ce que l'auteur utilise dans son installation.

:::

Il s'agit des exemples [powerlevel10k][18], [pure][17], [starship][16] :

Chargez le thème powerlevel10k.

```shell title="~/.zshrc" showLineNumbers
zi ice depth"1"
zi light romkatv/powerlevel10k
```

Chargement du thème pure

- Vous pouvez choisir la bibliothèque `async.zsh` et la sourcez.

```shell {1} title="~/.zshrc" showLineNumbers
zi ice pick"async.zsh" src"pure.zsh"
zi light sindresorhus/pure
```

Charger le thème starship:

- choisira le binaire `starhip` comme commande, à partir de la version GitHub
- `starship` setup : `atclone` create `init.zsh` and `completion`
- `atpull` comportement identique à celui de `atclone` et sera utilisé lors de l'exécution de `zi update`
- `src` sera la source de init.zsh

```shell title="~/.zshrc" showLineNumbers
zi ice as"command" from"gh-r" \
  atclone"./starship init zsh > init.zsh; ./starship completions zsh > _starship" \
  atpull"%atclone" \
  src"init.zsh"
zi light starship/starship
```

## Mises à jour

Mise à jour automatique & compilation :

```shell
zi self-update
```

Mise à jour des plug-ins et des snippets:

```shell
zi update --all
zi update --reset
zi update --quiet
```

Mise à jour des plug-ins ou des snippets:

```shell
zi update --plugins
zi update --snipets
```

Mettre à jour un plug-in spécifique. La valeur par défaut est GitHub mais vous pouvez en spécifier une autre avec ice [from'…'][2]:

```shell
zi update <user>/<repo>
```

Mise à jour en parallèle des plugins :

```shell
zi update --parallel
```

Augmenter le nombre de tâches dans un ensemble simultané à 40

```shell
zi update --parallel 40
```

### Plus d'exemples sur les cas d'utilisation courants

Chargez le thème pur, avec la bibliothèque **zsh-async** qui lui est associée.

```shell title="~/.zshrc" showLineNumbers
zi ice pick"async.zsh" src"pure.zsh"
zi light sindresorhus/pure
```

Version binaire dans l'archive, depuis la page GitHub-releases. Après décompression automatique, il fournit le programme "fzf".

```shell title="~/.zshrc" showLineNumbers
zi ice from"gh-r" as"program"
zi light junegunn/fzf
```

Une autre version binaire doit être renommée de `docker-compose-Linux-x86_64`. Ceci peut être fait par le [modificateur de glace][1]: `mv'{from} -> {to}'`.

Il y a plusieurs paquets par version unique, pour OS X, Linux et Windows - ainsi le modificateur de glace `bpick` est utilisé pour sélectionner le paquet Linux - dans ce cas, ce n'est pas nécessaire, ZI va grep le nom du système d'exploitation et l'architecture automatiquement quand il n'y a pas `bpick`.

```shell title="~/.zshrc" showLineNumbers
zi ice from"gh-r" as"program" mv"docker* -> docker-compose" bpick"*linux*"
zi load docker/compose
```

Dépôt Vim sur GitHub - un code source typique qui nécessite une compilation, ZI peut la gérer pour vous si vous le souhaitez, exécutez `./configure` et `make`. Le modificateur de glace `pick` sélectionne un programme binaire à ajouter au $PATH. Vous pouvez également installer le paquet sous le chemin $ZPFX.

```shell title="~/.zshrc" showLineNumbers
zi ice as"program" atclone"rm -f src/auto/config.cache; ./configure" \
  atpull"%atclone" make pick"src/vim"
zi light vim/vim
```

Scripts qui sont construits lors de l'installation

> Il y a une seule cible make par défaut, "install", et elle construit des scripts.

La glace `make''` pourrait également être : `make "install PREFIX=$ZPFX"`, si "install" n'était pas la seule cible par défaut.

```shell title="~/.zshrc" showLineNumbers
zi ice as"program" pick"$ZPFX/bin/git-*" make"PREFIX=$ZPFX"
zi light tj/git-extras
```

Gère les complétions sans charger de plugin, voir la commande `clist` . Celui-ci ne doit être exécuté qu'une seule fois, lors d'une session interactive.

```shell title="~/.zshrc"
zi creinstall %HOME/my_completions
```

Pour GNU ls les binaires peuvent être gls, gdircolors, mais pas sur OS X lors de l'installation du paquet coreutils de Homebrew.

```shell title="~/.zshrc" showLineNumbers
zi ice atclone"dircolors -b LS_COLORS > c.zsh" \
  atpull'%atclone' pick"c.zsh" nocompile'!'
zi light trapd00r/LS_COLORS
```

`fais'!'` -> exécuter make avant `atclone` & `atpull`.

```shell showLineNumbers
zi ice as"program" make'!' \
  atclone'./direnv hook zsh > zhook.zsh' \
  atpull'%atclone' src"zhook.zsh"
zi light direnv/direnv
```

Si vous souhaitez en essayer davantage, consultez le dépôt [playground][19] où les utilisateurs ont téléchargé le fichier `~/.zshrc` et d'autres configurations ZI. N'hésitez pas à [soumettre][20] votre `~/.zshrc` là s'il contient des commandes ZI.

Exemples supplémentaires : [collection][10].

[1]: /search?q=ice+modifiers

[1]: /search?q=ice+modifiers
[2]: /search?q=from
[10]: /community/gallery/collection
[11]: /docs/guides/syntax/ice#-atclone-atpull-atinit-atload
[12]: /community/zsh_plugin_standard#use-of-add-zsh-hook-to-install-hooks
[15]: /docs/guides/customization#-multiple-prompts
[16]: https://github.com/starship/starship
[17]: https://github.com/sindresorhus/pure
[18]: https://github.com/romkatv/powerlevel10k
[19]: https://github.com/z-shell/playground
[20]: https://github.com/z-shell/playground/issues/new?template=request-to-add-zshrc-to-the-zi-configs-repo.md
