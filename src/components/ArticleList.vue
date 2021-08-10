<template>
  <div>
    <v-card
      class="rounded-lg pa-4 mb-4"
      v-for="(item, index) in articleList"
      :key="index"
      flat
    >
      <div v-html="readMore(item.html)"></div>
    </v-card>
  </div>
</template>

<script>
let reg = /.*<!-- more -->/s;
export default {
  data() {
    return {
      articleList: [],
      mdList: [],
    };
  },
  mounted() {
    this.getArticle();
  },
  computed: {},
  methods: {
    readMore(html) {
      if (reg.test(html) == true) {
        return reg.exec(html)[0];
      } else {
        return html;
      }
    },
    getArticle() {
      const markdwonFiles = require.context("@/assets/post", true, /^.*\.md$/);
      this.mdList = markdwonFiles.keys();
      markdwonFiles.keys().forEach((path) => {
        this.articleList.push(markdwonFiles(path));
      });
    },
  },
};
</script>

<style>
h1 {
  margin-bottom: 10px;
}
</style>