<template>
  <div class>
    <h1 class="text-center"><strong>Resultados</strong></h1>
    <base-button @click="refresh">Refrescar</base-button>
    <base-button @click="reestimate">Reestimar</base-button>
    <div class="elementos">
      <h3>{{this.estimations.length}} / {{this.participants.length}} han estimado la historia.</h3>
      <table class="table">
        <tr>
          <th class="participant">Nombre</th>
          <th class="points">Puntos</th>
          <th class="criteria">Criterios de Aceptacion</th>
          <th class="tasks">Tareas</th>
        </tr>
        <tr :key="e.id" v-for="e in estimations">
          <td v-if="allEstimated()">{{e.author}}</td><td v-else>*****</td>
          <td class="text-center">{{e.stvalue}}</td>
          <td v-if="e.criteria !=null">{{e.criteria}}</td><td v-else></td>
          <td v-if="e.tasks !=null">{{e.tasks}}</td><td v-else></td>
        </tr>
      </table>
    </div>
    <EstimationForm type="group" v-on:post="postEstimation" />
  </div>
</template>

<script>
import axios from '../plugins/axios'
import EstimationForm from '../components-tssc/EstimationForm'
export default {
  components: {EstimationForm},
  created(){
    this.estimations = []
    this.participants = []
  },
  mounted(){

    console.log(this.participants)
    let estimationRoute = "/games/" + this.$route.params.gameId + "/groups/"
      + this.$store.state.currentUser.tsscGroup.id + "/stories/" + this.$route.params.storyId
      + "/estimations/";

    let participantRoute = "/games/" + this.$route.params.gameId + "/groups/"
      + this.$store.state.currentUser.tsscGroup.id + "/participants/";

    axios.get(estimationRoute)
    .then((res) => {
      console.log(res.data);
      let d = res.data
      this.estimations = d;
    })

    axios.get(participantRoute)
    .then((res) => {
      console.log(res.data);
      let d = res.data
      this.participants = d
    })
  },
  data() {
    return {
      participants: [],
      estimations: [],
      myScore: this.score,
      myCriteria: this.criteria,
      myTasks: this.tasks
    }
  },

  props: {
    score: {type: String},
    criteria: {type: Array},
    tasks: {type: Array},
  },

  methods: {
    allEstimated(){
      return this.estimations.length == this.participants.length
    },

    writtenByMe(estimation){
      return this.$store.state.currentUser.id == estimation.participantId
    },

    refresh(){
      console.log(this.participants)
      this.estimations = null
      let estimationRoute = "/games/" + this.$route.params.gameId + "/groups/"
      + this.$store.state.currentUser.tsscGroup.id + "/stories/" + this.$route.params.storyId
      + "/estimations/";
      axios.get(estimationRoute).then(
        (res) => {
          this.estimations = res.data
          console.log(this.estimations)
        }
      )

    },

    reEstimate(){
      this.$router.push({path: '/juegos/'+this.$route.params.id+'/stories/'+payload.storyId+'/estimation',
      props: {oldScore: this.myScore, oldCriteria: this.myCriteria, oldTasks: this.myTasks}})
    },

    postEstimation({points, newCriteria, newTasks}){
      let json = {
        initialEstimation: points,
        criteria: newCriteria,
        task: newTasks
      }

      // console.log(json)

      let route = "/games/" + this.$route.params.gameId + "/stories/" + this.$route.params.storyId
      + "/group/" + this.$store.state.currentUser.tsscGroup.id

      axios.put(route, json).then(
        this.$router.push({name: 'Backlog', params: {id: this.$route.params.gameId,
            id2: this.$store.state.currentUser.tsscGroup.id }})
      )

    },

    reestimate(){
      let estimationId = this.estimations.find(
        e => e.participantId == this.$store.state.currentUser.id).id
      this.$router.push({
        name: "Reestimation",
        params: {
          gameId: this.$route.params.gameId,
          groupId: this.$store.state.currentUser.tsscGroup.id,
          storyId: this.$route.params.storyId,
          estimationId: estimationId
        }
      })
      console.log(estimationId)
    }
  }


};
</script>

<style scoped>
.elementos {
  background-color: white;
  border-radius: 25px;
}

.tabla {
  margin: 0;
  padding: 0;
  width: 100%;
}

th.points {
  width: 5%
}

th.participant{
  width: 15%
}

th.criteria, th.tasks{
  width: 40%
}
</style>
