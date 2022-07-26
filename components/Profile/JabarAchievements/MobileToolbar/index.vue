<template>
  <div class="jabar-achievements__mobile-toolbar relative w-full grid grid-cols-2 gap-4 items-center">
    <ProfileJabarAchievementsMobileToolbarCategory
      :items="categories"
      class="jabar-achievements__mobile-toolbar__category md:col-span-2"
      @change:filter="$emit('change:filter', $event)"
    />
    <div class="flex items-center justify-self-end">
      <p class="hidden md:block font-lato font-normal text-sm leading-6 text-gray-700 whitespace-nowrap mr-3">
        Urut Berdasarkan :
      </p>
      <Select
        class="w-[fit-content] gap-0 mb-1"
        :options="sortOptions"
        :value="sortValue"
        @click="onChangeSort"
      />
    </div>
    <div class="min-w-0 flex items-center col-span-2 md:col-span-1 md:col-start-1 md:row-start-2">
      <p class="font-roboto text-base leading-5 text-gray-700">
        Menampilkan <strong class="text-gray-700">{{ totalCount }} hasil</strong>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalCount: {
      type: [String, Number],
      required: false,
      default: 0
    },
    sortOptions: {
      type: Array,
      default: () => []
    },
    sortValue: {
      type: String,
      default: 'ASC',
      validator (value) {
        return ['ASC', 'DESC'].includes(value)
      }
    }
  },
  data () {
    return {
      categories: []

    }
  },
  async fetch () {
    try {
      const response = await this.$axios.get('v1/awards/categories')
      const data = response.data
      this.categories = data.map(item => item.category)
    } catch (error) {
      this.categories = []
    }
  },
  methods: {
    onChangeSort (value) {
      this.$emit('change:sort', value)
    }
  }
}
</script>

<style lang="css">
/**
 * Override default jds-popover styling
 */
 .jabar-achievements__mobile-toolbar .jds-popover {
  max-height: 38px !important;
  overflow: hidden;
}

.jabar-achievements__mobile-toolbar .jds-popover__content {
  z-index: 50 !important;
}

.jabar-achievements__mobile-toolbar__category .jds-popover,
.jabar-achievements__mobile-toolbar__category .jds-popover__activator,
.jabar-achievements__mobile-toolbar__category .jds-popover__content,
.jabar-achievements__mobile-toolbar__category .jds-input-text {
  @apply md:!w-full
}

.jabar-achievements__mobile-toolbar .jds-popover-dropdown__body {
  display: flex !important;
  flex-direction: column !important;
  gap: 8px !important;
  z-index: 50 !important;
}
/**
 * Override default jds-input-text styling
 */
.jabar-achievements__mobile-toolbar .jds-input-text__input-wrapper {
  height: 38px !important;
  border-color: #E3E7ED !important;
}

.jabar-achievements__mobile-toolbar .jds-checkbox__option-label {
  font-size: 14px !important;
}

.jabar-achievements__mobile-toolbar .jds-input-text input {
  width: 100% !important;
  height: 100% !important;
  font-size: 14px !important;
}
</style>
