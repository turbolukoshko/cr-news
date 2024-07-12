import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import LatestUpdates from '../LatestArticles.vue'

type Article = {
  title: string
  publishDate: string
  category: 'news' | 'essay'
  url: string
}

describe('LatestUpdates.vue', () => {
  const mockArticles: Article[] = [
    {
      title: 'Find new ways to travel north',
      publishDate: '2024-07-12T09:00:32.200Z',
      category: 'news',
      url: '/articles/4738.html'
    },
    {
      title:
        'When will it become possible to use time travel in order to fix your earlier mistakes?',
      publishDate: '2024-07-12T12:18:10.317Z',
      category: 'essay',
      url: '/articles/7256.html'
    },
    {
      title: '10 ways to write better text',
      publishDate: '2024-07-12T09:00:32.200Z',
      category: 'news',
      url: '/articles/7247.html'
    },
    {
      title: 'Announcement: we have a new website category',
      publishDate: '2024-05-30T17:12:13.102Z',
      category: 'news',
      url: '/articles/1749.html'
    },
    {
      title: 'Weekly news',
      publishDate: '2023-05-29T00:23:15.276Z',
      category: 'news',
      url: '/articles/1538.html'
    },
    {
      title: 'In-depth travel guide for Tanzania',
      publishDate: '2023-05-31T11:12:43.003Z',
      category: 'essay',
      url: '/articles/2594.html'
    }
  ]

  it('renders correctly with default props', () => {
    const wrapper = mount(LatestUpdates)

    expect(wrapper.findAll('.article-box ul li').length).toBeGreaterThan(0)
  })

  it('filters articles based on checkbox selection', async () => {
    const wrapper = mount(LatestUpdates, {
      props: {
        articles: mockArticles
      }
    })

    expect(wrapper.findAll('.article-box ul li').length).toBeGreaterThan(0)

    await wrapper.find('#news').setValue(false)
    expect(wrapper.findAll('.article-box ul li').length).toBe(3)

    await wrapper.find('#essays').setValue(false)
    expect(wrapper.find('.article-box ul li').text()).toBe(
      'When will it become possible to use t...July 12'
    )
  })
})
