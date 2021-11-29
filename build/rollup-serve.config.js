import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss-modules';
import clear from 'rollup-plugin-clear';
import uglify from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import { generateScopedName } from './config/namespaced-classname';

export default {
  input: './src/main.ts',
  output: [{
    file: './dist/main.js',
    format: 'iife',
    globals: {
      vue: 'Vue',
      'vue-property-decorator': 'vuePropertyDecorator',
    },
  }],
  external: ['vue', 'vue-property-decorator'],
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
    resolve(),
    commonJS({
      include: 'node_modules/**',
    }),
    uglify,
    clear({
      targets: ['./dist'],
    }),
  ],
};
