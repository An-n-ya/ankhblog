<template>
  <v-card class="rounded-lg" flat>
    <v-container>
      <v-row class="avatarBlock">
        <div id="circle"></div>
        <v-col align="center" id="avatar"> </v-col>
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
          class="mx-auto px-12 rounded-lg"
          max-width="20rem"
          min-width="3rem"
          color="primary"
          @click="navTo(authorData.url[0][1])"
          ><p class="my-auto" style="color: #33272a">关注我</p></v-btn
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

<style scoped>
#avatar {
  position: absolute;
  width: 100%;
  height: 60rem;
  background-image: url(../assets/avatar.png);
  background-size: contain;
  mask: url(../assets/mask.png);
  mask-size: contain;
  /* -webkit-mask: url(../assets/mask.png); */
}
#circle {
  width: 100%;
  height: 60rem;
  background-color: bisque;
  mask: url(../assets/circle.png) no-repeat;
  mask-size: contain;
}
.avatarBlock {
  height: 37rem;
}
</style>