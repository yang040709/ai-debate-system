<script setup lang="ts">
import { onMounted, ref, h } from 'vue'
import LoadMore from '@/components/LoadMore/LoadMore.vue'
import Loading from '@/components/Loading/Loading.vue'

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
const boolVal = ref(false)

const changBool = () => {
  boolVal.value = !boolVal.value
}
</script>

<template>
  <div class="container">
    <div class="test-scroll">
      <div class="inner">测试</div>
    </div>
    <div>
      <img referrerpolicy="no-referrer"
        src="https://i1.hdslb.com/bfs/archive/f5627d00cd0bf05084f052f7ae1aed96a8d7041b.png@672w_378h_1c_!web-search-common-cover.avif"
        alt="" />
    </div>
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
.test-scroll {
  width: 300px;
  height: 300px;
  overflow-y: auto;
  background: #ccc;

  .inner {
    width: 100%;
    height: 1000px;
    background: #ddd;
  }
}

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
