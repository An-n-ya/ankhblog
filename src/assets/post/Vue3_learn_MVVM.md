---
title: Vue3_learn_MVVM
tags:
    - vue3
    - reactive
addTime: 1630481581121



---

# Vue3源码学习--响应式原理

[[toc]]

## MVVM

所谓的MVVM指的是`Model↔︎View`，即数据变化，视图自动变化，举例来说，对于一个视图

```html
<p>你好，我叫{{ name }}</p>
```

这里 mustache 语句里的 name 定义在 JavaScript 对象中：

```js
this.name = '小张'
```

当 name 改变时，视图会更新，这时候便需要手段监听数据的改变，这个过程便是 MVVM 的主要思想。

在 react 中，若果数据变化，需要使用 `this.setState` 函数更新变化，这种方法称为侵入式设计，而在 Vue 中，当数据变化后，无需其他操作，视图会自动跟新，这种方式为非侵入式。

本文章讲述 Vue2 中的响应式原理。

## `Object.defineProperty`---响应式设计的核心

MVVM 的核心就是监听数据，JavaScript 原生给出了 get 和 set 两个变量方法用以监听，ES6 引入了更高级的 Proxy 代理模式，可以更方便、快速的处理 Vue2 不能处理的问题，比如数组索引更新

```js
a[i] = 3
```

这里先介绍 Vue2 的方式。`defineProperty`可以给某个对象加入属性，并且可以对这个属性进行深入的配置，比如设置`enumerable`，`writable`等属性，还可以配置`get`和`set`方法用以监听该属性的设置和调用。

基于此，我们可以封装一个`defineReactive`函数对某个对象中**指定**的属性进行监听。

```js
/*
 * @param {object} obj //输入对象
 * @param {string} key //对象的属性
 * @param {any} val //属性对应的值
 * @return undefined
*/
var defineReactive = function (obj, key, val) {
    // 如果只有两个参数，则把该对象属性的值作为val
    if (arguments.length == 2) {
        val = obj[key]
    }
    Object.defineProperty(obj, key, {
        // 令该属性可以被枚举
        enumerable: true,
        // 令该属性可以被删除 delete
        configurable: true,
        get() {
            console.log('正在读取' + key + '的值', val);
            // 直接返回原值
            return val;
        },
        set(newValue) {
            console.log('正在修改' + key + '的值', val);
            // 如果新值与原值不相同，才进行更新
            if (newValue !== val) {
                val = newValue;
            }
        }
    })
}
```

目前这个函数的功能还很弱，只能对指定对象的制定属性进行监听，若一个对象中有多个属性需要监听，这个函数使用起来就很麻烦。为此我们定义一个 observe 函数和 一个 Observer 类用来解决这些问题。

## `Obsever`类

为了遍历对象中的所有属性，我们引入 Observer 类，并引入 observe 来监听一个对象当中的所有子属性（包括所有层级）。

对于一个有嵌套层级的对象 obj ：

```js
let obj = {
    c: {
        d: {
          f: 'hello'
        }
    },
    d: {
        e: '😄'
    },
    e: 3
}
```

嵌套解析这个对象的流程如下：

![Observer](https://picture-bed-1301848969.cos.ap-shanghai.myqcloud.com/Observer.jpg)

可以发现，这是一个由三个函数组成的嵌套循环，这个循环的终止条件是遇到某一项不为对象。另外，值得注意的是 defineReactive 中设置 set 函数时，若遇到的设置值为对象，则仍需要调用 observe ，这样做的目的是让新添加的对象也能被监听。

不过目前的 observer 类还不能处理数组。不过处理数组比较麻烦，Vue2 重载了 Array 的7种方法。

## 监听数组

我们需要监听数组什么时候改变，但是 JavaScript 没有提供像对象那样的 defineProperty 那样的接口，所以 Vue2 对于数组的直接访问和修改是没有办法监听的，比如 `a[0]=10` 这个语句是没有办法监听的。

但在实际工作中，对数组的修改往往是通过数组的方法实现的，比如'push', 'pop', 'splice'，因此 Vue2 修改了 Array 原型中的常用的七个方法，他们分别是:

* pop
* push
* shift
* unshift
* splice
* sort
* reverse

Vue2 用了一种很巧妙的方法来“继承”这些方法，并监听了这些方法。

其实前文说 Vue2 修改了原型中的七个方法并不准确，Vue2 是做了一个新的原型，而这个原型继承自 Array 的原型，在这个新的原型上，Vue2 修改了七个方法。整个过程如下图所示

![arrayMethod](https://picture-bed-1301848969.cos.ap-shanghai.myqcloud.com/arrayMethods.png)

对于 arrayMethods 对象，通过 `Object.defineProperty`方法修改上述七种方法。在这里 Vue2 有一个很巧妙的操作，就是在改写这些方法时，调用 Array.prototype 的原始方法，将其作为结果，在进行进一步的监控，代码如下：

```js
/*
 * @param {object} arrayMethods //上文中谈到的新的 prototype 对象
 * @param {string} methodsName //待改写的方法名
*/
Object.defineProperty(arrayMethods, methodsName, {
  // 让这些方法不可遍历
  enumerable: false,
  value: function () {
    const arg = [...arguments];
    // '继承'原来的方法
    const result = origin.apply(this, arg);

    // 获取__ob__对象
    const ob = this.__ob__;

    // 获取方法中的参数
    let inserted = [];
    switch (methodsName) {
      case 'push':
      case 'unshift':
        inserted = arg;
        break;
      case 'splice':
        // 获取2编号以后的参数
        inserted = arg.slice(2);
        break;
    }
    // 对新加入的参数进行观测
    if (inserted) {
      ob.arrayReactive(inserted)
    }
    console.log('你正在使用' + methodsName + '的方法');
    return result
  }
}
```

上述代码并没有对各个方法做过多的修改，只是简单的输出正在使用的方法`console.log('你正在使用' + methodsName + '的方法');`，对于‘push’，‘unshift’，‘splice’这类需要传参的函数，仍需要对传入的参数进行监测，所以用 switch 语句分情况处理这些函数。

最后一步是在 Observer 类中判断输入参数是否为数组，使用 `Object.setPrototypeOf`方法更改该数组的原型为 arrayMethods ，

```js
if (Array.isArray(obj)) {
  // 改变原型（即监测push，pop，shift这些方法）
	Object.setPrototypeOf(obj, arrayMethods)
  // 对数组中的每个元素进行监测
  for (let i = 1; i < arr.length; i++) {
            observe(arr[i])
        }
}
```

## Dep 和 Watcher 类 --- 收集、渲染依赖

