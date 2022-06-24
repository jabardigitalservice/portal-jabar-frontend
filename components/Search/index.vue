<template>
  <BaseContainer class="relative -top-24 z-20">
    <main class="p-3 md:p-4 lg:py-8 lg:px-10 rounded-xl bg-white min-h-[600px] shadow min-w-0 flex flex-col gap-6 lg:gap-8">
      <!-- Search Bar -->
      <SearchBar :with-suggestion="false" />

      <!-- Search Initial State -->
      <template v-if="initialState">
        <SearchInitialState />
      </template>

      <!-- Search Empty State -->
      <template v-else-if="noResult">
        <SearchEmptyState :keyword="searchKeyword" />
      </template>

      <!-- Search Results -->
      <template v-else>
        <section>
          <h2 class="font-lora text-center md:text-left text-2xl font-bold text-blue-gray-700">
            Menampilkan hasil pencarian <strong class="text-green-700">{{ searchKeyword }}</strong>
          </h2>
        </section>

        <!-- Public Services -->
        <section
          v-show="hasData(publicServiceData)"
          class="border-b border-gray-300 pb-8"
        >
          <div class="min-w-0 flex flex-col gap-6 md:flex-row justify-between items-center mb-6">
            <h3 class="font-roboto font-medium text-[22px] text-center md:text-left leading-[26px]">
              Layanan Publik <br class="md:hidden"> terkait <strong class="text-green-700">{{ searchKeyword }}</strong>
            </h3>
            <Link :link="`/pencarian/layanan?q=${searchKeyword}`" tabindex="-1">
              <Button type="button" variant="secondary">
                Lihat Semua Layanan Publik
                <Icon name="open-new-tab" size="14px" />
              </Button>
            </Link>
          </div>
          <SearchList
            :list-view="device.isTablet ? 'list' : 'grid'"
            :loading="loading"
            :items="publicServiceData"
            :max-length="3"
          />
        </section>

        <!-- News -->
        <section v-show="hasData(relatedNewsData)">
          <div class="min-w-0 flex flex-col md:flex-row gap-6 justify-between items-center mb-6">
            <h3 class="font-roboto text-center md:text-left font-medium text-[22px] leading-[26px]">
              Berita Jawa Barat <br class="md:hidden"> terkait <strong class="text-green-700">{{ searchKeyword }}</strong>
            </h3>
            <Link :link="`/pencarian/berita?q=${searchKeyword}`" tabindex="-1">
              <Button type="button" variant="secondary">
                Lihat Semua Berita Jawa Barat
                <Icon name="open-new-tab" size="14px" />
              </Button>
            </Link>
          </div>
          <SearchList
            :list-view="device.isTablet ? 'list' : 'grid'"
            :loading="loading"
            :items="relatedNewsData"
            :max-length="3"
          />
        </section>

        <div class="min-w-0 grid grid-cols-1 gap-6 lg:grid-cols-[55%,35%] justify-between lg:mb-8">
          <!-- Related Search -->
          <section v-show="hasData(relatedSearchData)">
            <div class="mb-6">
              <h3 class="font-roboto font-medium text-[22px] leading-[26px] pb-3 border-b border-gray-300">
                Hasil Pencarian Lainnya
              </h3>
            </div>
            <SearchList
              :list-view="device.isMobile ? 'grid' : 'list'"
              :loading="loading"
              :items="relatedSearchData"
              :max-length="5"
            />
            <div class="mt-6 flex justify-center items-center">
              <Link :link="`/pencarian/lainnya?q=${searchKeyword}`" tabindex="-1">
                <Button type="button" variant="secondary">
                  Muat Hasil Lainnya
                  <Icon name="open-new-tab" size="14px" />
                </Button>
              </Link>
            </div>
          </section>

          <!-- Popular News -->
          <section v-show="hasData(popularNewsData)">
            <div class="mb-6">
              <h3 class="font-roboto font-medium text-[22px] leading-[26px] pb-3 border-b border-gray-300">
                Berita Populer Terkait
              </h3>
            </div>
            <SearchList
              :list-view="device.isMobile ? 'grid' : 'list'"
              :items="popularNewsData"
              :loading="loading"
              :max-length="5"
              :small="!device.isMobile"
            />
          </section>
        </div>
      </template>
    </main>
  </BaseContainer>
</template>

<script>
export default {
  data () {
    return {
      searchKeyword: '',
      loading: false,
      publicServiceData: [],
      relatedNewsData: [],
      popularNewsData: [],
      relatedSearchData: []
    }
  },
  async fetch () {
    const params = {
      q: this.searchKeyword,
      per_page: 3,
      sort_order: 'desc',
      domain: []
    }

    try {
      this.loading = true
      const [publicService, relatedNews, popularNews, relatedSearch] = await Promise.all([
        this.$axios.$get('/v1/search', { params: { ...params, domain: ['public_service', 'featured_program'] } }),
        this.$axios.$get('/v1/search', { params: { ...params, domain: ['news'] } }),
        this.$axios.$get('/v1/search', { params: { ...params, domain: ['news'], per_page: 5, sort_by: 'views' } }),
        this.$axios.$get('/v1/search', { params: { ...params, per_page: 5 } })
      ])

      this.publicServiceData = publicService.data
      this.relatedNewsData = relatedNews.data
      this.popularNewsData = popularNews.data
      this.relatedSearchData = relatedSearch.data
    } catch (error) {
      // silent error
    } finally {
      this.loading = false
    }
  },
  computed: {
    device () {
      return this.$store.state.device.device
    },
    initialState () {
      return !this.searchKeyword
    },
    noResult () {
      const isEmptyResults =
        !this.hasData(this.publicServiceData) &&
        !this.hasData(this.relatedNewsData) &&
        !this.hasData(this.popularNewsData) &&
        !this.hasData(this.relatedSearchData)

      return this.searchKeyword && !this.loading && isEmptyResults
    }
  },
  watch: {
    // watch `q` query param changes on the address bar
    '$route.query.q': {
      handler () {
        if (this.$route.query.q) {
          this.searchKeyword = this.$route.query.q
        }
      },
      immediate: true
    },
    searchKeyword: {
      handler () {
        this.$fetch()
      }
    }
  },
  methods: {
    hasData (data) {
      return Array.isArray(data) && data.length > 0
    }
  }
}
</script>
