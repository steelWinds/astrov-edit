import { useRuntimeConfig } from '#imports'
import { useFetch } from '@vueuse/core'
import { withQuery } from 'ufo'

export const getGFontsList = (
  sort: WebfontSortingValues
) => {
  const rc = useRuntimeConfig()

  const url = withQuery(rc.public.gfApiBase, {
    key: rc.public.gfApiKey,
    sort
  })

  return useFetch(url, { method: 'GET' }, { immediate: false })
    .json<WebfontList>()
}
