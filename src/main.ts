import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import Antd from 'ant-design-vue'
import Arco from '@arco-design/web-vue'
import ArcoIcon from '@arco-design/web-vue/es/icon'
// import 'ant-design-vue/dist/reset.css'
import '@arco-design/web-vue/dist/arco.css'
const app = createApp(App)

app.use(Arco)
app.use(ArcoIcon)
app.use(createPinia())
app.use(router)
// app.use(Antd)
app.mount('#app')
