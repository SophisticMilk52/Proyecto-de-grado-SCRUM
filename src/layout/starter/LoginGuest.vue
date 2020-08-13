<template>
  <div>
    <h2>Ingreso al Juego de Estimación</h2>
    <div>
      <div>
        <button
          v-if="newParticipant"
          type="button"
          class="btn btn-info btn-lg"
          @click="newParticipant = !newParticipant"
        >
          Reingresar al Juego
        </button>
        <button
          v-else
          type="button"
          class="btn btn-info btn-lg"
          @click="newParticipant = !newParticipant"
        >
          Registrarse en el Juego
        </button>

        <div class="form-content" v-if="newParticipant">
          <form @submit.prevent class="modal-body">
            <h3>Registro de Participante</h3>
            <div class="row">
              <base-input
                class="col"
                label="Nombre"
                type="text"
                v-model="user"
                placeholder="Ingrese el nombre con el que desea ser reconocido."
              ></base-input>
            </div>
            <base-button native-type="submit" @click="newLogin" type="primary">Ingresar</base-button>
          </form>
        </div>
        <div class="form-content" v-else>
          <form @submit.prevent class="modal-body">
            <h3>Reingreso de Participante</h3>
            <div class="row">
              <base-input
                class="col-12 col-sm-6"
                label="Nombre"
                type="text"
                v-model="user"
                placeholder="Ingrese el nombre con el que desea ser reconocido."
              ></base-input>
              <base-input
                class="col-12 col-sm-6"
                label="Password"
                type="password"
                placeholder="Password"
                v-model="password"
              />
            </div>
            <base-button native-type="submit" @click="existingLogin" type="primary">Ingresar</base-button>
          </form>
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
    </form>-->

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
import Modal from '../../components/Modal'

export default {
  data() {
    return {
      newParticipant: true,
      groups: {},
      user: "",
      password: "",
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
      .then((res) => {
        console.log(res.data);
        this.groups = res.data;
      });
  },
  methods: {
    newLogin(event) {
      console.log(this.user);
      let parametros = {
        name: this.user,
      };
      axios
        .post(
          "/games/" +
            this.$route.params.gameId +
            "/groups/" +
            this.$route.params.groupId +
            "/participants/",
          parametros
        )
        .then((res) => {
          console.log(res.data);
          this.groups = res.data;
          confirm(`su contraseña es: ` + this.groups.password);
          this.$store.commit("login", this.groups);
          this.$router.push({name: 'Historias', params: {id: this.$route.params.gameId}})
        });
    },
    existingLogin(event) {
      let parametros = {
        name: this.user,
        password: this.password,
      };
      axios
        .post(
          "/games/" +
            this.$route.params.gameId +
            "/groups/" +
            this.$route.params.groupId +
            "/participants/login/",
          parametros
        )
        .then((res) => {
          console.log(res.data);
          this.groups = res.data;
          this.$store.commit("login", this.groups);
          // this.$store.getters.currentParticipant;
          this.$router.push({name: 'Historias', params: {id: this.$route.params.gameId}})
          console.log("If I print this, wtf.")
        });
    },
  },
};
</script>

<style>
</style>
