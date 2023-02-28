// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
  vite: {
    esbuild: {
      // TODO: add support for DEV
      // drop: ['console', 'debugger']
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
    ],
    'nuxt-vitest'
  ]
})
