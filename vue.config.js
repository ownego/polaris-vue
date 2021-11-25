// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = {
  devServer: {
    port: 1902,
  },
  productionSourceMap: false,

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
