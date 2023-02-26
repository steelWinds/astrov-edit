import { mount, renderToString } from '@vue/test-utils'
import { test, expect } from 'vitest'
import ElementPlus from 'element-plus'
import { createTestingPinia } from '@pinia/testing'
import StaticOptionsThemeOptions from '@/components/static/options/ThemeOptions.vue'
import VHeader from '@/components/ui/VHeader.vue'

test('Test VHeader component', () => {
  const wrapper = mount(VHeader, {
    global: {
      plugins: [ElementPlus, createTestingPinia()],
      components: { StaticOptionsThemeOptions }
    }
  })
})
