<template>
  <div>
    <!-- 文章列表模块，若当前route指向‘/’，则使用该模块 -->
    <!-- enter-active-class="animate__animated animate__fadeIn" -->
    <!-- :duration="{ enter: (i + 1) * 500, leave: (i + 2) * 500 }" -->
    <template class="articleList" v-if="this.$route.path === '/'">
      <template v-for="(item, i) in articleList">
        <transition appear :key="i" name="scale">
          <v-hover v-slot="{ hover }" :key="i">
            <v-card
              v-ripple="false"
              :key="i"
              :elevation="hover ? 3 : 0"
              class="rounded-lg pa-4 mb-4"
              :to="routeTo(item.attributes, i)"
              flat
              active-class="activeCard"
            >
              <div v-html="readMore(item.html)"></div>
            </v-card>
          </v-hover>
        </transition>
      </template>
    </template>

    <!-- 若route不指向’/‘，则进入单页文章 -->
    <template class="singleArticle" v-else>
      <transition appear name="scale">
        <v-card class="rounded-lg pa-4 mb-4" flat>
          <div v-html="articleList[currentArticleId].html"></div>
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
      currentArticleId: "",
    };
  },
  created() {
    this.getArticle();
  },
  mounted() {
    this.getDOM();
  },
  computed: {},
  methods: {
    animateClass(i) {
      if (this.currentArticleId === "") {
        return "animate__animated animate__bounce";
      }
      return `animate__animated animate__bounce animate__delay-${i * 0.5}s`;
    },
    routeTo(attr, index) {
      console.log(index);
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
    getDOM() {
      var dom = $("p");

      console.log(dom);
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
.header-anchor {
  color: black !important;
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
  width: 90%;
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