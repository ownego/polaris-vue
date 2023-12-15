import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vitepress';
import { fileURLToPath } from 'url';
import { globby } from 'globby';
import type StateBlock from 'markdown-it/lib/rules_block/state_block';

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

/**
 * Build token by examples
 *
 * @param state
 * @param startLine
 * @param endLine
 * @param silent
 */
function exampleParser(state: StateBlock, startLine: number, endLine: number, silent: boolean): boolean {
  const CH = '<'.charCodeAt(0)
  const pos = state.bMarks[startLine] + state.tShift[startLine]
  const max = state.eMarks[startLine]

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false
  }

  // ignore all lines not starts with <<<
  for (let i = 0; i < 3; ++i) {
    const ch = state.src.charCodeAt(pos + i)
    if (ch !== CH || pos + i >= max) return false
  }

  // ignore if the line is not [examples]
  const line = state.src.slice(pos, max)

  if (!line.includes('[examples]')) {
    return false
  }

  if (silent) {
    return true
  }

  const start = pos + 3
  const end = state.skipSpacesBack(max, pos)

  const rawPath = state.src
    .slice(start, end)
    .trim()

  const { filepath, extension, region, lines, lang, title } =
    rawPathToToken(rawPath)

  state.line = startLine + 1

  // Build token by examples
  const { examples } = state.env.frontmatter??{};

  if (examples && examples.length) {
    examples.forEach((example, index) => {
      const token = state.push('fence', 'code', 0)
      token.info = `vue[${example.fileName}]`

      const { realPath, path: _path } = state.env
      const resolvedPath = path.resolve(path.dirname(realPath ?? _path), example.fileName)

      // @ts-ignore
      token.src = [resolvedPath, region.slice(1)]
      token.markup = '```'
      token.map = [startLine, startLine + 1]
      token.meta = `example-${index}`
    });
  }

  return true;
}

/**
 * raw path format: "/path/to/file.extension#region {meta} [title]"
 *    where #region, {meta} and [title] are optional
 *    meta can be like '1,2,4-6 lang', 'lang' or '1,2,4-6'
 *    lang can contain special characters like C++, C#, F#, etc.
 *    path can be relative to the current file or absolute
 *    file extension is optional
 *    path can contain spaces and dots
 *
 * captures: ['/path/to/file.extension', 'extension', '#region', '{meta}', '[title]']
 */
export const rawPathRegexp =
  /^(.+?(?:(?:\.([a-z0-9]+))?))(?:(#[\w-]+))?(?: ?(?:{(\d+(?:[,-]\d+)*)? ?(\S+)?}))? ?(?:\[(.+)\])?$/

export function rawPathToToken(rawPath: string) {
  const [
    filepath = '',
    extension = '',
    region = '',
    lines = '',
    lang = '',
    rawTitle = ''
  ] = (rawPathRegexp.exec(rawPath) || []).slice(1)

  const title = rawTitle || filepath.split('/').pop() || ''

  return { filepath, extension, region, lines, lang, title }
}
