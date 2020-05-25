<template>
  <div class="">
    <h1 class="text-center">Juegos</h1>
    <div class="elementos">
      <table class="table">
        <tr>
          <td>
            <router-link to="/stories">
              <h3 class="h3-juegos">Juego maximus, de a 4 personas por grupo historias complejas</h3>
            </router-link>
          </td>
          <td>
            <router-link to="/cronometro">
              <base-button class="btn" type="info">Cronometro</base-button>
            </router-link>
          </td>
        </tr>
        <tr>
          <td>
            <router-link to="/stories">
              <h3 class="h3-juegos">Juego avanzado, 6 personas, practicas y construccion de puentes</h3>
            </router-link>
          </td>
          <td>
            <router-link to="/cronometro">
              <base-button class="btn" type="info">Cronometro</base-button>
            </router-link>
          </td>
        </tr>
        <tr>
          <td>
            <router-link to="/stories">
              <h3 class="h3-juegos">Juego sencillo parque natural de parejas</h3>
            </router-link>
          </td>
          <td>
            <router-link to="/cronometro">
              <base-button class="btn" type="info">Cronometro</base-button>
            </router-link>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "starter-page",
  data() {
    return {};
  }
};
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
