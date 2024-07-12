<template>
  <div class="latest-updates">
    <div class="filter-panel">
      <label for="news">News </label>
      <input type="checkbox" v-model="filters.news" id="news" />
      <label for="essays"> Essay</label>
      <input type="checkbox" v-model="filters.essays" id="essays" />
    </div>
    <div class="article-box">
      <ul>
        <li v-for="article in filteredArticles" :key="article.url">
          <a :href="article.url" :title="article.title">{{ cutTitle(article.title) }}</a>
          <span>{{ formatDate(article.publishDate) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        news: true,
        essays: true
      },
      articles: window.LATEST_ARTICLES || [
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
    }
  },
  computed: {
    filteredArticles() {
      const { news, essays } = this.filters

      return this.articles
        .filter((article) => {
          const isRecent =
            new Date(article.publishDate) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          return (
            isRecent &&
            ((news && article.category === 'news') || (essays && article.category === 'essay'))
          )
        })
        .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
        .slice(0, 5)
    }
  },
  methods: {
    cutTitle(title) {
      return title.length > 40 ? `${title.substring(0, 37)}...` : title
    },
    formatDate(date) {
      const options = { month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en-US', options)
    }
  }
}
</script>
