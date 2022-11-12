---
id: readurl
title: "🌀 Read URL"
image: /img/png/theme/z/320x320.png
description: Annex - Read URL documentation.
keywords:
  - annex
  - zannex
  - readurl
---

<!-- @format -->

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import Link from '@docusaurus/Link';

An annex allows automatically downloading the newest version of a file to which the URL is hosted on a webpage. It works as follows:

Invoke `snippet` (or simply pass the `http://…` address using the `for` syntax) on the web page that hosts the URL to the file to download, provide `dlink'…'` ice with the expected file-download URL replacing the version with the `%VERSION%` keyword, also provide `as'…'` ice with one of the following values:

1. `readurl`,
2. `readurl|command`,
3. `readurl|completion`,
4. `readurl|null`.

:::note

The part after the `|` has the same meaning as in the normal `as'…'` ice.

:::

Example:

```shell showLineNumbers
zi id-as=fzf as='readurl|command' extract for \
  dlink='/junegunn/fzf/releases/download/%VERSION%/fzf-%VERSION%-linux_amd64.tgz' \
    https://github.com/junegunn/fzf/releases/
```

The snippet is just an example. The same effect is obtained by loading as the `junegunn/fzf` plugin with `from'gh-r'` ice.

As it can be seen, the `dlink'…'` can be a relative or an absolute path and also a full URL (i.e.: beginning with the `http://…` prefix).

## Intermediate download page

Sometimes, like it is in the case of the [terraform][] command, the final download link isn't on the download page, but on a page, that's listed on it. In such a case use the `dlink0'…'` ice to provide the pattern for the additional, intermediate download page. For example, in the case of `terraform`, the ZI command is:

```shell showLineNumbers
zi id-as=terraform as='readurl|command' extract for \
  dlink0='/terraform/%VERSION%/' \
  dlink='/terraform/%VERSION%/terraform_%VERSION%_linux_386.zip' \
    http://releases.hashicorp.com/terraform/
```

## Skipping `dlink'…'` ice

Sometimes the URL of the download page differs from the URL of the archive in just a few `/`-sections. In such a case, it is possible to skip the `dlink'…'` ice by appending a `++`-separated fragment of the archive URL, like so:

```shell showLineNumbers
zi as'readurl|command' extract for \
  http://domain.com/download-page++/archive.zip
```

If the archive URL has some different `/`-sections, then it's possible to strip the conflicting ones from the download URL by using `+++`, `++++`, etc. – the number of the `/`-section that'll be stripped equals to the number of the `+` minus 2. So, for example:

```shell showLineNumbers
zi as'readurl|command' extract for \
  http://domain.com/download-page/removed-section+++/archive.zip
```

## Sorting the matched URLs / package versions

Sometimes the download page doesn't list the package versions from newest to oldest, but in some other order. In such case, it's possible to sort the URLs / package versions by prepending the chosen `dlink` ice (`dlink0'…'` or `dlink'…'`) with the exclamation mark (`dlink'!…'`, etc.). See the next section for an example:

## Filtering the matched URLs

Sometimes some unwanted URLs match the `dlink'…'`/`dlink0'…'` regex/pattern. In such a case it's possible to filter them out by appending a filtering regex to the `dlink'…'` ice as: `dlink='the-main-regex~%the-unwanted-URLs-regex%'` (or the same for `dlink0'…'`). An example package that can benefit from this is the [Open Shift][] client, which doesn't sort the URLs from latest to the oldest – hence the exclamation mark (`!`) prepend – and it has special URLs like `stable-4.4` or `candidate-4.5` together with the regular version URLs (like `4.5.0-rc.1`):

```shell showLineNumbers
zi id-as"ocp" as"readurl|command" for \
  dlink0'!%VERSION%~%(stable|latest|fast|candidate).*%' \
  dlink"openshift-client-windows-%VERSION%.zip" \
    https://mirror.openshift.com/pub/openshift-v4/clients/ocp/
```

The above snippet of Zsh code / ZI invocation will sort the URLs (`dlink0'!…'`) and then filter out the special ones from the results (via `…~%(stable|latest|fast|candidate).*%`), this way selecting the latest version of the Open Shift client.

## Other Examples

[Pulumi][], a tool to create, deploy and manage modern cloud software.

```shell showLineNumbers
zi id-as'pulumi' as'readurl|null' extract'!' for \
  dlink='https://get.pulumi.com/releases/sdk/pulumi-%VERSION%-linux-x64.tar.gz' \
  sbin'pulumi*' \
    https://www.pulumi.com/docs/get-started/install/versions/
```

## Install readurl {#install-readurl}

:::info Source

- <Link className="github-link" href="https://github.com/z-shell/z-a-readurl">z-shell/z-a-readurl</Link>

:::

<Tabs>
  <TabItem value="default" label="Default" default>

Add the following snippet in the `.zshrc` file:

```shell
zi light z-shell/z-a-readurl
```

</TabItem>
</Tabs>

This will register the `dlink'…'` and `dlink0'…'` ice-modifiers and also the special `as'readurl|…'` value of the `as'…'`.

<!-- end-of-file -->
<!-- links -->
<!-- external -->

[Open Shift]: https://www.openshift.com/
[Pulumi]: https://www.pulumi.com/
[terraform]: http://releases.hashicorp.com/terraform
