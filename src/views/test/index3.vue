<script setup lang='ts'>

import { useRouter } from 'vue-router';
import test1 from './components/test1.vue';
import test2 from './components/test2.vue';
const router = useRouter();

const t1 = () => {
  router.push({
    name: 'test3',
    params: {
      type: '1',
    },
  });
};

const t2 = () => {
  router.push({
    name: 'test3',
    params: {
      type: '2',
      difficulty: "2"
    },
  });
};
const t3 = () => {
  router.push({
    name: 'test3',
    params: {
      type: '3',
      difficulty: "3"
    },
  })
}
</script>

<template>
  <div class='container'>
    <button @click="t1">1:1</button>
    <button @click="t2">2:2</button>
    <button @click="t3">我是帅哥:我是大帅哥</button>
    <p>test3</p>
    <test1 />
    <test2 />
  </div>
</template>

<style scoped></style>