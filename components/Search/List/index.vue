<template>
  <div :class="listView === 'list' ? 'w-full flex flex-col gap-3' : 'w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'">
    <template v-if="loading">
      <SearchItemSkeleton v-for="item in maxLength" :key="item" :view="listView" />
    </template>
    <template v-else>
      <SearchItem
        v-for="item in items"
        :key="item.id"
        :view="listView"
        :item="item"
        :small="small"
      />
    </template>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    listView: {
      type: String,
      default: 'list',
      validator (value) {
        return ['list', 'grid'].includes(value)
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: Number,
      default: 6
    },
    small: {
      type: Boolean,
      default: false
    }
  }
}
</script>
