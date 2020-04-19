<template>
  <div id="wrapper">
    <div class="com-komadai">
      <com-komadai></com-komadai>
    </div>
    <div class="shogi-ban">
      <shogi-ban>
      </shogi-ban>
    </div>
    <div class="player-komadai">
      <player-komadai>
      </player-komadai>
    </div>
  </div>
</template>

<script>
import ShogiBan from './ShogiBan.vue'
import ComKomadai from './ComKomadai.vue'
import PlayerKomadai from './PlayerKomadai.vue'

export default {
  name: 'ShogiPoker',
  components: {
    ShogiBan,
    ComKomadai,
    PlayerKomadai
  }
}
</script>

<style scoped>
#wrapper {
  display: flex;
  justify-content: center;
  margin-right: 124px;
}
.shogi-ban {
  margin: 0 15px;
}

.player-komadai{
  position: relative;
}
</style>
