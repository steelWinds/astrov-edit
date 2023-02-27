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

export const useFontStore = definePiniaStore('font-store', () => {
  const fontTheme = reactive(DEFAULT_FONT_PRESET)
  const {
    data,
    pending: pendingRemoteFonts,
    execute: getRemoteFonts
  } = getGFontsList(
    'alpha',
    { immediate: false }
  )
  const {
    localFonts,
    pending: pendingLocalFonts,
    execute: getLocalFonts
  } = useLocalFonts()

  const getFonts = () => {
    getRemoteFonts()
    getLocalFonts()
  }

  const pendingFonts = computed(() => pendingLocalFonts.value || pendingRemoteFonts.value)

  const remoteFonts = computed(() => data.value?.items ?? [])

  const fonts = computed(() => localFonts.value.concat(remoteFonts.value))

  const currentFont = computed(() => fonts.value
    .find(({ family }) => family === fontTheme.family)
  )

  const setDefaultFontPreset = () => {
    Object.assign(fontTheme, DEFAULT_FONT_PRESET)
  }

  const setAvailableOptions = (
    variants: WebfontFamily['variants']
  ) => {
    [
      fontTheme.availableWeight,
      fontTheme.availableStyles
    ] = parseWebfontVariants(variants)

    setDefaultOptions()
  }

  const setDefaultOptions = () => {
    [
      fontTheme.style,
      fontTheme.weight
    ] = [
      fontTheme.availableStyles?.[0] ?? 'regular',
      fontTheme.availableWeight?.[0] ?? FontBaseWeight[fontTheme.style]
    ]
  }

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
