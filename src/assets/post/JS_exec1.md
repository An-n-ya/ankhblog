---

title: JS_exec1
tags:
    - JavaScript
    - exercise
addTime: 1630114740755

---
# JavaScript练习[1]

### 数据类型判断

JavaScript的基本数据类型有`Null`,`Undefined`,`Boolean`,`Number`,`String`,`Object`，另外还有ES6新加的`Symbol`。

JavaScript 有内置的typeof操作符，它可以返回如下的值

| Type                                                         | Result        |
| :----------------------------------------------------------- | :------------ |
| [Undefined](https://developer.mozilla.org/en-US/docs/Glossary/undefined) | `"undefined"` |
| [Null](https://developer.mozilla.org/en-US/docs/Glossary/Null) | `"object"`    |
| [Boolean](https://developer.mozilla.org/en-US/docs/Glossary/Boolean) | `"boolean"`   |
| [Number](https://developer.mozilla.org/en-US/docs/Glossary/Number) | `"number"`    |
| [BigInt](https://developer.mozilla.org/en-US/docs/Glossary/BigInt) (new in ECMAScript 2020) | `"bigint"`    |
| [String](https://developer.mozilla.org/en-US/docs/Glossary/String) | `"string"`    |
| [Symbol](https://developer.mozilla.org/en-US/docs/Glossary/Symbol) (new in ECMAScript 2015) | `"symbol"`    |
| [Function](https://developer.mozilla.org/en-US/docs/Glossary/Function) object (implements [[Call]] in ECMA-262 terms) | `"function"`  |
| Any other object                                             | `"object"`    |

<!-- more -->

注意到，调用typeof null返回的是`object`，对于一些内置的JavaScript 全局对象比如`Date`,`Math`，`RegExp`typeof操作符只能返回`object`。另外，关于typeof操作符的一个知识点是：typeof操作符的优先级是1，这是最高的优先级，与++，！，delete等操作符同为最高优先级的操作符

我们知道，JavaScript 里每个对象都有toString方法，用来将对象按一定的规则变成字符串，其实这个toString方法继承自Object，如果这个方法没有被改写，那么它将会返回`[object type]`,这个type就是对象名（更准确的来说，是内置的`toStringTag`的symbol）。比如

```js
Math.toString() //[object Math]
typeof Math //'object'
```

但需要注意到，直接对对象使用toString方法，可能不能得到期望的方法：

```js
Date().toString() //'Sat Aug 28 2021 10:12:03 GMT+0800 (中国标准时间)'
null.toString() //TypeError: Cannot read property 'toString' of null
Math.max.toString() //'function max() { [native code] }'
```

这时候便需要调用toString方法的call( )或者apply( )方法：

```js
toString.call(new Date()) //'[object Date]'
toString.apply(null) //'[object Null]'
toString.call(Math.max) //'object Function'
```

注意到，这里的toString方法其实是全局对象`window`(浏览器里)或者`global`(nodeJS里)的方法，而window和global其实都是继承自Object。

因此，如果想得到更加精准的对象名，可以使用`Object.prototype.toString`方法，现在我们定义新的`typeOf`函数：

```js
function typeOf(obj){
  return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase()
}

typeOf([]) //'array'
typeOf(null) //'null'
typeOf(new Date()) //'date'
typeOf(Promise.resolve()) //'promise'
```

但这个方法其实是有隐患的，首先我们需要保证`Object.prototype.toString`没有被改写，其次，我们还需要保证内置的`toStringTag`没有被改写。

就像我们先前提到的，toString方法返回的type其实是内置的toStringTag

```js
Math.toString() //[object Math]
Math[Symbol.toStringTag] //'Math'
```

如果Symbol.toStringTag被更改，toString方法返回的值就不一定正确了，我们称之为原型污染

```js
Object.prototype.toString.call(new Date());     // [object Date]

Date.prototype[Symbol.toStringTag] = 'prototype polluted';
Object.prototype.toString.call(new Date()); // [object prototype polluted]
```

不过对于Math，null，undefined这样没有prototype属性的类型来说，就不会有原型污染的问题了。