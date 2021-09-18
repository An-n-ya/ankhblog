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

因此，如果想得到更加精准的对象名，可以使用`Object.prototype.toString`方法，

在 Object.prototype.toString( ) 中发生了如下过程：

<ol><li><span aria-hidden="true" style="font-size: 0px;">1. </span>If the <emu-val>this</emu-val> value is <emu-val>undefined</emu-val>, return <emu-val>"[object Undefined]"</emu-val>.</li><li><span aria-hidden="true" style="font-size: 0px;">2. </span>If the <emu-val>this</emu-val> value is <emu-val>null</emu-val>, return <emu-val>"[object Null]"</emu-val>.</li><li><span aria-hidden="true" style="font-size: 0px;">3. </span>Let <var>O</var> be !&nbsp;<emu-xref aoid="ToObject" id="_ref_7308"><a href="abstract-operations.html#sec-toobject">ToObject</a></emu-xref>(<emu-val>this</emu-val> value).</li><li><span aria-hidden="true" style="font-size: 0px;">4. </span>Let <var>isArray</var> be ?&nbsp;<emu-xref aoid="IsArray" id="_ref_7309"><a href="abstract-operations.html#sec-isarray">IsArray</a></emu-xref>(<var>O</var>).</li><li><span aria-hidden="true" style="font-size: 0px;">5. </span>If <var>isArray</var> is <emu-val>true</emu-val>, let <var>builtinTag</var> be <emu-val>"Array"</emu-val>.</li><li><span aria-hidden="true" style="font-size: 0px;">6. </span>Else if <var>O</var> has a [[ParameterMap]] internal slot, let <var>builtinTag</var> be <emu-val>"Arguments"</emu-val>.</li><li><span aria-hidden="true" style="font-size: 0px;">7. </span>Else if <var>O</var> has a [[Call]] internal method, let <var>builtinTag</var> be <emu-val>"Function"</emu-val>.</li><li><span aria-hidden="true" style="font-size: 0px;">8. </span>Else if <var>O</var> has an [[ErrorData]] internal slot, let <var>builtinTag</var> be <emu-val>"Error"</emu-val>.</li><li><span aria-hidden="true" style="font-size: 0px;">9. </span>Else if <var>O</var> has a [[BooleanData]] internal slot, let <var>builtinTag</var> be <emu-val>"Boolean"</emu-val>.</li><li><span aria-hidden="true" style="font-size: 0px;">10. </span>Else if <var>O</var> has a [[NumberData]] internal slot, let <var>builtinTag</var> be <emu-val>"Number"</emu-val>.</li><li><span aria-hidden="true" style="font-size: 0px;">11. </span>Else if <var>O</var> has a [[StringData]] internal slot, let <var>builtinTag</var> be <emu-val>"String"</emu-val>.</li><li><span aria-hidden="true" style="font-size: 0px;">12. </span>Else if <var>O</var> has a [[DateValue]] internal slot, let <var>builtinTag</var> be <emu-val>"Date"</emu-val>.</li><li><span aria-hidden="true" style="font-size: 0px;">13. </span>Else if <var>O</var> has a [[RegExpMatcher]] internal slot, let <var>builtinTag</var> be <emu-val>"RegExp"</emu-val>.</li><li><span aria-hidden="true" style="font-size: 0px;">14. </span>Else, let <var>builtinTag</var> be <emu-val>"Object"</emu-val>.</li><li><span aria-hidden="true" style="font-size: 0px;">15. </span>Let <var>tag</var> be ?&nbsp;<emu-xref aoid="Get" id="_ref_7310"><a href="abstract-operations.html#sec-get-o-p">Get</a></emu-xref>(<var>O</var>, <emu-xref href="#sec-well-known-symbols" id="_ref_7311"><a href="ecmascript-data-types-and-values.html#sec-well-known-symbols">@@toStringTag</a></emu-xref>).</li><li><span aria-hidden="true" style="font-size: 0px;">16. </span>If <emu-xref aoid="Type" id="_ref_7312"><a href="ecmascript-data-types-and-values.html#sec-ecmascript-data-types-and-values">Type</a></emu-xref>(<var>tag</var>) is not String, set <var>tag</var> to <var>builtinTag</var>.</li><li><span aria-hidden="true" style="font-size: 0px;">17. </span>Return the <emu-xref href="#string-concatenation" id="_ref_7313"><a href="ecmascript-data-types-and-values.html#string-concatenation">string-concatenation</a></emu-xref> of <emu-val>"[object "</emu-val>, <var>tag</var>, and <emu-val>"]"</emu-val>.</li></ol>

第三步的 ToObject 是 JavaScript 内部的抽象函数（Abstract Operation），它能够根据传入参数的类型返回如下结果

| Argument Type | Result                                                       |
| ------------- | ------------------------------------------------------------ |
| Undefined     | Throw a TypeError exception.                                 |
| Null          | Throw a TypeError exception.                                 |
| Boolean       | Return a new Boolean object whose [[BooleanData]] internal slot is set to argument. |
| Number        | Return a new Number object whose [[NumberData]] internal slot is set to argument. |
| String        | Return a new String object whose [[StringData]] internal slot is set to argument. |
| Symbol        | Return a new Symbol object whose [[SymbolData]] internal slot is set to argument. |
| BigInt        | Return a new BigInt object whose [[BigIntData]] internal slot is set to argument. |
| Object        | Return argument.                                             |

第四步的 isArray 函数也是 JavaScript 的抽象函数，它是通过判断是否是 Array exotic object ，来判断是否是 Array。至于 Array exotic object 是一个对 array index 键做特殊处理的 Array。

注意到第七步与其他步有些不同，第七步是通过判断 O 里是否有 [[call]] 这个方法来判断是否是函数。

可以看出 toString 方法会首先判断参数是否是七种基本类型，再对函数进行特殊判断处理，如果都不是，则结果为 Object，这时候将结果存到 builtinTag 里。

这时候程序来到第十五步，这里的 @@toStringTag 指的是 Symbol.toStringTag ，这个值是在对象创建的时候自动生成的，是用来表示该对象的字符串描述。

因为在创建对象时才会生成 Symbol.toStringTag ，所以可以与上述的 builtinTag 做互补。

现在我们定义新的`typeOf`函数：

```js
function typeOf(obj){
  return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase()
}

typeOf([]) //'array'
typeOf(null) //'null'
typeOf(new Date()) //'date'
typeOf(Promise.resolve()) //'promise'
```

通过以上分析就能看出这个方法其实是有隐患的，首先我们需要保证`Object.prototype.toString`没有被改写，其次，我们还需要保证内置的`Symbol.toStringTag`没有被改写。

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