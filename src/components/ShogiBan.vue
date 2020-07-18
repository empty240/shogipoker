<template>
  <div>
    <table>
      <tbody>
        <tr class="com-koma">
          <td
            v-for="(koma, index) in this.$store.state.komaList"
            :key="index"
            :id="'com' + koma.point"
            class="c-koma"
            :class="comSelectable(index)"
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
          <td v-for="n in 3" :key="n + 'a'"></td>
        </tr>
        <tr>
          <td v-for="n in 3" :key="n"></td>
          <td id="field"></td>
          <td></td>
          <td @click="battle" id="battle">
            {{ this.$store.getters.stage }}
          </td>
          <td></td>
        </tr>
        <tr>
          <td v-for="n in 3" :key="n"></td>
          <td id="player-bet">
            {{
              playerBettingKoma
                ? this.$store.state.komaList[playerBettingKoma].label
                : ""
            }}
          </td>
          <td v-for="n in 3" :key="n + 'a'"></td>
        </tr>
        <tr>
          <td v-for="n in 7" :key="n"></td>
        </tr>
        <tr>
          <td
            v-for="(koma, index) in this.$store.state.komaList"
            :key="index"
            :id="'p' + koma.point"
            class="p-koma"
            :class="playerSelectable(index)"
            @click="bet(index)"
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
  data() {
    return {
      playerBettingKoma: null,
      comBettingKoma: null,
    };
  },
  methods: {
    comSelectable(index) {
      if (!this.$store.state.comHolding.includes(index)) {
        return "nonActive";
      }
    },
    playerSelectable(index) {
      if (!this.$store.state.playerHolding.includes(index)) {
        return "nonActive";
      }
    },
    bet(index) {
      if (this.$store.state.playerHolding.includes(index)) {
        this.playerBettingKoma = index;
      }
    },
    battle() {
      // 異常系は弾く。早期リターン
      if (!this.playerBettingKoma) {
        return;
      }

      let size = this.$store.state.comHolding.length;
      this.comBettingKoma = this.$store.state.comHolding[
        Math.floor(Math.random() * size)
      ];

      this.$store.commit("playerBet", this.playerBettingKoma);
      this.$store.commit("comBet", this.comBettingKoma);
      this.$store.commit("upPhase");
      this.playerBettingKoma = null;
    },
  },
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

#battle {
  font-size: 18px;
  background: #e7b87a;
  cursor: pointer;
}
#battle:hover {
  opacity: 0.7;
}

#com-bet {
  text-align: center;
  -ms-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  width: 60px;
  height: 60px;
  font-size: 35px;
  font-weight: bold;
  background: #e7b87a;
}

#player-bet {
  text-align: center;
  width: 60px;
  height: 60px;
  font-size: 35px;
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
  opacity: 0.4;
}

.nonActive {
  opacity: 0.4;
}
</style>
