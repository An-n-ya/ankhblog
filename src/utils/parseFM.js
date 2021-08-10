var fs = require('fs');
var fm = require('front-matter')

function parseFM(fileURL) {
    let content = fs.readFileSync(fileURL, 'utf8')
    return fm(content)
}

exports.parseFM = parseFM