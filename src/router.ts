import { createRouter, createWebHistory } from "vue-router";
import Home from './views/Home.vue'
import DailyReport from './views/DailyReport.vue'

const webHistory = createWebHistory()

export default createRouter({
  history: webHistory,
  routes: [
    {
      path: '/',
      component: Home,
    }, 
    {
      path: '/daily-report',
      component: DailyReport,
    }
  ]
})