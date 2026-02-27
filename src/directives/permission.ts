/* 
以后将从后端获取到的权限列表，放到pinia，然后在页面上使用v-permission指令，传入权限名称，再进行检验
*/
import type { DirectiveBinding } from 'vue'
type PermissionType = "deleteUser' | 'addUser' | 'updateUser'"
const testCurPermission = ['deleteUser', 'addUser', 'updateUser']

export default {
  mounted(el: HTMLImageElement, binding: DirectiveBinding<PermissionType>) {
    let hasPermission = false
    testCurPermission.forEach((item) => {
      if (item === binding.value) {
        hasPermission = true
      }
    })
    if (!hasPermission) {
      // 这个兼容性好
      const parentNode = el.parentNode as HTMLElement
      parentNode.removeChild(el)
      // 这个兼容性不好，代码简洁
      // el.remove()
    }
  },
}
