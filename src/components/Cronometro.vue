<template>
  <div class="hello">
  <div class ="hello2">
  <br>
  <h1>
      Intervalos
  </h1>
  <br>
  <br>
  <br>
  <br>
  <table>
    <tr><router-link to="/juegos/historias"><h3>Intervalo 1: 00:02:00 </h3></router-link> </tr>
    <tr><router-link to="/juegos/historias"><h3>Intervalo 2: 00:03:00</h3></router-link></tr>
    <tr><router-link to="/juegos/historias"><h3>Intervalo 3: 00:15:00</h3></router-link> </tr>
  </table>
    </div>
  </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.hello{
  padding-bottom: 3cm;
  background-color:aquamarine;

}
.hello2{
  padding-bottom: 4cm;
  background-color:orangered;
  opacity: 0.8;
  border-radius: 5%;
  margin-right:100px ;
  margin-left:100px ;
}

h3{
  float: left;
  color: black;
  margin-left:20px;
}
tr{
 
}
h1{
  color: black;
  font:bold;
  float: left;
  margin-left: 20px;
}

</style>