import type { FontWeightsValues, FontStyles } from '@/utils'

const DEFAULT_FONT_PRESET = {
  family: 'monospace',
  size: 12,
  weight: '400' as FontWeightsValues,
  style: 'regular' as FontStyles,
  availableWeight: [
    '400',
    '500'
  ] as FontWeightsValues[],
  availableStyles: [
    'normal',
    'italic'
  ] as FontStyles[]
}

export const useFontStore = definePiniaStore('font-store', () => {
  const fontTheme = reactive(DEFAULT_FONT_PRESET)
  const { fetchGFonts, pending: pendingGFonts, gFonts } = getGFontsList('alpha')
  const {
    localFonts,
    pending: pendingLocalFonts,
    execute: getLocalFonts
  } = useLocalFonts()

  const getFonts = () => {
    fetchGFonts()
    getLocalFonts()
  }

  const pendingFonts = computed(() => pendingLocalFonts.value || pendingGFonts.value)

  const remoteFonts = computed(() => gFonts.value)

  const fonts = computed(() => localFonts.value.concat(remoteFonts.value))

  const currentFont = computed(() => fonts.value
    .find(({ family }) => family === fontTheme.family)
  )

  const setDefaultFontPreset = () => {
    Object.assign(fontTheme, DEFAULT_FONT_PRESET)
  }

  const setAvailableOptions = () => {
    [
      fontTheme.availableWeight,
      fontTheme.availableStyles
    ] = parseWebfontVariants(currentFont.value?.variants)

    setDefaultOptions()
  }

  const setDefaultOptions = () => {
    [
      fontTheme.style,
      fontTheme.weight
    ] = [
      fontTheme.availableStyles?.[0] ?? 'Unnamed',
      fontTheme.availableWeight?.[0] ?? '400'
    ]
  }

  watch(() => fontTheme.family, setAvailableOptions)

  return {
    setAvailableOptions,
    setDefaultFontPreset,
    getFonts,
    currentFont,
    fontTheme,
    fonts,
    pendingFonts
  }
})
