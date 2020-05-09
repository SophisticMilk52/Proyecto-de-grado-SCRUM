import Vue from 'vue'
import Router from 'vue-router'
import Estimacion from '@/components/Estimacion'
import Historias from '@/components/Historias'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/estimacion',
      name: 'Estimacion',
      component: Estimacion
    },
    {
      path: '/stories',
      name: 'Historias',
      component: Historias
    }
  ]
})