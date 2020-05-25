import Vue from 'vue';
import Router from 'vue-router';
import DashboardLayout from '../layout/starter/SampleLayout.vue';
import Starter from '../layout/starter/SamplePage.vue';
import Historias from '../layout/starter/Historias.vue';
import ProcesoSrcum from '../layout/starter/ProcesoSrcum.vue';
import Historia from '../layout/starter/Historia.vue';
import Estimacion from '../layout/starter/Estimacion.vue';
import Cronometro from '../layout/starter/Cronometro.vue';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/juegos',
      component: DashboardLayout,
      children: [
        {
          path: 'juegos',
          name: 'Estimacion',
          components: { default: Starter }
        },
        {
          path: 'proceso',
          name: 'Proceso Scrum',
          components: { default: ProcesoSrcum }
        }
        ,
        {
          path: 'stories',
          name: 'Estimacion',
          components: { default: Historias }
        }
        ,
        {
          path: 'story',
          name: 'Estimacion',
          components: { default: Historia }
        }
        ,
        {
          path: 'estimation',
          name: 'Estimacion',
          components: { default: Estimacion }
        },
        {
          path: 'cronometro',
          name: 'Estimacion',
          components: { default: Cronometro }
        }
      ]
    }
  ]
});
