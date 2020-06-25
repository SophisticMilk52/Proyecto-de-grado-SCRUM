<template>
  <div class>
    <h1 class="text-center">Historias</h1>
    <div class="elementos">
      <table class="table">
        <tr :key="story.id" v-for="story in stories">
          <td>
            <router-link :to="'/juegos/'+idJuego+'/stories/'+story.id">
              <h3 class="h3-historias">{{story.shortDescription}}</h3>
            </router-link>
          </td>
          <td>
            <router-link to="/stories">
              <base-button type="info" @click="notifyTopCenter">Compartir</base-button>
            </router-link>
          </td>
        </tr>
      </table>
    </div>
    <base-dropdown block class="drop" title="Instrucciones" title-classes="btn btn-info">
      <a class="dropdown-item" href="#">Baja Resolucion</a>
      <a class="dropdown-item" href="#">Mediana Resolucion</a>
      <a class="dropdown-item" href="#">Alta Resolucion</a>
    </base-dropdown>
  </div>
</template>
  
  <script>
import axios from "../../plugins/axios";
export default {
  data() {
    return {
      idJuego: this.$route.params.id,
      idHistoria: this.$route.params.id2,
      stories: []
    };
  },
  methods: {
    notifyTopCenter() {
      this.$notify({
        verticalAlign: "top",
        horizontalAlign: "center",
        message: "Vamos a trabajar en la Historia del rock"
      });
    }
  },
  created() {
    axios.get("/games/" + this.idJuego + "/stories/").then(res => {
      console.log(this.idJuego + "hay algo?");
      this.stories = res.data;
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

.drop {
  margin-left: 20px;
}
</style>