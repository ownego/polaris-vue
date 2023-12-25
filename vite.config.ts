import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';
import { replaceCodePlugin } from 'vite-plugin-replace';
import packageJson from './package.json';
import { generateScopedName } from './build/namespaced-classname.js';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, '.');

  return defineConfig({
    plugins: [
      vue(),
      replaceCodePlugin({
        replacements: [
          {
            from: '%POLARIS_VERSION%',
            to: packageJson.polaris_version,
          },
        ],
      }),
    ],
    resolve: {
      alias: {
        '@icons': fileURLToPath(new URL('node_modules/@shopify/polaris-icons/dist/svg', import.meta.url)),
        '@polaris': fileURLToPath(new URL('./polaris/polaris-react/src', import.meta.url)),
        '@tokens': fileURLToPath(new URL('./polaris/polaris-tokens/src', import.meta.url)),
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
        // generateScopedName: `${env.VITE_CLASS_PREFIX}-[local]`,
        generateScopedName,
      },
    },
    build: {
      lib: {
        entry: fileURLToPath(new URL('./src/polaris-vue.ts', import.meta.url)),
        name: 'Polaris Vue',
        fileName: (format) => `polaris-vue.${format}.js`,
      },
      cssCodeSplit: false,
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue',
          },
          exports: 'named',
        },
      },
    },
  });
};
