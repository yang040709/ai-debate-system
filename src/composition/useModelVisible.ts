import { ref } from 'vue'

/* 
注意这个组件针对的是Arco Design的Modal组件
*/
export const useModalVisible = () => {
  const visible = ref<boolean>(false)

  const handleClick = () => {
    visible.value = true
  }

  const handleCancel = () => {
    visible.value = false
  }

  const handleOk = () => {
    visible.value = false
  }
  return {
    visible,
    handleClick,
    handleCancel,
    handleOk,
  }
}
