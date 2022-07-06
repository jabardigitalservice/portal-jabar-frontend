<template>
  <main class="min-h-screen">
    <section>
      <Jumbotron v-bind="jumbotron">
        <template #breadcrumb>
          <Breadcrumb class="mb-6" />
        </template>
      </Jumbotron>
    </section>
    <section class="relative -top-24 z-10">
      <BaseContainer>
        <div class="bg-white p-3 md:p-4 lg:p-6 xl:px-10 xl:py-8 rounded-xl shadow">
          <div class="grid grid-cols-1 xl:grid-cols-search-container gap-6">
            <!-- Category Sidebar (Dekstop Only) -->
            <ProfileJabarAchievementsSidebar
              class="hidden xl:block"
              @change:filter="onCategoryFilterChange($event)"
            />
            <div class="w-full min-w-0 flex flex-col gap-6">
              <h1 class="font-bold font-lora text-green-700 text-[28px] leading-10 md:text-4xl md:leading-none">
                Daftar Prestasi Jawa Barat
              </h1>
              <InputSearch
                v-model.trim="searchKeyword"
                :clear="false"
                placeholder="Cari prestasi Jawa Barat"
                @submit="onSubmit"
                @clear="$fetch"
              />

              <!-- Category and Sorting Selection (Mobile and Tablet Only) -->
              <ProfileJabarAchievementsMobileToolbar
                :sort-options="sortOptions"
                :total-count="pagination.totalRows"
                class="lg:hidden"
                @change:filter="onCategoryFilterChange($event)"
                @change:sort="onChangeSort($event)"
              />

              <!-- Search Toolbar (Dekstop Only) -->
              <SearchToolbar
                :list-view.sync="listView"
                :total-count="pagination.totalRows"
                :sort-options="sortOptions"
                class="hidden md:hidden lg:grid"
                @change:sort="onChangeSort($event)"
              />
              <template v-if="!$fetchState.pending && !hasResults">
                <ProfileJabarAchievementsEmptySearch :keyword="searchKeyword" />
              </template>
              <template v-else>
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
              </template>
            </div>
          </div>
        </div>
      </BaseContainer>
    </section>
  </main>
</template>

<script>
export default {
  name: 'JabarAchievements',
  data () {
    return {
      jumbotron: {
        title: 'Prestasi Jawa Barat',
        subtitle: 'Beragam apresiasi yang telah diraih Pemerintah Provinsi sebagai tanda dedikasi bagi Jawa Barat.'
      },
      achievementsData: [],
      achievementsMeta: {},
      searchKeyword: '',
      listView: 'list',
      sortOrder: 'ASC',
      categories: [],
      sortOptions: [
        {
          value: 'ASC',
          label: 'Judul A - Z'
        },
        {
          value: 'DESC',
          label: 'Judul Z - A'
        }
      ],
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
      cat: this.categories,
      sort_order: this.sortOrder,
      sort_by: 'title'
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
  computed: {
    hasResults () {
      return this.achievementsData.length > 0
    }
  },
  methods: {
    onPaginationChange (action, value) {
      this.scrollToTop()

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
    onCategoryFilterChange (categories) {
      if (Array.isArray(categories) && categories.length > 0) {
        this.categories = categories
      } else {
        this.categories = []
      }
      this.pagination = {
        ...this.pagination,
        currentPage: 1
      }
      this.$fetch()
    },
    onChangeSort (sortOrder) {
      if (!sortOrder || sortOrder.toUpperCase() === this.sortOrder) { return }
      this.sortOrder = sortOrder.toUpperCase()
      this.$fetch()
    },
    onSubmit () {
      if (this.searchKeyword.length >= 3) {
        this.pagination = {
          ...this.pagination,
          currentPage: 1
        }
        this.$fetch()
      }
    },
    scrollToTop () {
      window.scrollTo({ top: 200 })
    }
  }
}
</script>
