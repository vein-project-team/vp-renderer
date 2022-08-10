import { createRouter, createWebHistory } from "vue-router";
import Home from './views/Home.vue'
import DailyReport from './views/DailyReport.vue'
import KReport from './views/KChartReport.vue'
import PieReport from './views/PieChartReport.vue'
import Calendar from './views/Calendar.vue'
import test from './views/test.vue'

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
    },
    {
      path: '/K-report',
      component: KReport,
    },
    {
      path: '/d',
      component: test,
    },
    {
      path: '/pie-report',
      component: PieReport,
    },
    {
      path: '/calendar',
      component: Calendar,
    }
  ]
})