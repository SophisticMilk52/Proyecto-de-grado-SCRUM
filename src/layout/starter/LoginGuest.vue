<template>
  <div>
    <h2 class="text-center"><strong>Ingresar al juego</strong></h2>
    <br><br><br>
    <div>
      <div class="form-content login-form" v-if="!newParticipant">
        <form @submit.prevent>
          <base-input
          label="Correo"
          type="text"
          v-model="email"
          />
          <base-input
          label="Contraseña"
          type="password"
          v-model="password"
          />
          <p class="text-right">¿Olvido su contraseña? Haga clic aqui.</p>
          <base-button type="secondary" class="btn btn-lg accept-btn" @click="login"
          >Iniciar sesión</base-button>
          <br><br>
          <p class="text-center">¿Aun no se ha registrado al grupo? <strong @click="switchMode">Haz clic aqui.</strong></p>
        </form>
      </div>
      <div class="form-content login-form" v-else>
        <form @submit.prevent>
          <base-input
          label="Nombre"
          type="text"
          placeholder="Nombre con el cual sera reconocido por su grupo dentro del juego"
          v-model="name"
          />
          <base-input
          label="Correo"
          type="text"
          placeholder="Correo al que se le va a enviar su contraseña y el enlace para volver a esta pagina."
          v-model="email"
          />
          <base-button type="secondary" class="btn btn-lg accept-btn" @click="register"
          >Registrar</base-button>
          <br><br>
          <base-button type="secondary" class="btn btn-lg accept-btn" @click="switchMode"
          >Cancelar</base-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../plugins/axios";
import Modal from '../../components/Modal'

export default {
  data() {
    return {
      newParticipant: false,
      groups: {},
      name: null,
      password: null,
      email: null,
      errors: []
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
    register(event){
      console.log("Register Triggered")
      this.checkForm(event);
      console.log(this.errors)
      if(this.errors.length > 0){
        for(let i=0; i<this.errors.length; i++){
          this.$notify({type: "danger", message: this.errors[i]})
        }
        event.preventDefault()
      } else {
        let json = {
          name: this.name,
          email: this.email
        };
        axios
        .post("/games/" + this.$route.params.gameId + "/groups/" + this.$route.params.groupId
        + "/participants/",
        json)
        .then(
          (res) => {
            console.log(res.data);
            this.groups = res.data;
            this.$notify({type: "success", message: "Se ha registrado exitosamente! Revisa tu correo para tu contraseña."})
            this.$store.commit("login", this.groups);
            this.$router.push({name: 'Historias', params: {id: this.$route.params.gameId}})
        });
      }
    },

    login(event){
      console.log("Login Triggered")
      this.checkForm(event)
      console.log("Checkform Triggered")

      if(this.errors.length > 0){
        for(let i=0; i<this.errors.length; i++){
          this.$notify({type: "danger", message: this.errors[i]})
        }
        event.preventDefault()
      } else {
        let json = {
          email: this.email,
          password: this.password
        };
        axios
        .post("/games/" + this.$route.params.gameId + "/groups/" + this.$route.params.groupId
        + "/participants/login/",
        json)
        .then(
          (res) => {
            console.log(res.data);
            this.groups = res.data;
            this.$notify({type: "success", message: "¡Bienvenido al juego!"})
            this.$store.commit("login", this.groups);
            this.$router.push({name: 'Historias', params: {id: this.$route.params.gameId}})
        });
      }
    },

    switchMode(){
      this.name = null
      this.password = null
      this.email = null
      this.newParticipant = !this.newParticipant
    },

    checkForm(e){
      this.errors = []
      if(!this.newParticipant){
        if(!this.email){
          this.errors.push("El correo electronico es obligatorio.")
        } else if(!this.validEmail(this.email)){
          this.errors.push("El correo electronico debe ser valido.")
        }
        if(!this.password){
          this.errors.push("La contraseña es obligatoria.")
        }
      }
      else{
        if(!this.name){
          this.errors.push("El nombre es es obligatorio.")
        }
        if(!this.email){
          this.errors.push("El correo electronico es obligatorio.")
        } else if(!this.validEmail(this.email)){
          this.errors.push("El correo electronico debe ser valido.")
        }
      }
    },

    validEmail(email){
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

  },
};
</script>

<style scoped>
.login-form{
  width: 50vw;
  margin-left: auto;
  margin-right: auto;
}
.accept-btn{
  width: 100%;
}
</style>
