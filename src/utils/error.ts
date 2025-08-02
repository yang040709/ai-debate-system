import { Message } from '@arco-design/web-vue'
import type { axiosMeta } from '@/global.d.ts'
export const handleResponseError = (error: any, meta?: axiosMeta) => {
  console.error('api请求失败:', error)
  let templateStr = '失败  原因：'
  let str = '请求'
  if (meta) {
    if (!meta.isShowMessage) {
      console.log('不需要错误处理的结果提示')
      return
    }
    if (meta.errMessage) {
      str = meta.errMessage
    }
  }
  let errorMessage = error instanceof Error ? error.message : null
  if (!errorMessage) {
    errorMessage = error?.msg || '未知错误'
  }
  templateStr = `${str}${templateStr}${errorMessage}`
  // 使用组件库的组件提示请求错误
  Message.error(templateStr)
}
