<script setup lang='ts'>
import TagItem from './TagItem.vue';
// import type {Tag} from '@/types/tag'

const colors = ["var(--theme-tag-1)", "var(--theme-tag-2)", "var(--theme-tag-3)", "var(--theme-tag-4)", "var(--theme-tag-5)"]


interface TagProps {
  text: string;
  href: string;
}


withDefaults(defineProps<{
  tagsList?: TagProps[]
}>(), {
  tagsList: () => [
    { text: "社会", href: "社会" },
    { text: "伦理", href: "伦理" },
    { text: "科技", href: "科技" },
    { text: "未来", href: "未来" },
    { text: "环境", href: "环境" },
    { text: "经济", href: "经济" },
    { text: "商业", href: "商业" },
    { text: "教育", href: "教育" },
    { text: "文化", href: "文化" },
    { text: "艺术", href: "艺术" },
  ]
})

</script>

<template>
  <div class='tag-list-container'>
    <tag-item v-for="(item, index) in tagsList" :color="colors[index % colors.length]" :text="item.text"
      :href="item.href"></tag-item>
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
