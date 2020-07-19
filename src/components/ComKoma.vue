<template>
  <td :class="comSelectable(komaIndex)">{{ koma.label }}</td>
</template>

<script>
export default {
  name: "ComKoma",
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
    comSelectable(komaIndex) {
      if (!this.$store.state.comHolding.includes(komaIndex)) {
        return "nonActive";
      }
    },
  },
};
</script>

<style scoped>
td {
  transform: rotate(0.5turn);
  -webkit-transform: rotate(0.5turn);
}
.nonActive {
  opacity: 0.4;
}
</style>
