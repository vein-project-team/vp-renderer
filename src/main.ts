import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import axios from 'axios'
import { createPinia } from 'pinia'
import 'echarts'
import './index.css'

axios.defaults.baseURL = 'http://localhost:8000/api'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
