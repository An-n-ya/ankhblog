---
title: Vue3_learn_snabbdom
tags:
    - vue3
    - virtualNode
addTime: 1630283709978


---

# Vue3源码学习--虚拟DOM

[[toc]]

## 虚拟DOM

众所周知，DOM 是一种通过对象表示结构化文档的方式，DOM 的主要问题是没有为创建动态 UI 而优化，在实际开发中动态创建 UI 时往往需要频繁地销毁 / 创建 DOM 结构，虚拟DOM就是尝试解决这个问题的一种探索。

虚拟 DOM 是基于 DOM 的一种抽象，通常表现为轻量化的 JavaScript 对象，由于JavaScript 操作对象比操作 DOM 快，因此我们可以快速更改虚拟 DOM 结构，然后把改变的结构找出来同步到实际 DOM 中去。为了完成上述操作，虚拟 DOM 需要解决以下问题：

1. 高效的 diff 算法，即两个虚拟 DOM 的比较
2. 只更新需要更新的 DOM 节点
3. 数据变化检测

<!-- more -->

虚拟 DOM 的实现有很多，[snabbdom](https://github.com/snabbdom/snabbdom) 是最经典的一个，snabbdom 代码量少（核心代码只有200多行），模块化，结构清晰。snabbdom 主要的接口有两个：

* `h(sel, data, c)`，返回虚拟 DOM 树。
* `patch(oldVnode, newVnode)`，比较新旧虚拟 DOM 并更新。

## snabbdom的实现

在介绍具体实现之前，先看一下 snabbdom 所定义的虚拟 DOM 到底长什么样。对于下面的这段 HTML 代码来说，

```html
<div class="box"> 
  <h3>我是一个标题</h3> 
  <ul>
    <li>牛奶</li> 
    <li>咖啡</li> 
    <li>可乐</li>
  </ul> 
</div>
```

它转化为虚拟 DOM 后，是这样子的

```js
{
  "sel": "div",
  "data": {
  	"class": { "box": true }
  }, 
  "children": [
    {
      "sel": "h3",
      "text": "我是一个标题" 
    },
    {
      "sel": "ul",
      "data": {}, 
      "children": [
        {"sel": "li", "text": "牛奶"},
        {"sel": "li", "text": "咖啡"},
        {"sel": "li", "text": "可乐"},
      ] 
    }
}
```

可以看到，所谓的虚拟 DOM 就是一个 JavaScript 对象，每个标签对应于一个对象，标签名对应于 `sel` 属性， 标签属性对应于 `data`属性，子 DOM 对应于 `children` 数组，而`innerText`对应于`text`属性，其中`text`和`children`二选一，不可共存。关于如何从 DOM 变为虚拟 DOM，这个属于模板编译原理的内容，和上一篇[文章]()谈到的 mustache 类似，这篇文章不讨论这个问题。

基于上述观察，我们发现一个 vnode 对象有六个元素组成，分别是：

* `sel`
* `data`
* `children`
* `text`
* `elm`
* `key`

前四个我们已经见过，`elm`表示挂载该虚拟 DOM 的实际 node。而 `key` 就是用以区分 vnode 的唯一标识符，`key`能够帮助 snabbdom 快速比较不同的 DOM 结构。基于此，我们便可以写出 vnode 的函数。

```js
function vnode(sel, data, children, text, elm) {
    const key = data.key
    return { sel, data, children, text, elm, key }
}
```

接下来便需要产生 vnode 对象的构造函数了，snabbdom 管这个函数叫`h` 函数。（为啥这么奇怪🤔）

### `h`函数---创建vnode

snabbdom 原版的`h`函数能够接受1-3个参数，我们对此进行简化，只实现接受3个参数的`h`函数。

`h`函数的前两个参数含义一般不会有变化，第一个是字符串，表示标签名，比如`div`，`h1`等，第二个参数是一个对象，表示标签的属性，比如`href`，`key`，`class`等，第三个参数分为两种情况，要么是数组要么是字符串，如果是数组，则对应于 children 属性，且数组内的元素应该是 vnode 对象；如果是字符串，则对应于 text . 就像之前提到的， text 属性不会喝 children 属性共存，原因就在于`h函数只允许两者中的一个存在。

基于此，我们可以写出简易版的`h`函数了：

```js
export default function h(sel, data, c) {
    if (arguments.length !== 3) {
        throw new Error('对不起，只能接受三个参数')
    }
    if (typeof sel === 'string' && typeof data === 'object' && typeof c === 'string') {
        return vnode(sel, data, undefined, c, undefined)
    } else if (typeof sel === 'string' && typeof data === 'object' && Array.isArray(c)) {
        let children = [];
        for (let item of c) {
            // 如果数组里的item不是对象或者是带有sel的对象，则跑出错误
            if (!(typeof item === 'object' && typeof item.sel === 'string')) {
                throw new Error('数组中应该是h函数的return')
            }
            children.push(item)
        }
        return vnode(sel, data, children, undefined, undefined)
    } else if (typeof sel === 'string' && typeof data === 'object' && typeof c === 'object' && typeof c.sel === 'string') {
        return vnode(sel, data, [c], undefined, undefined)
    }
}
```

### `patch`函数--- snabbdom 的核心

`h`函数定义了虚拟 DOM 的数据结构，而`patch`函数便是解决上面所提到的虚拟 DOM 框架需要解决的三个问题。

首先看`patch`函数的形参，分别为`oldVnode`和`newVnode`，这两个参数往往都是 vnode，但也有例外，在最开始挂载虚拟 DOM 的时候，往往需要传入一个真实的 DOM 节点，比如对于一个`<div id="container"></div>`的 div 标签，如果我们想把虚拟 DOM 挂在到它上边，需要如下代码

```js
let container = document.getElementById('container');
patch(container, vnode)
```

这个时候，`patch`函数的第一个参数就不是vnode ，这个时候需要在 `patch`函数内做判断，视情况创建 vnode 。

```js
// 如果旧虚拟DOM不是虚拟DOM
if (oldVnode.sel == undefined) {
  // 创建新的vnode
  oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], '', oldVnode)
}
```

接下来的问题是如何判断两个 vnode 是否不同，这里便需要引入 snabbdom 中判断两个 vnode 相同的条件了，在 snabbdom 中，如果两个 vnode 的 sel 相同且 key 也相同，那么这两个 vnode 便视为相同，这个规则被很多采用虚拟 DOM 的架构借鉴，比如 Vue 和 React 。这也就意味着，如果两个 vnode 的 sel 或者 key 有一个不相等，snabbdom 在渲染 DOM 结构的时候会把两个 vnode 视为完全不同的虚拟 DOM ，oldVnode会被完全清空，而newVnode会在原来oldVnode的位置上重新创建。如果两个 vnode 相同，则来到了 snabbdom 最核心也是最难的一部分：如何比较两者的不同，并选择性的更新必要的部分。

基于上述分析，我们可以把`patch`函数的实现大致写出来，其中关于比较相同的 vnode 中不同的部分，我们先用`diff`函数表示。

```js
function patch(oldVnode, newVnode) {
    // 如果旧虚拟DOM不是虚拟DOM
    if (oldVnode.sel == undefined) {
        // 创建新的vnode
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], '', oldVnode)
    }
    if (oldVnode.sel == newVnode.sel && oldVnode.key == newVnode.key) {
        patchVnode(oldVnode, newVnode)
    } else {
        let newDom = createElement(newVnode)
        oldVnode.elm.parentNode.insertBefore(newDom, oldVnode.elm)
        // 删除老节点  
        oldVnode.elm.parentNode.removeChild(oldVnode.elm);
    }
}
```

### `createElement`函数---从 vnode 到 DOM

在讲 diff 算法之前，还有个问题是如何把 vnode 渲染为真正的 DOM。这个问题不难解决，vnode 对象中存储了渲染一个 DOM 结构所需要的一切信息，我们可以从 sel 属性中得到带渲染 DOM 的标签名，从 text 属性中可以获得标签内容，而从 children 中可以获得该标签的所有子标签，因此我们采用递归结构，并结合一些 DOM API 便可以完成这个函数：

```js
function createElement(vnode) {
    // 创建孤儿节点
    let newDom = document.createElement(vnode.sel);

    // 若vnode只含text，不含children
    if (vnode.text != '' && (vnode.children == undefined || vnode.children.length == 0)) {
        newDom.innerText = vnode.text;
    } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
        for (let i = 0; i < vnode.children.length; i++) {
            let childDom = createElement(vnode.children[i]);
            newDom.appendChild(childDom)
        }
    }
    // 补充elm属性
    vnode.elm = newDom
    return vnode.elm
}
```

## diff 算法

diff 算法是如此的重要，以至于我新开了一个章节来讲这一部分内容。diff 算法最早是由 [Neil Fraser](https://neil.fraser.name/writing/diff/) 在2006年提出的，当时只用于寻找两个字符串之间的不同，后来该算法引入了前段界，在众多虚拟 DOM 架构（Inferno，snabbdom）中便使用了这套算法。

snabbdom 算法里使用的算法如下：

首先讨论在 vnode 相等时出现的各种情况，

1. 新节点为 text 节点
2. 新节点为 children 节点，旧节点为 text 节点
3. 新旧节点均为 children节点

对于第一种情况，直接把旧节点的 innerText 换成新节点的 text 即可，这样不必重新渲染挂载 DOM 结构。

对于第二种情况，需要使用上文中提到的 createElement 方法，把 children 中的所有节点转化为 DOM ，然后再清空旧节点的 innerHTML，并将新建的 DOM 插入进去。这样便不用拆除之前旧节点的 DOM 结构。

第三种情况最复杂，需要用到 diff 算法。对于新旧子节点，分别定义了前后两个指针，

![diff1](https://picture-bed-1301848969.cos.ap-shanghai.myqcloud.com/diff1.png)

比较分为四个过程：

1. 新前比旧前

2. 新后比旧后

3. 新后比旧前（将旧前指向的节点移动到旧后后边）

4. 新前比旧后（将旧后指向的节点移动到旧前前边）

按上述顺序逐一比较，当有一个条件满足后，后面的条件不再执行。新前和旧前比完后，指针向下👇移动一位，旧后和新后比完后，指针向上👆移动一位，直到新前的位置低于新后的位置或者旧前的位置低于旧后的位置。

若四个过程都没有匹配到（命中🎯），则进入下一阶段，在旧子节点中寻找新前指向的节点，分为两种情况：

* 若找到，将该节点移动到旧前前面
* 若未找到，直接讲新前指向的节点加入到 DOM 节点中。

当循环结束时，进入下一阶段，下一阶段又分为两种情况

* 新前的位置低于新后的位置：说明newVnode短，需要删除多余的oldVnode
* 旧前的位置低于旧后的位置：说明oldVnode短，需要添加多余的newVnode

最终的执行过程可以参考以下程序流程图：

![流程图](https://picture-bed-1301848969.cos.ap-shanghai.myqcloud.com/%E6%B5%81%E7%A8%8B%E5%9B%BE.jpg)

