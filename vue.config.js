const Mode = require('frontmatter-markdown-loader/mode')
const markdownIt = require('markdown-it')
const markdownItPrism = require('markdown-it-prism')
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
            .use(require('markdown-it-anchor'), { level: 3, permalink: true, permalinkClass: 'header-anchor', permalinkSymbol: '§', permalinkBefore: true })
            .use(require('markdown-it-table-of-contents'))
            .use(require('markdown-it-footnote'))
            .use(require('markdown-it-imsize'))
            .use(require('markdown-it-container'), 'classname', {
              validate: name => name.trim().length,
              render: (tokens, idx) => {
                if (tokens[idx].nesting === 1) {
                  if (/wrapped$/.test(tokens[idx].info.trim())) {
                    return `<div class="rounded-lg pa-2 wrapped">\n<div style="border-bottom:1px solid rgba(50,50,50,0.3);color:#white">${tokens[idx].info.trim().replace(' wrapped', '')}<i class="fas fa-chevron-left"></i></div>\n<div>\n`
                  }
                  return `<div readonly class="rounded-lg pa-2 ma-2 ${tokens[idx].info.trim()}">\n<div style="border-bottom:1px solid rgba(50,50,50,0.3);color:white" class="d-flex justify-space-between">${tokens[idx].info.trim()}<i class="fas fa-chevron-down mr-2"></i></div>\n<div>\n`;
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
