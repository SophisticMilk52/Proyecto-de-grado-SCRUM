<template>
  <div class>
    <h1 class="text-center">Mi equipo: Grupo 2</h1>
    <div class="elementos">
      <br />
      <h3 class="text-center">Integrantes</h3>
      <table class="table">
        <tr>
          <td>
            <h3 class="text-center">Alvaro</h3>
          </td>
          <td>
            <h3 class="text-center">Pendiente</h3>
          </td>
        </tr>
        <tr>
          <td>
            <h3 class="text-center">Alejandro</h3>
          </td>
          <td>
            <h3 class="text-center">Respondio</h3>
          </td>
        </tr>
        <tr>
          <td>
            <h3 class="text-center">Jorge</h3>
          </td>
          <td>
            <h3 class="text-center">Pnediente</h3>
          </td>
        </tr>
        <tr>
          <td>
            <h3 class="text-center">Santiago</h3>
          </td>
          <td>
            <h3 class="text-center">Respondio</h3>
          </td>
        </tr>
      </table>
    </div>
    <router-link to="/resultados">
      <base-button block type="info">continuar</base-button>
    </router-link>
  </div>
</template>
<script>
export default {};
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
</style>