import { defineVitestConfig } from 'nuxt-vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'

export default defineVitestConfig({
  test: {
    environment: 'happy-dom'
  }
})
