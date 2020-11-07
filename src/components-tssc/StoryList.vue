<template>
<div>
  <h1 class="text-center"><strong>Historias</strong></h1>
  <h4 class="text-center">En esta pantalla debe seleccionar historias para estimar el esfuerzo
    que necesitara para completarla.
  </h4>
  <!-- <table class="table">
    <tr :key="s.id" v-for="s in stories">
          <td>
              <h3 class="h3-historias">{{s.shortDescription}}</h3>
              <p><i><strong>{{s.description}}</strong></i></p>
          </td>
          <td>
            <base-button class="btn" type="secondary" @click='retrieveCriteria(s.id)'
            >Criterios de Aceptación</base-button>
          </td>
          <td v-if="type=='estimation'">
            <base-button class="btn" type="secondary"
            v-on:click="$emit('select', s)">Estimar</base-button>
          </td>
          <td v-if="type=='estimation'">
            <h1>{{s.initialEstimation ? s.initialEstimation : "N.A."}}</h1>
          </td>
        </tr>
  </table> -->

  <table class="table">
    <thead>
      <tr>
        <th class="text-center priority">Prioridad</th>
        <th class="story-title">Título</th>
        <th v-if="type=='estimation'" class="text-right points">Puntos</th>
        <th class="text-center">Información</th>
        <th v-if="type=='estimation'" class="text-center">Estimar</th>
      </tr>
    </thead>
      <tr :key="s.id" v-for="s in stories">
        <td class="text-center">
          3
        </td>
        <td>
          {{s.shortDescription}}
        </td>
        <td class="text-right" v-if="type=='estimation'">
          {{s.initialEstimation ? s.initialEstimation : "N.A."}}
        </td>
        <td class="text-center">
          <base-button class="btn" size="sm" type="secondary" v-on:click="detailStory(s)">
            Más Información
          </base-button>
        </td>
        <td class="text-center" v-if="type=='estimation'">
          <base-button class="btn" size="sm" type="secondary" v-on:click="$emit('select', s)">
            Estimar
          </base-button>
        </td>
      </tr>
    <tbody>

    </tbody>
  </table>

  <modal :show.sync="modals.modal0">
     <template slot="header">
        <h2 class="modal-title" id="exampleModalLabel">{{selectedStory.shortDescription}}</h2>
     </template>
     <p>
       {{selectedStory.description}}
     </p>
     <div class="container">
      <h4>Criterios de aceptación</h4>
        <ul v-if="currentCriteria.length > 0">
          <li :key="c.id" v-for="c in currentCriteria">
            {{c.description}}
          </li>
        </ul>
        <p v-else>Esta historia no posee criterios de aceptacion. </p>
     </div>
   </modal>
</div>

</template>

<script>
import axios from '../plugins/axios'
import Modal from '../components/Modal'
export default {
  props: {
    type: {
      type: String
    },
    gameId: {
      type: String
    },
    groupId: {
      type: String
    },
  },
  components: {
    Modal
  },
  created(){
    this.currentCriteria = []
    this.retrieveData();
  },
  mounted(){
    // axios
    // .get("/games/" + this.gameId + "/stories/")
    // .then(res => this.stories = res.data)
  },
  data(){
    return {
      selectedStory: {
        description: "",
        shortDescription: ""
      },
      stories: [],
      modals: {
        modal0: false
      },
      currentCriteria: []
    }
  },
  methods: {
    retrieveData(){
      if(this.type == "moderator"){
        axios.get("/games/" + this.gameId + "/stories/")
        .then(res => this.stories = res.data)
      } else {
        axios.get("/games/" + this.gameId + "/stories/group/" + this.groupId)
        .then(res => this.stories = res.data)
      }
    },

    detailStory(s){
      this.selectedStory = s;
      this.retrieveCriteria(s.id)
    },
    retrieveCriteria(id){
      axios
      // .get("/games/" + this.$route.params.id + "/stories/" + id + "/accriteria/")
      .get("/games/" + this.gameId + "/stories/" + id + "/accriteria/")
      .then(res => this.currentCriteria = res.data)
      this.modals.modal0 = true
    }
  }

}
</script>

<style>
th.priority, th.points {
  width: 5%;
}

</style>
