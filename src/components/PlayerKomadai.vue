<template>
  <div>
    <div class="player-point">{{ this.$store.state.playerPoint }}</div>
    <table class="komadai">
      <tbody>
        <tr>
          <td>{{ showKomaLabel("fu") }}</td>
          <td>{{ showKomaLabel("kyosha") }}</td>
          <td>{{ showKomaLabel("keima") }}</td>
        </tr>
        <tr>
          <td>{{ showKomaLabel("gin") }}</td>
          <td>{{ showKomaLabel("kin") }}</td>
          <td>{{ showKomaLabel("kaku") }}</td>
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
      }
    },
  },
};
</script>

<style scoped>
.komadai {
  border: 2px solid black;
  border-collapse: collapse;
  background-image: url("../assets/mokume.jpeg");
  background-repeat: repeat;
}

td {
  width: 42px;
  height: 48px;
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  border-width: 0px;
}

.player-point {
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
