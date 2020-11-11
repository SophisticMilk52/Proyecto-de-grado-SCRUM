<template>
<StoryList :stories="stories">
    <template v-slot:header>
      <h1 class="text-center"><strong>Retrospectiva</strong></h1>
    </template>
    <template v-slot:description>
      <h4 class="text-center">
        Despues de haber terminado este Sprint, indique para cada historia la cantidad de puntos que
        en realidad merecia y si sus clientes la aceptan. Indique tambien cuales de sus criterios
        de aceptacion ya fueron aceptados.
      </h4>
    </template>
</StoryList>

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
  }
}
</script>

<style>

</style>
