import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Arco from '@arco-design/web-vue'
import ArcoIcon from '@arco-design/web-vue/es/icon'
import '@arco-design/web-vue/dist/arco.css'
// import 'highlight.js/styles/atom-one-dark.min.css'
import 'juejin-markdown-themes/dist/channing-cyan.min.css'
import installDirectives from '@/directives/index.ts'
import eventBus from './eventBus'
const app = createApp(App)
installDirectives(app)
app.use(Arco)
app.use(ArcoIcon)
app.use(createPinia())
app.use(router)
app.mount('#app')
