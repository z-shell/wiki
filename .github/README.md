<h1 align="center">
  <a href="https://github.com/z-shell/zi">
    <img src="https://github.com/z-shell/zi/raw/main/docs/images/logo.svg" alt="Logo" width="80" height="80">
  </a>
❮ ZI ❯ Wiki Pages
</h1><div align="center">

[![Tweet][twitter-badge]][twitter-link]
[![Visual Studio Code](https://img.shields.io/badge/--007ACC?logo=visual%20studio%20code&logoColor=ffffff)](https://open.vscode.dev/z-shell/z-shell.pages.dev)
[![Crowdin](https://badges.crowdin.net/e/f108c12713ee8526ac878d5671ad6e29/localized.svg)](https://digitalclouds.crowdin.com/z-shell)

<a href="https://github.com/z-shell/zi/issues/new?assignees=&labels=bug+%F0%9F%90%9E&template=01_bug_report.yml&title=bug%3A+">《
Report an issue 》</a> ·
<a href="https://github.com/z-shell/z-shell.pages.dev/issues/new?assignees=&labels=documentation+%F0%9F%92%A1&template=01_request_documentation.yml&title=feat%3A+">《
Request a documentation 》</a> · <a href="https://github.com/z-shell/zi/discussions">《 Ask a Question 》</a>

</div>

## Enterprise-level Tools & Services

### Cloudflare Global Network

> Interconnected with over 10,000 major service providers, cloud providers, and enterprise networks, Cloudflare is a
> fast lane on the Internet.

- <https://z-shell.pages.dev/>
- <https://z.digitalclouds.dev/>

#### Reference

- <https://miniflare.dev/>
- <https://developers.cloudflare.com/pages/>
- <https://developers.cloudflare.com/workers/>
- <https://developers.cloudflare.com/cache/>
- <https://developers.cloudflare.com/analytics>
- <https://developers.cloudflare.com/firewall/>

### Crowdin Translations

> Make content multilingual fast and easy

- <https://digitalclouds.crowdin.com/>

#### Getting started support

- <https://support.crowdin.com/enterprise/overview/>

### Algolia search

> Quikly find anything on the site.

- <https://z.digitalclouds.dev/search/>

#### Algolia Docs

- <https://www.algolia.com/doc/>

## Development Guidelines

> General [contributing guidelines](https://github.com/z-shell/zi/blob/main/docs/CONTRIBUTING.md) for the
> [Z-Shell](https://github.com/z-shell) organization.
>
> > Any changes made will be crawled `every 2 days at 01:10 am (UTC)` and reflected in the search

When referring to something that might need additional information - it has to be linked to a search or a specific place
in a wiki e.g:

- `[load plugin](/search/?q=load+plugin)` - result: [load plugin](https://z-shell.pages.dev/search/?q=load+plugin)),
- `[ice コマンドは](/search?q=ice+コマンドは)` - result:
  [ice コマンドは](https://z-shell.pages.dev/ja/search?q=ice+%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E3%81%AF)),

  - It is required at least once for the first mention on a page.
  - If the link of the first mentioning exists, then it can be ignored.
  - If there is no additional information when it has to be created and documented.

### Markdown [front matter](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter)

```md
---
id: doc-markdown
title: Docs Markdown Features
hide_title: false
hide_table_of_contents: false
sidebar_label: Markdown
sidebar_position: 3
pagination_label: Markdown features
custom_edit_url: https://github.com/some/link.md
description: How do I find you when I cannot solve this problem
keywords:
  - docs
  - docusaurus
image: https://i.imgur.com/mErPwqL.png
slug: /myDoc
---

# Markdown Features

My Document Markdown content
```

#### Translations

🔥 **Breaking change:**

Do not modify files under in the repository as it will conflict and will be overwritten. Please see
[Discussions](https://github.com/z-shell/zw/discussions/73) to collaborate on translations. 💕

## 🥇 Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/lunarxlark"><img src="https://avatars.githubusercontent.com/u/18758150?v=4?s=80" width="80px;" alt=""/><br /><sub><b>lunarxlark</b></sub></a><br /><a href="#translation-lunarxlark" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/the-ryujin"><img src="https://avatars.githubusercontent.com/u/98503588?v=4?s=80" width="80px;" alt=""/><br /><sub><b>竜神信仰</b></sub></a><br /><a href="#maintenance-the-ryujin" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/wicoop"><img src="https://avatars.githubusercontent.com/u/60315017?v=4?s=80" width="80px;" alt=""/><br /><sub><b>William Cooper</b></sub></a><br /><a href="#maintenance-wicoop" title="Maintenance">🚧</a> <a href="#security-wicoop" title="Security">🛡️</a></td>
    <td align="center"><a href="https://github.com/borley1211"><img src="https://avatars.githubusercontent.com/u/47778507?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Borley</b></sub></a><br /><a href="#translation-borley1211" title="Translation">🌍</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

### Installation

```shell
pnpm i
```

### Local Development

```shell
pnpm start
# Specify available locale
pnpm exec docusaurus start --locale ja
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without
having to restart the server.

### Build

```shell
pnpm build
```

### Serve built directory

```shell
pnpm serve
```

This command generates static content into the `build` directory and can be served using any static contents hosting
service.

[twitter-badge]: https://badgen.net/badge/icon/twitter?icon=twitter&label
[twitter-acc]: https://twitter.com/zshell_zi
[twitter-link]: https://twitter.com/intent/tweet?text=A%20Swiss%20Army%20Knife%20for%20Zsh%20-%20Unix%20shell%20%20@zshell_zi&url=https://github.com/z-shell/zi&hashtags=zsh,zi,zshell
