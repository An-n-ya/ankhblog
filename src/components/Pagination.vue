<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="this.$store.state.pagi.length"
      class="elevation-0"
      prev-icon="fa-angle-left"
      next-icon="fa-angle-right"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
    };
  },
  watch: {
    page: function () {
      this.$store.commit("setPagiPage", this.page);
    },
  },
};
</script>

<style>
button.v-pagination__item,
button.v-pagination__navigation,
button.v-pagination__navigation--disabled {
  box-shadow: none;
}
</style>