<template>
  <v-container>
    <v-row>
      <v-col cols="3" class="pl-0 pt-4 pr-2">
        <v-scale-transition appear origin="center center 0">
          <Author :authorData="authorData"></Author>
        </v-scale-transition>
      </v-col>

      <v-col class="pr-0 pt-4 pl-2">
        <v-scale-transition appear origin="center center 0">
          <ArticleList></ArticleList>
        </v-scale-transition>
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
  data() {
    return {
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
