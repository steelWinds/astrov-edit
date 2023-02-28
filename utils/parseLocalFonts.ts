import type { FontData, FontWeightsKeys } from '@/utils'

import { groupBy } from 'lodash-es'

const AvailableWords = Object.keys(FONT_BASE_WEIGHTS).concat('italic')

export const parseLocalFonts = (localFonts: FontData[]) => {
  return Object.entries(groupBy(localFonts, 'family'))
    .map(([family, fontStyles]) => {
      const variants = fontStyles
        .filter(font => {
          const style = font.style.toLowerCase().split(' ')

          return style.length <= 2 && style.every(s => AvailableWords.includes(s))
        })
        .map(font => {
          const style = font.style
            .toLowerCase()
            .split(' ')
            .flatMap(
              s => s === 'regular' || s === 'italic' ? s : FONT_BASE_WEIGHTS[s as FontWeightsKeys]
            )

          return style.join('')
        })

      return {
        family,
        variants
      }
    })
}
