const DEFAULT_FONT_PRESET = {
  family: 'monospace',
  size: 12,
  weight: 400,
  style: 'normal'
}

export const useFontTheme = () => {
  const fontTheme = ref({
    family: 'monospace',
    size: 12,
    weight: 400,
    style: 'regular'
  })

  // const availableWeight = ref<number[]>([]);
  // const availableStyles = ref<string[]>([]);

  const resetFont = () => {
    fontTheme.value = DEFAULT_FONT_PRESET
  }

  // const setAvailableStyles = (
  //  styles: google.fonts.WebfontFamily['variants']
  // ) => {
  //  styles.forEach(style => {

  //  })
  // };

  return {
    fontTheme,
    resetFont
  }
}
