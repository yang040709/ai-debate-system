import type { App } from 'vue'

import appConfig from '@/config/app.config'

export default {
  install(app: App) {
    app.config.globalProperties.$config = appConfig
    app.provide('config', appConfig)
  },
}
