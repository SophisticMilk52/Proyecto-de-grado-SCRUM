<template>
  <div class="hello">
    <div class="hello2">
      <br />
      <div class="story-information">
        <h1 class="text-center">{{this.story.shortDescription}}</h1>
        <h2>Descripcion:</h2>
        <p>{{this.story.description}}</p>
        <br />
        <h2>Criterios de Aceptación:</h2>
        <ul>
          <li :key="c.id" v-for="c in criteria">{{c.description}}</li>
        </ul>
        <br />
      </div>
      <h3
        class="text-center"
      >Seleccione la cantidad de esfuerzo necesaria para realizar la historia de usuario</h3>
      <div class="elementos container">
        <div class="row">
          <div class="col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 my-btn" :key="b" v-for="b in buttons">
            <base-button class="animation-on-hover" type="info" @click="change(b)">{{b}}</base-button>
          </div>
        </div>
      </div>
      <div class="estimation">
        <h1 value class="valor">{{data}}</h1>
      </div>
      <form @submit.prevent class="elementos">
          <base-input label="Criterios de Aceptacion">
            <textarea class="form-control" v-model="criteriaComment" id="acceptanceCriteria" rows="3" placeholder="Escriba criterios de aceptación no cubiertos en la historia a su parecer (opcional)."></textarea>
          </base-input>
          <base-input label="Tareas">
            <textarea class="form-control" v-model="taskComment" id="tasks" rows="3" placeholder="Escriba las tareas que usted considera son necesarias para completar esta historia."></textarea>
          </base-input>
      </form>
      <div class="final">
        <h4>¿Desea guardar esta estimación?</h4>
        <router-link to="/story">
          <base-button class="animation-on-hover" type="success">Cancelar</base-button>
        </router-link>
        <base-button type="success" class="button" v-bind:disabled="dis" value @click="sendEstimation">
          <!-- <router-link to="/grupo">Confirmar</router-link> -->
          Confirmar
        </base-button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "../../plugins/axios";
export default {
  created() {
    let route =
      "/games/" +
      this.$route.params.gameId +
      "/stories/" +
      this.$route.params.storyId;
    axios
      .get(
        "/games/" +
          this.$route.params.gameId +
          "/stories/" +
          this.$route.params.storyId
      )
      .then(res => {
        this.story = res.data;
      });
    axios.get(route + "/accriteria/").then(res => {
      console.log(res.data);
      this.criteria = res.data;
      console.log(this.criteria);
    });
  },
  data() {
    return {
      buttons: [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, "Inf."],
      data: "",
      minLen: 12,
      dis: true,
      story: {},
      criteria: [],
      criteriaComment: "abc",
      taskComment: "def"
    };
  },
  methods: {
    change: function(value) {
      var button = document.getElementsByClassName("Button");

        var sts = value.toString();
        this.data = sts;
        this.dis = false;

    },
    sendEstimation(){
      let estimation = {
        stvalue: this.data,
        participantId: this.$store.state.currentUser.id.toString(),
        acepcrit: this.criteriaComment,
        task: this.taskComment
      }
      estimation.task = this.taskComment
      estimation.acepcrit = this.criteriaComment
      console.log(estimation)
      let route = "/games/" + this.$route.params.gameId
      + "/groups/" + this.$store.state.currentUser.tsscGroup.id
      + "/stories/" + this.$route.params.storyId
      + "/estimations/"
      axios.post(route, estimation).then(
        console.log("Post Request Complete")
      )



    }
  }
};
</script>

<style scooped>
h1 {
  size: 50cm;
}

.final {
  margin-left: 9.5cm;
}
.tabla {
  margin-left: 8cm;
}
.estimation {
  margin-left: 3cm;
}
.td-pass {
  text-align: center;
}
.valor {
  text-align: center;
  margin-right: 3.5cm;
  font-size: 75px;
}
.my-btn {
  text-align: center;
}
</style>
