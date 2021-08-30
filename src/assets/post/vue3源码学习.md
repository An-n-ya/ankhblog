---

title: Vue3_learn_mustache
tags:
    - vue3
    - mustache
addTime: 1630283709978

---
# Vue3源码学习--mustache

[[toc]]

## 模板引擎

所谓的模板引擎就是指把数据变为视图的方式，比如下图中，需要把左侧的数据转换为右侧的HTML代码

![mustache1](https://picture-bed-1301848969.cos.ap-shanghai.myqcloud.com/mustache1.png)

Vue的解决方案就是使用`v-for`：

```html
<li v-for="item in arr"></li>
```

其实`v-for`就是一种模板引擎，`Vue`借鉴了许多`Mustache`这一模板引擎的思路，不过在提`Mustache`之前，我们现看看历史上出现过的将数据变为视图的方法。

<!-- more -->

### 数据变为视图的方法

* DOM法

纯DOM方法的思路直接简单，<strong>渲染速度快</strong>，但使用起来很笨拙。具体思路如下

1. 通过`document.getElementById`获取DOM节点
2. 通过`document.createElement`方法创建需要的DOM结构，并通过`className`，`innerText`等属性添加对应的信息
3. 通过`Element.appendChild`挂载DOM节点（上树）

代码实现如下

```js
var list = document.getElementById('list');

for (var i = 0; i < arr.length; i++) {
  // 每遍历一项，都要用DOM方法去创建li标签
  let oLi = document.createElement('li');
  // 创建hd这个div
  let hdDiv = document.createElement('div');
  hdDiv.className = 'hd';
  hdDiv.innerText = arr[i].name + '的基本信息';
  // 创建bd这个div
  let bdDiv = document.createElement('div');
  bdDiv.className = 'bd';
  // 创建三个p
  let p1 = document.createElement('p');
  p1.innerText = '姓名：' + arr[i].name;
  bdDiv.appendChild(p1);
  let p2 = document.createElement('p');
  p2.innerText = '年龄：' + arr[i].age;
  bdDiv.appendChild(p2);
  let p3 = document.createElement('p');
  p3.innerText = '性别：' + arr[i].sex;
  bdDiv.appendChild(p3);

  // 创建的节点是孤儿节点，所以必须要上树才能被用户看见
  oLi.appendChild(hdDiv);
  // 创建的节点是孤儿节点，所以必须要上树才能被用户看见
  oLi.appendChild(bdDiv);
  // 创建的节点是孤儿节点，所以必须要上树才能被用户看见
  list.appendChild(oLi);
}
```

* 数组join法

该方法是**字符串**思路，有点类似于元编程的想法。具体来说，就是通过遍历渲染一个HTML字符串，然后把该字符串加到对应的DOM节点下的innerHTML。

一串这样的HTML字符串是有换行的

```html
<li>
  <div class="hd">小明的基本信息</div>
  <div class="bd">
    <p>姓名:小明</p>
    <p>年龄:12</p>
    <p>性别:男</p>
  </div>
</li>
```

在ES6之前，没有模板字符串，普通字符串是不能直接换行的。因此，有人想出用数组的方式实现换行的形式，并且还可以通过斩断字符串加入数据，最后再通过`join('')`方法将整个数组渲染成一个字符串。代码实现如下

```js
var list = document.getElementById('list');

// 遍历arr数组，每遍历一项，就以字符串的视角将HTML字符串添加到list中
for (let i = 0; i < arr.length; i++) {
  list.innerHTML += [
    '<li>',
    '    <div class="hd">' + arr[i].name + '的信息</div>',
    '    <div class="bd">',
    '        <p>姓名：' + arr[i].name + '</p>',
    '        <p>年龄：' + arr[i].age  + '</p>',
    '        <p>性别：' + arr[i].sex + '</p>',
    '    </div>',
    '</li>'
  ].join('')
}
```

这个方法就比上一个DOM法要优雅很多，但由于这个方法是先渲染字符串，然后再渲染DOM结构，因此比纯DOM法慢。不过随着当下计算机的计算力和浏览器引擎的发展，数组join法多出来的微小计算量并不会影响用户体验。值得注意的是，这种方法到今天也是有一定实用价值的，如果遇到不能使用JavaScript框架和ES6的环境，便可以考虑使用这种方法。

* 模板字符串法

该方法和字符串join法的思路是一样的，只不过该方法利用了简单便捷的模板字符串实现。代码如下

```js
var list = document.getElementById('list');

// 遍历arr数组，每遍历一项，就以字符串的视角将HTML字符串添加到list中
for (let i = 0; i < arr.length; i++) {
  list.innerHTML += `
      <li>
      <div class="hd">${arr[i].name}的基本信息</div>    
      <div class="bd">
      <p>姓名：${arr[i].name}</p>    
      <p>性别：${arr[i].sex}</p>    
      <p>年龄：${arr[i].age}</p>    
      </div>    
      </li>
    `;
}
```

这种方法利用了ES6的模板字符串，简单直接好用，还有语法高亮，不过使用这种方法渲染出来的HTML代码会带有换行符，从代码压缩的角度来看，不如数组join法好。

* 模板引擎

最后一种方法便是这篇文章的重点：模板引擎方法。

有人或许会想模板字符串的方法已经很优雅了，为什么还需要模板引擎呢。事实上，如果是单层循环结构，模板字符串能处理的很好，但在实际应用中，多层循环是很常见的，这时候模板字符串也好数组join法也好，便都不是很好用了。于是，便出现了mustache这一模板引擎的编程思路的出现。这个思路对于前端界的影响是巨大的，后来许多好用的模块都借鉴了mustache的思想。

mustache最早是应用在Ruby语言下的，大约在2014年，出现了JavaScript下的mustache实现，mustache.js的源代码放在了[这里](https://github.com/janl/mustache.js)

mustache原意为胡子，就是指mustache常用的符号`{`垂直放置起来，就很像胡子

![mustache](https://picture-bed-1301848969.cos.ap-shanghai.myqcloud.com/a3cf700e-2f02-11e5-869a-300312fb7a00.gif)

说了这么多关于mustache的历史，来看看它的用法吧

### mustache基本使用

mustache的**模板语法**非常简单，对于上述案例，它的模板语法如下：

```html
<ul>
   {{#arr}}
    <li>
      <div class="hd">{{name}}的基本信息</div> 
      <div class="bd">
        <p>姓名:{{name}}</p> 
        <p>性别:{{sex}}</p> 
        <p>年龄:{{age}}</p>
      </div> 
     </li>
	{{/arr}} 
</ul>
```

注意到，它使用了`{{`和`}}`符号，这和vue里的模板语法是一致的。与`v-for`相对应的，mustache使用`{{#arr}}`和`{{/arr}}`的形式来表示循环的开始和结束。

在输入完上面的模板字符串后，使用`Mustache.render`方法，将数据和模板语法渲染成目标DOM结构：

```js
Mustache.render(templateStr, data);
```

得益于直接在HTML代码中实现循环结构，mustache可以很方便的处理嵌套循环。举例来说，对于这样一组嵌套数据：

```js
var data = {
  students: [
    { 'name': '小红', 'age': 12, 'hobbies': ['游泳', '编程'] },
    { 'name': '小张', 'age': 13, 'hobbies': ['画画', '编程', '听音乐'] },
    { 'name': '小郑', 'age': 14, 'hobbies': ['睡大觉'] }
  ]
};
```

可以写出如下模板字符串

```js
var templateStr2 = `
        <div> 
            <ul>
                {{#students}}
                <li> 学生{{name}}的爱好是 
                    <ol>
                        {{#hobbies}}
                        <li>{{.}}</li>
                        {{/hobbies}}
                    </ol> 
                </li>
                {{/students}}
            </ul>
        </div>
     `
```

最后便可以渲染出：

![result](https://picture-bed-1301848969.cos.ap-shanghai.myqcloud.com/144201630286787_.pic.jpg)

还有个疑问，我们在写模板语法的时候还是用到了模板字符串，要知道mustache.js是2014年发布的，那个时候还没有ES6，如果没有ES6该怎么写模板语法呢，这个问题的解决方法很简单，就是在`<script>` 标签里边写模板语法即可，同时将该标签的type声明为`text/template`，或者是任何其他你喜欢的名字，只要不是`text/javascript`即可，这样这个script标签浏览器便不会认识，到时候也不会被渲染出来，需要使用模板语法的时候，通过选择器抓取该标签的innerHTML即可。

## mustache实现原理

如果是简单的模板语法，比如

::: primary {模板语法}

```js
<h1>我买了一个{{thing}}，好{{mood}}呀！</h1>
```

:::

::: warning {数据}

```js
{
  	thing: '手机',
    mood: '开心'
}
```

:::

能想到的方法是正则匹配。

```js
 // 最简单的模板引擎的实现机理，利用的是正则表达式中的replace()方法。
// replace()的第二个参数可以是一个函数，这个函数提供捕获的东西的参数，就是$1
// 结合data对象，即可进行智能的替换
function render(templateStr, data) {
  return templateStr.replace(/\{\{(\w+)\}\}/g, function (findStr, $1) {
    return data[$1];
  });
}

var result = render(templateStr, data);
```

但是该方法只能处理简单的数据和模板语法，处理不了循环。

mustache的思路是先将模板语法渲染为tokens结构，再与数据结合，最终渲染为DOM字符串：

![mustache2](https://picture-bed-1301848969.cos.ap-shanghai.myqcloud.com/mustache2.png)

Tokens结构被很多其他模块借鉴，比如[markdown-it](https://github.com/markdown-it/markdown-it)

### Scanner类

为了扫描tokens里的text元素、name元素、#元素，我们引入Scanner类。

Scanner类包含两个三个属性，`templateStr`：当前模板语法，`pos`：当前指针，`tail`：余下的模板语法。Scanner类还包含两个方法，一个用来扫描`beginTag`和`endTag`以外的语句，一个用来跳过`beginTag`和`endTag`语句，在mustache中，常用的Tag便是`{{`和`}}`。具体代码如下

```js
export default class Scanner {
    constructor(templateStr) {
        this.templateStr = templateStr;

        // 指针
        this.pos = 0;
        // 尾巴，一开始就是模板字符串的原文
        this.tail = templateStr;
    }
    // 掠过指定内容，没有返回值
    scan(Tag) {
        if (this.tail.indexOf(Tag) == 0) {
            // Tag有多长，指针就加多少
            this.pos += Tag.length
            // 变换尾巴
            this.tail = this.templateStr.substr(this.pos)
        }
    }
    //让指针进行扫描，知道遇见指定内容结束，并且返回结束前路过的文字
    scanUntill(stopTag) {
        // 缓存初始指针位置
        const pos_backup = this.pos
        // 如果第一个tail的第一个符号不是终止符，便改变指针的位置，并且改变tail
        while (this.tail.indexOf(stopTag) !== 0 && this.eos()) {
            // 指针➕1
            this.pos++
            // 变换尾巴
            this.tail = this.templateStr.substr(this.pos)
        }
        // 返回指针走过的内容
        return this.templateStr.substring(pos_backup, this.pos)
    }
    // 用来判断指针是否已经到头
    eos() {
        return this.pos < this.templateStr.length
    }
}
```

基于此，我们可以生成一个初步的Tokens结构：

```js
    // 初始化tokens数组
    let tokens = [];
    // 实例化一个扫描器
    var scanner = new Scanner(templateStr)
    while (scanner.pos !== templateStr.length) {
        var word = scanner.scanUntill('{{')
        // 这里的word是text信息
        if (word !== '') {

            tokens.push(['text', word])
        }
        scanner.scan('{{')

        var word = scanner.scanUntill('}}')
        // 这里的word是name信息

        if (word !== '') {
            // 分别处理不同的类型
            if (word[0] == '#') {
                tokens.push(['#', word.substr(1)])
            }
            else if (word[0] == '/') {
                tokens.push(['/', word.substr(1)])
            } else {

                tokens.push(['name', word])
            }
        }
        scanner.scan('}}')
    }
```

现在的tokens是没有嵌套结构的，我们可以实现一个`nestedTokens`函数来做转换，这里的代码比较可以说是mustache中最精巧的一部分了：通过栈结构对嵌套部分进行存储，再通过`collect`指针引导压栈位置。

```js
export default function nextTokens(tokens) {
    // 结果tokens
    let nestedTokens = []
    // 栈结构
    let sections = []
    // 指针
    let collect = nestedTokens
    for (let item of tokens) {
        switch (item[0]) {
            case '#':
            		// 压栈
                sections.push(item)
								// 创建嵌套部分的子数组，并令collect指向该子数组
                collect = item[2] = []
                break;
            case '/':
                // 弹栈，这时候栈顶变化了
                let token_pop = sections.pop()
                // 如果栈空，则让collect指向nestedTokens
                collect = sections.length > 0 ? sections[sections.length - 1][2] : nestedTokens
                collect.push(token_pop)
                break;
            default:
            	  // 向collect指向的数组中压入数据
                collect.push(item)

        }
    }
    return nestedTokens
}
```

最后一步是把数据和Tokens结合起来，最后渲染成DOM字符串，在遇到text类型时，直接加上该token的内容，在遇到name类型时，则需要访问对应的数据`data`，在遇到`#`类型时，则需要进行循环，并嵌套渲染DOM字符串。

```js
export default function parseDOM(tokens, data) {
    let dom = '';
    for (let token of tokens) {
        if (token[0] == 'text') {
            dom += token[1];
        } else if (token[0] == 'name') {
            dom += data[token[1]]
        } else if (token[0] == '#') {
            for (let item of data[token[1]]) {

                dom += parseDOM(token[2], { ...item, '.': item })
            }
        }
    }
    return dom
}
```

至此，mustache的基本架构便完成了，mustache还有许多其他好玩的特性，这部分的实现可以参考[官方文档](http://mustache.github.io/)和[代码](https://github.com/janl/mustache.js)。本文提到的所有代码都托管在[这里](https://gitee.com/ankh04/vue3_learn/tree/main/mustache)
