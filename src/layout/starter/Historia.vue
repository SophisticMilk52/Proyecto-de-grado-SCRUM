<template>
  <div class="hello">
    <!-- <ul> -->
    <!---Alvaro aqui dejo en pantalla lo que saque de json pero el codigo de la llamda es el de abajo el de axios---->
    <!-- <li v-for="(value,index) in info" :key="index"> -->
    <!-- {{value}} -->
    <!-- </li> -->
    <!-- </ul> -->
    <br />

    <h2 class="text-center">Historia de usuario #1: Aeropuerto</h2>

    <div class="elementos">
      <br />
      <h2>Descripcion:</h2>
      <p>
        Se espera que se entregue un aeropuerto con las edificaciones y vehiculos necesarios para su operación.
        Hay que tener en cuenta la estructura del diseño y los materiales entregados previamente.
      </p>
      <br />

      <h2>Criterios de Aceptación:</h2>
      <ul>
        <li>No debe haber huecos de espacio en el aeropuerto.</li>
        <li>La pista debe ser lo suficientemente grande para que un avion grande pueda movilizarse dentro de ella, sin trabarse con otras estructuras.</li>
      </ul>
      <br>
    </div>
    <br />
    <div class="text-center">
    <router-link to="/story">
      <base-button type="success">Siguiente Historia</base-button>
    </router-link>

    <router-link to="/estimation">
      <base-button type="success">Realizar estimacion</base-button>
    </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.elementos {
  background-color: white;
  border-radius: 25px;
}
h2,p{
  margin-left:20px;
}
</style>