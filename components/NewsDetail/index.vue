<template>
  <main>
    <article class="article h-full">
      <NewsDetailHeader :news="news" />
      <BaseContainer class="mt-12 mb-12 mx-auto">
        <section class="h-full grid grid-cols-1 gap-8 md:grid-cols-news-container md:gap-[72px]">
          <!-- Article Body -->
          <div class="flex flex-col gap-7">
            <div class="article__body w-full min-h-screen" v-html="content" />
            <NewsDetailTags v-if="hasTags" :tags="tags" />
          </div>
          <!-- Related News and Share Buttons -->
          <section class="w-[400px] h-full">
            <div class="flex flex-col gap-7 md:sticky md:top-[88px]">
              <NewsList :items="relatedNews" small :loading="loading" :max-height="maxHeight">
                <template #header>
                  <NewsListHeader label="Berita Terkait" class="mb-2" />
                </template>
              </NewsList>
              <div class="flex flex-col gap-3 w-full">
                <p class="inline-flex gap-3 font-lato text-xs text-blue-gray-200 leading-5">
                  <Icon
                    src="/icons/share.svg"
                    alt="Bagikan berita"
                    size="16px"
                    class="text-green-600"
                  />
                  Bagikan Berita Via
                </p>
                <NewsDetailShare v-bind="shareButtons" />
              </div>
            </div>
          </section>
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
      maxHeight: null
    }
  },
  async fetch () {
    try {
      const response = await this.$axios.get(`/v1/news/slug/${this.slug}`)
      const { data } = response.data
      this.news = data
      await this.fetchRelatedNews()
    } catch (error) {
      this.news = {}
    }
  },
  head () {
    return {
      title: this.news.title,
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.news.title
        },
        {
          hid: 'description',
          name: 'description',
          content: this.news.excerpt
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.news.title
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.news.image
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.news.excerpt
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.articleUrl
        },
        // Twitter Meta
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.news.title
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content: this.news.excerpt
        },
        {
          hid: 'twitter:image',
          property: 'twitter:image',
          content: this.news.image
        },
        {
          hid: 'twitter:url',
          property: 'twitter:url',
          content: this.articleUrl
        },
        {
          hid: 'twitter:card',
          property: 'twitter:card',
          content: 'summary'
        }
      ]
    }
  },
  computed: {
    articleUrl () {
      const publicUrl = process.env.NUXT_ENV_PUBLIC_URL
      const fullPath = `berita/${this.news.slug}`

      if (publicUrl && fullPath) {
        return `${publicUrl}/${fullPath}`
      }
      return ''
    },
    loading () {
      if (Array.isArray(this.relatedNews) && this.relatedNews.length) {
        return false
      }
      return true
    },
    content () {
      return this.news.content ?? ''
    },
    hasTags () {
      return this.news.tags && this.news.tags.length
    },
    tags () {
      if (Array.isArray(this.news.tags) && this.news.tags.length) {
        return this.news.tags
      }
      return []
    },
    shareButtons () {
      return {
        networks: ['facebook', 'twitter', 'whatsapp', 'email'],
        url: this.articleUrl,
        title: this.news?.title || '',
        description: this.news?.excerpt || ''
      }
    }
  },
  mounted () {
    const viewportHeight = document.documentElement.clientHeight
    /**
     *  `300px` is the estimated total height of the navbar,
     *  social media share buttons, and the gap between components
     */
    this.maxHeight = Math.floor(viewportHeight - 300)
  },
  methods: {
    async fetchRelatedNews () {
      try {
        const params = {
          sort_order: 'desc',
          per_page: 5,
          cat: this.news.category,
          exclude: this.news.id,
          status: 'PUBLISHED'
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

    img {
      @apply w-full h-auto
    }

    blockquote {
      @apply border-l-8 border-gray-300 px-6 font-lora text-base leading-6 text-gray-600 italic
    }
  }
}
</style>
