import path from 'path';
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
// import css from 'rollup-plugin-css-only';
import styles from 'rollup-plugin-styles';
import includePaths from 'rollup-plugin-includepaths';
import commonjs from '@rollup/plugin-commonjs';

// let postVueConfig = [postcss];

// if (process.env.SEP_CSS) {
//   postVueConfig = [css({ output: './dist/main.css' }), ...postVueConfig];
// }

export default {
  plugins: {
    preVue: [
      replace({
        values: {
          'process.env.NODE_ENV': JSON.stringify('production'),
        },
        preventAssignment: true,
      }),
      alias({
        entries: [
          { find: /@\//, replacement: `${path.resolve(__dirname, 'src/')}` },
          { find: /'vue'/, replacement: `${path.resolve(__dirname, '\'node_modules/vue/dist/vue.js\'')}` },
        ],
        customResolver: resolve({
          extensions: ['.ts', '.js', '.vue'],
        }),
      }),
      styles(),
    ],
    vue: {
      // css: false,
      target: 'browser',
      // preprocessStyles: true,
      compileTemplate: true,
      template: {
        isProduction: true,
      },
    },
    postVue: [
      // postcss,
      resolve({
        extensions: ['.js', '.ts', '.vue'],
      }),
      commonjs(),
    ],
    babel: {
      exclude: 'node_modules/**',
      extensions: ['.ts', '.js', '.vue'],
      babelHelpers: 'bundled',
    },
  },
};
