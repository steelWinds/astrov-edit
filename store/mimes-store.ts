export const useMimesStore = definePiniaStore('mimes-store', () => {
  const mimes = ref<string[]>([])

  const fetchMimes = async () => {
    mimes.value = (await $fetch('/api/mimes')).exts
  }

  return {
    mimes,
    fetchMimes
  }
}, {
  persist: {
    storage: persistedState.sessionStorage
  }
})
