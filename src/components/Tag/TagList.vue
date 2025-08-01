<script setup lang='ts'>
import TagItem from './TagItem.vue';

const colors = ["var(--theme-tag-1)", "var(--theme-tag-2)", "var(--theme-tag-3)", "var(--theme-tag-4)", "var(--theme-tag-5)"]

// const tagsList = ["社会", "伦理", "科技", "未来", "环境", "可持续发展", "政治", "政策", "经济", "商业", "教育", "学习", "文化", "艺术", "健康", "医疗", "哲学", "思想", "日常生活", "个人发展"]
const tagsList = ["社会", "伦理", "科技", "未来", "环境", "经济", "商业", "教育", "文化", "艺术"]
</script>

<template>
  <div class='tag-list-container'>
    <tag-item v-for="(item, index) in tagsList" :color="colors[index % colors.length]" :text="item"></tag-item>
  </div>
</template>

<style scoped lang="scss">
.tag-list-container {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  // background: var(--theme-gray-2);
  // border-radius: 20px;
  gap: 15px;
}
</style>
