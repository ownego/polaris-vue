module.exports = {
  stories: [
    './stories/**/*.stories.mdx',
    '../src/**/README.stories.mdx',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-actions',
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: false,
      },
    },
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: true,
        }
      }
    }
    '@storybook/preset-typescript',
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

    // Return the altered config
    return config;
  },
}
