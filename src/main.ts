// import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import Arco from '@arco-design/web-vue'
import ArcoIcon from '@arco-design/web-vue/es/icon'
import TDesignChat from '@tdesign-vue-next/chat'
import '@arco-design/web-vue/dist/arco.css'
// import 'highlight.js/styles/atom-one-dark.min.css'
import 'juejin-markdown-themes/dist/channing-cyan.min.css'
import installDirectives from '@/directives/index.ts'
import './styles/base.scss'
import './styles/arco-override.scss'
import 'default-passive-events'
import 'tdesign-vue-next/es/style/index.css'
import ConfigPlugin from '@/plugins/config'
const app = createApp(App)
installDirectives(app)
app.use(ConfigPlugin)
app.use(TDesignChat)
app.use(ArcoIcon)
app.use(createPinia())
app.use(router)
app.mount('#app')
