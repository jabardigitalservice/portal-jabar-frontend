<template>
  <div class="relative -top-24 z-10">
    <BaseContainer>
      <div class="bg-white p-10 rounded-xl shadow">
        <div class="grid grid-cols-search-container gap-6">
          <ProfileJabarAchievementsSidebar />
          <div class="w-full min-w-0 flex flex-col gap-6">
            <h1 class="font-bold font-lora text-green-700 text-4xl leading-none">
              Daftar Prestasi Jawa Barat
            </h1>
            <InputSearch
              v-model.trim="searchKeyword"
              :clear="false"
              placeholder="Cari prestasi jawa barat"
            />
            <SearchToolbar :list-view.sync="listView" :total-count="pagination.totalRows" />
            <ProfileJabarAchievementsList
              :list-view="listView"
              :items="achievementsData"
              :loading="$fetchState.pending"
              :items-per-page="pagination.itemsPerPage"
            />
            <Pagination
              v-bind="pagination"
              @previous-page="onPaginationChange('prev-page', $event)"
              @next-page="onPaginationChange('next-page', $event)"
              @page-change="onPaginationChange('page-change', $event)"
              @per-page-change="onPaginationChange('per-page-change', $event)"
            />
          </div>
        </div>
      </div>
    </BaseContainer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      achievementsData: [],
      achievementsMeta: {},
      searchKeyword: '',
      listView: 'list',
      sortOrder: 'desc',
      pagination: {
        currentPage: 1,
        itemsPerPage: 5,
        totalRows: 0,
        itemsPerPageOptions: [5, 10, 15]
      }
    }
  },
  async fetch () {
    const params = {
      page: this.pagination.currentPage,
      per_page: this.pagination.itemsPerPage,
      q: this.searchKeyword,
      cat: '',
      sort_order: this.sortOrder
    }

    try {
      const response = await this.$axios.get('v1/awards', { params })
      const { data, meta } = response.data

      this.achievementsData = data
      this.achievementsMeta = meta

      const paginationObj = {
        ...this.pagination,
        currentPage: this.achievementsMeta.current_page,
        itemsPerPage: this.achievementsMeta.per_page,
        totalRows: this.achievementsMeta.total_count
      }

      this.pagination = JSON.parse(JSON.stringify(paginationObj))
    } catch (error) {
      this.achievementsData = []
      this.achievementsMeta = {}
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
    }
  }
}
</script>
