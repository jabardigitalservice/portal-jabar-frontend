<template>
  <BaseContainer class="relative -top-24 z-20">
    <div class="py-8 px-10 rounded-xl bg-white min-h-screen shadow">
      <SearchBar class="mb-6" />
      <div class="w-full h-full grid grid-cols-search-container gap-6">
        <section>
          <SearchSidebar :domain="domain" :meta="searchMeta" :total-count="totalCount" @checked="setSelectedDomain" />
        </section>
        <!-- Initial State will be displayed when user
        visits `/pencarian` page without query parameter  -->
        <template v-if="!loading && isInitialState">
          <!-- TODO: Add search recommendations -->
          <SearchInitialState />
        </template>
        <template v-else-if="!loading && !hasSearchResults">
          <!-- TODO: Add search recommendations -->
          <SearchEmptyState :keyword="searchKeyword" />
        </template>
        <template v-else>
          <section class="w-full h-full min-h-screen flex flex-col gap-8">
            <SearchToolbar :list-view.sync="listView" :total-count="searchMeta.total_count" />
            <SearchList :list-view="listView" :loading="loading" :items="searchData" />
            <Pagination
              v-bind="pagination"
              @previous-page="onPaginationChange('prev-page', $event)"
              @next-page="onPaginationChange('next-page', $event)"
              @page-change="onPaginationChange('page-change', $event)"
              @per-page-change="onPaginationChange('per-page-change', $event)"
            />
          </section>
        </template>
      </div>
    </div>
  </BaseContainer>
</template>

<script>
import isEmpty from 'lodash/isEmpty'
import { searchDomains } from '~/static/data'

export default {
  data () {
    return {
      listView: 'list',
      loading: false,
      pagination: {
        currentPage: 1,
        itemsPerPage: 5,
        totalRows: 0,
        itemPerPageOptions: [5, 10, 15]
      },
      searchKeyword: null,
      searchData: [],
      searchMeta: {},
      totalCount: 0,
      domain: Object.keys(searchDomains)
    }
  },
  computed: {
    hasSearchResults () {
      if ('total_count' in this.searchMeta && this.searchMeta.total_count !== 0) {
        return true
      }
      return false
    },
    isInitialState () {
      if (isEmpty(this.searchMeta)) {
        return true
      }
      return false
    }
  },
  watch: {
    // watch `q` query param changes on the address bar
    '$route.query.q': {
      handler () {
        if (this.$route.query.q) {
          this.searchKeyword = this.$route.query.q
          this.fetchSearchResults()
        }
      },
      immediate: true
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

      this.fetchSearchResults()
    },
    async fetchSearchResults () {
      // TODO: Add search filter by category and sort by
      const params = {
        q: this.searchKeyword,
        per_page: this.pagination.itemsPerPage,
        page: this.pagination.currentPage,
        domain: this.domain,
        sort_order: 'desc'
      }

      try {
        this.loading = true
        const response = await this.$axios.get('/v1/search', { params })
        const { data, meta } = response.data
        this.searchData = data
        this.searchMeta = meta
        this.totalCount = Object.keys(meta.aggregations.domain).reduce((previous, key) => {
          return previous + meta.aggregations.domain[key]
        }, 0)

        const paginationObj = {
          currentPage: this.searchMeta.current_page,
          itemsPerPage: this.searchMeta.per_page,
          totalRows: this.searchMeta.total_count
        }

        this.pagination = JSON.parse(JSON.stringify(paginationObj))
      } catch (error) {
        // silent error
        this.searchData = []
        this.searchMeta = {}
      } finally {
        this.loading = false
      }
    },
    setSelectedDomain (data) {
      this.domain = data
      if (!this.domain.length) { return }
      this.fetchSearchResults()
    }
  }
}
</script>
