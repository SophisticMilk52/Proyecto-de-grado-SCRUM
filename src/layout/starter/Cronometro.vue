<template>
  <div class="hello">
    <h1 class="text-center">Cronometro</h1>
    <div class="elementos">
      <table class="table table-striped">
        <tr>
          <th>
            <h3 class="text-center">Intervalo 1</h3>
          </th>
          <th>
            <h3 class="text-center">Intervalo 2</h3>
          </th>
          <th>
            <h3 class="text-center">Intervalo 3</h3>
          </th>
        </tr>
        <br />

        <tr>
          <td>
            <table>
              <tr>
                <th>
                  <h4>Estimacion</h4>
                </th>
                <th>
                  <h4>Construccion</h4>
                </th>
              </tr>
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
          </td>
          <td>
            <table>
              <tr>
                <th>
                  <h4>Estimacion</h4>
                </th>
                <th>
                  <h4>Construccion</h4>
                </th>
              </tr>
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
          </td>
          <td>
            <table>
              <tr>
                <th>
                  <h4>Estimacion</h4>
                </th>
                <th>
                  <h4>Construccion</h4>
                </th>
              </tr>
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
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      intervalos:[]
    };
  },
  created() {
    axios.get("/games/"+this.idJuego+"/stories/").then(res => {
      console.log(this.idJuego+"hay algo?")
      this.stories = res.data;
    });
  }
};
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