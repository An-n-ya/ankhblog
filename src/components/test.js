let reg = /.*<!-- more -->/s

let text = `---
title: 第二篇文章
description: 阿瑟费撒风飒风
author: Ankh
addTime: 1628589417260
---
# asfasf
sajfhgljksaghfladngljkhdslkjghkldsn, vnfdgfdbfgxn
<!-- more -->`

console.log(reg.exec(text)[0])