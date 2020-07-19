<template>
  <div>
    <div id="player-point">{{ this.$store.state.playerPoint }}</div>
    <table class="pkomadai">
      <tbody>
        <tr>
          <td id="pk1">{{ showKomaLabel("fu") }}</td>
          <td id="pk3">{{ showKomaLabel("kyosha") }}</td>
          <td id="pk4">{{ showKomaLabel("keima") }}</td>
        </tr>
        <tr>
          <td id="pk6">{{ showKomaLabel("gin") }}</td>
          <td id="pk7">{{ showKomaLabel("kin") }}</td>
          <td id="pk9">{{ showKomaLabel("kaku") }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "PlayerKomadai",
  methods: {
    showKomaLabel(komaIndex) {
      if (this.$store.state.playerKomadai.includes(komaIndex)) {
        return this.$store.state.komaList[komaIndex].label;
      } else {
        return "";
      }
    },
    reset() {
      this.$store.commit("reset");
    },
  },
};
</script>

<style scoped>
#reset {
  text-align: center;
  width: 90px;
  height: 36px;
  border: solid 2px black;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
  line-height: 36px;
  background-image: url("../assets/mokume.jpeg");
  background-repeat: repeat;
  cursor: pointer;
}

.pkomadai {
  border: 2px solid black;
  border-collapse: collapse;
  background-image: url("../assets/mokume.jpeg");
  background-repeat: repeat;
}

.pkomadai td {
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  border-width: 0px;
  width: 42px;
  height: 48px;
}

#player-point {
  width: 50px;
  height: 50px;
  border: 2px black solid;
  text-align: center;
  line-height: 50px;
  font-size: 22px;
  font-weight: bold;
  background: #e7b87a;
  margin-bottom: 10px;
}
</style>
