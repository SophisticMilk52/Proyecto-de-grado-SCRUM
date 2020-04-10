<template>
<!--Aqui va el html de la segunda vista-->
    <div>
        <h3>
            Seleccione la cantidad de esfuerzo que desea estima va a tomar para realizar la historia de usuario.
        </h3>
    <table>
        <!-- Debe hacerse con Bootstrap o similar para que sea reactiva.
        es decir, que cambie con el tamaño. -->
        <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>5</td>
        </tr>
        <tr>
            <td>8</td>
            <td>13</td>
            <td>21</td>
            <td>34</td>
        </tr>
        <tr>
            <td>55</td>
            <td>89</td>
            <td>∞</td>
            <td>...</td>
        </tr>
    </table>

    <div class="estimation">
        13
    </div>
    <div>
        ¿Desea guardar esta estimación?
    </div>
    



    </div>
</template>
<script>
export default {
    
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
        font-size: 9em;
    }
</style>