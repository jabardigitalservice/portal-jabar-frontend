import { mount } from '@vue/test-utils'
import NewsVideoItem from '@/components/News/Video/Item'

describe('Component: NewsVideoItem', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(NewsVideoItem, {
      propsData: {
        title: 'My Mock Title',
        link: 'https://mock-link.com',
        thumbnail: 'mock-image.jpg',
        category: 'Mock Category',
        date: '2021-08-19T04:58:24Z' //
      },
      stubs: ['Icon']
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  test('should render thumbnail image', () => {
    const background = wrapper.findComponent({ ref: 'news-video-background' })

    expect(background.attributes('style')).toContain('background-image: url(mock-image.jpg)')
  })

  test('should render category and title', () => {
    const category = wrapper.findComponent({ ref: 'news-video-category' })
    const title = wrapper.findComponent({ ref: 'news-video-title' })

    expect(category.text()).toMatch(/mock category/i)
    expect(title.text()).toMatch(/my mock title/i)
  })

  test('should render date', () => {
    const date = wrapper.findComponent({ ref: 'news-video-date' })
    expect(date.text()).toMatch(/Kamis, 19 Agu 2021/i)
  })

  test('should navigate to `link` props when clicked', () => {
    const video = wrapper.findComponent({ ref: 'news-video-item' })

    expect(video.attributes('href')).toBe('https://mock-link.com')
  })
})
