import Vue from 'vue';
import Router from 'vue-router';
import DashboardLayout from '../layout/starter/SampleLayout.vue';
import ModeratorView from '../views-tssc/ModeratorView';
import BacklogView from '../views-tssc/BacklogView';
import EstimationView from '../views-tssc/EstimationView';
import ReestimationView from '../views-tssc/ReestimationView';
import GroupEstimationView from '../views-tssc/GroupEstimationView';
import SprintBacklogView from '../views-tssc/SprintBacklogView';
import RetrospectiveView from '../views-tssc/RetrospectiveView';
import LoginView from '../views-tssc/LoginView';
import UnauthView from '../views-tssc/UnauthView';
import Starter from '../layout/starter/SamplePage.vue';
import Historias from '../layout/starter/Historias.vue';
import ProcesoSrcum from '../layout/starter/modulo2/ProcesoSrcum.vue';
import Comportamiento from '../layout/starter/modulo2/Comportamiento.vue';
import Temporizador from '../layout/starter/modulo2/Temporizador.vue';
import Detalles from '../layout/starter/modulo2/Detalles.vue';
import Estimacion from '../layout/starter/Estimacion.vue';
import Cronometro from '../layout/starter/Cronometro.vue';
import Grupo from '../layout/starter/Grupo.vue';
// import Resultados from '../layout/starter/Resultados.vue';
import Message from '../layout/starter/Message.vue';
import Games from '../layout/starter/Games.vue';
import Estimation from '../layout/starter/Estimation/Estimation.vue';
import store from '../plugins/store';
Vue.use(Router);

let router = new Router({
  base: "agile-tool",
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/games',
      component: DashboardLayout,
      children: [
        {
          path: 'games/:gameId/groups/:groupId/login/:pwd',
          name: 'Ingreso Participante',
          components: { default: LoginView }
        },
        {
          // TODO Delete or replace with Home View.
          path: 'games',
          name: 'Juegos',
          components: { default: Starter }
        },
        {
          path: 'games/:gameId/moderator/:modPwd',
          name: 'Moderator View',
          component: ModeratorView
        },
        {
          path: 'unauth',
          name: 'Not Logged In',
          component: UnauthView
        },
        {
          // path: 'games/:id/groups/:id2/backlog',
          path: 'games/:gameId/groups/:groupId/backlog',
          name: 'Backlog',
          components: { default: BacklogView },
          meta: {
            requiresAuth: true
          }
        },
        {
          // path: 'games/:id/groups/:id2/backlog',
          path: 'games/:gameId/groups/:groupId/sprint/new',
          name: 'Sprint Backlog',
          components: { default: SprintBacklogView },
          meta: {
            requiresAuth: true
          }
        },
        {
          // path: 'games/:id/groups/:id2/backlog',
          path: 'games/:gameId/groups/:groupId/sprint/:sprintId',
          name: 'Retrospective',
          components: { default: RetrospectiveView },
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'games/:gameId/groups/:groupId/stories/:storyId/estimations/add',
          name: 'Estimation',
          components: { default: EstimationView },
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'games/:gameId/groups/:groupId/stories/:storyId/estimations/:estimationId',
          name: 'Reestimation',
          components: { default: ReestimationView },
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'games/:gameId/stories/:storyId/estimations',
          name: 'GroupEstimation',
          components: { default: GroupEstimationView },
          meta: {
            requiresAuth: true
          }
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
          path: 'est/games/:gameId/stories/:storyId',
          name: 'Estimationaire',
          component: Estimation
        },





      ]
    },
    // {
    //   path: 'games/:gameId/moderator/:modPwd',
    //   name: 'Moderator View',
    //   component: ModeratorView
    // },
  ]

})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(store.getters.isLoggedIn){
      next()
      return
    }
    next("/unauth")
  } else {
    next()
  }
})

export default router;
