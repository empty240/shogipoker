<template>
  <div>
    <h1>将棋ポーカー</h1>
    <div id="wrapper">
      <div class="com-komadai">
        <com-komadai></com-komadai>
      </div>
      <div class="shogi-ban">
        <table>
          <tbody>
            <tr class="com-koma">
              <com-koma
                v-for="(koma, index) in this.$store.state.komaList"
                :key="index"
                :komaIndex="index"
                :koma="koma"
              ></com-koma>
            </tr>
            <tr>
              <td v-for="n in 7" :key="n"></td>
            </tr>
            <tr>
              <td v-for="n in 3" :key="n"></td>
              <td id="com-bet" class="com-koma">
                {{
                  comBettingKoma
                    ? this.$store.state.komaList[comBettingKoma].label
                    : ""
                }}
              </td>
              <td v-for="n in 3" :key="n + 'a'"></td>
            </tr>
            <tr>
              <td v-for="n in 3" :key="n"></td>
              <td id="field">
                <span v-if="gameResult">{{ gameResult }}</span>
                <span v-else>{{ stageResult }}</span>
              </td>
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
              <player-koma
                v-for="(koma, index) in this.$store.state.komaList"
                :key="index"
                :komaIndex="index"
                :koma="koma"
                @selectKoma="bet"
              ></player-koma>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="player-komadai">
        <player-komadai></player-komadai>
        <reset-btn @clickReset="resetShogiBan()"></reset-btn>
        <game-rule></game-rule>
      </div>
    </div>
  </div>
</template>

<script>
import ComKomadai from "./ComKomadai.vue";
import PlayerKomadai from "./PlayerKomadai.vue";
import GameRule from "./GameRule.vue";
import ResetBtn from "./ResetBtn.vue";
import ComKoma from "./ComKoma.vue";
import PlayerKoma from "./PlayerKoma.vue";

export default {
  name: "ShogiPoker",
  components: {
    ComKomadai,
    PlayerKomadai,
    GameRule,
    ResetBtn,
    ComKoma,
    PlayerKoma,
  },
  data() {
    return {
      playerBettingKoma: null,
      comBettingKoma: null,
      gameResult: null,
      stageResult: null,
      isBattleActive: true,
    };
  },
  methods: {
    bet(index) {
      if (this.$store.state.playerHolding.includes(index)) {
        this.playerBettingKoma = index;
        this.comBettingKoma = null;
        this.isBattleActive = true;
      }
    },
    battle() {
      // 異常系は弾く。早期リターン
      if (!this.playerBettingKoma || !this.isBattleActive) {
        return;
      }

      // comのbetをランダムに決める
      let size = this.$store.state.comHolding.length;
      this.comBettingKoma = this.$store.state.comHolding[
        Math.floor(Math.random() * size)
      ];

      // 対決
      this.match();

      // 対決後は駒を選択するまで対決不可
      this.isBattleActive = false;

      // 使用可能な駒の更新
      this.$store.commit("playerBet", this.playerBettingKoma);
      this.$store.commit("comBet", this.comBettingKoma);

      // 局面の更新
      if (this.$store.state.phase < 7) {
        this.$store.commit("upPhase");
      } else {
        this.showGameResult();
      }
    },
    match() {
      const playerKomaPoint = this.$store.state.komaList[this.playerBettingKoma]
        .point;
      const comKomaPoint = this.$store.state.komaList[this.comBettingKoma]
        .point;

      if (playerKomaPoint > comKomaPoint) {
        // playerの勝ちなので、comのコマポイントをplayerに加算
        this.$store.commit("addPlayerPoint", comKomaPoint);
        this.$store.commit("addPlayerKoma", this.comBettingKoma);
        this.stageResult = "WIN";
      } else if (playerKomaPoint < comKomaPoint) {
        // comの勝ちなので、playerのコマポイントをcomに加算
        this.$store.commit("addComPoint", playerKomaPoint);
        this.$store.commit("addComKoma", this.playerBettingKoma);
        this.stageResult = "LOSE";
      } else {
        this.stageResult = "DRAW";
      }
    },
    showGameResult() {
      if (this.$store.state.playerPoint > this.$store.state.comPoint) {
        this.gameResult = "勝ち";
      } else if (this.$store.state.playerPoint < this.$store.state.comPoint) {
        this.gameResult = "負け";
      } else {
        this.gameResult = "引き分け";
      }
    },
    resetShogiBan() {
      this.playerBettingKoma = null;
      this.comBettingKoma = null;
      this.gameResult = null;
      this.stageResult = null;
    },
  },
};
</script>

<style scoped>
h1 {
  margin: 0;
  padding: 20px 0;
  text-align: center;
}

#wrapper {
  display: flex;
  justify-content: center;
}

.shogi-ban {
  margin: 0 15px;
  background-image: url("../assets/mokume.jpeg");
  background-repeat: repeat;
}

.player-komadai {
  display: flex;
  flex-direction: column-reverse;
}

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
  font-size: 17px;
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
</style>
