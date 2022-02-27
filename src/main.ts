import { createApp } from 'vue'
import App from './App.vue'
import 'echarts'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api'

const app = createApp(App)
app.mount('#app')
