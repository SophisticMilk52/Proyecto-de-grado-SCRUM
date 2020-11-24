<template>
<div>
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
  props: {
    stories: {type: Array, default: []}
  },
  created(){
    axios
    .get("/games/" + this.$route.params.gameId + "/stories/group/" + this.$route.params.groupId
    + "/sprint/" + this.$route.params.sprintId)
    .then(
      res => {
        console.log(res.data)
        this.stories = res.data
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
        .get("/games/" + this.$route.params.gameId + "/stories/closeSprint/" + this.$route.params.sprintId +"/")
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
