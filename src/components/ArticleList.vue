<template>
  <div>
    <!-- 文章列表模块，若当前route指向‘/’，则使用该模块 -->
    <!-- enter-active-class="animate__animated animate__fadeIn" -->
    <!-- :duration="{ enter: (i + 1) * 500, leave: (i + 2) * 500 }" -->
    <template class="articleList" v-if="this.$route.path === '/'">
      <template
        v-for="(item, i) in articleList.slice(
          this.$store.state.pagi.numPerPage * (this.$store.state.pagi.page - 1),
          this.$store.state.pagi.numPerPage * this.$store.state.pagi.page
        )"
      >
        <transition appear :key="i" name="scale">
          <v-hover v-slot="{ hover }" :key="'hover' + i">
            <v-card
              v-ripple="false"
              :key="'card' + i"
              :elevation="hover ? 3 : 0"
              :id="`articlePost${i}`"
              class="rounded-lg pa-4 mb-4"
              :to="routeTo(item.attributes, i)"
              flat
              active-class="activeCard"
            >
              <div id="articleInfo" class="">
                <p class="articleDate" style="display: inline">
                  <v-icon small color="primary" class="my-2 mx-auto"
                    >far fa-calendar-alt</v-icon
                  >
                  {{ getDate(item.attributes.addTime) }}
                </p>
                <p class="articleReadTime" style="display: inline">
                  <v-icon small color="primary" class="my-2 mx-auto"
                    >far fa-clock</v-icon
                  >
                  {{
                    getReadTime(
                      item.html.match(/[\u4e00-\u9fff\uf900-\ufaff]/g).length
                    )
                  }}
                </p>
              </div>
              <div v-html="readMore(item.html)"></div>
            </v-card>
          </v-hover>
        </transition>
      </template>
    </template>

    <!-- 若route不指向’/‘，则进入单页文章 -->
    <template class="singleArticle" v-else>
      <transition appear name="scale">
        <v-card
          class="rounded-lg pa-4 mb-4"
          :id="`articlePost${currentArticleId}`"
          flat
        >
          <div id="articleInfo" class="">
            <p class="articleDate" style="display: inline">
              <v-icon small color="primary" class="my-2 mx-auto"
                >far fa-calendar-alt</v-icon
              >
              {{ getDate(articleList[currentArticleId].attributes.addTime) }}
            </p>
            <p class="articleReadTime" style="display: inline">
              <v-icon small color="primary" class="my-2 mx-auto"
                >far fa-clock</v-icon
              >
              {{
                getReadTime(
                  articleList[currentArticleId].html.match(
                    /[\u4e00-\u9fff\uf900-\ufaff]/g
                  ).length
                )
              }}
            </p>
          </div>
          <div v-html="articleList[currentArticleId].html"></div>
          <template
            v-for="(tag, index) in articleList[currentArticleId].attributes
              .tags"
          >
            <v-chip
              class="ma-2"
              color="primary"
              label
              text-color="white"
              :key="index"
            >
              <v-icon left> fas fa-tag </v-icon>
              {{ tag }}
            </v-chip></template
          >
        </v-card>
      </transition>
    </template>
  </div>
</template>

<script>
let reg = /.*<!-- more -->/s;
export default {
  data() {
    return {
      articleList: [],
      mdList: [],
      currentArticleId: "", //选中文章的id
    };
  },
  created() {
    this.getArticle();
    this.$store.commit("setPagiLength", this.articleList.length);
  },
  mounted() {
    this.refineDOM();
  },
  updated() {},
  computed: {},
  watch: {},
  methods: {
    getDate(timeStamp) {
      let date = new Date(timeStamp);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      const res =
        year +
        "-" +
        (month >= 10 ? month : "0" + month) +
        "-" +
        (day >= 10 ? day : "0" + day);
      return "发表于 " + res;
    },
    getReadTime(length) {
      return Math.ceil(length / 300) + "分钟读完（" + length + "个字)";
    },
    animateClass(i) {
      if (this.currentArticleId === "") {
        return "animate__animated animate__bounce";
      }
      return `animate__animated animate__bounce animate__delay-${i * 0.5}s`;
    },
    routeTo(attr, index) {
      this.$store.commit("setArticle", index);
      this.currentArticleId = index;
      return `/post/${attr.title}`;
    },
    readMore(html) {
      if (reg.test(html) == true) {
        return reg.exec(html)[0];
      } else {
        return html;
      }
    },
    getArticle() {
      if (this.currentArticleId === "" && this.$route.path !== "/") {
        this.$router.push("/");
      }
      const markdwonFiles = require.context("@/assets/post", true, /^.*\.md$/);
      this.mdList = markdwonFiles.keys();
      markdwonFiles.keys().forEach((path) => {
        this.articleList.push(markdwonFiles(path));
      });

      // 按时间排序
      this.articleList.sort((item1, item2) => {
        return item2.attributes.addTime - item1.attributes.addTime;
      });
    },
    refineDOM() {
      $("body").on("click", "i.pullDown", function () {
        $("body i.pullDown").toggleClass("fa-chevron-down");
        $("body i.pullDown").toggleClass("fa-chevron-left");
        $("div.wrapped div:nth-child(2)").slideToggle();
      });
    },
  },
};
</script>

<style>
@import url(../utils/animate/animate.css);
:root {
  --animate-duration: 500ms;
}
h1 {
  margin-bottom: 10px;
}
img {
  width: 100%;
  border-radius: 8px;
}
code {
  background-color: rgba(0, 0, 0, 0) !important;
}
/* 设定anchor的样式 */
.header-anchor {
  color: black !important;
  text-decoration: none !important;
}
.table-of-contents {
  display: none !important;
}
.header-anchor:hover {
  color: #1976d2 !important;
}
.line-numbers-wrapper {
  float: left;
  text-align: center;
  width: 5%;
  min-width: 30px;
  font-size: 0.9em;
  line-height: 1.2em;
  padding: 1.5em 0em;
  border-right: 1px solid #ddd;
  color: #aaa;
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
/* 链接激活时卡片的样式 */
.activeCard {
  height: 200em;
  transition: height 2s;
}
</style>