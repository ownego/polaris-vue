import fs from 'fs';
import path from 'path';
import minimist from 'minimist';
import { terser } from 'rollup-plugin-terser';
import vue from 'rollup-plugin-vue2';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import pug from 'rollup-plugin-pug';
import typescript from 'rollup-plugin-typescript2';
import ttypescript from 'ttypescript';

import baseConfig from './rollup.config.base';

const argv = minimist(process.argv.slice(2));

const baseFolder = 'src/';
const componentsFolder = 'components/';

const components = fs
  .readdirSync(baseFolder + componentsFolder)
  .filter((f) => fs.statSync(path.join(baseFolder + componentsFolder, f)).isDirectory());

const entriespath = {
  'polaris-vue': './src/polaris-vue.ts',
  ...components.reduce((obj, name) => {
    const reobj = obj;
    reobj[name] = (`${baseFolder + componentsFolder + name}/index.ts`);

    return reobj;
  }, {}),
};

const globals = {
  vue: 'Vue',
};
const external = ['vue'];

// eslint-disable-next-line import/no-mutable-exports
const buildFormats = [];

const mapComponent = (name) => [
  {
    input: `${baseFolder + componentsFolder}${name}/index.ts`,
    external,
    output: {
      format: 'umd',
      name,
      file: `dist/components/${name}.js`,
      exports: 'named',
      globals,
    },
    plugins: [
      ...baseConfig.plugins.preVue,
      vue(),
      ...baseConfig.plugins.postVue,
      babel({
        ...baseConfig.plugins.babel,
        presets: [['@babel/preset-env', { modules: false }]],
      }),
      commonjs(),
    ],
  },
];

// ES file build config
if (!argv.format || argv.format === 'es') {
  console.log(entriespath);
  const esConfig = {
    input: entriespath,
    external,
    output: {
      format: 'esm',
      dir: 'dist/esm',
    },
    plugins: [
      ...baseConfig.plugins.preVue,
      pug(),
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      typescript({
        typescript: ttypescript,
        useTsconfigDeclarationDir: true,
        emitDeclarationOnly: true,
        // tsconfig: path.resolve(__dirname, '../tsconfig.json'),
      }),
      babel({
        ...baseConfig.plugins.babel,
        presets: [['@babel/preset-env']],
      }),
    ],
  };

  const merged = {
    input: 'src/polaris-vue.ts',
    external,
    output: {
      file: 'dist/polaris-vue.esm.js',
      format: 'esm',
      exports: 'named',
    },
    plugins: [
      ...baseConfig.plugins.preVue,
      pug(),
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
  const ind = [
    ...components.map((f) => mapComponent(f)).reduce((r, a) => r.concat(a), []),
  ];

  // buildFormats.push(esConfig);
  buildFormats.push(merged);
  // buildFormats = [...buildFormats, ...ind];
}

// IIFE build config
if (!argv.format || argv.format === 'iife') {
  const unpkgConfig = {
    ...baseConfig,
    input: './src/polaris-vue.ts',
    external,
    output: {
      compact: true,
      file: 'dist/polaris-vue.min.js',
      format: 'iife',
      name: 'PolarisVue',
      exports: 'named',
      globals,
    },
    plugins: [
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      babel(baseConfig.plugins.babel),
      commonjs(),
      terser({
        output: {
          ecma: 5,
        },
      }),
    ],
  };
  // buildFormats.push(unpkgConfig);
}

// Export config
export default buildFormats;
