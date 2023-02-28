import { FAKE_FONTS } from '@/datasets/fake-fonts'
import { describe, test, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { useFontStore } from '@/store/font-store'

describe('Spec of pinia font-store', () => {
  beforeEach(() => {
    setActivePinia(createTestingPinia({
      createSpy: vi.fn,
      fakeApp: true
    }))
  })

  // TODO: Doing this test
  test('Test set currentFont', () => {
    const fontTheme = useFontStore()

    // Mocking fonts computed var, 'cause it depends on the another actions

    console.log(fontTheme.fonts)
  })
})
