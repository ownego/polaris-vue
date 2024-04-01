import {readFileSync} from 'fs';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import { fileURLToPath } from 'url';
import { replaceCodePlugin } from 'vite-plugin-replace';
import { generateScopedName } from './build/namespaced-classname.js';
import dts from 'vite-plugin-dts';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url).pathname).toString());

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    plugins: [
      vue(),
      svgLoader(),
      replaceCodePlugin({
        replacements: [
          {
            from: '%POLARIS_VERSION%',
            to: pkg.polaris_version,
          },
        ],
      }),
      dts({
        rollupTypes: true,
        outDir: 'dist/types',
      }),
    ],
    resolve: {
      alias: {
        '@icons': fileURLToPath(new URL('node_modules/@shopify/polaris-icons/dist/svg', import.meta.url)),
        '@polaris': fileURLToPath(new URL('./polaris/polaris-react/src', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('./node_modules', import.meta.url)),
      },
      dedupe: ['vue'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true, // Silent the deprecation warning
        },
      },
      modules: {
        generateScopedName,
      },
    },
  });
};
