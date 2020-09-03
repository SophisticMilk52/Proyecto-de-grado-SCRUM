<template>
  <div class="hello">
    <h1 class="text-center">Cronometro</h1>
    <div class="elementos">
      <table class="table table-striped">
        <tr >
          <th :key="cron.id" v-for="cron in cronometros">
            <h3 class="text-center">{{cron.name}}</h3>
          </th>
        </tr>
        <tr >
          <td :key="cron.id" v-for="cron in cronometros">
            <table >
              <tr :key="item.id" v-for=" item in intervals[cron.id]">
                <div>
                <th>
                  <h4>{{item.name}}</h4>
                </th>
                <th>
                  <h4>{{item.duration}} segundos</h4>
                </th>
                </div>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "../../plugins/axios";
import Vue from "vue";
export default {
  data() {
    return {
      cronometros: [],
      intervals: {

      },
    };
  },
  created() {
    // Get TimeControls(cronometros)
    axios
      .get("/games/" + this.$route.params.id + "/timecontrols/")
      .then((res) => {
        console.log(res.data);
        this.cronometros = res.data;
        this.cronometros.forEach((element) => {
          axios
            .get(
              "/games/" +
                this.$route.params.id +
                "/timecontrols/" +
                element.id +
                "/timeintervals/"
            )
            .then((rest) => {
              Vue.set(this.intervals,element.id,rest.data)
              console.log(rest.data);
            });
        });
      });

    // Get TimeIntervals
  },
  methods: {},
  computed: {
    // a computed getter
    filter(){
     let valores= [];
    cronometros.forEach(element => {
     valores.push( element.id)
    });
    return valores;
    }
  
  },
};
</script>

<style scoped>
b-table {
  width: 1002px;
  height: 100%;
}
.elementos {
  background-color: white;
  border-radius: 25px;
}

table {
  margin: 0;
  padding: 0;
  width: 100%;
  align-content: center;
  text-align: center;
}
</style>