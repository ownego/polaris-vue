import path from 'path';
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';

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
          { find: /@icons/, replacement: `${path.resolve(__dirname, '../node_modules/@shopify/polaris-icons/dist/svg')}` },
          { find: /@\/(.*)/, replacement: `${path.resolve(__dirname, '../src/$1')}` },
        ],
      }),
      postcss(),
    ],
    vue: {
      css: false,
      preprocessStyles: true,
      template: {
        isProduction: true,
      },
      style: {
        preprocessOptions: {
          scss: {
            includePaths: ['node_modules'],
          },
        },
      },
    },
    postVue: [
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
