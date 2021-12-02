<template>
  <section class="relative h-[38px] flex justify-between">
    <!-- Results Counter -->
    <div class="flex w-max items-center">
      <p class="font-roboto text-base leading-5 text-blue-gray-300">
        Menampilkan <strong class="text-blue-gray-600">{{ totalCount }} hasil pencarian</strong>
      </p>
    </div>
    <div class="flex w-max gap-4">
      <!-- List and Grid View -->
      <div class="flex gap-4 items-center ">
        <p class="font-lato font-normal text-sm leading-6 text-blue-gray-500">
          Tipe tampilan :
        </p>
        <button
          class="w-6 h-6 flex items-center justify-center"
          title="Tampilan List"
          @click="$emit('update:listView', 'list')"
        >
          <Icon
            src="/icons/list-view.svg"
            size="22px"
            alt="list view icon"
            :class="listView === 'list' ? null : 'filter grayscale opacity-30'"
          />
        </button>
        <button
          class="w-6 h-6 flex items-center justify-center"
          title="Tampilan Grid"
          @click="$emit('update:listView', 'grid')"
        >
          <Icon
            src="/icons/grid-view.svg"
            size="22px"
            alt="grid view icon"
            :class="listView === 'grid' ? null : 'filter grayscale opacity-30'"
          />
        </button>
      </div>
      <!-- Separator -->
      <div class="border border-r-[#BDBDBD] my-2" />
      <!-- Sort Dropdown -->
      <div class="flex gap-4 items-center h-full overflow-hidden">
        <p class="font-lato font-normal text-sm leading-6 text-blue-gray-500">
          Urutkan Berdasarkan :
        </p>
        <Select
          class="gap-0"
          :options="sortOptions"
          value="desc"
          @click="onChangeSort"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    listView: {
      type: String,
      default: 'list',
      validator (value) {
        return ['list', 'grid'].includes(value)
      }
    },
    totalCount: {
      type: [String, Number],
      required: false,
      default: 0
    }
  },
  data () {
    return {
      sortOptions: [
        {
          value: 'desc',
          label: 'Terbaru'
        },
        {
          value: 'asc',
          label: 'Terlama'
        }
      ]
    }
  },
  methods: {
    onChangeSort (value) {
      this.$emit('change:sort', value)
    }
  }
}
</script>

<style>
.jds-input-text__input-wrapper {
  max-width: 124px !important;
}
</style>
