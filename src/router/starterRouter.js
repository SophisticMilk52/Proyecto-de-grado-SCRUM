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
import LinkGenerator from '../layout/starter/LinkGenerator.vue';
import LoginGuest from '../layout/starter/LoginGuest.vue';
import Message from '../layout/starter/Message.vue';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/juegos',
      component: DashboardLayout,
      children: [
        {
          path: 'juegos',
          name: 'Juegos',
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
          name: 'Historias',
          components: { default: Historias }
        }
        ,
        {
          path: 'juegos/:id/links',
          name: 'Enlaces',
          components: { default: LinkGenerator }
        }
        ,
        {
          path: 'juegos/:id/stories/:id2',
          name: 'Historia',
          components: { default: Historia }
        }
        ,
        {
          path: 'juegos/:gameId/group/:groupId/login/:pass',
          name: 'Ingreso Participante',
          components: { default: LoginGuest }
        }
        ,
        {
          path: 'juegos/:gameId/stories/:storyId/estimation',
          name: 'Estimacion',
          components: { default: Estimacion }
        },
        {
          path: 'cronometro/:id',
          name: 'Cronometro',
          components: { default: Cronometro }
        },
        {
          path: 'instructor',
          name: 'Instructor',
          components: { default: Instructor }
        },
        {
          path: 'grupo',
          name: 'Grupo',
          components: { default: Grupo }
        },
        {
          path: 'juegos/:gameId/stories/:storyId/results',
          name: 'GroupEstimation',
          components: { default: Resultados }
        },
        {
          path: 'msg',
          name: 'Messaging',
          components: { default: Message }
        },
        {
          path: 'foo',
          name: 'bar',
        },


      ]
    }
  ]
});
