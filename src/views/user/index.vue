<script setup lang="ts">
import { useUserStore } from '@/stores/user'

import EditModal from './edit-modal.vue'
const userStore = useUserStore()
</script>

<template>
  <div class="user-container">
    <div class="user-content">
      <div class="box">
        <a-avatar class="avatar" :style="{ backgroundColor: '#3370ff' }" :size="68">
          <!-- <IconUser /> -->
          <img v-placeholder-img class="avatar-img" :data-src="userStore.userInfo.avatar" alt="" />
        </a-avatar>
        <div class="user-info">
          <div class="user-name">{{ userStore.userInfo.nickname }}</div>
          <edit-modal />
        </div>
        <a-skeleton>
          <a-space direction="vertical" :style="{ width: '100%', marginTop: '50px' }" size="large">
            <a-skeleton-line :rows="3" />
            功能开发中...
            <a-skeleton-shape />
          </a-space>
        </a-skeleton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-container {
  width: 100vw;
  // margin-top: -28px;
  // margin-left: -28px;
  background: linear-gradient(180deg, var(--user-box-bg1), var(--footer-bg));

  // max-height: 100vh;

  .user-content {
    overflow: hidden;
    width: 80%;
    margin: 0 auto;
    height: calc(90vh - $footer-height - $header-height);
    position: relative;
  }
}

.box {
  margin-top: 100px;
  width: 100%;
  background: var(--user-bg);
  border-radius: 8px;
  height: 500px;
  position: relative;
  padding: 50px 18px;

  .avatar {
    position: absolute;
    top: 0px;
    left: 16px;
    transform: translateY(-50%);
  }
}

.user-info {
  display: flex;
  justify-content: space-between;

  .user-name {
    font-size: 24px;
    color: var(--color-text-primary);
    font-weight: 500;
  }
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
</style>
