import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss-modules';
import clear from 'rollup-plugin-clear';
import uglify from 'rollup-plugin-uglify';
import { generateScopedName } from './config/namespaced-classname';

export default {
  input: './src/polaris-vue.ts',
  output: [{
    file: './dist/polaris-vue.js',
    format: 'esm',
  }, {
    file: './dist/polaris-vue.min.js',
    format: 'iife',
  }],
  plugins: [
    vue({
      preprocessStyles: true,
    }),
    postcss({
      modules: {
        generateScopedName,
      },
      autoModules: false,
    }),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
        },
        include: null,
      },
    }),
    uglify,
    clear({
      targets: ['./dist'],
    }),
  ],
};
