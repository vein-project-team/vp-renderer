import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import 'echarts'
import './index.css'

axios.defaults.baseURL = 'http://localhost:8000/api'

const app = createApp(App)
app.mount('#app')
