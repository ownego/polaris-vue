const svgLoader = require('vite-svg-loader');
const { loadConfigFromFile, mergeConfig } = require('vite');
const eslintPlugin = require('vite-plugin-eslint').default;
const path = require('path');

module.exports = {
  stories: [
    './stories/**/*.stories.mdx',
    '../src/**/README.stories.mdx',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    'storybook-dark-mode',
  ],
  framework: '@storybook/vue3',
  core: {
    builder: 'storybook-builder-vite',
  },
  typescript: {
    check: false,
    checkOptions: {},
  },
  async viteFinal(previousConfig) {
    const { config } = await loadConfigFromFile(
      path.resolve(__dirname, '../vite.config.ts')
    );

    return mergeConfig(previousConfig, {
      ...config,
      plugins: [
        svgLoader(),
        eslintPlugin({
          exclude: ['node_modules/**', 'src/**'],
        }),
      ],
    });
  },
}
