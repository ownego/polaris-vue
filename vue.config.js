/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');
const postcssModules = require('postcss-modules');
const classConfig = require('./build/namespaced-classname');

module.exports = {
  devServer: {
    port: 1902,
  },
  productionSourceMap: false,
  css: {
    extract: false,
    requireModuleExtension: false,
    loaderOptions: {
      postcss: {
        plugins: [
          postcssModules({
            generateScopedName: classConfig,
            getJSON: (cssFileName, json) => {
              const cssName = path.basename(cssFileName, '.vue');
              const jsonFileName = path.resolve(`./src/classes/${cssName}.json`);
              fs.writeFileSync(jsonFileName, JSON.stringify(json));
            },
          }),
        ],
      },
    },
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'));

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

  // configureWebpack: {
  //   output: {
  //     libraryExport: 'default',
  //   },
  // },
};
