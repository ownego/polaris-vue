import { defineConfig } from 'vite'
import createViteConfig from './common'

export default () => defineConfig({
  ...createViteConfig('es'),
})
