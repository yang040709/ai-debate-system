<script setup lang='ts'>


interface SkeletonProps {
  loading: boolean;
  rows?: number;
  size?: number;
  animation?: boolean;
}


withDefaults(defineProps<SkeletonProps>(), {
  rows: 3,
  size: 20,
  animation: true
})

</script>

<template>
  <div class='skeleton-container'>
    <a-skeleton :animation="animation" :loading="loading">
      <a-space direction="vertical" class="space" :size="size">
        <a-skeleton-line :rows="rows" />
      </a-space>
    </a-skeleton>
  </div>
</template>

<style scoped lang="scss">
.skeleton-container {
  width: 100%;
}

.space {
  width: 100%;
}
</style>