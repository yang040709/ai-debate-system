<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed, inject } from 'vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import toggleDark from '@/components/toggle-dark/index.vue'
import type { AppConfig } from '@/config/app.config'
const userStore = useUserStore()
const router = useRouter()

const isLogin = storeToRefs(userStore).isLogin

const handleLoginOut = async () => {
  await userStore.logout()
  router.push({
    path: '/',
  })
}

const toLoginPage = () => {
  // 正在用户信息正在加载中，不允许跳转
  if (userStore.submitLoading) {
    return
  }
  router.push({
    path: '/login',
  })
}
const toUserCenter = () => {
  router.push({
    path: '/user',
  })
}

const appConfig = inject<AppConfig>('config')

const defaultAvatar = appConfig?.defaultAvatar

const avatar = computed(() => {
  return userStore.userInfo.avatar || defaultAvatar
})
</script>

<template>
  <div class="user">
    <toggle-dark class="user-item" />
    <div class="login login-loading" v-if="userStore.submitLoading && !isLogin">
      <span>正在加载中...</span>
    </div>
    <div class="login user-item no-login" v-else-if="!isLogin" @click="toLoginPage">
      <a-avatar :size="32">A</a-avatar>
      <span>未登录</span>
    </div>
    <div class="login user-item is-login pc-user-item" v-if="isLogin">
      <a-dropdown trigger="hover">
        <div>
          <a-avatar :size="32" :image-url="avatar"> </a-avatar>
          <span>{{ userStore.userInfo.nickname }}</span>
        </div>
        <template #content>
          <a-doption @click="toUserCenter">
            <template #icon>
              <icon-user />
            </template>
            <template #default>个人中心</template>
          </a-doption>
          <a-doption @click="handleLoginOut">
            <template #icon>
              <icon-poweroff />
            </template>
            <template #default>退出登录</template>
          </a-doption>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user {
  height: 100%;
  line-height: $header-height;
  display: flex;
  align-items: center;
  justify-content: center;
  .user-item {
    color: var(--color-text-secondary);
    height: 100%;
    padding: 0 10px;
    border-radius: 8px;
    cursor: pointer;
    line-height: $header-height + 8px;
    &:hover {
      background-color: var(--header-bg-hover);
    }
  }
  .login {
    line-height: $header-height;
    span {
      padding-left: 10px;
    }
  }
  .no-login {
    width: 104px;
  }
  .login-loading {
    width: 140px;
  }
}
</style>
