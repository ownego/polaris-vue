const path = require('path');

module.exports = {
  stories: [
    './stories/**/*.stories.mdx',
    '../src/**/README.stories.mdx',
  ],
  framework: '@storybook/vue',
  addons: [
    {
      name: '@storybook/preset-typescript',
      options: {
        tsLoaderOptions: {
          configFile: path.resolve(__dirname, '../tsconfig.json'),
        },
        include: [path.resolve(__dirname, '../src')],
        exclude: ['*.mdx'],
      },
    },
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    // '@storybook/addon-knobs',
  ],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push(
      {
        test: /\.pug$/,
        use: ['pug-plain-loader'],
      },
      {
        test: /\.(scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
        include: path.resolve(__dirname, '../src/components'),
      },
    );

    config.resolve.alias = {
      '@': path.resolve(__dirname, '../src'),
      'vue': 'vue/dist/vue.js',
    };

    return config;
  },
}
