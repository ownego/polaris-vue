/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  devServer: {
    port: 1902,
  },
  productionSourceMap: false,
  css: {
    extract: false,
    requireModuleExtension: false,
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@icons', path.resolve(__dirname, 'node_modules/@shopify/polaris-icons/dist/svg'))
      .set('@', path.resolve(__dirname, 'src'))
      .set('~', path.resolve(__dirname, 'node_modules/'));

    // SVG loader
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
};
