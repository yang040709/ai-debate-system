import type { Directive } from 'vue'
import { Message } from '@arco-design/web-vue'
import { useEventListener } from '@vueuse/core'
const copy: Directive = {
  mounted(el, binding) {
    if (!binding.value) {
      throw new Error('请传入需要复制的文本')
    }
    el.copyValue = binding.value
    useEventListener(el, 'click', (e) => {
      e.preventDefault()
      const text = el.copyValue
      if (text) {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            Message.success('复制成功')
          })
          .catch(() => {
            Message.error('复制失败')
          })
      }
    })
  },
  updated(el, binding) {
    el.copyValue = binding.value
  },
}
export default copy
