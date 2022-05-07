// @ts-check

const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '❮ ZI ❯',
  tagline: 'A Swiss Army Knife for Zsh Unix shell',
  url: 'https://z.digitalclouds.dev',
  baseUrl: '/',
  titleDelimiter: '|',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: '/img/favicon.ico',
  projectName: 'zw',
  organizationName: 'z-shell',
  staticDirectories: ['static'],
  i18n: {defaultLocale: 'en', locales: ['en', 'ja', 'zh-Hans']},
  scripts: [{src: 'https://kit.fontawesome.com/a6c194e645.js', crossorigin: 'anonymous'}],
  plugins: [
    /** @type {import('@docusaurus/types').Plugin} */
    ['ideal-image', {max: 1030, min: 480, disableInDev: false}],
    [
      'pwa',
      {
        debug: true,
        offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString'],
        pwaHead: [
          {tagName: 'link', rel: 'icon', href: '/img/logo.svg'},
          {tagName: 'link', rel: 'manifest', href: '/manifest.json'},
          {tagName: 'link', rel: 'browserconfig', href: '/browserconfig.xml'},
          {tagName: 'link', rel: 'apple-touch-icon', href: '/img/logo.png'},
          {tagName: 'meta', name: 'theme-color', content: 'rgb(35, 184, 152)'},
          {tagName: 'meta', name: 'apple-mobile-web-app-capable', content: 'yes'},
          {tagName: 'meta', name: 'apple-mobile-web-app-status-bar-style', content: '#000'},
          {tagName: 'meta', name: 'msapplication-TileImage', content: '/img/logo.png'},
          {tagName: 'meta', name: 'msapplication-TileColor', content: '#000'},
        ],
      },
    ],
    [
      'content-docs',
      {
        id: 'community',
        path: 'community',
        routeBasePath: 'community',
        sidebarPath: require.resolve('./lib/js/sidebars_2.js'),
        editUrl: ({locale, versionDocsDirPath, docPath}) => {
          if (locale !== 'en') {
            return `https://digitalclouds.crowdin.com/z-shell/${locale}`;
          }
          return `https://github.com/z-shell/zw/tree/main/${versionDocsDirPath}/${docPath}`;
        },
      },
    ],
    [
      'content-docs',
      {
        id: 'ecosystem',
        path: 'ecosystem',
        routeBasePath: 'ecosystem',
        sidebarPath: require.resolve('./lib/js/sidebars_3.js'),
        editUrl: ({locale, versionDocsDirPath, docPath}) => {
          if (locale !== 'en') {
            return `https://digitalclouds.crowdin.com/z-shell/${locale}`;
          }
          return `https://github.com/z-shell/zw/tree/main/${versionDocsDirPath}/${docPath}`;
        },
      },
    ],
  ],
  /**clientModules: [
    require.resolve('FunnyBunny'),
    require.resolve('WithSomeMoney'),
  ],*/
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        debug: undefined,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        docs: {
          sidebarPath: require.resolve('./lib/js/sidebars_1.js'),
          editUrl: ({locale, versionDocsDirPath, docPath}) => {
            if (locale !== 'en') {
              return `https://digitalclouds.crowdin.com/z-shell/${locale}`;
            }
            return `https://github.com/z-shell/zw/tree/main/${versionDocsDirPath}/${docPath}`;
          },
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        blog: {
          showReadingTime: true,
          editUrl: ({locale, blogDirPath, blogPath}) => {
            if (locale !== 'en') {
              return `https://digitalclouds.crowdin.com/z-shell/${locale}`;
            }
            return `https://github.com/z-shell/zw/tree/main/${blogDirPath}/${blogPath}`;
          },
        },
        gtag: {trackingID: 'G-MT10GVL59X', anonymizeIP: true},
        sitemap: {changefreq: 'daily', priority: 0.5},
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {sidebar: {hideable: true, autoCollapseCategories: true,}},
      colorMode: {defaultMode: 'dark', disableSwitch: false, respectPrefersColorScheme: true},
      image: 'img/logo/320x320.png',
      metadata: [{name: 'twitter:card', content: 'summary'}],
      announcementBar: {
        id: 'announcemnt',
        content: `If you like ❮ ZI ❯ - give it a <a target="_blank" rel="noopener noreferrer" href="https://github.com/z-shell/zi"><i class="fa-solid fa-star"></i></a> and follow us on <a target="_blank" rel="noopener noreferrer" href="https://github.com/z-shell"><i class="fa-brands fa-github-alt"></i></a> or <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/zshell_zi"><i class="fa-brands fa-twitter"></i></a>`,
      },
      algolia: {
        appId: '8A6CKETM6G',
        apiKey: '1750c7420e10ff8acf4d4f1f7ca0de90',
        indexName: 'z-digitalclouds',
        contextualSearch: true,
      },
      navbar: {
        hideOnScroll: true,
        title: '❮ ZI ❯',
        logo: {alt: '❮ ZI ❯ Logo', src: 'img/logo.svg', target: '_self', width: 32, height: 32},
        items: [
          {type: 'doc', docId: 'intro', position: 'left', label: 'Docs'},
          {to: 'community/intro', position: 'left', label: 'Community'},
          {to: 'ecosystem/intro', position: 'left', label: 'Ecosystem'},
          {
            type: 'localeDropdown',
            position: 'right',
            dropdownItemsAfter: [{href: 'https://crowdin.digitalclouds.dev/z-shell', label: 'Help Us Translate'}],
          },
          {type: 'docsVersionDropdown', position: 'right'},
          {
            href: 'https://github.com/z-shell/zi/',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/docs/intro',
              },
              {
                label: 'Community',
                to: '/community/intro',
              },
              {
                label: 'Ecosystem',
                to: '/ecosystem/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Slack.com',
                href: 'https://z-shell.slack.com',
              },
              {
                label: 'Matrix.org',
                href: 'https://matrix.to/#/#z-shell_zi:gitter.im',
              },
              {
                label: 'Gitter.im',
                href: 'https://gitter.im/z-shell/zi',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub Discussions',
                href: 'https://github.com/orgs/z-shell/discussions/',
              },
              {
                label: 'GitHub Organization',
                href: 'https://github.com/z-shell/',
              },
              {
                label: 'Crowdin Translations',
                href: 'https://crowdin.digitalclouds.dev/z-shell/',
              },
            ],
          },
          {
            title: 'Legal',
            items: [
              {label: 'Privacy Policy', to: 'legal/PRIVACY/'},
              {label: 'Code of Conduct', to: 'legal/CODE_OF_CONDUCT/'},
              {label: 'Contributing', to: 'legal/CONTRIBUTING/'},
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Digital Clouds, Z-Shell ❮ ZI ❯ Community.`,
      },
      prism: {
        theme: require('prism-react-renderer/themes/github'),
        darkTheme: require('prism-react-renderer/themes/dracula'),
        defaultLanguage: 'shell',
      },
      tableOfContents: {minHeadingLevel: 2, maxHeadingLevel: 4},
    }),
};

module.exports = config;
