import Mock from 'mockjs'
// 模拟脱机的情况，处理断网问题
// import "./offline"
// 将MockJs设置200ms的延迟
Mock.setup({
  delay: 200,
})
