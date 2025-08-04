import { ref } from 'vue'

export const useFetchData = <P extends any[], T>(
  apiCall: (...args: P) => Promise<T>,
  errorMessage: string,
  initialValue: T,
  args: P,
) => {
  const data = ref<T>(initialValue)
  const loading = ref<boolean>(true)
  const error = ref<string | null>(null)

  const fetchData = async () => {
    loading.value = true
    error.value = null
    try {
      data.value = await apiCall(...args)
    } catch (err) {
      error.value = errorMessage
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetchData }
}
