<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="copyright">
        © {{year}} Desarrollado por
        <a href="https://github.com/alvaroagr/" target="_blank" rel="noopener">Alvaro A. Gómez</a>&nbsp;&
        <a href="https://github.com/alejandron00/" target="_blank" rel="noopener">Alejandro Narvaez</a>.
        Tema diseñado por
        <a href="https://www.binarcode.com" target="_blank" rel="noopener">Binar Code</a>&nbsp;&
        <a href="https://www.creative-tim.com" target="_blank" rel="noopener">Creative Tim</a>.
      </div>
    </div>
  </footer>
</template>
<script>
  export default {
    data() {
      return {
        year: new Date().getFullYear()
      }
    }
  };
</script>
<style>
</style>
