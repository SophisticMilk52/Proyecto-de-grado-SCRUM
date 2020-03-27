import Vue from 'vue'
import Router from 'vue-router'
import Estimacion from '@/components/Estimacion'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/estimacion',
      name: 'Estimacion',
      component: Estimacion
    }
  ]
})