import Vue from 'vue';
import Router from 'vue-router';
import DashboardLayout from '../layout/starter/SampleLayout.vue';
import Starter from '../layout/starter/SamplePage.vue';
import Historias from '../layout/starter/Historias.vue';
import ProcesoSrcum from '../layout/starter/Retrospective/ProcesoSrcum.vue';
import Editar from '../layout/starter/Retrospective/Editar.vue';
import ResultadosSprint from '../layout/starter/Retrospective/ResultadosSprint.vue';
import Detalles from '../layout/starter/Retrospective/Detalles.vue';
import Estimacion from '../layout/starter/Estimacion.vue';
import Cronometro from '../layout/starter/Cronometro.vue';
import Grupo from '../layout/starter/Grupo.vue';
import Resultados from '../layout/starter/Resultados.vue';
import LinkGenerator from '../layout/starter/LinkGenerator.vue';
import LoginGuest from '../layout/starter/LoginGuest.vue';
import Message from '../layout/starter/Message.vue';
import Games from '../layout/starter/Games.vue';
import Stories from '../layout/starter/Stories.vue';
import Estimation from '../layout/starter/Estimation/Estimation.vue';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/mod/games/',
      component: DashboardLayout,
      children: [
        {
          path: 'juegos',
          name: 'Juegos',
          components: { default: Starter }
        },
        {
          path: 'proceso',
          name: 'Retrospectiva',
          components: { default: ProcesoSrcum }
        }
        , {
          path: 'proceso/edit',
          name: 'Retrospectiva',
          components: { default: Editar }
        },
        , {
          path: 'proceso/resultados',
          name: 'Retrospectiva',
          components: { default: ResultadosSprint }
        },
        , {
          path: 'proceso/detalles',
          name: 'Retrospectiva',
          components: { default: Detalles }
        },
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
          // path: 'foo',
          path: 'mod/games',
          name: 'foo',
          component: Games
        },
        {
          path: 'foo/bar',
          name: 'bar',
          components: { default: Grupo }
        },
        {
          path: 'mod/games/:id',
          name: 'ModStories',
          component: Stories
        },
        {
          path: 'est/games/:gameId/stories/:storyId',
          name: 'Estimationaire',
          component: Estimation
        },



      ]
    }
  ]
});
