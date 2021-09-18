---

title: WebDiary_five
tags:
    - web
    - diary
addTime: 1631952173724

---
## 判断 JavaScript 中对象的类型

方案一： typeof

这个操作符只能判断基本数据类型(和 function)，对于引用数据类型只能返回 object。

方案二：toString

这时候可以考虑使用 Object 原型下的方法 Object.prototype.toString( ).

这个方法会返回如下形式的字符串 `[object type]`，其中的 type 就是我们需要的对象类型。

在 Object.prototype.toString( ) 中发生了如下过程：

<ol><li><span aria-hidden="true" style="font-size: 0px;">1. </span>If the <emu-val>this</emu-val> value is <emu-val>undefined</emu-val>, return <emu-val>"[object Undefined]"</emu-val>.</li><li><span aria-hidden="true" style="font-size: 0px;">2. </span>If the <emu-val>this</emu-val> value is <emu-val>null</emu-val>, return <emu-val>"[object Null]"</emu-val>.</li><li><span aria-hidden="true" style="font-size: 0px;">3. </span>Let <var>O</var> be !&nbsp;<emu-xref aoid="ToObject" id="_ref_7308"><a href="abstract-operations.html#sec-toobject">ToObject</a></emu-xref>(<emu-val>this</emu-val> value).</li><li><span aria-hidden="true" style="font-size: 0px;">4. </span>Let <var>isArray</var> be ?&nbsp;<emu-xref aoid="IsArray" id="_ref_7309"><a href="abstract-operations.html#sec-isarray">IsArray</a></emu-xref>(<var>O</var>).</li><li><span aria-hidden="true" style="font-size: 0px;">5. </span>If <var>isArray</var> is <emu-val>true</emu-val>, let <var>builtinTag</var> be <emu-val>"Array"</emu-val>.</li><li><span aria-hidden="true" style="font-size: 0px;">6. </span>Else if <var>O</var> has a [[ParameterMap]] internal slot, let <var>builtinTag</var> be <emu-val>"Arguments"</emu-val>.</li><li><span aria-hidden="true" style="font-size: 0px;">7. </span>Else if <var>O</var> has a [[Call]] internal method, let <var>builtinTag</var> be <emu-val>"Function"</emu-val>.</li><li><span aria-hidden="true" style="font-size: 0px;">8. </span>Else if <var>O</var> has an [[ErrorData]] internal slot, let <var>builtinTag</var> be <emu-val>"Error"</emu-val>.</li><li><span aria-hidden="true" style="font-size: 0px;">9. </span>Else if <var>O</var> has a [[BooleanData]] internal slot, let <var>builtinTag</var> be <emu-val>"Boolean"</emu-val>.</li><li><span aria-hidden="true" style="font-size: 0px;">10. </span>Else if <var>O</var> has a [[NumberData]] internal slot, let <var>builtinTag</var> be <emu-val>"Number"</emu-val>.</li><li><span aria-hidden="true" style="font-size: 0px;">11. </span>Else if <var>O</var> has a [[StringData]] internal slot, let <var>builtinTag</var> be <emu-val>"String"</emu-val>.</li><li><span aria-hidden="true" style="font-size: 0px;">12. </span>Else if <var>O</var> has a [[DateValue]] internal slot, let <var>builtinTag</var> be <emu-val>"Date"</emu-val>.</li><li><span aria-hidden="true" style="font-size: 0px;">13. </span>Else if <var>O</var> has a [[RegExpMatcher]] internal slot, let <var>builtinTag</var> be <emu-val>"RegExp"</emu-val>.</li><li><span aria-hidden="true" style="font-size: 0px;">14. </span>Else, let <var>builtinTag</var> be <emu-val>"Object"</emu-val>.</li><li><span aria-hidden="true" style="font-size: 0px;">15. </span>Let <var>tag</var> be ?&nbsp;<emu-xref aoid="Get" id="_ref_7310"><a href="abstract-operations.html#sec-get-o-p">Get</a></emu-xref>(<var>O</var>, <emu-xref href="#sec-well-known-symbols" id="_ref_7311"><a href="ecmascript-data-types-and-values.html#sec-well-known-symbols">@@toStringTag</a></emu-xref>).</li><li><span aria-hidden="true" style="font-size: 0px;">16. </span>If <emu-xref aoid="Type" id="_ref_7312"><a href="ecmascript-data-types-and-values.html#sec-ecmascript-data-types-and-values">Type</a></emu-xref>(<var>tag</var>) is not String, set <var>tag</var> to <var>builtinTag</var>.</li><li><span aria-hidden="true" style="font-size: 0px;">17. </span>Return the <emu-xref href="#string-concatenation" id="_ref_7313"><a href="ecmascript-data-types-and-values.html#string-concatenation">string-concatenation</a></emu-xref> of <emu-val>"[object "</emu-val>, <var>tag</var>, and <emu-val>"]"</emu-val>.</li></ol>

<!-- more -->

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

因为在创建对象时才会生成 Symbol.toStringTag ，所以可以与上述的 builtinTag 做互补，

## JavaScript 类型转换

JavaScript 的类型转换基本分为四种情况：

1. 转布尔
2. 转数字
3. 转字符串
4. 转基本类型

### 转布尔

| Argument Type | Result                                                       |
| ------------- | ------------------------------------------------------------ |
| Undefined     | Return false.                                                |
| Null          | Return false.                                                |
| Boolean       | Return argument.                                             |
| Number        | If argument is +0𝔽, -0𝔽, or NaN, return false; otherwise return true. |
| String        | If argument is the empty String (its length is 0), return false; otherwise return true. |
| Symbol        | Return true.                                                 |
| BigInt        | If argument is 0ℤ, return false; otherwise return true.      |
| Object        | Return true.                                                 |

可以发现返回 false 的情况就这么七种：undefined null +0 -0 0 NaN '' 

### 转数字

| Argument Type | Result                                                       |
| ------------- | ------------------------------------------------------------ |
| Undefined     | Return NaN.                                                  |
| Null          | Return +0𝔽.                                                  |
| Boolean       | If argument is true, return 1𝔽. If argument is false, return +0𝔽. |
| Number        | Return argument (no conversion).                             |
| String        | Return ! [StringToNumber](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-stringtonumber)(argument).  '2' => 2   '44' => 44 |
| Symbol        | Throw a TypeError exception.                                 |
| BigInt        | Throw a TypeError exception.                                 |
| Object        | Apply the following steps:<br>1. Let primValue be ? [ToPrimitive](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-toprimitive)(argument, number).<br>2. Return ? [ToNumber](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-tonumber)(primValue). |

对于对象（包括数组，Map）来说，情况复杂一些，先是取出 primitive value ，之后把 primitive value 作为参数传入 ToNumber 的抽象函数中进行进一步的转化。

### 转字符串

| Argument Type | Result                                                       |
| ------------- | ------------------------------------------------------------ |
| Undefined     | Return "undefined".                                          |
| Null          | Return "null".                                               |
| Boolean       | If argument is true, return "true".If argument is false, return "false". |
| Number        | Return ! [Number::toString](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-tostring)(argument). |
| String        | Return argument.                                             |
| Symbol        | Throw a TypeError exception.                                 |
| BigInt        | Return ! [BigInt::toString](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-bigint-tostring)(argument). |
| Object        | Apply the following steps:<br/>1. Let primValue be ? [ToPrimitive](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-toprimitive)(argument, string).<br/>2. Return ? [ToString](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-tostring)(primValue). |

转字符串和转数字情况差不多，特殊情况也很少，很容易掌握。

### 转基本类型

一般是对象需要转成基本类型。这个过程分为两步，第一步是看对象是否有 Symbol.toPrimitive ，这个属性指向一个将改对象转化为 primitive 值的方法，这个值的默认值为 undefined。若这个方法有被设置过，那么就要看你是想转化成 string 还是 number，又或者是什么都不选的 default，将输入值 input 和 目标类型传入 Symbol.toPrimitive 指向的方法。伪代码表示如下

<ol><li><span aria-hidden="true" style="font-size: 0px;">1. </span>If <emu-xref aoid="Type" id="_ref_1808"><a href="ecmascript-data-types-and-values.html#sec-ecmascript-data-types-and-values">Type</a></emu-xref>(<var>input</var>) is Object, then<ol><li><span aria-hidden="true" style="font-size: 0px;">a. </span>Let <var class="">exoticToPrim</var> be ?&nbsp;<emu-xref aoid="GetMethod" id="_ref_1809"><a href="abstract-operations.html#sec-getmethod">GetMethod</a></emu-xref>(<var>input</var>, <emu-xref href="#sec-well-known-symbols" id="_ref_1810"><a href="ecmascript-data-types-and-values.html#sec-well-known-symbols">@@toPrimitive</a></emu-xref>).</li><li><span aria-hidden="true" style="font-size: 0px;">b. </span>If <var class="">exoticToPrim</var> is not <emu-val>undefined</emu-val>, then<ol><li><span aria-hidden="true" style="font-size: 0px;">i. </span>If <var>preferredType</var> is not present, let <var>hint</var> be <emu-val>"default"</emu-val>.</li><li><span aria-hidden="true" style="font-size: 0px;">ii. </span>Else if <var>preferredType</var> is <emu-const>string</emu-const>, let <var>hint</var> be <emu-val>"string"</emu-val>.</li><li><span aria-hidden="true" style="font-size: 0px;">iii. </span>Else,<ol><li><span aria-hidden="true" style="font-size: 0px;">1. </span><emu-xref href="#assert" id="_ref_1811"><a href="notational-conventions.html#assert">Assert</a></emu-xref>: <var>preferredType</var> is <emu-const>number</emu-const>.</li><li><span aria-hidden="true" style="font-size: 0px;">2. </span>Let <var>hint</var> be <emu-val>"number"</emu-val>.</li></ol></li><li><span aria-hidden="true" style="font-size: 0px;">iv. </span>Let <var>result</var> be ?&nbsp;<emu-xref aoid="Call" id="_ref_1812"><a href="abstract-operations.html#sec-call">Call</a></emu-xref>(<var class="">exoticToPrim</var>, <var>input</var>, « <var>hint</var> »).</li><li><span aria-hidden="true" style="font-size: 0px;">v. </span>If <emu-xref aoid="Type" id="_ref_1813"><a href="ecmascript-data-types-and-values.html#sec-ecmascript-data-types-and-values">Type</a></emu-xref>(<var>result</var>) is not Object, return <var>result</var>.</li><li><span aria-hidden="true" style="font-size: 0px;">vi. </span>Throw a <emu-val>TypeError</emu-val> exception.</li></ol></li><li><span aria-hidden="true" style="font-size: 0px;">c. </span>If <var>preferredType</var> is not present, let <var>preferredType</var> be <emu-const>number</emu-const>.</li><li><span aria-hidden="true" style="font-size: 0px;">d. </span>Return ?&nbsp;<emu-xref aoid="OrdinaryToPrimitive" id="_ref_1814"><a href="abstract-operations.html#sec-ordinarytoprimitive">OrdinaryToPrimitive</a></emu-xref>(<var>input</var>, <var>preferredType</var>).</li></ol></li><li><span aria-hidden="true" style="font-size: 0px;">2. </span>Return <var>input</var>.</li></ol>

第一步如果发现该对象没有 Symbol.toPrimitive 方法，那么调用第二个方法 OrdinaryToPrimitive 方法。

<ol><li><span aria-hidden="true" style="font-size: 0px;">1. </span>If <var>hint</var> is <emu-const>string</emu-const>, then<ol><li><span aria-hidden="true" style="font-size: 0px;">a. </span>Let <var>methodNames</var> be « <emu-val>"toString"</emu-val>, <emu-val>"valueOf"</emu-val> ».</li></ol></li><li><span aria-hidden="true" style="font-size: 0px;">2. </span>Else,<ol><li><span aria-hidden="true" style="font-size: 0px;">a. </span>Let <var>methodNames</var> be « <emu-val>"valueOf"</emu-val>, <emu-val>"toString"</emu-val> ».</li></ol></li><li><span aria-hidden="true" style="font-size: 0px;">3. </span>For each element <var>name</var> of <var>methodNames</var>, do<ol><li><span aria-hidden="true" style="font-size: 0px;">a. </span>Let <var>method</var> be ?&nbsp;<emu-xref aoid="Get" id="_ref_1816"><a href="abstract-operations.html#sec-get-o-p">Get</a></emu-xref>(<var>O</var>, <var>name</var>).</li><li><span aria-hidden="true" style="font-size: 0px;">b. </span>If <emu-xref aoid="IsCallable" id="_ref_1817"><a href="abstract-operations.html#sec-iscallable">IsCallable</a></emu-xref>(<var>method</var>) is <emu-val>true</emu-val>, then<ol><li><span aria-hidden="true" style="font-size: 0px;">i. </span>Let <var>result</var> be ?&nbsp;<emu-xref aoid="Call" id="_ref_1818"><a href="abstract-operations.html#sec-call">Call</a></emu-xref>(<var>method</var>, <var>O</var>).</li><li><span aria-hidden="true" style="font-size: 0px;">ii. </span>If <emu-xref aoid="Type" id="_ref_1819"><a href="ecmascript-data-types-and-values.html#sec-ecmascript-data-types-and-values">Type</a></emu-xref>(<var>result</var>) is not Object, return <var>result</var>.</li></ol></li></ol></li><li><span aria-hidden="true" style="font-size: 0px;">4. </span>Throw a <emu-val>TypeError</emu-val> exception.</li></ol>

正如其名，大部分情况下会进入这个方法，便是所谓的 Ordinary。该方法默认会先调用 valueOf 然后调用 toString。如果指定要 string 类型的结果，那么就会先调用 toString。若两个函数都不能不能正确返回，就会报错。

一般来说所有对象都会有 toString 方法，也就是会返回 '[object type]'。除非你有在原型上改写 toString 方法，否则 OrdinaryToPrimitive 方法一般不会报错。

下面用一个代码来解释上述过程：

```js
let a = {
     valueOf() { return 0 },
     toString() { return '1' },
     [Symbol.toPrimitive]() { return 2 }
}
1 + a // => 3
```

在计算 1+a 的时候，会对 a 进行类型转换，相当于会自动调用 ToPrimitive(a) ，然后发生上述过程，由于 Symbol.toPrimitive 的优先级最高，所以会返回2，a 最后的值就等于2.

