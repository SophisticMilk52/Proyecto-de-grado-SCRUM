<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Historia msg="Welcome to Your Vue.js App"/>
    <router-link to="Estimacion">estimar</router-link>
    <router-view/>
  </div>
</template>

<script>
import Historia from './components/Historia.vue'


export default {
  name: 'App',
  components: {
    Historia
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
