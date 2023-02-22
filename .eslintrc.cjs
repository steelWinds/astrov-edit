module.exports = {
  root: true,
  extends: [
    'standard',
    '@nuxt/eslint-config',
    'plugin:vue/vue3-recommended'
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off'
  }
}
