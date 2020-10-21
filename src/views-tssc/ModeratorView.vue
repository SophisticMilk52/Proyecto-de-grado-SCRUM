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
      type="primary"
      @click="compShown=='storylist' ? compShown='none' : compShown='storylist'"
      >Historias</base-button>
      <base-button
      class="btn"
      type="primary"
      @click="compShown=='grouplist' ? compShown='none' : compShown='grouplist'"
      >Grupos</base-button>
      <base-button
      class="btn"
      type="primary"
      @click="compShown=='partlist' ? compShown='none' : compShown='partlist'"
      >Participantes</base-button>
    </div>
    <StoryList v-if="compShown=='storylist'" type="moderator" :gameId="this.$route.params.gameId"/>
    <LinkList v-if="compShown=='grouplist'" :gameId="this.$route.params.gameId" />
    <ParticipantList v-if="compShown=='partlist'" :gameId="this.$route.params.gameId" />
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
    }

  },
  data(){
    return {
      gameData: {},
      isReady: false,
      isAuthorized: false,
      compShown: "none",
    }
  }



}
</script>

<style>

</style>
