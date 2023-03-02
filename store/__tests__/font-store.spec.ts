import { describe, test, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
// import { useFilesStore } from '@/store/files-store'

describe.skip('Spec of pinia file-store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test.skip('Fix me', () => {

  })
})
