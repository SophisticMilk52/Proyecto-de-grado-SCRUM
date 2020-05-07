<template>
  <div class="hello">
    
  <!-- <ul> -->
    <!---Alvaro aqui dejo en pantalla lo que saque de json pero el codigo de la llamda es el de abajo el de axios---->
    <!-- <li v-for="(value,index) in info" :key="index"> -->
      <!-- {{value}} -->
    <!-- </li> -->
  <!-- </ul> -->
  <div >
    <div class="auxuno">
       <h2>Historia de usuario #1: Aeropuerto</h2>
      <br>
      <br>
      <br>
       <h2>Descripcion:</h2>
    <br>
          <p>
      Se espera que se entregue un aeropuerto con las edificaciones y vehiculos necesarios para su operación.
    </p>
    </div>
    <div class="auxdos">
        <router-link to="/story" ><button>Siguiente Historia</button></router-link>
   </div>
      <br>
  </div>
  <div>
 
    <h3>
      Criterios de Aceptación:
    </h3>
    <ul>
      <lo>No debe haber huecos de espacio en el aeropuerto.</lo>
      <lo>La pista debe ser lo suficientemente grande para que un avion grande pueda movilizarse dentro de ella, sin trabarse con otras estructuras.</lo>
      
    </ul>
    <div>
    <router-link to="/story/instruccion"><button>Instruccion</button></router-link>
    <router-link to="/story/estimation"><button>Realizar estimación</button></router-link>
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
body {
    font-family: Arial, Helvetica, sans-serif;
    min-width: 1200px;
}

.areas {
    display: flex;
    width: 100%;
}

.header {
    background-color: #9E9E9E;
    display: flex;
    align-items: center;
    justify-content: center;
}

.letter-footer {
    color: white;
    font-size: 15px;
    vertical-align: middle;
    white-space: nowrap;
}

.footer {
    background-color: #9E9E9E;
    height: 60px;
}

.section-titulo {
    position: relative;
    display: flex;
    min-width: 800px;
    width: 100%;
    height: 250px;
    padding: 30px;
    /* border: 1px solid black; */
    /* width: 70px; */
    /* overflow: hidden; */
}

.foto-perfil {
    /* position: relative; */
    /* left: 200px; */
    margin-left: 20%;
    width: 300px;
    height: 250px;
}

@supports(object-fit: cover) {
    .foto-perfil img {
        clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
        height: 100%;
        object-fit: cover;
        object-position: center center;
    }
}

.principal {
    /* position: absolute; */
    /* margin-left: 35%; */
    /* align: justify-content; */
    white-space: nowrap;
}
.titulo-puesto {
    margin-left: 30%;
    /* position: absolute; */
    /* margin-top: 6%; */
    /* margin-left: 35%; */
}

h1 {
    color: #00d9fffd;
    text-decoration: underline;
    text-decoration-color: #9E9E9E;
    font-size: 50px;
    float: left;
}

h1.apellido {
    color: #3e4041fd;
}

h2 {
    color: #8A8A8C;
}

section {
    padding: 30px;
}

.section-one {
    margin-left: 100px;
}

.section-two {
    margin-left: -100px;
}


.division {
    display: flex;
    width: 100%;

}

.interative {
    position: absolute;
    padding: 20px;
    margin-left: 200px;
    white-space: nowrap;
}

h3 {
    position: relative;
    vertical-align: text-top;
    top: -10px;
    left: 5px;
}

button {
    background-color: #4BA2BD;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-family: Arial;
    font-size: 14px;
    padding: 15px 15px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #2f6627;
}

button.hover {
    background-color: #5cbf2a;
}

button.active {
    position: relative;
    top: 1px;
}

.titulo-areas {
    width: 400px;
    display: flex;
    color: #4BA2BD;
    border-bottom: 5px solid #9E9E9E;
    margin-bottom: 30px;
}

.empresa {
    position: relative;
    display: flex;
    width: 70%;
}

.timeline-empresa {
    width: 200px;
    margin-left: 5px;
    border-right: 3px solid #9E9E9E;
}

.descripcion-empresa {
    width: 100%;
    margin-left: 50px;
}

.texto-adicional {
    width: 70%;
}

h4 {
    color: #4BA2BD;
}

h4.letter {
    color: #9E9E9E;
}

h4.titulo {
    font-style: oblique;
    color: #9E9E9E;
}

.modal {
    display: none;
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
}

.close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}

p {
    padding: 20px;
}
</style>
