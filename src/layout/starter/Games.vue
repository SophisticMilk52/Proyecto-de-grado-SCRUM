<template>
  <div>
    <h1 class="text-center"><strong>Juegos</strong></h1>
    <table class="table">
      <thead class="table-head">
        <tr>
          <th>Titulo</th>
          <th>No. de Grupos</th>
          <th>Historias</th>
          <th>Enlaces</th>
          <th>Participantes</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="g.id" v-for="g in games">
          <td>{{g.name}}</td>
          <td>{{g.ngroups}}</td>
          <td><base-button class="btn" type="primary" @click='$router.push({name: "ModStories", params: {id: g.id}})'>Visualizar</base-button></td>
          <td><base-button class="btn" type="primary" @click='$router.push({name: "Enlaces", params: {id: g.id}})'>Visualizar</base-button></td>
          <td><base-button class="btn" type="primary" @click='console.log("btn 3 pressed")'>Visualizar</base-button></td>
        </tr>
      </tbody>
    </table>


  </div>
</template>

<script>
import axios from '../../plugins/axios'
export default {
  created(){
    console.log("Component has been created")
  },
  mounted(){
    axios.get('/games/').then(res => {
      this.games = res.data
    })
  },
  methods: {

  },
  data(){
    return {
      games: []
    }
  }

}
</script>

<style scoped>
.table {
  font-size: 2em;
}
.table-head{
  font-size: 3em;
}

</style>
