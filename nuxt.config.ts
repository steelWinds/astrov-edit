// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    strict: true
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      'postcss-preset-env': {},
      'tailwindcss/nesting': 'postcss-nesting',
      tailwindcss: {},
      autoprefixer: {}
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
