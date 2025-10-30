// 下面两个都是匹配的是路由名。要求拦截的路由必须带name属性
// 下面是未登录不能再访问的页面
export const BLACK_LIST = Object.freeze(['user', 'debate', 'debateResult', 'creative'])
// 下面是登录后不能再访问的页面
export const WHITE_LIST = Object.freeze(['login', 'register'])
