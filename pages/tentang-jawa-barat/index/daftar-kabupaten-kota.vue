<template>
  <section class="w-full min-w-0 flex flex-col gap-6">
    <h1 class="font-bold font-lora text-green-700 text-4xl leading-none">
      Daftar Kabupaten Kota
    </h1>
    <InputSearch
      v-model.trim="searchKeyword"
      :clear="false"
      placeholder="Cari Kabupaten atau Kota"
      @submit="onSubmit"
      @clear="$fetch"
    />
    <SearchToolbar
      :list-view.sync="listView"
      :total-count="pagination.totalRows"
      :sortable="false"
    >
      <template #resultText>
        Terdapat <strong class="text-blue-gray-600">{{ pagination.totalRows }} Kabupaten dan Kota</strong> yang ada di lingkup Jawa Barat
      </template>
    </SearchToolbar>
    <!-- No results found placeholder -->
    <div v-if="!$fetchState.pending && !hasResults" class="w-full h-full flex flex-col items-center justify-center gap-8 py-8">
      <h1 class="text-center font-lora text-[21px] leading-[34px] text-blue-gray-700 font-bold">
        Mohon maaf, pencarian dengan kata kunci <br>
        <span class="text-green-800">{{ searchKeyword }}</span>
        tidak dapat ditemukan.
      </h1>
      <img
        src="/images/search/empty-state.svg"
        width="275px"
        height="195px"
        alt="ilustrasi pencarian tidak ditemukan"
      >
    </div>
    <ul v-else :class="listView === 'list' ? 'flex flex-col gap-6' : 'grid grid-cols-2 gap-4'">
      <!-- Skeleton -->
      <template v-if="$fetchState.pending">
        <li
          v-for="(item, index) in pagination.itemsPerPage"
          :key="index"
          class="min-h-[158px] min-w-0 flex p-4 rounded-xl border border-[#E9EDF4]"
          :class="listView === 'list' ? 'h-[158px] gap-6' : 'flex-col gap-6'"
        >
          <div class="w-[100px] h-[100px] object-cover rounded-xl bg-gray-200 animate-pulse" />
          <div class="flex-1">
            <div class="w-3/4 h-4 bg-gray-200 animate-pulse rounded-md mb-3" />
            <div class="w-1/2 h-4 bg-gray-200 animate-pulse rounded-md mb-6" />
            <div class="w-4/5 h-4 bg-gray-200 animate-pulse rounded-md mb-3" />
            <div class="w-1/5 h-4 bg-gray-200 animate-pulse rounded-md" />
          </div>
        </li>
      </template>
      <!-- List of data -->
      <template v-else>
        <li
          v-for="item in data"
          :key="item.id"
          class="min-h-[132px] min-w-full p-4 rounded-xl flex border border-[#E9EDF4]"
          :class="listView === 'list' ? 'gap-6' : 'flex-col gap-2'"
        >
          <div class="w-[100px] h-[100px] grid place-content-center">
            <img
              :src="item.logo || '/icons/image.svg'"
              :alt="item.name"
              class="h-[80px]"
              height="80"
            >
          </div>
          <div>
            <p class="font-roboto font-bold text-blue-gray-800 leading-[26px] line-clamp-1">
              {{ item.name }}
            </p>
            <p class="font-roboto text-sm font-medium text-blue-gray-500 leading-6 line-clamp-1 mb-2">
              {{ item.chief }}
            </p>
            <p class="font-lato text-xs font-normal text-[#717F8C] leading-5 line-clamp-1 mb-1">
              {{ item.address }}
            </p>
            <a
              :href="setValidWebsite(item.website)"
              rel="noopener noreferrer"
              target="_blank"
              class="font-lato text-xs font-normal leading-5 text-[#1976D2] flex items-center gap-2"
            >
              {{ item.website }}
              <Icon name="open-new-tab" fill="#1976D2" size="14px" />
            </a>
          </div>
        </li>
      </template>
    </ul>
    <Pagination
      v-bind="pagination"
      @previous-page="onPaginationChange('prev-page', $event)"
      @next-page="onPaginationChange('next-page', $event)"
      @page-change="onPaginationChange('page-change', $event)"
      @per-page-change="onPaginationChange('per-page-change', $event)"
    />
  </section>
</template>

<script>
export default {
  data () {
    return {
      searchKeyword: '',
      data: [],
      meta: {},
      listView: 'list',
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
      q: this.searchKeyword
    }

    try {
      const response = await this.$axios.get('v1/districts', { params })
      const { data, meta } = response.data

      this.data = data
      this.meta = meta

      const paginationObj = {
        ...this.pagination,
        currentPage: this.meta.current_page,
        itemsPerPage: this.meta.per_page,
        totalRows: this.meta.total_count
      }

      this.pagination = JSON.parse(JSON.stringify(paginationObj))
    } catch (error) {
      this.data = []
      this.meta = {}
    }
  },
  computed: {
    hasResults () {
      return this.data.length > 0
    }
  },
  methods: {
    onListViewChange (listView) {
      this.listView = listView
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
    setValidWebsite (website) {
      if (website.startsWith('http')) {
        return website
      }

      return `https://${website}`
    }
  }
}
</script>
