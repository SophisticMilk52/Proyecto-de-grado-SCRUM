<template>
  <div class>
    <h1 class="text-center">Historias</h1>
    <div class="elementos">
      <table class="table">
        <tr>
          <td>
            <router-link to="/story">
              <h3 class="h3-historias">Historia del aeropuerto</h3>
            </router-link>
          </td>
        </tr>
        <tr>
          <td>
            <router-link to="/story">
              <h3 class="h3-historias">Historia del concierto de rock</h3>
            </router-link>
          </td>
        </tr>
        <tr>
          <td>
            <router-link to="/story">
              <h3 class="h3-historias">Historia de banco central</h3>
            </router-link>
          </td>
        </tr>
      </table>
    </div>
    <base-dropdown block class="drop" title="Instrucciones" title-classes="btn btn-info">
      <a class="dropdown-item" href="#">Baja Resolucion</a>
      <a class="dropdown-item" href="#">Mediana Resolucion</a>
      <a class="dropdown-item" href="#">Alta Resolucion</a>
    </base-dropdown>
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

.drop {
  margin-left: 20px;
}
</style>