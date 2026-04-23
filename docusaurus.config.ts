import {themes as prismThemes} from "prism-react-renderer";
import type {Config, PluginConfig} from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import type {Options as DocsOptions} from "@docusaurus/plugin-content-docs";
import type {Options as BlogOptions} from "@docusaurus/plugin-content-blog";
import type {Options as PageOptions} from "@docusaurus/plugin-content-pages";
import type {Options as IdealImageOptions} from "@docusaurus/plugin-ideal-image";
import devAssetProxy from "./plugins/devAssetProxy";

/* import {announcementStarIcon, announcementGithubIcon, announcementHackerNewsIcon} from "./src/data/announcement-icons"; */

const url = process.env.URL ?? "https://wiki.zshell.dev";
const baseUrl = process.env.BASE_URL ?? "/";
const fontAwesomeScript =
  process.env.STYLES ?? "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7.2.0/js/all.min.js";
const isDev = process.env.NODE_ENV !== "production";
const runtimePlugins: PluginConfig[] = isDev ? [[devAssetProxy, {}]] : [];

export default async function createConfigAsync() {
  return {
    url,
    baseUrl,
    trailingSlash: false,
    title: "Z-Shell",
    titleDelimiter: "|",
    tagline: "A Swiss Army Knife for Zsh Unix shell",
    projectName: "wiki",
    organizationName: "z-shell",
    baseUrlIssueBanner: true,
    onBrokenLinks: "throw",
    staticDirectories: ["static"],
    favicon: "/img/favicon.ico",
    i18n: {defaultLocale: "en", locales: ["en"]},
    markdown: {mermaid: true, emoji: true, format: "detect", hooks: {onBrokenMarkdownLinks: "warn"}},
    customFields: {
      fontAwesomeScript,
    },
    headTags: [
      {tagName: "link", attributes: {rel: "preconnect", href: "https://ghbtns.com"}},
      {
        tagName: "link",
        attributes: {rel: "stylesheet", href: "/cdn/fonts/hack-subset.css", media: "print", onload: "this.media='all'"},
      },
      {
        tagName: "link",
        attributes: {
          rel: "stylesheet",
          href: "/cdn/fonts/jetbrainsmono-variable.css",
          media: "print",
          onload: "this.media='all'",
        },
      },
      {
        tagName: "link",
        attributes: {
          rel: "preload",
          href: "/cdn/fonts/variable/JetBrainsMono[wght].woff2",
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
      },
      {
        tagName: "link",
        attributes: {
          rel: "preload",
          href: "/cdn/fonts/webfonts/hack-regular-subset.woff2?sha=4b288c48e41aed70",
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
      },
    ],
    storage: {
      type: "localStorage",
      namespace: true,
    },
    future: {
      v4: {
        removeLegacyPostBuildHeadAttribute: true,
        useCssCascadeLayers: true,
        siteStorageNamespacing: true,
        fasterByDefault: true,
        mdx1CompatDisabledByDefault: true,
      },
      experimental_vcs: true,
      faster: {
        swcJsLoader: true,
        swcJsMinimizer: true,
        swcHtmlMinimizer: true,
        lightningCssMinimizer: true,
        rspackBundler: true,
        rspackPersistentCache: true,
        ssgWorkerThreads: true,
        mdxCrossCompilerCache: true,
      },
    },
    plugins: [
      ...runtimePlugins,
      [
        "content-docs",
        {
          id: "community",
          path: "community",
          breadcrumbs: true,
          routeBasePath: "community",
          sidebarPath: "sidebars.ts",
          editUrl: ({locale, versionDocsDirPath, docPath}) => {
            if (locale !== "en") {
              return `https://digitalclouds.crowdin.com/z-shell/${locale}`;
            }
            return `https://github.com/z-shell/wiki/tree/main/${versionDocsDirPath}/${docPath}`;
          },
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        } satisfies DocsOptions,
      ],
      [
        "content-docs",
        {
          id: "ecosystem",
          path: "ecosystem",
          breadcrumbs: true,
          routeBasePath: "ecosystem",
          sidebarPath: "sidebars.ts",
          editUrl: ({locale, versionDocsDirPath, docPath}) => {
            if (locale !== "en") {
              return `https://digitalclouds.crowdin.com/z-shell/${locale}`;
            }
            return `https://github.com/z-shell/wiki/tree/main/${versionDocsDirPath}/${docPath}`;
          },
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        } satisfies DocsOptions,
      ],
      ["ideal-image", {quality: 70, max: 1030, min: 630, disableInDev: false} satisfies IdealImageOptions],
      [
        "pwa",
        {
          debug: process.env.NODE_ENV === "development",
          offlineModeActivationStrategies: ["appInstalled", "standalone", "queryString"],
          pwaHead: [
            {tagName: "link", rel: "icon", href: "/img/logo.svg"},
            {tagName: "link", rel: "icon", href: "/img/logo.png"},
            {tagName: "link", rel: "manifest", href: "/manifest.json"},
            {tagName: "link", rel: "browserconfig", href: "/browserconfig.xml"},
            {tagName: "link", rel: "apple-touch-icon", href: "/img/png/theme/z/192x192.png"},
            {tagName: "link", rel: "mask-icon", href: "/img/logo.svg", color: "#23b898"},
            /* Windows  */
            {tagName: "meta", name: "msapplication-TileColor", content: "#23b898"},
            {tagName: "meta", name: "msapplication-TileImage", content: "/img/png/theme/z/144x144.png"},
            {tagName: "meta", name: "msapplication-navbutton-color", content: "#23b898"},
            {tagName: "meta", name: "msapplication-config", content: "/browserconfig.xml"},
            /* Android  */
            {tagName: "meta", name: "theme-color", content: "#23b898"},
            {tagName: "meta", name: "mobile-web-app-capable", content: "yes"},
            /* iOS  */
            {tagName: "meta", name: "apple-mobile-web-app-title", content: "Z-Shell"},
            {tagName: "meta", name: "apple-mobile-web-app-capable", content: "yes"},
            {tagName: "meta", name: "apple-mobile-web-app-status-bar-style", content: "default"},
            /* Pinned Sites  */
            {tagName: "meta", name: "application-name", content: "Z-Shell"},
            {tagName: "meta", name: "msapplication-tooltip", content: "A Swiss Army Knife for Zsh Unix shell"},
            {tagName: "meta", name: "msapplication-starturl", content: "/"},
            /* Tap highlighting */
            {tagName: "meta", name: "msapplication-tap-highlight", content: "no"},
          ],
        },
      ],
    ],
    presets: [
      [
        "classic",
        {
          svgr: {},
          docs: {
            path: "docs",
            breadcrumbs: true,
            routeBasePath: "docs",
            sidebarPath: "sidebars.ts",
            sidebarCollapsible: true,
            sidebarCollapsed: true,
            editUrl: ({locale, versionDocsDirPath, docPath}) => {
              if (locale !== "en") {
                return `https://digitalclouds.crowdin.com/z-shell/${locale}`;
              }
              return `https://github.com/z-shell/wiki/tree/main/${versionDocsDirPath}/${docPath}`;
            },
            showLastUpdateAuthor: true,
            showLastUpdateTime: true,
          } satisfies DocsOptions,
          /* blog: {
            path: "blog",
            editUrl: ({locale, blogDirPath, blogPath}) => {
              if (locale !== "en") {
                return `https://digitalclouds.crowdin.com/z-shell/${locale}`;
              }
              return `https://github.com/z-shell/wiki/tree/main/${blogDirPath}/${blogPath}`;
            },
            showReadingTime: true,
            postsPerPage: "ALL",
            feedOptions: {
              type: "all",
              copyright: `Copyright © ${new Date().getFullYear()} Z-Shell Community`,
            },
          } satisfies BlogOptions, */
          pages: {
            path: "src/pages",
          } satisfies PageOptions,
          theme: {customCss: "./src/css/custom.css"},
        } satisfies Preset.Options,
      ],
    ],
    themeConfig: {
      docs: {sidebar: {hideable: true, autoCollapseCategories: true}},
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      image: "/img/png/theme/z/320x320.png",
      metadata: [
        {name: "twitter:card", content: "summary"},
        {name: "og:title", content: "Z-Shell"},
        {name: "og:description", content: "Swiss Army Knife for Zsh Unix shell"},
        {name: "keywords", content: "z-shell, zsh, zinit, zplugin, oh-my-zsh, prezto, zi, devops, zsh-plugins"},
      ],
      /* announcementBar: {
        id: "announcement-bar",
        content: `If you like Zi - give it a <a target="_blank" rel="noopener noreferrer" href="https://github.com/z-shell/zi" aria-label="GitHub repository star">${announcementStarIcon}</a>, share it on <a target="_blank" rel="noopener noreferrer" href="https://news.ycombinator.com/submitlink?u=https://wiki.zshell.dev/&t=A%20Swiss%20Army%20Knife%20for%20Zsh%20Unix%20shell%20|%20%E2%9D%AE%20Zi%20%E2%9D%AF" aria-label="Hacker News">${announcementHackerNewsIcon}</a>, and consider following us on <a target="_blank" rel="noopener noreferrer" href="https://github.com/z-shell" aria-label="GitHub">${announcementGithubIcon}</a>`,
        isCloseable: true,
      }, */
      algolia: {
        appId: "FMPN8VE51Y",
        apiKey: "a3d13a1058ae9304a8c987ea67b08ce4",
        indexName: "zshell",
      },
      navbar: {
        hideOnScroll: true,
        title: "Z-Shell",
        logo: {
          alt: "A Swiss Army Knife for Zsh Unix shell",
          src: "img/logo.svg",
          target: "_self",
          width: 32,
          height: 32,
        },
        items: [
          {type: "doc", docId: "intro", position: "left", label: "Docs"},
          {to: "ecosystem", position: "left", label: "Ecosystem"},
          {to: "community", position: "left", label: "Community"},
          /* { to: 'blog', position: 'left', label: 'Blog' }, */
          /* {
            type: "localeDropdown",
            position: "right",
            dropdownItemsAfter: [
              {
                href: "https://translate.zshell.dev/",
                label: "Help Us Translate",
              },
            ],
          }, */
          {
            href: "https://github.com/z-shell/zi",
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
            title: "Knowledge Base",
            items: [
              {
                label: "Introduction",
                to: "/docs",
              },
              {
                label: "Zsh Manual",
                href: "https://zsh.sourceforge.io/Doc/Release/zsh_toc.html",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Localization",
                href: "https://translate.zshell.dev",
              },
              {
                label: "Uptime Status",
                href: "https://status.zshell.dev",
              },
              /* {html: `▼▼▼`}, */
            ],
          },
          {
            title: "Legal",
            items: [
              {label: "Privacy Policy", to: "legal/PRIVACY"},
              {label: "Code of Conduct", to: "legal/CODE_OF_CONDUCT"},
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Z-Shell Community`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        defaultLanguage: "shell",
        additionalLanguages: ["ini", "vim", "verilog", "diff", "bash"],
        magicComments: [
          {
            className: "theme-code-block-highlighted-line",
            line: "highlight-next-line",
            block: {start: "highlight-start", end: "highlight-end"},
          },
          {
            className: "code-block-error-line",
            line: "error-line",
          },
        ],
      },
      tableOfContents: {minHeadingLevel: 2, maxHeadingLevel: 5},
    } satisfies Preset.ThemeConfig,
  } satisfies Config;
}
