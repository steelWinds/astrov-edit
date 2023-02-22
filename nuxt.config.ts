// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    strict: true
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      'postcss-lab-function': {}
    }
  },
  runtimeConfig: {
    public: {
      gfApiKey: '',
      gfApiBase: ''
    }
  },
  modules: [
    [
      '@pinia/nuxt', {
        autoImports: [
          ['defineStore', 'definePiniaStore']
        ]
      }
    ],
    [
      '@element-plus/nuxt',
      {
        imports: ['ElButton']
      }
    ]
  ]
})
