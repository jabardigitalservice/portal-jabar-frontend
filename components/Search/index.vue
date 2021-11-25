<template>
  <BaseContainer class="relative -top-24 z-20">
    <div class="py-8 px-10 rounded-xl bg-white min-h-screen shadow">
      <div class="w-full h-full grid grid-cols-search-container gap-6">
        <!-- TODO: Remove this dummy sidebar -->
        <section class="w-full h-full bg-gray-200" />
        <section class="w-full h-full flex flex-col gap-8">
          <SearchToolbar :list-view.sync="listView" />
          <SearchList :list-view="listView" :loading="loading" />
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
      }
    }
  },
  methods: {
    onPaginationChange (action) {
      // TODO: Add action on pagination change
    }
  }
}
</script>
