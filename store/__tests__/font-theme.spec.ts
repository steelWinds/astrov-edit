import { FAKE_FONTS } from '@/datasets/fake-fonts'
import { describe, test, beforeEach, afterEach, vi, expect } from 'vitest'
import { setActivePinia, createPinia, storeToRefs } from 'pinia'
import { useFontStore } from '@/store/font-store'
import { faker } from '@faker-js/faker'

vi.mock('@/composables/useLocalFonts', () => {
  return {
    useLocalFonts () {
      return {
        localFonts: shallowRef(FAKE_FONTS(10))
      }
    }
  }
})

vi.mock('@/utils/getGFontsList', () => {
  return {
    getGFontsList () {
      return {
        data: shallowRef({ items: FAKE_FONTS(10) })
      }
    }
  }
})

describe('Spec of pinia font-store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('Test set currentFont and font options', () => {
    const fontThemeStore = useFontStore()
    const { fontTheme, currentFont } = storeToRefs(fontThemeStore)

    const randomN = faker.datatype.number(20)

    fontThemeStore.fontTheme.family = fontThemeStore.fonts[randomN].family

    fontThemeStore.setAvailableOptions()

    expect(currentFont.value?.family).toBe(fontTheme.value.family)
    expect(fontTheme.value.style).toBe(fontTheme.value.availableStyles[0])
    expect(fontTheme.value.weight).toBe(fontTheme.value.availableWeight[0])
  })

  afterEach(() => {
    vi.clearAllMocks()
  })
})
