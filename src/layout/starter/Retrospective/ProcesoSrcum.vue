<template>
<div class>
   <h1 class="text-center"><strong> Historias Trabajadas</strong></h1>
    <div class="elementos">
      <table class="table">
      <thead class="table-head">
        <tr>
          <th style="text-align:center">Historia</th>
          <th style="text-align:center">Informacion</th>
          <th style="text-align:center">Puntos Historia</th>
          <th style="text-align:center">Puntos Retrospectiva</th>
          <th style="text-align:center">Puntos Done</th>
          <th style="text-align:center">Done</th>
        </tr>
      </thead>
      <tbody>
        <tr>
           <td style="text-align:center" >Historia A  </td>            
         <td style="text-align:center"><base-button @click='retrieveCriteria()'>mas informacion</base-button></td>
           <td style="text-align:center" >18</td>          
            <td style="text-align:center" >21 </td>
               <td style="text-align:center" >8</td>
            <td style="text-align:center"><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" class="larger" style="text-align:center"></td>
          <td style="text-align:center"><router-link to="proceso/edit">   <base-button class="btn" type="primary" >Editar</base-button></router-link></td>
           </tr>
               <tr>
        <td style="text-align:center" >Totales</td>  
        <td></td>          
           <td style="text-align:center" >18</td>          
            <td style="text-align:center" >21 </td>
               <td style="text-align:center" >8</td>
                  </tr>
      </tbody>
    </table>
     <modal :show.sync="modals.modal0">
     <template slot="header">
        <h5 class="modal-title" id="exampleModalLabel">Criterios de Aceptación</h5>
     </template>
     <div>
      <ul v-if="currentCriteria.length > 0">
        <li :key="c.id" v-for="c in currentCriteria">
          {{c.description}}
        </li>
      </ul>
      <p v-else>Esta historia no posee criterios de aceptacion. </p>
     </div>
     <template slot="footer">
         <base-button type="secondary" @click="modals.modal0 = false">Close</base-button>
     </template>
   </modal>
    </div>
    <router-link to="/proceso/resultados">   <base-button class="btn" type="primary" >Finalizar</base-button></router-link>
    
</div>
</template>
 
<script>
import axios from '../../../plugins/axios'
import Modal from '../../../components/Modal'
export default {
  components: {
    Modal
  },
  created(){
    this.currentCriteria = []
  },
  mounted(){
    axios
    .get("/games/" + this.$route.params.id + "/stories/")
    .then(res => this.stories = res.data)
  },
  data(){
    return {
      stories: [],
      modals: {
        modal0: false
      },
      currentCriteria: []
    }
  },
  methods: {
    retrieveCriteria(){
    
      this.modals.modal0 = true
    }
  }

}
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
  input.larger {
        width: 50px;
        height: 50px;
      }
      .table {
  font-size: 2em;
}
.table-head{
  font-size: 3em;
}

</style>