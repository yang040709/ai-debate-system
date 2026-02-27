// 下面两个都是匹配的是路由名。要求拦截的路由必须带name属性
// 下面是未登录不能再访问的页面
export const BLACK_LIST = Object.freeze([
  'user', //用户页
  'debate', //辩论页
  'debateResult', //辩论结果页
  'creative', //创建辩论话题页
  'history', //辩论历史页
  'historyDetail', //辩论结果页
])
// 下面是登录后不能再访问的页面
export const WHITE_LIST = Object.freeze(['login', 'register'])
