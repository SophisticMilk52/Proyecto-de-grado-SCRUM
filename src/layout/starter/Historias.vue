<template>
  <div class>
    <h1 class="text-center">Historias</h1>
    <div class="elementos">
      <table class="table">
        <tr :key="story.id" v-for="story in stories">
          <td>
            <!-- <router-link :to="'/juegos/'+idJuego+'/stories/'+story.id">
              <h3 class="h3-historias">{{story.shortDescription}}</h3>
            </router-link> -->
              <h3 class="h3-historias" @click="selectStory(story)">{{story.shortDescription}}</h3>
          </td>
          <td>
            <router-link to="/stories">
              <base-button type="info" @click="notifyTopCenter">Compartir</base-button>
            </router-link>
          </td>
          <!-- <td>
            OPTION 1: HAVE THE TEXT SHOW MORE INFO, AND A BUTTON THAT REDIRECTS EVERYONE TO ESTIMATION PAGE
            <router-link to="/stories">
              <base-button type="info" @click="notifyTopCenter">Más Información</base-button>
            </router-link>

            OPTION 2: HAVE BUTTON THAT SHOWS MODAL WITH MORE INFO
            <base-button type="primary" @click="modals.modal0 = true">Launch demo modal</base-button>
            <Modal :show.sync="modals.modal0" type="notice">
              <template slot="header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              </template>
              <div>{{story.description}}</div>
              <template slot="footer">
                <base-button type="secondary" @click="modals.modal0 = false">Close</base-button>
                <base-button type="primary">Save changes</base-button>
              </template>
            </Modal>
          </td> -->
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
import Modal from "../../components/Modal";
export default {
  components: {
    Modal
  },
  data() {
    return {
      idJuego: this.$route.params.id,
      idHistoria: this.$route.params.id2,
      stories: [],

      received_messages: [],
      send_message: "Alvaro1",
      connected: false,
      modals: {
        modal0: false
      }
    };
  },
  methods: {
    selectStory(story) {
      const payload = {
        storyTitle: story.shortDescription,
        storyId: story.id,
        groupId: this.$store.state.currentUser.tsscGroup.id
      }
      if (this.stompClient && this.stompClient.connected) {
        this.stompClient.send("/app/selectStory", JSON.stringify(payload), {});
      }
    },

    notifyBeforeRedirect(storyTitle) {
      this.$notify({
        verticalAlign: "top",
        horizontalAlign: "center",
        message: "Vamos a estimar la siguiente historia: " + storyTitle,
      });
    },
    notifyTopCenter() {
      this.$notify({
        verticalAlign: "top",
        horizontalAlign: "center",
        message: "Vamos a trabajar en la Historia del rock",
      });
    },
    send() {
      console.log("Send message:" + this.send_message);
      if (this.stompClient && this.stompClient.connected) {
        const msg = { name: this.send_message };
        this.stompClient.send("/app/hello", JSON.stringify(msg), {});
      }
    },
    // Only thing that occurs to me for this one is find a way to place these components on an macro component, and have the inner components
    // trigger its methods whenever necessary.
    connect() {
      this.socket = new SockJS("http://localhost:8090/agile-websocket");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
        {},
        (frame) => {
          this.connected = true;
          console.log(frame);
          // this.stompClient.subscribe("/topic/greetings", (tick) => {
          this.stompClient.subscribe("/topic/storySelect", (tick) => {
            console.log(tick);
            // this.received_messages.push(JSON.parse(tick.body).content);
            // confirm("I am printing " + JSON.parse(tick.body).content);
            let payload = JSON.parse(tick.body);
            if(payload.groupId === this.$store.state.currentUser.tsscGroup.id){
              this.notifyBeforeRedirect(payload.storyTitle);
              // Possibly replace with confirm notification (or other similar one with just an ok option)
              // this.$router.push({name: 'Estimacion', params: {gameId: this.$route.params.gameId, storyId: payload.storyId}});
              this.$router.push({path: '/juegos/'+this.$route.params.id+'/stories/'+payload.storyId+'/estimation'});
            }



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
    this.send_message = this.$store.state.currentUser.name;
    axios.get("/games/" + this.idJuego + "/stories/").then((res) => {
      console.log(this.idJuego + "hay algo?");
      this.stories = res.data;
    });
    this.connect();
    console.log("Apparently I am now connected!");
  },
  beforeDestroy() {
    this.disconnect();
  },
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
