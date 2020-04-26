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
 body {
    font-family: tahoma;
    color:#282828;
    margin: 0px;
  }
  
  .nav-bar {
    background: linear-gradient(-90deg, #84CF6A, #16C0B0);
    height: 60px;
    margin-bottom: 15px;
  }

  .product {
    display: flex;
    flex-flow: wrap;
    padding: 1rem;
  }

  img {
    border: 1px solid #d8d8d8;
    width: 70%;
    margin: 40px;
    box-shadow: 0px .5px 1px #d8d8d8;
  }
  
  .product-image {
    width: 80%;
  }
  
  .product-image,
  .product-info {
    margin-top: 10px;
    width: 50%;
  }
  
  .color-box {
    width: 40px;
    height: 40px;
    margin-top: 5px;
  }
  
  .cart {
    margin-right: 25px;
    float: right;
    border: 1px solid #d8d8d8;
    padding: 5px 20px;
  }
  

  
  .disabledButton {
    background-color: #d8d8d8;
  }
  
  .review-form {
    width: 400px;
    padding: 20px;
    margin: 40px;
    border: 1px solid #d8d8d8;
  }
  
  input {
    width: 100%;  
    height: 25px;
    margin-bottom: 20px;
  }
  
  textarea {
    width: 100%;
    height: 60px;
  }

  .tab {
    margin-left: 20px;
    cursor: pointer;
  }

  .activeTab {
    color: #16C0B0;
    text-decoration: underline;
  }
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
 
   #btn{
    margin-top: 20px;
  
    height: 40px;
    width: 100px;
    font-size: 40px;
    }
</style>