<template>
  <v-card class="rounded-lg" flat>
    <v-container>
      <v-row>
        <v-col align="center"> <img src="../assets/avatar2.png" /></v-col>
      </v-row>
      <v-row class="authorName">
        <v-col class="my-0 py-0" align="center"
          ><p class="text-h5 my-0">{{ authorData.name }}</p></v-col
        >
      </v-row>
      <v-row class="address" justify="center">
        <v-col class="my-0 py-0" align="center">
          <p class="text-body-2">
            <v-icon small class="mx-1">fas fa-compass</v-icon
            >{{ authorData.address }}
          </p>
        </v-col>
      </v-row>
      <v-row class="follow mx-4 mb-1">
        <v-btn
          class="mx-auto px-12"
          max-width="20rem"
          min-width="3rem"
          color="indigo rounded-lg"
          @click="navTo(authorData.url[0][1])"
          ><p class="my-auto indigo--text text--lighten-5">关注我</p></v-btn
        >
      </v-row>
      <v-row class="icon mx-4 mb-1">
        <v-col
          class="pa-1"
          v-for="(item, index) of authorData.url"
          :key="index"
          align="center"
        >
          <v-btn text small class="pa-1" @click="navTo(item[1])"
            ><v-icon class="" small>{{ `fab fa-${item[0]}` }}</v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: ["authorData"],
  data() {
    return {};
  },
  methods: {
    navTo: function (url) {
      window.open(url);
    },
  },
};
</script>

<style>
</style>