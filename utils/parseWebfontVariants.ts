export const parseWebfontVariants = <T extends Array<any>, U extends Array<any>>(
  variants: WebfontFamily['variants'] = []
): [T, U] => {
  const weights = [...new Set(variants
    .flatMap(v => {
      return v === 'regular' ? [FONT_BASE_WEIGHTS[v], v] : v
    })
    .map(v => v.match(/\d+/gi)?.[0])
    .filter(Boolean)
    .map(Number)
  )].sort() as T

  const styles = [...new Set(variants
    .map(v => {
      const style = v.match(/[a-z]+/gi)?.[0]

      return style === 'regular' ? 'normal' : style
    })
    .filter(Boolean)
    .map(String)
  )].sort() as U

  console.log(weights, styles)

  return [weights, styles]
}
