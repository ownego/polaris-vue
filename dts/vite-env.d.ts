/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLASS_PREFIX: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
