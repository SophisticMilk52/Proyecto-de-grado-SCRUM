<template>
<div>
  <h1 class="text-center"><strong>Historias</strong></h1>
  <table class="table">
    <tr :key="s.id" v-for="s in stories">
          <td>
              <h3 class="h3-historias">{{s.shortDescription}}</h3>
              <p><i><strong>{{s.description}}</strong></i></p>
          </td>
              <td><base-button class="btn" type="secondary" @click='retrieveCriteria(s.id)'>Más Información</base-button></td>
        </tr>
  </table>

  <modal :show.sync="modals.modal0">
     <template slot="header">
        <h5 class="modal-title" id="exampleModalLabel">Criterios de Aceptación</h5>
     </template>
     <div>
      <ul v-if="currentCriteria.length > 0">
        <li :key="c.id" v-for="c in currentCriteria">
          {{c.description}}
        </li>
      </ul>
      <p v-else>Esta historia no posee criterios de aceptacion. </p>
     </div>
     <template slot="footer">
         <base-button type="secondary" @click="modals.modal0 = false">Close</base-button>
     </template>
   </modal>
</div>

</template>

<script>
import axios from '../../plugins/axios'
import Modal from '../../components/Modal'
export default {
  props: {
    gameId: {
      type: String
    }
  },
  components: {
    Modal
  },
  created(){
    this.currentCriteria = []
  },
  mounted(){
    axios
    // .get("/games/" + this.$route.params.id + "/stories/")
    .get("/games/" + this.gameId + "/stories/")
    .then(res => this.stories = res.data)
  },
  data(){
    return {
      stories: [],
      modals: {
        modal0: false
      },
      currentCriteria: []
    }
  },
  methods: {
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

</style>
