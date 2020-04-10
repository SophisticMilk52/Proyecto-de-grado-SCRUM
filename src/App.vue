<template>
  <div id="app">
    <Historia/>
  <!--Aqui va el html de la primera vista-->
    <h1>Practica para aprender Scrum</h1>
    
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/story">Historia</router-link>
      </li>
      <li>
        <router-link to="/story/estimation">Estimacion</router-link>
      </li>
    </ul>
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
  margin-top: 60px;
}
ul{
  list-style-type: none;
}
</style>
