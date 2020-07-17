<template>
  <div class="hello">
    <!-- <ul> -->
    <!---Alvaro aqui dejo en pantalla lo que saque de json pero el codigo de la llamda es el de abajo el de axios---->
    <!-- <li v-for="(value,index) in info" :key="index"> -->
    <!-- {{value}} -->
    <!-- </li> -->
    <!-- </ul> -->
    <br />
    <h2 class="text-center">Historia de usuario: {{this.story.shortDescription}}</h2>

    <div class="elementos">
      <br />
      <h2>Descripcion:</h2>
      <p>{{this.story.description}}</p>
      <br />

      <h2>Criterios de Aceptación:</h2>
      <ul>
        <li :key="c.id" v-for="c in criteria">{{c.description}}</li>
      </ul>
      <br />
    </div>
    <br />
    <div class="text-center">
      <router-link to="/estimation">
        <base-button type="success" class="confirmation" v-on:click="estimate">Realizar estimacion</base-button>
      </router-link>
    </div>
  </div>
</template>

<script>
var elems = document.getElementsByClassName('confirmation');
    var confirmIt = function (e) {
        if (!confirm('Are you sure?')) e.preventDefault();
    };
    for (var i = 0, l = elems.length; i < l; i++) {
        elems[i].addEventListener('click', confirmIt, false);
    }




import axios from "../../plugins/axios";
export default {
  name: "starter-page",
  data() {
    return {
      // historia: null,
      // idJuego: this.$route.params.id,
      // idHistoria: this.$route.params.id2,
      // nombre: this.$props.name,
      // descripcion: this.$props.descripcion
      story: {},
      criteria: []
    };
  },
  created() {
    let route = "/games/"+this.$route.params.id+"/stories/"+this.$route.params.id2
    axios.get("/games/"+this.$route.params.id+"/stories/"+this.$route.params.id2)
    .then(res => {
      this.story = res.data;
    })
    axios.get(route+"/accriteria/")
    .then(res => {
      console.log(res.data)
      this.criteria = res.data;
      console.log(this.criteria)
    })
    
    
    // axios
    //   .get(
    //     "/games/" +
    //       this.idJuego +
    //       "/stories/" +
    //       this.idHistoria +
    //       "/accriteria/"
    //   )
    //   .then(res => {
    //     this.historia = res.data;
    //   });
  },
  methods: {
    estimate(e){
      if(!confirm('Al empezar a estimar, todos los participantes seran redirigidos a la pagina de estimación. ¿Desea continuar?'))
        e.preventDefault();
      
    }
  }
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