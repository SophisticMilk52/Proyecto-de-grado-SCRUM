<template>
  <div class>
    <StoryList :key="storyListKey" type="backlog" :stories="stories" v-on:select="selectStory" v-on:refresh="refresh">
      <template v-slot:header>
        <h1 class="text-center"><strong>Backlog</strong></h1>
      </template>
      <template v-slot:description>
        <h4 class="text-center">
          Seleccione historias y estime en puntos la cantidad de esfuerzo que necesitara para
          entregarlas completas al cliente. Además, adicione criterios de aceptación que
          crea que falten, y escriba las tareas que debe realizar para cumplir la historia.
        </h4>
      </template>
    </StoryList>
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
      stories: [],
      storyListKey: 0,

      received_messages: [],
      send_message: "Alvaro1",
      connected: false,
    };
  },
  methods: {
    refresh(){
      axios
      .get("/games/" + this.$route.params.gameId + "/stories/group/" + this.$route.params.groupId)
      .then(res => this.stories = res.data.sort(
        (a,b) => {
          if(a.stNumber > b.stNumber) return 1
          if(a.stNumber < b.stNumber) return -1
          return 0
        }
      ))
      this.storyListKey = this.storyListKey + 1
    },

    selectStory(story) {
      // const payload = {
      //   storyTitle: story.shortDescription,
      //   storyId: story.id,
      //   groupId: this.$store.state.currentUser.tsscGroup.id
      // }
      // if (this.stompClient && this.stompClient.connected) {
      //   if(confirm("¿Esta seguro que quiere que su equipo empiece a estimar esta historia?")){
      //     this.stompClient.send("/app/selectStory", JSON.stringify(payload), {});
      //   }
      // }
      this.$router.push(
        {
          name: 'Estimation',
          params: {
            gameId: this.$route.params.gameId,
            groupId: this.$route.params.groupId,
            storyId: story.id
          }
        }
      );

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
    .then(res => this.stories = res.data.sort(
      (a,b) => {
        if(a.stNumber > b.stNumber) return 1
        if(a.stNumber < b.stNumber) return -1
        return 0
      }
    ))

    // this.connect();
    // console.log("Apparently I am now connected!");
  },
  beforeDestroy() {
    // this.disconnect();
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
