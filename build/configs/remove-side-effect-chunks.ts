import { createDistTransformPlugin } from './create-dist-transform';

/**
 * Vite think that some chunks contain side effects,
 * so it keep them in bundle and imports with `import "..."`.
 * It simply removes all imports from chunks that import side effected chunks
 * after build is done.
 */
export const removeSideEffectedChunks = createDistTransformPlugin({
  name: 'polaris-vue:remove-side-effected-chunks',

  transform: (content) => {
    return content.replace(/import ".*";(\n)*/gm, '')
  },
})
