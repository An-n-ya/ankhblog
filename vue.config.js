const Mode = require('frontmatter-markdown-loader/mode')
const markdownIt = require('markdown-it')
const markdownItPrism = require('markdown-it-prism')
const anchor = require('markdown-it-anchor')
const webpack = require('webpack')
module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => {
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use('frontmatter-markdown-loader')
      .loader('frontmatter-markdown-loader')
      .tap(options => {
        return {
          mode: [Mode.HTML],
          markdownIt: markdownIt({
            html: true, linkify: true
          }).use(markdownItPrism, { plugins: ['match-braces', 'show-language'] })
            .use(anchor, { level: 2, permalink: anchor.permalink.headerLink(), permalinkClass: 'header-anchor' })
            .use(require('markdown-it-table-of-contents'), { "includeLevel": [2, 3, 4, 5, 6] })
            .use(require('markdown-it-footnote'))
            .use(require('markdown-it-imsize'))
            .use(require('markdown-it-container'), 'classname', {
              validate: name => name.trim().length,
              render: (tokens, idx) => {
                if (tokens[idx].nesting === 1) {
                  if (/wrapped/.test(tokens[idx].info.trim())) {
                    return `<div class="rounded-lg pa-2 ma-2 ${tokens[idx].info.trim().replace(/{(.+?)}/, '')}">\n<div style="border-bottom:1px solid rgba(50,50,50,0.3);color:white" class="d-flex justify-space-between">${tokens[idx].info.trim().match(/\{(.+?)\}/)[1]}<i class="fas fa-chevron-left pullDown mr-2" style="cursor:pointer"></i></div>\n<div style="display:none">\n`
                  }
                  return `<div readonly class="rounded-lg pa-2 ma-2 ${tokens[idx].info.trim().replace(/{(.+?)}/, '')}">\n<div style="border-bottom:1px solid rgba(50,50,50,0.3);color:white" class="d-flex justify-space-between">${tokens[idx].info.trim().match(/\{(.+?)\}/)[1]}</div>\n<div>\n`;
                } else {
                  return '</div></div>\n';
                }
              }
            })
            .use(require('markdown-it-emoji'))
            .use(require('markdown-it-task-lists'))
            .use(require('./src/utils/md/component'))
            .use(require('./src/utils/md/preWrapper'))
            .use(require('./src/utils/md/lineNumbers')),
        }
      })
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    ],
    devtool: 'source-map',
  }

}
