<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import toggleDark from '@/components/toggle-dark/index.vue'
const userStore = useUserStore()
const router = useRouter()

const isLogin = storeToRefs(userStore).isLogin

const handleSelect = (e: any) => {
  console.log(e)
}

const handleLoginOut = () => {
  userStore.logout()
  router.push({
    path: '/',
  })
}

const toLoginPage = () => {
  router.push({
    path: '/login',
  })
}

const defaultAvatar = 'https://avatars.githubusercontent.com/u/65129319'

const avatar = computed(() => {
  return userStore.userInfo.avatar || defaultAvatar
})
</script>

<template>
  <div class="user">
    <toggle-dark class="user-item" />
    <div class="login user-item no-login" v-if="!isLogin" @click="toLoginPage">
      <a-avatar :size="32">A</a-avatar>
      <span>未登录</span>
    </div>
    <div class="login user-item is-login" v-if="isLogin">
      <a-dropdown @select="handleSelect" trigger="hover">
        <div>
          <a-avatar :size="32" :image-url="avatar"> </a-avatar>
          <span class="pc-nickname">{{ userStore.userInfo.nickname }}</span>
        </div>
        <template #content>
          <a-doption>
            <template #icon>
              <icon-user />
            </template>
            <template #default>个人中心</template>
          </a-doption>
          <a-doption disabled
            ><template #icon>
              <icon-location />
            </template>
            <template #default>Option 1</template>
          </a-doption>
          <a-doption :value="{ value: 'Option3' }" @click="handleLoginOut">
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
}
</style>
