<template>
  <section class="w-full min-w-0 flex flex-col gap-6">
    <h1 class="font-bold font-lora text-green-700 text-[28px] md:text-4xl text-center md:text-left leading-[56px]">
      Daftar Perangkat Daerah
    </h1>
    <InputSearch
      v-model.trim="searchKeyword"
      :clear="false"
      placeholder="Cari Badan, Dinas, atau Institusi"
      @submit="onSubmit"
      @clear="$fetch"
    />

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

    <!-- Search results -->
    <section v-else>
      <p class="text-gray-700 lg:hidden mb-6">
        Terdapat <strong>{{ pagination.totalRows }} Perangkat Daerah</strong> yang ada di lingkup Pemprov Jawa Barat
      </p>
      <SearchToolbar
        :list-view.sync="listView"
        :total-count="pagination.totalRows"
        :sortable="false"
        class="!hidden lg:!grid mb-6"
      >
        <template #resultText>
          Terdapat <strong class="text-gray-700">{{ pagination.totalRows }} Perangkat Daerah</strong> yang ada di lingkup Pemprov Jawa Barat
        </template>
      </SearchToolbar>
      <ul
        :class="{
          'flex flex-col gap-6 mb-6': true,
          'grid grid-cols-1 md:grid-cols-2 gap-4': listView === 'grid',
        }"
      >
        <!-- Skeleton -->
        <template v-if="$fetchState.pending">
          <li
            v-for="(item, index) in pagination.itemsPerPage"
            :key="index"
            class="p-4 rounded-xl flex flex-col min-w-0 border border-[#E9EDF4] min-h-[260px] gap-2"
            :class="{
              'md:flex-row md:min-h-[136px] md:gap-6': listView === 'list',
            }"
          >
            <div class="w-[100px] h-[100px] rounded-xl bg-gray-200 animate-pulse" />
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
            class="p-4 rounded-xl flex flex-col min-w-0 border border-[#E9EDF4] min-h-[260px] gap-2"
            :class="{
              'md:flex-row md:min-h-[136px] md:gap-6': listView === 'list',
            }"
          >
            <div class="flex-shrink-0 w-[100px] h-[100px] grid place-content-center">
              <img
                :src="item.logo || '/logo.png'"
                :alt="item.name"
                class="h-[80px]"
                height="80"
                @error="onErrorImage"
              >
            </div>
            <div>
              <p class="font-roboto font-bold text-blue-gray-800 leading-[26px] line-clamp-2">
                {{ item.name }}
              </p>
              <p class="font-roboto text-sm font-medium text-blue-gray-500 leading-6 line-clamp-1 mb-2">
                {{ item.chief }}
              </p>
              <p class="font-lato text-xs font-normal text-[#717F8C] leading-5 line-clamp-1 mb-1">
                {{ item.address }}
              </p>
              <a
                v-if="item.website"
                :href="item.website"
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
        class="overflow-x-auto"
        @previous-page="onPaginationChange('prev-page', $event)"
        @next-page="onPaginationChange('next-page', $event)"
        @page-change="onPaginationChange('page-change', $event)"
        @per-page-change="onPaginationChange('per-page-change', $event)"
      />
    </section>
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
      const response = await this.$axios.get('v1/units', { params })
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
    },
    device () {
      return this.$store.state.device.device
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
    onErrorImage (event) {
      event.target.src = '/logo.png'
    },
    scrollToTop () {
      window.scrollTo({ top: 200 })
    }
  }
}
</script>
