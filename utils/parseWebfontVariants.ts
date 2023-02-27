import type { WebfontFamily } from '@/utils'

export const parseWebfontVariants = (
  variants: WebfontFamily['variants']
): [number[], string[]] => {
  const weights = [...new Set(variants
    .flatMap(v => {
      return v === 'regular' ? [FontBaseWeight[v], v] : v
    })
    .map(v => v.match(/\d+/gi)?.[0])
    .filter(Boolean)
    .map(Number)
  )].sort()

  const styles = [...new Set(variants
    .map(v => v.match(/[a-z]+/gi)?.[0])
    .filter(Boolean)
    .map(String)
  )].sort()

  return [weights, styles]
}
