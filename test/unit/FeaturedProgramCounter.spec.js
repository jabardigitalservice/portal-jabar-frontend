import { mount } from '@vue/test-utils'
import FeaturedProgramCounter from '@/components/FeaturedProgram/Counter'

let wrapper

beforeEach(() => {
  wrapper = mount(FeaturedProgramCounter, {
    propsData: {
      counter: 27,
      loading: false
    }
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('Featured Program Counter', () => {
  test('should render skeleton when fetching', async () => {
    await wrapper.setProps({
      loading: true
    })

    const skeleton = wrapper.find('[name="fp-counter-skeleton"]')
    expect(skeleton.exists()).toBe(true)
  })

  test('should render counter when fetching is complete', () => {
    const label = wrapper.find('[name="fp-counter-counter"]')
    expect(label.text()).toContain('27 Program')
  })
})
