<template>
  <div class>
    <h1 class="text-center">Instructor</h1>
    <div class="elementos">
      <table class="table">
        <tr>
          <td>
            <h3 class="h3-juegos">Participantes</h3>
          </td>

          <td>
            <h3 class="h3-juegos">Alvaro</h3>
          </td>
          <td>
            <base-dropdown title="Participantes" title-classes="btn btn-info">
              <a class="dropdown-item" href="#">Alejandro</a>
              <a class="dropdown-item" href="#">Alvaro</a>
              <a class="dropdown-item" href="#">Mateo</a>
              <a class="dropdown-item" href="#">Fracisco</a>
              <a class="dropdown-item" href="#">Maria</a>
              <a class="dropdown-item" href="#">Fernanda</a>
              <a class="dropdown-item" href="#">Andres</a>
            </base-dropdown>
          </td>
        </tr>
        <tr>
          <td>
            <h3 class="h3-juegos">Grupos</h3>
          </td>

          <td>
            <h3 class="h3-juegos">Grupo 2</h3>
          </td>
          <td>
            <base-dropdown title="Grupos" title-classes="btn btn-info">
              <a class="dropdown-item" href="#">Grupo 1</a>
              <a class="dropdown-item" href="#">Grupo 2</a>
              <a class="dropdown-item" href="#">Grupo 3</a>
            </base-dropdown>
          </td>
        </tr>
      </table>
      <div class="text-center">
        <base-button type="info">Guardar Participante</base-button>
      </div>
    </div>

    <div class="text-center">
      <h3 class="asig">Asignacion aleatoria de participantes:</h3>
      <base-button class="text-center" type="info">Aleatorio</base-button>
    </div>
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
.asig {
  margin: 0;
  float: left;
}
</style>