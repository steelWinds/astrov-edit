import { useDark, useToggle } from '@vueuse/core'

const ThemeStates = {
  LIGHT: 'light',
  DARK: 'dark'
}

export const useDarkTheme = () => {
  const isDark = useDark({
    valueDark: ThemeStates.DARK,
    valueLight: ThemeStates.LIGHT
  })

  const toggleDarkTheme = useToggle(isDark)

  return {
    isDark,
    toggleDarkTheme
  }
}
