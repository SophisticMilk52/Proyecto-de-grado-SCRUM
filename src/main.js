import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import Home from './components/Home';
import Historia from './components/Historia';
import Estimacion from './components/Estimacion';
import VueRouter from 'vue-router';
import Historias from './components/Historias'
import Cronometro from './components/Cronometro'
const routes = [
  { path: "/juegos", component: Home },
  { path: "/juegos/historias/historia", component: Historia },
  { path: "/juegos/historias/historia/estimation", component: Estimacion },
  { path: "/juegos/historias", component: Historias },
  { path: "/cronometro", component: Cronometro },
]

const router = new VueRouter({ routes });

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(BootstrapVue)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
