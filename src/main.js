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

const routes = [
  { path: "/", component: Home },
  { path: "/story", component: Historia },
  { path: "/story/estimation", component: Estimacion }
]

const router = new VueRouter({ routes });

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(BootstrapVue)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
