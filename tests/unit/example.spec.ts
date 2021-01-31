import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import LocalDataDemos from '@/components/LocalDataDemos.vue'

describe('LocalDataDemos.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(LocalDataDemos, {
      props: { msg }
    })
    expect(wrapper.text()).to.include(msg)
  })
})
