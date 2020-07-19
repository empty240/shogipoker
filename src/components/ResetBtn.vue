<template>
  <div @click="reset()" id="reset">リセット</div>
</template>

<script>
export default {
  name: "ResetBtn",
  methods: {
    reset() {
      this.$store.commit("reset");
    },
  },
};
</script>

<style scoped>
#reset {
  text-align: center;
  width: 90px;
  height: 36px;
  border: solid 2px black;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
  line-height: 36px;
  background-image: url("../assets/mokume.jpeg");
  background-repeat: repeat;
  cursor: pointer;
}
</style>
