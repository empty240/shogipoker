<template>
  <td @click="select()" :class="getKomaClass()">{{ koma.label }}</td>
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
    getKomaClass() {
      if (!this.$store.state.playerSelectable.includes(this.komaIndex)) {
        return "unselectable";
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
.unselectable {
  opacity: 0.4;
}
</style>
