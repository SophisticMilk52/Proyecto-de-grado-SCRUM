<template>
  <div class="hello">
  <!-- <ul> -->
    <!---Alvaro aqui dejo en pantalla lo que saque de json pero el codigo de la llamda es el de abajo el de axios---->
    <!-- <li v-for="(value,index) in info" :key="index"> -->
      <!-- {{value}} -->
    <!-- </li> -->
  <!-- </ul> -->
  <div>
    <img src="../assets/story-image.jpeg" width="300px"/>
    <h2>Historia de usuario #1: Aeropuerto</h2>
  </div>
  <div>
    <p>
      Se espera que se entregue un aeropuerto con las edificaciones y vehiculos necesarios para su operación.
    </p>
    <h3>
      Criterios de Aceptación:
    </h3>
    <ul>
      <li>No debe haber huecos de espacio en el aeropuerto.</li>
      <li>La pista debe ser lo suficientemente grande para que un avion grande pueda movilizarse dentro de ella, sin trabarse con otras estructuras.</li>
      <li></li>
    </ul>
    <h3><router-link to="/story/estimation">Realizar estimación</router-link></h3>
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none ;
  padding: 0;
}
li {
  /* display: inline-block; */
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
