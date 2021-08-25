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
        <v-avatar class="mr-10" color="grey darken-1" size="32">
          <img :src="getAvatar('ankh04@icloud.com')" />
        </v-avatar>

        <v-btn v-for="link in links" :key="link" text @click="routeTo(link)">
          {{ link }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive class="mx-2" max-width="200" v-show="expand">
          <v-text-field
            class=""
            flat
            name="q"
            type="search"
            hide-details
            solo
            outlined
            dense
            :focus="startAutocomplete()"
            :keydown="startAutocomplete()"
            placeholder="站内搜索"
          >
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

    <v-main style="background-color: #faeee7">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
import { mdiGithub } from "@mdi/js";
import md5 from "md5";
export default {
  name: "App",

  data: () => ({
    links: ["主页", "资料", "UI设计", "画廊", "关于"],
    icons: {
      mdiGithub,
    },
    expand: false,
    dict: {
      主页: "/home",
      资料: "/resources",
      UI设计: "/ui",
      画廊: "/gallery",
      关于: "/about",
    },
  }),
  methods: {
    navTo: function () {
      window.open("https://github.com/ankh04");
    },
    routeTo: function (link) {
      this.$router.push(this.dict[link]);
    },
    getAvatar: function (email) {
      // Trim leading and trailing whitespace from
      // an email address and force all characters
      // to lower case
      const address = String(email).trim().toLowerCase();

      // Create an MD5 hash of the final string
      const hash = md5(address);

      // Grab the actual image URL
      return `https://www.gravatar.com/avatar/${hash}`;
    },
    startAutocomplete() {
      const script = document.createElement("script");
      script.src =
        "https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/static/js/autocomplete.js";
      document.head.appendChild(script);
    },
  },
};
</script>

<style>
@import url("./utils/prism.css");
@import url("./utils/global.css");
/* global CSS */
.v-dialog {
  position: relative;
}
</style>