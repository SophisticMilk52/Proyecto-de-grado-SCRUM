<template>
  <div>
    <h2>Seleccione que desea hacer</h2>
    <div>
      <!-- <base-button type="primary" @click="modals.modal0 = true">Launch demo modal</base-button> -->
      <!-- <modal :show.sync="modals.modal0">
        <template slot="header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        </template>
        <div>...</div>
        <template slot="footer">
          <base-button type="secondary" @click="modals.modal0 = false">Close</base-button>
          <base-button type="primary">Save changes</base-button>
        </template>
      </modal>-->

      <!-- Trigger the modal with a button -->
      <button
        type="button"
        class="btn btn-info btn-lg"
        data-toggle="modal"
        data-target="#myModal"
      >Inscribirse al grupo</button>

      <!-- Modal -->
      <div id="myModal" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <!-- Modal content-->
          <div class="modal-content">
            <form @submit.prevent class="modal-body">
              <h3>Ingrese por primera vez</h3>
              <base-input
                label="Nombre"
                type="text"
                v-model="newUser"
                placeholder="Ingrese el nombre con el que desea ser reconocido"
              ></base-input>
              <base-button native-type="submit" @click="newLogin"  type="primary">Ingresar</base-button>
            </form>
          </div>
        </div>
      </div>
      <!-- Trigger the modal with a button -->
      <button
        type="button"
        class="btn btn-info btn-lg"
        data-toggle="modal"
        data-target="#myModal2"
      >Volver a ingresar al grupo</button>

      <!-- Modal -->
      <div id="myModal2" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <!-- Modal content-->
          <div class="modal-content">
            <form @submit.prevent class="modal-body">
              <h3>Reingrese al grupo</h3>
              <base-input
                label="Nombre"
                type="email"
                placeholder="Ingrese el nombre con el que desea ser reconocido"
              ></base-input>
              <base-input label="Password" type="password" placeholder="Password"></base-input>
              <base-checkbox>Option one is this</base-checkbox>
              <base-button native-type="submit" type="primary">Submit</base-button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- <base-button>Ingresar por primera vez</base-button>
    <base-button>Reingresar al grupo</base-button>
    <form @submit.prevent>
      <h3>Ingrese por primera vez</h3>
      <base-input
        label="Nombre"
        type="email"
        placeholder="Ingrese el nombre con el que desea ser reconocido"
      ></base-input>
      <base-input label="Password" type="password" placeholder="Password"></base-input>
      <base-checkbox>Option one is this</base-checkbox>
      <base-button native-type="submit" type="primary">Submit</base-button>
    </form>

    <form @submit.prevent>
      <h3>Reingrese al grupo</h3>
      <base-input
        label="Nombre"
        type="email"
        placeholder="Ingrese el nombre con el que desea ser reconocido"
      ></base-input>
      <base-input label="Password" type="password" placeholder="Password"></base-input>
      <base-checkbox>Option one is this</base-checkbox>
      <base-button native-type="submit" type="primary">Submit</base-button>
    </form> -->

    <div>
      <!-- {{ this.groups }}
      <p>{{ this.$route.params.pass }}</p>-->
    </div>
    <!-- <v-if>
    </v-if>
    <v-else>
    </v-else>-->
  </div>
</template>

<script>
import axios from "../../plugins/axios";

export default {
  data() {
    return {
      groups: {},
      newUser: ""
    };
  },
  created() {
    // I should make a GET request that has variable results depending on the password.
    // If correct, show login form select. If incorrect, point out why. This should be via back I think?
    // Causes of Error:
    // • Wrong password
    // • Game is not active
    // • ...?
    axios
      .get(
        "/games/" +
          this.$route.params.gameId +
          "/groups/" +
          this.$route.params.groupId
      )
      .then(res => {
        console.log(res.data);
        this.groups = res.data;
      });
  },
  methods: {
    newLogin(event) {
      console.log(this.newUser)
    },
    existingLogin(event) {}
  }
};
</script>

<style>
</style>