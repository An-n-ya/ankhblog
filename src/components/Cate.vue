<template>
  <v-card class="rounded-lg" flat
    ><template v-for="(value, key, index) in cateMap">
      <div :key="index" v-if="value.length > 0">
        <template v-for="(title, j) of value"
          ><a :href="`#${title}`" :key="key + j">{{ key }}:{{ title }}</a
          ><br :key="key + j"
        /></template>
      </div>
      <br :key="index" /></template
  ></v-card>
</template>


<script>
export default {
  data() {
    return {
      cateList: "",
      cateMap: {
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
      },
    };
  },
  created() {
    this.getCateList();
  },
  watch: {
    cateList: function () {
      // 这里要重写，用filter抓取目录，最后的目录应该是一个树状结构
      /* cateMap: {
       **    h1title('直接用anchor自动生成herf？'): {
       **      tag: 'h1',
       **      child: {
       **        h2title: {tag: 'h2', child:none}
       **      }
       **
       */
      for (let h in this.cateMap) {
        $(`#${this.cateList} ${h}`).each((index, element) => {
          this.cateMap[h].push($(element).text());
        });
      }
    },
  },
  methods: {
    getCateList() {
      this.cateList = this.$store.state.currentArticle;
    },
  },
};
</script>

<style>
</style>