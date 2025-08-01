<script setup lang='ts'>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue'

const arr = [{
  text: "全部",
  href: "全部"
},
{
  text: "热门",
  href: "热门"
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


const router = useRouter();
const route = useRoute();


const currentType = ref(route.params.type || "全部")


const selectType = (item: { text: string, href: string }) => {
  router.push({
    name: "topicDetail",
    params: {
      type: item.href
    }
  })
}

router.beforeEach((to, from) => {
  currentType.value = to.params.type || "全部"
})


</script>

<template>
  <div class='switch-container'>
    <ul ref="switch">
      <li v-for="item in arr" :data-text="item.text" :data-href="item.href" :key="item.href"
        :class="{ active: currentType === item.href }" @click="selectType(item)">{{ item.text }}</li>
    </ul>
  </div>

</template>

<style scoped lang="scss">
.switch-container {
  background: var(--header-bg);
  border-bottom: 1px solid var(--color-border-light);

  ul {
    padding: 0 50px;
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: nowrap;
    flex-wrap: wrap;
    position: relative;
    padding-top: 5px;
    padding-bottom: 10px;
  }

  li {
    display: flex;
    align-items: center;

    // line-height: 30px;
    height: 30px;
    font-size: 16px;
    padding: 0 15px;
    cursor: pointer;
    color: var(--color-text-secondary);
    flex: 0 0 auto;

    &.active {
      background: var(--theme-blue-1);
      color: #fff;
      border-radius: 30px;
    }

    &.switch-more {
      text-align: center;
      position: absolute;
      top: 50%;
      width: 100px;
      // border: 1px solid red;
      transform: translateY(-50%);
      // bottom: 0;
      right: 0px;
      opacity: 1;
      background: var(--header-bg);
    }
  }
}
</style>