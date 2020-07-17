<template>
  <div class="aa">
    <div id="player-point">0</div>
    <table class="pkomadai">
      <tbody>
        <tr>
          <td id="pk1">歩</td>
          <td id="pk3">香</td>
          <td id="pk4">桂</td>
        </tr>
        <tr>
          <td id="pk6">銀</td>
          <td id="pk7">金</td>
          <td id="pk9">角</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "PlayerKomadai",
};
</script>

<style scoped>
.pkomadai {
  border: 2px solid black;
  border-collapse: collapse;
  background-image: url("../assets/mokume.jpeg");
  background-repeat: repeat;
}

td {
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  border-width: 0px;
  padding: 3px 6px;
  opacity: 0.5;
}

#player-point {
  width: 50px;
  height: 50px;
  border: 2px black solid;
  text-align: center;
  line-height: 50px;
  font-size: 25px;
  font-weight: bold;
  background: #e7b87a;
  margin-bottom: 10px;
}

.aa {
  position: absolute;
  bottom: 0;
}
</style>
