<template>
<div>
  <base-button class="btn" type="secondary" @click='refresh'>Refresh</base-button>
  <h1 class="text-center"><strong>Participantes</strong></h1>
    <table class="table">
      <thead class="table-head">
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Contraseña</th>
          <th>Grupo</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="p.id" v-for="p in participants">
          <td>{{p.name}}</td>
          <td>{{p.email}}</td>
          <td>{{p.password}}</td>
          <td>{{p.tsscGroup.id}}</td>
        </tr>
      </tbody>
    </table>
</div>

</template>

<script>
import axios from '../plugins/axios'
export default {
  props: {
    gameId: {
      type: String
    }
  },
  created(){
    this.refresh();
  },
  mounted(){
  },
  data(){
    return {
      participants: []
    }
  },
  methods: {
    refresh(){
      axios
      // .get("/games/" + this.$route.params.id + "/participants/")
      .get("/games/" + this.gameId + "/participants/")
      .then(res => {
          console.log(res.data);
          this.participants = res.data;
      });
    }
  }
}
</script>

<style>

</style>
