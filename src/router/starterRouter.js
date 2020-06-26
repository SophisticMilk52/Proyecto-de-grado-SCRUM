import Vue from 'vue';
import Router from 'vue-router';
import DashboardLayout from '../layout/starter/SampleLayout.vue';
import Starter from '../layout/starter/SamplePage.vue';
import Historias from '../layout/starter/Historias.vue';
import ProcesoSrcum from '../layout/starter/ProcesoSrcum.vue';
import Historia from '../layout/starter/Historia.vue';
import Estimacion from '../layout/starter/Estimacion.vue';
import Cronometro from '../layout/starter/Cronometro.vue';
import Instructor from '../layout/starter/Instructor.vue';
import Grupo from '../layout/starter/Grupo.vue';
import Resultados from '../layout/starter/Resultados.vue';
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
          path: 'juegos/:id',
          name: 'Estimacion',
          components: { default: Historias }
        }
        ,
        {
          path: 'juegos/:id/stories/:id2',
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
          path: 'cronometro/:id',
          name: 'Estimacion',
          components: { default: Cronometro }
        },
        {
          path: 'instructor',
          name: 'Instructor',
          components: { default: Instructor }
        },
        {
          path: 'grupo',
          name: 'Estimacion',
          components: { default: Grupo }
        },
        {
          path: 'resultados',
          name: 'Estimacion',
          components: { default: Resultados }
        }

      ]
    }
  ]
});
