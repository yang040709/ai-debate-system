import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import Arco from '@arco-design/web-vue'
// import ArcoIcon from '@arco-design/web-vue/es/icon'
import installDirectives from '@/directives/index.ts'
import ConfigPlugin from '@/plugins/config'
import dayjs from 'dayjs'
import relative from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn.js'

// import 'highlight.js/styles/atom-one-dark.min.css'
// import 'highlight.js/styles/github.css'
import '@arco-design/web-vue/dist/arco.css'
// import 'juejin-markdown-themes/dist/channing-cyan.min.css'
import './styles/base.scss'
import './styles/arco-override.scss'
import 'default-passive-events'

import '@/mock/index.js'
import 'github-markdown-css/github-markdown-light.css'

// 引入dayjs
dayjs.locale('zh-cn')
dayjs.extend(relative)

// 创建vue实例
const app = createApp(App)
// 引入全局指令
installDirectives(app)
// 引入全局配置插件
app.use(ConfigPlugin)
// // 引入arco图标
// app.use(ArcoIcon)
// 创建pinia
app.use(createPinia())
// 使用路由
app.use(router)
// 绑定实例
app.mount('#app')
