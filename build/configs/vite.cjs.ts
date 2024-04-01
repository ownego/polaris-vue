import { defineConfig } from 'vite'
import createViteConfig from './common'

export default () => {
  return defineConfig({
    ...createViteConfig('cjs'),
  })
}
