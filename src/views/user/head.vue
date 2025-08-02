<script setup lang='ts'>
import { useUserStore } from '@/stores/user'
import EditModal from './edit-modal.vue'


const userStore = useUserStore()


</script>

<template>
  <div class='head-container'>
    <a-avatar class="avatar" :style="{ backgroundColor: '#3370ff' }" :size="85">
      <!-- <IconUser /> -->
      <img v-placeholder-img class="avatar-img" :data-src="userStore.userInfo.avatar" alt="" />
    </a-avatar>
    <div class="user-info">
      <div class="user-name">{{ userStore.userInfo.nickname }}</div>
      <edit-modal />
    </div>
  </div>
</template>

<style scoped lang="scss">
.head-container {
  .user-info {
    display: flex;
    justify-content: space-between;

    .user-name {
      font-size: 24px;
      color: var(--color-text-primary);
      font-weight: 500;
    }
  }

  .avatar {
    position: absolute;
    top: 0px;
    left: 16px;
    transform: translateY(-50%);
  }

  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
}
</style>