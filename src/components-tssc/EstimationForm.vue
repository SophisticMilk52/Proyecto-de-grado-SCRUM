<template>
<div>
  <div class="story-information" v-if="story != null">
    <h1 class="text-center">
      <strong>{{this.story.shortDescription}}</strong>
    </h1>

    <h2>Descripción:</h2>

    <h4>{{this.story.description}}</h4>

    <br />

    <h2>Criterios de Aceptación:</h2>

    <ul>
      <li :key="c.id" v-for="c in criteria">
        <h4>{{c.description}}</h4>
      </li>
    </ul>

  </div>
  <div>
    <h3 class="text-center">
      Seleccione la cantidad de esfuerzo necesaria para realizar la historia de usuario
    </h3>
  </div>
  <div class="elementos container">
    <div class="row">
      <div class="col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 my-btn" :key="b"
      v-for="b in buttons">
        <base-button class="animation-on-hover" type="info" @click="change(b)">
          {{b}}
        </base-button>
      </div>
    </div>
    <div class="estimation">
      <h1 value class="valor">{{points}}</h1>
    </div>
    <form @submit.prevent>
      <div class="elementos">
        <h3 >Criterios de Aceptacion</h3>
        <base-input>
          <textarea
            class="form-control" v-model="newCriteria" rows="3"
            :placeholder="type == 'group' ? groupCriteriaPH : estimationCriteriaPH" />
        </base-input>
      </div>

      <div class="elementos">
        <h3>Tareas</h3>
        <base-input>
          <textarea
            class="form-control" v-model="newTasks" rows="3"
            :placeholder="type == 'group' ? groupTaskPH : estimationTaskPH" />
        </base-input>
      </div>
    </form>

    <div class="text-center">
      <h4>¿Desea guardar esta estimación?</h4>
      <base-button v-if="type!='group'" class="animation-on-hover" type="success" v-on:click="$emit('cancel')">
        Cancelar
      </base-button>
      <base-button type="success" class="animation-on-hover" v-bind:disabled="dis" value
      v-on:click="$emit('post', {points, newCriteria, newTasks})">
        Confirmar
      </base-button>
    </div>
  </div>

</div>

</template>

<script>
export default {
  props: {
    story: {
      type: Object
    },
    criteria: {
      type: Array
    },
    estimation: {
      type: Object
    },
    oldPoints: {
      type: String,
      default: ""
    },
    oldCriteria: {
      type: String,
      default: ""
    },
    oldTasks: {
      type: String,
      default: ""
    },
    type: {
      type: String
    },
  },
  created() {
    console.log("FORM CREATE")
    console.log("Form Level - Estimation", this.estimation)
    // console.log("Shit started")
    // console.log(this.estimation)
    // console.log(this.estimation.stvalue)
    // if(this.estimation != undefined && this.estimation !=null){
    //   this.change(this.estimation.stvalue)
    // console.log(this.points)
    //   if(this.estimation.criteria!=null) this.newCriteria = this.estimation.criteria
    // // console.log(this.newCriteria)
    //   if(this.estimation.tasks!=null) this.newTasks = this.estimation.tasks
    // }

    // if(this.type == "reestimation"){
    //   this.change(this.oldPoints)
    //   this.newCriteria = this.oldCriteria
    //   this.newTasks = this.oldTasks
    // }

    if(this.points != "") dis == true

  },
  data() {
    return {
      buttons: [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, "Inf."],
      dis: true,
      points: this.oldPoints,
      newCriteria: this.oldCriteria,
      newTasks: this.oldTasks,
      estimationCriteriaPH: "Escriba las tareas que considera son necesarias para completar esta historia.",
      estimationTaskPH: "Escriba los criterios faltantes que considera son necesarias para completar esta historia.",
      groupCriteriaPH: "Separe cada nuevo criterio con punto y coma (;)",
      groupTaskPH: "Separe cada tarea con punto y coma (;)"
    }
  },
  methods: {
    change(value) {
      console.log("Active")
      var button = document.getElementsByClassName("Button");
      var sts = value.toString();
      this.points = sts;
      this.dis = false;
    },
  },



}
</script>

<style>

</style>
