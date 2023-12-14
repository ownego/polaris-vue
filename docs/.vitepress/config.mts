import fs from 'fs';
import { default as path } from 'path';
import { defineConfig } from 'vitepress';
import { fileURLToPath } from 'url';
import { globby } from 'globby';

function generateSideBarCategory() {
  const categoryList = [
    'Actions',
    'Layout and structure',
    'Selection and input',
    'Images and icons',
    'Feedback indicators',
    'Typography',
    'Tables',
    'Lists',
    'Navigation',
    'Overlays',
    'Utilities',
    'Deprecated',
  ];

  const sidebar = [];

  categoryList.forEach(category => {
    sidebar.push({
      text: category,
      items: [],
    });
  });

  return sidebar;
}

function generateSideBar() {
  const sidebar = generateSideBarCategory();

  const components = fs.readdirSync('./docs/components');

  components.forEach(component => {
    if (component === 'index.ts') return;

    // Check README.md exists
    if (!fs.existsSync(`./docs/components/${component}/README.md`)) return;

    // Get title & category from README.md
    const content = fs.readFileSync(`./docs/components/${component}/README.md`, 'utf-8');

    const regex = /^(?<!\n)-{3}[\s\S]*?title:\s*(.*)[\s\S]*?category:\s*(.*)[\s\S]*?-{3}/;
    const matches = content.match(regex);

    const title = matches[1] || component;
    const category = matches[2] || 'General';

    const componentPath = `/components/${component}`;

    sidebar.forEach(item => {
      if (item.text === category.trim()) {
        item.items.push({
          text: title,
          link: componentPath,
        });
      }
    });
  });

  console.log('------- sidebar');
  console.log(sidebar);

  return sidebar;
};

async function getContent(component: string) {
  const componentMdFile = convertToKebabCase(component);

  const paths = await globby([
    './polaris/polaris.shopify.com/content/components/**/*.mdx',
  ]);

  const path = paths.find(p => p.endsWith(`${componentMdFile}.mdx`));

  if (path) {
    const content = fs.readFileSync(path, 'utf8');

    // Find the description of component in <Lede> tag
    const descriptionMatch = content.match(/<Lede>\n\n(.*?)\n\n<\/Lede>/s);
    const description = descriptionMatch ? descriptionMatch[1] : '';

    // Find keywords in frontmatter
    const keywordsMatch = content.match(/keywords:(.*?)(<?\n)\w/s);
    const keywords = keywordsMatch
      ? keywordsMatch[1].trim().split('-').filter(k => k.trim())
      : [];

    return {
      description,
      keywords,
    };
  }
}

/**
 * Convert PascalCase to kebab-case
 */
function convertToKebabCase(str: string): string {
  return str.replace(/[A-Z]/g, '-$&').toLowerCase().replace(/^-/, '');
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  outDir: 'dist',
  cleanUrls: true,

  title: "Polaris Vue",
  titleTemplate: ":title — Shopify Polaris Vue by ownego",
  description: "Shopify Polaris for VueJS 3",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      src: 'https://github.com/ownego/polaris-vue/blob/master/public/images/logo-large.png?raw=true',
      alt: 'Polaris Vue Logo',
    },
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/documentation' },
      { text: 'Examples', link: '/examples' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        collapsed: false,
        items: [
          { text: 'Installation', link: '/documentation' },
          { text: 'Icons', link: '/icons' },
          { text: 'Tokens', link: 'https://polaris.shopify.com/tokens/color' },
          { text: 'Examples', link: '/examples' },
        ],
      },
      {
        text: 'Components',
        collapsed: false,
        items: [...generateSideBar()],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ownego/polaris-vue' }
    ]
  },

  rewrites: {
    'docs/:pkg': ':pkg',
    'components/:pkg/README.md': 'components/:pkg.md',
  },

  vite: {
    css: {
      modules: {
        generateScopedName: `Polaris-[local]`,
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
  },

  markdown: {
    config: (md) => {
      const fence = md.renderer.rules.fence!;

      /**
       * Automatically generate examples code from the frontmatter
       * PLEASE BE CAREFUL WHEN MODIFYING THIS CODE!
       */
      md.renderer.rules.fence = (...args) => {
        const [tokens, idx, config, page] = args;
        const token = tokens[idx];

        // Replace current token with the first example
        // Add the rest of the examples to the page
        if (
            page.frontmatter.examples
            && (!token.meta || !token.meta.startsWith('example'))
          ) {
          page.frontmatter.examples.forEach((example, index) => {
            // @ts-ignore
            const [ filePath, ...rest ] = token.src;

            if (index === 0) {
              token.meta = `example-${index}`;
              token.info = `vue[${example.fileName}]`;
              // @ts-ignore
              token.src = [ `${filePath}/${example.fileName}`, ...rest ];

              return;
            }

            const newPath = filePath.replace(/\/[^/]+?$/, '');

            const newToken = {
              ...token,
              meta: `example-${index}`,
              info: `vue[${example.fileName}]`,
              // @ts-ignore
              src: [ `${newPath}/${example.fileName}`, ...rest ],
            };

            // Add the new token to the tokens array
            // @ts-ignore
            tokens.splice(idx + index, 0, newToken);
          });
        }

        if (token.meta && token.meta.startsWith('example')) {
          // Get the example number
          const index = token.meta.split('-')[1];

          return (
            `<div class="docs-example-code docs-${token.meta}" data-example="${index}">` +
            fence(...args)
            + '</div>'
          )
        }

        return (fence(...args));
      }
    },
  },

  async transformPageData(pageData) {
    const { frontmatter, relativePath } = pageData;

    if (!frontmatter.title) return;

    const matches = relativePath.match(/\/(\w*)\.md/);

    const componentName = matches ? matches[1] : '';

    if (componentName) {
      const info = await getContent(componentName);

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
      }
    }
  }
})
