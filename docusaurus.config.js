// @ts-check

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

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
  scripts: [{defer: true, src: 'https://cdn.digitalclouds.dev/fa/js/all.min.js'}],
  clientModules: [require.resolve('asciinema-player/dist/bundle/asciinema-player.css')],
  plugins: [
    ['ideal-image', {max: 1030, min: 480, disableInDev: false}],
    [
      'pwa',
      {
        debug: false,
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
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        debug: true,
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
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      hideableSidebar: true,
      image: 'img/logo/320x320.png',
      autoCollapseSidebarCategories: true,
      metadata: [{name: 'twitter:card', content: 'summary'}],
      announcementBar: {
        id: 'announcemnt',
        content: `If you like ❮ ZI ❯ - give it a <a target="_blank" rel="noopener noreferrer" href="https://github.com/z-shell/zi"><i class="fa-solid fa-star"></i></a> and follow us on <a target="_blank" rel="noopener noreferrer" href="https://github.com/z-shell"><i class="fa-brands fa-github-alt"></i></a> or <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/zshell_zi"><i class="fa-brands fa-twitter"></i></a>`,
      },
      colorMode: {defaultMode: 'dark', disableSwitch: false, respectPrefersColorScheme: true},
      algolia: {
        appId: '8A6CKETM6G',
        apiKey: '1750c7420e10ff8acf4d4f1f7ca0de90',
        indexName: 'z-digitalclouds',
        contextualSearch: true,
      },
      navbar: {
        hideOnScroll: true,
        title: '❮ ZI ❯',
        logo: {
          alt: '❮ ZI ❯ Logo',
          src: 'img/logo.svg',
          target: '_self',
          width: 32,
          height: 32,
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Docs',
          },
          {
            to: 'community/intro',
            position: 'left',
            label: 'Community',
          },
          {
            to: 'ecosystem/intro',
            position: 'left',
            label: 'Ecosystem',
          },
          {
            type: 'localeDropdown',
            position: 'right',
            dropdownItemsAfter: [
              {
                href: 'https://crowdin.digitalclouds.dev/z-shell',
                label: 'Help Us Translate',
              },
            ],
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
          },
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
              {
                label: 'Privacy Policy',
                to: 'legal/PRIVACY/',
              },
              {
                label: 'Code of Conduct',
                to: 'legal/CODE_OF_CONDUCT/',
              },
              {
                label: 'Contributing',
                to: 'legal/CONTRIBUTING/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Digital Clouds, Z-Shell ❮ ZI ❯ Community.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 3,
      },
    }),
};

module.exports = config;
