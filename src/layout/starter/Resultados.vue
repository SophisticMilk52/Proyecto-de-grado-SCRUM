<template>
  <div class>
    <h1 class="text-center"><strong>Resultados</strong></h1>
    <div class="elementos">
      <base-button @click="refresh">Refrescar</base-button>
      <!-- <base-button @click="participant">FUCK</base-button> -->
      <h3>{{this.estimations.length}}/{{this.participants.length}} han estimado la historia.</h3>
      <table class="table">
        <tr>
          <th>Nombre</th>
          <th>Puntaje</th>
          <th>C. de Aceptacion</th>
          <th>Tareas</th>
        </tr>
        <tr :key="e.id" v-for="e in estimations">
          <!-- <td>{{findName(e.participantId)}}</td> -->
          <td v-if="allEstimated()">{{e.participantId}}</td><td v-else>*****</td>
          <td>{{e.stvalue}}</td>
          <td v-if="e.accepcrtit !=null">{{e.accepcrtit}}</td><td v-else></td>
          <td v-if="e.tasks !=null">{{e.tasks}}</td><td v-else></td>
        </tr>
      </table>
    </div>
      <div class="text-center">
      <base-button type="success" @click="reEstimate">Re-estimar</base-button>
    <router-link to="/stories">
      <base-button type="success">Continuar</base-button>
    </router-link>
    </div>
  </div>
</template>

<script>
import axios from '../../plugins/axios'
export default {
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














    // .then((res) =>{
    //   this.estimations = res.data
    // })
  },
  data() {
    return {
      participants: [],
      estimations: [],
      myScore: 0,
      myCriteria: [],
      myTasks: []
    }
  },

  props: {
    myScorer: {type: String},
    myCriteriar: {type: Array},
    myTasksr: {type: Array}
  },

  methods: {
    findName(id){
      if (this.participants != null){
        return this.participants.find(p => p.participantId == id).name;
      } else if(this.participants == undefined){
        return ""
      } else {
        return ""
      }
    },
    allEstimated(){
      return this.estimations.length == this.participants.length
    },
    refresh(){
      console.log(this.participants)
      this.estimations = null
      let estimationRoute = "/games/" + this.$route.params.gameId + "/groups/"
      + this.$store.state.currentUser.tsscGroup.id + "/stories/" + this.$route.params.storyId
      + "/estimations/";
      axios.get(estimationRoute)
      .then((res) => {
        this.estimations = res.data
        console.log(this.estimations)
      })
      // axios.get(participantRoute)
      // .then((res) => {
      //   this.participants = res.data
      //   console.log(this.participants)
      // })
    },
    participant(){
      // let participantRoute = "/games/" + this.$route.params.gameId + "/groups/"
      // + this.$store.state.currentUser.tsscGroup.id + "/participants/"
      // axios.get(participantRoute).then((res) => {
      //   console.log(res.data)
      // })
      let self = this
      console.log(self.myScorer)
      console.log(self.myCriteriar)
      console.log(self.myTasksr)
    },
    reEstimate(){
      this.$router.push({path: '/juegos/'+this.$route.params.id+'/stories/'+payload.storyId+'/estimation',
      props: {myScore: this.$props.myScore, myCriteria: this.$props.myCriteria, myTasks: this.$props.myTasks}})
    }
  }


};
</script>

<style>
.elementos {
  background-color: white;
  border-radius: 25px;
}

.tabla {
  margin: 0;
  padding: 0;
  width: 100%;
}
</style>
