<template>
  <!--Aqui va el html de la segunda vista-->
  <div>
    <h3>Seleccione la cantidad de esfuerzo que desea estima va a tomar para realizar la historia de usuario.</h3>
    <div>
      <table>
        <!-- Debe hacerse con Bootstrap o similar para que sea reactiva.
        es decir, que cambie con el tamaño.-->
        <tr>
          <td>
            <b-button variant="outline-primary" @click="change(1)">1</b-button>
          </td>
          <td>
            <b-button variant="outline-primary" @click="change(2)">2</b-button>
          </td>
          <td>
            <b-button variant="outline-primary" @click="change(3)">3</b-button>
          </td>
          <td>
            <b-button variant="outline-primary" @click="change(5)">5</b-button>
          </td>
        </tr>
        <tr>
          <!-- <button id="btn" value="8" @click="change(8)">8</button>
          <button id="btn" value="13" @click="change(13)">13</button>
          <button id="btn" value="21" @click="change(21)">21</button>
          <button id="btn" value="34" @click="change(34)">34</button>-->
          <td>
            <b-button variant="outline-primary" @click="change(8)">8</b-button>
          </td>
          <td>
            <b-button variant="outline-primary" @click="change(13)">13</b-button>
          </td>
          <td>
            <b-button variant="outline-primary" @click="change(20)">20</b-button>
          </td>
          <td>
            <b-button variant="outline-primary" @click="change(30)">30</b-button>
          </td>
        </tr>
        <tr>
          <!-- <button id="btn" value="55" @click="change(55)">55</button>
          <button id="btn" value="99" @click="change(99)">99</button>
          <button id="btn" value="∞" @click="change(100)">∞</button>
          <button id="btn" value="..." @click="change(101)">...</button>-->
          <td>
            <b-button variant="outline-primary" @click="change(40)">40</b-button>
          </td>
           <td>
            <b-button variant="outline-primary" @click="change(99)">99</b-button>
          </td>
          <td>
            <b-button variant="outline-primary" @click="change(100)">∞</b-button>
          </td>
          <td>
            <b-button variant="outline-primary" @click="change(101)">...</b-button>
          </td>
        </tr>
      </table>
    </div>
    <div class="estimation">
      <h5 id="h5" value>{{data}}</h5>
    </div>
    <div>
      ¿Desea guardar esta estimación?
      <br />


        <router-link to="/story"><button>Cancelar</button></router-link>
    
      <button>Confirmar</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      buttons: [1, 2, 3, 5, 8, 13, 21, 34, 55, 99, "∞", "..."],
      data: "",
      minLen: 12
    };
  },
  methods: {
    change: function(value) {
      if (value == 100) {
        this.data = "∞";
        this.data.value = sts;
      } else if (value == 101) {
        this.data = "...";
        this.data.value = sts;
      } else {
        var sts = value.toString();
        this.data = sts;
        this.data.value = sts;
      }
    }
  }
};
</script>

<style scoped>
.disabledButton {
  background-color: #d8d8d8;
}
table {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  font-size: 2em;
}

h5 {
  font-size: 5rem;
  margin: 0;
}

#btn {
  margin-top: 20px;
  height: 40px;
  width: 100px;
  font-size: 40px;
}
</style>