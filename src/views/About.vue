<template>
  <div class="about">
    <transition appear name="scale">
      <div id="div">
        <div>
          <div class="circle red"></div>
          <div class="circle yellow"></div>
          <div class="circle green"></div>
        </div>

        <pre id="container" v-html="innerHTML"></pre>
      </div>
    </transition>
  </div>
</template>

<script>
import hljs from "highlight.js";
export default {
  data() {
    return {
      innerHTML: "default",
      str: `export const 张环宇
    = {
    // 前端开发工程师
    // ankh04@icloud.com
    // 17349750409
    aboutMe: {
        age: 23,
        info: '我是一名热爱写程序的跨性别学生，正励志成为一名前端程序员。前端程序员是离客户最近的程序员，
        她的魅力来自于前端程序中精妙的架构与优美的页面设计，我希望能够加入前端这一行业，并在这里耕耘出自
        己的天地。'
    },
    education: {
        bachelorDegree: new Map().set('中国石油大学（华东）[211]','优秀毕业生'),
        masterDegree: new Map().set('上海科技大学[2023毕业]','已发表两篇核心期刊论文'),
    },
    skillStack: [HTML, CSS, JavaScript, TypeScript, Webpack, Vue, ElementUI, Vuetify],
    experience: {
        personalSite: {
            title: '自己的静态网站：ankhblog.qiucle.cn',
            tech: [
                Vue('JS框架'),
                Vuetify('UI框架'),
                COS('部署在腾讯云对象存储上'),
                markdownIt('解析markdown文章，并实现高亮代码、添加目录等功能')
            ],
            content: '这个网站记录了我的前端学习经历，另外还展示了我的随笔画。'
        },
        weChatMiniProgram:{
            title: 'Hades游戏攻略手册',
            tech: [
                uniApp('小程序框架'),
                ui('按游戏风格自行设计UI')
            ],
            preview:'ankhblog.qiucle.cn/ui'
        }
    },
    advantages: [
        '热爱技术，敢于钻研（最近有试着阅读Vue3源码）',
        'Good Command of English',
        '乐观积极，善于沟通',
        { hobbies: ['画画', '平面设计'] }
    ]
};`,
    };
  },
  methods: {
    mountResume() {
      hljs.configure({ useBR: true });
      this.innerHTML = hljs.highlight(this.str, {
        language: "javascript",
      }).value;

      // const name = document.querySelector("#container > span:nth-child(3)");
      // name.innerHTML = "张环宇";
    },
  },
  mounted() {
    this.mountResume();
  },
};
</script>

<style scoped>
@import url(../utils/animate/animate.css);
@import url(../utils/github.css);
.about {
  height: 1250px;
}
#div {
  position: absolute;
  width: 1000px;
  height: 90%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  background-color: #fcf6e5;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 0 10px;
  /* box-shadow: -2px -2px 2px 1px rgba(0, 0, 0, 0.2); */
}

input {
  position: relative;
  left: 50%;
  top: 10%;
  transform: translate(-50%, -50%);
}

#container span {
  width: 100%;
  word-wrap: break-word;
  white-space: normal;
}

.circle {
  display: inline-block;
  margin-right: 5px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  /* border: 1px solid; */
}

.red {
  background-color: #ec6a5e;
}
.yellow {
  background-color: #f4be4f;
}
.green {
  background-color: #62c554;
}
#container > span:nth-child(3) {
  font-size: 40px;
}
</style>