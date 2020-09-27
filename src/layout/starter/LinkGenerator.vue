<template>

<div>
    <base-button class="btn" type="secondary" @click='$router.go(-1)'>Atras</base-button>
    <h1 class="text-center"><strong>Enlaces</strong></h1>
    <table class="table">
      <thead>
        <tr class="table-head">
          <th>Grupo</th>
          <th>Enlace</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="g.id" v-for="g in groups">
          <td>{{g.id}}</td>
          <td>http://localhost:8080/#/juegos/70/group/{{g.id}}/login/{{g.qrPassword}}</td>
        </tr>
      </tbody>
    </table>
</div>


</template>

<script>
import axios from "../../plugins/axios";

export default {
  data() {
    return {
      groups: []
    };
  },
  created() {
    axios
    .get("/games/" + this.$route.params.id + "/groups/")
    .then(res => {
        console.log(res.data);
        this.groups = res.data;
      });

  }
};
</script>

<style scoped>
.table{
  font-size: 2em  ;
}
</style>
