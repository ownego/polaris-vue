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
  },
};
