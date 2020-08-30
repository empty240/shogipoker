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
            <tr class="com-row">
              <com-koma
                v-for="(koma, index) in this.komaList"
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
                {{ comSelectingKoma ? this.komaList[comSelectingKoma].label : "" }}
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
              <td @click="bet()" class="phase">
                {{ phase === 1 ? "初手" : phase + "手目" }}
              </td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td class="player-select">
                {{ playerSelectingKoma ? this.komaList[playerSelectingKoma].label : "" }}
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td v-for="n in 7" :key="n"></td>
            </tr>
            <tr class="player-row">
              <player-koma
                v-for="(koma, index) in this.komaList"
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
import { mapState } from "vuex"
import ComKomadai from "./ComKomadai.vue"
import PlayerKomadai from "./PlayerKomadai.vue"
import GameRule from "./GameRule.vue"
import ResetBtn from "./ResetBtn.vue"
import ComKoma from "./ComKoma.vue"
import PlayerKoma from "./PlayerKoma.vue"

export default {
  name: "ShogiPoker",
  components: {
    ComKomadai,
    PlayerKomadai,
    GameRule,
    ResetBtn,
    ComKoma,
    PlayerKoma
  },
  data() {
    return {
      playerSelectingKoma: null,
      comSelectingKoma: null,
      gameResult: null,
      stageResult: null,
      canBattle: false
    }
  },
  computed: mapState([
    "komaList",
    "phase",
    "playerSelectable",
    "comSelectable",
    "playerPoint",
    "comPoint"
  ]),
  methods: {
    // playerが駒を選択
    select(komaIndex) {
      if (this.playerSelectable.includes(komaIndex)) {
        this.playerSelectingKoma = komaIndex
        this.comSelectingKoma = null
        this.canBattle = true
      }
    },
    // n手目をクリック
    bet() {
      // 対決可能でない時はreturn
      if (!this.canBattle) {
        return
      }

      // comの駒をランダムに決める
      let size = this.comSelectable.length
      this.comSelectingKoma = this.comSelectable[Math.floor(Math.random() * size)]

      // 対決
      this.battle()

      // 対決後はplayerが駒を選択するまで対決不可
      this.canBattle = false

      // 使用可能な駒の更新
      this.$store.commit("updatePlayerSelectable", this.playerSelectingKoma)
      this.$store.commit("updateComSelectable", this.comSelectingKoma)

      // 局面の更新
      if (this.phase < 7) {
        this.$store.commit("upPhase")
      } else {
        this.showGameResult()
      }
    },
    // 対決
    battle() {
      const playerKomaPoint = this.komaList[this.playerSelectingKoma].point
      const comKomaPoint = this.komaList[this.comSelectingKoma].point

      if (playerKomaPoint > comKomaPoint) {
        // playerの勝ちなので、comのコマポイントをplayerに加算
        this.$store.commit("addPlayerPoint", comKomaPoint)
        this.$store.commit("addPlayerKoma", this.comSelectingKoma)
        this.stageResult = "WIN"
      } else if (playerKomaPoint < comKomaPoint) {
        // comの勝ちなので、playerのコマポイントをcomに加算
        this.$store.commit("addComPoint", playerKomaPoint)
        this.$store.commit("addComKoma", this.playerSelectingKoma)
        this.stageResult = "LOSE"
      } else {
        this.stageResult = "DRAW"
      }
    },
    // ゲーム結果の表示
    showGameResult() {
      if (this.playerPoint > this.comPoint) {
        this.gameResult = "勝ち"
      } else if (this.playerPoint < this.comPoint) {
        this.gameResult = "負け"
      } else {
        this.gameResult = "引き分け"
      }
    },
    // リセットする
    resetShogiBan() {
      this.playerSelectingKoma = null
      this.comSelectingKoma = null
      this.gameResult = null
      this.stageResult = null
      this.canBattle = false
    }
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
  margin: 0;
  padding: 20px 0;
}

.wrapper {
  display: flex;
  justify-content: center;
  min-width: 800px;
}

.shogi-ban table {
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
  width: 60px;
  height: 60px;
  text-align: center;
  font-size: 35px;
  font-weight: bold;
  border: solid 2px black;
}
.result {
  font-size: 17px;
  font-weight: bold;
}

.phase {
  font-size: 18px;
  background: #e7b87a;
  cursor: pointer;
}
.phase:hover {
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
