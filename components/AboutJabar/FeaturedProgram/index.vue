<template>
  <section class="w-full bg-gray-200">
    <div class="relative container mx-auto -top-20 z-20">
      <div class="py-8 px-10 rounded-xl bg-white">
        <div class="p-4">
          <!-- Search and Filter -->
          <section class="flex w-full justify-between mb-8">
            <!--
              NOTE:
              Category Selection will be implemented in the next PR

            <div class="inline-flex gap-4 items-center">
              <p class="font-lato text-md text-gray-800 font-normal">
                Tampilkan
              </p>
              <jds-select />
            </div>
            -->

            <!--
              TODO: replace this component with JdsSearch small variant
              -->
            <form>
              <div class="inline-flex gap-2 border border-blue-gray-50 p-2 rounded-lg">
                <jds-icon name="magnifier" size="16px" fill="#BDBDBD" />
                <input
                  v-model="searchValue"
                  type="text"
                  class="font-lato text-gray-600 focus:outline-none leading-4"
                  placeholder="Cari Program"
                >
              </div>
            </form>
          </section>

          <!-- Featured Program Card -->
          <section class="grid grid-cols-3 gap-8">
            <Card
              v-for="item in programList"
              :key="item.id"
              :title="item.title"
              :description="item.excerpt || '-'"
              icon="/icons/program-unggulan/sapawarga.svg"
            />
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Card from '~/components/Base/Card'

export default {
  name: 'FeaturedProgramList',
  components: {
    Card
  },
  data () {
    return {
      programList: [],
      searchValue: ''
    }
  },
  async fetch () {
    try {
      const response = await this.$axios('v1/featured-programs')
      this.programList = response.data.data
    } catch (error) {
      this.programList = []
      // silent error
    }
  }
}
</script>
