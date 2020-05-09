<template>
  <!--Aqui va el html de la segunda vista-->
  <div class="hello">
    <div class="hello2">
      <br>
    <h3>Seleccione la cantidad de esfuerzo necesaria para realizar la historia de usuario</h3>
    <div>
      <table>
        <!-- Debe hacerse con Bootstrap o similar para que sea reactiva.
        es decir, que cambie con el tamaño.-->
        <tr>
          <td>
            <button @click="change(1)">1 </button>
          </td>
          <td>
            <button  @click="change(2)">2 </button>
          </td>
          <td>
            <button @click="change(3)">3 </button>
          </td>
          <td>
            <button @click="change(5)">5 </button>
          </td>
        </tr>
        <tr>
          <!-- <button id="btn" value="8" @click="change(8)">8</button>
          <button id="btn" value="13" @click="change(13)">13</button>
          <button id="btn" value="21" @click="change(21)">21</button>
          <button id="btn" value="34" @click="change(34)">34</button>-->
          <td>
            <button  @click="change(8)">8 </button>
          </td>
          <td>
            <button  @click="change(13)">13</button>
          </td>
          <td>
            <button @click="change(20)">20</button>
          </td>
          <td>
            <button  @click="change(30)">30</button>
          </td>
        </tr>
        <tr>
          <!-- <button id="btn" value="55" @click="change(55)">55</button>
          <button id="btn" value="99" @click="change(99)">99</button>
          <button id="btn" value="∞" @click="change(100)">∞</button>
          <button id="btn" value="..." @click="change(101)">...</button>-->
          <td>
            <button  @click="change(40)">40</button>
          </td>
           <td>
            <button  @click="change(99)">99</button>
          </td>
          <td>
            <button  @click="change(100)">∞</button>
          </td>
          <td>
            <button @click="change(101)">...</button>
          </td>
        </tr>
      </table>
    </div>
    <div class="estimation">
      <h5 value>{{data}}</h5>
    </div>
    <div>
      <p>¿Desea guardar esta estimación?</p>
      <br />


        <router-link to="/story"><b-button>Cancelar</b-button></router-link>
    
      <b-button>Confirmar</b-button>
    </div>
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
.hello{
  padding-bottom: 2cm;
  background-color:aquamarine;

}
.hello2{
  padding-bottom: 2cm;
  background-color:orangered;
  opacity: 0.8;
  border-radius: 5%;
  margin-right:100px ;
  margin-left:100px ;
}
h3{
  color: black;
  margin-left:20px;
}
p{
   color: black;
}
tr{
  padding-right:10cm;
}
h1{
  color: black;
  font:bold;
  float: left;
  margin-left: 20px;
}
button{
   border: none;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 8px;
  background-color: gray;
  color: white;
  font-size: 16px;
}
table{
  margin-left:auto; 
    margin-right:auto;
}
h5{
  color: black;
  font-size: 2cm;
}
</style>