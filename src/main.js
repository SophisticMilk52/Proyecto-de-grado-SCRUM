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
const routes = [
  { path: "/", component: Home },
  { path: "/story", component: Historia },
  { path: "/story/estimation", component: Estimacion },
  { path: "/story/stories", component: Historias }
]

const router = new VueRouter({ routes });

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(BootstrapVue)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
