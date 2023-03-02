import { describe, test, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useThemeStore, ThemeStates } from '@/store/theme-store'
import { useMediaQuery } from '@vueuse/core'

describe('Spec of pinia theme-store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test.concurrent('Set prefer color theme', async ({ expect }) => {
    const themeStore = useThemeStore()

    await useDOMNextTick()

    const isDark = unref(useMediaQuery('(prefer-color-scheme: dark)'))

    expect(themeStore.isDark).toBe(isDark)
  })

  test.concurrent('Set prefer color theme', async ({ expect }) => {
    const themeStore = useThemeStore()

    themeStore.toggleDarkTheme(false)

    await useDOMNextTick()

    expect(themeStore.isDark).toBeFalsy()
    expect(document.documentElement.classList.contains(ThemeStates.LIGHT))
      .toBeTruthy()

    themeStore.toggleDarkTheme(true)

    await useDOMNextTick()

    expect(themeStore.isDark).toBeTruthy()
    expect(document.documentElement.classList.contains(ThemeStates.DARK))
      .toBeTruthy()
  })
})
