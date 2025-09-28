<script setup lang='ts'>
import { getResultApi } from '@/api/result'
import { useFetchData } from '@/composables/useFetchData';
// defineProps<{ id?: string }>()
import { useRoute, useRouter } from 'vue-router';
import { computed, handleError } from 'vue'
import type { Result } from '@/types/result';
const route = useRoute()
const router = useRouter()


const id = computed(() => {
  return route.params.id as string;
})


const defaultValue: Result = {
  debate_id: '',
  topic: {
    id: '',
    title: '',
    desc: '',
    created_at: '',
    participant_count: 0,
    creator: {
      name: '',
      avatar: '',
    },
    type: [
      {
        id: '',
        name: '',
      },
    ],
    winningRate: 0,
  },
  difficulty: {
    id: '',
    name: '',
  },
  position: {
    id: '',
    name: '',
  },
  created_at: 0,
  duration: 0,
  state: 2,
  result: {
    debateAnalysis: {
      isWin: true,
      comprehensiveScore: 0,
      result: '',
    },
    highlights: [
      "",
    ],
    improvementPoints: [
      ""
    ],
    coachingComments: [
      "",
    ],
  }
}

const { data, loading, fetchData } = useFetchData(getResultApi, [id], defaultValue, {
  newData: 'reset',
  handleErr: (err) => {
    console.log(err);
    router.push({ name: '404' })
  }
})
fetchData();
</script>

<template>
  <div class='data-result-container'>
    <h1>辩论结果页</h1>
    <p>
      {{ id }}
    </p>
    <p>
      {{ data }}
    </p>
  </div>
</template>

<style scoped></style>