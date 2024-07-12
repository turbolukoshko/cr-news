<template>
  <h2 class="latest-updates-title">Latest Updates</h2>
  <div class="latest-updates">
    <div class="filter-panel">
      <label for="news">News </label>
      <input type="checkbox" v-model="filters.news" id="news" />
      <label for="essays"> Essay</label>
      <input type="checkbox" v-model="filters.essays" id="essays" />
    </div>
    <div class="article-box">
      <ul>
        <li v-if="filteredArticles.length === 0">No articles</li>
        <li v-for="article in filteredArticles" :key="article.url">
          <a :href="article.url" :title="article.title">{{ cutTitle(article.title) }}</a>
          <span>{{ formatDate(article.publishDate) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface Article {
  title: string
  publishDate: string
  category: string
  url: string
}

interface Filters {
  news: boolean
  essays: boolean
}

export default defineComponent({
  data() {
    return {
      filters: {
        news: true,
        essays: true
      } as Filters,
      articles:
        (window as any).LATEST_ARTICLES ||
        ([
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
        ] as Article[])
    }
  },
  computed: {
    filteredArticles(): Article[] {
      const { news, essays } = this.filters

      return this.articles
        .filter((article: Article) => {
          const isRecent =
            new Date(article.publishDate) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          return (
            isRecent &&
            ((news && article.category === 'news') || (essays && article.category === 'essay'))
          )
        })
        .sort(
          (a: Article, b: Article) =>
            new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        )
        .slice(0, 5)
    }
  },
  methods: {
    cutTitle(title: string): string {
      return title.length > 40 ? `${title.substring(0, 37)}...` : title
    },
    formatDate(date: string): string {
      const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en-US', options)
    }
  }
})
</script>

<style scoped lang="scss">
.latest-updates {
  width: 100%;
  max-width: 500px;
  border: 1px solid #ccc;
  padding: 16px;
  box-sizing: border-box;

  &-title {
    margin-bottom: 16px;
    text-align: center;
  }

  .filter-panel {
    margin-bottom: 16px;
  }

  .article-box {
    ul {
      list-style: none;
      padding: 0;

      li {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;

        a {
          text-decoration: none;
          color: #007bff;
          max-width: 70%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        span {
          color: #666;
          font-size: 0.9em;
        }
      }
    }
  }
}
</style>
