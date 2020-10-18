import Vue from 'vue';
import Router from 'vue-router';
import DashboardLayout from '../layout/starter/SampleLayout.vue';
import Starter from '../layout/starter/SamplePage.vue';
import Historias from '../layout/starter/Historias.vue';
import ProcesoSrcum from '../layout/starter/modulo2/ProcesoSrcum.vue';
import Comportamiento from '../layout/starter/modulo2/Comportamiento.vue';
import Temporizador from '../layout/starter/modulo2/Temporizador.vue';
import Detalles from '../layout/starter/modulo2/Detalles.vue';
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
import Participants from '../layout/starter/Participants.vue';
import GameModerator from '../layout/starter/GameModerator.vue';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/games',
      component: DashboardLayout,
      children: [
        {
          path: 'games',
          name: 'Juegos',
          components: { default: Starter }
        },
        {
          path: 'proceso',
          name: 'Retrospectiva',
          components: { default: ProcesoSrcum }
        }
        , {
          path: 'proceso/comportamiento',
          name: 'Retrospectiva',
          components: { default: Comportamiento }
        },
        , {
          path: 'proceso/comportamiento/temporizador',
          name: 'Retrospectiva',
          components: { default: Temporizador }
        },
        , {
          path: 'proceso/detalles',
          name: 'Retrospectiva',
          components: { default: Detalles }
        },
        {
          path: 'games/:id',
          name: 'Historias',
          components: { default: Historias }
        }
        ,
        {
          path: 'games/:id/links',
          name: 'Enlaces',
          components: { default: LinkGenerator }
        }
        ,

        {
          path: 'games/:gameId/group/:groupId/login/:pass',
          name: 'Ingreso Participante',
          components: { default: LoginGuest }
        }
        ,
        {
          path: 'games/:gameId/stories/:storyId/estimation',
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
          path: 'games/:gameId/stories/:storyId/results',
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
          path: 'mod/games/:id/participants',
          name: 'Participantes',
          component: Participants
        },
        {
          path: 'est/games/:gameId/stories/:storyId',
          name: 'Estimationaire',
          component: Estimation
        },
        {
          path: 'games/:gameId/moderator/:modPwd',
          name: 'Game Moderator',
          component: GameModerator
        },




      ]
    }
  ]
});
