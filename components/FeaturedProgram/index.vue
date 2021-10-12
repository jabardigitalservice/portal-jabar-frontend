<template>
  <section class="w-full bg-gray-200">
    <BaseContainer class="relative -top-24 z-20">
      <div class="py-8 px-10 rounded-xl bg-white">
        <div class="p-4">
          <!-- Search and Filter -->
          <section class="flex w-full justify-end mb-8">
            <!--
              TODO: Add category selection here
            -->

            <!--
              TODO: replace this component with JdsSearch small variant
              -->
            <Search
              v-model="searchValue"
              placeholder="Cari Program"
              small
            />
          </section>

          <!-- Featured Program Card -->
          <section class="grid grid-cols-3 gap-8">
            <!-- Render 9 card skeleton as default -->
            <template v-if="$fetchState.pending">
              <BaseCardSkeleton
                v-for="i in 9"
                :key="`skel-${i}`"
              />
            </template>

            <BaseCard
              v-for="item in programList"
              :key="item.id"
              :title="item.title"
              :description="item.excerpt || '-'"
              :icon="item.logo || '/icons/program-unggulan/logo-placeholder.svg'"
              @click="showDetail(item)"
            />

            <FeaturedProgramEmptyState
              v-show="isSearchEmpty && !$fetchState.pending"
              class="col-span-3"
              :search-value="searchValue"
            />
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
      programList: [],
      searchValue: '',
      programDetail: {},
      openModal: false
    }
  },
  async fetch () {
    try {
      const response = await this.$axios('v1/featured-programs')
      this.data = response.data.data
      this.programList = this.data
    } catch (error) {
      this.programList = []
      // silent error
    }
  },
  computed: {
    /**
     * Check whether search result is empty
     * @returns {Boolean}
     */
    isSearchEmpty () {
      return this.programList.length === 0
    }
  },
  watch: {
    searchValue: {
      handler () {
        if (!this.$fetchState.pending) {
          this.programList = this.data.filter(
            item => item.title.toLowerCase().includes(this.searchValue.toLowerCase())
          )
        }
      }
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
    }
  }
}
</script>
