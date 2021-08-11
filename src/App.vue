<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      elevation="5"
      shrink-on-scroll
      elevate-on-scroll
    >
      <v-container class="py-0 fill-height">
        <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>

        <v-btn v-for="link in links" :key="link" text @click="routeTo(link)">
          {{ link }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive class="mx-2" max-width="200" v-show="expand">
          <v-text-field class="" flat hide-details solo-inverted dense>
          </v-text-field>
        </v-responsive>

        <v-btn text @click="expand = !expand">
          <v-icon dense>fas fa-search</v-icon>
        </v-btn>
        <v-btn text @click="navTo()">
          <v-icon>{{ icons.mdiGithub }}</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
import { mdiGithub } from "@mdi/js";
export default {
  name: "App",

  data: () => ({
    links: ["主页", "资料", "UI设计", "画廊", "关于"],
    icons: {
      mdiGithub,
    },
    expand: false,
    dict: {
      主页: "home",
      资料: "resources",
      UI设计: "ui",
      画廊: "gallery",
      关于: "about",
    },
  }),
  methods: {
    navTo: function () {
      window.open("https://github.com/ankh04");
    },
    routeTo: function (link) {
      this.$router.push(this.dict[link]);
    },
  },
};
</script>

<style>
@import url("./utils/prism.css");
</style>