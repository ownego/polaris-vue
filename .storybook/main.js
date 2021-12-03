const path = require('path');

module.exports = {
  stories: [
    './stories/**/*.stories.mdx',
    '../src/**/README.stories.mdx',
  ],
  framework: '@storybook/vue',
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-knobs',
    '@storybook/preset-scss',
    // {
    //   name: '@storybook/preset-scss',
    //   options: {
    //     cssLoaderOptions: {
    //       modules: true,
    //     }
    //   }
    // },
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.
    config.module.rules.push(
      {
        test: /\.pug$/,
        use: [
          { loader: 'pug-plain-loader' }
        ]
      }
    );

    config.resolve.alias = {
      '@': path.resolve(__dirname, '../src'),
      'vue': 'vue/dist/vue.js',
    };

    // Return the altered config
    return config;
  },
}
