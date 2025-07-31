// // // 使用mockJs拦截所有请求

Mock.mock(/\/api\/.+/, {
  code: -1,
  msg: '服务器内部错误',
})

// Mock.mock('/api/user/modify', {
//   code: -1,
//   msg: '网络问题',
// })
