---
id: synopsis
title: "📦 概要"
sidebar_position: 1
image: /img/png/theme/z/320x320.png
description: Introduction to packages.
keywords:
  - package
  - zpackage
  - zsh-package
  - packages-overview
---

<!-- @format -->

The motivation for adding packages functionality:

1. Zi is a flexible and feature-rich plugin manager, however, users often feel overwhelmed by its configuration.

2. It has multiple package-manager-like features, such as:

   - get the plugin's Git repository OR release-package URL,
   - get the list of the recommended [ice-modifiers][] for the plugin,
     - there can be multiple lists of [ice-modifiers][],
     - the ice-modifiers list is stored in profiles; there's at least one profile, default,
     - the [ice-modifiers][] can be selectively overridden.
   - automatically provide so-called shims (i.e.: forwarder scripts) for the binaries,
   - extend `$PATH` to expose the binaries,
   - it can run `Makefile` and more.

3. In general, Zi has many hooks which allow surprising things, however, their content often evolves to a gradually better one and it's hard to keep track of all the current versions.

:::info

The [bin-gem-node][] annex is recommended, otherwise, some packages will fail to install due to missing functionality.

:::

## The [any-gem][] and [any-node][] packages

They allow the installation of any Gem(s) or Node module(s) locally in a newly created plugin directory. For example:

```shell showLineNumbers
zi pack param='GEM -> rails' for any-gem
zi pack param='MOD -> doctoc' for any-node
```

If the installation is used in the `.zshrc` file then use `id-as'…'`, then Zi knows that the package is already installed.

:::note

The Unicode arrow is allowed in Zi syntax as in the example below.

:::

```shell
zi id-as=jekyll pack param='GEM → jekyll' for any-gem
```

The binaries will be exposed without altering the PATH via shims. Shims are correctly removed when deleting a plugin with `zi delete …` The so-called packages are GitHub repositories holding a `package.json` file with the meta-data in them. This way you don't have to (but still can) specify ice-modifiers, which might be handy when the [ice-modifiers][] list is long and complex.

## Introductory example

This way, instead of the following command used to install `fzf`:

```shell showLineNumbers
zi lucid as=program pick="$ZPFX/bin/(fzf|fzf-tmux)" \
  atclone="cp shell/completion.zsh _fzf_completion; \
    cp bin/(fzf|fzf-tmux) $ZPFX/bin" \
  make="PREFIX=$ZPFX install" for \
    junegunn/fzf
```

you only need:

```shell
zi pack for fzf
```

to get the complete setup of the fuzzy finder, including:

- the completion
- the additional executable script `fzf-tmux`

The installation is like with package-manager because you don't need to invoke Zi anymore once installed to use `fzf` (that's because `fzf` is just a binary program and not e.g.: a shell function). You can also update the package with `zi update fzf` – it'll cause the project to refresh and rebuild, like with a "normal" package manager such as `apt-get`. However, it'll be more like to `emerge` from Gentoo, because the installation will be from the source… unless… the user will pick up a binary installation by profile argument specified in the `pack'…'` ice.

## Pros of using the Zi package for regular software installations

Using Zi to install software where one could use a regular package manager has several advantages:

1. **Pro:** The Zi packages typically use the URLs to the official and _latest_ distributions of the software (e.g.: the [ecs-cli][] package, which uses the URL: `https://amazon-ecs-cli.s3.amazonaws.com/ecs-cli-linux-amd64-latest` when installing on Linux).

2. **Pro:** You can influence the installation easily by specifying Zi ice-modifiers, e.g.:

   ```shell
   zi pack=bgn atclone="cp fzy.1 $ZI[MAN_DIR]/man1" for fzy
   ```

   to install also the man page for the `fzy` fuzzy finder (this omission in the package will be fixed soon).

3. **Pro:** The installation is much more flexible than a normal package manager. Example available degrees of freedom:

   - to install from Git or release-tarball, or a binary-release file,
   - to install via shims or via extending `$PATH`, or by copying to `$ZPFX/bin`,
   - to download files and apply patches to the source by using the `patch-dl` annex features.

4. **Pro:** The installations are located in the user home directory, which doesn't require root access. Also, for Gems and Node modules, they are installed in their plugin directory, which can have advantages (e.g.: isolation allowing e.g: easy removal by `rm -rf …`).

5. **Con:** You're somewhat "on your own", with no support from any package maintainer.

Thus, summing up 1. with 4., it might be nice/convenient too, for example, have the latest ECS CLI binary installed in the home directory, without using root access and always the latest, and – summing up with 2. and 3. – to, for example, have always the latest `README` downloaded by additional ice: `dl'https://raw.githubusercontent.com/aws/amazon-ecs-cli/master/README.md'` (and then to have the `README` converted into a man page by the `remark` Markdown processor or other via an `atclone''` ice, as the tool doesn't have any official man page).

## Adding your package

1. Contact the author to have the repository at the [Z-Shell][z-shell] organization or set the [ZI\[PKG_OWNER\]][modify-settings].

2. Populate the `package.json` – I suggest grabbing the one for `fzf` or `doctoc` and doing a few substitutions like [doctoc][] → `your-project` and then simply filling the `default` profile in the `zi-ices` object – it is same as passing ice-modifiers to `zi ice …` but in JSON.

3. The project name in the `package.json` should start with `zsh-`. The prefix will be skipped when specifying it with Zi.

4. Commit and push.

<!-- end-of-file -->
<!-- links -->



<!-- external -->

[bin-gem-node]: /ecosystem/annexes/bin-gem-node
[ice-modifiers]: /docs/guides/syntax/ice-modifiers
[modify-settings]: /docs/guides/customization#modify-settings

[any-gem]: https://github.com/z-shell/any-gem
[any-node]: https://github.com/z-shell/any-node
[ecs-cli]: https://github.com/z-shell/ecs-cli
[z-shell]: https://github.com/z-shell
[doctoc]: https://github.com/z-shell/doctoc
