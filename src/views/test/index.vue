<script setup lang="ts">
import { onMounted, ref, h } from 'vue'
import LoadMore from '@/components/load-more/index.vue'
import Loading from '@/components/loading/index.vue'

const baseUrl = 'https://picsum.photos/200/300'

const imgCount = ref(10)
const isLoading = ref(false)

const delay = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

const hello = async () => {
  console.log('hello')
  isLoading.value = true
  await delay(2000)
  imgCount.value += 10
  isLoading.value = false
}

const loading = ref()

onMounted(() => {
  // console.log(loading.value)
  const res = h(loading.value)
  console.log(res)
})

const boolVal = ref(false)

const changBool = () => {
  boolVal.value = !boolVal.value
}
</script>

<template>
  <div class="container">
    <div>
      <button @click="changBool">
        <span>点击</span>
      </button>
      <span>当前的bool值为:{{ boolVal }}</span>
    </div>
    <div v-loading="boolVal" class="loading-test">
      <h1>demo</h1>
      <img class="image" :src="baseUrl + '?c=' + i" v-for="i in 2" :key="i" />
    </div>
    <div class="loading-test">
      测试
      <Loading ref="loading" />
    </div>
    <h1 v-permission="'selectUser'">你好</h1>
    <img v-lazy class="image" :data-src="baseUrl + '?a=' + i" v-for="i in imgCount" :key="i" />
    <LoadMore :callBack="hello" :isLoading="isLoading" />
  </div>
</template>

<style scoped lang="scss">
.image {
  width: 200px;
  height: 200px;
  background: peru;
}

.loading-test {
  position: relative;
  width: 400px;
  height: 400px;
  background: chocolate;
  color: white;
  margin: 20px 0;
}
</style>
