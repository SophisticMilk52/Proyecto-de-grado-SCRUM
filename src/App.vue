<template>
  <div id="app">
    <Historia/>
  <!--Aqui va el html de la primera vista-->

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
