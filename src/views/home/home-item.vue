<script setup lang='ts'>
import { useRouter } from 'vue-router';
interface HomeItemProps {
  title?: string
  link?: {
    text?: string,
    routerName: string,
  },
  params?: Record<string, string>
}

const props = defineProps<HomeItemProps>()


const router = useRouter();


const toRouterName = () => {
  if (props.link && props.link.routerName) {
    if (props.params) {
      router.push({ name: props.link.routerName, params: props.params });
    }
    else {
      router.push({ name: props.link.routerName });
    }
  }
}

</script>

<template>
  <div class='home-container'>
    <div class="top" v-if="title || link">
      <div class="title" v-if="title" @click="toRouterName">
        {{ title }}
      </div>
      <div class="link" v-if="link" @click="toRouterName">
        {{ link.text }}
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.home-container {
  width: 100%;
  padding: 20px;

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 28px;
    margin-bottom: 28px;

    .title {
      font-size: 20px;
      font-weight: 700;
      cursor: pointer;

      &:hover {
        color: var(--theme-blue-6);
      }
    }

    .link {
      cursor: pointer;
      color: var(--theme-gray-1);

      &:hover {
        color: var(--theme-blue-1)
      }
    }
  }
}
</style>