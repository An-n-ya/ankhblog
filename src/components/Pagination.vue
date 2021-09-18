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
      // 这里不应该默认设置为 1，不然 v-pagination 组件每次都会从1开始渲染，而文章列表是通过this.$store.state.pagi.page来渲染的，这样会导致文章列表和页码不匹配，因此将这里的 page 设置成和文章列表相同的值即可。
      page: this.$store.state.pagi.page,
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