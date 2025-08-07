<script setup lang="ts">
import { useRouter } from 'vue-router'


interface Props {
  isFixed?: boolean
  // 确认函数
  confirm?: () => Promise<any>
}


const props = withDefaults(defineProps<Props>(), {
  isFixed: true,
})


const router = useRouter()
const handleReturnHome = () => {
  if (props.confirm) {
    props.confirm().then(() => {
      router.push({ name: 'home' })
    })
  } else {
    router.push({ name: 'home' })
  }
}
</script>

<template>
  <div class="return-home-container" @click="handleReturnHome" :class="{ 'fixed': isFixed }">
    <icon-import :size="20" />
    <span>返回首页</span>
  </div>
</template>

<style lang="scss" scoped>
.return-home-container {
  height: 50px;
  padding: 0 10px;
  border-radius: 10px;
  // background-color: #f9f9fe;
  background-color: var(--body-bg-2);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: var(--btn-bg-hover);
  }

  &.fixed {
    position: fixed;
    top: 10px;
    left: 10px;
  }
}
</style>
