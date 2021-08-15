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
      cateMap: "",
      cate: {},
    };
  },
  created() {
    this.getCateList();
  },
  watch: {
    cateList: function () {
      // 这里要重写，用filter抓取目录，最后的目录应该是一个树状结构
      /* cateMap: {
       **    h1title('直接用anchor自动生成herf？'): {
       **      tag: 'h1',
       **      child: {
       **        h2title: {tag: 'h2', child:none}
       **      }
       **
       */
      this.cateMap = $(`#${this.cateList} div.table-of-contents`).html();
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
      // $(`#${this.cateList} div.table-of-contents`).each((index, element) => {this.cate[$(element).text()]={href:}})
      // $(`#${this.cateList} div.table-of-contents`).remove();
      // for (let h in this.cateMap) {
      //   $(`#${this.cateList} ${h}`).each((index, element) => {
      //     this.cateMap[h].push($(element).text());
      //   });
      // }
    },
  },
  methods: {
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