import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
import RewriteBtns from '@/components/utils/RewriteBtns.vue'

test('mount component and check buttons', async () => {
  expect(RewriteBtns).toBeTruthy()

  const wrapper = mount(RewriteBtns, {
    props: {
      title: 'Guess User Age App'
    }
  })

  expect(wrapper.findAll('button')).toHaveLength(0)
})
