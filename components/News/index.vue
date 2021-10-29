<template>
  <main>
    <!-- for preview purposes, please remove this section later -->
    <section class="bg-blue-500 w-full h-screen mb-6" />

    <!-- News Section -->
    <BaseContainer class="mx-auto grid grid-cols-news-container gap-8">
      <section class="w-full flex flex-col">
        <NewsHighlight :item="highlight" />
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
export default {
  data () {
    return {
      activeCategory: 'nasional',
      news: []
    }
  },
  async fetch () {
    const params = {
      page: 1,
      per_page: 5,
      cat: this.activeCategory,
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
  }
}
</script>
