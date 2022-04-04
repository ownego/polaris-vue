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
    builder: '@storybook/builder-vite',
  },
  typescript: {
    check: false,
    checkOptions: {},
  },
  async viteFinal(buildConfig, { configType }) {
    const { config } = await loadConfigFromFile(
      path.resolve(__dirname, '../vite.config.ts')
    );

    const finalConfig = mergeConfig(buildConfig, {
      base: configType === 'PRODUCTION' ? 'polaris-vue' : '',
      output: {
        publicPath: '/polaris-vue',
      },
      resolve: { ...config.resolve },
      plugins: [
        svgLoader(),
        eslintPlugin({
          exclude: ['node_modules/**', 'src/**'],
        }),
      ],
    });

    return finalConfig;
  },
}
