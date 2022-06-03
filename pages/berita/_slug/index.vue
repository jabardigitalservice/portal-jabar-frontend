<template>
  <main>
    <article class="article h-full">
      <!-- News Header -->
      <NewsDetailHeader :news="news" />

      <!-- News Content -->
      <BaseContainer class="mt-12 mb-12 mx-auto">
        <section class="h-full grid grid-cols-1 gap-8 md:grid-cols-news-container md:gap-[72px]">
          <div class="flex flex-col gap-7">
            <!-- Article Body -->
            <div class="article__body w-full min-h-screen" v-html="content" />
            <p class="font-lora text-gray-800">
              <strong>Editor: </strong> {{ editor }}
            </p>
            <NewsDetailTags v-if="hasTags" :tags="tags" />
          </div>

          <!-- Related News and Share Buttons -->
          <section class="w-[400px] h-full">
            <div class="flex flex-col gap-7 md:sticky md:top-[88px]">
              <NewsList
                :items="relatedNews"
                small
                :loading="loading"
                :max-height="maxHeight"
              >
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
  async asyncData ({ params, $axios }) {
    const slug = await params.slug

    try {
      const response = await $axios.get(`/v1/public/news/slug/${slug}`)
      const { data } = response.data
      const news = data

      return { news }
    } catch (error) {
      // silent error
    }
  },
  data () {
    return {
      news: {},
      relatedNews: [],
      maxHeight: null,
      loading: true
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
    editor () {
      return this.news.editor || ''
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
    this.fetchRelatedNews()

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
        this.loading = true

        const params = {
          sort_by: 'published_at',
          sort_order: 'DESC',
          per_page: 5,
          cat: this.news.category,
          exclude: this.news.id
        }

        const response = await this.$axios.get('/v1/public/news', { params })
        const { data } = response.data

        this.relatedNews = this.mapItems(data)
      } catch (error) {
        this.relatedNews = []
      } finally {
        this.loading = false
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
    p,
    strong {
      @apply font-lora text-gray-800
    }

    h1 {
      @apply text-[5.8rem] leading-[8.8rem] font-normal
    }

    h2 {
      @apply text-[4rem] leading-[6.5rem] font-bold
    }

    h3 {
      @apply text-[3rem] leading-[4.9rem] font-bold
    }

    h4 {
      @apply text-[2.3rem] leading-[3.75rem] font-bold
    }

    h5 {
      @apply text-[1.75rem] leading-[2.8rem] font-bold
    }

    h6 {
      @apply text-[1.3rem] leading-[2.1rem] font-bold
    }

    p {
      @apply text-lg leading-7 mb-7
    }

    img {
      @apply w-full h-auto
    }

    figure figcaption {
      @apply text-center leading-7 text-gray-600
    }

    blockquote {
      @apply border-l-8 border-gray-300 px-6
    }

    blockquote p {
      @apply font-lora text-base leading-6 text-gray-600 italic
    }
  }
}
</style>
