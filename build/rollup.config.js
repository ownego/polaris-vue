import minimist from 'minimist';
import vue from 'rollup-plugin-vue';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import ttypescript from 'ttypescript';
import json from '@rollup/plugin-json';
import svg from 'rollup-plugin-vue-inline-svg';
import scss from 'rollup-plugin-scss';

import baseConfig from './rollup.config.base';

const argv = minimist(process.argv.slice(2));

const external = ['vue'];

const buildFormats = [];

// ES file build config
// Currently we only support es build
if (!argv.format || argv.format === 'es') {
  const merged = {
    input: 'src/polaris-vue.ts',
    external,
    output: {
      file: 'dist/polaris-vue.js',
      format: 'esm',
      exports: 'named',
    },
    plugins: [
      ...baseConfig.plugins.preVue,
      json(),
      svg(),
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      typescript({
        typescript: ttypescript,
        useTsconfigDeclarationDir: true,
        emitDeclarationOnly: true,
      }),
      babel({
        ...baseConfig.plugins.babel,
        presets: [['@babel/preset-env']],
      }),
    ],
  };

  const cssBuild = {
    input: 'src/scss/main.scss',
    plugins: [
      scss({
        output: 'dist/css/main.css',
        failOnError: true,
      }),
    ],
  };

  buildFormats.push(merged);
  buildFormats.push(cssBuild);
}

// Export config
export default buildFormats;
