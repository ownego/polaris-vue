import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      staticImport: true,
      outDir: 'dist/types',
      exclude: ['dist', 'build'],
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
})
