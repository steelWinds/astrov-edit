import { useDark, useToggle } from '@vueuse/core'

export const ThemeStates = {
  LIGHT: 'tw-light',
  DARK: 'tw-dark'
}

export const useThemeStore = definePiniaStore('theme-store', () => {
  const isDark = useDark({
    valueDark: ThemeStates.DARK,
    valueLight: ThemeStates.LIGHT
  })

  const toggleDarkTheme = useToggle(isDark)

  return {
    isDark,
    toggleDarkTheme
  }
})
