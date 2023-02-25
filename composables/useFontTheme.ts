import type { WebfontFamily } from '@/utils'

const DEFAULT_FONT_PRESET = {
  family: 'monospace',
  size: 12,
  weight: 400,
  style: 'regular',
  availableWeight: [
    400,
    500
  ],
  availableStyles: [
    'regular',
    'italic'
  ]
}

export const useFontTheme = () => {
  const fontTheme = ref<typeof DEFAULT_FONT_PRESET>({
    family: DEFAULT_FONT_PRESET.family,
    size: DEFAULT_FONT_PRESET.size,
    weight: DEFAULT_FONT_PRESET.weight,
    style: DEFAULT_FONT_PRESET.style,
    availableWeight: DEFAULT_FONT_PRESET.availableWeight,
    availableStyles: DEFAULT_FONT_PRESET.availableStyles
  })

  const resetFont = () => {
    fontTheme.value = DEFAULT_FONT_PRESET
  }

  const setAvailableOptions = (
    variants: WebfontFamily['variants']
  ) => {
    fontTheme.value.availableWeight = [...new Set(variants
      .flatMap(v => {
        return v === 'regular' ? [FontBaseWeight[v], v] : v
      })
      .map(v => v.match(/\d+/gi)?.[0])
      .filter(Boolean)
      .map(Number)
    )].sort()
    fontTheme.value.availableStyles = [...new Set(variants
      .map(v => v.match(/[a-z]+/gi)?.[0])
      .filter(Boolean)
    )].sort() as string[]

    fontTheme.value.style = fontTheme.value.availableStyles?.[0] ?? 'regular'
    fontTheme.value.weight = fontTheme.value.availableWeight?.[0] ?? FontBaseWeight[fontTheme.value.style]
  }

  return {
    fontTheme,
    setAvailableOptions,
    resetFont
  }
}
