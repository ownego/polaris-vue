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
  ],
  webpackFinal: async (config, { configType }) => {
    let rule = config.module.rules.find(r =>
      // it can be another rule with file loader
      // we should get only svg related
      r.test && r.test.toString().includes('svg') &&
      // file-loader might be resolved to js file path so "endsWith" is not reliable enough
      r.loader && r.loader.includes('file-loader')
    );
    rule.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/;

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
      {
        test: /\.svg$/,
        use: ['vue-svg-loader']
      }
    );

    config.resolve.alias = {
      '@icons': path.resolve(__dirname, '../node_modules/@shopify/polaris-icons/dist/svg'),
      '@': path.resolve(__dirname, '../src'),
      'vue': 'vue/dist/vue.js',
    };

    return config;
  },
}
