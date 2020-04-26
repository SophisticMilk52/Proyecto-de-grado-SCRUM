<template>
<!--Aqui va el html de la segunda vista-->
    <div>
        <h3>
            Seleccione la cantidad de esfuerzo que desea estima va a tomar para realizar la historia de usuario.
        </h3>
        <div>
    <table>
        <!-- Debe hacerse con Bootstrap o similar para que sea reactiva.
        es decir, que cambie con el tamaño. -->
        <tr>
            <button id="btn" value=2 @click=change(1)>1</button>
            <button id="btn" value=2 @click=change(2)>2</button>
             <button id="btn" value=3 @click=change(3)>3</button>
             <button id="btn" value=5  @click=change(5)>5</button>
        </tr>
        <tr>
            <button id="btn" value=8 @click=change(8)>8</button>
            <button id="btn" value=13 @click=change(13)>13</button>
             <button id="btn" value =21  @click=change(21)>21</button>
            <button id="btn" value=34  @click=change(34)>34</button>
        </tr>
        <tr>
             <button id="btn" value=55 @click=change(55)>55</button>
             <button id="btn" value=99  @click=change(99)>99</button>
              <button id="btn" value=∞ @click=change(100)>∞</button>
           <button id="btn" value=... @click=change(101)>...</button>
        </tr>
    </table>
        </div>
    <div class="estimation">
        <h5 id="h5" value=""> {{data}}</h5>
    </div>
    <div>
        ¿Desea guardar esta estimación?
        <br>
            <button>Cancelar</button>
             <button>Confirmar</button>
    </div>

    </div>
</template>
<script>

export default {
      data() {
    return {
        buttons:[1,2,3,5,8,13,21,34,55,99,"∞","..."],
    data: "",
    minLen:12
    };
  },
  methods: {
    change: function(value) {
 
      if(value==100){
        this.data="∞"
      this.data.value=sts
      }else if(value==101){
          this.data="..."
      this.data.value=sts 
      }else{
    var sts=(value).toString();
      this.data=sts
      this.data.value=sts
    }}
  }
}



</script>

<style scoped>
    table{
        text-align : center;
        margin-left: auto;
        margin-right: auto;
        font-size: 2em;
    }
    td{
        width: 100px;
    }
    .estimation{
        font-size: 5em;
    }
    .btn{
        width: 40px;
        height: 40px;
        margin: 5px;


    }
</style>