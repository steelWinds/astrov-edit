/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  important: true,
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      screens: {
        'ultra-sm': '528px'
      },

      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        'white-200': '#eeeeee',
        'white-300': '#b3b5bd',
        mint: '#42B883',
        charcoal: '#35495E',
        orange: '#FFB85B'
      }
    }
  },
  plugins: []
}
