<script setup lang="ts">
import logo from '@/assets/logo.png'
import Menu from './menu.vue'
import { useRouter } from 'vue-router'
import { ref, toRefs, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import toggleDark from '@/components/toggle-dark/index.vue'
const userStore = useUserStore()
const router = useRouter()

const isLogin = toRefs(userStore).isLogin

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

const toHomePage = () => {
  router.push({
    path: '/',
  })
}

const defaultAvatar =
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp'

const avatar = computed(() => {
  return userStore.userInfo.avatar || defaultAvatar
})
</script>

<template>
  <div class="header-container">
    <div class="title" @click="toHomePage">
      <img class="logo-img" :src="logo" alt="" />
      <div class="title-text">AI辩论平台</div>
    </div>

    <Menu></Menu>

    <div class="user">
      <toggle-dark />
      <div class="login no-login" v-if="!isLogin" @click="toLoginPage">
        <a-avatar :size="32">A</a-avatar>
        <span>未登录</span>
      </div>
      <div class="login is-login" v-if="isLogin">
        <a-dropdown @select="handleSelect" trigger="hover">
          <div>
            <a-avatar :size="32" :image-url="avatar"> </a-avatar>
            <span>{{ userStore.userInfo.nickname }}</span>
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
  </div>
</template>

<style lang="scss" scoped>
.header-container {
  background-color: var(--header-bg);
  height: $header-height;
  padding-left: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-border-light);
  a {
    margin: 0 30px;
    &.router-link-exact-active {
      color: #409eff;
    }
  }
  .title {
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 150px;
    color: var(--color-text-primary);
    .logo-img {
      width: 32px;
      height: 32px;
    }
    .title-text {
      font-weight: 500;
      padding-left: 10px;
      font-size: 16px;
      line-height: 24px;
    }
  }
  .user {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .login {
      color: var(--color-text-secondary);
      height: 100%;
      cursor: pointer;
      line-height: $header-height;
      padding: 0 10px;
      border-radius: 8px;
      span {
        padding-left: 10px;
      }
      &:hover {
        background-color: var(--header-bg-hover);
      }
    }
  }
}
</style>
