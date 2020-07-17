<template>
  <div>
    <h1>将棋ポーカー</h1>
    <div id="wrapper">
      <div class="com-komadai">
        <com-komadai></com-komadai>
      </div>
      <div class="shogi-ban">
        <shogi-ban> </shogi-ban>
      </div>
      <div class="player-komadai">
        <player-komadai> </player-komadai>
      </div>
    </div>
  </div>
</template>

<script>
import ShogiBan from "./ShogiBan.vue";
import ComKomadai from "./ComKomadai.vue";
import PlayerKomadai from "./PlayerKomadai.vue";

export default {
  name: "ShogiPoker",
  components: {
    ShogiBan,
    ComKomadai,
    PlayerKomadai,
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
  margin-right: 124px;
}

.shogi-ban {
  margin: 0 15px;
  background-image: url("../assets/mokume.jpeg");
  background-repeat: repeat;
}

.player-komadai {
  position: relative;
}
</style>
