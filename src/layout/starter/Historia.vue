<template>
  <div class="hello">
    <!-- <ul> -->
    <!---Alvaro aqui dejo en pantalla lo que saque de json pero el codigo de la llamda es el de abajo el de axios---->
    <!-- <li v-for="(value,index) in info" :key="index"> -->
    <!-- {{value}} -->
    <!-- </li> -->
    <!-- </ul> -->
    <br />

    <h2 class="text-center" :key="hist.id" v-for="hist in historia">Historia de usuario:{{this.name}}</h2>

    <div class="elementos">
      <br />
      <h2>Descripcion:</h2>
      <p>{{this.descripcion}}</p>
      <br />

      <h2>Criterios de Aceptación:</h2>
      <ul>
        <li :key="hist.id" v-for="hist in historia">{{hist.description}}</li>
      </ul>
      <br />
    </div>
    <br />
    <div class="text-center">
<<<<<<< HEAD
    <!-- <router-link to="/story">
      <base-button type="success">Siguiente Historia</base-button>
    </router-link> -->
=======
      <router-link to="/story">
        <base-button type="success">Siguiente Historia</base-button>
      </router-link>
>>>>>>> 09d18d13114f16ea13da1fce0ac686eea9135369

      <router-link to="/estimation">
        <base-button type="success">Realizar estimacion</base-button>
      </router-link>
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
export default {
  
=======
import axios from "../../plugins/axios";
export default {
  name: "starter-page",
  data() {
    return {
      historia: [],
      idJuego: this.$route.params.id,
      idHistoria: this.$route.params.id2,
      nombre: this.$props.name,
      descripcion: this.$props.descripcion
    };
  },
  created() {
    axios
      .get(
        "/games/" +
          this.idJuego +
          "/stories/" +
          this.idHistoria +
          "/accriteria/"
      )
      .then(res => {
        this.historia = res.data;
      });
  }
>>>>>>> 09d18d13114f16ea13da1fce0ac686eea9135369
};
</script>

<style>
.elementos {
  background-color: white;
  border-radius: 25px;
}
h2,
p {
  margin-left: 20px;
}
</style>