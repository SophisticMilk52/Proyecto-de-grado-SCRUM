<template>
<div class>
   <h1 class="text-center"><strong> Historias Trabajadas</strong></h1>
    <div class="elementos">
      <table class="table table-hover">
        <tr>
         
            <td><h2 style="text-align:center">Historia</h2></td>
         
            <td><h2 style="text-align:center">Puntos Historia</h2></td>
         
            <td><h2 style="text-align:center">Puntos Retrospectiva</h2></td>
         
      
            <td><h2 style="text-align:center">Puntos Done</h2></td>
 
             <td><h2 style="text-align:center"> Done</h2></td>
            <td></td>
      
        </tr>
        <tr>
          <td>
              <h3  style="text-align:center"><router-link to="proceso/detalles">Historia A</router-link> </h3>
          </td>
          
            <td>
              <h3 style="text-align:center" >18</h3>
          </td>
          
            <td>
              <h3 style="text-align:center" >21 </h3>
          </td>
            <td>
              <h3 style="text-align:center" >8</h3>
          </td>
            <td>
               <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" class="larger" style="text-align:center">
          </td>
          <td>
         <router-link to="proceso/comportamiento">   <base-button type="info" style="text-align:center"> Editar</base-button></router-link>
          </td>
        </tr>
        
        
      </table>
    </div>
  

    <router-link to="/proceso/comportamiento/temporizador">   <base-button type="info" style="text-align:center"> Finalizar</base-button></router-link>
    
</div>
</template>
 
<script>
export default {

}
</script>

<style>
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
  input.larger {
        width: 50px;
        height: 50px;
      }
</style>