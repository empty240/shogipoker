<template>
  <div id="app">
    <shogi-poker />
  </div>
</template>

<script>
import ShogiPoker from "./components/ShogiPoker.vue"

export default {
  name: "App",
  components: {
    ShogiPoker
  }
}
</script>

<style scoped>
#app {
  height: 100%;
  background-image: url("./assets/tatami.jpg");
  background-repeat: repeat;
  overflow: auto;
}
</style>
