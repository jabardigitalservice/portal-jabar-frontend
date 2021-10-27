import { mount } from '@vue/test-utils'
import NewsItem from '@/components/News/Item'

let wrapper

beforeEach(() => {
  wrapper = mount(NewsItem, {
    propsData: {
      item: {
        id: 1,
        slug: 'dummy-slug',
        image: 'https://via.placeholder.com/100',
        title: 'Testing News Component',
        category: 'My Category',
        date: new Date('10/01/2021')
      },
      small: false,
      loading: false
    }
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('NewsItem Component', () => {
  test('should render a skeleton when `loading` props is true', async () => {
    await wrapper.setProps({
      loading: true
    })

    const skeletons = wrapper.findComponent({ ref: 'news-item-skeletons' })
    const title = wrapper.findComponent({ ref: 'news-item-title' })
    const meta = wrapper.findComponent({ ref: 'news-item-meta' })

    expect(skeletons.exists()).toBe(true)
    expect(title.exists()).toBe(false)
    expect(meta.exists()).toBe(false)
  })

  test('should render image', () => {
    const image = wrapper.findComponent({ ref: 'news-item-image' })

    expect(image.exists()).toBe(true)
  })

  test('should render title and meta', () => {
    const title = wrapper.findComponent({ ref: 'news-item-title' })
    const meta = wrapper.findComponent({ ref: 'news-item-meta' })

    expect(title.text()).toMatch(/testing news component/i)
    expect(meta.text()).toMatch(/my category | 1 oktober 2021/i)
  })

  test('should render `small` variant', async () => {
    await wrapper.setProps({
      small: true
    })

    const container = wrapper.findComponent({ ref: 'news-item' })

    expect(container.classes()).toContain('grid-cols-news-small')
  })
})
