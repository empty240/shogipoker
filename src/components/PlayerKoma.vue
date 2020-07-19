<template>
  <td @click="select()" :class="playerSelectable()">{{ koma.label }}</td>
</template>

<script>
export default {
  name: "PlayerKoma",
  props: {
    komaIndex: {
      type: String,
      required: true,
    },
    koma: {
      type: Object,
      required: true,
    },
  },
  methods: {
    playerSelectable() {
      if (!this.$store.state.playerHolding.includes(this.komaIndex)) {
        return "non-active";
      }
    },
    select() {
      this.$emit("selectKoma", this.komaIndex);
    },
  },
};
</script>

<style scoped>
td {
  cursor: pointer;
}

td:hover,
.non-active {
  opacity: 0.4;
}
</style>
