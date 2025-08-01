// 扩展 HTMLElement 类型
declare global {
  interface HTMLElement {
    _loadingInstance: any | null
  }
}

import { h, render, DirectiveBinding } from 'vue'
import loading from '@/components/Loading/Loading.vue'

export default (el: HTMLElement, binding: DirectiveBinding<boolean>) => {
  if (getComputedStyle(el).position === 'static') {
    el.style.position = 'relative'
  }
  if (binding.value) {
    // 如果尚未加载，创建并挂载loading组件
    if (!el._loadingInstance) {
      const vnode = h(loading)
      el._loadingInstance = vnode
      render(vnode, el)
    }
  } else {
    // 如果已加载，卸载并清除引用
    if (el._loadingInstance) {
      render(null, el) // 卸载组件
      el._loadingInstance = null
    }
  }
}
