<template>
<div v-if="ready==0">Loading...</div>
<div v-else-if="ready==-1"><h1>En este momento no su grupo no ha iniciado un Sprint. Ingrese a SPRINT BACKLOG para hacer eso.</h1></div>
<div v-else>
  <StoryList type="retrospective" :stories="stories" v-on:select="evaluate">
      <template v-slot:header>
        <h1 class="text-center"><strong>Retrospectiva</strong></h1>
      </template>
      <template v-slot:description>
        <h4 class="text-center">
          Después de haber terminado este Sprint, indique para cada historia la cantidad de puntos que
          en realidad merecía y si fue terminada.
        </h4>
      </template>
  </StoryList>
  <base-button @click="closeSprint">
    Cerrar Sprint
  </base-button>

</div>


</template>

<script>
import StoryList from '../components-tssc/StoryList'
import axios from '../plugins/axios'
export default {
  components: {
    StoryList
  },
  // props: {
  //   stories: {type: Array, default: []}
  // },
  data() {
    return {
      ready: 0,
      stories: [],
      sprintId: ""
    }
  },
  created(){
    // axios
    // .get("/games/" + this.$route.params.gameId + "/stories/group/" + this.$route.params.groupId
    // + "/sprint/" + this.$route.params.sprintId)
    // .then(
    //   res => {
    //     console.log(res.data)
    //     this.stories = res.data
    //   }
    // )

    axios
    .get("/games/" + this.$route.params.gameId + "/sprints/group/" + this.$route.params.groupId
    + "/active/")
    .then(
      res => {
        console.log(res.data)

        if(res.data){
          this.sprintId = res.data.id
          axios
          .get("/games/" + this.$route.params.gameId + "/stories/group/" + this.$route.params.groupId
          + "/sprint/" + this.sprintId)
          .then(
            res2 => this.stories = res2.data
          )
          this.ready = 1
        } else {
          this.ready = -1
        }

        // let sprintId = res.data.id

      }
    )

  },

  methods: {
    evaluate(story){
      this.$router.push(
        {
          name: "Retrospective Detail",
          params: {
            gameId: this.$route.params.gameId,
            groupId: this.$route.params.groupId,
            sprintId: this.$route.params.sprintId,
            storyId: story.id
          }
        }
      )
    },

    closeSprint(){
      if(confirm("¿Esta seguro que quiere cerrar el Sprint?\n- Las historias que no se hayan empezado volveran al Backlog.\n- Todas las historias que no hayan quedado terminadas (sin todos sus puntos Done) se aceptaran parcialmente en el Sprint y se instanciaran nuevamente en el Backlog.")){
        axios
        .get("/games/" + this.$route.params.gameId + "/stories/closeSprint/" + this.sprintId +"/")
        // .get("/games/" + this.$route.params.gameId + "/stories/closeSprint/" + this.$route.params.sprintId +"/")
        .then(
          this.$router.push({name: 'Backlog'})
        )
      }

    }
  }
}
</script>

<style>

</style>
