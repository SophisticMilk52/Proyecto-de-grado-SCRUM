<template>
<div>
  <!-- <h1>{{checkedStories}}</h1> -->
  <header>
    <slot name="header">
      <h1 class="text-center"><strong>Historias</strong></h1>
    </slot>
    <slot name="description">
      <h4 class="text-center">En esta pantalla puede visualizar las historias que inicialmente se
        desarrollaran durante el juego.
      </h4>
    </slot>
  </header>

  <table class="table">
    <thead>
      <tr>
        <th class="text-center priority">Prioridad</th>
        <th class="story-title">Título</th>
        <th v-if="type!='moderator'" class="text-right points">Puntos</th>
        <th class="text-center">Información</th>
        <th v-if="type=='estimation'" class="text-center">Estimar</th>
        <th v-if="type=='sprint-backlog'" class="text-center">Incluir en el Sprint</th>
      </tr>
    </thead>
    <tbody>
      <tr :key="s.id" v-for="s in stories">
        <td class="text-center">
          3
        </td>
        <td>
          {{s.shortDescription}}
        </td>
        <td class="text-right" v-if="type!='moderator'">
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
        <td class="text-center" v-if="type=='sprint-backlog'">
          <input type="checkbox" :id="s.id" :value="s.id" v-model="checkedStories">
        </td>
      </tr>
    </tbody>
    <tr v-if="type=='sprint-backlog'">
      <td colspan="2">
        Total:
      </td>
      <td class="text-right">
        {{pointSum}}
      </td>
      <td colspan="2"></td>
    </tr>
  </table>

  <div class="text-center" v-if="type=='sprint-backlog'">
    <base-button type="success" class="animation-on-hover"
    v-on:click="$emit('submit', checkedStories)">
      Iniciar Sprint
    </base-button>
  </div>


  <modal :show.sync="modals.modal0">
     <template slot="header">
        <h2 class="modal-title" id="exampleModalLabel">{{selectedStory.shortDescription}}</h2>
     </template>
     <p>
       {{selectedStory.description}}
     </p>
     <div class="container">
      <h4>Criterios de aceptación</h4>
        <ul v-if="selectedStory.criteria.length > 0">
          <li :key="c.id" v-for="c in selectedStory.criteria">
            {{c.description}}
          </li>
        </ul>
        <!-- <ul v-if="currentCriteria.length > 0">
          <li :key="c.id" v-for="c in currentCriteria">
            {{c.description}}
          </li>
        </ul> -->
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
    stories: {
      type: Array,
      default: []
    }
  },
  components: {
    Modal
  },
  created(){
    // this.currentCriteria = []
    // this.retrieveData();
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
        shortDescription: "",
        criteria: []
      },
      // stories: this.storyList,
      modals: {
        modal0: false
      },
      // currentCriteria: [],
      checkedStories: []
    }
  },
  methods: {
    // retrieveData(){
    //   if(this.type == "moderator"){
    //     axios.get("/games/" + this.gameId + "/stories/")
    //     .then(res => {
    //       this.stories = res.data
    //       console.log(this.stories)
    //     })
    //   } else {
    //     axios.get("/games/" + this.gameId + "/stories/group/" + this.groupId)
    //     .then(res => this.stories = res.data)
    //   }
    // },

    detailStory(s){
      this.selectedStory = s;
      // this.retrieveCriteria(s.id)
      this.modals.modal0 = true
    },
    // retrieveCriteria(id){
    //   axios
    //   // .get("/games/" + this.$route.params.id + "/stories/" + id + "/accriteria/")
    //   .get("/games/" + this.gameId + "/stories/" + id + "/accriteria/")
    //   .then(res => this.currentCriteria = res.data)
    //   this.modals.modal0 = true
    // }
  },

  computed: {
    pointSum(){
      if(this.stories == undefined || this.stories==null || this.stories.length == 0){
        return 0
      } else {
        let sum = 0
        if(this.checkedStories.length == 0){
          return 0
        }
        this.stories.forEach(s => {
          if(this.checkedStories.includes(s.id)){
            sum += s.initialEstimation
          }
        })
        return sum
      }
    }
  }

}
</script>

<style>
th.priority, th.points {
  width: 5%;
}

</style>
