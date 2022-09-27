/** @format */
// @ts-check

const url = process.env.URL ?? "https://wiki.zshell.dev";
const baseUrl = process.env.BASE_URL ?? "/";
const isProd = process.env.CF_PAGES_BRANCH === "main";
const css = process.env.CSS ?? "/assets/fa/css/all.min.css";
const style = process.env.STYLE ?? "/assets/fa/js/all.min.js";
const math = require("remark-math");
const katex = require("rehype-katex");

/** @type {import('@docusaurus/types').Config} */
const config = {
  url,
  baseUrl,
  trailingSlash: false,
  title: "❮ Zi ❯",
  titleDelimiter: "|",
  tagline: "A Swiss Army Knife for Zsh Unix shell",
  projectName: "wiki",
  organizationName: "z-shell",
  baseUrlIssueBanner: false,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  staticDirectories: ["static"],
  favicon: "img/favicon.ico",
  stylesheets: isProd ? [] : [{ href: css }],
  scripts: isProd ? [{ src: style, crossorigin: "anonymous" }] : [],
  i18n: {
    defaultLocale: "en",
    locales: isProd ? ["en", "ja", "zh-Hans"] : ["en"],
  },
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        debug: true,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        docs: {
          sidebarPath: "sidebars.js",
          sidebarCollapsible: true,
          sidebarCollapsed: true,
          editUrl: ({ locale, versionDocsDirPath, docPath }) => {
            if (locale !== "en") {
              return `https://digitalclouds.crowdin.com/z-shell/${locale}`;
            }
            return `https://github.com/z-shell/wiki/tree/main/${versionDocsDirPath}/${docPath}`;
          },
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          remarkPlugins: [math],
          rehypePlugins: [katex],
          beforeDefaultRemarkPlugins: [],
          beforeDefaultRehypePlugins: [],
        },
        blog: {
          editUrl: ({ locale, blogDirPath, blogPath }) => {
            if (locale !== "en") {
              return `https://digitalclouds.crowdin.com/z-shell/${locale}`;
            }
            return `https://github.com/z-shell/wiki/tree/main/${blogDirPath}/${blogPath}`;
          },
          remarkPlugins: [math],
          rehypePlugins: [katex],
          beforeDefaultRemarkPlugins: [],
          beforeDefaultRehypePlugins: [],
          showReadingTime: true,
          postsPerPage: "ALL",
          feedOptions: {
            type: "all",
            copyright: `Copyright © ${new Date().getFullYear()} Z-Shell Community.`,
          },
        },
        pages: { remarkPlugins: [math] },
        sitemap: { changefreq: "daily" },
      }),
    ],
  ],
  plugins: [
    [
      "ideal-image",
      /** @type {import('@docusaurus/plugin-ideal-image').PluginOptions} */
      ({ max: 1030, min: 480, disableInDev: false }),
    ],
    [
      "pwa",
      /** @type {import('@docusaurus/plugin-pwa').PluginOptions} */
      {
        debug: true,
        offlineModeActivationStrategies: [
          "appInstalled",
          "standalone",
          "queryString",
        ],
        pwaHead: [
          { tagName: "link", rel: "icon", href: "img/logo.svg" },
          { tagName: "link", rel: "icon", href: "img/logo.png" },
          { tagName: "link", rel: "manifest", href: "manifest.json" },
          { tagName: "link", rel: "browserconfig", href: "browserconfig.xml" },
          {
            tagName: "meta",
            name: "theme-color",
            content: "hsl(167°, 68%, 43%)",
          },
          {
            tagName: "meta",
            name: "apple-mobile-web-app-capable",
            content: "yes",
          },
          {
            tagName: "meta",
            name: "apple-mobile-web-app-status-bar-style",
            content: "#000",
          },
          {
            tagName: "meta",
            name: "msapplication-TileImage",
            content: "img/logo.png",
          },
          { tagName: "meta", name: "msapplication-TileColor", content: "#000" },
        ],
      },
    ],
    [
      "content-docs",
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: "community",
        path: "community",
        routeBasePath: "community",
        sidebarPath: "sidebars.js",
        editUrl: ({ locale, versionDocsDirPath, docPath }) => {
          if (locale !== "en") {
            return `https://digitalclouds.crowdin.com/z-shell/${locale}`;
          }
          return `https://github.com/z-shell/wiki/tree/main/${versionDocsDirPath}/${docPath}`;
        },
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        remarkPlugins: [math],
        rehypePlugins: [katex],
      }),
    ],
    [
      "content-docs",
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: "ecosystem",
        path: "ecosystem",
        routeBasePath: "ecosystem",
        sidebarPath: "sidebars.js",
        editUrl: ({ locale, versionDocsDirPath, docPath }) => {
          if (locale !== "en") {
            return `https://digitalclouds.crowdin.com/z-shell/${locale}`;
          }
          return `https://github.com/z-shell/wiki/tree/main/${versionDocsDirPath}/${docPath}`;
        },
        showLastUpdateAuthor: false,
        showLastUpdateTime: true,
        remarkPlugins: [math],
        rehypePlugins: [katex],
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: { sidebar: { hideable: true, autoCollapseCategories: true } },
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      image: "img/logo/320x320.png",
      metadata: [
        { name: "twitter:card", content: "summary" },
        {
          name: "keywords",
          content:
            "zsh, zsh-plugins, plugin-manager, zinit, zplugin, oh-my-zsh, prezto, zi",
        },
      ],
      announcementBar: {
        id: "announcement-bar",
        content: `If you like Zi - give it a <a target="_blank" rel="noopener noreferrer" href="https://github.com/z-shell/zi"><i class="fa-solid fa-star"></i></a>, share it on <a target="_blank" rel="noopener noreferrer" href="https://news.ycombinator.com/submitlink?u=https://wiki.zshell.dev/&t=A%20Swiss%20Army%20Knife%20for%20Zsh%20Unix%20shell%20|%20%E2%9D%AE%20Zi%20%E2%9D%AF"><i class="fa-brands fa-square-hacker-news"></i></a>, and consider following us on <a target="_blank" rel="noopener noreferrer" href="https://github.com/z-shell"><i class="fa-brands fa-github-alt"></i></a> or <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/zshell_zi"><i class="fa-brands fa-twitter"></i></a>`,
        isCloseable: true,
      },
      algolia: {
        appId: "FMPN8VE51Y",
        apiKey: "a3d13a1058ae9304a8c987ea67b08ce4",
        indexName: "zshell",
        contextualSearch: true,
      },
      navbar: {
        hideOnScroll: true,
        title: "❮ Zi ❯",
        logo: {
          alt: "A Swiss Army Knife for Zsh Unix shell - ❮ Zi ❯",
          src: "img/logo.svg",
          target: "_self",
          width: 32,
          height: 32,
        },
        items: [
          { type: "doc", docId: "intro", position: "left", label: "Docs" },
          { to: "ecosystem", position: "left", label: "Ecosystem" },
          { to: "community", position: "left", label: "Community" },
          /* { to: 'blog', position: 'left', label: 'Blog' }, */
          {
            type: "localeDropdown",
            position: "right",
            dropdownItemsAfter: [
              {
                href: "https://translate.zshell.dev/",
                label: "Help Us Translate",
              },
            ],
          },
          {
            type: "dropdown",
            label: "Feed",
            position: "right",
            className: "rss-link",
            "aria-label": "Feed",
            items: [
              {
                label: "JSON",
                href: "https://wiki.zshell.dev/blog/feed.json",
              },
              {
                label: "RSS",
                href: "https://wiki.zshell.dev/blog/rss.xml",
              },
              {
                label: "Atom",
                href: "https://wiki.zshell.dev/blog/atom.xml",
              },
            ],
          },
          {
            href: "https://github.com/z-shell/zi/",
            position: "right",
            className: "header-github-link",
            "aria-label": "GitHub repository",
          },
          /* {type: 'html', position: 'left', value: '<button>Give feedback</button>'}, */
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Introduction",
                to: "/docs",
              },
              {
                label: "Ecosystem",
                to: "/ecosystem",
              },
              {
                label: "Community",
                to: "/community",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "GitHub",
                href: "https://discussions.zshell.dev",
              },
              {
                label: "Matrix",
                href: "https://matrix.to/#/#z-shell_zi:gitter.im",
              },
              {
                label: "Gitter",
                href: "https://gitter.im/z-shell/zi",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub Repositories",
                href: "https://github.com/orgs/z-shell/repositories/",
              },
              {
                label: "Crowdin Translations",
                href: "https://translate.zshell.dev",
              },
              {
                label: "Z-Shell Uptime Status",
                href: "https://status.zshell.dev",
              },
              /* {html: ``}, */
            ],
          },
          {
            title: "Legal",
            items: [
              { label: "Contributing", to: "legal/CONTRIBUTING" },
              { label: "Privacy Policy", to: "legal/PRIVACY" },
              { label: "Code of Conduct", to: "legal/CODE_OF_CONDUCT" },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Z-Shell Community.`,
      },
      prism: {
        theme: require("prism-react-renderer/themes/github"),
        darkTheme: require("prism-react-renderer/themes/dracula"),
        defaultLanguage: "shell",
        additionalLanguages: ["ini", "vim", "verilog"],
        magicComments: [
          {
            className: "theme-code-block-highlighted-line",
            line: "highlight-next-line",
            block: { start: "highlight-start", end: "highlight-end" },
          },
          {
            className: "code-block-error-line",
            line: "error-line",
          },
        ],
      },
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 5 },
    }),
};

module.exports = config;
