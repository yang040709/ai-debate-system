<script setup lang='ts'>

interface HomeItemProps {
  title?: string
  link?: {
    text: string,
    href: string,
  }
}

defineProps<HomeItemProps>()

</script>

<template>
  <div class='home-container'>
    <div class="top" v-if="title || link">
      <div class="title" v-if="title">
        {{ title }}
      </div>
      <div class="link" v-if="link">
        {{ link.text }}
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.home-container {
  width: 100%;

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 28px;
    margin-bottom: 28px;

    .title {
      font-size: 20px;
      font-weight: 700;
    }

    .link {
      cursor: pointer;
      color: var(--theme-gray-1);
    }
  }
}
</style>