import type { WebfontList, WebfontSortingValues } from '@/utils'

export const getGFontsList = (
  sort: WebfontSortingValues,
  options: Parameters<typeof useFetch<WebfontList>>['1'] = {}
) => {
  const rc = useRuntimeConfig()

  return useFetch<WebfontList>(rc.public.gfApiBase, {
    query: {
      key: rc.public.gfApiKey,
      sort
    },
    pick: ['items'],
    ...options
  })
}
