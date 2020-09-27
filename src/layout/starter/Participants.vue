<template>
<div>
  <h1 class="text-center"><strong>Participantes</strong></h1>
  <base-input class="col-md-4" label="State">
    <select id="inputState" class="form-control">
      <option selected>Choose...</option>
      <option>...</option>
    </select>
  </base-input>
</div>

</template>

<script>
import axios from '../../plugins/axios'
export default {
  created(){

  },
  mounted(){
    axios
    .get("/games/" + this.$route.params.id + "/groups/")
    .then(res => {
        console.log(res.data);
        this.groups = res.data;
      });
  },
  data(){
    return {
      groups
    }
  },
  methods: {

  }
}
</script>

<style>

</style>
