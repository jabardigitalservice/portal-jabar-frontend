<template>
  <main>
    <article class="article h-full">
      <!-- TODO: Remove this dummy header -->
      <div class="h-[400px] w-full bg-gray-200" />
      <BaseContainer class="mt-12 mx-auto">
        <section class="h-full grid grid-cols-1 gap-8 md:grid-cols-news-container md:gap-[72px]">
          <!-- Article Body -->
          <div class="article__body w-full min-h-screen" v-html="content" />
          <div class="w-[400px] h-full">
            <NewsList :items="relatedNews" small :loading="loading">
              <template #header>
                <NewsListHeader label="Berita Terkait" category="test" class="mb-2" />
              </template>
            </NewsList>
            <div class="w-full">
              <!-- TODO: Add social share buttons -->
            </div>
          </div>
        </section>
      </BaseContainer>
    </article>
  </main>
</template>

<script>
export default {
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      news: {},
      relatedNews: [],
      category: null
    }
  },
  async fetch () {
    try {
      /**
       * this API call is for demo purposes
       * TODO: change this API call with real slug data
       */
      const response = await this.$axios.get('/v1/news/1')
      const { data } = response.data
      this.news = data[0]
      await this.fetchRelatedNews()
    } catch (error) {
      this.news = {}
    }
  },
  computed: {
    loading () {
      if (Array.isArray(this.relatedNews) && this.relatedNews.length) {
        return false
      }
      return true
    },
    content () {
      return this.news.content ?? ''
    }
  },
  methods: {
    async fetchRelatedNews () {
      try {
        const params = {
          sort_order: 'desc',
          per_page: 5,
          cat: this.category
        }

        const response = await this.$axios.get('/v1/news', { params })
        const { data } = response.data

        this.relatedNews = this.mapItems(data)
      } catch (error) {
        this.relatedNews = []
      }
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

<style lang="scss">
.article {
  &__body {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
      @apply font-lora text-gray-800
    }

    p {
      @apply text-lg leading-7 mb-7
    }

    p:nth-child(1) {
      &::before {
        content: 'PORTALJABAR, BANDUNG - ';
        font-weight: bold;
      }
    }

    img {
      @apply w-full h-auto
    }

    blockquote {
      @apply border-l-8 border-gray-300 px-6 font-lora text-base leading-6 text-gray-600 italic
    }
  }
}
</style>
