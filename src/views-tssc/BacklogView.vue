<template>
  <div class>
    <!-- <h1 class="text-center"><strong>Historias</strong></h1>
    <div class="elementos">
      <table class="table">
        <tr :key="story.id" v-for="story in stories">
          <td>
              <h3 class="h3-historias" @click="selectStory(story)">{{story.shortDescription}}</h3>
              <p><i><strong>{{story.description}}</strong></i></p>
          </td>
          <td>
          </td>
        </tr>
      </table>
    </div> -->
    <StoryList type="backlog" :stories="stories" v-on:select="selectStory">
      <template v-slot:header>
        <h1 class="text-center"><strong>Backlog</strong></h1>
      </template>
      <template v-slot:description>
        <h4 class="text-center">
          Seleccione historias y estime en puntos la cantidad de esfuerzo que necesitara para
          entregarlas completas al cliente. Además, adicione criterios de aceptación y tareas que
          crea que falten.
        </h4>
      </template>
    </StoryList>
    <!-- <StoryList type="estimation" :gameId="this.$route.params.gameId"
    :groupId="this.$route.params.groupId" v-on:select="selectStory">
      <template v-slot:header>
        <h1 class="text-center"><strong>Backlog</strong></h1>
      </template>
      <template v-slot:description>
        <h4 class="text-center">
          Seleccione historias y estime en puntos la cantidad de esfuerzo que necesitara para
          entregarlas completas al cliente.
        </h4>
      </template>
    </StoryList> -->
  </div>
</template>

<script>
import axios from "../plugins/axios";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import Modal from "../components/Modal";
import StoryList from "../components-tssc/StoryList";
import Constant from "../constant";
export default {
  components: {
    Modal, StoryList
  },
  data() {
    return {
      idJuego: this.$route.params.gameId,
      idHistoria: this.$route.params.groupId,
      stories: [],

      received_messages: [],
      send_message: "Alvaro1",
      connected: false,
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

    notifyBeforeRedirect(storyTitle) {
      this.$notify({
        verticalAlign: "top",
        horizontalAlign: "center",
        message: "Vamos a estimar la siguiente historia: " + storyTitle,
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
      let url = "http://localhost:8090/scrum/api/agile-websocket"
      if(Constant.BASE_URL == "https://pi2sis.icesi.edu.co/scrum/api/"){
        url = "https://pi2sis.icesi.edu.co/scrum/api/agile-websocket"
      }
      this.socket = new SockJS(url);
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
        {},
        (frame) => {
          this.connected = true;
          console.log(frame);
          this.stompClient.subscribe("/topic/storySelect", (tick) => {
            console.log(tick);
            // this.received_messages.push(JSON.parse(tick.body).content);
            // confirm("I am printing " + JSON.parse(tick.body).content);
            let payload = JSON.parse(tick.body);
            if(payload.groupId === this.$store.state.currentUser.tsscGroup.id){
              this.notifyBeforeRedirect(payload.storyTitle);
              // Possibly replace with confirm notification (or other similar one with just an ok option)
              // this.$router.push({name: 'Estimacion', params: {gameId: this.$route.params.gameId, storyId: payload.storyId}});
              // this.$router.push({path: '/games/'+this.$route.params.id+'/stories/'+payload.storyId+'/estimation'});
              this.$router.push({
                name: 'Estimation',
                params: {
                  gameId: this.$route.params.gameId,
                  groupId: this.$route.params.groupId,
                  storyId: payload.storyId
                  }
              });
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
    // axios.get("/games/" + this.idJuego + "/stories/").then((res) => {
    //   console.log(this.idJuego + "hay algo?");
    //   this.stories = res.data;
    // });
    axios
    .get("/games/" + this.$route.params.gameId + "/stories/group/" + this.$route.params.groupId)
    .then(res => this.stories = res.data)

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
