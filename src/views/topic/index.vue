<script setup lang='ts'>
import Switch from '@/components/Switch/Switch.vue'
import Switch2 from '@/components/Switch/Switch2.vue';
import Switch3 from '@/components/Switch/Switch3.vue';

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
</script>

<template>
  <div class='topic-container'>
    <!-- <Switch></Switch> -->
    <!-- <switch2 :items="arr"></switch2> -->
    <switch3></switch3>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
.topic-container {
  // padding-top: 20px;
  // padding-top: $switch-height + 20px;
}
</style>