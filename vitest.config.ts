import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'

export default {
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom'
  },
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./', import.meta.url)) }
    ]
  }
}
