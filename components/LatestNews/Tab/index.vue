<template>
  <div class="col-span-3 flex flex-col gap-4 h-full">
    <div class="grid grid-cols-2">
      <p
        v-for="(tab, index) in tabs"
        :key="index"
        class="text-sm uppercase text-center border-b-4 pb-3 cursor-pointer"
        :class="[selectedTab === tab ? 'font-bold border-green-800' : 'text-gray-700 border-blue-gray-50']"
        @click="setSelectedTab(tab)"
      >
        {{ tab }}
      </p>
    </div>
    <!--
      TODO: Show a placeholder if an error occur
    -->
    <ul class="flex flex-col gap-4">
      <LatestNewsTabItem
        v-for="item in items"
        :key="item.id"
        :title="item.title"
        :slug="item.slug"
        :created-at="item.created_at"
        :category="item.category"
        :fetch-state="$fetchState"
      />
    </ul>
  </div>
</template>

<script>
import { format } from '~/utils/date'

export default {
  data () {
    return {
      items: [],
      perPage: 4,
      tabs: ['terbaru', 'terpopuler'],
      selectedTab: 'terbaru'
    }
  },
  async fetch () {
    const perPage = `per_page=${this.perPage}`
    const sortByMostPopularNews = 'sort_by=views'
    let queryParams = `?${perPage}`

    if (this.selectedTab === 'terpopuler') {
      queryParams = `?${sortByMostPopularNews}&${perPage}`
    }

    const response = await this.$axios.$get(`/v1/news${queryParams}`)
    this.items = response.data
  },
  activated () {
    /**
     *  Call fetch again if last fetch more than a minute ago
     */
    if (this.$fetchState.timestamp <= Date.now() - 60000) {
      this.$fetch()
    }
  },
  methods: {
    setSelectedTab (tab) {
      this.selectedTab = tab
      this.$fetch()
    },
    formatDate (date) {
      return format(date, { day: 'numeric', month: 'short', year: 'numeric' })
    }
  }
}
</script>
