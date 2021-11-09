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
    <BaseContainer class="mx-auto grid grid-cols-1 gap-10 md:grid-cols-news-container md:gap-20">
      <section class="w-full flex flex-col">
        <NewsHeadline :item="headline" :loading="loading" class="mb-6" />
        <NewsList
          :items="mainNews"
          :loading="mainNewsLoading"
          :max-item="pagination.itemsPerPage"
          class="mb-6"
          :class="mainNews.length ? 'min-h-[850px]' : ''"
        >
          <!-- Main News Pagination -->
          <template #footer>
            <section v-show="mainNews.length" class="max-h-10 mt-6">
              <Pagination
                v-bind="pagination"
                @previous-page="onPaginationChange('prev-page', $event)"
                @next-page="onPaginationChange('next-page', $event)"
                @page-change="onPaginationChange('page-change', $event)"
                @per-page-change="onPaginationChange('per-page-change', $event)"
              />
            </section>
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

    <section class="w-full h-full py-8 bg-[#FCF6F0]">
      <NewsVideo :category="currentCategory" :items="videoNews" :loading="loading" />
    </section>
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
      headlineNews: [],
      videoNews: [],
      pagination: {
        currentPage: 1,
        itemsPerPage: 5,
        totalRows: 0
      },
      mainNewsLoading: false
    }
  },
  async fetch () {
    const params = {
      cat: this.currentCategory,
      sort_order: 'desc'
    }

    try {
      await this.fetchMainNews()

      const [latest, popular, video] = await Promise.all([
        this.$axios.get('/v1/news', { params: { ...params, per_page: 5 } }),
        this.$axios.get('/v1/news', { params: { ...params, per_page: 5, sort_by: 'views' } }),
        this.$axios.get('/v1/news', { params: { ...params, type: 'video' } })
      ])

      const { data: latestNews } = await latest.data
      const { data: popularNews } = await popular.data
      const { data: videoNews } = await video.data

      this.latestNews = this.mapItems(latestNews)
      this.popularNews = this.mapItems(popularNews)
      this.videoNews = this.mapItems(videoNews)

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
      this.resetPagination()
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
    },
    async fetchMainNews () {
      const params = {
        page: this.pagination.currentPage,
        sort_order: 'desc',
        per_page: this.pagination.itemsPerPage,
        cat: this.currentCategory
      }

      try {
        this.mainNewsLoading = true

        const response = await this.$axios.get('/v1/news', { params })
        const { data, meta } = response.data

        this.mainNews = this.mapItems(data)

        const paginationObj = {
          currentPage: meta.current_page,
          itemsPerPage: meta.per_page,
          totalRows: meta.total_count
        }

        this.pagination = JSON.parse(JSON.stringify(paginationObj))
      } catch (error) {
        // silent error
      } finally {
        this.mainNewsLoading = false
      }
    },
    onPaginationChange (action, value) {
      const paginationObj = { ...this.pagination }

      switch (action) {
        case 'prev-page':
          paginationObj.currentPage = this.pagination.currentPage - 1
          break
        case 'next-page':
          paginationObj.currentPage = this.pagination.currentPage + 1
          break
        case 'page-change':
          paginationObj.currentPage = value
          break
        case 'per-page-change':
          paginationObj.itemsPerPage = value
          break
        default:
          break
      }

      this.pagination = JSON.parse(JSON.stringify(paginationObj))

      /**
       *  NOTE:
       *  `jds-pagination` emits `page-change` and `per-page-change` events
       *  whenever user changes per page value.
       *
       *  To avoid double fetch, we immediately stop this function on
       *  `per-page-change` event and let `page-change` event to
       *  fetch data from API
       */
      if (action === 'per-page-change') {
        return
      }

      this.fetchMainNews()
    },
    resetPagination () {
      this.pagination = {
        currentPage: 1,
        itemsPerPage: 5,
        totalRows: 0
      }
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
