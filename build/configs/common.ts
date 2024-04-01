/**
 * Inspired by VuesticUI build config
 * https://github.com/epicmaxco/vuestic-ui/blob/develop/packages/ui/build/common-config.ts
 */
import { readFileSync, lstatSync, readdirSync } from 'fs'
import vue from '@vitejs/plugin-vue'
import { UserConfig } from 'vite'
import { resolve as resolver } from 'path'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'
import { removeSideEffectedChunks } from './remove-side-effect-chunks'
import { fixVueGenericComponentFileNames } from './fix-generic-file-names'
import { appendComponentCss } from './append-component-css'
import { generateScopedName } from '../namespaced-classname.js';
import svgLoader from 'vite-svg-loader';
import { replaceCodePlugin } from 'vite-plugin-replace';
import dts from 'vite-plugin-dts';

export const defineViteConfig = <T extends UserConfig>(p: T): UserConfig & T => p

import type { RollupOptions } from 'vite/node_modules/rollup';

const packageJSON = JSON.parse(readFileSync(resolver(process.cwd(), './package.json')).toString())
const dependencies = [...Object.keys(packageJSON.dependencies), ...Object.keys(packageJSON.peerDependencies)]

export type BuildFormat = 'iife' | 'es' | 'cjs' | 'esm-node'

export const readDirRecursive = (path: string): string[] => {
  return readdirSync(path)
    .reduce<string[]>((acc, entry) => {
      const p = `${path}/${entry}`

      if (lstatSync(p).isDirectory()) {
        return [...acc, ...readDirRecursive(p)]
      }

      return [...acc, p]
    }, [])
}

export const resolve = {
  alias: {
    '@icons': resolver(process.cwd(), 'node_modules/@shopify/polaris-icons/dist/svg'),
    '@polaris': resolver(process.cwd(), './polaris/polaris-react/src'),
    '@': resolver(process.cwd(), './src'),
    '~': resolver(process.cwd(), './node_modules'),
  },
  dedupe: ['vue'],
}

const rollupOutputOptions = (ext: string): RollupOptions['output'] => ({
  entryFileNames: `[name].${ext}`,
  chunkFileNames: `[name].${ext}`,
  assetFileNames: '[name].[ext]',
})

const rollupMjsBuildOptions: RollupOptions = {
  input: resolver(process.cwd(), 'src/polaris-vue.ts'),

  output: {
    sourcemap: true,
    dir: 'dist/esm-node',
    format: 'esm',
    ...rollupOutputOptions('mjs'),
  },
}

const libBuildOptions = (format: 'iife' | 'es' | 'cjs') => ({
  entry: resolver(process.cwd(), 'src/polaris-vue.ts'),
  fileName: () => 'polaris-vue.js',
  formats: [format],

  // only for iife/umd
  name: 'PolarisVue',
})

export default function createViteConfig (format: BuildFormat) {
  const isEsm = ['es', 'esm-node'].includes(format)
  const isNode = format === 'esm-node'

  const config = defineViteConfig({
    resolve,

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

    build: {
      outDir: `dist/${isEsm ? format : ''}`,
      cssCodeSplit: false,
      sourcemap: true,
      minify: isEsm ? false : 'esbuild',
      lib: libBuildOptions(isNode ? 'es' : format),
    },

    plugins: [
      vue({
        isProduction: true,
        exclude: [/\.md$/, /\.spec\.ts$/, /\.spec\.disabled$/],
      }),
      svgLoader(),
      replaceCodePlugin({
        replacements: [
          {
            from: '%POLARIS_VERSION%',
            to: packageJSON.polaris_version,
          },
        ],
      }),
      dts({
        rollupTypes: true,
        outDir: 'dist/types',
      }),
    ],
  })

  // https://github.com/sanyuan0704/vite-plugin-chunk-split
  isEsm && config.plugins.push(chunkSplitPlugin({ strategy: 'unbundle' }))
  // isEsm && !isNode && config.plugins.push(appendComponentCss())
  isEsm && config.plugins.push(removeSideEffectedChunks())
  isEsm && config.plugins.push(fixVueGenericComponentFileNames)

  if (isNode) {
    config.build.rollupOptions = {
      external: [...dependencies, 'vue'],
      ...rollupMjsBuildOptions,
    };
  } else {
    config.build.rollupOptions = {
      external: [...dependencies, 'vue'],
      output: rollupOutputOptions('js'),
    }
  }

  return config
}
