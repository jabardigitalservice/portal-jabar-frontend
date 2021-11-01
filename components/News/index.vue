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
    <BaseContainer class="mx-auto grid grid-cols-news-container gap-8">
      <section class="w-full flex flex-col">
        <NewsHeadline />
        <NewsList :items="news" :loading="loadingNews">
          <template #footer>
            <!-- TODO: add pagination here -->
          </template>
        </NewsList>
      </section>
      <section class="w-full flex flex-col">
        <!-- TODO: add newest and popular news -->
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
      news: []
    }
  },
  async fetch () {
    const params = {
      page: 1,
      per_page: 5,
      cat: this.currentCategory,
      sort_order: 'desc'
    }

    const response = await this.$axios.get('/v1/news', { params })
    const { data } = response.data
    this.news = data.map(item => ({
      ...item,
      date: new Date(item.created_at)
    }))
  },
  computed: {
    loadingNews () {
      return this.$fetchState.pending || this.news.length === 0
    }
  },
  methods: {
    setCurrentCategory (category) {
      this.currentCategory = category
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
