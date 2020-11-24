<template>
  <div>
    <h1>Lo sentimos.</h1>
    <h3>
      Usted en este momento no esta autorizado para visualizar esta pagina. Por favor ingresar a un
      juego usando un enlace provisto por el administrador o moderador.
    </h3>
    <button @click="print">TEST</button>
  </div>
</template>

<script>
export default {
  methods: {
    print(){
      console.log(this.$store.state)
    }
  }
}
</script>

<style>

</style>
