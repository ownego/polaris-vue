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

    config.module
      // Replace Vue's existing base loader by first clearing it
      // https://cli.vuejs.org/guide/webpack.html#replacing-loaders-of-a-rule
      .rule('svg')
      .uses.clear()
      .end()
      // Add vue-loader as a loader for Vue single-file components
      // https://www.npmjs.com/package/vue-loader
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      // Add vue-svg-loader as a loader for importing .svg files into Vue single-file components
      // Located in ./vue-svg-loader.js
      .use('./vue-svg-loader')
      .loader('./vue-svg-loader')
      .end();
  },
};
