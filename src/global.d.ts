// src/global.d.ts
import { ComponentCustomProperties } from 'vue'
import type { AppConfig } from '@/config/app.config'

declare module 'vue' {
  interface ComponentCustomProperties {
    $config: AppConfig
  }
}

declare global {
  export type AppConfig = import('@/config/app.config').AppConfig
}
