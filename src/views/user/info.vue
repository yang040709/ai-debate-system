<script setup lang='ts'>

interface Item {
  label: string;
  value: string;
}



defineProps<{
  items: Item[]
}>();


</script>

<template>
  <div class='info-container'>
    <ul class="info-container-list">
      <li v-for="item in items" :key="item.label">
        <strong>{{ item.value }}</strong>
        <span>{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.info-container {
  margin-top: 20px;

  .info-container-list {
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;

      span {
        font-size: 20px;
        margin-bottom: 5px;
        color: var(--theme-blue-1);
      }

      strong {
        font-size: 25px;
        font-weight: bold;
        color: var(--theme-blue-1);

      }
    }
  }
}
</style>