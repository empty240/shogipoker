<template>
  <div>
    <table class="ckomadai">
      <tbody>
        <tr>
          <td id="ck9">{{ showKomaLabel("kaku") }}</td>
          <td id="ck7">{{ showKomaLabel("kin") }}</td>
          <td id="ck6">{{ showKomaLabel("gin") }}</td>
        </tr>
        <tr>
          <td id="ck4">{{ showKomaLabel("keima") }}</td>
          <td id="ck3">{{ showKomaLabel("kyosha") }}</td>
          <td id="ck1">{{ showKomaLabel("fu") }}</td>
        </tr>
      </tbody>
    </table>
    <div id="com-point">{{ this.$store.state.comPoint }}</div>
  </div>
</template>

<script>
export default {
  name: "ComKomadai",
  methods: {
    showKomaLabel(komaIndex) {
      if (this.$store.state.comKomadai.includes(komaIndex)) {
        return this.$store.state.komaList[komaIndex].label;
      } else {
        return "";
      }
    },
  },
};
</script>

<style scoped>
.ckomadai {
  border: 2px solid black;
  border-collapse: collapse;
  background-image: url("../assets/mokume.jpeg");
  background-repeat: repeat;
}

#ck1,
#ck3,
#ck4,
#ck6,
#ck7,
#ck9 {
  text-align: center;
  border-width: 0px;
  font-size: 28px;
  font-weight: bold;
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  width: 42px;
  height: 48px;
}

#com-point {
  width: 50px;
  height: 50px;
  border: 2px black solid;
  text-align: center;
  line-height: 50px;
  font-size: 25px;
  font-weight: bold;
  background: #e7b87a;
  float: right;
  margin-top: 10px;
}
</style>
