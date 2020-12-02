<template>
<div>
  <StoryList type="sprint-backlog" :stories="stories" v-on:submit="startSprint">
    <template v-slot:header>
      <h1 class="text-center"><strong>Sprint Backlog</strong></h1>
    </template>
    <template v-slot:description>
      <h4 class="text-center">
        Seleccione las historias en las que desea trabajar durante este Sprint. Tenga en cuenta los
        puntos con los que se esta comprometiendo.
      </h4>
    </template>
  </StoryList>
  <!-- <StoryList type="sprint-backlog" :gameId="this.$route.params.gameId"
  :groupId="this.$route.params.groupId">
    <template v-slot:header>
      <h1 class="text-center"><strong>Sprint Backlog</strong></h1>
    </template>
    <template v-slot:description>
      <h4 class="text-center">
        Seleccione las historias en las que desea trabajar durante este Sprint. Tenga en cuenta los
        puntos con los que se esta comprometiendo.
      </h4>
    </template>
  </StoryList> -->
</div>

</template>

<script>
import axios from "../plugins/axios";
import StoryList from "../components-tssc/StoryList";
export default {
  components: {
    StoryList
  },
  // props: {
  //   // change this to data
  //   stories: {
  //     type: Array,
  //     default: []
  //   }
  // },
  created(){
    axios
    .get("/games/" + this.$route.params.gameId + "/stories/group/" + this.$route.params.groupId)
    .then(res => this.stories = res.data)
  },
  data(){
    return {
      checkedStories: [],
      stories: []
    }
  },
  methods: {
    startSprint(stories){
      let json = {
        tsscStoriesIds: stories
      }
      axios
      .put("/games/" + this.$route.params.gameId + "/stories/group/" + this.$route.params.groupId
      + "/sprint/", json)
      .then(
        res => {
          let sprint = res.data
          console.log(sprint)
          this.$router.push({name: "Development", params: {gameId: this.$route.params.gameId,
          groupId: this.$route.params.groupId, sprintId: sprint.id}})
        }
      )

    }
  }
}
</script>

<style>

</style>
