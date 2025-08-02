<script setup lang='ts'>
// import Switch from '@/components/Switch/Switch.vue'
// import Switch2 from '@/components/Switch/Switch2.vue';
import Switch3 from '@/components/Switch/Switch3.vue';
import detail from './detail.vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';



const arr = [{
  text: "全部",
  href: "全部"
},
{
  text: "社会",
  href: "社会"
},
{
  text: "伦理",
  href: "伦理"
},
{
  text: "科技",
  href: "科技"
},
{
  text: "环境",
  href: "环境"
},
{
  text: "经济",
  href: "经济"
},
{
  text: "商业",
  href: "商业"
},
{
  text: "教育",
  href: "教育"
},
{
  text: "文化",
  href: "文化"
},
{
  text: "艺术",
  href: "艺术"
},
]

const arr2 = [{
  text: "全部",
  href: "全部"
},
{
  text: "简单",
  href: "简单"
},
{
  text: "中等",
  href: "中等"
},
{
  text: "困难",
  href: "困难"
},
{
  text: "专家",
  href: "专家"
},
{
  text: "大师",
  href: "大师"
},
]


const router = useRouter();
const route = useRoute();
const selectType = (item: { text: string, href: string }) => {
  router.push({
    name: "topic",
    params: {
      type: item.href,
      difficulty: route.params.difficulty || "全部"
    }
  })
}
const selectDifficulty = (item: { text: string, href: string }) => {
  router.push({
    name: "topic",
    params: {
      type: route.params.type || "全部",
      difficulty: item.href
    }
  })
}


const typeRoute = ref(route.params.type as string || "全部");
const difficultyRoute = ref(route.params.difficulty as string || "全部");


router.beforeEach((to, from) => {
  typeRoute.value = to.params.type as string || "全部";
  difficultyRoute.value = to.params.difficulty as string || "全部";
})

</script>

<template>
  <div class='topic-container'>
    <switch3 promptText="请选择类型：" :current-route="typeRoute" :list="arr" :select-item="selectType"></switch3>
    <switch3 :bottom-border="true" promptText="请选择难度：" :current-route="difficultyRoute" :list="arr2"
      :select-item="selectDifficulty">
    </switch3>
    <detail></detail>
  </div>
</template>

<style scoped lang="scss"></style>