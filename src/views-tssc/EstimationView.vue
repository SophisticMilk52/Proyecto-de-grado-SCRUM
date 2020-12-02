<template>
<div>
  <EstimationForm type="estimation" :story="story" :criteria="criteria" :tasks="tasks"
  v-on:post="postEstimation" v-on:cancel="cancel"/>
</div>
</template>
<script>
import axios from "../plugins/axios";
import EstimationForm from '../components-tssc/EstimationForm'
export default {
  components:{
    EstimationForm
  },
  created() {
    let route =
      "/games/" +
      this.$route.params.gameId +
      "/stories/" +
      this.$route.params.storyId;
    axios
    .get("/games/" + this.$route.params.gameId + "/stories/" + this.$route.params.storyId)
    .then(
      (res) => {
        this.story = res.data;
        axios
        .get(route + "/accriteria/")
        .then(
          (res2) => {
            this.criteria = res2.data;
            console.log(this.criteria);
        });
        axios
        .get(route + "/tasks/")
        .then(
          (res3) => {
            this.tasks = res3.data;
            console.log(this.criteria);
        });
    });

    // Apply props if needed
    if (this.oldScore != undefined) {
      // change(this.oldScore);
      console.log(this.oldScore)
    }
    // if (
    //   this.oldCriteria != undefined &&
    //   this.oldCriteria.length > 0
    // ) {
    //   let e = "";
    //   this.oldCriteria.forEach((c) => {
    //     e += c + "\n";
    //   });
    //   e.substr(0, e.length - 1);
    //   this.criteriaComment = e;
    // }
    // if (this.oldTasks != undefined && this.oldTasks.length > 0) {
    //   let e = "";
    //   this.oldTasks.forEach((c) => {
    //     e += c + "\n";
    //   });
    //   e.substr(0, e.length - 1);
    //   this.taskComment = e;
    // }
  },
  data() {
    return {
      buttons: [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, "Inf."],
      data: "",
      minLen: 12,
      dis: true,
      story: {},
      criteria: [],
      tasks: [],
      criteriaComment: "",
      taskComment: "",
    };
  },

  props: {
    oldScore: {type: String},
    oldCriteria: {type: Array},
    oldTasks: {type: Array}
  },

  methods: {
    postEstimation({points, newCriteria, newTasks}){
      let json = {
        stvalue: points,
        participantId: this.$store.state.currentUser.id.toString(),
        criteria: newCriteria,
        tasks: newTasks
      }

      let route = "/games/" + this.$route.params.gameId + "/groups/"
        + this.$store.state.currentUser.tsscGroup.id + "/stories/"
        + this.$route.params.storyId + "/estimations/";

      axios.post(route, json).then(
        () => {
          console.log("Post Request Complete");
          this.$router.push({ name: "GroupEstimation"});
        }
      );
    },

    cancel(){
      this.$router.push({name: 'Backlog', params: {id: this.$route.params.gameId,
            id2: this.$route.params.groupId}})
    },

    consolePrint() {
      let allCriteria = this.criteriaComment.split("\n");
      let allTasks = this.taskComment.split("\n");
      if (this.criteriaComment.length == 0) {
        allCriteria = null;
      }
      if (this.taskComment.length == 0) {
        allTasks = null;
      }
      console.log(allCriteria);
      console.log(allTasks);
    },
    addCrit() {
      console.log("SHIT");
      $("#crit").append(
        `<base-input label="Criterios de Aceptacion">
            <textarea class="form-control" id="MAYDAY" rows="3"></textarea>
          </base-input>`
      );
    },
    change: function (value) {
      var button = document.getElementsByClassName("Button");

      var sts = value.toString();
      this.data = sts;
      this.dis = false;
    },
    sendEstimation() {
      let estimation = {
        stvalue: this.data,
        participantId: this.$store.state.currentUser.id.toString(),
        // accepcrtit: this.criteriaComment.split("\n"),
        // tasks: this.taskComment.split("\n"),
        criteria: this.criteriaComment,
        tasks: this.taskComment,
      };
      // if (this.criteriaComment.length == 0) {
      //   estimation.accepcrtit = null;
      // }
      // if (this.taskComment.length == 0) {
      //   estimation.tasks = null;
      // }
      // estimation.task = this.taskComment;
      // estimation.acepcrit = this.criteriaComment;
      console.log(estimation);
      let route =
        "/games/" +
        this.$route.params.gameId +
        "/groups/" +
        this.$store.state.currentUser.tsscGroup.id +
        "/stories/" +
        this.$route.params.storyId +
        "/estimations/";
      axios.post(route, estimation).then(() => {
        console.log("Post Request Complete");
        this.$router.push({ name: "GroupEstimation" });
      });
      this.$router.push({name: 'GroupEstimation', props: {myScorer: estimation.stvalue, myCriteriar: estimation.accepcrtit, myTasksr: estimation.tasks} });
    },
  },
};
</script>

<style scooped>
h1 {
  size: 50cm;
}

/* .final {
  margin-left: 9.5cm;
} */
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
.my-btn {
  text-align: center;
}
.banner {
  background-color: #3da674;
  border-radius: 25px;
}



</style>
