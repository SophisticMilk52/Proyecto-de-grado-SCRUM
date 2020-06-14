<template>
  <div class>
    <h1 class="text-center">Resultados</h1>
    <div class="elementos">
      <table class="table">
        <tr>
          <td>
            <h3 class="text-center">Alvaro</h3>
          </td>
          <td>
            <h3 class="text-center">3</h3>
          </td>
        </tr>
        <tr>
          <td>
            <h3 class="text-center">Alejandro</h3>
          </td>
          <td>
            <h3 class="text-center">2</h3>
          </td>
        </tr>
        <tr>
          <td>
            <h3 class="text-center">Jorge</h3>
          </td>
          <td>
            <h3 class="text-center">10</h3>
          </td>
        </tr>
        <tr>
          <td>
            <h3 class="text-center">Santiago</h3>
          </td>
          <td>
            <h3 class="text-center">20</h3>
          </td>
        </tr>
      </table>
    </div>
      <div class="text-center">
    <router-link to="/estimation">
      <base-button type="success">Re-estimar</base-button>
    </router-link>

    <router-link to="/stories">
      <base-button type="success">Continuar</base-button>
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

.tabla {
  margin: 0;
  padding: 0;
  width: 100%;
}
</style>