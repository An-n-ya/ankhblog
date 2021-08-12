<template>
  <v-container>
    <v-row>
      <v-col cols="3" class="pl-0 pt-4 pr-2">
        <transition
          appear
          enter-active-class="animate__animated animate__fadeIn"
        >
          <Author :authorData="authorData"></Author>
        </transition>
      </v-col>

      <v-col md="9" sm="6" class="pr-0 pt-4 pl-2">
        <ArticleList></ArticleList>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Author from "../components/Author.vue";
import ArticleList from "../components/ArticleList.vue";
export default {
  name: "Home",

  components: {
    Author,
    ArticleList,
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    },
  },
  data() {
    return {
      transitionName: "silde-left",
      authorData: {
        name: "Ankh",
        avator: "",
        address: "Shanghai, China",
        url: [
          ["github", "https://github.com/ankh04"],
          ["weibo", "https://weibo.com/u/7214011630"],
          ["twitter", "https://twitter.com/ankh_04"],
          ["dribbble", "https://dribbble.com/ankh04"],
        ],
      },
    };
  },
};
</script>
<style scoped>
@import url(../utils/animate/animate.css);
</style>