<template>
  <div class>
    <h1 class="text-center">Historias</h1>
    <div class="elementos">
      <table class="table">
        <tr :key="story.id" v-for="story in stories">
          <td>
              <h3 class="h3-historias" @click="selectStory(story)">{{story.shortDescription}}</h3>
              <p><i>{{story.description}}</i></p>
          </td>
          <td>
            <!-- Here it will have the current score. -->
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
        modal0: false,
        story: {},
        storyCriteria: []
      },
      momo: {
        isVisible: false,
        story: {},
        storyCriteria: []
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
        if(confirm("¿Esta seguro que quiere que su equipo empiece a estimar esta historia?")){
          this.stompClient.send("/app/selectStory", JSON.stringify(payload), {});
        }
      }
    },

    getDetail(story){
      this.modals.story = story;
      console.log(story.shortDescription)
      this.modals.modal0 = true;
      // this.modals.isVisible = true;
      // axios.get(route + "/accriteria/").then(res => {
      //   this.modal.criteria = res.data;
      //   this.modal.isVisible = true;
      // });
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
