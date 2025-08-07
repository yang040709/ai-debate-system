import { ref, computed, Ref } from 'vue'

interface PaginationInfo {
  page: number
  limit: number
}

interface DataInfo {
  total: number
}

/**
 * 这是这个配合数据进行安全分页的函数，需要提供page,limit,total
 * @param params 获取的参数
 * @param DataInfo 数据信息
 * @returns
 */
export const usePagination = (params: Ref<PaginationInfo>, DataInfo: Ref<DataInfo>) => {
  const page = computed(() => {
    return params.value.page
  })
  const limit = computed(() => {
    return params.value.limit
  })
  const total = computed(() => {
    return DataInfo.value.total
  })
  const totalPage = computed(() => {
    return Math.ceil(total.value / limit.value)
  })
  const changePage = (p: number) => {
    if (p >= 1 && p <= totalPage.value) {
      params.value.page = p
    }
  }

  const changeLimit = (p: number) => {
    if (p >= 1 && p <= 100) {
      params.value.limit = p
    }
  }

  const changeTotal = (t: number) => {
    if (t >= 0) {
      DataInfo.value.total = t
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
