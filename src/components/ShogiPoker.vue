<template>
  <div>
    <h1>将棋ポーカー</h1>
    <div class="wrapper">
      <div class="com-komadai">
        <com-komadai></com-komadai>
      </div>
      <div class="shogi-ban">
        <table>
          <tbody>
            <tr>
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
              <td></td>
              <td></td>
              <td></td>
              <td class="com-select">
                {{
                  comSelectingKoma
                    ? this.$store.state.komaList[comSelectingKoma].label
                    : ""
                }}
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td class="result">
                <span v-if="gameResult">{{ gameResult }}</span>
                <span v-else>{{ stageResult }}</span>
              </td>
              <td></td>
              <td @click="bet()" class="stage">
                {{ this.$store.getters.stage }}
              </td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td class="player-select">
                {{
                  playerSelectingKoma
                    ? this.$store.state.komaList[playerSelectingKoma].label
                    : ""
                }}
              </td>
              <td></td>
              <td></td>
              <td></td>
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
                @selectKoma="select"
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
      playerSelectingKoma: null,
      comSelectingKoma: null,
      gameResult: null,
      stageResult: null,
      canBattle: false,
    };
  },
  methods: {
    // playerが駒を選択
    select(komaIndex) {
      if (this.$store.state.playerSelectable.includes(komaIndex)) {
        this.playerSelectingKoma = komaIndex;
        this.comSelectingKoma = null;
        this.canBattle = true;
      }
    },
    // n手目をクリック
    bet() {
      // 対決可能でない時はreturn
      if (!this.canBattle) {
        return;
      }

      // comの駒をランダムに決める
      let size = this.$store.state.comSelectable.length;
      this.comSelectingKoma = this.$store.state.comSelectable[
        Math.floor(Math.random() * size)
      ];

      // 対決
      this.battle();

      // 対決後はplayerが駒を選択するまで対決不可
      this.canBattle = false;

      // 使用可能な駒の更新
      this.$store.commit("updatePlayerSelectable", this.playerSelectingKoma);
      this.$store.commit("updateComSelectable", this.comSelectingKoma);

      // 局面の更新
      if (this.$store.state.phase < 7) {
        this.$store.commit("upPhase");
      } else {
        this.showGameResult();
      }
    },
    // 対決
    battle() {
      const playerKomaPoint = this.$store.state.komaList[
        this.playerSelectingKoma
      ].point;
      const comKomaPoint = this.$store.state.komaList[this.comSelectingKoma]
        .point;

      if (playerKomaPoint > comKomaPoint) {
        // playerの勝ちなので、comのコマポイントをplayerに加算
        this.$store.commit("addPlayerPoint", comKomaPoint);
        this.$store.commit("addPlayerKoma", this.comSelectingKoma);
        this.stageResult = "WIN";
      } else if (playerKomaPoint < comKomaPoint) {
        // comの勝ちなので、playerのコマポイントをcomに加算
        this.$store.commit("addComPoint", playerKomaPoint);
        this.$store.commit("addComKoma", this.playerSelectingKoma);
        this.stageResult = "LOSE";
      } else {
        this.stageResult = "DRAW";
      }
    },
    // ゲーム結果の表示
    showGameResult() {
      if (this.$store.state.playerPoint > this.$store.state.comPoint) {
        this.gameResult = "勝ち";
      } else if (this.$store.state.playerPoint < this.$store.state.comPoint) {
        this.gameResult = "負け";
      } else {
        this.gameResult = "引き分け";
      }
    },
    // リセットする
    resetShogiBan() {
      this.playerSelectingKoma = null;
      this.comSelectingKoma = null;
      this.gameResult = null;
      this.stageResult = null;
      this.canBattle = false;
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

.wrapper {
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
.result {
  font-size: 17px;
  font-weight: bold;
}

.stage {
  font-size: 18px;
  background: #e7b87a;
  cursor: pointer;
}
.stage:hover {
  opacity: 0.7;
}

.player-select,
.com-select {
  font-weight: bold;
  background: #e7b87a;
}

.com-select {
  transform: rotate(0.5turn);
  -webkit-transform: rotate(0.5turn);
}
</style>
