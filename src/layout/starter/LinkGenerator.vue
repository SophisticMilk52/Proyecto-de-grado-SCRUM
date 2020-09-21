<template>

<div>
    <h1><strong>Se han generado links para cada grupo</strong></h1>
    <ul>
        <li :key="g.id" v-for="g in groups"><h3> <a :href="'http://localhost:8080/#/juegos/70/group/' + g.id + '/login/' + g.qrPassword" >http://localhost:8080/#/juegos/70/group/{{g.id}}/login/{{g.qrPassword}} </a></h3></li>
    </ul>
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

<style>
</style>