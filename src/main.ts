import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// // 完整引入第三方组件库
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// 引入自定义指令
import Instructions from '@/utils/derectives'

const app = createApp(App)
Instructions.init(app)

// 关闭控制台警告warn
app.config.warnHandler = () => null
app.config.errorHandler = () => null

// app.use(store).use(router).use(ElementPlus).mount('#app')
app.use(store).use(router).mount('#app')
