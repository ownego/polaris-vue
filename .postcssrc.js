/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const postcssModules = require('postcss-modules');
const classConfig = require('./build/namespaced-classname');

module.exports = {
  plugins: [
    postcssModules({
      generateScopedName: classConfig,
      getJSON: (cssFileName, json) => {
        let cssName = path.basename(cssFileName, '.vue');

        const pattern = /polaris\-vue\/src\/components\/(.*?)\/components/g;
        let parentName = cssFileName.match(pattern);
        if (parentName) {
          parentName = parentName[0].replace(pattern, '$1');
        }

        // Fix rollup repeat
        cssName = cssName.replace(/(.*)\.vue\?.*/, '$1');
        const jsonFileName = path.resolve(`./src/classes/${parentName ? `${parentName}-` : ''}${cssName}.json`);
        fs.writeFileSync(jsonFileName, JSON.stringify(json));
      },
    }),
  ],
};
