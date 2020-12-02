<template>
<div>

  <h1 class="text-center">
      <strong>{{this.story.shortDescription}}</strong>
    </h1>

    <h2>Descripción:</h2>

    <h4>{{this.story.description}}</h4>
    <h4>Estimación Original: {{this.story.initialEstimation}}</h4>

    <br />

    <div class="row">
      <div class="col-6">
        <h2 class="text-center">Criterios de Aceptación</h2>
        <ul>
          <li :key="c.id" v-for="c in criteria">
            <h4 v-if="c.tsscState.id==1">{{c.description}}</h4>
            <h4 v-else><s>{{c.description}}</s></h4>
            <!-- <base-button type="secondary" class="animation-on-hover" @click="selectCriteria(c)">
              Estado
            </base-button> -->
          </li>
        </ul>
      </div>

      <div class="col-6">
        <h2 class="text-center">Tareas</h2>
        <ul>
          <li :key="c.id" v-for="c in tasks">
            <h4 v-if="c.tsscState.id==1">{{c.description}}</h4>
            <h4 v-else><s>{{c.description}}</s></h4>
            <!-- <base-button type="secondary" class="animation-on-hover" @click="selectTask(c)">
              Estado
            </base-button> -->
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <base-input label="Estimacion Ajustada">
          <select id="inputState" class="form-control" v-model="adjustedEstimation">
            <option :key="p" v-for="p in pointValues">{{p}}</option>
          </select>
        </base-input>
      </div>
      <div class="col-6">
        <base-input label="Puntos Done" type="number" min="0" v-model="doneEstimation">
        </base-input>
      </div>
    </div>

    <div class="text-center">
      <base-button type="success" class="animation-on-hover" @click="print">
        Confirmar Cambios
      </base-button>
    </div>

    <modal :show.sync="modals.modal0">
     <template slot="header">
        <h2 class="modal-title" id="exampleModalLabel">{{selectedCriteria.description}}</h2>
     </template>
     <base-input label="¿Este criterio de aceptación esta cumplido?">
        <select id="inputState" class="form-control" v-model="sCriteriaStatus">
          <option value="0" selected>SIN CUMPLIR</option>
          <option value="1">CUMPLIDO</option>
        </select>
        <base-button type="success" class="animation-on-hover" @click="submitCriteria">
        Aceptar
      </base-button>
      </base-input>
   </modal>
<!--
  <modal :show.sync="modals.modal1">
      <template slot="header">
        <h2 class="modal-title" id="exampleModalLabel">{{selectedStory.shortDescription}}</h2>
      </template>
      <p>
        {{selectedStory.description}}
      </p>
      <div class="container">
      <h4>Criterios de aceptación</h4>
        <ul v-if="selectedStory.criteria.length > 0">
          <li :key="c.id" v-for="c in selectedStory.criteria">
            <s v-if="c.tsscState.id==2">{{c.description}}</s>
            <div v-else>{{c.description}}</div>
          </li>
        </ul>
        <p v-else>Esta historia no posee criterios de aceptacion. </p>
      </div>
    </modal> -->





</div>

</template>

<script>
import axios from '../plugins/axios'
import Modal from '../components/Modal'
import BaseButton from '../components/BaseButton.vue'
export default {
  components: {
    Modal,
  },

  data(){
    return {
      criteria: [],
      tasks: [],


      pointValues: [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
      adjustedEstimation: "0",
      doneEstimation: "0",
      story: {},
      selectedCriteria: {},
      selectedTask: {},
      modals: {
        modal0: false,
        modal1: false
      },
      sCriteriaStatus: "",
      sTaskStatus: ""
    }
  },

  created(){
    axios
    .get("/games/" + this.$route.params.gameId + "/stories/" + this.$route.params.storyId)
    .then((res) => {
      this.story = res.data;
      this.criteria = this.story.criteria
      console.log(this.criteria)
      console.log(this.story)
    });

    axios
    .get("/games/" + this.$route.params.gameId + "/stories/" + this.$route.params.storyId + "/tasks/")
    .then(
      (res) => {
        console.log("answer in")
        this.tasks = res.data
      }
    )
  },

  methods: {
    print(){
      this.confirm()
      console.log(this.adjustedEstimation+","+this.doneEstimation)
    },

    confirm(){
      console.log("logic activated")
      if(Number(this.adjustedEstimation) < Number(this.doneEstimation)){
        this.$notify({type: "danger", message: "La estimación ajustada no puede ser menor a los puntos que realizo en esta historia."})
      } else {
        let json = {
          adjustedEstimation: this.adjustedEstimation,
          doneEstimation: this.doneEstimation
        }

        // Warning if criteria or tasks are incomplete
        // let count = criteria.
        let crit = this.criteria.reduce((count,item)=>count+(item.tsscState.id==1),0)
        let tsks = this.tasks.reduce((count,item)=>count+(item.tsscState.id==1),0)

        console.log(crit,",",tsks)
        console.log(this.criteria)

        if((crit > 0 || tsks>0) && Number(this.adjustedEstimation) == Number(this.doneEstimation)){
          if(confirm("ADVERTENCIA.\nEsta historia tiene " + crit + " criterios de aceptación sin aceptar y "
          + tsks + " tareas sin terminar. Si los puntos ajustados y lo que hizo son iguales, esta diciendo "
          + "que ya acepto y termino estos, y al cerrar Sprint no volvera la historia al Backlog.\n¿Desea continuar?")){
            axios
            .put("/games/" + this.$route.params.gameId + "/stories/" + this.$route.params.storyId +
            "/adjusted/",
            json)
            .then(
              (res) => {
                this.$router.push({name: "Retrospective"})
              }
            )
          } else {

          }
        } else {
          axios
          .put("/games/" + this.$route.params.gameId + "/stories/" + this.$route.params.storyId +
          "/adjusted/",
          json)
          .then(
            (res) => {
              this.$router.push({name: "Retrospective"})
            }
          )
        }
      }
    },

    selectCriteria(criteria){
      this.selectedCriteria = criteria
      this.modals.modal0 = true
    },

    submitCriteria(){
      let json = { state: null }
      if(this.sCriteriaStatus == 0){
        json.state = "ACTIVE"
      } else if(this.sCriteriaStatus==1) {
        json.state = "INACTIVE"
      }

      console.log(json)

      console.log("SUBMITTING A STATE " + this.sCriteriaStatus + " FOR THE CRITERIA "
      + this.selectedCriteria.id)

      axios
      .put("/games/" + this.$route.params.gameId + "/stories/" + this.$route.params.storyId
      + "/accriteria/" + this.selectedCriteria.id + "/state",
      json)
      .then(
        axios
        .get("/games/" + this.$route.params.gameId + "/stories/" + this.$route.params.storyId
        + "/accriteria/" + this.selectedCriteria.id)
        .then(
          res => {
            let i = this.criteria.findIndex(e => e.id == res.data.id)
            console.log("replacing criteria " + i)
            this.criteria.splice(i,1)
            this.criteria.splice(i,0,res.data)
            this.modals.modal0 = false
          }
        )
      )
    },

    selectTask(criteria){
      this.selectedCriteria = criteria
      this.modals.modal0 = true
    },

    submitTask(){
      let json = { state: null }
      if(this.sCriteriaStatus == 0){
        json.state = "ACTIVE"
      } else if(this.sCriteriaStatus==1) {
        json.state = "INACTIVE"
      }

      console.log("SUBMITTING A STATE " + this.sCriteriaStatus + " FOR THE CRITERIA "
      + this.selectedCriteria.id)


    }
  }

}
</script>

<style>

</style>
