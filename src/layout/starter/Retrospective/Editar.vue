<template>
  <div class>
   <h1 class="text-center"><strong>Historia A</strong></h1>
    <div class="elementos">
      <br>
      
  
 <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Puntos Retrospectiva</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Digite los puntos retrospectivos">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Puntos Done</label>
    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Digite los puntos done">
  </div>
  <div class="form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
 <router-link to="/proceso"> <button type="submit" class="btn btn-primary">OK</button></router-link>
 </form>
</div>
 
  </div>
  </template>

<script>
export default {

}
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