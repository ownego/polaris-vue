import { defineConfig } from 'vitepress';
import { fileURLToPath } from 'url';
import { replaceCodePlugin } from 'vite-plugin-replace';
import svgLoader from 'vite-svg-loader';

import packageJson from '../../package.json';
import { generateScopedName } from '../../build/namespaced-classname';
import { getComponentContent, getCategoryContent } from '../script/content';
import { generateSideBar } from '../script/sidebar';
import { oeIcon } from '../script/svg';
import { exampleParser } from '../script/parser';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  outDir: 'dist',
  cleanUrls: true,

  title: "Polaris Vue",
  titleTemplate: ":title — Shopify Polaris Vue by ownego",
  description: "Shopify Polaris for VueJS 3",
  head: [
    ['link', { rel: 'icon', href: '/assets/images/favicon.ico' }],
    ['link', { rel: 'preconnect', href: 'https://cdn.shopify.com/' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.shopify.com/static/fonts/inter/inter.css', id: 'inter-font-link' }],
  ],

  rewrites: {
    'docs/:pkg': ':pkg',
    'components/:pkg/README.md': 'components/:pkg.md',
    'category/:category': 'components/:category',
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      src: 'https://github.com/ownego/polaris-vue/blob/master/public/images/logo-large.png?raw=true',
      alt: 'Polaris Vue Logo',
    },
    search: {
      provider: 'local',
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/documentation' },
      { text: 'Patterns', link: '/patterns' }
    ],
    outline: { level: [2, 3] },

    sidebar: [
      {
        text: 'Getting Started',
        collapsed: false,
        items: [
          { text: 'Installation', link: '/documentation' },
          { text: 'Icons', link: '/icons' },
          { text: 'Tokens', link: 'https://polaris.shopify.com/tokens/color' },
          { text: 'Patterns', link: '/patterns' },
          { text: 'Contributing', link: '/contributing' },
        ],
      },
      {
        text: 'Components',
        collapsed: false,
        items: [...generateSideBar()],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ownego/polaris-vue' },
      { icon: { svg: oeIcon },
        link: 'https://ownego.com?utm_source=polaris-vue&utm_medium=referral&utm_campaign=website'
      },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2021-present. With ❤️ by <a href="https://ownego.com?utm_source=polaris-vue&utm_medium=referral&utm_campaign=website" target="_blank">ownego</a>.',
    },
  },

  vite: {
    plugins: [
      svgLoader(),
      replaceCodePlugin({
        replacements: [
          {
            from: '%POLARIS_VERSION%',
            to: packageJson.polaris_version,
          },
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true, // Silent the deprecation warning
        },
      },
      modules: {
        generateScopedName,
      },
    },
    resolve: {
      alias: {
        // @ts-ignore
        '@icons': fileURLToPath(new URL('../../node_modules/@shopify/polaris-icons/dist/svg', import.meta.url)),
        // @ts-ignore
        '@polaris': fileURLToPath(new URL('../../polaris/polaris-react/src', import.meta.url)),
        // @ts-ignore
        '@tokens': fileURLToPath(new URL('../../polaris/polaris-tokens/src', import.meta.url)),
        // @ts-ignore
        '@': fileURLToPath(new URL('../../src', import.meta.url)),
        // @ts-ignore
        '~': fileURLToPath(new URL('../../node_modules', import.meta.url)),
      },
    },
    build: {
      minify: false,
    },
  },

  markdown: {
    config: (md) => {
      const fence = md.renderer.rules.fence!;

      /**
       * Automatically generate examples code from the frontmatter
       * PLEASE BE CAREFUL WHEN MODIFYING THIS CODE!
       */
      md.block.ruler.before('snippet', 'examples-parser', exampleParser);

      md.renderer.rules.fence = (...args) => {
        const [tokens, idx, config, page] = args;
        const token = tokens[idx];

        if (token.meta && token.meta.startsWith('example')) {
          const index = token.meta.split('-')[1];

          return (
            `<div class="docs-example-code docs-${token.meta}" data-example="${index}">` +
            fence(...args)
            + '</div>'
          )
        }

        return (fence(...args));
      };
    },
  },

  async transformPageData(pageData) {
    const { frontmatter, relativePath, filePath } = pageData;

    // Category page
    if (filePath.includes('category')) {
      // Get category name from file name
      const matches = filePath.match(/\/(.*?)\.md/);
      const categoryName = matches ? matches[1] : '';

      const info = await getCategoryContent(categoryName);

      if (info.title) {
        pageData.title = info.title;
        pageData.frontmatter.title = info.title;
      }

      if (info.shortDescription) {
        pageData.frontmatter.shortDescription = info.shortDescription;
      }

      if (info.description) {
        pageData.frontmatter.description = info.description;
      }
    }

    if (!frontmatter.title) return;

    // Component page
    if (pageData.filePath.includes('components')) {
      const matches = relativePath.match(/\/(\w*)\.md/);

      const componentName = matches ? matches[1] : '';

      if (componentName) {
        const info = await getComponentContent(componentName);

        if (info.description) {
          pageData.frontmatter.description = info.description;
        }

        if (info.keywords) {
          const keywords = info.keywords.map((keyword) => `${keyword.trim().replace(/\s/g, '-')}`).join(' ');

          pageData.frontmatter.head ??= [];
          pageData.frontmatter.head.push([
            'meta',
            {
              name: 'keywords',
              content: keywords,
            }
          ]);

          pageData.frontmatter.keywords = info.keywords;
          pageData.frontmatter.previewImg = info.previewImg;
        }
      }
    }
  }
})

