// src/global.d.ts
import type { AppConfig } from '@/config/app.config'

declare module 'vue' {
  interface ComponentCustomProperties {
    $config: AppConfig
  }
}

declare global {
  export type AppConfig = import('@/config/app.config').AppConfig
}

export interface axiosMeta {
  isShowMessage?: boolean
  errMessage?: string
  headerIndex?: number
  title?: string
}

declare module 'axios' {
  interface AxiosRequestConfig {
    meta?: axiosMeta
  }
}
