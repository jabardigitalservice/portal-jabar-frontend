<template>
  <BaseContainer class="relative -top-24 z-20">
    <div class="py-8 px-10 rounded-xl bg-white min-h-screen shadow">
      <SearchBar class="mb-6" @search="fetchSearchResults" />
      <div class="w-full h-full grid grid-cols-search-container gap-6">
        <section>
          <SearchSidebar />
        </section>
        <section
          class="w-full h-full min-h-screen flex flex-col gap-8"
        >
          <SearchToolbar :list-view.sync="listView" />
          <SearchList :list-view="listView" :loading="loading" :items="searchData" />
          <Pagination
            v-bind="pagination"
            @previous-page="onPaginationChange('prev-page', $event)"
            @next-page="onPaginationChange('next-page', $event)"
            @page-change="onPaginationChange('page-change', $event)"
            @per-page-change="onPaginationChange('per-page-change', $event)"
          />
        </section>
      </div>
    </div>
  </BaseContainer>
</template>

<script>
export default {
  data () {
    return {
      listView: 'list',
      loading: false,
      pagination: {
        currentPage: 1,
        itemsPerPage: 5,
        totalRows: 0,
        itemsPerPageOptions: [5, 10, 15]
      },
      searchData: [],
      searchMeta: []
    }
  },
  methods: {
    onPaginationChange (action) {
      // TODO: Add action on pagination change
    },
    async fetchSearchResults (value) {
      // TODO: Add search filter by category and sort by
      const params = {
        per_page: this.pagination.itemsPerPage,
        q: value
      }

      try {
        this.loading = true
        const response = await this.$axios.get('/v1/search', { params })
        const { data, meta } = response.data
        this.searchData = data
        this.searchMeta = meta
      } catch (error) {
        // silent error
        this.searchData = []
        this.searchMeta = []
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
