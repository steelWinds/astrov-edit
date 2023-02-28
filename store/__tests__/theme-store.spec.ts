import { describe, test, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useThemeStore, ThemeStates } from '@/store/theme-store'

describe('Spec of pinia theme-store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test.concurrent('Set prefer color theme', async ({ expect }) => {
    const themeStore = useThemeStore()
    const window = new Window()

    await syncDOMUpdate()

    const isDark = window.matchMedia('(prefer-color-scheme: dark)').matches

    expect(themeStore.isDark).toBe(isDark)
  })

  test.concurrent('Set prefer color theme', async ({ expect }) => {
    const themeStore = useThemeStore()

    themeStore.toggleDarkTheme(false)
    await syncDOMUpdate()

    expect(themeStore.isDark).toBeFalsy()
    expect(document.documentElement.classList.contains(ThemeStates.LIGHT))
      .toBeTruthy()

    themeStore.toggleDarkTheme(true)
    await syncDOMUpdate()

    expect(themeStore.isDark).toBeTruthy()
    expect(document.documentElement.classList.contains(ThemeStates.DARK))
      .toBeTruthy()
  })
})
