<template>
<div v-if="ready==0">Loading...</div>
<div v-else-if="ready==-1"><h1>En este momento su equipo no ha iniciado un Sprint. Ingrese a SPRINT BACKLOG para iniciar uno.</h1></div>
<div v-else>
  <StoryList type="develop" :stories="stories" v-on:select="showStory">
    <template v-slot:header>
      <h1 class="text-center"><strong>Desarrollo</strong></h1>
    </template>
    <template v-slot:description>
      <h4 class="text-center">
        Desarrolle las historias del Sprint actual. Cuando termine una de las tareas, o
        complete uno de los criterios de aceptación, marquelo como terminado.
      </h4>
    </template>
  </StoryList>



  <modal :show.sync="modals.modal1">
     <template slot="header">
        <h2 class="modal-title" id="exampleModalLabel">{{selectedStory.shortDescription}}</h2>
     </template>
     <p>
       {{selectedStory.description}}
     </p>
     <div class="container">
      <h4>Criterios de aceptación</h4>
      <table>
        <tr :key="`${modalKey}-${c.id}`" v-for="(c, index) in criteria">
          <td :class="criteria_bool[index] ? 'description':'description done'">
            {{c.description}}
          </td>
          <td>
            <!-- <base-button @click="c.tsscState.id==1 ? finishCriteria(c.id,index) : resumeCriteria(c.id,index)"
            :type="c.tsscState.id==1 ? 'success' : 'warning'" size="sm" icon>
              <i :class="c.tsscState.id==1 ?  'tim-icons icon-simple-remove' : 'tim-icons icon-check-2'"></i>
            </base-button> -->
            <base-button @click="c.tsscState.id==1 ? finishCriteria(c.id,index) : resumeCriteria(c.id,index)"
            :type="criteria_bool[index] ? 'success' : 'warning'" size="sm" icon>
              <i :class="criteria_bool[index] ?  'tim-icons icon-simple-remove' : 'tim-icons icon-check-2'"></i>
            </base-button>
          </td>
        </tr>
      </table>

      <h4>Tareas</h4>
      <table>
        <tr :key="c.id" v-for="(c,index) in tasks">
          <td :class="tasks_bool[index] ? 'description':'description done'">{{c.description}}</td>
          <td>
            <base-button @click="c.tsscState.id==1 ? finishTask(c.id,index) : resumeTask(c.id,index)"
            :type="tasks_bool[index] ? 'success' : 'warning'" size="sm" icon>
              <i :class="tasks_bool[index] ?  'tim-icons icon-simple-remove' : 'tim-icons icon-check-2'"></i>
            </base-button>
          </td>
        </tr>
      </table>

     </div>
   </modal>
</div>
</template>

<script>
import axios from '../plugins/axios'
import Modal from '../components/Modal'
import StoryList from "../components-tssc/StoryList";

export default {
  components: {
    Modal, StoryList
  },

  /**
   * Development View's data
   */
  data(){
    return {
      modalKey: 0,
      ready: 0,
      selectedStory: {
        description: "",
        shortDescription: "",
        criteria: [],
      },
      // List of stories
      stories: [],

      // Criteria and Tasks of a selected story
      criteria: [],
      tasks: [],

      // Bool arrays for the above
      criteria_bool: [],
      tasks_bool: [],

      // Shows modal
      modals: {
        modal1: false
      }
    }
  },

  /**
   * @todo Add
   */
  created(){
    console.log("started")
    // Add portion where if null object returns, show that there's no active sprint atm
    axios
    .get("/games/" + this.$route.params.gameId + "/sprints/group/" + this.$route.params.groupId
    + "/active/")
    .then(
      res => {
        if(res.data){
          console.log(res.data)
          let sprintId = res.data.id
          console.log(sprintId)
          axios
          .get("/games/" + this.$route.params.gameId + "/stories/group/" + this.$route.params.groupId
          + "/sprint/" + sprintId)
          .then(
            res2 => this.stories = res2.data
          )
          this.ready = 1
        }else {
          console.log("logic successful")
          this.ready = -1
        }
      }
    )
  },

  methods: {
    showStory(story){
      this.selectedStory = story
      this.tasks_bool.splice(0)
      this.criteria_bool.splice(0)
      axios
      .get("/games/" + this.$route.params.gameId + "/stories/" + story.id + "/tasks/")
      .then(
        (res) => {
          this.tasks = res.data
          this.tasks.forEach( t => {
            this.tasks_bool.push(t.tsscState.id==1?true:false)
          })
        }
      )
      .then(
        axios
        .get("/games/" + this.$route.params.gameId + "/stories/" + story.id + "/accriteria/")
        .then(
          (res2) => {
            this.criteria = res2.data
            this.criteria.forEach( t => {
              this.criteria_bool.push(t.tsscState.id==1?true:false)
            })
          }
        )
        .then(
          () => {
            this.modals.modal1 = true
            console.log("crit",this.criteria_bool)
            console.log("task",this.tasks_bool)
          }
        )
      )
    },



    finishCriteria(id,index){
      let json = { state: "INACTIVE" }
      axios
      .put("/games/" + this.$route.params.gameId + "/stories/" + this.selectedStory.id
      + "/accriteria/" + id + "/state",
      json)
      .then(
        axios
        .get("/games/" + this.$route.params.gameId + "/stories/" + this.selectedStory.id
        + "/accriteria/")
        .then(
          res => {
            this.criteria.splice(0)
            this.criteria = res.data
            this.$notify({type: "success",
            message: "¡Se ha aceptado el criterio de aceptación!"})
            this.modalKey = this.modalKey + 1
            this.criteria_bool.splice(index,1,false)
            this.$nextTick(() => {})
          }
        )
      )
    },

    finishTask(id,index){
      let json = { state: "INACTIVE" }
      axios
      .put("/games/" + this.$route.params.gameId + "/stories/" + this.selectedStory.id
      + "/tasks/" + id + "/state/",
      json)
      .then(
        axios
        .get("/games/" + this.$route.params.gameId + "/stories/" + this.selectedStory.id
        + "/tasks/")
        .then(
          res => {
            this.tasks.splice(0)
            this.tasks = res.data
            this.$notify({type: "success",
            message: "¡Se ha completado la tarea!"})
            this.modalKey = this.modalKey + 1
            this.tasks_bool.splice(index,1,false)
            this.$nextTick(() => {})
          }
        )
      )


    },

    resumeCriteria(id,index){
      let json = { state: "ACTIVE" }
      axios
      .put("/games/" + this.$route.params.gameId + "/stories/" + this.selectedStory.id
      + "/accriteria/" + id + "/state",
      json)
      .then(
        axios
        .get("/games/" + this.$route.params.gameId + "/stories/" + this.selectedStory.id
        + "/accriteria/")
        .then(
          res => {
            this.criteria.splice(0)
            this.criteria = res.data
            this.$notify({type: "success",
            message: "El criterio de aceptación sigue sin aceptar."})
            this.modalKey = this.modalKey + 1
            this.criteria_bool.splice(index,1,true)
            this.$nextTick(() => {})
          }
        )
      )

    },

    resumeTask(id,index){
      let json = { state: "ACTIVE" }
      axios
      .put("/games/" + this.$route.params.gameId + "/stories/" + this.selectedStory.id
      + "/tasks/" + id + "/state/",
      json)
      .then(
        axios
        .get("/games/" + this.$route.params.gameId + "/stories/" + this.selectedStory.id
        + "/tasks/")
        .then(
          res => {
            this.tasks.splice(0)
            this.tasks = res.data
            this.$notify({type: "success",
            message: "La tarea sigue incompleta"})
            this.modalKey = this.modalKey + 1
            this.tasks_bool.splice(index,1,true)
            this.$nextTick(() => {})
          }
        )
      )

    },
  }


}
</script>

<style scoped>
td.description{
  width: 90%
}

td.done {
  text-decoration: line-through;
}

</style>
