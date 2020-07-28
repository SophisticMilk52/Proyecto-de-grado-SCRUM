<template>
  <!--Aqui va el html de la segunda vista-->
  <div class="hello">
    <div class="hello2">
      <br />
      <h3
        class="text-center"
      >Seleccione la cantidad de esfuerzo necesaria para realizar la historia de usuario</h3>
      <div class="elementos">
        <table class="table">
          <tr>
            <td class="td-pass">
              <base-button class="animation-on-hover" type="info" @click="change(1)">1</base-button>
            </td>
            <td class="td-pass">
              <base-button class="animation-on-hover" type="info" @click="change(2)">2</base-button>
            </td>
            <td class="td-pass">
              <base-button class="animation-on-hover" type="info" @click="change(3)">3</base-button>
            </td>
            <td class="td-pass">
              <base-button class="animation-on-hover" type="info" @click="change(5)">5</base-button>
            </td>
          </tr>
          <tr>
            <td class="td-pass">
              <base-button class="animation-on-hover" type="info" @click="change(8)">8</base-button>
            </td>
            <td class="td-pass">
              <base-button class="animation-on-hover" type="info" @click="change(13)">13</base-button>
            </td>
            <td class="td-pass">
              <base-button class="animation-on-hover" type="info" @click="change(21)">21</base-button>
            </td>
            <td class="td-pass">
              <base-button class="animation-on-hover" type="info" @click="change(34)">34</base-button>
            </td>
          </tr>
          <tr>
            <td class="td-pass">
              <base-button class="animation-on-hover" type="info" @click="change(55)">55</base-button>
            </td>
            <td class="td-pass">
              <base-button class="animation-on-hover" type="info" @click="change(89)">89</base-button>
            </td>
            <td class="td-pass">
              <base-button class="animation-on-hover" type="info" @click="change(144)">144</base-button>
            </td>
            <td class="td-pass">
              <base-button class="animation-on-hover" type="info" @click="change(233)">233</base-button>
            </td>
          </tr>
        </table>
      </div>
      <div class="estimation">
        <h1 value class="valor">{{data}}</h1>
      </div>
      <!-- Trigger the modal with a button -->
      <button
        type="button"
        class="btn btn-info btn-lg"
        data-toggle="modal"
        data-target="#myModal2"
      >Ver información de historia</button>

      <!-- Modal -->
      <div id="myModal2" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <!-- Modal content-->
          <div class="elementos">
            <h2 class="text-center">Historia de usuario: {{this.story.shortDescription}}</h2>
            <br />
            <h2>Descripcion:</h2>
            <p>{{this.story.description}}</p>
            <br />

            <h2>Criterios de Aceptación:</h2>
            <ul>
              <li :key="c.id" v-for="c in criteria">{{c.description}}</li>
            </ul>
            <br />
          </div>
        </div>
      </div>
      <div class="final">
        <h4>¿Desea guardar esta estimación?</h4>

        <router-link to="/story">
          <base-button class="animation-on-hover" type="success">Cancelar</base-button>
        </router-link>

        <base-button type="success" class="button" v-bind:disabled="dis">
          <router-link to="/grupo">Confirmar</router-link>
        </base-button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "../../plugins/axios";
export default {
  created() {
    let route =
      "/games/" +
      this.$route.params.gameId +
      "/stories/" +
      this.$route.params.storyId;
    axios
      .get(
        "/games/" +
          this.$route.params.gameId +
          "/stories/" +
          this.$route.params.storyId
      )
      .then(res => {
        this.story = res.data;
      });
    axios.get(route + "/accriteria/").then(res => {
      console.log(res.data);
      this.criteria = res.data;
      console.log(this.criteria);
    });
  },
  data() {
    return {
      buttons: [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233],
      data: "",
      minLen: 12,
      dis: true,
      story: {},
      criteria: []
    };
  },
  methods: {
    change: function(value) {
      var button = document.getElementsByClassName("Button");
      
        var sts = value.toString();
        this.data = sts;
        this.dis = false;
      
    }
  }
};
</script>

<style scooped>
h1 {
  size: 50cm;
}

.final {
  margin-left: 9.5cm;
}
.tabla {
  margin-left: 8cm;
}
.estimation {
  margin-left: 3cm;
}
.td-pass {
  text-align: center;
}
.valor {
  text-align: center;
  margin-right: 3.5cm;
  font-size: 75px;
}
</style>