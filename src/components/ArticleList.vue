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
    // handleHighlight() {
    //   console.log("hello");
    //   var doc_pre = $("pre");
    //   doc_pre.each(function () {
    //     var class_val = $(this).attr("class");
    //     $(this).attr("class", "language-js line-numbers");
    //   });
    // },
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
code {
  background-color: rgba(0, 0, 0, 0) !important;
}

.line-numbers-wrapper {
  float: left;
  text-align: center;
  width: 5%;
  font-size: 0.9em;
  line-height: 1.2em;
  padding: 1.5em 0em;
  border-right: 1px solid #ddd;
}
pre {
  float: right;
  width: 95%;
}
.line-numbers-mode {
  overflow: hidden;
}
.v-application p a {
  color: #4051b5;
  text-decoration: none;
}
</style>