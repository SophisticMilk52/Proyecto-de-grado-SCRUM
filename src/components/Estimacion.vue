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
            <button id="btn" value=1 onclick="cambioValorEstimacion" >1</button>
            <button id="btn" value=2 onclick>2</button>
             <button id="btn" value=3 onclick>3</button>
             <button id="btn" value=5 onclick>5</button>
        </tr>
        <tr>
            <button id="btn" value=8>8</button>
            <button id="btn" value=13>13</button>
             <button id="btn" value =21>21</button>
            <button id="btn" value=34>34</button>
        </tr>
        <tr>
             <button id="btn" value=55>55</button>
             <button id="btn" value=99>99</button>
              <button id="btn" value=∞>∞</button>
           <button id="btn" value=...>...</button>
        </tr>
    </table>
        </div>
    <div class="estimation">
        <h5 id="h5" value=""> {{valor}}</h5>
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
methods: {
cambioValorEstimacion(btn){
btn.value
        }
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