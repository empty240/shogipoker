<template>
  <td @click="select()" :class="getKomaClass()">{{ koma.label }}</td>
</template>

<script>
import { mapState } from "vuex";
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
  computed: mapState(["playerSelectable"]),
  methods: {
    getKomaClass() {
      if (!this.playerSelectable.includes(this.komaIndex)) {
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
