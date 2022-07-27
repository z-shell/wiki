/** @format */

// @ts-check

const setURL = process.env.URL ?? 'https://wiki.zshell.dev';

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: '❮ Zi ❯',
	tagline: 'A Swiss Army Knife for Zsh Unix shell',
	url: setURL,
	baseUrl: '/',
	trailingSlash: false,
	titleDelimiter: '|',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: '/img/favicon.ico?static=true',
	projectName: 'wiki',
	organizationName: 'z-shell',
	staticDirectories: ['static'],
	stylesheets: ['/assets/fa/css/all.min.css?static=true'],
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'fr', 'ja', 'zh-Hans'],
		localeConfigs: { en: { htmlLang: 'en-US' } },
	},
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
					editUrl: ({ locale, blogDirPath, blogPath }) => {
						if (locale !== 'en') {
							return `https://digitalclouds.crowdin.com/z-shell/${locale}`;
						}
						return `https://github.com/z-shell/wiki/tree/main/${blogDirPath}/${blogPath}`;
					},
					showReadingTime: true,
					postsPerPage: 'ALL',
					feedOptions: {
						type: 'all',
						copyright: `Copyright © ${new Date().getFullYear()} Z-Shell Community.`,
					},
				},
				sitemap: { changefreq: 'daily' },
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
			image: 'img/logo/320x320.png?static=true',
			metadata: [
				{ name: 'twitter:card', content: 'summary' },
				{
					name: 'keywords',
					content:
						'zsh, zsh-plugins, plugin-manager, zinit, zplugin, oh-my-zsh, prezto, zi',
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
					src: 'img/logo.svg?static=true',
					target: '_self',
					width: 32,
					height: 32,
				},
				items: [
					{ type: 'doc', docId: 'intro', position: 'left', label: 'Docs' },
					{ to: 'ecosystem', position: 'left', label: 'Ecosystem' },
					{ to: 'community', position: 'left', label: 'Community' },
					/* { to: 'blog', position: 'left', label: 'Blog' }, */
					{
						type: 'localeDropdown',
						position: 'right',
						dropdownItemsAfter: [
							{
								href: 'https://translate.zshell.dev/',
								label: 'Help Us Translate',
							},
						],
					},
					{
						type: 'dropdown',
						label: 'Feed',
						position: 'right',
						className: 'rss-link',
						'aria-label': 'Feed',
						items: [
							{
								label: 'JSON',
								href: 'https://wiki.zshell.dev/blog/feed.json/',
							},
							{
								label: 'RSS',
								href: 'https://wiki.zshell.dev/blog/rss.xml',
							},
							{
								label: 'Atom',
								href: 'https://wiki.zshell.dev/blog/atom.xml',
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
								href: 'https://discussions.zshell.dev/',
							},
							{
								label: 'GitHub Organization',
								href: 'https://github.com/z-shell/',
							},
							{
								label: 'Crowdin Translations',
								href: 'https://translate.zshell.dev/',
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
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 5 },
		}),
};

module.exports = config;
