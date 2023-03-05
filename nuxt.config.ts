// https://nuxt.com/docs/api/configuration/nuxt-config
const DEV = process.env.NODE_ENV === 'development'

export default defineNuxtConfig({
  vite: {
    esbuild: {
      drop: DEV ? [] : ['console', 'debugger']
    }
  },
  imports: {
    dirs: [
      'utils/**'
    ]
  },
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
    '@pinia-plugin-persistedstate/nuxt',
    [
      '@element-plus/nuxt',
      {
        themes: ['dark']
      }
    ],
    'nuxt-vitest'
  ]
})
