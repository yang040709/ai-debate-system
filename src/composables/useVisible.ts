import { ref } from 'vue'

/* 
Modal组件可以使用
*/
export const useVisible = () => {
  const visible = ref<boolean>(false)

  const openModal = () => {
    visible.value = true
  }
  const closeModal = () => {
    visible.value = false
  }

  return {
    visible,
    openModal,
    closeModal,
  }
}
