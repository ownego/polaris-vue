import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import path from 'path';
import { replaceCodePlugin } from 'vite-plugin-replace';
import svgLoader from 'vite-svg-loader';
import checker from 'vite-plugin-checker';
import typescript from '@rollup/plugin-typescript';

import vue from '@vitejs/plugin-vue';
import packageJson from './package.json';

export default defineConfig({
  plugins: [
    checker({
      vueTsc: true,
      typescript: true,
      eslint: {
        lintCommand: 'eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore',
      },
    }),
    replaceCodePlugin({
      replacements: [
        {
          from: '{{POLARIS_VERSION}}',
          to: packageJson.polaris_version,
        },
      ],
    }),
    svgLoader(),
    vue({
      reactivityTransform: true,
    }),
    // dts({
    //   outputDir: 'dist/types',
    // }),
  ],
  resolve: {
    dedupe: ['vue'],
    alias: {
      '@/': fileURLToPath(new URL('./src/', import.meta.url)),
      '@icons': fileURLToPath(new URL('./node_modules/@shopify/polaris-icons/dist/svg', import.meta.url)),
      '~': fileURLToPath(new URL('./node_modules', import.meta.url)),
      types: fileURLToPath(new URL('./types', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/polaris-vue.ts'),
      name: 'Polaris Vue',
      fileName: (format) => `polaris-vue.${format}.js`,
    },
    cssCodeSplit: true,
    cssTarget: 'chrome61',
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        sourcemap: false,
        exports: 'named',
      },
      plugins: [
        typescript({
          tsconfig: 'tsconfig.json',
        }),
      ],
    },
  },
});
