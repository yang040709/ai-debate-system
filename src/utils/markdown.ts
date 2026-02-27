import MarkdownIt from 'markdown-it'
// 可以在这里统一引入插件
// import highlightjs from 'markdown-it-highlightjs';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
  // 如果需要代码高亮，可以在这里配置
})

// md.use(highlightjs);

export default md
