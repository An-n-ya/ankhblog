<template>
  <v-container id="gallery" class="mt-2">
    <v-row
      ><v-col class="d-flex justify-start flex-wrap flex-column">
        <template v-for="i in imgList.length">
          <transition appear name="scale" :key="'trans' + i">
            <v-card class="rounded-lg ma-2" flat :key="'card' + i">
              <v-img :src="imgList[i]" width="15rem"></v-img> </v-card
          ></transition> </template
      ></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      imgList: [
        "https://picture-bed-1301848969.cos.ap-shanghai.myqcloud.com/jojo-1.jpg",
        "https://picture-bed-1301848969.cos.ap-shanghai.myqcloud.com/character-1.jpg",
        "https://picture-bed-1301848969.cos.ap-shanghai.myqcloud.com/%E7%9F%A5%E4%BA%86.jpg",
        "https://picture-bed-1301848969.cos.ap-shanghai.myqcloud.com/%E8%8A%8D%E8%8D%AF.jpg",
        "https://picture-bed-1301848969.cos.ap-shanghai.myqcloud.com/%E8%9C%BB%E8%9C%93.jpg",
        "https://picture-bed-1301848969.cos.ap-shanghai.myqcloud.com/%E8%84%91%E5%A3%B3.jpg",
        "https://picture-bed-1301848969.cos.ap-shanghai.myqcloud.com/%E8%80%B3%E6%9C%B5%F0%9F%91%82.jpg",
        "https://picture-bed-1301848969.cos.ap-shanghai.myqcloud.com/mario_run.gif",
        "https://picture-bed-1301848969.cos.ap-shanghai.myqcloud.com/%E7%86%8A%E7%86%8A%F0%9F%90%BB.jpg",
        "https://picture-bed-1301848969.cos.ap-shanghai.myqcloud.com/%E5%83%8F%E7%B4%A0%F0%9F%8C%B9.jpg",
        "https://picture-bed-1301848969.cos.ap-shanghai.myqcloud.com/%E5%85%94%E5%85%94%F0%9F%90%B0.jpg",
        "https://picture-bed-1301848969.cos.ap-shanghai.myqcloud.com/%E5%B8%BD%E5%AD%90.jpg",
        "https://picture-bed-1301848969.cos.ap-shanghai.myqcloud.com/%E7%8C%AB%E7%8C%AB%E5%A5%B3.jpg",
        "https://picture-bed-1301848969.cos.ap-shanghai.myqcloud.com/%E5%BA%B7%E5%A8%9C.jpg",
        "https://picture-bed-1301848969.cos.ap-shanghai.myqcloud.com/%E5%AE%B6%E9%87%8C%E7%9A%84%E8%8A%B1%E8%8A%B1.jpg",
        "https://picture-bed-1301848969.cos.ap-shanghai.myqcloud.com/%E5%86%B0%E6%B7%87%E6%B7%8B%F0%9F%8D%A6.jpg",
        "https://picture-bed-1301848969.cos.ap-shanghai.myqcloud.com/%F0%9F%91%A7.jpg",
        "https://picture-bed-1301848969.cos.ap-shanghai.myqcloud.com/mario_set.gif",
      ],
    };
  },
};
</script>

<style scoped>
@import url(../utils/animate/animate.css);
.col {
  height: 80rem;
}
.v-card {
}
</style>