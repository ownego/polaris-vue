/* eslint-disable @typescript-eslint/no-var-requires */
const postcssModules = require('postcss-modules');
const classConfig = require('./build/config/ok');

module.exports = {
  devServer: {
    port: 1902,
  },
  productionSourceMap: false,
  css: {
    requireModuleExtension: false,
    loaderOptions: {
      css: {
        modules: true,
        importLoaders: 2,
      },
      postcss: {
        plugins: [
          postcssModules({
            generateScopedName: classConfig,
          }),
        ],
      },
    },
  },

  chainWebpack: (config) => {
    // CSS loader
    // const cssLoader = config.module.rule('css');
    // cssLoader.uses.clear();
    // cssLoader
    //   .use('css-modules-typescript-loader')
    //   .loader('css-loader')
    //   .options({
    //     modules: true,
    //   })
    //   .end();

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
