import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
import VRewriteBtns from '../VRewriteBtns.vue'

test('mount component and check buttons', async () => {
  expect(VRewriteBtns).toBeTruthy()

  const wrapper = mount(VRewriteBtns, {
    props: {
      title: 'Guess User Age App'
    }
  })

  expect(wrapper.findAll('button')).toHaveLength(2)
})
