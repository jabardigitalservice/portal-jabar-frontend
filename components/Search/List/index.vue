<template>
  <div :class="listView === 'list' ? 'w-full flex flex-col gap-8' : 'w-full grid grid-cols-3 gap-x-4 gap-y-8'">
    <template v-if="loading">
      <SearchItemSkeleton v-for="item in 5" :key="item" :view="listView" />
    </template>
    <template v-else>
      <SearchItem v-for="item in 5" :key="item" :view="listView" />
    </template>
  </div>
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
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
