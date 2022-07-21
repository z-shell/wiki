// @ts-check

const setURL = process.env.URL ?? 'https://wiki.zshell.dev';

const config = {
  title: '❮ Zi ❯',
  tagline: 'A Swiss Army Knife for Zsh Unix shell',
  url: setURL,
  baseUrl: '/',
  trailingSlash: false,
  titleDelimiter: '|',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: '/img/favicon.ico',
  projectName: 'wiki',
  organizationName: 'z-shell',
  staticDirectories: ['static'],
  stylesheets: ['/assets/css/all.min.css'],
  i18n: { defaultLocale: 'en', locales: ['en', 'fr', 'ja', 'zh-Hans',] },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        debug: true,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        docs: {
          sidebarPath: 'sidebars.js',
          editUrl: ({ locale, versionDocsDirPath, docPath }) => {
            if (locale !== 'en') {
              return `https://digitalclouds.crowdin.com/z-shell/${locale}`;
            }
            return `https://github.com/z-shell/wiki/tree/main/${versionDocsDirPath}/${docPath}`;
          },
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          editUrl: ({ locale, blogDirPath, blogPath }) => {
            if (locale !== 'en') {
              return `https://digitalclouds.crowdin.com/z-shell/${locale}`;
            }
            return `https://github.com/z-shell/wiki/tree/main/${blogDirPath}/${blogPath}`;
          },
        },
        sitemap: { changefreq: 'daily', priority: 0.5 },
      }),
    ],
  ],
  plugins: [
    [
      'ideal-image',
      /** @type {import('@docusaurus/plugin-ideal-image').PluginOptions} */
      ({ max: 1030, min: 100, disableInDev: false }),
    ],
    [
      'pwa',
      {
        debug: true,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          { tagName: 'link', rel: 'icon', href: '/img/logo.svg' },
          { tagName: 'link', rel: 'manifest', href: '/manifest.json' },
          { tagName: 'link', rel: 'browserconfig', href: '/browserconfig.xml' },
          { tagName: 'link', rel: 'apple-touch-icon', href: '/img/logo.png' },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: 'rgb(35, 184, 152)',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#000',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileImage',
            content: '/img/logo.png',
          },
          { tagName: 'meta', name: 'msapplication-TileColor', content: '#000' },
        ],
      },
    ],
    [
      'content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'community',
        path: 'community',
        routeBasePath: 'community',
        sidebarPath: 'sidebars.js',
        editUrl: ({ locale, versionDocsDirPath, docPath }) => {
          if (locale !== 'en') {
            return `https://digitalclouds.crowdin.com/z-shell/${locale}`;
          }
          return `https://github.com/z-shell/wiki/tree/main/${versionDocsDirPath}/${docPath}`;
        },
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      }),
    ],
    [
      'content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'ecosystem',
        path: 'ecosystem',
        routeBasePath: 'ecosystem',
        sidebarPath: 'sidebars.js',
        editUrl: ({ locale, versionDocsDirPath, docPath }) => {
          if (locale !== 'en') {
            return `https://digitalclouds.crowdin.com/z-shell/${locale}`;
          }
          return `https://github.com/z-shell/wiki/tree/main/${versionDocsDirPath}/${docPath}`;
        },
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: { sidebar: { hideable: true, autoCollapseCategories: true } },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      image: 'img/logo/320x320.png',
      metadata: [
        { name: 'twitter:card', content: 'summary' },
        {
          name: 'keywords',
          content: 'zsh, zsh-plugins, plugin-manager, zinit, zplugin, oh-my-zsh, prezto, zi',
        },
      ],
      announcementBar: {
        id: 'announcemnt',
        content: `If you like ❮ Zi ❯ - give it a <a target="_blank" rel="noopener noreferrer" href="https://github.com/z-shell/zi"><i class="fa-solid fa-star"></i></a> and follow us on <a target="_blank" rel="noopener noreferrer" href="https://github.com/z-shell"><i class="fa-brands fa-github-alt"></i></a> or <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/zshell_zi"><i class="fa-brands fa-twitter"></i></a>`,
      },
      algolia: {
        appId: 'FMPN8VE51Y',
        apiKey: 'a3d13a1058ae9304a8c987ea67b08ce4',
        indexName: 'zshell',
        contextualSearch: true,
      },
      navbar: {
        hideOnScroll: true,
        title: '❮ Zi ❯',
        logo: {
          alt: 'A Swiss Army Knife for Zsh Unix shell - ❮ Zi ❯',
          src: 'img/logo.svg',
          target: '_self',
          width: 32,
          height: 32,
        },
        items: [
          { type: 'doc', docId: 'intro', position: 'left', label: 'Docs' },
          { to: 'ecosystem', position: 'left', label: 'Ecosystem' },
          { to: 'community', position: 'left', label: 'Community' },
          { to: 'blog', position: 'left', label: 'Blog' },
          {
            type: 'localeDropdown',
            position: 'right',
            dropdownItemsAfter: [
              {
                href: 'https://digitalclouds.crowdin.com/z-shell',
                label: 'Help Us Translate',
              },
            ],
          },
          {
            href: 'https://github.com/z-shell/zi/',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
          /* {type: 'html', position: 'left', value: '<button>Give feedback</button>'}, */
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
                to: '/docs',
              },
              {
                label: 'Ecosystem',
                to: '/ecosystem',
              },
              {
                label: 'Community',
                to: '/community',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Slack.com',
                href: 'https://join.slack.com/t/z-shell/shared_invite/zt-16twpopd2-p08ROUeT2aGZ5njJwysawA',
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
                href: 'https://digitalclouds.crowdin.com/z-shell/',
              },
              /* {html: ``}, */
            ],
          },
          {
            title: 'Legal',
            items: [
              { label: 'Privacy Policy', to: 'legal/PRIVACY/' },
              { label: 'Code of Conduct', to: 'legal/CODE_OF_CONDUCT/' },
              { label: 'Contributing', to: 'legal/CONTRIBUTING/' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Z-Shell Community.`,
      },
      prism: {
        theme: require('prism-react-renderer/themes/github'),
        darkTheme: require('prism-react-renderer/themes/dracula'),
        defaultLanguage: 'shell',
      },
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
    }),
};

module.exports = config;
