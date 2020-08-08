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
    <button id="send" class="btn btn-default" type="submit" @click.prevent="send">Send</button>
  </div>
</template>

  <script>
import axios from "../../plugins/axios";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
export default {
  data() {
    return {
      idJuego: this.$route.params.id,
      idHistoria: this.$route.params.id2,
      stories: [],

      received_messages: [],
      send_message: "Alvaro",
      connected: false,
    };
  },
  methods: {
    notifyTopCenter() {
      this.$notify({
        verticalAlign: "top",
        horizontalAlign: "center",
        message: "Vamos a trabajar en la Historia del rock"
      });
    },
    send() {
      console.log("Send message:" + this.send_message);
      if (this.stompClient && this.stompClient.connected) {
        const msg = { name: this.send_message };
        this.stompClient.send("/app/hello", JSON.stringify(msg), {});
      }
    },
    connect() {
      this.socket = new SockJS("http://localhost:8090/agile-websocket");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
        {},
        (frame) => {
          this.connected = true;
          console.log(frame);
          this.stompClient.subscribe("/topic/greetings", (tick) => {
            console.log(tick);
            this.received_messages.push(JSON.parse(tick.body).content);
            confirm("I am printing " + JSON.parse(tick.body).content);
          });
        },
        (error) => {
          console.log(error);
          this.connected = false;
        }
      );
    },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
      this.connected = false;
    },
    tickleConnection() {
      this.connected ? this.disconnect() : this.connect();
    },

  },
  created() {
    axios.get("/games/" + this.idJuego + "/stories/").then(res => {
      console.log(this.idJuego + "hay algo?");
      this.stories = res.data;
    });
    this.connect();
    console.log("Apparently I am now connected!")
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
