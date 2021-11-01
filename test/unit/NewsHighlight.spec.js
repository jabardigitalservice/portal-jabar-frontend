import { mount } from '@vue/test-utils'
import NewsHighlight from '@/components/News/Highlight'

let wrapper

beforeEach(() => {
  wrapper = mount(NewsHighlight, {
    mocks: {
      $fetchState: { pending: false, error: false, timestamp: Date.now() }
    }
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('NewsHighlight Component', () => {
  test('should render skeleton when `item` props is empty', async () => {
    const skeletons = wrapper.findComponent({ ref: 'news-highlight-skeletons' })
    await wrapper.setData({
      item: []
    })
    expect(skeletons.exists()).toBe(true)
  })

  test('should render an image', async () => {
    await wrapper.setData({
      item: {
        image: 'test-image.jpg'
      }
    })

    const image = wrapper.findComponent({ ref: 'news-highlight-image' })

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

    const category = wrapper.findComponent({ ref: 'news-highlight-category' })
    const title = wrapper.findComponent({ ref: 'news-highlight-title' })
    const date = wrapper.findComponent({ ref: 'news-highlight-date' })
    const author = wrapper.findComponent({ ref: 'news-highlight-author' })

    expect(title.text()).toMatch(/my dummy news/i)
    expect(category.text()).toMatch(/my category/i)
    expect(date.text()).toMatch(/19 agustus 2021/i)
    expect(author.text()).toMatch(/john doe/i)
  })

  /**
   * TODO: Test component behavior when button is clicked
   */
})
