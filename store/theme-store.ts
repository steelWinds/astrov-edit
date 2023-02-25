export const useThemeStore = definePiniaStore('theme-store', () => {
  return {
    ...useDarkTheme(),
    ...useFontTheme()
  }
})
