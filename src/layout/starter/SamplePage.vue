<template>
  <div class>
    <h1 class="text-center">Juegos</h1>
    <div class="elementos">
      <table class="table">
        <tr :key="juego.id" v-for="juego in juegos">
          <td>
            <router-link :to="'/juegos/'+juego.id">
              <h3 class="h3-juegos">{{juego.name}}</h3>
            </router-link>
          </td>
          <td>
              <router-link :to="'/cronometro/'+juego.id">
              <base-button class="btn" type="info">Cronometro</base-button>
            </router-link>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "../../plugins/axios";
export default {
  name: "starter-page",
  data() {
    return {
      juegos:[]
    };
  },
  created() {
    axios.get("/games/").then(res => {
      this.juegos = res.data;
    });
  }
};
</script>
<style scoped>
.elementos {
  background-color: white;
  border-radius: 25px;
}

.tabla {
  margin: 0;
  padding: 0;
  width: 100%;
}
</style>
