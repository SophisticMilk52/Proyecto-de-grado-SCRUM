<template>
  <div>
    <div>
      <h1 class="text-center"><strong>Estimación</strong></h1>
      <h2 class="text-center"><strong>{{this.story.shortDescription}}</strong></h2>
      <h2 class="section-title">Descripción</h2>
      <p>{{this.story.description}}</p>
      <br>
      <h2 class="section-title">Criterios de aceptación</h2>
      <ul>
        <li :key="c.id" v-for="c in criteria">
          {{c.description}}
        </li>
      </ul>
    </div>
    <div>
      <div>
        <h2 class="text-center">Asigne puntaje de esfuerzo para esta historia</h2>
        <div class="row">
          <div
            class="col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 my-btn"
            :key="v"
            v-for="v in values"
          >
            <base-button class="animation-on-hover" type="info" @click="change(v)">{{v}}</base-button>
          </div>
        </div>
        <h1 value class="valor">{{score}}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../../plugins/axios"
export default {
  created(){

  },
  mounted(){
    axios
    .get("/games/" + this.$route.params.gameId + "/stories/" + this.$route.params.storyId)
    .then(res => this.story = res.data)

    axios
    .get("/games/" + this.$route.params.gameId + "/stories/" + this.$route.params.storyId
    + "/accriteria/")
    .then(res => this.criteria = res.data)

    if(pCriteria.length > 0){
      console.log("Criteria list detected")
    }
    if(pTasks.length > 0){
      console.log("Task list detected")
    }
  },


  props: {
    pScore: {type: String, default: ""},
    pCriteria: {type: Array, default: []},
    pTasks: {type: Array, default: []}
  },
  data(){
    return {
      values: [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, "Inf."],
      score: this.pScore,
      story: null,
      criteria: [],
      criteriaComment: "",
      taskComment: ""
    }
  },
  methods: {
    change(value){
      this.score = value.toString();
    },
    sendEstimation(){
      let estimation = {
        stvalue: this.score,
        participantId: this.$store.state.currentUser.id.toString(),
        accepcrtit: this.criteriaComment.split("\n"),
        tasks: this.taskComment.split("\n")
      }

      if (this.criteriaComment.length == 0) {
        estimation.accepcrtit = null;
      }
      if (this.taskComment.length == 0) {
        estimation.tasks = null;
      }

      console.log(estimation)
    }
  }

}
</script>

<style scoped>
.section-title{
  margin-bottom: 16px;
}

</style>
