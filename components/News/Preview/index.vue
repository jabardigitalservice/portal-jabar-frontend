<template>
  <!--
    TODO: Show a placeholder if an error occur
  -->
  <div class="col-span-2 flex flex-col gap-4">
    <NewsPreviewItem
      v-for="item in news"
      :key="item.id"
      :title="item.title"
      :excerpt="item.excerpt"
      :image="item.image"
      :slug="item.slug"
      :created-at="item.createdAt"
      :category="item.category"
      :fetch-state="$fetchState"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      news: []
    }
  },
  async fetch () {
    const response = await this.$axios.$get('/v1/news?per_page=3')
    this.news = response.data
  },
  activated () {
    /**
     *  Call fetch again if last fetch more than a minute ago
     */
    if (this.$fetchState.timestamp <= Date.now() - 60000) {
      this.$fetch()
    }
  }
}
</script>
