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
      { icon: {
        svg: '<svg viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M15.927,9.872 C15.927,9.792 15.92,9.713 15.911,9.636 C15.911,9.624 15.908,9.612 15.906,9.599 C15.903,9.581 15.901,9.564 15.899,9.546 C15.894,9.523 15.889,9.498 15.885,9.475 C15.885,9.468 15.882,9.461 15.882,9.454 C15.853,9.309 15.802,9.156 15.73,9.001 C15.711,8.964 15.693,8.929 15.672,8.894 C15.328,8.273 14.665,7.853 13.907,7.853 C13.609,7.853 13.327,7.918 13.073,8.033 C13.061,8.038 13.048,8.044 13.036,8.05 C13.031,8.052 13.026,8.055 13.02,8.057 C12.993,8.071 12.962,8.085 12.935,8.101 C12.916,8.111 12.901,8.121 12.882,8.131 C12.868,8.139 12.855,8.147 12.843,8.156 C12.822,8.168 12.804,8.179 12.783,8.192 C12.776,8.198 12.767,8.204 12.761,8.21 C12.69,8.259 12.623,8.31 12.566,8.364 C12.559,8.369 12.552,8.374 12.545,8.381 C12.529,8.396 12.516,8.41 12.499,8.425 C12.49,8.434 12.478,8.445 12.47,8.455 C12.455,8.468 12.445,8.48 12.433,8.492 C12.421,8.505 12.408,8.518 12.397,8.532 C12.388,8.543 12.378,8.553 12.37,8.565 C12.358,8.579 12.345,8.594 12.333,8.609 C12.323,8.619 12.316,8.63 12.308,8.64 C12.296,8.654 12.287,8.668 12.277,8.682 C12.267,8.696 12.258,8.71 12.247,8.724 C12.24,8.734 12.235,8.743 12.228,8.752 C12.127,8.903 12.065,9.035 12.034,9.116 C12.036,9.107 12.038,9.098 12.038,9.09 C11.516,10.713 9.995,11.889 8.197,11.889 C5.968,11.889 4.161,10.081 4.161,7.852 C4.161,6.079 5.306,4.573 6.896,4.032 C6.892,4.032 6.887,4.033 6.883,4.035 C7.651,3.75 8.198,3.01 8.198,2.143 C8.198,1.029 7.295,0.125 6.18,0.125 C5.944,0.125 5.717,0.166 5.507,0.241 L5.507,0.241 C2.372,1.349 0.125,4.338 0.125,7.853 C0.125,12.311 3.739,15.926 8.197,15.926 C11.745,15.926 14.758,13.638 15.84,10.457 C15.859,10.397 15.881,10.311 15.897,10.202 C15.915,10.095 15.927,9.983 15.927,9.872 Z" id="oeLogo-bigCircle"></path><circle id="oeLogo-centerCircle" cx="8.18" cy="7.854" r="2.019"></circle><path d="M12.479,1.551 C11.365,1.551 10.46,2.454 10.46,3.569 C10.46,4.683 11.364,5.587 12.479,5.587 C13.592,5.587 14.498,4.683 14.498,3.569 C14.497,2.454 13.592,1.551 12.479,1.551 Z M12.479,4.522 C11.952,4.522 11.526,4.095 11.526,3.569 C11.526,3.043 11.952,2.616 12.479,2.616 C13.006,2.616 13.432,3.042 13.432,3.569 C13.432,4.096 13.006,4.522 12.479,4.522 Z" id="oeLogo-smallCircle"></path></svg>'
        },
        link: 'https://ownego.com?utm_source=polaris-vue&utm_medium=referral&utm_campaign=app-listing'
      },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2021-present. With ❤️ by <a href="https://ownego.com?utm_source=polaris-vue&utm_medium=referral&utm_campaign=website" target="_blank">ownego</a>.',
    },
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
