<template>
  <!--Aqui va el html de la segunda vista-->
  <div class="hello">
    <div class="hello2">
      <br>
    <h3 class="text-center">Seleccione la cantidad de esfuerzo necesaria para realizar la historia de usuario</h3>
    <div class="elementos">
      <table class="table">
        <tr>
          <td class="td-pass">
               <base-button class="animation-on-hover" type="info" @click="change(1)">1</base-button>
          </td>
          <td class="td-pass">
          <base-button class="animation-on-hover" type="info" @click="change(2)">2</base-button>
          </td>
          <td class="td-pass">
            <base-button class="animation-on-hover" type="info" @click="change(3)">4</base-button>
          </td>
          <td class="td-pass">
           <base-button class="animation-on-hover" type="info" @click="change(5)">5</base-button>
          </td>
        </tr>
        <tr>
          <!-- <button id="btn" value="8" @click="change(8)">8</button>
          <button id="btn" value="13" @click="change(13)">13</button>
          <button id="btn" value="21" @click="change(21)">21</button>
          <button id="btn" value="34" @click="change(34)">34</button>-->
          <td class="td-pass">
            <base-button class="animation-on-hover" type="info" @click="change(8)">8</base-button>
          </td>
          <td class="td-pass">
         <base-button class="animation-on-hover" type="info" @click="change(13)">13</base-button>
          </td>
          <td class="td-pass">
             <base-button class="animation-on-hover" type="info" @click="change(20)">20</base-button>
          </td>
          <td class="td-pass">
            <base-button class="animation-on-hover" type="info" @click="change(30)">30</base-button>
          </td>
        </tr>
        <tr>
          <!-- <button id="btn" value="55" @click="change(55)">55</button>
          <button id="btn" value="99" @click="change(99)">99</button>
          <button id="btn" value="∞" @click="change(100)">∞</button>
          <button id="btn" value="..." @click="change(101)">...</button>-->
          <td class="td-pass">
          <base-button class="animation-on-hover" type="info" @click="change(40)">40</base-button>
          </td>
           <td class="td-pass">
        <base-button class="animation-on-hover" type="info" @click="change(99)">99</base-button>
          </td>
          <td class="td-pass">
               <base-button class="animation-on-hover" type="info" @click="change(100)">∞</base-button>
    
          </td>
          <td class="td-pass">
                 <base-button class="animation-on-hover" type="info" @click="change(101)">...</base-button>
          </td>
        </tr>
      </table>
    </div>
    <div class="estimation">
      <h1 value class="valor">{{data}}</h1>
    </div>
    <div class="final">
      <h4>¿Desea guardar esta estimación?</h4>
 
        <router-link to="/story"><base-button class="animation-on-hover" type="success">Cancelar</base-button></router-link>
    
      <base-button type="success" class="button" v-bind:disabled="dis">Confirmar</base-button>
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
      minLen: 12,
      dis: true
    };
  },
  methods: {
    change: function(value) {
        var button =    document.getElementsByClassName("Button");
      if (value == 100) {
        this.data = "∞";
       this.dis=false;
      } else if (value == 101) {
        this.data = "...";
        this.dis=false;
      } else {
        var sts = value.toString();
        this.data = sts;
        this.dis=false;
      }
    }
  }
};
</script>

<style scooped>
h1{
    size: 50cm;
}

.final{
    margin-left:9.5cm ;
}
.tabla{
    margin-left:8cm ;
}
.estimation{
     margin-left:3cm ;
}
.td-pass{
  text-align: center;
}
.valor{
  text-align: center;
  margin-right:3.5cm ;
 font-size:75px ;
}
</style>