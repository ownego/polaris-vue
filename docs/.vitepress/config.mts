import fs from 'fs';
import { defineConfig } from 'vitepress';

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

  const components = fs.readdirSync('./src/components');

  components.forEach(component => {
    if (component === 'index.ts') return;

    // Get title & category from README.md
    const content = fs.readFileSync(`./src/components/${component}/README.md`, 'utf-8');

    const regex = /^(?<!\n)-{3}[\s\S]*?title:\s*(.*)[\s\S]*?category:\s*(.*)[\s\S]*?-{3}/;
    const matches = content.match(regex);

    const title = matches[1] || component;
    const category = matches[2] || 'General';

    const componentPath = `/components/${component}`;

    sidebar.forEach(item => {
      if (item.text === category) {
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

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: '../src',
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
})
