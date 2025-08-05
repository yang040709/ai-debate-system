import { ref } from 'vue'
import type { Ref } from 'vue'

type MakeRef<T extends any[]> = {
  [K in keyof T]: Ref<T[K]>
}

export const useFetchData = <P extends any[], T>(
  apiCall: (...args: P) => Promise<T>,
  errorMessage: string,
  initialValue: T,
  args: MakeRef<P>,
  mode: 'reset' | 'add' = 'reset',
) => {
  const data = ref<T>(initialValue)
  const loading = ref<boolean>(true)
  const error = ref<string | null>(null)

  const fetchData = async () => {
    loading.value = true
    error.value = null
    try {
      let argsValue = []
      console.log(args)
      if (args.length !== 0) {
        argsValue = args.map((item) => item.value) as unknown as P
      } else {
        argsValue = args as P
      }
      if (mode === 'reset') {
        data.value = await apiCall(...argsValue)
      } else if (mode === 'add') {
        const res = (await apiCall(...argsValue)) as { list: any[] }
        console.log(res, res instanceof Array, res.list, res.list instanceof Array)

        if (res && !(res instanceof Array) && res.list && res.list instanceof Array) {
          res.list.forEach((e) => {
            data.value.list.push(e)
          })
        } else if (res instanceof Array) {
          res.forEach((e) => {
            data.value.push(e)
          })
        }
      }
    } catch (err) {
      error.value = errorMessage
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetchData }
}
