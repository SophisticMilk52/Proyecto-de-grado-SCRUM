<template>
  <div class="hello">
    <h1 class="text-center">Cronometro</h1>
    <div class="elementos">
      <table class="table table-striped">
        <tr>
          <th>
            <h3>Estimacion</h3>
          </th>
          <th>
            <h3>Construccion</h3>
          </th>
        </tr>

        <br />

        <tr>
          <td>
            <h5>00:04:00</h5>
          </td>
          <td>
            <h5>00:02:00</h5>
          </td>
        </tr>
        <tr>
          <td>
            <h5>00:30:00</h5>
          </td>
          <td>
            <h5>00:22:00</h5>
          </td>
        </tr>
        <tr>
          <td>
            <h5>00:04:00</h5>
          </td>
          <td>
            <h5>00:12:00</h5>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
b-table {
  width: 1002px;
  height: 100%;
}
.elementos {
  background-color: white;
  border-radius: 25px;
}

table {
  margin: 0;
  padding: 0;
  width: 100%;
  align-content: center;
  text-align: center;
}
</style>