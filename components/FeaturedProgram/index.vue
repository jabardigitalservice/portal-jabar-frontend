<template>
  <section class="w-full bg-gray-200">
    <BaseContainer class="relative -top-24 z-20">
      <div class="wrapper py-8 px-10 rounded-xl bg-white">
        <div class="p-4">
          <!-- Search and Filter -->
          <section class="flex w-full justify-between mb-8">
            <FeaturedProgramFilter @change:filter="setFilter" />
            <!--
              TODO: replace this component with JdsSearch small variant
              -->
            <InputSearch
              v-model="searchValue"
              placeholder="Cari Program"
              small
            />
          </section>

          <!-- Featured Program Counter -->
          <section class="flex w-full justify-start mb-8">
            <FeaturedProgramCounter
              :counter="programLength"
              :loading="$fetchState.pending"
              :last-update="meta.last_updated"
            />
          </section>

          <!-- Featured Program Card -->
          <section class="grid grid-cols-3 gap-8">
            <FeaturedProgramItem
              v-for="item in programList"
              :key="item.id"
              :title="item.title"
              :description="item.excerpt || '-'"
              :icon="item.logo || '/icons/program-unggulan/logo-placeholder.svg'"
              :categories="item.categories"
              @click="showDetail(item)"
            />
            <FeaturedProgramEmptyState v-show="isSearchEmpty" class="col-span-3" :search-value="searchValue" />
          </section>

          <Modal :show="openModal">
            <FeaturedProgramDetail
              :program-detail="programDetail"
              @close="closeDetail"
            />
          </Modal>
        </div>
      </div>
    </BaseContainer>
  </section>
</template>

<script>

export default {
  data () {
    return {
      data: [],
      meta: {},
      programList: [],
      searchValue: '',
      programDetail: {},
      openModal: false,
      filter: null
    }
  },
  async fetch () {
    const params = {
      cat: this.filter
    }
    try {
      const response = await this.$axios.get('v1/featured-programs', { params })
      const { data, meta } = response.data
      this.data = data
      this.meta = meta
      this.programList = this.data
    } catch (error) {
      this.programList = []
      this.meta = {}
      // silent error
    }
  },
  computed: {
    /**
     * Check whether search result is empty
     * @returns {Boolean}
     */
    isSearchEmpty () {
      return this.isSearchActive && this.programList.length === 0
    },
    /**
     * Check whether search should be active or not
     * based on `searchValue` value
     * @returns {Boolean}
     */
    isSearchActive () {
      return !!this.searchValue
    },
    programLength () {
      return this.data.length
    }
  },
  watch: {
    searchValue: {
      handler () {
        if (this.isSearchActive) {
          this.programList = this.data.filter(
            item => item.title.toLowerCase().includes(this.searchValue.toLowerCase())
          )
        } else {
          this.programList = this.data
        }
      }
    },
    filter () {
      this.$fetch()
    }
  },
  methods: {
    /**
     * Open a Modal containing featured program details
     * @params {Object} item
     */
    showDetail (item) {
      this.programDetail = { ...item }
      this.openModal = true
    },

    /**
     * Close current Modal
     * @params {Object} item
     */
    closeDetail () {
      this.openModal = false
      this.programDetail = {}
    },

    /**
     * Set filter data props
     * @params {Array | null} filter
     */
    setFilter (filter) {
      this.filter = filter
    }
  }
}
</script>

<style scoped>
.wrapper {
  min-height: calc(166px * 9);
}
</style>
