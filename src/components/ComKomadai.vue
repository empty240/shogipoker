<template>
  <div>
    <table class="komadai">
      <tbody>
        <tr>
          <td>{{ showKomaLabel("kaku") }}</td>
          <td>{{ showKomaLabel("kin") }}</td>
          <td>{{ showKomaLabel("gin") }}</td>
        </tr>
        <tr>
          <td>{{ showKomaLabel("keima") }}</td>
          <td>{{ showKomaLabel("kyosha") }}</td>
          <td>{{ showKomaLabel("fu") }}</td>
        </tr>
      </tbody>
    </table>
    <div class="com-point">{{ this.$store.state.comPoint }}</div>
  </div>
</template>

<script>
export default {
  name: "ComKomadai",
  methods: {
    showKomaLabel(komaIndex) {
      if (this.$store.state.comKomadai.includes(komaIndex)) {
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
  border-width: 0px;
  font-size: 28px;
  font-weight: bold;
  transform: rotate(0.5turn);
  -webkit-transform: rotate(0.5turn);
}

.com-point {
  width: 50px;
  height: 50px;
  border: 2px black solid;
  text-align: center;
  line-height: 50px;
  font-size: 22px;
  font-weight: bold;
  background: #e7b87a;
  float: right;
  margin-top: 10px;
}
</style>
