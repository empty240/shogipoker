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
    <div class="com-point">{{ comPoint }}</div>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: "ComKomadai",
  computed: mapState(["komaList", "comKomadai", "comPoint"]),
  methods: {
    showKomaLabel(komaIndex) {
      if (this.comKomadai.includes(komaIndex)) {
        return this.komaList[komaIndex].label
      }
    }
  }
}
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
  transform: rotate(0.5turn);
  -webkit-transform: rotate(0.5turn);
}

.com-point {
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 22px;
  font-weight: bold;
  border: 2px black solid;
  background: #e7b87a;
  float: right;
  margin-top: 10px;
}
</style>
