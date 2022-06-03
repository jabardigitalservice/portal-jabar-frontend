<template>
  <ul :class="listView === 'list' ? 'flex flex-col gap-6' : 'grid grid-cols-2 gap-4'">
    <template v-if="loading">
      <ProfileJabarAchievementsItemSkeleton
        v-for="i in itemsPerPage"
        :key="i"
        :list-view="listView"
      />
    </template>
    <template v-else>
      <ProfileJabarAchievementsItem
        v-for="item in items"
        :key="item.id"
        :list-view="listView"
        :title="item.title"
        :appreciator="item.appreciator"
        :category="item.category"
        :description="item.description"
        :icon="item.icon"
      />
    </template>
  </ul>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    itemsPerPage: {
      type: Number,
      default: 5
    },
    loading: {
      type: Boolean,
      default: false
    },
    listView: {
      type: String,
      default: 'list'
    }
  }
}
</script>
