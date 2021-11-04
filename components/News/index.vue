<template>
  <main>
    <section class="relative">
      <NewsHeader />
    </section>
    <section class="news__categories py-4 border-b border-gray-200 overflow-hidden overflow-x-scroll mb-6">
      <NewsCategory
        :categories="categories"
        :current-category="currentCategory"
        @click="setCurrentCategory"
      />
    </section>
    <!-- News Section -->
    <BaseContainer class="mx-auto grid grid-cols-1 gap-20 md:grid-cols-news-container">
      <section class="w-full flex flex-col">
        <NewsHeadline :item="headline" :loading="loading" class="mb-6" />
        <NewsList :items="mainNews" :loading="loading" class="mb-6">
          <template #footer>
            <!-- TODO: add pagination here -->
          </template>
        </NewsList>
      </section>
      <section class="w-full flex flex-col gap-14">
        <!-- Latest News -->
        <NewsList :items="latestNews" small :loading="loading">
          <template #header>
            <NewsListHeader label="Berita Terbaru" :category="currentCategory" class="mb-2" />
          </template>
        </NewsList>

        <!-- Popular News -->
        <NewsList :items="popularNews" small :loading="loading">
          <template #header>
            <NewsListHeader label="Berita Terpopuler" :category="currentCategory" class="mb-2" />
          </template>
        </NewsList>
      </section>
    </BaseContainer>
  </main>
</template>

<script>
import { newsCategories } from '~/static/data'
export default {
  data () {
    return {
      categories: newsCategories,
      currentCategory: 'ekonomi',
      mainNews: [],
      latestNews: [],
      popularNews: [],
      headlineNews: []
    }
  },
  async fetch () {
    /**
     * FIXME: this object should be dynamic based on
     * pagination values
     */
    const pagination = {
      page: 1,
      per_page: 5
    }

    const params = {
      cat: this.currentCategory,
      sort_order: 'desc'
    }

    try {
      const [main, latest, popular] = await Promise.all([
        this.$axios.get('/v1/news', { params: { ...params, ...pagination } }),
        this.$axios.get('/v1/news', { params: { ...params, per_page: 5 } }),
        this.$axios.get('/v1/news', { params: { ...params, per_page: 5, sort_by: 'views' } })
      ])

      const { data: mainNews } = await main.data
      const { data: latestNews } = await latest.data
      const { data: popularNews } = await popular.data

      this.mainNews = this.mapItems(mainNews)
      this.latestNews = this.mapItems(latestNews)
      this.popularNews = this.mapItems(popularNews)

      /**
       *  Only fetch headlines the first time the page loads
       *  or after the `headlineNews` data is cleared (after 10 minutes or so)
       */
      if (Array.isArray(this.headlineNews) && !this.headlineNews.length) {
        const response = await this.$axios.get('/v1/news/headline')
        const { data } = response.data
        this.headlineNews = data
      }
    } catch (error) {
      // silent error
    }
  },
  computed: {
    loading () {
      return this.$fetchState.pending
    },
    headline () {
      const news = this.headlineNews.filter(news => news.category === this.currentCategory)
      // return the first index of filtered news
      return news[0]
    }
  },
  watch: {
    currentCategory () {
      this.$fetch()
    }
  },
  activated () {
    /**
     *  Call fetch again if last fetch more than ten minutes ago
     */
    if (this.$fetchState.timestamp <= Date.now() - 600000) {
      this.headlineNews = [] // clear headline news
      this.$fetch()
    }
  },
  methods: {
    setCurrentCategory (category) {
      this.currentCategory = category
    },
    mapItems (items) {
      return items.map(item => ({
        ...item,
        date: new Date(item.created_at)
      }))
    }
  }
}
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.news__categories::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.news__categories {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
