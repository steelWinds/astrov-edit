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

  const {
    data: gFonts,
    isFetching: pendingGFonts,
    execute: executeGFonts
  } = getGFontsList('alpha')
  const {
    localFonts,
    pending: pendingLocalFonts,
    execute: executeLocalFonts,
    isSupported: localFontsSupported,
    denied: localFontsDenied
  } = useLocalFonts()

  const getFonts = () => {
    return Promise.allSettled([executeGFonts(), executeLocalFonts()])
  }

  const pendingFonts = computed(() => pendingLocalFonts.value || pendingGFonts.value)

  const remoteFonts = computed(() => gFonts.value?.items ?? [])

  const fonts = computed(() => localFonts.value.concat(remoteFonts.value))

  const currentFont = computed(() => fonts.value
    .find(({ family }) => family === fontTheme.family)
  )

  const setDefaultFontPreset = () => {
    Object.assign(fontTheme, DEFAULT_FONT_PRESET)
  }

  const setAvailableOptions = () => {
    console.log(currentFont.value);

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

  return {
    setDefaultOptions,
    setAvailableOptions,
    setDefaultFontPreset,
    getFonts,
    currentFont,
    fontTheme,
    fonts,
    pendingFonts,
    localFontsSupported,
    localFontsDenied
  }
}, {
  persist: {
    storage: persistedState.localStorage
  }
})
