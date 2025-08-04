// // // 使用mockJs拦截所有请求
import mockjs from 'mockjs'
mockjs.mock(/\/api\/.+/, {
  code: -1,
  msg: '服务器内部错误',
})
