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
      '@nuxtjs/google-fonts',
      {
        download: true,
        overwriting: true,
        families: {
          Inter: true
        },
        preload: true,
        preconnect: true,
        display: 'swap',
        useStylesheet: true
      }
    ],
    '@vite-pwa/nuxt',
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
