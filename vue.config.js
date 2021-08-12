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
            .use(require('markdown-it-container'))
            .use(require('markdown-it-emoji'))
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
    ]
  }

}
