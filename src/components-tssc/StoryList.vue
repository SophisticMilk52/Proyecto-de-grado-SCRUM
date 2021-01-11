<template>
  <div>
    <!--  TODO: ORGANIZE TABLES BETTER ACCORDING TO TYPE PROP -->
    <!-- <h1>{{checkedStories}}</h1> -->
    <header>
      <slot name="header">
        <h1 class="text-center"><strong>Historias</strong></h1>
      </slot>
      <slot name="description">
        <h4 class="text-center">
          En esta pantalla puede visualizar las historias que inicialmente se
          desarrollaran durante el juego.
        </h4>
      </slot>
    </header>

    <!-- Tables -->
    <div class="d-flex justify-content-center" v-if="stories.length == 0">
      <div class="spinner-border" role="primary">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div v-else>
      <base-button type="info" size="sm" icon v-on:click="$emit('refresh')">
        <i class="tim-icons icon-refresh-01"></i>
      </base-button>
      <table class="table" v-if="type == 'moderator'">
        <thead>
          <tr>
            <th class="text-center priority">Numero de Ref.</th>
            <th class="story-title">Descripcion</th>
            <th class="text-center">Información</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="s.id" v-for="s in stories">
            <td class="text-center">
              {{ s.stNumber }}
            </td>
            <td>
              {{ s.shortDescription }}
            </td>
            <td class="text-center">
              <base-button
                class="btn"
                size="sm"
                type="secondary"
                v-on:click="detailStory(s)"
              >
                Más Información
              </base-button>
            </td>
          </tr>
        </tbody>
      </table>

      <table class="table" v-if="type == 'backlog'">
        <thead>
          <tr>
            <th class="text-center priority">Numero de Ref.</th>
            <th class="story-title">Descripcion</th>
            <th class="text-right points">Puntos</th>
            <th class="text-center">Información</th>
            <th class="text-center">Estimar</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="s.id" v-for="s in stories">
            <td class="text-center">
              {{ s.stNumber }}
            </td>
            <td>
              {{ s.shortDescription }}
            </td>
            <td class="text-right">
              {{ s.initialEstimation ? s.initialEstimation : "N.A." }}
            </td>
            <td class="text-center">
              <base-button
                class="btn"
                size="sm"
                type="secondary"
                v-on:click="detailStory(s)"
              >
                Más Información
              </base-button>
            </td>
            <td class="text-center">
              <base-button
                class="btn"
                size="sm"
                type="secondary"
                v-on:click="$emit('select', s)"
              >
                Estimar
              </base-button>
            </td>
          </tr>
        </tbody>
      </table>

      <table class="table" v-if="type == 'develop'">
        <thead>
          <tr>
            <th class="text-center priority">Numero de Ref.</th>
            <th class="story-title">Descripcion</th>
            <th class="text-right points">Puntos</th>
            <th class="text-center">Información</th>
            <th class="text-center">Criterios/Tareas</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="s.id" v-for="s in stories">
            <td class="text-center">
              {{ s.stNumber }}
            </td>
            <td>
              {{ s.shortDescription }}
            </td>
            <td class="text-right">
              {{ s.initialEstimation ? s.initialEstimation : "N.A." }}
            </td>
            <td class="text-center">
              <base-button
                class="btn"
                size="sm"
                type="secondary"
                v-on:click="detailStory(s)"
              >
                Más Información
              </base-button>
            </td>
            <td class="text-center">
              <base-button
                class="btn"
                size="sm"
                type="secondary"
                v-on:click="$emit('select', s)"
              >
                Modificar
              </base-button>
            </td>
          </tr>
        </tbody>
      </table>

      <table class="table" v-if="type == 'sprint-backlog'">
        <thead>
          <tr>
            <th class="text-center priority">Numero de Ref.</th>
            <th class="story-title">Descripcion</th>
            <th class="text-right points">Puntos</th>
            <th class="text-center">Información</th>
            <th class="text-center">Incluir en el Sprint</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="s.id" v-for="s in stories">
            <td class="text-center">
              {{ s.stNumber }}
            </td>
            <td>
              {{ s.shortDescription }}
            </td>
            <td class="text-right">
              {{ s.initialEstimation ? s.initialEstimation : "N.A." }}
            </td>
            <td class="text-center">
              <base-button
                class="btn"
                size="sm"
                type="secondary"
                v-on:click="detailStory(s)"
              >
                Más Información
              </base-button>
            </td>
            <td class="text-center">
              <input
                type="checkbox"
                :id="s.id"
                :value="s.id"
                v-model="checkedStories"
              />
            </td>
          </tr>
        </tbody>
        <tr>
          <td colspan="2">
            <strong>Total:</strong>
          </td>
          <td class="text-right">
            <strong>{{ pointSum }}</strong>
          </td>
          <td colspan="2"></td>
        </tr>
      </table>

      <table class="table" v-if="type == 'retrospective'">
        <thead>
          <tr>
            <th class="text-center priority">Numero de Ref.</th>
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
              {{ s.stNumber }}
            </td>
            <td>
              {{ s.shortDescription }}
            </td>
            <td class="text-right" v-if="type != 'moderator'">
              {{ s.initialEstimation ? s.initialEstimation : "N.A." }}
            </td>
            <td class="text-right" v-if="type == 'retrospective'">
              {{ s.adjustedEstimation ? s.adjustedEstimation : "N.A." }}
            </td>
            <td class="text-right" v-if="type == 'retrospective'">
              {{ s.doneEstimation ? s.doneEstimation : "N.A." }}
            </td>
            <td class="text-center">
              <base-button
                class="btn"
                size="sm"
                type="secondary"
                v-on:click="detailStory(s)"
              >
                Ver Historia
              </base-button>
            </td>
            <td class="text-center">
              <base-button
                class="btn"
                size="sm"
                type="secondary"
                v-on:click="$emit('select', s)"
              >
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

      <div class="text-center" v-if="type == 'sprint-backlog'">
        <base-button
          v-if="!activeSprint"
          type="success"
          class="animation-on-hover"
          v-on:click="$emit('submit', checkedStories)"
        >
          Iniciar Sprint
        </base-button>
        <base-button
          v-else
          type="success"
          class="animation-on-hover"
          v-on:click="$emit('submit', checkedStories)"
        >
          Agregar historias al Sprint Activo
        </base-button>
      </div>
    </div>

    <modal :show.sync="modals.modal0">
      <template slot="header">
        <h2 class="modal-title" id="exampleModalLabel">
          {{ selectedStory.shortDescription }} (Referencia: 7-{{
            selectedStory.stNumber
          }})
        </h2>
      </template>
      <p>
        {{ selectedStory.description }}
      </p>
      <div class="container">
        <h4>Criterios de aceptación</h4>
        <ul v-if="criteria.length > 0">
          <li :key="c.id" v-for="c in criteria">
            <s v-if="c.tsscState.id == 2">{{ c.description }}</s>
            <div v-else>{{ c.description }}</div>
          </li>
        </ul>
        <p v-else>Esta historia no posee criterios de aceptacion.</p>
      </div>

      <div class="container">
        <h4>Tareas</h4>
        <ul v-if="tasks.length > 0">
          <li :key="c.id" v-for="c in tasks">
            <s v-if="c.tsscState.id == 2">{{ c.description }}</s>
            <div v-else>{{ c.description }}</div>
          </li>
        </ul>
        <p v-else>Esta historia no posee tareas.</p>
      </div>
      <div class="container">
        <img :src="defff"
        alt="Girl in a jacket" width="300" height="300" />
      </div>
    </modal>
  </div>
</template>

<script>
import axios from "../plugins/axios";
import Modal from "../components/Modal";
import BaseButton from "../components/BaseButton.vue";
export default {
  props: {
    type: {
      type: String,
      // moderator, backlog, sprint-backlog, retrospective
    },
    stories: {
      type: Array,
      default: [],
    },
    activeSprint: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Modal,
  },
  created() {
    console.log("route test", this.$route.params.groupId);
  },

  mounted() {},

  data() {
    return {
      defff: "https://drive.google.com/thumbnail?id=1S_ddER57jsSkk3YPolA6Pe8R3Jgc_8nk",
      selectedStory: {
        description: "",
        shortDescription: "",
        criteria: [],
      },
      criteria: [],
      tasks: [],

      modals: {
        modal0: false,
      },

      checkedStories: [],
    };
  },

  methods: {
    detailStory(s) {
      console.log(s);
      this.selectedStory = s;

      this.retrieveCriteria(s.id);
      this.retrieveTasks(s.id);
      this.modals.modal0 = true;
    },

    retrieveCriteria(id) {
      console.log("method in");
      axios
        .get(
          "/games/" +
            this.$route.params.gameId +
            "/stories/" +
            id +
            "/accriteria/"
        )
        .then((res) => {
          console.log("answer in");
          this.criteria = res.data;
        });
    },

    retrieveTasks(id) {
      console.log("method in");
      axios
        .get(
          "/games/" + this.$route.params.gameId + "/stories/" + id + "/tasks/"
        )
        .then((res) => {
          console.log("answer in");
          this.tasks = res.data;
        });
    },
  },

  computed: {
    pointSum() {
      if (
        this.stories == undefined ||
        this.stories == null ||
        this.stories.length == 0
      ) {
        return 0;
      } else {
        let sum = 0;
        if (this.checkedStories.length == 0) {
          return 0;
        }
        this.stories.forEach((s) => {
          if (this.checkedStories.includes(s.id)) {
            sum += s.initialEstimation;
          }
        });
        return sum;
      }
    },

    expectedSpeed() {
      let sum = 0;
      this.stories.forEach((s) => {
        if (s.initialEstimation) {
          sum += Number(s.initialEstimation);
        }
      });
      return sum;
    },

    adjustedSpeed() {
      let sum = 0;
      this.stories.forEach((s) => {
        if (s.adjustedEstimation) {
          sum += Number(s.adjustedEstimation);
        }
      });
      return sum;
    },

    doneSpeed() {
      let sum = 0;
      this.stories.forEach((s) => {
        if (s.doneEstimation) {
          sum += Number(s.doneEstimation);
        }
      });
      return sum;
    },
  },
};
</script>

<style>
th.priority,
th.points {
  width: 5%;
}
</style>
