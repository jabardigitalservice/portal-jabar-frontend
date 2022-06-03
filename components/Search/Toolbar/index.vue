<template>
  <section class="toolbar min-w-0 w-full h-[38px] flex justify-between">
    <!-- Results Counter -->
    <div class="min-w-0 flex items-center">
      <p class="font-roboto text-base leading-5 text-blue-gray-300">
        <slot name="resultText">
          Menampilkan <strong class="text-blue-gray-600">{{ totalCount }} hasil pencarian</strong>
        </slot>
      </p>
    </div>
    <div class="min-w-0 flex gap-4 justify-end">
      <!-- List and Grid View -->
      <div class="flex gap-4 items-center ">
        <p class="font-lato font-normal text-sm leading-6 text-blue-gray-500">
          Tipe Tampilan :
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
      <div v-if="sortable" class="border border-r-[#BDBDBD] my-2" />
      <!-- Sort Dropdown -->
      <div v-if="sortable" class="flex gap-4 items-center h-full overflow-hidden">
        <p class="font-lato font-normal text-sm leading-6 text-blue-gray-500">
          Urut Berdasarkan :
        </p>
        <Select
          class="w-[fit-content] gap-0"
          :options="sortOptions"
          :value="sortValue"
          @click="onChangeSort"
        />
      </div>
    </div>
  </section>
</template>

<script>
const defaultSortOptions = [
  {
    value: 'DESC',
    label: 'Terbaru'
  },
  {
    value: 'ASC',
    label: 'Terlama'
  }
]

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
    },
    sortable: {
      type: Boolean,
      required: false,
      default: true
    },
    sortOptions: {
      type: Array,
      default: () => [...defaultSortOptions]
    },
    sortValue: {
      type: String,
      default: 'ASC',
      validator (value) {
        return ['ASC', 'DESC'].includes(value)
      }
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
.toolbar .jds-input-text__input-wrapper {
  max-width: 124px !important;
}
</style>
