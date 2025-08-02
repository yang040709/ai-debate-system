<script setup lang='ts'>
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue';
import { debounce } from '@/utils/index'

// const arr = ["全部", "社会", "伦理", "科技", "未来", "环境", "经济", "商业", "教育", "文化", "艺术"]
// const arr = ["全部", "社会", "伦理", "科技", "艺术", "环境", "经济", "商业"]

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

const switchRef = useTemplateRef("switch")
const isShrink = ref(false)

interface NewArr {
  text: string,
  href: string
}

const newArr = ref<NewArr[]>([]);

// onMounted(() => {
//   console.log(switchRef.value.clientWidth, switchRef.value.scrollWidth, switchRef.value.offsetWidth, document.documentElement.clientWidth);
// })
const test = () => {
  // console.log(switchRef.value.clientWidth, switchRef.value.scrollWidth, switchRef.value.offsetWidth, document.documentElement.clientWidth);
  // const scrollWidth = switchRef.value.scrollWidth;
  const htmlWidth = document.documentElement.clientWidth;
  if (!switchRef.value?.children) {
    return;
  }
  newArr.value = [];
  const children = switchRef.value.children;
  console.log(children);
  let number = 0;
  for (let i = 0; i < children.length - 1; i++) {
    const item: any = children[i];
    const obj = item.getBoundingClientRect();
    // console.log(item.getBoundingClientRect());
    if (obj.x > htmlWidth - 170) {
      item.style.opacity = "0";
      isShrink.value = true
      // item.style.display = "none";
      // console.dir(item);
      console.log(item.dataset);
      newArr.value.push({
        text: item.dataset.text,
        href: item.dataset.href
      })
    }
    else {
      // flag=true;
      item.style.opacity = "1";
      // item.style.display = "block";
      number++;
    }
  }
  if (number === children.length - 1) {
    isShrink.value = false
  }
  // console.log(number, children.length, "<==number");
}

const debounceFun = debounce(() => {
  test()
}, 1000);

onMounted(() => {
  window.addEventListener("resize", debounceFun)
  test();
})

onUnmounted(() => {
  window.removeEventListener("resize", debounceFun);
})

</script>

<template>
  <div class='switch-container'>
    <!-- <button @click="test">111</button> -->
    <ul ref="switch">
      <li v-for="(item, index) in arr" :data-text="item.text" :data-href="item.href" :key="item.href"
        :class="{ active: index === 0 }">{{ item.text }}</li>
      <a-dropdown trigger="hover">
        <li class="switch-more" v-show="isShrink">...<icon-down /></li>
        <template #content>
          <a-doption v-for="i in newArr" :key="i.href">{{ i.text }}</a-doption>
        </template>
      </a-dropdown>
    </ul>
  </div>

</template>

<style scoped lang="scss">
.switch-container {
  position: fixed;
  top: $header-height;
  left: 0;
  right: 0;
  // line-height: 50px;
  // font-size: 16px;
  background: var(--header-bg);
  // display: flex;
  // gap: 25px;
  border-bottom: 1px solid var(--color-border-light);

  // overflow: scroll;
  // flex-wrap: wrap;
  ul {
    overflow: hidden;
    padding: 0 50px;
    display: flex;
    gap: 25px;
    height: $switch-height;
    align-items: center;
    flex-wrap: nowrap;
    position: relative;
  }

  li {
    line-height: 30px;
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