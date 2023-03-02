import { defineVitestConfig } from 'nuxt-vitest/config'
import { fileURLToPath } from 'url'

export default defineVitestConfig({
  test: {
    globals: true,
    environment: 'happy-dom'
  },
  resolve: {
    alias: {
      '#imports': fileURLToPath(new URL('./.nuxt/imports.d.ts', import.meta.url))
    }
  }
})
