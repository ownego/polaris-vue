/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

interface ImportMetaEnv {
  readonly VITE_CLASS_PREFIX: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
