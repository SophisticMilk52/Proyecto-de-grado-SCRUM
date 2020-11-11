<template>

<div>
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
          <td>{{LOCAL_URL}}games/{{gameId}}/groups/{{g.id}}/login/{{g.qrPassword}}</td>
          <!-- <td>{{REMOTE_URL}}games/{{gameId}}/groups/{{g.id}}/login/{{g.qrPassword}}</td> -->
        </tr>
      </tbody>
    </table>
</div>


</template>

<script>
import axios from "../plugins/axios";

export default {
  props: {
    gameId: {
      type: String
    },
    groups: {
      type: Array
    }
  },
  data() {
    return {
      LOCAL_URL: "http://localhost:8080/agile-tool/#/",
      REMOTE_URL: "https://pi2sis.icesi.edu.co/agile-tool/#/",
      // groups: []
    };
  },
  created() {
  //   axios
  //   // .get("/games/" + this.$route.params.id + "/groups/")
  //   .get("/games/" + this.gameId + "/groups/")
  //   .then(res => {
  //       console.log(res.data);
  //       this.groups = res.data;
  //     });
  }
};
</script>

<style scoped>
.table{
  font-size: 2em  ;
}
</style>
