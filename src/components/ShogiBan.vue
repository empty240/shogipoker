<template>
  <div>
    <table>
      <tbody>
        <tr class="com-koma">
          <td
            v-for="koma in this.$store.state.komaList"
            :key="koma.point"
            :id="'com' + koma.point"
            class="c-koma"
          >
            {{ koma.label }}
          </td>
        </tr>
        <tr>
          <td v-for="n in 7" :key="n"></td>
        </tr>
        <tr>
          <td v-for="n in 3" :key="n"></td>
          <td id="com-bet" class="com-koma"></td>
          <td v-for="n in 3" :key="n"></td>
        </tr>
        <tr>
          <td v-for="n in 3" :key="n"></td>
          <td id="field"></td>
          <td></td>
          <td id="go">初手</td>
          <td></td>
        </tr>
        <tr>
          <td v-for="n in 3" :key="n"></td>
          <td id="player-bet"></td>
          <td v-for="n in 3" :key="n"></td>
        </tr>
        <tr>
          <td v-for="n in 7" :key="n"></td>
        </tr>
        <tr>
          <td
            v-for="koma in this.$store.state.komaList"
            :key="koma.point"
            :id="'p' + koma.point"
            class="p-koma"
          >
            {{ koma.label }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import { mapState } from "vuex";
export default {
  name: "ShogiBan",
};
</script>

<style scoped>
table {
  border: solid 2px black;
  border-collapse: collapse;
}

td {
  text-align: center;
  width: 60px;
  height: 60px;
  font-size: 35px;
  font-weight: bold;
  border: solid 2px black;
}
#field {
  text-align: center;
  line-height: 70px;

  font-size: 18px;
  font-weight: bold;
}

#go {
  font-size: 18px;
  background: #e7b87a;
  pointer-events: none;
  cursor: pointer;
}
#go:hover {
  opacity: 0.7;
}

#com-bet {
  text-align: center;
  -ms-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  line-height: 70px;
  font-size: 40px;
  font-weight: bold;
  background: #e7b87a;
}

#player-bet {
  text-align: center;

  line-height: 70px;
  font-size: 40px;
  font-weight: bold;
  background: #e7b87a;
}
.com-koma {
  transform: rotate(0.5turn);
  -webkit-transform: rotate(0.5turn);
}
.p-koma {
  cursor: pointer;
}

.p-koma:hover {
  opacity: 0.5;
}
</style>
