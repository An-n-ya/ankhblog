<template>
  <div>
    <v-card id="cate" class="rounded-lg mx-auto" flat>
      <v-list dense flat>
        <v-subheader>目录</v-subheader>
        <v-list-group
          v-for="item in cate"
          :key="item.title"
          v-model="item.active"
          color="primary"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar></v-list-item-avatar>
          </template>

          <v-list-item
            v-for="child in item.child"
            :key="child.title"
            :href="child.href"
          >
            <v-list-item-content>
              <v-list-item-title
                v-text="child.title"
              ></v-list-item-title> </v-list-item-content
          ></v-list-item>
        </v-list-group>
      </v-list>
    </v-card>
  </div>
</template>


<script>
export default {
  data() {
    return {
      cateList: "",
      cate: {},
    };
  },
  created() {
    this.getCateList();
  },
  watch: {
    cateList: function () {
      function formCate(node) {
        var items = [];
        node
          .children("ul")
          .children("li")
          .each((index, element) => {
            var obj = {
              href: $(element).children("a").attr("href"),
              title: $(element).children("a").text(),
              child: formCate($(element)),
              active: false,
            };
            items.push(obj);
          });
        return items;
      }
      this.cate = formCate($(`#${this.cateList} div.table-of-contents`));
      this.cate = [...new Set(this.cate)]; //利用set的特性去重
      if (Object.keys(this.cate).length == 0) {
        // $(".pl-0.pt-4.pr-2.col.col-3").remove();/会影响主页面布局
        // $(".pr-0.pt-4.pl-2.col-sm-6.col-md-9.col").addClass("mx-auto");//这一行会影响主页面布局
        $("#cate").css("display", "none");
      }
      // this.cate = this.unique(this.cate);
      // $(`#${this.cateList} div.table-of-contents`).remove();
    },
  },
  methods: {
    unique(arr) {
      let result = {};
      let finalResult = [];
      for (let i = 0; i < arr.length; i++) {
        result[arr[i].name] = arr[i];
        //因为songs[i].name不能重复,达到去重效果,且这里必须知晓"name"或是其他键名
      }
      //console.log(result);{"羽根":{name:"羽根",artist:"air"},"晴天":{name:"晴天",artist:"周杰伦"}}
      //现在result内部都是不重复的对象了，只需要将其键值取出来转为数组即可
      for (let item in result) {
        finalResult.push(result[item]);
      }
      //console.log(finalResult);[{name:"羽根",artist:"air"},{name:"晴天",artist:"周杰伦"}]
      return finalResult;
    },
    getCateList() {
      this.cateList = this.$store.state.currentArticle;
    },
  },
};
</script>

<style>
#cate {
  width: 20%;
  position: fixed;
}
a {
  color: black !important;
  text-decoration: none;
}
a:hover {
  color: #1976d2 !important;
}
#cate .v-icon {
  font-size: 10px;
}
</style>