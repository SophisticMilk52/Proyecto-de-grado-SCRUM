<template>
  <div id="app">
    <Historia/>
  <!--Aqui va el html de la primera vista-->
    <h1>Modulo de estimacion</h1>
        <router-link to="/juegos">Home</router-link>
    <h3> <router-link to="/cronometro">Cronometro: 00:20:00</router-link></h3>
    <router-view/>
  </div>
</template>

<script>
// import Historia from './components/Historia.vue'


export default {
  name: 'App',
  components: {}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
    background-color: aquamarine;

}
ul{
  list-style-type: none;
}
h1{
  margin: 0;
}
</style>
