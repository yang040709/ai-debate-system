<script setup lang='ts'>
interface SwitchItem {
  text: string;
  href: string;
}

defineProps<{
  list: SwitchItem[],
  currentRoute: string,
  bottomBorder?: boolean,
  promptText?: string,
  selectItem: (item: SwitchItem) => void
}>()


</script>

<template>
  <div class='switch-container' :class="{ 'bottom-border': bottomBorder }">
    <ul ref="switch">
      <li class="prompt-text" v-if="promptText">{{ promptText }}</li>
      <li v-for="item in list" :data-text="item.text" :data-href="item.href" :key="item.href"
        :class="{ active: currentRoute === item.href }" @click="selectItem(item)">{{ item.text }}</li>
    </ul>
  </div>

</template>

<style scoped lang="scss">
.switch-container {
  background: var(--header-bg);

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


    &.prompt-text {
      padding-right: 0px;
    }

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


.bottom-border {
  border-bottom: 1px solid var(--color-border-light);
}
</style>