export const parseWebfontVariants = <T extends Array<any>, U extends Array<any>>(
  variants: WebfontFamily['variants'] = []
): [T, U] => {
  const weights = [...new Set(variants
    .flatMap(v => {
      return v === 'regular' ? [FONT_BASE_WEIGHTS[v], v] : v
    })
    .map(v => Number(v.match(/\d+/gi)?.[0]))
    .filter(Boolean)
  )]
    .sort() as T

  const styles = [...new Set(variants
    .map(v => {
      const style = v.match(/[a-z]+/gi)?.[0]

      return style === 'regular' ? 'normal' : String(style ?? '')
    })
    .filter(Boolean)
  )]
    .sort() as U

  return [weights, styles]
}
