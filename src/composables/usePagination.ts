import { computed, ref } from 'vue'

interface PaginationInfo {
  page: number
  limit: number
}

/**
 * 这是一个进行安全分页的hook函数
 * @returns
 */
export const usePagination = (params?: PaginationInfo) => {
  //第几页
  const page = ref(params?.page || 1)
  //每页多少条
  const limit = ref(params?.limit || 10)
  //数据的总数
  const total = ref(0)
  //总页数
  const totalPage = computed(() => {
    //如果总数为0，总页数为0
    if (limit.value <= 0) {
      return 0
    }
    return Math.ceil(total.value / limit.value)
  })
  //是否还有更多数据
  const hasMore = computed(() => {
    return page.value < totalPage.value
  })
  //改变页数
  const changePage = (p: number) => {
    if (p >= 1) {
      page.value = p
    }
  }
  //改变每页条数
  const changeLimit = (p: number) => {
    if (p >= 1 && p <= 100) {
      limit.value = p
    }
  }
  //改变数据总数
  const changeTotal = (t: number) => {
    if (t >= 0) {
      total.value = t
    }
  }
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
