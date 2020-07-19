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
        return "nonActive";
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
td:hover {
  opacity: 0.4;
}
.nonActive {
  opacity: 0.4;
}
</style>
