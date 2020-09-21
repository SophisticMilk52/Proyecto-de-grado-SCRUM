<template>
  <div class="hello">
    <div class="hello2">
      <br />
      <div class="story-information">
        <div>
          <h1 class="text-center">
            <strong>{{this.story.shortDescription}}</strong>
          </h1>
        </div>
        <h2>Descripción:</h2>
        <h4>{{this.story.description}}</h4>
        <br />
        <h2>Criterios de Aceptación:</h2>
        <ul>
          <li :key="c.id" v-for="c in criteria">
            <h4>{{c.description}}</h4>
          </li>
        </ul>
        <br />
      </div>
      <h3
        class="text-center"
      >Seleccione la cantidad de esfuerzo necesaria para realizar la historia de usuario</h3>
      <div class="elementos container">
        <div class="row">
          <div
            class="col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 my-btn"
            :key="b"
            v-for="b in buttons"
          >
            <base-button class="animation-on-hover" type="info" @click="change(b)">{{b}}</base-button>
          </div>
        </div>
      </div>
      <div class="estimation">
        <h1 value class="valor">{{data}}</h1>
      </div>
      <form @submit.prevent>
        <!-- <div id="crit"></div>
          <base-button native-type="submit" @click="addCrit()" type="primary">+</base-button>

          <base-input
                class="col"
                label="Nombre"
                type="text"
                placeholder="Ingrese el nombre con el que desea ser reconocido."
        ></base-input>-->
        <div class="elementos">
       
             <h3 >Criterios de Aceptacion</h3>
          <base-input>
            <textarea
              class="form-control"
              v-model="criteriaComment"
              id="acceptanceCriteria"
              rows="3"
              placeholder="Escriba criterios de aceptación no cubiertos en la historia. Separar con enter."
            ></textarea>
          </base-input>
          </div>
      
        <div class="elementos">
        
           <h3>Tareas</h3>
          <base-input>
           
            <textarea
              class="form-control"
              v-model="taskComment"
              id="tasks"
              rows="3"
              placeholder="Escriba las tareas que usted considera son necesarias para completar esta historia."
            ></textarea>
          </base-input>
       
        </div>
      </form>
      <div class="final">
        <h4>¿Desea guardar esta estimación?</h4>
        <router-link to="/story">
          <base-button class="animation-on-hover" type="success">Cancelar</base-button>
        </router-link>
        <base-button
          type="success"
          class="button"
          v-bind:disabled="dis"
          value
          @click="sendEstimation"
        >
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
      .then((res) => {
        this.story = res.data;
      });
    axios.get(route + "/accriteria/").then((res) => {
      console.log(res.data);
      this.criteria = res.data;
      console.log(this.criteria);
    });
    if (this.$props.myScore != undefined) {
      change(this.$props.myScore);
    }
    if (
      this.$props.myCriteria != undefined &&
      this.$props.myCriteria.length > 0
    ) {
      let e = "";
      this.$props.myCriteria.forEach((c) => {
        e += c + "\n";
      });
      e.substr(0, e.length - 1);
      this.criteriaComment = e;
    }
    if (this.$props.myTasks != undefined && this.$props.myTasks.length > 0) {
      let e = "";
      this.$props.myTasks.forEach((c) => {
        e += c + "\n";
      });
      e.substr(0, e.length - 1);
      this.taskComment = e;
    }
  },
  data() {
    return {
      buttons: [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, "Inf."],
      data: "",
      minLen: 12,
      dis: true,
      story: {},
      criteria: [],
      criteriaComment: "",
      taskComment: "",
    };
  },

  props: {
    myScore: { type: String },
    myCriteria: { type: Array },
    myTasks: { type: Array },
  },

  methods: {
    consolePrint() {
      let allCriteria = this.criteriaComment.split("\n");
      let allTasks = this.taskComment.split("\n");
      if (this.criteriaComment.length == 0) {
        allCriteria = null;
      }
      if (this.taskComment.length == 0) {
        allTasks = null;
      }
      console.log(allCriteria);
      console.log(allTasks);
    },
    addCrit() {
      console.log("SHIT");
      $("#crit").append(
        `<base-input label="Criterios de Aceptacion">
            <textarea class="form-control" id="MAYDAY" rows="3"></textarea>
          </base-input>`
      );
    },
    change: function (value) {
      var button = document.getElementsByClassName("Button");

      var sts = value.toString();
      this.data = sts;
      this.dis = false;
    },
    sendEstimation() {
      let estimation = {
        stvalue: this.data,
        participantId: this.$store.state.currentUser.id.toString(),
        accepcrtit: this.criteriaComment.split("\n"),
        tasks: this.taskComment.split("\n"),
      };
      if (this.criteriaComment.length == 0) {
        estimation.accepcrtit = null;
      }
      if (this.taskComment.length == 0) {
        estimation.tasks = null;
      }
      estimation.task = this.taskComment;
      estimation.acepcrit = this.criteriaComment;
      console.log(estimation);
      let route =
        "/games/" +
        this.$route.params.gameId +
        "/groups/" +
        this.$store.state.currentUser.tsscGroup.id +
        "/stories/" +
        this.$route.params.storyId +
        "/estimations/";
      axios.post(route, estimation).then(() => {
        console.log("Post Request Complete");
        this.$router.push({ name: "GroupEstimation" });
      });
      // this.$router.push({name: 'GroupEstimation', props: {myScorer: estimation.stvalue, myCriteriar: estimation.accepcrtit, myTasksr: estimation.tasks} });
    },
  },
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
.banner {
  background-color: #3da674;
  border-radius: 25px;
}



</style>
