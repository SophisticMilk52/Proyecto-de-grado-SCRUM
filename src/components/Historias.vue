<template>
  <div class="hello">
<div class="hello2">
  <br>
  <h1>
      Historias
  </h1>
  <br>
  <br>
  <br>
  <br>
  <table>
    <tr><router-link to="/story"><h3>Historia del aeropuerto</h3></router-link></tr>
    <tr><router-link to="/story"><h3>Historia de usuario del concierto de rock</h3></router-link></tr>
    <tr><router-link to="/story"><h3>Historia de mi vida en PDG </h3></router-link></tr>
  </table>
  
  </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      info: "Valorcito"
    };
  },
  name: "Historia",
  props: {
    msg: String
  },
  methods: {
    dividirgrupos(){

    }
  },
  mounted() {
    axios
      .get("http://pi2sis.icesi.edu.co/scrum/api/games/70/groups/")
      .then(response => {
        console.log(response);
        this.info = response.data;
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  padding-bottom: 4cm;
  background-color:aquamarine;

}
.hello2{
  padding-bottom: 4cm;
  background-color:orangered;
  opacity: 0.8;
  border-radius: 5%;
  margin-right:100px ;
  margin-left:100px ;
}
h3{
  float: left;
  color: black;
  margin-left:20px;
}
tr{
  padding-right:10cm;
}
h1{
  color: black;
  font:bold;
  float: left;
  margin-left: 20px;
}

</style>
