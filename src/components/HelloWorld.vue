<template>
  <div class="hello">
  <ul>
    <li v-for="(value,index) in info" :key="index">
      {{value}}
    </li>
  </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      info: "Valorcito"
    };
  },
  name: "HelloWorld",
  props: {
    msg: String
  },
  methods: {
    dividirgrupos(){

    }
  },
  mounted() {
    axios
      .get("http://pi2sis.icesi.edu.co/scrum/api/games/70/groups/")
      .then(response => {
        console.log(response);
        this.info = response.data;
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
