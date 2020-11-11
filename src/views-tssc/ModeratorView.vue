<template>
<!-- Route: /games/{gameId}/moderator/{modPwd} -->
  <div v-if="!isReady">Loading...</div>
  <div v-else-if="isAuthorized">
    <h1 class="text-center"><strong>{{gameData.name}}</strong></h1>
    <h3>Fecha: {{gameData.scheduledDate}}</h3>
    <h3>Hora programada de Inicio: {{gameData.scheduledTime}}</h3>
    <div class="text-center">
      <base-button
      class="btn"
      :type="compShown=='storylist' ? 'primary' : 'secondary'"
      @click="switchList('storylist')"
      >Historias</base-button>
      <base-button
      class="btn"
      :type="compShown=='grouplist' ? 'primary' : 'secondary'"
      @click="switchList('grouplist')"
      >Grupos</base-button>
      <base-button
      class="btn"
      :type="compShown=='partlist' ? 'primary' : 'secondary'"
      @click="switchList('partlist')"
      >Participantes</base-button>
      <!-- <base-button
      class="btn"
      :type="compShown=='storylist' ? 'primary' : 'secondary'"
      @click="compShown=='storylist' ? compShown='none' : compShown='storylist'"
      >Historias</base-button>
      <base-button
      class="btn"
      :type="compShown=='grouplist' ? 'primary' : 'secondary'"
      @click="compShown=='grouplist' ? compShown='none' : compShown='grouplist'"
      >Grupos</base-button>
      <base-button
      class="btn"
      :type="compShown=='partlist' ? 'primary' : 'secondary'"
      @click="compShown=='partlist' ? compShown='none' : compShown='partlist'"
      >Participantes</base-button> -->
    </div>
    <br><br>
    <StoryList v-if="compShown=='storylist'" type="moderator" :stories="stories">
    <!-- <StoryList v-if="compShown=='storylist'" type="moderator" :gameId="this.$route.params.gameId"> -->
      <template v-slot:header>
        <h2 class="text-center"><strong>Historias</strong></h2>
      </template>
    </StoryList>
    <LinkList v-if="compShown=='grouplist'" :gameId="this.$route.params.gameId" :groups="groups" />
    <!-- <LinkList v-if="compShown=='grouplist'" :gameId="this.$route.params.gameId" /> -->
    <!-- <ParticipantList v-if="compShown=='partlist'" :gameId="this.$route.params.gameId" /> -->
    <ParticipantList v-if="compShown=='partlist'" :participants="participants" />
    <!-- <ParticipantList v-if="compShown=='partlist'" :gameId="this.$route.params.gameId" /> -->
  </div>
  <div v-else>
    <h1 class="text-center"><strong>401: NO AUTORIZADO</strong></h1>
    <h2>La contraseña de moderador que tiene en la url no es la correcta. Pedir al administrador un
      enlace con la contraseña correcta.</h2>
  </div>

</template>

<script>
import axios from '../plugins/axios'
import StoryList from '../components-tssc/StoryList.vue'
import LinkList from '../components-tssc/LinkList.vue'
import ParticipantList from '../components-tssc/ParticipantList.vue'
export default {
  components: {
    StoryList, LinkList, ParticipantList
  },
  created(){
    this.retrieveData()
  },
  mounted(){

  },
  methods: {
    retrieveData(){
      axios.get("/games/" + this.$route.params.gameId + "/moderator/" + this.$route.params.modPwd)
      .then(
        res => {
          this.isAuthorized = true;
          this.gameData = res.data;
          this.isReady = true;
        }
      )
      .catch(
        () => {
          this.isAuthorized = false;
          this.isReady = true;
        }
      )
    },

    switchList(input){
      switch(input){
        case this.compShown:
          this.compShown = "none"
          break;

        case "storylist":
          this.retrieveStories()
          this.compShown = "storylist"
          break;

        case "grouplist":
          this.retrieveLinks()
          this.compShown = "grouplist"
          break;

        case "partlist":
          this.retrieveParticipants()
          this.compShown = "partlist"
          break;
      }

    },

    retrieveStories(){
      console.log("Retrieve stories activated")
      axios
      .get("/games/" + this.$route.params.gameId + "/stories/")
      .then(res => this.stories = res.data)
      console.log("Stories:", this.stories)
    },

    retrieveLinks(){
      axios
      .get("/games/" + this.$route.params.gameId + "/groups/")
      .then(res => this.groups = res.data);
    },

    retrieveParticipants(){
      axios
      .get("/games/" + this.$route.params.gameId + "/participants/")
      .then(res => { this.participants = res.data });
    },



  },
  data(){
    return {
      gameData: {},
      isReady: false,
      isAuthorized: false,
      compShown: "none",
      stories: [],
      groups: [],
      participants: []
    }
  }



}
</script>

<style>

</style>
