<template>
  <v-container id="gallery" class="mt-2">
    <v-row
      ><v-col class="d-flex justify-start" style="position: relative">
        <template v-for="i in imgList.length">
          <transition appear name="scale" :key="'trans' + i">
            <v-card
              class="rounded-lg ma-2"
              flat
              :key="'card' + i"
              v-ripple="false"
              style="position: relative"
            >
              <v-dialog width="40rem" style="position: relative">
                <template v-slot:activator="{ on, attrs }">
                  <!-- <v-lazy
                    v-model="isActive"
                    :options="{
                      threshold: 0.5,
                    }"
                    min-height="200"
                    transition="fade-transition"
                  > -->
                  <v-img
                    v-bind="attrs"
                    v-on="on"
                    :src="imgList[i] + '?imageMogr2/quality/60'"
                    width="15rem"
                    class="ma-auto gallery-img"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                  <!-- </v-lazy> -->
                </template>
                <template v-slot:default="dialog">
                  <v-img :src="imgList[i]" class="ma-auto"></v-img>
                  <v-btn icon id="cancle" @click="dialog.value = false"
                    ><v-icon>fas fa-times</v-icon></v-btn
                  >
                </template></v-dialog
              >
            </v-card>
          </transition>
        </template></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
var ExifImage = require("exif").ExifImage;
export default {
  data() {
    return {
      imgList: [
        "https://picture-bed-1301848969.cos.ap-shanghai.myqcloud.com/hades2.PNG",
        "https://picture-bed-1301848969.cos.ap-shanghai.myqcloud.com/hades2.PNG",
        "https://picture-bed-1301848969.cos.ap-shanghai.myqcloud.com/hades.PNG",
      ],
      // 控制图片的懒加载
      isActive: false,
      imgInfo: {},
    };
  },
  methods: {
    getImgInfo() {
      new ExifImage({ image: "myImage.jpg" }, function (error, exifData) {
        if (error) console.log("Error: " + error.message);
        else this.imgInfo = exifData;
      });
    },
  },
};
</script>

<style scoped>
@import url(../utils/animate/animate.css);

.v-card {
}
.gallery-img {
  cursor: pointer;
}
#cancle {
  position: absolute;
  top: 10px;
  right: 10px;
}
.v-dialog {
  position: relative;
}
</style>