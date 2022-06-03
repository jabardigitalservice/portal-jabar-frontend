<template>
  <div>
    <div v-for="(item, index) in items" :key="index">
      <slot :item="item" />
    </div>
    <InfiniteScrollObserver v-if="items.length" @intersect="intersected" />
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      page: 1
    }
  },
  methods: {
    intersected () {
      this.$emit('refetch')
    }
  }
}
</script>
