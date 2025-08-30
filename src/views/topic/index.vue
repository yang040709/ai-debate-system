<script setup lang='ts'>
// import Switch from '@/components/Switch/Switch.vue'
// import Switch2 from '@/components/Switch/Switch2.vue';
import Switch3 from '@/components/Switch/Switch3.vue';
import Content from './content.vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTagsStore } from '@/stores/tags';
import { storeToRefs } from 'pinia';
import ScrollTop from '@/components/ScrollTop/ScrollTop.vue';
import type { Tag } from '@/types/tag';


const { tagListData, tagListLoading } = storeToRefs(useTagsStore());



const router = useRouter();
const route = useRoute();
const selectType = (item: Tag) => {
  router.push({
    name: "topic",
    params: {
      type: item.id,
    }
  })
}

const typeRoute = ref(route.params.type as string || "-1");

router.beforeEach((to, from) => {
  typeRoute.value = to.params.type as string || "-1";
})



</script>

<template>
  <div class='topic-container'>
    <div class="topic-switch">
      <switch3 :loading="tagListLoading" promptText="请选择类型：" :current-route="typeRoute" :list="tagListData.tag"
        :select-item="selectType" :is-show-all="true" :is-show-hot="true">
      </switch3>
    </div>
    <Content></Content>
    <ScrollTop />
  </div>
</template>

<style scoped lang="scss">
.topic-switch {
  position: sticky;
  top: $header-height;
  left: 0;
}
</style>