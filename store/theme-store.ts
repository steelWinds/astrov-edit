export const useThemeStore = definePiniaStore('theme-store', () => {
  const { isDark, toggleDarkTheme } = useDarkTheme()
  const { fontTheme, resetFont } = useFontTheme()

  return {
    isDark,
    fontTheme,
    toggleDarkTheme,
    resetFont
  }
})
