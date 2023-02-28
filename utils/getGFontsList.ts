import type { WebfontList, WebfontFamily, WebfontSortingValues } from '@/utils'

// TODO: Fix it
export const getGFontsList = (
  sort: WebfontSortingValues
) => {
  const gFonts = ref<WebfontFamily[]>([])
  const pending = ref(true)

  const fetchGFonts = async () => {
    const rc = useRuntimeConfig()

    const { data, pending: fetchPending, execute } = useLazyFetch<WebfontList>(rc.public.gfApiBase, {
      query: {
        key: rc.public.gfApiKey,
        sort
      },
      pick: ['items'],
      server: false
    })

    execute()

    watch([data, fetchPending], ([f, p]) => {
      gFonts.value = f?.items ?? []
      pending.value = p
    }, { immediate: true })
  }

  return { fetchGFonts, pending, gFonts }
}
