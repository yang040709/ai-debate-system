import { ref } from 'vue'
import type { Ref } from 'vue'

type MakeRef<T extends any[]> = {
  [K in keyof T]: Ref<T[K]>
}

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

interface UseFetchDataConfig {
  errMessage: string
  isHandleErr: boolean
  init: 'lazy' | 'immediate'
  newData: 'reset' | 'add'
}

export const useFetchData = <P extends any[], T>(
  apiCall: (...args: P) => Promise<T>,
  args: MakeRef<P>,
  initialValue: T,
  config?: Partial<UseFetchDataConfig>,
) => {
  const data = ref<T>(initialValue)
  const loading = ref<boolean>(true)
  const error = ref<string | null>(null)
  console.log('config=>1', config)
  const defaultConfig = {
    errMessage: '请求数据失败',
    isHandleErr: false,
    init: 'lazy',
    newData: 'reset',
  }
  const finallyConfig = {
    ...defaultConfig,
    ...config,
  }
  console.log('config=>2', finallyConfig)

  const fetchData = async () => {
    loading.value = true
    error.value = null
    try {
      let argsValue = []

      if (args.length !== 0) {
        argsValue = args.map((item) => item.value) as unknown as P
      } else {
        argsValue = args as P
      }
      if (finallyConfig.newData === 'reset') {
        data.value = await apiCall(...argsValue)
      } else if (finallyConfig.newData === 'add') {
        const res = (await apiCall(...argsValue)) as { list: any[]; total: number }
        if (res && !(res instanceof Array) && res.list && res.list instanceof Array) {
          res.list.forEach((e) => {
            data.value.list.push(e)
          })
          data.value.total = res.total
        } else if (res instanceof Array) {
          res.forEach((e) => {
            data.value.push(e)
          })
        }
      }
    } catch (err) {
      error.value = finallyConfig.errMessage
      console.error(err)
      if (finallyConfig.isHandleErr) {
        throw new Error(error.value as string)
      }
    } finally {
      loading.value = false
    }
  }
  if (finallyConfig.init === 'immediate') {
    fetchData()
  }
  return { data, loading, error, fetchData }
}
