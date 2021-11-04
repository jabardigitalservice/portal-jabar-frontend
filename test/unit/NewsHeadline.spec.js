import { mount } from '@vue/test-utils'
import NewsHeadline from '@/components/News/Headline'

let wrapper

beforeEach(() => {
  wrapper = mount(NewsHeadline, {
    mocks: {
      $fetchState: { pending: false, error: false, timestamp: Date.now() }
    }
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('NewsHeadline Component', () => {
  test('should render skeleton when loading props is true', async () => {
    const skeletons = wrapper.findComponent({ ref: 'news-headline-skeletons' })
    await wrapper.setData({
      loading: true
    })
    expect(skeletons.exists()).toBe(true)
  })

  test('should render an image', async () => {
    await wrapper.setData({
      item: {
        image: 'test-image.jpg'
      }
    })

    const image = wrapper.findComponent({ ref: 'news-headline-image' })

    expect(image.attributes('style')).toContain('background-image: url(test-image.jpg)')
  })

  test('should render title and meta', async () => {
    await wrapper.setData({
      item: {
        id: 1,
        title: 'My Dummy News',
        slug: 'my-dummy-news',
        category: 'my category',
        author: {
          name: 'john doe'
        },
        created_at: '2021-08-19T04:58:24Z',
        updated_at: '2021-09-22T23:20:04Z'
      }
    })

    const category = wrapper.findComponent({ ref: 'news-headline-category' })
    const title = wrapper.findComponent({ ref: 'news-headline-title' })
    const date = wrapper.findComponent({ ref: 'news-headline-date' })
    const author = wrapper.findComponent({ ref: 'news-headline-author' })

    expect(title.text()).toMatch(/my dummy news/i)
    expect(category.text()).toMatch(/my category/i)
    expect(date.text()).toMatch(/19 agustus 2021/i)
    expect(author.text()).toMatch(/john doe/i)
  })

  /**
   * TODO: Test component behavior when button is clicked
   */
})
