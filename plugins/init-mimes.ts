import { useMimesStore } from '@/store/mimes-store'

export default defineNuxtPlugin(app => {
  const mimesStore = useMimesStore()

  app.hook('app:beforeMount', async () => {
    await mimesStore.fetchMimes()
  })
})
