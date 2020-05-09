<template>
  <div class="hello">
    <div class="hello2">
  <!-- <ul> -->
    <!---Alvaro aqui dejo en pantalla lo que saque de json pero el codigo de la llamda es el de abajo el de axios---->
    <!-- <li v-for="(value,index) in info" :key="index"> -->
      <!-- {{value}} -->
    <!-- </li> -->
  <!-- </ul> -->
  <br>
  <div >
    <div class="auxuno">
       <h2 class="numero">Historia de usuario #1: Aeropuerto</h2>

              <router-link to="/juegos/historias/historia" ><b-button class="siguiente">Siguiente Historia</b-button></router-link>
       </div>
 <br>
       <h2>Descripcion:</h2>
    
      
        <p>
      Se espera que se entregue un aeropuerto con las edificaciones y vehiculos necesarios para su operación.
      Hay que tener en cuenta la estructura del diseño y los materiales entregados previamente.
    </p>
  
    <div class="auxdos">
    
   </div>
      <br>
  </div>
  <div>
 
    <h3>
      Criterios de Aceptación:
    </h3>
    <br>

    <ul>
      <li>No debe haber huecos de espacio en el aeropuerto.</li>
      <li>La pista debe ser lo suficientemente grande para que un avion grande pueda movilizarse dentro de ella, sin trabarse con otras estructuras.</li>
      
    </ul>
    <div>
        <br>
        

    <router-link to="/juegos/historias/historia/estimation"><b-button>Realizar estimación</b-button></router-link>
    </div>
  </div>
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
ul{
    margin-left: 5cm;
    margin-right: 5cm;
}
p{
  color: black;
     margin-left: 5cm;
    margin-right: 5cm;
}
li{
     margin-left: 5cm;
    margin-right: 5cm;
      font-size: 15px;
      
    color: black;
}
.hello2{
  padding-bottom: 2.0cm;
  background-color:orangered;
  opacity: 0.8;
  border-radius: 5%;
  margin-right:100px ;
  margin-left:100px ;
}
.hello{
  padding-bottom: 2.0cm;
  background-color:aquamarine;

}
h3{
  float: left;
  color: black;
  margin-left:20px;
}
tr{
  padding-right:10cm;
}
h1,h2{
  color: black;
  font:bold;
  float: left;
  margin-left: 20px;
}
p{
  font-size: 15px;
  color: black;

}
</style>
