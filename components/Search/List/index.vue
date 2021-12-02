<template>
  <div :class="listView === 'list' ? 'w-full flex flex-col gap-8' : 'w-full grid grid-cols-3 gap-x-4 gap-y-8'">
    <template v-if="loading">
      <SearchItemSkeleton v-for="item in maxLength" :key="item" :view="listView" />
    </template>
    <template v-else>
      <SearchItem v-for="item in items" :key="item.id" :view="listView" :item="item" />
    </template>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
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
    }
  }
}
</script>
