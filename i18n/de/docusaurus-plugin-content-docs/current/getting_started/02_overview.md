---
id: overview
title: "☑️ General Overview"
image: /img/logo/320x320.png
description: Overview of use cases with Zi
keywords:
  - overview
---

<!-- @format -->

This overview will cover the basics for:

1. [Oh-My-Zsh & Prezto](/search?q=Oh+My+Zsh+%26+Prezto)
2. [Completions](/search?q=completions)
3. [Turbo mode](/search?q=turbo+mode)
4. [Ice modifiers](/search?q=ice+modifiers)

## Plugin and snippet loading

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
zi load  <repo/plugin> # Load with reporting/investigating.
zi light <repo/plugin> # Load without reporting/investigating.
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

In turbo mode loading, the slowdown by plugin tracking is done in the background and does not affect the user experience, i.e., loading with `zi light` and `zi load` has the same effect.

:::

## Oh-My-Zsh, Prezto

To load Oh-My-Zsh and Prezto plugins, use the `snippet` feature. Snippets are **single files** downloaded by `curl`, `wget`, etc., automatic detection of the download tool is being performed, directly from the URL:

```shell showLineNumbers
zi snippet 'https://github.com/robbyrussell/oh-my-zsh/raw/master/plugins/git/git.plugin.zsh'
zi snippet 'https://github.com/sorin-ionescu/prezto/blob/master/modules/helper/init.zsh'
```

Also, for Oh-My-Zsh and Prezto, you can use `OMZ::` and `PZT::` shorthands:

```shell showLineNumbers
zi snippet OMZ::plugins/git/git.plugin.zsh
zi snippet PZT::modules/helper/init.zsh
```

Moreover, GitHub supports the Subversion protocol for snippets. This allows loading snippets that are multi-file (for example, a Prezto module can consist of two or more files, e.g. `init.zsh` and `alias.zsh`).

Default files that will be sourced are: `*.plugin.zsh`, `init.zsh`, `*.zsh-theme`:

URL points to a directory:

```shell {2} showLineNumbers
zi ice svn
zi snippet PZT::modules/docker
```

## Snippets and Performance

Using `curl`, `wget`, etc. along with Subversion allows us to almost completely avoid code dedicated to Oh-My-Zsh and Prezto, and also to other frameworks. It delivers better performance as has a low footprint on memory and shorter loading times.

## Ice Modifiers

The command `zi ice` provides [ice modifiers][1] for the single Zi command, i.e., `zi ice <some-ice-modifier>; zi load some/plugin`, after loading some/plugin the ice-modifier has to be set again.

The logic is that "ice" is something that’s added, e.g. to a drink or a coffee, and in the Zi sense this means that ice is a modifier added to the next Zi command, and also something that melts, so it doesn’t last long, – and in the Zi use it means that the modifier lasts for only single next Zi command.

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

Snippets also support `atpull`, e.g. `atpull'!svn revert'`. There’s also an `atinit` ice-modifier, executed before each loading of plugin or snippet.

:::

## Snippets as'…' completion

By using the `as''` ice modifier with the value `completion` you can point the `snippet` subcommand directly to a completion file:

```shell {1} showLineNumbers
zi ice as"completion"
zi snippet https://github.com/docker/cli/blob/master/contrib/completion/zsh/_docker
```

## The completion management

Zi allows to disable and enable each completion in every plugin. Try installing a popular plugin that provides completions:

```shell {1} showLineNumbers
zi ice blockf
zi light zsh-users/zsh-completions
```

The first command, the `blockf` ice, will block the traditional method of adding completions. Zi uses this method, based on symlinks instead of adding several directories to `$fpath`. Zi will automatically **install** completions of a newly downloaded plugin.

To uninstall and install the completions:

- uninstall: `zi cuninstall zsh-users/zsh-completions`
- install: `zi creinstall zsh-users/zsh-completions`

### Listing available completions

To see what completions **all** plugins provide, in tabular formatting and with the name of each plugin:

```shell
zi clist
```

This command is adapted for plugins like `zsh-users/zsh-completions`, which provide many completions – listing will have `3` completions per line, and a smaller number of terminal pages can be occupied like this:

<div className="ScreenView">
  <img
    className="ImageView"
    width="1000"
    height="500"
    src="/asciicast/zi_clist.svg" alt="Zi completion list"
  />
</div>

To show more completions per line by providing an **argument** to `clist`, e.g.: `zi clist 6`, will show:

<div className="ScreenView">
  <img
    className="ImageView"
    width="1000"
    height="500"
    src="/asciicast/zi_clist_6.svg" alt="Zi completion list 6"
  />
</div>

### Enabling / disabling - completions

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

You probably won't load the prompt in such a way, however, it is a good example in which turbo mode can be observed. The exclamation mark causes Zi to reset the prompt after loading the plugin – commonly needed for themes. The same with Prezto prompts, with a longer delay:

```shell showLineNumbers
zi ice svn silent wait'!1' atload'prompt smiley'
zi snippet PZT::modules/prompt
```

Using `zsh-users/zsh-autosuggestions` without any drawbacks:

```shell showLineNumbers
zi ice wait lucid atload'_zsh_autosuggest_start'
zi light zsh-users/zsh-autosuggestions
```

### Turbo mode is the key to the performance

It can be loaded asynchronously, which makes a huge difference when the amount of plugins increases. Usually used as `zi ice wait"<SECONDS>"`.

:::note

The `wait` and `wait"0"` is the same

:::

```shell showLineNumbers
zi ice wait
zi load z-shell/history-search-multi-word
```

Load after 2 seconds:

```shell showLineNumbers
zi ice wait"2"
zi load z-shell/history-search-multi-word
```

Also can be used in `light` and `snippet`:

```shell showLineNumbers
zi ice wait
zi snippet https://gist.githubusercontent.com/hightemp/5071909/raw/
```

### Turbo mode & lucid

Turbo and lucid are the most used options because turbo mode is verbose and may require an option for quiet and this can be achieved with the `lucid`.

```shell showLineNumbers
zi ice wait lucid
zi load z-shell/history-search-multi-word
```

## Turbo mode with sophisticated prompts

For some, mostly advanced themes the initialization of the prompt is being done in a `precmd`-hook, i.e.; in a function that gets called before each prompt. The hook is installed by the [add-zsh-hook][12] Zsh function by adding its name to the `$precmd_functions` array.

To make the prompt fully initialized after turbo mode loading in the middle of the prompt the same situation as with the `zsh-autosuggestions` plugin, the hook should be called from `atload'…'` ice`.

First, find the name of the hook function by examining the `$precmd_functions` array. For example, for the `robobenklein/zinc` theme, they'll be two functions: `prompt_zinc_setup` and `prompt_zinc_precmd`:

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

### Summary of turbo mode

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

Load when NOT in ~/tmp

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

- The difference with `wait` is that `load` / `unload` are constantly active, not only till the first activation. Note that for the unloading of a plugin to work the plugin needs to be loaded with tracking, so `zi load …` and not `zi light …`.

Tracking causes a slight slowdown, however, this doesn’t influence Zsh startup time when using turbo mode.

:::

### A Glance at the prompts

:::tip

See: [multiple prompts](/docs/guides/customization#multiple-prompts) for more information. It contains more real-world examples of a multi-prompt setup, which is close to what the author uses in his setup.

:::

This is [powerlevel10k](https://github.com/romkatv/powerlevel10k), [pure](https://github.com/sindresorhus/pure), [starship](https://github.com/starship/starship) sample:

Load powerlevel10k theme.

```shell title="~/.zshrc" showLineNumbers
zi ice depth"1"
zi light romkatv/powerlevel10k
```

Load pure theme

- Will pick the `async.zsh` library and will source it.

```shell {1} title="~/.zshrc" showLineNumbers
zi ice pick"async.zsh" src"pure.zsh"
zi light sindresorhus/pure
```

Load starship theme:

- will pick `starship` binary as a command, from the GitHub release
- `starship` setup: `atclone` create `init.zsh` and `completion`
- `atpull'…'` behavior same as `atclone'…'` and will be used when running `zi update`
- `src` will source init.zsh

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

Plugin parallel update plugins:

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

There are multiple packages per single version for OS X, Linux, and Windows – the ice-modifier `bpick` is utilized to select the Linux package – in this case - not required, Zi will grep operating system name and architecture automatically when there's no `bpick`.

```shell title="~/.zshrc" showLineNumbers
zi ice from"gh-r" as"program" mv"docker* -> docker-compose" bpick"*linux*"
zi load docker/compose
```

Vim repository on GitHub – a typical source code that needs compilation, Zi can manage the run of `./configure` and other `make` stuff. Ice-modifier `pick` adds the binary program to `$PATH`. You could also install the package under the path $ZPFX.

```shell title="~/.zshrc" showLineNumbers
zi ice as"program" atclone"rm -f src/auto/config.cache; ./configure" \
  atpull"%atclone" make pick"src/vim"
zi light vim/vim
```

Scripts that are built to install

> There's single default make target, "install", and it constructs scripts.

The `make''` ice could also be: `make"install PREFIX=$ZPFX"`, if "install" wouldn't be the only, default target.

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

`make'!'` -> run make before `atclone` & `atpull`.

```shell showLineNumbers
zi ice as"program" make'!' \
  atclone'./direnv hook zsh > zhook.zsh' \
  atpull'%atclone' src"zhook.zsh"
zi light direnv/direnv
```

If you are interested to try out more then check out the [playground repository](https://github.com/z-shell/playground) where users have uploaded the `~/.zshrc` and other Zi configurations. Feel free to [submit](https://github.com/z-shell/playground/issues/new?template=request-to-add-zshrc-to-the-zi-configs-repo.md) your `~/.zshrc` configuration.

Additional examples: [collection][10].

<!-- end-of-file -->
<!-- links -->

[1]: /search?q=ice+modifiers

[1]: /search?q=ice+modifiers
[10]: /community/gallery/collection
[12]: /community/zsh_plugin_standard#use-of-add-zsh-hook-to-install-hooks
