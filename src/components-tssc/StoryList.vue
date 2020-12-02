<template>
<div>
  <!--  TODO: ORGANIZE TABLES BETTER ACCORDING TO TYPE PROP -->
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

<!-- Tables -->

  <table class="table" v-if="type=='moderator'">
    <thead>
      <tr>
        <th class="text-center priority">Prioridad</th>
        <th class="story-title">Descripcion</th>
        <th class="text-center">Información</th>
      </tr>
    </thead>
     <tbody>
      <tr :key="s.id" v-for="s in stories">
        <td class="text-center">
          {{s.priority}}
        </td>
        <td>
          {{s.shortDescription}}
        </td>
        <td class="text-center">
          <base-button class="btn" size="sm" type="secondary" v-on:click="detailStory(s)">
            Más Información
          </base-button>
        </td>
      </tr>
    </tbody>
  </table>

  <table class="table" v-if="type=='backlog'">
    <thead>
      <tr>
        <th class="text-center priority">Prioridad</th>
        <th class="story-title">Descripcion</th>
        <th class="text-right points">Puntos</th>
        <th class="text-center">Información</th>
        <th class="text-center">Estimar</th>
      </tr>
    </thead>
    <tbody>
      <tr :key="s.id" v-for="s in stories">
        <td class="text-center">
          {{s.priority}}
        </td>
        <td>
          {{s.shortDescription}}
        </td>
        <td class="text-right">
          {{s.initialEstimation ? s.initialEstimation : "N.A."}}
        </td>
        <td class="text-center">
          <base-button class="btn" size="sm" type="secondary" v-on:click="detailStory(s)">
            Más Información
          </base-button>
        </td>
        <td class="text-center">
          <base-button class="btn" size="sm" type="secondary" v-on:click="$emit('select', s)">
            Estimar
          </base-button>
        </td>
      </tr>
    </tbody>
  </table>

  <table class="table" v-if="type=='develop'">
    <thead>
      <tr>
        <th class="text-center priority">Prioridad</th>
        <th class="story-title">Descripcion</th>
        <th class="text-right points">Puntos</th>
        <th class="text-center">Información</th>
        <th class="text-center">Criterios/Tareas</th>
      </tr>
    </thead>
    <tbody>
      <tr :key="s.id" v-for="s in stories">
        <td class="text-center">
          {{s.priority}}
        </td>
        <td>
          {{s.shortDescription}}
        </td>
        <td class="text-right">
          {{s.initialEstimation ? s.initialEstimation : "N.A."}}
        </td>
        <td class="text-center">
          <base-button class="btn" size="sm" type="secondary" v-on:click="detailStory(s)">
            Más Información
          </base-button>
        </td>
        <td class="text-center">
          <base-button class="btn" size="sm" type="secondary" v-on:click="$emit('select', s)">
            Modificar
          </base-button>
        </td>
      </tr>
    </tbody>
  </table>

  <table class="table" v-if="type=='sprint-backlog'">
    <thead>
      <tr>
        <th class="text-center priority">Prioridad</th>
        <th class="story-title">Descripcion</th>
        <th class="text-right points">Puntos</th>
        <th class="text-center">Información</th>
        <th class="text-center">Incluir en el Sprint</th>
      </tr>
    </thead>
    <tbody>
      <tr :key="s.id" v-for="s in stories">
        <td class="text-center">
          {{s.priority}}
        </td>
        <td>
          {{s.shortDescription}}
        </td>
        <td class="text-right">
          {{s.initialEstimation ? s.initialEstimation : "N.A."}}
        </td>
        <td class="text-center">
          <base-button class="btn" size="sm" type="secondary" v-on:click="detailStory(s)">
            Más Información
          </base-button>
        </td>
        <td class="text-center">
          <input type="checkbox" :id="s.id" :value="s.id" v-model="checkedStories">
        </td>
      </tr>
    </tbody>
    <tr>
      <td colspan="2">
        <strong>Total:</strong>
      </td>
      <td class="text-right">
        <strong>{{pointSum}}</strong>
      </td>
      <td colspan="2"></td>
    </tr>
  </table>

  <table class="table" v-if="type=='retrospective'">
    <thead>
      <tr>
        <th class="text-center priority">Prioridad</th>
        <th class="story-title">Descripcion</th>
        <th class="text-right points">Puntos</th>
        <th class="text-right points">Estimación Ajustada</th>
        <th class="text-right points">Puntos Realizados</th>
        <th class="text-center">Información</th>
        <th class="text-center">Retrospectiva</th>
      </tr>
    </thead>
    <tbody>
      <tr :key="s.id" v-for="s in stories">
        <td class="text-center">
          {{s.priority}}
        </td>
        <td>
          {{s.shortDescription}}
        </td>
        <td class="text-right" v-if="type!='moderator'">
          {{s.initialEstimation ? s.initialEstimation : "N.A."}}
        </td>
        <td class="text-right" v-if="type=='retrospective'">
          {{s.adjustedEstimation ? s.adjustedEstimation : "N.A."}}
        </td>
        <td class="text-right" v-if="type=='retrospective'">
          {{s.doneEstimation ? s.doneEstimation : "N.A."}}
        </td>
        <td class="text-center">
          <base-button class="btn" size="sm" type="secondary" v-on:click="detailStory(s)">
            Ver Historia
          </base-button>
        </td>
        <td class="text-center">
          <base-button class="btn" size="sm" type="secondary" v-on:click="$emit('select', s)">
            Puntuar
          </base-button>
        </td>
      </tr>


    <tr>
      <td colspan="2">
        <strong>Velocidad Acumulada</strong>
      </td>
      <td class="text-right">
        {{ expectedSpeed }}
      </td>
      <td class="text-right">
        {{ adjustedSpeed }}
      </td>
      <td class="text-right">
        {{ doneSpeed }}
      </td>
    </tr>
    </tbody>
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
            <s v-if="c.tsscState.id==2">{{c.description}}</s>
            <div v-else>{{c.description}}</div>
          </li>
        </ul>
        <p v-else>Esta historia no posee criterios de aceptacion. </p>
     </div>

     <div class="container">
      <h4>Tareas</h4>
        <ul v-if="tasks.length > 0">
          <li :key="c.id" v-for="c in tasks">
            <s v-if="c.tsscState.id==2">{{c.description}}</s>
            <div v-else>{{c.description}}</div>
          </li>
        </ul>
        <p v-else>Esta historia no posee tareas. </p>
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
      // moderator, backlog, sprint-backlog, retrospective
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
    console.log("route test",this.$route.params.groupId)
  },

  mounted(){
  },

  data(){
    return {
      selectedStory: {
        description: "",
        shortDescription: "",
        criteria: [],
      },
      tasks: [],

      modals: {
        modal0: false
      },

      checkedStories: []
    }
  },

  methods: {
    detailStory(s){
      this.selectedStory = s;
      this.retrieveTasks(s.id)
      this.modals.modal0 = true
    },

    retrieveTasks(id){
      console.log("method in")
      axios
      .get("/games/" + this.$route.params.gameId + "/stories/" + id + "/tasks/")
      .then(
        (res) => {
          console.log("answer in")
          this.tasks = res.data
        }
      )
    }

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
    },

    expectedSpeed(){
      let sum = 0
      this.stories.forEach(s => {
        if(s.initialEstimation){
          sum += Number(s.initialEstimation)
        }
      })
      return sum

    },

    adjustedSpeed(){
      let sum = 0
      this.stories.forEach(s => {
        if(s.adjustedEstimation){
          sum += Number(s.adjustedEstimation)
        }
      })
      return sum
    },

    doneSpeed(){
      let sum = 0
      this.stories.forEach(s => {
        if(s.doneEstimation){
          sum += Number(s.doneEstimation)
        }
      })
      return sum
    }

  }

}
</script>

<style>
th.priority, th.points {
  width: 5%;
}

</style>
