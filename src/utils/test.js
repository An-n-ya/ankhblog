var FM = require('./parseFM.js')
var path = require('path')
content = FM.parseFM(path.join(__dirname, './text.md'))
console.log(content)