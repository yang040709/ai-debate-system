import { ref, computed } from 'vue'

export const usePaging = () => {
  const page = ref(1)
  const limit = ref(10)
  const total = ref(0)
  const totalPage = computed(() => {
    return Math.ceil(total.value / limit.value)
  })
  const changePage = (p: number) => {
    if (p >= 1 && p <= totalPage.value) {
      page.value = p
    }
  }

  const changeLimit = (p: number) => {
    if (p >= 1 && p <= 100) {
      limit.value = p
    }
  }

  const changeTotal = (t: number) => {
    if (t >= 0) {
      total.value = t
      console.log(total.value, '<==total')
    }
  }

  const hasMore = computed(() => {
    return page.value < totalPage.value
  })

  return {
    page,
    limit,
    total,
    totalPage,
    hasMore,
    changePage,
    changeLimit,
    changeTotal,
  }
}
