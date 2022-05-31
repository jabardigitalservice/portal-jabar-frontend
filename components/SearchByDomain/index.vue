<template>
  <BaseContainer class="relative -top-24 z-20">
    <div class="py-8 px-10 rounded-xl bg-white min-h-[600px] shadow">
      <SearchBar class="mb-8" />

      <!-- Search Empty State -->
      <template v-if="noResult">
        <SearchEmptyState :keyword="searchKeyword" />
      </template>

      <!-- Search Results -->
      <template v-else>
        <section class="min-0 flex justify-between items-center mb-8">
          <div class="min-w-0 flex gap-6 items-center">
            <Button
              type="button"
              variant="secondary"
              @click="$router.back()"
            >
              <Icon name="arrow-left" size="14px" />
              Kembali
            </Button>
            <h2 class="font-roboto text-xl font-medium text-blue-gray-700">
              {{ domainLabel }} terkait <strong class="text-green-700">{{ searchKeyword }}</strong>
            </h2>
          </div>
          <div>
            <SearchToolbar
              :list-view.sync="listView"
              :total-count="pagination.totalRows"
              :sort-value="sortOrder"
              @change:sort="onChangeSort($event)"
            >
              <!-- Remove component's default search result text -->
              <template #resultText>
                <span class="hidden" />
              </template>
            </SearchToolbar>
          </div>
        </section>

        <section>
          <SearchList
            :list-view="listView"
            :loading="$fetchState.pending"
            :items="searchData"
            :max-length="pagination.itemsPerPage"
          />
          <Pagination
            class="mt-auto"
            v-bind="pagination"
            @previous-page="onPaginationChange('prev-page', $event)"
            @next-page="onPaginationChange('next-page', $event)"
            @page-change="onPaginationChange('page-change', $event)"
            @per-page-change="onPaginationChange('per-page-change', $event)"
          />
        </section>
      </template>
    </div>
  </BaseContainer>
</template>

<script>
const DOMAIN_LABEL = {
  layanan: 'Layanan Publik',
  berita: 'Berita Jawa Barat',
  global: 'Hasil pencarian lainnya'
}

export default {
  name: 'SearchByDomain',
  props: {
    domain: {
      type: String,
      required: true
    },
    keyword: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      searchKeyword: this.keyword,
      listView: 'list',
      sortOrder: 'DESC',
      pagination: {
        currentPage: 1,
        itemsPerPage: 5,
        totalRows: 0,
        itemsPerPageOptions: [5, 10, 15]
      },
      searchData: [],
      searchMeta: {}
    }
  },
  async fetch () {
    const params = {
      q: this.searchKeyword,
      page: this.pagination.currentPage,
      per_page: this.pagination.itemsPerPage,
      sort_order: this.sortOrder,
      domain: []
    }

    switch (this.domain) {
      case 'layanan':
        params.domain = ['public_service', 'featured_program']
        break
      case 'berita':
        params.domain = ['news']
        break
      case 'global':
        params.domain = []
        break
      default:
        params.domain = []
        break
    }

    try {
      const response = await this.$axios.$get('/v1/search', { params })

      this.searchData = response.data
      this.searchMeta = response.meta

      this.pagination = {
        ...this.pagination,
        currentPage: this.searchMeta.current_page,
        itemsPerPage: this.searchMeta.per_page,
        totalRows: this.searchMeta.total_count
      }
    } catch (error) {
      // silent error
    }
  },
  computed: {
    domainLabel () {
      return DOMAIN_LABEL[this.domain]
    },

    noResult () {
      return !this.$fetchState.pending && this.pagination.totalRows === 0
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
        this.pagination = {
          ...this.pagination,
          currentPage: 1
        }
        this.$fetch()
      }
    }
  },
  methods: {
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

      this.$fetch()
    },

    onChangeSort (sortOrder) {
      if (!sortOrder || sortOrder === this.sortOrder) { return }
      this.sortOrder = sortOrder
      this.$fetch()
    }
  }
}
</script>
